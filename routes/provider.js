'use strict';
const elasticsearch = require('elasticsearch');
const moment = require('moment');
const today = moment()
  .local('ja')
  .format('YYYYMMDD');
const Query = require('./query');

class ElasticsearchProvider {
  constructor(host, port) {
    this.client = new elasticsearch.Client({
      host: `${host}:${port}`,
      log: 'trace'
    });
    this.PURPOSE = ['WORK', 'STUDY', 'MEET_UP', 'OTHER'];
    this.userQueryBuilder = new Query.Builder().withIndex('users');
    this.visitorQueryBuilder = new Query.Builder().withIndex(`log-${today}`);
  }
  prepare() {
    this.client.indices
      .exists(this.visitorQueryBuilder.build())
      .then(response => {
        if (!response) {
          this.client.indices.create(this.visitorQueryBuilder.build());
        }
        this.userQueryBuilder.withType('user');
        this.visitorQueryBuilder.withType('stack');
      });
  }
  register(data) {
    return this.fetchUser(data.id).then(hits => {
      if (hits.length > 0) {
        return {
          code: 1,
          user: data.user,
          error: {
            message: 'あなたは登録済みです'
          }
        };
      }
      return this.client
        .index(
          this.userQueryBuilder
            .withBody({
              user: {
                id: data.id,
                name: data.user.name,
                mail: data.user.mail
              }
            })
            .build()
        )
        .then(() => {
          return {
            user: data.user
          };
        });
    });
  }
  update(data) {
    return this.client
      .updateByQuery(
        this.userQueryBuilder
          .withQuery({
            term: { 'user.mail': data.user.mail }
          })
          .withScript({
            lang: 'painless',
            inline: `ctx._source.user.id ="${data.id}";`
          })
          .build()
      )
      .then(response => {
        if (response.total === 0) {
          return {
            id: data.id,
            error: {
              message: '未登録のカードIDです'
            }
          };
        }
        return {
          id: data.id,
          user: {
            mail: data.user.mail
          }
        };
      })
      .catch(error => {
        return error;
      });
  }
  fetchUser(id) {
    return this.client
      .search(
        this.userQueryBuilder.withQuery({ term: { 'user.id': id } }).build()
      )
      .then(response => {
        return response.hits.hits;
      });
  }
  check(data) {
    return this.fetchUser(data.id).then(hits => {
      if (hits.length === 0) {
        return {
          code: 1,
          id: data.id,
          error: {
            message: '未登録のカードIDです'
          }
        };
      }
      return this.checkWorkspace(hits[0]._source.user);
    });
  }
  checkWorkspace(user) {
    return this.client
      .search(
        this.visitorQueryBuilder.withQuery({ term: { 'user.id': user.id } })
      )
      .then(response => {
        if (response.hits.total === 0) {
          return {
            id: user.id
          };
        }
        return this.exit(user);
      });
  }
  exit(user) {
    return this.client
      .updateByQuery(
        this.visitorQueryBuilder
          .withId(user.id)
          .withScript({
            lang: 'painless',
            inline: `ctx._source.user.isWorkspace = "false";ctx._source.user.workspace.exit = "${moment().unix()}"`
          })
          .build()
      )
      .then(user => {
        return {
          id: user.id,
          user: {
            name: user.name,
            isEntry: false
          }
        };
      });
  }
  entry(data) {
    return this.fetchUser(data.id).then(hits => {
      if (hits.length === 0) {
        return {
          code: 1,
          id: data.id,
          error: {
            message: '未登録のカードIDです'
          }
        };
      }
      if (this.PURPOSE.indexOf(data.purpose) == -1) {
        return {
          code: 1,
          id: data.id,
          error: {
            message: '目的が不正です'
          }
        };
      }
      let user = hits[0]._source.user;
      return this.client
        .index(
          this.visitorQueryBuilder.withId(user.id).withBody({
            user: {
              date: today,
              isEntry: true,
              name: user.name,
              mail: user.mail,
              purpose: data.purpose,
              workspace: {
                entry: moment().unix()
              }
            }
          }).build()
        )
        .then(() => {
          return {
            id: user.id,
            user: {
              name: user.name,
              isEntry: true
            }
          };
        });
    });
  }
  fetchUsersByDate(date) {
    return this.client
      .search(
        this.visitorQueryBuilder
          .withQuery({ term: { 'user.date': date } })
          .build()
      )
      .then(response => {
        let users = [];
        response.hits.hits.forEach(hits => users.push(hits._source.user));
        return users;
      });
  }
}
module.exports = (host, port) => {
  return new ElasticsearchProvider(host, port);
};

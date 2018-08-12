'use strict';
const elasticsearch = require('elasticsearch');
const client = new elasticsearch.Client({
  host: 'http://elasticsearch:9200',
  log: 'error'
});
const moment = require('moment');
const today = moment()
  .local('ja')
  .format('YYYYMMDD');

const template = (indexName, type, id, body) => {
  return { index: indexName, type: type, body: body };
};

const bodyTemplate = (query, script, agg) => {
  let obj = {};
  query ? (obj.query = query) : undefined;
  script ? (obj.script = script) : undefined;
  agg ? (obj.aggs = agg) : undefined;
  return obj;
};
const isExistIndex = async indexName => {
  return await client.indices.exists({ index: indexName });
};

const isExistIndexAndTemplate = async (indexName, templateName) => {
  let results = await Promise.all([
    await client.indices.exists({ index: indexName }),
    await client.indices.existsTemplate({ name: templateName })
  ]);
  return { isExistIndex: results[0], isExistTemplate: results[1] };
};

const createIndex = async (indexName, type, mapping) => {
  try {
    let createdIndex = await client.indices.create({ index: indexName });
    let createdMapping = await client.indices.putMapping(
      template(indexName, type, null, mapping)
    );
    return [createdIndex, createdMapping];
  } catch (error) {
    await client.indices.delete({ index: indexName });
  }
};

const createTemplate = async (name, template) => {
  return await client.indices.putTemplate({ name: name, body: template });
};

const findUserById = async id => {
  return await client.search(
    template(
      'users',
      'user',
      null,
      bodyTemplate({ term: { 'user.id.keyword': id } }, null, null)
    )
  );
};

const insertUser = async (id, user) => {
  return await client.index(
    template('users', 'user', null, {
      user: {
        id: id,
        name: user.name,
        mail: user.mail
      }
    })
  );
};

const updateUser = async (id, user) => {
  return await client.updateByQuery(
    template(
      'users',
      'user',
      null,
      bodyTemplate(
        { term: { 'user.mail.keyword': user.mail } },
        {
          lang: 'painless',
          inline: `ctx._source.user.id ='${id}';`
        }
      )
    )
  );
};

const updateVisitor = async user => {
  return await client.updateByQuery(
    template(
      `workspace${today}`,
      'stack',
      null,
      bodyTemplate(
        { term: { 'id.keyword': user.id } },
        {
          lang: 'painless',
          inline: `ctx._source.user.isEntry = 'false';ctx._source.user.workspace.exit = '${moment().unix()}'`
        }
      )
    )
  );
};

const findVisitorById = async userId => {
  return await client.search(
    template(
      `workspace${today}`,
      'stack',
      null,
      bodyTemplate({ term: { 'user.id': userId } })
    )
  );
};

const insertVistor = async (user, purpose) => {
  return await client.index(
    template(`workspace${today}`, 'stack', user.id, {
      date: today,
      id: user.id,
      user: {
        isEntry: true,
        name: user.name,
        mail: user.mail,
        purpose: purpose,
        workspace: {
          entry: moment()
            .local('ja')
            .unix()
        }
      }
    })
  );
};

const findVisitorsByDate = async (from, to) => {
  return await client.search(
    template(
      `workspace${today}`,
      'stack',
      null,
      bodyTemplate({ range: { date: { gte: from, lte: to } } })
    )
  );
};

const aggregateVistorsByPurposeAndDate = async (order, to) => {
  return await client.search(
    template(
      `workspace${today}`,
      'stack',
      null,
      bodyTemplate({ range: { date: { lte: to } } }, null, {
        date: {
          terms: {
            field: 'date',
            order: {
              _key: order
            }
          },
          aggs: {
            purpose: {
              terms: {
                field: 'user.purpose.keyword',
                order: {
                  _count: 'desc'
                }
              }
            }
          }
        }
      })
    )
  );
};

module.exports = {
  isExistIndexAndTemplate,
  createIndex,
  createTemplate,
  findUserById,
  insertUser,
  updateUser,
  findVisitorById,
  findVisitorsByDate,
  insertVistor,
  updateVisitor,
  aggregateVistorsByPurposeAndDate
};

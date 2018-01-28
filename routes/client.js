'use strict'
const elasticsearch = require('elasticsearch');
const fastify = require('fastify')();
const moment = require('moment')
const today = moment().local('ja');


class Query {
    constructor(data) {
        this.index = "user";
        this.type = "stack";
        this.id = data.id;
        this.body = {
            "name": data.cardId
        }
    }
};

class ESClient {
    constructor(host, port) {
        const client = new elasticsearch.Client({
            host: host + ':' + port,
            log: 'trace'
        });
    }

    create(data) {
        let query = new Query(JSON.stringify(data));
        return client.index(query).then(resolve, response => {
            return { result: true, message: 'success' };
        }).catch(error => {
            console.log(error)
        });
    }
}

module.exports = ESClient;
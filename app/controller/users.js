'use strict';
const {
  REGISTOR_SCHEMA,
  UPDATE_SCHEMA,
  ENTRY_SCHEMA,
  OUT_SCHEMA,
  VISITORS_SCHEMA,
  AGGREGATE_SCHEMA
} = require('./schema');

const provider = require('../repository/provider')('localhost', 9200);

module.exports = async function(fastify, opt, next) {
  const handler = (response, reply) => {
    if (response.code === 1) {
      reply.code(400).send(response);
    }
    reply.send(response);
  };

  provider.prepare();

  fastify.post('/register', REGISTOR_SCHEMA, async (req, reply) => {
    provider.register(req.body).then(response => handler(response, reply));
  });

  fastify.post('/entry', ENTRY_SCHEMA, async (req, reply) => {
    provider.entry(req.body).then(response => handler(response, reply));
  });

  fastify.post('/update', UPDATE_SCHEMA, async (req, reply) => {
    provider.update(req.body).then(response => handler(response, reply));
  });

  fastify.post('/out', OUT_SCHEMA, async (req, reply) => {
    provider.check(req.body).then(response => handler(response, reply));
  });

  fastify.get('/users/:date', VISITORS_SCHEMA, async (req, reply) => {
    const date = req.params.date;
    if (date) {
      provider
        .fetchUsersByDate(req.params.date)
        .then(response => handler(response, reply));
    }
    // dateが取得できない場合は範囲指定とする。
    // const { from, to } = req.query;
  });

  fastify.get('/users/recent', VISITORS_SCHEMA, () => {
    // 直近の入手記録を返す。
  });

  fastify.get('/total/user/purpose', AGGREGATE_SCHEMA, () => {
    // 目的別の集計を返す
  });
  next();
};

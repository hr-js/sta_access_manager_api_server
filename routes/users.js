'use strict';
const {
  REGISTOR_SCHEMA,
  UPDATE_SCHEMA,
  ENTRY_SCHEMA,
  OUT_SCHEMA,
  USERS_SCHEMA,
} = require('../assetes/schema');

module.exports = async function(fastify, opt, next) {
  const provider = require('./provider')('localhost', 9200);
  const handler = (response, reply) => {
    if (response.code === 1) {
      reply.code(400).send(response);
    }
    reply.send(response);
  };

  provider.prepare();

  fastify.post('/register', REGISTOR_SCHEMA, async (req, reply) => {
    fastify.log.info('request: /register');
    provider.register(req.body).then(response => handler(response, reply));
  });

  fastify.post('/entry', ENTRY_SCHEMA, async (req, reply) => {
    fastify.log.info('request: /entry');
    provider.entry(req.body).then(response => handler(response, reply));
  });

  fastify.post('/update', UPDATE_SCHEMA, async (req, reply) => {
    fastify.log.info('request: /update');
    provider.update(req.body).then(response => handler(response, reply));
  });

  fastify.post('/out', OUT_SCHEMA, async (req, reply) => {
    fastify.log.info('request: /check');
    provider.check(req.body).then(response => handler(response, reply));
  });

  fastify.post('/users', USERS_SCHEMA, async (req, reply) => {
    fastify.log.info('request: /check');
    provider.check(req.body).then(response => handler(response, reply));
  });

  fastify.get('/users/:date', USERS_SCHEMA, async (req, reply) => {
    provider
      .fetchUsersByDate(req.params.date)
      .then(response => handler(response, reply));
  });

  next();
};

'use strict';

module.exports = async function(fastify, opt, next) {
  const {
    SCAN_SCHEMA,
    CHECK_SCHEMA,
    REGISTOR_SCHEMA,
    UPDATE_SCHEMA,
    PARTICIPANTS_SCHEMA,
  } = require('../assetes/schema');
const ESClient = require('./client');
// 初期化時にホスト名とポート番号を渡す
const client = new ESClient('localhost',9200);

  fastify.post('/scan', SCAN_SCHEMA, async (req, reply) => {
    fastify.log.info('request: /scan');
    reply.send({
      result: true,
      message: 'success',
    });
  });

  fastify.post('/check', CHECK_SCHEMA, async (req, reply) => {
    fastify.log.info('request: /check');
    reply.send({
      result: true,
      message: 'success',
    });
  });

  fastify.post('/register', REGISTOR_SCHEMA, async (req, reply) => {
    fastify.log.info('request: /register');
    
    client.create(req.body).then(response =>{
      reply.send(response);
    });
  });

  fastify.post('/update', UPDATE_SCHEMA, async (req, reply) => {
    fastify.log.info('request: /update');
    reply.send({
      result: true,
      message: 'success',
    });
  });

  fastify.get('/participants', PARTICIPANTS_SCHEMA, async (req, reply) => {
    fastify.log.info('request: /participants');
    reply.send({ hello: 'participants' });
  });

  next();
};

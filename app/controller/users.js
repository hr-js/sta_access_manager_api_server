'use strict';
const {
  REGISTOR_SCHEMA,
  UPDATE_SCHEMA,
  ENTRY_SCHEMA,
  OUT_SCHEMA,
  USERS_SCHEMA,
} = require('./schema/users');

const {
  register,
  update
} = require('../repository/user');

const {
  exit,
  entry,
  findByDate,
} = require('../repository/visitor');

const PURPOSE = require('../common/constraint/purpose');

const SUCCESS_STATUS = 200;
const VALIDATION_ERROR_STATUS = 400;

module.exports = async function(fastify, opt, next) {
  const res = (response, reply, statusCode = SUCCESS_STATUS) => {
    reply
      .code(statusCode)
      .send(response);
  };

  fastify.post('/register', REGISTOR_SCHEMA, async (req, reply) => {
    register(req.body)
      .then(response => response(response, reply));
  });

  fastify.post('/entry', ENTRY_SCHEMA, async (req, reply) => {
    if(!PURPOSE.includes(req.body.purpose)) {
      await res({
        error: 'validation error.',
        message: '適切な目的が選択されていません。',
        statusCode: VALIDATION_ERROR_STATUS,
      },
      reply,
      VALIDATION_ERROR_STATUS);

      return false;
    }

    entry(req.body)
      .then(response => response(response, reply))
      .catch();
  });

  fastify.post('/update', UPDATE_SCHEMA, async (req, reply) => {
    update(req.body).then(response => response(response, reply));
  });

  fastify.post('/exit', OUT_SCHEMA, async (req, reply) => {
    exit(req.body).then(response => response(response, reply));
  });

  fastify.get('/users/:date', USERS_SCHEMA, async (req, reply) => {
    findByDate(req.params.date).then(response => {
      reply.send(response);
    });
  });

  next();
};

'use strict';
const fastify = require('fastify')({
  logger: true,
});
const { SUCCSESS } = require('./schema');

fastify.get('/object', SUCCSESS, (req, reply) => {
  fastify.log.info(`request: ${req}`);
  reply.send({ result: { hello: 'world' }, test: 'hello' });
});

fastify.get('/array', SUCCSESS, (req, reply) => {
  fastify.log.info(`request: ${req}`);
  reply.send({
    result: ['foo', 'bar'],
  });
});
fastify.listen(3000, err => {
  fastify.log.info('fastify listend 3000');
  if (err) throw err;
});

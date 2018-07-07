const provider = require('../repository');

module.exports = async function(fastify, opts, next) {
  const {
    ACCESS_RCD_SCHEMA,
    LASTACCESS_RCD_SCHEMA,
    AGGREGATE_SCHEMA
  } = require('./schema/management');

  fastify.get('/users', ACCESS_RCD_SCHEMA, async (request, reply) => {
    const from = request.query.from;
    const to = request.query.to;
    let result = await provider.findByDate(from, to);
    reply.send(result);
  });

  fastify.get(
    '/users/recent',
    LASTACCESS_RCD_SCHEMA,
    async (request, reply) => {
      let result = await provider.findByRecent();
      reply.send(result);
    }
  );

  fastify.get(
    '/total/user/purpose',
    AGGREGATE_SCHEMA,
    async (request, reply) => {
      const order = request.query.order;
      const date = request.query.date;
      let result = await provider.aggregateByPurposeAndDate(order, date);
      reply.send(result);
    }
  );

  next();
};

module.exports = async function(fastify, opts, next) {
  const {
    ACCESS_RCD_SCHEMA,
    LASTACCESS_RCD_SCHEMA,
    AGGREGATE_SCHEMA,
  } = require('../assets/mgmtSchema');

  const handler = (response, reply) => {
    reply.send(response);
  };

  //TODO providerが作成されたらパスを合わせる
  const provider = require('./mgmtProvider')('localhost', 9200);

  fastify.get('/users', ACCESS_RCD_SCHEMA, async (request, reply) => {
    provider
      .getAccessRcd(request.date)
      .then(response => handler(response, reply));
  });

  fastify.get(
    '/users/recent',
    LASTACCESS_RCD_SCHEMA,
    async (request, reply) => {
      provider.getLastAcccessRcd().then(response => handler(response, reply));
    }
  );

  fastify.get(
    '/total/user/purpose',
    AGGREGATE_SCHEMA,
    async (request, reply) => {
      provider
        .getAggregate(request.sort)
        .then(response => handler(response, reply));
    }
  );

  next();
};

module.exports = async function(fastify, opts, next) {
  const {
    ACCESS_RCD_SCHEMA,
    LASTACCESS_RCD_SCHEMA,
    AGGREGATE_SCHEMA,
  } = require('./schema/management');

  const handler = (response, reply) => {
    reply.send(response);
  };

  //TODO provider書く

  fastify.get('/users', ACCESS_RCD_SCHEMA, async (request, reply) => {
    //TODO provider 入室記録取得
  });

  fastify.get(
    '/users/recent',
    LASTACCESS_RCD_SCHEMA,
    async (request, reply) => {
      //TODO provider 直近の入室記録取得
    }
  );

  fastify.get(
    '/total/user/purpose',
    AGGREGATE_SCHEMA,
    async (request, reply) => {
      //TODO provider 集計(目的別)
    }
  );

  next();
};

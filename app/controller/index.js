'use strict';
module.exports = async function(fastify, opt, next) {

  fastify.get('/', async (req, reply) => {
    reply.send('success!!');
  });


  next();
};

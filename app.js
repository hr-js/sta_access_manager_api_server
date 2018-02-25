'use strict';
const { createServer } = require('./server');
const fastify = createServer();

fastify.register(require('./routes/users'), { logLevel: 'debug' });

fastify.listen(3000, err => {
  fastify.log.info('fastify listend 3000');
  if (err) throw err;
});

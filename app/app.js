const serverBuilder = require('./controller/server');

(async () => {
  const fastify = await serverBuilder();
  fastify.listen(3000, '0.0.0.0', err => {
    fastify.log.info('fastify listend 3000');
    if (err) throw err;
  });
})();

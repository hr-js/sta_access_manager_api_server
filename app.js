const serverBuilder = require('./server');

(async() => {
  const fastify = await serverBuilder();
  fastify.listen(3000, err => {
    fastify.log.info('fastify listend 3000');
    if (err) throw err;
  });
})();

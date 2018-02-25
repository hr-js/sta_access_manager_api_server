const fetch = require('node-fetch');
const { createServer } = require('../server');

test('requst test', () => {
  const fastify = createServer();
  fastify.register(require('../routes/users'), { logLevel: 'debug' });
  fastify.listen(3000, err => {
    fastify.log.info('fastify listend 3000');
    //if (err) throw err;
  });
  fetch('http://localhost:3000/check', {
    method: 'POST',
    body: JSON.stringify({ cardId: '1' }),
    headers: { 'Content-Type': 'application/json' },
  })
    .then(res => res.json())
    .then(json => {
      console.log(json);

      expect(json).toBe({
        result: true,
        message: 'success',
      });
    })
    .catch(e => console.log(e));
});

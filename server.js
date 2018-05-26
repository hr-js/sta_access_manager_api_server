'use strict';
const fs = require('fs');
const path = require('path');
const getOpt = () => {
  switch (process.env.NODE_HTTP) {
  case 'http2':
    return {
      http2: true,
      https: {
        key: fs.readFileSync(path.join(__dirname, '.', 'https', 'cakey.pem')),
        cert: fs.readFileSync(
          path.join(__dirname, '.', 'https', 'cacert.pem')
        ),
        passphrase: 'xxxxx',
      },
      logger: true,
    };
  default:
    return {
      logger: true,
    };
  }
};
const fastify = require('fastify')(getOpt());
fastify.register(require('./routes/users'), { logLevel: 'debug' });
fastify.register(require('./routes/management'), { logLevel: 'debug' });

fastify.listen(3000, err => {
  fastify.log.info('fastify listend 3000');
  if (err) throw err;
});

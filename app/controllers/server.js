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

const buildServer = async () => {
  const fastify = (await require('fastify'))(getOpt());

  fastify.register(await require('../users'), { logLevel: 'error' });

  // FIXME schemaの定義が正しくないので修正が必要 -> 終わったらコメント外す
  //fastify.register(require('./management'), { logLevel: 'error' });

  fastify.addHook('onRequest', (req, res, next) => {
    fastify.log.info(req);
    next();
  });

  return fastify;
};

module.exports = buildServer;

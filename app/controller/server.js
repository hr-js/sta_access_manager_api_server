'use strict';
const fs = require('fs');
const path = require('path');
const init = require('../repository/init');
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

  fastify.register(require('fastify-swagger'), {
    routePrefix: '/documentation',
    swagger: {
      info: {
        title: 'sta_access_manager',
        description: 'sta_access_manager => 入館画面用',
        version: '0.1.0'
      },
      externalDocs: {
        url: 'https://github.com/hr-js/sam_api_server',
        description: 'API source'
      },
      host: 'localhost',
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json'],
      tags: [
        { name: 'user', description: 'member info' },
        { name: 'visitor', description: 'member visit info' }
      ],
    },
    exposeRoute: true
  });

  fastify.register(await require('./users'), { logLevel: 'error' });

  fastify.register(require('./management'), { logLevel: 'error' });

  fastify.addHook('onRequest', (req, res, next) => {
    // fastify.log.info(req);
    next();
  });

  // await init();

  return fastify;
};

module.exports = buildServer;

module.exports = class {
  static async post(url, payload, callback) {
    const fastify = await (await require('../../../app/controllers/server'))();

    fastify.inject(
      {
        method: 'POST',
        url,
        payload
      },
      response => {
        callback(response);
      }
    );

    fastify.close();
  }
};

module.exports = class {
  static async post(url, payload, callback) {
    const fastify = await (await require('../../../app/controller/server'))();

    fastify.inject(
      {
        method: 'POST',
        url,
        payload
      },
      (error, response) => {

        if (error) throw new Error(`リクエスト内でのエラー${error}`);
        callback(response);
      }
    );

    fastify.close();
  }
};

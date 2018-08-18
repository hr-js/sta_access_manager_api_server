module.exports = class {
  static async post(url, payload, callback) {
    await this.request(
      {
        method: 'POST',
        url,
        payload,
        callback
      }
    );
  }

  static async put(url, payload, callback) {
    await this.request(
      {
        method: 'PUT',
        url,
        payload,
        callback
      }
    );
  }

  static async request({method, url, payload, callback}) {
    const fastify = await (await require('../../../app/controller/server'))();
    fastify.inject(
      {
        method,
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

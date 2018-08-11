'use strict';
const {
  REGISTER_SCHEMA,
  UPDATE_SCHEMA,
  ENTRY_SCHEMA,
  OUT_SCHEMA,
  USERS_SCHEMA,
} = require('./schema/users');

const {
  register,
  update
} = require('../repository/user');

const {
  exit,
  entry,
  findByDate,
} = require('../repository/visitor');

const PURPOSE = require('../common/constraint/purpose');

// TODO: 別のファイルに切り出す.
const SUCCESS_STATUS = 200;
const CREATED_STATUS = 201;
const VALIDATED_OR_FAILED_CODE = 400;

/**
 * Daoに接続した結果と成否でレスポンスに必要なデータを作成する.
 * @param executeDaoMethod Daoのメソッド.
 * @param params requestで送られてきたパラメータ.
 * @param successStatus Daoが正常に実行されたときのレスポンスに表示するステータスコード.
 * @param errorStatus Daoの処理で異常となったときにレスポンスに表示するステータスコード.
 * @returns {Promise<T | {data: any, status: *}>} data: レスポンスのデータ, status: ステータスコードを <br/>
 *          {@code Promise} でラップしたオブジェクト.
 */
const createResponseDate = async (executeDaoMethod, params, successStatus, errorStatus) => {
  return executeDaoMethod(params)
    .then(data => ({
      data,
      status: successStatus
    }))
    .catch(data => ({
      data,
      status: errorStatus
    }));
};

module.exports = async function(fastify, opt, next) {

  fastify.post('/register', REGISTER_SCHEMA, async (req, reply) => {
    const response = await createResponseDate(register, req.body, SUCCESS_STATUS, VALIDATED_OR_FAILED_CODE);

    reply
      .code(response.status)
      .send(response.data);

  });

  fastify.post('/entry', ENTRY_SCHEMA, async (req, reply) => {
    if(!PURPOSE.includes(req.body.purpose)) {
      reply
        .code(VALIDATED_OR_FAILED_CODE)
        .send({
          error: 'validation error.',
          message: '適切な目的が選択されていません。',
          statusCode: VALIDATED_OR_FAILED_CODE,
        });
    }

    const response = await createResponseDate(entry, req.body, CREATED_STATUS, VALIDATED_OR_FAILED_CODE);
    reply
      .code(response.status)
      .send(response.data);
  });

  fastify.post('/update', UPDATE_SCHEMA, async (req, reply) => {
    const response = await createResponseDate(update, req.body, SUCCESS_STATUS, VALIDATED_OR_FAILED_CODE);
    reply
      .code(response.status)
      .send(response.data);
  });

  fastify.post('/exit', OUT_SCHEMA, async (req, reply) => {
    const response = await createResponseDate(exit, req.body, SUCCESS_STATUS, VALIDATED_OR_FAILED_CODE);
    reply
      .code(response.status)
      .send(response.data);
  });

  fastify.get('/user/:id/status',async (req, reply) => {
    // TODO: Daoのメソッド決定後実装.
    // const response = await createResponseDate(exit, req.body, SUCCESS_STATUS, VALIDATION_ERROR_STATUS);
    // reply
    //   .code(response.status)
    //   .send(response.data);
  });

  fastify.get('/users/:date', USERS_SCHEMA, async (req, reply) => {
    const response = await createResponseDate(findByDate, req.body, SUCCESS_STATUS, VALIDATED_OR_FAILED_CODE);
    reply
      .code(response.status)
      .send(response.data);
  });

  next();
};

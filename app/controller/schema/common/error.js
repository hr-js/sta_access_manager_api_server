'use strict';

const CLIENT_ERROR_RESPONSE = {
  type: 'object',
  properties: {
    error: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
  },
};

const BAD_REQUEST_RESPONSE = {
  description: 'bad request',
  type: 'object',
  properties: {
    message: { type: 'string' },
  },
};

const INTERNAL_SERVER_ERROR_RESPONSE = {
  description: 'サーバー側の処理に問題が発生',
  type: 'object',
  properties: {
    error: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
  },
};

module.exports = {
  BAD_REQUEST_RESPONSE,
  CLIENT_ERROR_RESPONSE,
  INTERNAL_SERVER_ERROR_RESPONSE,
};

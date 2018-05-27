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

const VALIDATION_ERROR_RESPONSE = {
  type: 'object',
  properties: {
    error: { type: 'string' },
    message: { type: 'string' },
    statusCode: { type: 'number' },
  },
};

const INTERNAL_SERVER_ERROR_RESPONSE = {
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
  VALIDATION_ERROR_RESPONSE,
  CLIENT_ERROR_RESPONSE,
  INTERNAL_SERVER_ERROR_RESPONSE,
};

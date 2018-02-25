'use strict';

const ANY_ERROR_RESPONSE = {
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

module.exports = {
  REGISTOR_SCHEMA: {
    schema: {
      body: {
        type: 'object',
        required: ['id', 'cardId'],
        properties: {
          id: { type: 'string' },
          cardId: { type: 'string' },
        },
      },
      response: {
        '2xx': {
          type: 'object',
          properties: {
            result: { type: 'boolean' },
            message: { type: 'string' },
          },
        },
        '4xx': ANY_ERROR_RESPONSE,
        '400': VALIDATION_ERROR_RESPONSE,
      },
    },
  },
  UPDATE_SCHEMA: {
    schema: {
      body: {
        type: 'object',
        required: ['id', 'cardId'],
        properties: {
          id: { type: 'string' },
          cardId: { type: 'string' },
        },
        response: {
          '2xx': {
            type: 'object',
            properties: {
              result: { type: 'boolean' },
              message: { type: 'string' },
            },
          },
          '4xx': ANY_ERROR_RESPONSE,
          '400': VALIDATION_ERROR_RESPONSE,
        },
      },
    },
  },
  ENTRY_SCHEMA: {
    schema: {
      body: {
        type: 'object',
        required: ['id', 'cardId'],
        properties: {
          id: { type: 'string' },
          cardId: { type: 'string' },
        },
        response: {
          '2xx': {
            type: 'object',
            properties: {
              result: { type: 'boolean' },
              message: { type: 'string' },
            },
          },
          '4xx': ANY_ERROR_RESPONSE,
          '400': VALIDATION_ERROR_RESPONSE,
        },
      },
    },
  },
  OUT_SCHEMA: {
    schema: {
      body: {
        type: 'object',
        required: ['id', 'cardId'],
        properties: {
          id: { type: 'string' },
          cardId: { type: 'string' },
        },
        response: {
          '2xx': {
            type: 'object',
            properties: {
              result: { type: 'boolean' },
              message: { type: 'string' },
            },
          },
          '4xx': ANY_ERROR_RESPONSE,
          '400': VALIDATION_ERROR_RESPONSE,
        },
      },
    },
  },
  PARTICIPANTS_SCHEMA: {
    schema: {
      response: {
        '2xx': {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              porpose: { type: 'string' },
              isEntry: { type: 'boolean' },
            },
          },
        },
        '4xx': ANY_ERROR_RESPONSE,
        '400': VALIDATION_ERROR_RESPONSE,
      },
    },
  },
};

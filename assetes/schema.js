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
  ENTRY_SCHEMA: {
    schema: {
      body: {
        type: 'object',
        required: ['id', 'purpose'],
        properties: {
          id: { type: 'string' },
          porpose: { type: 'string' },
        },
      },
      response: {
        '2xx': {
          type: 'object',
          properties: {
            id: { type: 'string' },
            user: {
              type: 'object',
              properties: {
                name: { type: 'string' },
                isEntry: { type: 'boolean' },
              },
            },
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
        required: ['id'],
        properties: {
          id: { type: 'string' },
        },
      },
      response: {
        200: {
          type: 'object',
          properties: {
            id: { type: 'string' },
          },
        },
        '4xx': ANY_ERROR_RESPONSE,
        '400': VALIDATION_ERROR_RESPONSE,
      },
    },
  },
  OUT_SCHEMA: {
    schema: {
      body: {
        type: 'object',
        required: ['id', 'user'],
        properties: {
          id: { type: 'string' },
          user: {
            type: 'object',
            properties: {
              mail: { type: 'string' },
            },
          },
        },
        response: {
          '2xx': {
            type: 'object',
            properties: {
              id: { type: 'string' },
              user: {
                type: 'object',
                properties: {
                  mail: { type: 'string' },
                },
              },
            },
          },
          '4xx': ANY_ERROR_RESPONSE,
          '400': VALIDATION_ERROR_RESPONSE,
        },
      },
    },
  },
  USERS_SCHEMA: {
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

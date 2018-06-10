'use strict';

const {
  CLIENT_ERROR_RESPONSE,
  VALIDATION_ERROR_RESPONSE,
  INTERNAL_SERVER_ERROR_RESPONSE
} = require('./common/error.js');

const { id, mail } = require('./common/format');

module.exports = {
  REGISTOR_SCHEMA: {
    schema: {
      body: {
        type: 'object',
        required: ['id', 'user'],
        properties: {
          id,
          user: {
            type: 'object',
            required: ['mail', 'name'],
            properties: {
              mail,
              name: { type: 'string' }
            }
          }
        },
        response: {
          '2xx': {
            type: 'object',
            properties: {
              id,
              user: {
                type: 'object',
                properties: {
                  mail,
                  name: { type: 'string' }
                }
              }
            }
          },
          '4xx': CLIENT_ERROR_RESPONSE,
          '400': VALIDATION_ERROR_RESPONSE,
          '500': INTERNAL_SERVER_ERROR_RESPONSE
        }
      }
    }
  },
  UPDATE_SCHEMA: {
    schema: {
      body: {
        type: 'object',
        required: ['id'],
        properties: {
          id
        }
      },
      response: {
        200: {
          type: 'object',
          properties: {
            id
          }
        },
        '4xx': CLIENT_ERROR_RESPONSE,
        '400': VALIDATION_ERROR_RESPONSE,
        '500': INTERNAL_SERVER_ERROR_RESPONSE
      }
    }
  }
};

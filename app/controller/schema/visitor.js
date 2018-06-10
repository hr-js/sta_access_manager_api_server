'use strict';

const {
  CLIENT_ERROR_RESPONSE,
  VALIDATION_ERROR_RESPONSE,
  INTERNAL_SERVER_ERROR_RESPONSE
} = require('./common/error');

const { id, mail, date } = require('./common/format');
module.exports = {
  ENTRY_SCHEMA: {
    schema: {
      body: {
        type: 'object',
        required: ['id', 'purpose'],
        properties: {
          id,
          porpose: { type: 'string' }
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
                name: { type: 'string' },
                isEntry: { type: 'boolean' }
              }
            }
          }
        },
        '4xx': CLIENT_ERROR_RESPONSE,
        '400': VALIDATION_ERROR_RESPONSE,
        '500': INTERNAL_SERVER_ERROR_RESPONSE
      }
    }
  },
  OUT_SCHEMA: {
    schema: {
      body: {
        type: 'object',
        required: ['id', 'user'],
        properties: {
          id,
          user: {
            type: 'object',
            required: ['mail'],
            properties: {
              mail
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
                  mail
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
  VISITORS_SCHEMA: {
    schema: {
      querystring: {
        from: date,
        to: date
      },
      params: {
        date: date
      },
      response: {
        '2xx': {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              mail: { type: 'string' },
              name: { type: 'string' },
              porpose: { type: 'string' },
              isEntry: { type: 'boolean' },
              workspace: {
                type: 'object',
                properties: {
                  entry: { type: 'number' },
                  exit: { type: 'number' }
                }
              }
            }
          }
        },
        '4xx': CLIENT_ERROR_RESPONSE,
        '400': VALIDATION_ERROR_RESPONSE,
        '500': INTERNAL_SERVER_ERROR_RESPONSE
      }
    }
  },
  AGGREGATE_SCHEMA: {
    schema: {
      response: {
        '200': {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              date: {
                type: 'string',
                pattern: '^[0-9]{8}$'
              },
              purpose: {
                type: 'object',
                properties: {
                  work: { type: 'number' },
                  study: { type: 'number' },
                  meetUp: { type: 'number' },
                  circle: { type: 'number' }
                }
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
};

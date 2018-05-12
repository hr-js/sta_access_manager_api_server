'use strict';

const {
  ANY_ERROR_RESPONSE,
  VALIDATION_ERROR_RESPONSE,
  INTERNAL_SERVER_ERROR_RESPONCE,
} = require('./util/errorHelper.js');

module.exports = {
  REGISTOR_SCHEMA: {
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
              name: { type: 'string' }
            }
          }
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
                  name: { type: 'string' }
                }
              }
            }
          },
          '4xx': ANY_ERROR_RESPONSE,
          '400': VALIDATION_ERROR_RESPONSE,
          '500': INTERNAL_SERVER_ERROR_RESPONCE,
        }
      }
    }
  },
  ENTRY_SCHEMA: {
    schema: {
      body: {
        type: 'object',
        required: ['id', 'purpose'],
        properties: {
          id: { type: 'string' },
          porpose: { type: 'string' }
        }
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
                isEntry: { type: 'boolean' }
              }
            }
          }
        },
        '4xx': ANY_ERROR_RESPONSE,
        '400': VALIDATION_ERROR_RESPONSE,
        '500': NTERNAL_SERVER_ERROR_RESPONCE,
      }
    }
  },
  UPDATE_SCHEMA: {
    schema: {
      body: {
        type: 'object',
        required: ['id'],
        properties: {
          id: { type: 'string' }
        }
      },
      response: {
        200: {
          type: 'object',
          properties: {
            id: { type: 'string' }
          }
        },
        '4xx': ANY_ERROR_RESPONSE,
        '400': VALIDATION_ERROR_RESPONSE,
        '500': NTERNAL_SERVER_ERROR_RESPONCE,
      }
    }
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
              mail: { type: 'string' }
            }
          }
        },
        response: {
          '2xx': {
            type: 'object',
            properties: {
              id: { type: 'string' },
              user: {
                type: 'object',
                properties: {
                  mail: { type: 'string' }
                }
              }
            }
          },
          '4xx': ANY_ERROR_RESPONSE,
          '400': VALIDATION_ERROR_RESPONSE,
          '500': NTERNAL_SERVER_ERROR_RESPONCE,
        }
      }
    }
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
              isEntry: { type: 'boolean' }
            }
          }
        },
        '4xx': ANY_ERROR_RESPONSE,
        '400': VALIDATION_ERROR_RESPONSE,
        '500': NTERNAL_SERVER_ERROR_RESPONCE,
      }
    }
  }
};

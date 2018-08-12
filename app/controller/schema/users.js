'use strict';

const {
  CLIENT_ERROR_RESPONSE,
  VALIDATION_ERROR_RESPONSE,
  INTERNAL_SERVER_ERROR_RESPONSE,
} = require('./common/error.js');

const PURPOSE = require('../../common/constraint/purpose');

const id = {
  type: 'string',
  description: 'user\'s id'
};

const mail = {
  type: 'string',
  description: 'user\'s email',
  pattern: '^([a-za-z0-9])+([a-zA-Z0-9\\._-])*@([a-zA-Z0-9\\._-]+)*$',
};

const name = {
  type: 'string',
  description: 'user\'s name',
};

const isEntry = {
  type: 'boolean',
  description: 'Whether user is coming or not',
};

const purpose = {
  type: 'string',
  description: 'The purpose to visit',
  enum: PURPOSE
};

module.exports = {
  REGISTER_SCHEMA: {
    schema: {
      tags: ['user'],
      description: 'The user to create.',
      body: {
        type: 'object',
        required: ['id', 'user'],
        properties: {
          id,
          user: {
            type: 'object',
            description: 'The user\'s info to create',
            required: ['mail', 'name'],
            properties: {
              mail,
              name,
            }
          }
        },
      },
      response: {
        '201': {
          type: 'object',
          properties: {
            id,
            user: {
              description: 'The created user\'s info',
              type: 'object',
              properties: {
                mail,
                name,
              }
            }
          }
        },
        '4xx': CLIENT_ERROR_RESPONSE,
        '400': VALIDATION_ERROR_RESPONSE,
        '500': INTERNAL_SERVER_ERROR_RESPONSE,
      },
    },
  },
  ENTRY_SCHEMA: {
    schema: {
      tags: ['visitor'],
      description: '入室処理',
      body: {
        type: 'object',
        required: ['id', 'purpose'],
        properties: {
          id,
          purpose,
        },
        response: {
          '201': {
            type: 'object',
            properties: {
              id,
              user: {
                type: 'object',
                properties: {
                  name,
                  isEntry,
                },
              },
            },
          },
          '4xx': CLIENT_ERROR_RESPONSE,
          '400': VALIDATION_ERROR_RESPONSE,
          '500': INTERNAL_SERVER_ERROR_RESPONSE,
        },
      },
    },
  },
  UPDATE_SCHEMA: {
    schema: {
      tags: ['user'],
      description: 'Update user info.',
      body: {
        type: 'object',
        required: ['id','user'],
        properties: {
          id,
          user: {
            type: 'object',
            required: ['name'],
            properties: {
              name,
            }
          }
        }
      },
      response: {
        200: {
          type: 'object',
          properties: {
            id,
            user: {
              type: 'object',
              properties: {
                name,
              }
            }
          }
        },
        '4xx': CLIENT_ERROR_RESPONSE,
        '400': VALIDATION_ERROR_RESPONSE,
        '500': INTERNAL_SERVER_ERROR_RESPONSE,
      },
    },
  },
  EXIT_SCHEMA: {
    schema: {
      tags: ['visitor'],
      description: '退出処理',
      body: {
        type: 'object',
        required: ['id'],
        properties: {
          id,
        },
        response: {
          '2xx': {
            type: 'object',
            properties: {
              id,
              user: {
                type: 'object',
                description: 'The user\'s info to leave.',
                properties: {
                  name,
                  isEntry,
                }
              }
            }
          },
          '4xx': CLIENT_ERROR_RESPONSE,
          '400': VALIDATION_ERROR_RESPONSE,
          '500': INTERNAL_SERVER_ERROR_RESPONSE,
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
              name,
              purpose,
              isEntry,
            },
          },
        },
        '4xx': CLIENT_ERROR_RESPONSE,
        '400': VALIDATION_ERROR_RESPONSE,
        '500': INTERNAL_SERVER_ERROR_RESPONSE,
      },
    },
  },
};


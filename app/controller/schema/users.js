'use strict';

const {
  BAD_REQUEST_RESPONSE,
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
          description: 'ユーザー登録成功',
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
        '400': BAD_REQUEST_RESPONSE,
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
      },
      response: {
        '201': {
          description: '入室処理成功',
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
        '400': BAD_REQUEST_RESPONSE,
        '500': INTERNAL_SERVER_ERROR_RESPONSE,
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
            required: ['mail'],
            properties: {
              mail,
              name,
            }
          }
        }
      },
      response: {
        200: {
          description: '更新成功',
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
        '400': BAD_REQUEST_RESPONSE,
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
      },
      response: {
        '201': {
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
        '400': BAD_REQUEST_RESPONSE,
        '500': INTERNAL_SERVER_ERROR_RESPONSE,
      },
    },
  },
  USER_STATUS_SCHEMA: {
    schema: {
      tags: ['visitor'],
      description: '入室確認処理',
      params: {
        type: 'object',
        properties: {
          id,
        },
      },
      response: {
        '200': {
          description: '入室状況取得成功',
          type: 'object',
          properties: {
            id,
            user: {
              description: '入室者情報',
              type: 'object',
              properties: {
                isEntry,
              }
            }
          },
        },
      },
      '400': BAD_REQUEST_RESPONSE,
      '500': INTERNAL_SERVER_ERROR_RESPONSE,
    },
  },
  USERS_SCHEMA: {
    schema: {
      querystring: {
        from: {
          description: 'YYYYMMDD',
          type: 'string',
        },
        to: {
          description: 'YYYYMMDD',
          type: 'string',
        },
      },
      response: {
        '200': {
          description: '一覧取得成功',
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id,
              user: {
                description: '入室者情報',
                type: 'object',
                properties: {
                  name,
                  purpose,
                  isEntry,
                }
              }
            },
          },
        },
        '400': BAD_REQUEST_RESPONSE,
        '500': INTERNAL_SERVER_ERROR_RESPONSE,
      },
    },
  },
};


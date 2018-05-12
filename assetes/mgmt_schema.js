'use strict';

const COMMON_500_ERROR = {
  type: 'object',
  properties: {
    error: {
      message: {
        type: 'string',
      },
    },
  },
};

module.exports = {
  ACCESS_RCD_SCHEMA: {
    schema: {
      querystring: {
        from: {
          type: 'string',
          pattern: '^[0-9]{8}$',
        },
        to: {
          type: 'string',
          pattern: '^[0-9]{8}$',
        },
      },
      responce: {
        '200': {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              mail: { type: 'string' },
              name: { type: 'string' },
              purpose: { type: 'string' },
              isEntry: { type: 'boolean' },
              workspace: {
                type: 'object',
                properties: {
                  entry: { type: 'number' },
                  exit: { type: 'number' },
                },
              },
            },
          },
        },
        '500': COMMON_500_ERROR,
      },
    },
  },
  LASTACCESS_RCD_SCHEMA: {
    schema: {
      responce: {
        '200': {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              mail: { type: 'string' },
              name: { type: 'string' },
              purpose: { type: 'string' },
              isEntry: { type: 'boolean' },
              workspace: {
                type: 'object',
                properties: {
                  entry: { type: 'number' },
                  exit: { type: 'number' },
                },
              },
            },
          },
        },
        '500': COMMON_500_ERROR,
      },
    },
  },
  AGGREGATE_SCHEMA: {
    schema: {
      responce: {
        '200': {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              date: 'date',
              purpose: {
                type: 'object',
                properties: {
                  work: { type: 'number' },
                  study: { type: 'number' },
                  meetUp: { type: 'number' },
                  circle: { type: 'number' },
                },
              },
            },
          },
        },
        '500': COMMON_500_ERROR,
      },
    },
  },
};

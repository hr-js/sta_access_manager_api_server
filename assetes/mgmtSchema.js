'use strict';

const {
  CLIENT_ERROR_RESPONSE,
  VALIDATION_ERROR_RESPONSE,
  INTERNAL_SERVER_ERROR_RESPONSE,
} = require('./util/errorHelper.js');

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
      response: {
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
        '500': INTERNAL_SERVER_ERROR_RESPONSE,
      },
    },
  },
  LASTACCESS_RCD_SCHEMA: {
    schema: {
      response: {
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
        '4xx': CLIENT_ERROR_RESPONSE,
        '400': VALIDATION_ERROR_RESPONSE,
        '500': INTERNAL_SERVER_ERROR_RESPONSE,
      },
    },
  },
  AGGREGATE_SCHEMA: {
    schema: {
      response: {
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
        '4xx': CLIENT_ERROR_RESPONSE,
        '400': VALIDATION_ERROR_RESPONSE,
        '500': INTERNAL_SERVER_ERROR_RESPONSE,
      },
    },
  },
};

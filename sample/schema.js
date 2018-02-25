'use strict';

/**
/ --types--
/ string
/ number
/ boolean
/ array
/ ->以下のようにarrayに入る値の方を指定する
/   items: {
/     type: 'string',
/   }
/ array
/ object
/ null
*/

module.exports = {
  SUCCSESS: {
    schema: {
      response: {
        200: {
          type: 'object',
          properties: {
            result: {
              type: 'array',
              items: {
                type: 'string',
              },
            },
          },
        },
      },
    },
  },

  FAIL: {
    schema: {
      response: {
        500: {
          type: 'object',
          properties: {
            result: {
              type: 'object',
            },
          },
        },
      },
    },
  },

  NOT_FOUND: {
    schema: {
      response: {
        404: {
          type: 'object',
          properties: {
            result: {
              type: 'string',
            },
          },
        },
      },
    },
  },
};

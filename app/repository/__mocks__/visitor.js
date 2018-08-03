'use strict';

module.exports = {
  exit: async () => ({
    id: '0000001',
    user: {
      mail: 'john.doe@test.jp',
    },
  }),

  entry: async () => ({
    id: '0000001',
    user: {
      name: 'John Doe',
      isEntry: true,
    },
  }),

  findByDate: async () => ({
    id: 'ab'
  }),

};

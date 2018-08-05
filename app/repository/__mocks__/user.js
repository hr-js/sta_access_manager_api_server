'use strict';
const register = async () => {
  return {
    statusCode: 0,
    id: '0000001',
    user: {
      mail: 'john.doe@test.jp',
      name: 'John Doe',
    },
  };
};

const update = async () => {
  return {
    id: '0000001',
    user: {
      mail: 'john.doe@test.jp',
    }
  };
};

module.exports = {
  register,
  update,
};

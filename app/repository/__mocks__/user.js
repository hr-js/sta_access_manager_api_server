'use strict';
const register = async () => {
  return {
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
      name: 'some user name',
    }
  };
};

module.exports = {
  register,
  update,
};

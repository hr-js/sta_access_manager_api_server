'user strict';
const { findUserById, insertUser, updateUser } = require('./dao');
const errorMessage = require('./constraint/error');

const register = async data => {
  let result = await findUserById(data.id);
  if (result.hits.hits.length > 0) {
    throw new Error(errorMessage.duplicateUser);
  }
  await insertUser(data.id, data.user);
  return {
    user: data.user
  };
};

const update = async data => {
  let result = await updateUser(data.id, data.user);
  if (result.total === 0) {
    throw new Error(errorMessage.unregisteredUser);
  }
  return {
    id: data.id,
    user: {
      mail: data.user.mail
    }
  };
};
module.exports = { register, update };

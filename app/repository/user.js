'user strict';
const errorMessage = require('./constraint/error');
const {
  findUserById,
  putUser,
  findUserByMailAddress,
  deleteUserById
} = require('./dynamodb/client');

const register = async data => {
  const { mail, name } = data.user;
  let user = await findUserById({
    TableName: 'user',
    Key: { id: data.id }
  });
  if (user) {
    throw new Error(errorMessage.duplicateUser);
  }
  await putUser({ TableName: 'user', Item: { id: data.id, mail, name } });
  return {
    user: data.user
  };
};

const update = async data => {
  const { mail, name } = data.user;
  const existUsers = await findUserByMailAddress({
    TableName: 'user',
    IndexName: 'mail_index',
    KeyConditionExpression: 'mail = :mail_val',
    ExpressionAttributeValues: {
      ':mail_val': mail
    }
  });
  const exist = existUsers.pop();
  await deleteUserById({
    TableName: 'user',
    Key: {
      id: exist.id
    }
  });
  await putUser({ TableName: 'user', Item: { id: data.id, mail, name } });
  return {
    id: data.id,
    user: {
      mail,
      name
    }
  };
};
module.exports = { register, update };

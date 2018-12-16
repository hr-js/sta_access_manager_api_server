const AWS = require('aws-sdk');

AWS.config.update({
  region: 'ap-northeast-1',
  endpoint: 'http://localhost:8000'
});

const dynamoDB = new AWS.DynamoDB();

const client = new AWS.DynamoDB.DocumentClient();

const createTable = async param => {
  const tablenames = await dynamoDB.listTables().promise();
  const isExist =
    tablenames.TableNames.filter(name => {
      return name === param.TableName;
    }).length > 0;
  if (isExist) return;
  try {
    await dynamoDB.createTable(param).promise();
  } catch (error) {
    throw error;
  }
};

const putUser = async param => {
  await client.put(param).promise();
};

const findUserById = async param => {
  const result = await client.get(param).promise();
  return result.Item;
};

const findUserByMailAddress = async param => {
  const result = await client.query(param).promise();
  return result.Items;
};

const deleteUserById = async param => {
  const result = await client.delete(param).promise();
  return result;
};

const findVisitorsByDate = async param => {
  const result = await client.query(param).promise();
  return result.Items;
};

module.exports = {
  createTable,
  putUser,
  findUserById,
  findUserByMailAddress,
  deleteUserById,
  findVisitorsByDate
};

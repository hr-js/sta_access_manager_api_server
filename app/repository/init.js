'use strict';
const userTable = require('./config/user.json');
const workspaceTable = require('./config/workspace.json');

const { createTable } = require('./dynamodb/client');

const init = async () => {
  try {
    await createTable(userTable);
    await createTable(workspaceTable);
  } catch (error) {
    init();
  }
};

module.exports = init;

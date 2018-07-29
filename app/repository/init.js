'use strict';
const mapping = require('./config/mapping.json');
const { isExistIndex, createIndex, createTemplate } = require('./dao');

const init = async () => {
  let result = null;
  let id = await setInterval(async () => {
    if (!(await isExistIndex('users'))) {
      result = await createIndex('users', 'user', mapping.user.mappings.user);
    }
    await createTemplate('room', mapping.template);
    if (result) {
      clearInterval(id);
    }
  }, 5000);
};

module.exports = init;

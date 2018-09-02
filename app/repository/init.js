'use strict';
const mapping = require('./config/mapping.json');
const {
  isExistIndexAndTemplate,
  createIndex,
  createTemplate
} = require('./dao');

const init = () => {
  let id = setInterval(async () => {
    let result = await isExistIndexAndTemplate('users', 'room');
    if (!result.isExistIndex) {
      await createIndex('users', 'user', mapping.user.mappings.user);
    }
    if (!result.isExistTemplate) {
      await createTemplate('room', mapping.template);
    }
    if (result.isExistIndex && result.isExistTemplate) {
      clearInterval(id);
    }
  }, 5000);
};

module.exports = init;

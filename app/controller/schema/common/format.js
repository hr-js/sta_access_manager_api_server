'use strict';

const id = {
  type: 'string'
};

const mail = {
  type: 'string',
  pattern: '^([a-za-z0-9])+([a-zA-Z0-9\\._-])*@([a-zA-Z0-9\\._-]+)*$'
};

const date = {
  type: 'string',
  pattern: '^[0-9]{8}$'
};

module.exports = {
  id,
  mail,
  date
};

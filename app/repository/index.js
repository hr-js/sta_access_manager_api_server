'use strict';
const { register, update } = require('./user');
const { exit, entry, findByDate, aggregateByPurposeAndDate,findByRecent } = require('./visitor');

module.exports = {
  register,
  update,
  exit,
  entry,
  findByDate,
  aggregateByPurposeAndDate,
  findByRecent
};

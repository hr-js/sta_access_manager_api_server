'use strict';
const PURPOSE = require('../common/constraint/purpose');
const ORDER = require('./constraint/order');
const locale = require('moment')().local('ja');
const {
  findUserById,
  findVisitorsByDate,
  insertVistor,
  updateVisitor,
  aggregateVistorsByPurposeAndDate
} = require('./dao');
const errorMessage = require('./constraint/error');


const exit = async data => {
  let users = await findUserById(data.id);
  if (users.hits.hits.length === 0) {
    throw new Error(errorMessage.unregisteredUser);
  }
  let user = users.hits.hits[0]._source.user;
  let updateResult = await updateVisitor(user);
  if (updateResult.total === 0) {
    return {
      id: user.id
    };
  }
  return {
    id: user.id,
    user: {
      name: user.name,
      isEntry: false
    }
  };
};

const entry = async data => {
  let users = await findUserById(data.id);
  if (users.hits.hits.length === 0) {
    throw new Error(errorMessage.unregisteredUser);
  }
  let purpose = data.purpose;
  if (!PURPOSE.includes(purpose)) {
    throw new Error(errorMessage.unsupportedPurpose);
  }
  let user = users.hits.hits[0]._source.user;
  await insertVistor(user, purpose);
  return {
    id: user.id,
    user: {
      name: user.name,
      isEntry: true
    }
  };
};

const findByDate = async (
  from = locale.clone().format('YYYYMMDD'),
  to = from
) => {
  let visitors = await findVisitorsByDate(from, to);
  return visitors.hits.hits.map(visitor => {
    return visitor._source.user;
  });
};

const findByRecent = async (today = locale.clone()) => {
  const dayOfWeek = locale.day();
  switch (dayOfWeek) {
  case 0:
    today.weekday(-2);
    break;
  case 1:
    today.weekday(-3);
    break;
  case 2:
    today.weekday(-4);
    break;
  case 3:
    today.weekday(-5);
    break;
  case 4:
    today.weekday(-6);
    break;
  case 5:
    today.weekday(-7);
    break;
  default:
    break;
  }
  let result = await findByDate(today.format('YYYYMMDD'));
  if (result.length) {
    return result;
  }
  return await findByRecent(today.weekday(-8));
};

const aggregateByPurposeAndDate = async (order, to) => {
  if (!ORDER.includes(order)) {
    order = 'desc';
  }
  let results = await aggregateVistorsByPurposeAndDate(order, to);
  if(!results.aggregations.date.buckets.length){
    return [];
  }
  return results.aggregations.date.buckets.map(bucket => {
    let purpose = {};
    bucket.purpose.buckets.map(bucket => {
      purpose[bucket.key.toLowerCase()] = bucket.doc_count;
    });
    return { date: bucket.key_as_string, purpose };
  });
};

module.exports = {
  exit,
  entry,
  findByDate,
  aggregateByPurposeAndDate,
  findByRecent
};

'use strict';
const PURPOSE = require('../common/constraint/purpose');
const ORDER = require('./constraint/order');
// const locale = require('moment')().local('ja');
const moment = require('moment');
const { aggregateVistorsByPurposeAndDate } = require('./dao');

const {
  findUserById,
  putUser,
  findVisitorsByDate
} = require('./dynamodb/client');
const errorMessage = require('./constraint/error');

const exit = async data => {
  const user = await findUserById({
    TableName: 'user',
    Key: { id: data.id }
  });
  if (!user) {
    throw new Error(errorMessage.unregisteredUser);
  }
  const timestamp = moment(
    moment()
      .local('ja')
      .format('YYYYMMDD'),
    'YYYYMMDD'
  ).unix();
  const visitor = await findUserById({
    TableName: 'workspace',
    Key: { id: data.id, timestamp }
  });
  const { id, mail, name, workspace } = visitor;
  const entry = workspace.entry;
  await putUser({
    TableName: 'workspace',
    Item: {
      id,
      timestamp,
      name,
      mail,
      isEntry: false,
      workspace: {
        entry,
        exit: moment()
          .local('ja')
          .unix()
      }
    }
  });
  return {
    id: user.id,
    user: {
      name: user.name,
      isEntry: false
    }
  };
};

const entry = async data => {
  const user = await findUserById({
    TableName: 'user',
    Key: { id: data.id }
  });
  if (!user) {
    throw new Error(errorMessage.unregisteredUser);
  }
  const purpose = data.purpose;
  if (!PURPOSE.includes(purpose)) {
    throw new Error(errorMessage.unsupportedPurpose);
  }
  const { id, name, mail } = user;
  const timestamp = moment(
    moment()
      .local('ja')
      .format('YYYYMMDD'),
    'YYYYMMDD'
  ).unix();
  const entry = moment()
    .locale('ja')
    .unix();
  await putUser({
    TableName: 'workspace',
    Item: {
      id,
      timestamp,
      name,
      mail,
      isEntry: true,
      workspace: {
        entry
      }
    }
  });
  return {
    id: user.id,
    user: {
      name: user.name,
      isEntry: true
    }
  };
};

const findByDate = async (
  from = moment()
    .local('ja')
    .format('YYYYMMDD'),
  to = from
) => {
  if (from === to) {
    const timestamp = moment(from, 'YYYYMMDD').unix();
    const visitors = await findVisitorsByDate({
      TableName: 'workspace',
      IndexName: 'timestamp_index',
      KeyConditionExpression: '#timestamp = :timestamp_val',
      ExpressionAttributeNames: { '#timestamp': 'timestamp' },
      ExpressionAttributeValues: {
        ':timestamp_val': timestamp
      }
    });
    return visitors;
  }
  const visitors = await findVisitorsByDate({
    TableName: 'workspace',
    IndexName: 'timestamp_index',
    KeyConditionExpression: '#timestamp >= :from_val AND #timestamp >= :to_val ',
    ExpressionAttributeNames: { '#timestamp': 'timestamp' },
    ExpressionAttributeValues: {
      ':to_val': to,
      ':from_val': from
    }
  });
  return visitors;
};

const findByRecent = async (today = moment().local('ja')) => {
  const dayOfWeek = moment()
    .local('ja')
    .day();

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
  if (!results.aggregations.date.buckets.length) {
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

'use strict';

const messages = {
  unregisteredUser: '未登録のカードIDです',
  duplicateUser: 'あなたは登録済みです',
  unsupportedPurpose: '目的が不正です'
};

let template = { code: 1, error: { message: '' } };

const unregisteredUser = () => {
  template.error.message = messages.unregisteredUser;
  return template;
};

const duplicateUser = () => {
  template.error.message = messages.duplicateUser;
  return template;
};

const unsupportedPurpose = () => {
  template.error.message = messages.unsupportedPurpose;
  return template;
};
module.exports = { unregisteredUser, duplicateUser, unsupportedPurpose };

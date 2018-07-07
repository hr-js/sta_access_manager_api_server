'use strict';
const requestHelper = require('../helper/requestHelper');

jest.mock('../../../app/repository/provider');
jest.mock('../../../app/controller/server');

/**
* /usrs/register に対してのPOST送信の正常系.
* payload: requestBodyにエラーがなく、
* 後続の処理にエラーがない場合.
*/
test('requestBodyに必要なデータが揃っていて正常にrequestとresponseが行われる', async () => {
  const payload = {
    id: '0000002',
    user: {
      mail: 'john.doe@test.jp',
      name: 'John Doe',
    },
  };

  await requestHelper.post('/register', payload, response => {
    const payload = JSON.parse(response.payload);

    expect(response.statusCode).toBe(200);
    expect(payload.id).toEqual(expect.stringMatching(/^[0-9]+$/));
    expect(typeof payload.user.name).toBe('string');
  });
});

test('idがrequestBodyにない場合、400エラーになる', async () => {
  const payload = {
    user: {
      mail: 'john.doe@test.jp',
      name: 'John Doe',
    },
  };

  await requestHelper.post('/register', payload, response => expect(response.statusCode).toBe(400));
});

test('user.nameがrequestBodyにない場合、400エラーになる', async () => {
  const payload = {
    id: '0000002',
    user: {
      mail: 'john.doe@test.jp',
    },
  };

  await requestHelper.post('/register', payload, response => expect(response.statusCode).toBe(400));
});

test('user.mailがrequestBodyにない場合、400エラーになる', async () => {
  const payload = {
    id: '0000002',
    user: {
      name: 'John Doe',
    },
  };

  await requestHelper.post('/register', payload, response => expect(response.statusCode).toBe(400));
});

test('user.mailがアドレス形式出ない文字列にない場合、400エラーになる', async () => {
  const payload = {
    id: '0000002',
    user: {
      mail: 'foo',
      name: 'John Doe',
    },
  };

  await requestHelper.post('/register', payload, response => expect(response.statusCode).toBe(400));
});


test('user.mailのアドレス形式でも先頭に大文字を使っている場合、400エラーになる', async () => {
  const payload = {
    id: '0000002',
    user: {
      mail: 'John.doe@test.jp',
      name: 'John Doe',
    },
  };

  await requestHelper.post('/register', payload, response => expect(response.statusCode).toBe(400));
});


'use strict';
const requestHelper = require('../helper/requestHelper');

jest.mock('../../../app/controller/server');
jest.mock('../../../app/repository/user');

test('正常系:必要な値があり、responseのステータスと値も正しい。', async () => {

  const payload = {
    id: 'someUserId',
    user: {
      name: 'John Doe',
    }
  };

  requestHelper.put('/update', payload, response => {
    const payload = JSON.parse(response.payload);

    expect(response.statusCode).toBe(200);
    expect(typeof payload.id).toBe('string');
    expect(typeof payload.user.name).toBe('string');
  });
});

test('request bodyにidがない場合、statusCodeが400のレスポンスになる', async () => {

  const payload = {
    user: {
      name: 'John Doe',
    }
  };

  requestHelper.put('/update', payload, response => expect(response.statusCode).toBe(400));
});

test('request bodyにuser.nameない場合、statusCodeが400のレスポンスになる', async () => {

  const payload = {
    id: 'someUserId',
    user: {},
  };

  requestHelper.put('/update', payload, response => expect(response.statusCode).toBe(400));
});


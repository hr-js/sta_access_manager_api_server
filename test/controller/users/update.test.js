'use strict';
const requestHelper = require('../helper/requestHelper');

jest.mock('../../../app/repository/user');

test('正常系:必要な値があり、responseのステータスと値も正しい。', async () => {

  const payload = {
    id: 'someUserId',
    user: {
      mail: 'someUser@mail.com'
    }
  };

  requestHelper.post('/update', payload, response => {
    const payload = JSON.parse(response.payload);

    expect(response.statusCode).toBe(200);
    expect(typeof payload.id).toBe('string');
    expect(typeof payload.user.mail).toBe('string');
  });
});

test('request bodyにidがない場合、statusCodeが400のレスポンスになる', async () => {

  const payload = {
    user: {
      mail: 'someUser@mail.com'
    }
  };

  requestHelper.post('/update', payload, response => expect(response.statusCode).toBe(400));
});

test('request bodyにuser.mailない場合、statusCodeが400のレスポンスになる', async () => {

  const payload = {
    id: 'someUserId',
    user: {
      mail: ''
    }
  };

  requestHelper.post('/update', payload, response => expect(response.statusCode).toBe(400));
});

test('user.mailがメール形式出ない場合、statusCodeが400のレスポンスになる', async () => {

  const payload = {
    id: 'someUserId',
    user: {
      mail: 'John Doe'
    }
  };

  requestHelper.post('/update', payload, response => expect(response.statusCode).toBe(400));
});

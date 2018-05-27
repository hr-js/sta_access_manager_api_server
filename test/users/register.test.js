'use strict';
const requestHelper = require('../helper/requestHelper');
const MAIL_REGEX = /^([a-za-z0-9])+([a-zA-Z0-9\\._-])*@([a-zA-Z0-9\\._-]+)*$/;

jest.mock('../../routes/provider');
jest.mock('../../server');

test('correct params return 200', async () => {
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
    expect(payload.user.mail).toEqual(expect.stringMatching(MAIL_REGEX));
    expect(typeof payload.user.name).toBe('string');
  });
});

test('parameter-name is brunk return 400', async () => {
  const payload = {
    id: '0000002',
    user: {
      mail: 'john.doe@test.jp',
    },
  };

  await requestHelper.post('/register', payload, response => expect(response.statusCode).toBe(400));
});

test('parameter-id is brunk return 400', async () => {
  const payload = {
    user: {
      mail: 'john.doe@test.jp',
      name: 'John Doe',
    },
  };

  await requestHelper.post('/register', payload, response => expect(response.statusCode).toBe(400));
});

test('parameter-mail is brunk return 400', async () => {
  const payload = {
    id: '0000002',
    user: {
      name: 'John Doe',
    },
  };

  await requestHelper.post('/register', payload, response => expect(response.statusCode).toBe(400));
});

test('parameter-mail is invalid pattern return 400', async () => {
  const payload = {
    id: '0000002',
    user: {
      mail: 'foo',
      name: 'John Doe',
    },
  };

  await requestHelper.post('/register', payload, response => expect(response.statusCode).toBe(400));
});

'use strict';
const Util = require('../Util');
const MAIL_REGEX = /^([a-zA-Z0-9])+([a-zA-Z0-9\\._-])*@([a-zA-Z0-9_-])+([a-zA-Z0-9\\._-]+)+$/;


test('correct params return 200', async () => {
  const payload = {
    id: '0000002',
    user: {
      mail: 'john.hoe@test.jp',
      name: 'John Doe',
    },
  };

  await Util.post('/register', payload, response => {
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
      mail: 'john.hoe@test.jp',
    },
  };

  await Util.post('/register', payload, response => expect(response.statusCode).toBe(400));
});

test('parameter-id is brunk return 400', async () => {
  const payload = {
    user: {
      mail: 'john.hoe@test.jp',
      name: 'John Doe',
    },
  };

  await Util.post('/register', payload, response => expect(response.statusCode).toBe(400));
});

test('parameter-id type isnot number return 400', async () => {
  const payload = {
    id: 'test',
    user: {
      mail: 'john.hoe@test.jp',
      name: 'John Doe',
    },
  };

  await Util.post('/register', payload, response => expect(response.statusCode).toBe(400));
});

test('parameter-mail is brunk return 400', async () => {
  const payload = {
    id: '0000002',
    user: {
      name: 'John Doe',
    },
  };

  await Util.post('/register', payload, response => expect(response.statusCode).toBe(400));
});

test('parameter-mail is invalid pattern return 400', async () => {
  const payload = {
    id: '0000002',
    user: {
      mail: 'foo',
      name: 'John Doe',
    },
  };

  await Util.post('/register', payload, response => expect(response.statusCode).toBe(400));
});

'use strict';
const Util = require('../Util');

const MAIL_REGEX = /^([a-zA-Z0-9])+([a-zA-Z0-9\\._-])*@([a-zA-Z0-9_-])+([a-zA-Z0-9\\._-]+)+$/;

test('test', async () => {
  const payload = {
    id: '0000002',
    user: {
      mail: 'john.hoe@test.jp',
      name: 'John Doe',
    }
  };

  await Util.post('register', payload, response => {
    const payload = JSON.parse(response.payload);

    expect(response.statusCode).toBe(200);
    expect(payload.id).toEqual(expect.stringMatching(/^[0-9]+$/));
    expect(payload.user.mail).toEqual(expect.stringMatching(MAIL_REGEX));
    expect(typeof payload.user.name).toBe('string');
  });

});

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

test('parameter-name brunk is invalid', async () => {
  const payload = {
    id: '0000002',
    user: {
      mail: 'john.hoe@test.jp',
    },
  };

  await Util.post('/register', payload, response => expect(response.statusCode).toBe(400));
});

test('parameter-id typeof number is invalid', async () => {
  const payload = {
    id: 'test',
    user: {
      mail: 'john.hoe@test.jp',
      name: 'John Doe',
    },
  };

  await Util.post('/register', payload, response => expect(response.statusCode).toBe(400));
});

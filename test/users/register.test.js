'use strict';

test('correct params return 200', async () => {
  const fastify = await (await require('../../server'))();

  fastify.inject(
    {
      method: 'POST',
      url: '/register',
      payload: {
        id: '0000002',
        user: {
          mail: 'john.hoe@test.jp',
          name: 'John Doe',
        },
      }
    },
    response => {
      const payload = JSON.parse(response.payload);

      expect(response.statusCode).toBe(200);
      expect(payload.id).toEqual(expect.stringMatching(/^[0-9]+$/));
      expect(payload.user.mail).toEqual(expect.stringMatching(/^([a-zA-Z0-9])+([a-zA-Z0-9\\._-])*@([a-zA-Z0-9_-])+([a-zA-Z0-9\\._-]+)+$/));
      expect(typeof payload.user.name).toBe('string');
    }
  );

  fastify.close();
});

test('parameter-name brunk is invalid', async () => {
  const fastify = await (await require('../../server'))();

  fastify.inject(
    {
      method: 'POST',
      url: '/register',
      payload: {
        id: '0000002',
        user: {
          mail: 'john.hoe@test.jp',
        },
      }
    },
    response => expect(response.statusCode).toBe(400)
  );

  fastify.close();
});

test('parameter-id typeof number is invalid', async () => {
  const fastify = await (await require('../../server'))();

  fastify.inject(
    {
      method: 'POST',
      url: '/register',
      payload: {
        id: 2,
        user: {
          mail: 'john.hoe@test.jp',
          name: 'John Doe',
        },
      }
    },
    response => expect(response.statusCode).toBe(400)
  );

  fastify.close();
});

'use stringMatching';

test('entry return 200', async () => {
  const fastify = await (await require('../../server'))();
  fastify.inject(
    {
      method: 'POST',
      url: '/entry',
      payload: {
        id: '0000002',
        purpose: 'TEST'
      }
    },
    response => {
      const payload = JSON.parse(response.payload);

      expect(response.statusCode).toBe(200);
      expect(payload.id).toEqual(expect.stringMatching(/^[0-9]+$/));
      expect(typeof payload.user.isEntry).toEqual('boolean');
    }
  );
  fastify.close();
});

test('update return 200', async () => {
  const fastify = await (await require('../../server'))();
  fastify.inject(
    {
      method: 'POST',
      url: '/update',
      payload: {
        id: '0000002',
        purpose: 'TEST'
      }
    },
    response => {
      const payload = JSON.parse(response.payload);

      expect(response.statusCode).toBe(200);
      expect(payload.id).toEqual(expect.stringMatching(/^[0-9]+$/));
    }
  );
  fastify.close();
});

test('register parameter-name brunk is invalid', async () => {
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
    response => {

      expect(response.statusCode).toBe(400);
    }
  );
  fastify.close();
});

test('register parameter-id typeof number is invalid', async () => {
  const fastify = await (await require('../../server'))();
  fastify.inject(
    {
      method: 'POST',
      url: '/register',
      payload: {
        id: 2,
        user: {
          mail: 'john.hoe@test.jp',
        },
      }
    },
    response => {

      expect(response.statusCode).toBe(400);
    }
  );
  fastify.close();
});

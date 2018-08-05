'use strict';
const requestHelper = require('../helper/requestHelper');

jest.mock('../../../app/repository/visitor');

test('/exitの正常系。レスポンスが200かつ正しい値が帰ってくる。', async () => {
  const payload = {
    id: '001',
  };

  await requestHelper.post('/exit', payload, response => {
    const payload = JSON.parse(response.payload);

    expect(response.statusCode).toBe(200);
    expect(typeof payload.id).toBe('string');
    expect(typeof payload.user.name).toBe('string');
    expect(payload.user.isEntry).toBeFalsy();
  });
});

test('request bodyにidがない場合、statusCodeが400のレスポンスになる', async () => {
  const payload = {};

  await requestHelper.post('/exit', payload, response => expect(response.statusCode).toBe(400));
});


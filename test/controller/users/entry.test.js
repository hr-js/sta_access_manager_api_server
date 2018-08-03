'use strict';
const requestHelper = require('../helper/requestHelper');

jest.mock('../../../app/repository/visitor');

test('/entryの正常系。レスポンスが200かつ正しい値が帰ってくる。', async () => {
  const payload = {
    id: '001',
    purpose: 'WORK',
  };

  await requestHelper.post('/entry', payload, response => {
    const payload = JSON.parse(response.payload);

    expect(response.statusCode).toBe(200);
    expect(typeof payload.id).toBe('string');
    expect(typeof payload.user.name).toBe('string');
    expect(payload.user.isEntry).not.toBeFalsy();
  });
});

test('idなし', async () => {
  const payload = {
    purpose: 'WORK',
  };

  await requestHelper.post('/entry', payload, response => expect(response.statusCode).toBe(400));
});

test('purposeなし', async () => {
  const payload = {
    id: '001',
  };

  await requestHelper.post('/entry', payload, response => expect(response.statusCode).toBe(400));
});

test('想定外の目的が選択されている', () => {
  const payload = {
    id: '001',
    purpose: 'foo',
  };

  requestHelper.post('/entry', payload, response => expect(response.statusCode).toBe(400));
});



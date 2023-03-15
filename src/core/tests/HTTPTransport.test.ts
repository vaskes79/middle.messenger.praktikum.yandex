import { expect } from 'chai';
import { HTTPTransport, HEADERS } from '../HTTPTransport';

describe('HTTPTransport', () => {
  const BASE_URL = 'https://jsonplaceholder.typicode.com';
  const data = {
    title: 'mock',
    body: 'mock',
    userId: 1
  };

  it('GET', async () => {
    const res = await HTTPTransport.GET<unknown, { id: number }>(`${BASE_URL}/posts/1`);
    expect(res.id).to.equal(1);
  });

  it('POST', async () => {
    const res = await HTTPTransport.POST<unknown, { id: number; userId: number }>(
      `${BASE_URL}/posts`,
      {
        data,
        headers: {
          [HEADERS.CONTENT_TYPE]: HEADERS.JSON
        }
      }
    );
    expect(res.id).to.equal(101);
    expect(res.userId).to.equal(1);
  });

  it('PUT', async () => {
    const putData = { ...data, body: 'bar2' };

    const res = await HTTPTransport.PUT<unknown, { body: string }>(`${BASE_URL}/posts/1`, {
      data: putData,
      headers: {
        [HEADERS.CONTENT_TYPE]: HEADERS.JSON
      }
    });
    expect(res.body).to.equal('bar2');
  });

  it('DELETE', async () => {
    const res: object = await HTTPTransport.DELETE(`${BASE_URL}/posts/1`, {
      headers: {
        [HEADERS.CONTENT_TYPE]: HEADERS.JSON
      }
    });
    expect(JSON.stringify(res)).to.equal(JSON.stringify({}));
  });
});

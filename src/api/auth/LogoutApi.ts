import { BaseAPI, HEADERS } from '../../core';

export class LogoutApi extends BaseAPI {
  constructor(baseUrl?: string) {
    super('/auth/logout', baseUrl);
  }

  async create() {
    const req = {
      data: {},
      headers: {
        [HEADERS.CONTENT_TYPE]: HEADERS.JSON
      }
    };
    try {
      return this._http.POST(this._url, req);
    } catch (error) {
      console.log('LogoutApi: error', error);
    }
  }
}

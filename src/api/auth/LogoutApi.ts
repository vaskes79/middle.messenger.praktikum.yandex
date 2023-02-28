import { BaseAPI } from '../../core';

export class LogoutApi extends BaseAPI {
  constructor(baseUrl?: string) {
    super('/auth/logout', baseUrl);
  }

  async create() {
    try {
      return this._http.POST(this._url, {});
    } catch (error) {
      console.log('LogoutApi: error', error);
    }
  }
}

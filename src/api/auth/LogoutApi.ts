import { BaseAPI } from '../../core';

export class LogoutApi extends BaseAPI {
  constructor(baseUrl?: string) {
    super('/auth/logout', baseUrl);
  }

  async create() {
    const data = await this._http.POST(this._url, {});
    console.log('LogoutApi: ', data);
  }
}

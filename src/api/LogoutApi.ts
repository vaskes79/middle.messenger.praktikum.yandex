import { BaseAPI } from '../core';

export class LogoutApi extends BaseAPI {
  constructor(baseUrl?: string) {
    super('/auth/logout', baseUrl);
  }

  async create(): Promise<void> {
    const data = await this._http.POST(this._url, {});
    console.log('LogoutApi: ', data);
  }
}

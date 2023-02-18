import { BaseAPI } from '../core';

export class GetUserApi extends BaseAPI {
  constructor(baseUrl?: string) {
    super('/auth/user', baseUrl);
  }

  async request(): Promise<void> {
    const data = await this._http.GET(this._url);
    console.log('GetUserApi: ', data);
  }
}

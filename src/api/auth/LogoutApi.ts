import { Paths } from '../../types';
import { BaseAPI, Router } from '../../core';

export class LogoutApi extends BaseAPI {
  constructor(baseUrl?: string) {
    super('/auth/logout', baseUrl);
  }

  async create() {
    try {
      const data = await this._http.POST(this._url, {});
      Router.go(Paths.signIn);
      console.log('LogoutApi: ', data);
    } catch (error) {
      console.log('LogoutApi: error', error);
    }
  }
}

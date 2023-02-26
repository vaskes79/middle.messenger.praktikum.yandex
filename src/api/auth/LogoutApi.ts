import { Paths } from '../../types';
import { BaseAPI, Router, Store } from '../../core';

export class LogoutApi extends BaseAPI {
  constructor(baseUrl?: string) {
    super('/auth/logout', baseUrl);
  }

  async create() {
    try {
      await this._http.POST(this._url, {});
      Router.go(Paths.signIn);
      Store.setState('user', null);
      Store.setState('chatList', []);
    } catch (error) {
      console.log('LogoutApi: error', error);
    }
  }
}

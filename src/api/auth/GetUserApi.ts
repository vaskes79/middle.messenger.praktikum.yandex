import { User } from '../../types';
import { BaseAPI, Store } from '../../core';

type Res = User;

export class GetUserApi extends BaseAPI {
  constructor(baseUrl?: string) {
    super('/auth/user', baseUrl);
  }

  async request() {
    try {
      const data = await this._http.GET<void, Res>(this._url);
      if (data.id) {
        Store.setState('user', data);
      }
    } catch (error) {
      console.error(error);
    }
  }
}

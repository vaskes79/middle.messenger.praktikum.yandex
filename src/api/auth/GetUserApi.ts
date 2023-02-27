import { User } from '../../types';
import { BaseAPI } from '../../core';

type Res = User;

export class GetUserApi extends BaseAPI {
  constructor(baseUrl?: string) {
    super('/auth/user', baseUrl);
  }

  async request() {
    try {
      return this._http.GET<void, Res>(this._url);
    } catch (error) {
      console.error(error);
    }
  }
}

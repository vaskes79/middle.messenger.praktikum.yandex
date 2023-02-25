import { BaseAPI } from '../../core';

type Res =
  | {
      reasons: string;
    }
  | 'OK';

export class GetUserApi extends BaseAPI {
  constructor(baseUrl?: string) {
    super('/auth/user', baseUrl);
  }

  async request() {
    return this._http.GET<void, Res>(this._url);
  }
}

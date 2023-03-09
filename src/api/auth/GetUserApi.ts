import { ErrorRes, User } from '../../types';
import { BaseAPI } from '../../core';

export class GetUserApi extends BaseAPI {
  constructor(baseUrl?: string) {
    super('/auth/user', baseUrl);
  }

  async request() {
    try {
      return this._http.GET<null, User>(this._url);
    } catch (error: unknown) {
      const { status, reasons } = error as ErrorRes;
      if (status === 401 && reasons) {
        this._eventBus.emmit('form:error', reasons);
      }
    }
  }
}

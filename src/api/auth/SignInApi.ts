import { API } from '../../api';
import { BaseAPI, OptionsWithoutMethod, HEADERS } from '../../core';
import { ErrorRes, UserLoginDTO } from '../../types';

export type UserSignInRes = {
  reasons?: string;
};

export type SignInDTO = OptionsWithoutMethod<UserLoginDTO>;

export class SignInApi extends BaseAPI {
  constructor(baseUrl?: string) {
    super('/auth/signin', baseUrl);
  }

  async create(userData: SignInDTO) {
    userData.headers = { [HEADERS.CONTENT_TYPE]: HEADERS.JSON };

    try {
      return await this._http.POST<UserLoginDTO, UserSignInRes | 'OK'>(this._url, userData);
    } catch (error: unknown) {
      const { status, reasons } = error as ErrorRes;
      if (status === 400) {
        await API.auth.logout();
      }

      if (status === 401 && reasons) {
        this._eventBus.emmit('form:error', reasons);
      }
    }
  }
}

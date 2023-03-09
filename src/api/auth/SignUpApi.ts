import { BaseAPI, HEADERS, OptionsWithoutMethod } from '../../core';
import { ErrorRes, UserDTO } from '../../types';

export type UserCreateRes = {
  id?: string;
  reasons?: string;
};

export type SignUpDTO = OptionsWithoutMethod<UserDTO>;

export class SignUpApi extends BaseAPI {
  constructor(baseUrl?: string) {
    super('/auth/signup', baseUrl);
  }

  async create(userData: SignUpDTO) {
    userData.headers = { [HEADERS.CONTENT_TYPE]: HEADERS.JSON };

    try {
      return await this._http.POST<UserDTO, UserCreateRes>(this._url, userData);
    } catch (error: unknown) {
      const { status, reasons } = error as ErrorRes;

      if (status && reasons) {
        this._eventBus.emmit('form:error', reasons);
      }
    }
  }
}

import { BaseAPI, BaseError, OptionsWithoutMethod, Router } from '../../core';
import { Paths, UserDTO } from '../../types';

export type UserCreateRes = {
  id?: string;
  reasons?: string;
};

export type SignUpDTO = OptionsWithoutMethod<UserDTO>;

export class SignUpApi extends BaseAPI {
  _errorHandler: BaseError;
  constructor(baseUrl?: string) {
    super('/auth/signup', baseUrl);
    this._errorHandler = new BaseError('SignUpApi');
  }

  async create(userData: SignUpDTO) {
    try {
      const data = await this._http.POST<UserDTO, UserCreateRes>(this._url, userData);
      console.log({ data });
      if (data.id) {
        Router.go(Paths.chat);
      }
    } catch (error) {
      console.error(error);
      this._errorHandler.error('create user api error');
    }
  }
}

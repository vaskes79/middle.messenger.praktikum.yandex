import { BaseAPI, OptionsWithoutMethod } from '../../core';
import { UserLoginDTO } from '../../types';

export type UserSignInRes = {
  reasons?: string;
};

export type SignInDTO = OptionsWithoutMethod<UserLoginDTO>;

export class SignInApi extends BaseAPI {
  constructor(baseUrl?: string) {
    super('/auth/signin', baseUrl);
  }

  async create(userData: SignInDTO) {
    try {
      return await this._http.POST<UserLoginDTO, UserSignInRes | 'OK'>(this._url, userData);
    } catch (error) {
      console.error('SignInApi error: ', error);
    }
  }
}

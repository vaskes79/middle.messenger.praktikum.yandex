import { BaseAPI, OptionsWithoutMethod, Router } from '../../core';
import { Paths, UserLoginDTO } from '../../types';

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
      const data = await this._http.POST<UserLoginDTO, UserSignInRes | 'OK'>(this._url, userData);
      if (data === 'OK') {
        Router.go(Paths.chat);
      }
    } catch (error) {
      console.error('SignInApi error: ', error);
    }
  }
}

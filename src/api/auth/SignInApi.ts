import { BaseAPI, OptionsWithoutMethod, Router } from '../../core';
import { Paths, UserLoginDTO } from '../../types';

export type SignInDTO = OptionsWithoutMethod<UserLoginDTO>;

export class SignInApi extends BaseAPI {
  constructor(baseUrl?: string) {
    super('/auth/signin', baseUrl);
  }

  async create(userData: SignInDTO) {
    try {
      const data = await this._http.POST<UserLoginDTO, void>(this._url, userData);
      Router.go(Paths.chat);
      console.log('SignInApi: ', data);
    } catch (error) {
      Router.go(Paths.signIn);
    }
  }
}

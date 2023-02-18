import { BaseAPI, OptionsWithoutMethod } from '../../core';
import type { UserLoginDTO } from '../../types';

export type SignInDTO = OptionsWithoutMethod<UserLoginDTO>;

export class SignInApi extends BaseAPI {
  constructor(baseUrl?: string) {
    super('/auth/signin', baseUrl);
  }

  async create(userData: SignInDTO) {
    const data = await this._http.POST<UserLoginDTO, void>(this._url, userData);
    console.log('SignInApi: ', data);
  }
}

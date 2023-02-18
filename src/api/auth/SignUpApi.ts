import { BaseAPI, OptionsWithoutMethod } from '../../core';
import type { UserDTO } from '../../types';

export type UserCreateRes = {
  id: string;
};

export type SignUpDTO = OptionsWithoutMethod<UserDTO>;

export class SignUpApi extends BaseAPI {
  constructor(baseUrl?: string) {
    super('/auth/signup', baseUrl);
  }

  async create(userData: SignUpDTO) {
    const data = await this._http.POST<UserDTO, UserCreateRes>(this._url, userData);
    console.log('SignUpApi: ', data);
  }
}

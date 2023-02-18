import { BaseAPI, OptionsWithoutMethod } from '../../core';
import type { UserDTO } from '../../types';

export type UserCreateRes = {
  id: string;
};

export class SignUpApi extends BaseAPI {
  constructor(baseUrl?: string) {
    super('/auth/signup', baseUrl);
  }

  async create(userData: OptionsWithoutMethod<UserDTO>) {
    const data = await this._http.POST<UserDTO, UserCreateRes>(this._url, userData);
    console.log('SignUpApi: ', data);
  }
}

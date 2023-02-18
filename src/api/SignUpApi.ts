import { BaseAPI } from '../core';
import type { UserDTO } from '../types';

export type UserCreateRes = {
  id: string;
};

export class SignUpApi extends BaseAPI {
  constructor(baseUrl?: string) {
    super('/auth/signup', baseUrl);
  }

  async create(userData: UserDTO): Promise<void> {
    const data = await this._http.POST<UserDTO, UserCreateRes>(this._url, { data: userData });
    console.log('SignUpApi: ', data);
  }
}

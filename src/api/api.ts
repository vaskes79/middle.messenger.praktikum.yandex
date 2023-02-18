import { GetUserApi, LogoutApi, SignInApi, SignUpApi } from './auth';

import { UserDTO, UserLoginDTO } from '../types';

export const API = {
  auth: {
    signUp: (userData: UserDTO) => new SignUpApi().create(userData),
    signIn: (userData: UserLoginDTO) => new SignInApi().create(userData),
    logout: () => new LogoutApi().create(),
    getUser: () => new GetUserApi().request()
  }
};

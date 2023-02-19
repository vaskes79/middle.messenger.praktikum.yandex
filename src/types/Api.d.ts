export type UserDTO = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
};

export type ChatDTO = {
  title: string;
};

export type UserLoginDTO = Pick<UserDTO, 'login' | 'password'>;

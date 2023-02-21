export type User = {
  id: string;
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
  display_name: null | string;
  avatar: null | string;
};

export type UserDTO = Omit<User, 'display_name' | 'avatar' | 'id'>;

export type ChatDTO = {
  title: string;
};

export type UserLoginDTO = Pick<User, 'login' | 'password'>;

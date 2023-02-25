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

export type Chat = {
  id: number;
  title: string;
  avatar: null | string;
  created_by: Date;
  unread_count: number;
  last_message?: {
    user: User;
    time: string | Date;
    content: string;
    id: number;
  };
};

export type UserDTO = Omit<User, 'display_name' | 'avatar' | 'id'>;

export type ChatDTO = Pick<Chat, 'title'>;

export type UserLoginDTO = Pick<User, 'login' | 'password'>;

export type ErrorRes = {
  reason: 'string';
};

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
  status: number;
  reasons: 'string';
};

type MessageItemType = 'message' | 'file' | 'sticker';

type MessageItemFile = {
  id: number;
  user_id: number;
  path: string;
  filename: string;
  content_type: string;
  content_size: number;
  upload_date: string;
};

export type MessageItem = {
  chat_id: number;
  content: string;
  id: number;
  is_read: boolean;
  time: string;
  type: MessageItemType;
  user_id: number;
  file?: MessageItemFile;
};

export type MessageItemListRes = MessageItem[];

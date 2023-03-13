import { auth } from './auth';
import { user } from './user';
import { chats } from './chats';
import { messages } from './messages';

export const RESOURCES_BASE_URL = 'https://ya-praktikum.tech/api/v2/resources';

export const API = {
  auth,
  user,
  chats,
  messages
};

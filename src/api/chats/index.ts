import { GetAllChatsApi } from './GetAllChatsApi';

export const chats = {
  getAllChats: () => new GetAllChatsApi().request()
};

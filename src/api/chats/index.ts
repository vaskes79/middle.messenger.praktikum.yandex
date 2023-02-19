import { GetAllChatsApi } from './GetAllChatsApi';
import { CreateChatDTO, CreateChatApi } from './CreateChatApi';

export const chats = {
  getAllChats: () => new GetAllChatsApi().request(),
  createChat: (chat: CreateChatDTO) => new CreateChatApi().create(chat)
};

import { GetAllChatsApi } from './GetAllChatsApi';
import { CreateChatDTO, CreateChatApi } from './CreateChatApi';
import { AddUserToChatApi, AddUserToChatDTO } from './AddUserToChatApi';

export const chats = {
  getAllChats: () => new GetAllChatsApi().request(),
  createChat: (chat: CreateChatDTO) => new CreateChatApi().create(chat),
  addUserToChat: (data: AddUserToChatDTO) => new AddUserToChatApi().update(data)
};

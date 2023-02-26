import { GetAllChatsApi, GetAllChatsApiEvents } from './GetAllChatsApi';
import { CreateChatDTO, CreateChatApi } from './CreateChatApi';
import { AddUserToChatApi, AddUserToChatDTO } from './AddUserToChatApi';
import { DeleteUserFromChatDTO, DeleteUserFromChatApi } from './DeleteUserFromChatApi';

export type ApiChatsEvents = `${GetAllChatsApiEvents}`;

export const chats = {
  getAllChats: () => new GetAllChatsApi().request(),
  createChat: (chat: CreateChatDTO) => new CreateChatApi().create(chat),
  addUserToChat: (data: AddUserToChatDTO) => new AddUserToChatApi().update(data),
  deleteUserFromChat: (data: DeleteUserFromChatDTO) => new DeleteUserFromChatApi().delete(data)
};

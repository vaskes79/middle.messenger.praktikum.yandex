import { API } from '../../api';
import { BaseAPI, OptionsWithoutMethod } from '../../core';
import type { ChatDTO, ErrorRes } from '../../types';

export type ChatCreateRes = {
  id: string;
};

export type CreateChatDTO = OptionsWithoutMethod<ChatDTO>;

export class CreateChatApi extends BaseAPI {
  constructor(baseUrl?: string) {
    super('/chats', baseUrl);
  }

  async create(chatDTO: CreateChatDTO) {
    try {
      const data = await this._http.POST<ChatDTO, ChatCreateRes>(this._url, chatDTO);
      if (data.id) {
        await API.chats.getAllChats();
      }
      return true;
    } catch (error) {
      const chatCreationError = error as ErrorRes;
      this._eventBus.emmit('form:error', chatCreationError);
      return false;
    }
  }
}

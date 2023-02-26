import { API } from '../../api';
import { BaseAPI, OptionsWithoutMethod } from '../../core';
import type { ChatDTO } from '../../types';

export type ChatCreateRes = {
  id: string;
};

export type CreateChatDTO = OptionsWithoutMethod<ChatDTO>;

export class CreateChatApi extends BaseAPI {
  constructor(baseUrl?: string) {
    super('/chats', baseUrl);
  }

  async create(chatDTO: CreateChatDTO) {
    const data = await this._http.POST<ChatDTO, ChatCreateRes>(this._url, chatDTO);
    if (data.id) {
      API.chats.getAllChats();
    }
  }
}

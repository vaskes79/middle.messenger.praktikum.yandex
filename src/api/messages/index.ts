// import {ConnectToChatApi} from './ConnectToChatApi';
import { GetCurrentChatTokenApi } from './GetCurrentChatTokenApi';

export const messages = {
  getChatToken: (id: number) => new GetCurrentChatTokenApi(id).request()
};

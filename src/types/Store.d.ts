import { User, Chat } from './Api.d';

export interface State {
  user: User | null;
  currentChat: number | null;
  currentChatWSLink: string | null;
  currentWSconnect: WebSocket | null;
  chatList: Chat[];
}

export type KeysOfState = keyof State;

import { User, Chat } from './Api.d';

export interface State {
  user: User | null;
  currentChat: string | null;
  chatList: Chat[];
}

export type KeysOfState = keyof State;

import { User } from './Api.d';

export interface State {
  user: User | null;
  currentChat: string | null;
}

export type KeysOfState = keyof State;

import { UserPasswordChangeData } from '../api/user/UserPasswordUpdateApi';
import { MessageSocket } from '../api/messages/MessageSocket';
import { MessageItemData } from '../components/MessageItem';
import { User, Chat, UserDTO } from './Api';

export interface State {
  user: User | null;
  currentChat: number | null;
  currentChatWSLink: string | null;
  currentWSconnect: MessageSocket | null;
  chatList: Chat[];
  messageItemList: MessageItemData[];
  editProfileData: Partial<UserDTO> | null;
  changePasswordData: UserPasswordChangeData;
}

export type StoreProps = {
  key: KeysOfState;
  newState: State;
};

export enum StoreEvents {
  updateStore = 'store:update'
}

export type KeysOfState = keyof State;

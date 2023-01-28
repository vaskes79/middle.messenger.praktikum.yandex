import {
  generateItems,
  randomAvatar,
  randomFullName,
  randomNumber,
  randomStatusMessage,
  randomStatusUser,
  randomTime,
  randomWords
} from '../../utils';
import { ChatItemData } from './ChatItem';

export function createDemoChatItem(): ChatItemData {
  return {
    name: randomFullName(),
    imgurl: randomAvatar(),
    time: randomTime(),
    statusUser: randomStatusUser(),
    statusMessage: randomStatusMessage(),
    lastMessage: randomWords(),
    conterMessages: randomNumber()
  };
}

export const chatListData: ChatItemData[] = generateItems<ChatItemData>(createDemoChatItem);

export const defaultData: ChatItemData = createDemoChatItem();

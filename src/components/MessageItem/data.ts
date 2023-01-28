import { MessageItemData } from './MessageItem';
import {
  generateItems,
  randomImage,
  randomMessage,
  randomOwnerMessage,
  randomStatusMessage,
  randomTime,
  randomTypeMessage
} from '../../utils';

function createMessageItem(): MessageItemData {
  const type = randomTypeMessage();
  let content = '';
  if (type === 'text') {
    content = randomMessage();
  }
  if (type === 'image') {
    content = randomImage();
  }
  return {
    type,
    owner: randomOwnerMessage(),
    time: randomTime(),
    status: randomStatusMessage(),
    content
  };
}

export const messageItemList = generateItems<MessageItemData>(createMessageItem, 10);

export const defaultData: MessageItemData = createMessageItem();

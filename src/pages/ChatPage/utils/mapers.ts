import { Store } from '../../../core';
import type { ChatItemData } from '../../../components/ChatItem';
import type { MessageItemData } from '../../../components/MessageItem';
import type { Chat, MessageItemListRes, User } from '../../../types';

export function mapChatApiToChatItem(chatItemApiData: Chat[]): ChatItemData[] {
  return chatItemApiData.map((chat) => ({
    name: chat.title,
    imgurl: chat.avatar,
    time: chat.last_message?.time || null,
    statusUser: 'not-set',
    statusMessage: 'sent',
    lastMessage: chat?.last_message?.content || null,
    conterMessages: chat?.unread_count,
    id: chat.id
  }));
}

export function mapMessageResToMessageItemData(data: MessageItemListRes): MessageItemData[] {
  const user = Store.getState('user') as User;

  return data.map((item) => ({
    owner: user.id === item.user_id ? 'me' : 'user',
    type: item.type,
    time: item.time,
    status: item.is_read ? 'read' : 'sent',
    content: item.content
  }));
}

import type { ChatItemData } from '../../../components/ChatItem';
import type { MessageItemData } from '../../../components/MessageItem';
import type { Chat, MessageItemListRes } from '../../../types';

export function mapChatApiToChatItem(chatItemApiData: Chat[]): ChatItemData[] {
  console.log('chatItemApiData', chatItemApiData);

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
  return data.map((item) => ({
    owner: 'me',
    type: item.type,
    time: item.time,
    status: item.is_read ? 'read' : 'sent',
    content: item.content
  }));
}

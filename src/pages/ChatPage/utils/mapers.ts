import { ChatItemData } from 'components/ChatItem';
import { Chat } from '../../../types';

export function mapChatApiToChatItem(chatItemApiData: Chat[]): ChatItemData[] {
  return chatItemApiData.map((chat) => ({
    name: chat.title,
    imgurl: chat.avatar,
    time: chat.created_by,
    statusUser: 'not-set',
    statusMessage: 'sent',
    lastMessage: chat?.last_message?.content,
    conterMessages: chat?.unread_count
  }));
}

import html from 'bundle-text:./ChatPage.html';
import css from 'bundle-text:./ChatPage.css';
import { ChatItemData, ChatItem, chatListData } from '../../components/ChatItem';
import { generateCotnent } from '../../utils';

import { createPage } from '../../core';
import { MessageItem, MessageItemData } from '../../components/MessageItem';
import { Main } from '../../components/Layout';
import { messageItemList } from '../../components/MessageItem/data';

function connectedCallbackMixin(root: ShadowRoot) {
  const chatList = root.getElementById('chatlist-main') as Main;
  const chatMain = root.getElementById('chat-main') as Main;

  generateCotnent<ChatItem, ChatItemData>(chatList, 'ypr-chat-item', chatListData);
  generateCotnent<MessageItem, MessageItemData>(chatMain, 'ypr-message-item', messageItemList);
}

export default createPage({ html, css, tagName: 'ypr-chat-page', connectedCallbackMixin });

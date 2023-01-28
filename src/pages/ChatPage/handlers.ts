import { EventBus } from '../../core';
const eventBuss = EventBus.getInstance();
import { generateCotnent } from '../../utils';
import { Main } from '../../components/Layout';
import { ChatItemData, ChatItem, chatListData } from '../../components/ChatItem';
import { MessageItem, MessageItemData, messageItemList } from '../../components/MessageItem';

export function clearChatHandler(root: ShadowRoot) {
  const btnClearChat = root.getElementById('btnClearChat');
  const chatMain = root.getElementById('chat-main');

  if (btnClearChat && chatMain) {
    btnClearChat.addEventListener('click', () => {
      chatMain.innerHTML = `
      <ypr-empty>
        <h2>No Messages</h2>
      </ypr-empty>`;
    });
  }
}

export function generateContentHandler(root: ShadowRoot) {
  const chatList = root.getElementById('chatlist-main') as Main;
  const chatMain = root.getElementById('chat-main') as Main;

  generateCotnent<ChatItem, ChatItemData>(chatList, 'ypr-chat-item', chatListData);
  generateCotnent<MessageItem, MessageItemData>(chatMain, 'ypr-message-item', messageItemList);
}

export function settingsPanelHandlers(root: ShadowRoot) {
  const btnOpenSettings = root.getElementById('openSettings') as HTMLButtonElement;
  const btnCloseSettings = root.getElementById('settingsBtn') as HTMLButtonElement;

  btnOpenSettings.addEventListener('click', () => {
    eventBuss.emmit('panel:toggle', 'settings');
  });

  btnCloseSettings.addEventListener('click', () => {
    eventBuss.emmit('panel:toggle');
  });
}

export function chatListHandlers(root: ShadowRoot) {
  const btnOpenChatList = root.getElementById('openChatListBtn') as HTMLButtonElement;
  const btnCloseChatList = root.getElementById('chatlist-main') as HTMLButtonElement;

  btnOpenChatList.addEventListener('click', () => {
    eventBuss.emmit('panel:toggle', 'chatlist');
  });

  btnCloseChatList.addEventListener('click', () => {
    eventBuss.emmit('panel:toggle');
  });
}

export function chatSettingsHandlers(root: ShadowRoot) {
  const btnOpenChatSettings = root.getElementById('openChatSettings') as HTMLButtonElement;
  const btnCloseChatSettings = root.getElementById('closeChatSettingsBtn') as HTMLButtonElement;

  btnOpenChatSettings.addEventListener('click', () => {
    eventBuss.emmit('panel:toggle', 'chatsettings');
  });

  btnCloseChatSettings.addEventListener('click', () => {
    eventBuss.emmit('panel:toggle');
  });
}
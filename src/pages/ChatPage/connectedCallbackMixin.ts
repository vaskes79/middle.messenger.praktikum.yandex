import { EventBus, Store } from '../../core';
const eventBuss = EventBus.getInstance();
import { generateCotnent } from '../../utils';
import { Main } from '../../components/Layout';
import { ChatItemData, ChatItem } from '../../components/ChatItem';
import { MessageItem, MessageItemData, messageItemList } from '../../components/MessageItem';
import { mapChatApiToChatItem } from './utils';
import { KeysOfState } from '../../types';
import { API } from '../../api';

export async function connectedCallbackMixin(root: ShadowRoot) {
  generateContentHandler(root);
  settingsPanelHandlers(root);
  chatListHandlers(root);
  chatSettingsHandlers(root);
  clearChatHandler(root);
}

function clearChatHandler(root: ShadowRoot) {
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

function generateContentHandler(root: ShadowRoot) {
  const chatMain = root.getElementById('chat-main') as Main;
  const chatList = root.getElementById('chatlist-main') as Main;

  eventBuss.on('store:update', (key: KeysOfState) => {
    if (key === 'chatList') {
      chatList.innerHTML = '';
      const data = Store.getState('chatList');
      const chatListData = mapChatApiToChatItem(data);
      generateCotnent<ChatItem, ChatItemData>(chatList, 'ypr-chat-item', chatListData);
    }
  });

  API.chats.getAllChats();

  generateCotnent<MessageItem, MessageItemData>(chatMain, 'ypr-message-item', messageItemList);
}

function settingsPanelHandlers(root: ShadowRoot) {
  const btnOpenSettings = root.getElementById('openSettings') as HTMLButtonElement;
  const btnCloseSettings = root.getElementById('settingsBtn') as HTMLButtonElement;

  btnOpenSettings.addEventListener('click', () => {
    eventBuss.emmit('panel:toggle', 'settings');
  });

  btnCloseSettings.addEventListener('click', () => {
    eventBuss.emmit('panel:toggle');
  });
}

function chatListHandlers(root: ShadowRoot) {
  const btnOpenChatList = root.getElementById('openChatListBtn') as HTMLButtonElement;
  const btnCloseChatList = root.getElementById('chatlist-main') as HTMLButtonElement;

  btnOpenChatList.addEventListener('click', () => {
    eventBuss.emmit('panel:toggle', 'chatlist');
  });

  btnCloseChatList.addEventListener('click', () => {
    eventBuss.emmit('panel:toggle');
  });
}

function chatSettingsHandlers(root: ShadowRoot) {
  const btnOpenChatSettings = root.getElementById('openChatSettings') as HTMLButtonElement;
  const btnCloseChatSettings = root.getElementById('closeChatSettingsBtn') as HTMLButtonElement;

  btnOpenChatSettings.addEventListener('click', () => {
    eventBuss.emmit('panel:toggle', 'chatsettings');
  });

  btnCloseChatSettings.addEventListener('click', () => {
    eventBuss.emmit('panel:toggle');
  });
}

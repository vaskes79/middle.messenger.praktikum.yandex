import { EventBus, Store, Validator } from '../../core';
const eventBuss = EventBus.getInstance();
import { generateCotnent } from '../../utils';
import { Main } from '../../components/Layout';
import { MessageItem, MessageItemData } from '../../components/MessageItem';
import { ChatItemData, ChatItem } from '../../components/ChatItem';
import { mapChatApiToChatItem } from './utils';
import { KeysOfState } from '../../types';
import { API } from '../../api';
import { Modal } from '../../components/Modal';
import type { Input } from '../../components/Input';

export async function connectedCallbackMixin(root: ShadowRoot) {
  generateChatList(root);
  generateMessageList(root);
  settingsPanelHandlers(root);
  chatListHandlers(root);
  chatSettingsHandlers(root);
  clearChatHandler(root);
  callbackForConfirmCreateChatModal(root);
}

const noMessagesComponent = `
<ypr-empty>
  <h2>No Messages</h2>
</ypr-empty>`;

function clearChatHandler(root: ShadowRoot) {
  const btnClearChat = root.getElementById('btnClearChat');
  const chatMain = root.getElementById('chat-main');

  if (btnClearChat && chatMain) {
    btnClearChat.addEventListener('click', () => {
      chatMain.innerHTML = noMessagesComponent;
    });
  }
}

function callbackForConfirmCreateChatModal(root: ShadowRoot) {
  const createChatModal = root.getElementById('createChatModal') as Modal;
  createChatModal.confirmRules = async () => {
    const input = createChatModal.querySelector('ypr-input') as Input;
    let isConfirmValue = Validator.isNotEmpty(input.value.trim());
    if (isConfirmValue) {
      isConfirmValue = await API.chats.createChat({ data: { title: input.value } });
    }
    if (isConfirmValue) input.clearValue();
    return isConfirmValue;
  };
}

function generateMessageList(root: ShadowRoot) {
  const chatMain = root.getElementById('chat-main') as Main;

  eventBuss.on('store:update', (key: KeysOfState) => {
    if (key === 'currentChatWSLink') {
      API.messages.connectToChat();
    }
  });

  eventBuss.on('store:update', (key: KeysOfState) => {
    if (key === 'messageItemList') {
      chatMain.innerHTML = '';

      const messageItemList = Store.getState('messageItemList');
      const currentChatId = Store.getState('currentChat');
      const currentChat = Store.getState('chatList').find((chat) => chat.id === currentChatId);
      const hasLastMessages = Boolean(currentChat?.last_message);
      const hasMessages = messageItemList.length !== 0;

      if (hasMessages) {
        generateCotnent<MessageItem, MessageItemData>(
          chatMain,
          'ypr-message-item',
          messageItemList
        );
        return;
      }

      if (!hasLastMessages) {
        chatMain.innerHTML = noMessagesComponent;
      }
    }
  });
}

function generateChatList(root: ShadowRoot) {
  const chatMain = root.getElementById('chat-main') as Main;
  const chatList = root.getElementById('chatlist-main') as Main;
  chatMain.innerHTML = noMessagesComponent;

  eventBuss.on('store:update', (key: KeysOfState) => {
    if (key === 'chatList') {
      chatList.innerHTML = '';
      const data = Store.getState('chatList');
      if (Array.isArray(data)) {
        const chatListData = mapChatApiToChatItem(data);
        generateCotnent<ChatItem, ChatItemData>(chatList, 'ypr-chat-item', chatListData);
      }
    }
  });

  API.chats.getAllChats();
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

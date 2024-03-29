import { EventBus, Store, Validator } from '../../core';
import { generateCotnent } from '../../utils';
import { Main } from '../../components/Layout';
import { MessageItem, MessageItemData } from '../../components/MessageItem';
import { ChatItemData, ChatItem } from '../../components/ChatItem';
import { mapChatApiToChatItem } from './utils';
import { StoreProps } from '../../types';
import { API } from '../../api';
import { Modal } from '../../components/Modal';
import type { Input } from '../../components/Input';
import { Button } from '../../components/Button';

const eventBus = EventBus.getInstance();

export async function connectedCallbackMixin(root: ShadowRoot) {
  generateChatList(root);
  generateMessageList(root);
  settingsPanelHandlers(root);
  chatListHandlers(root);
  chatSettingsHandlers(root);
  clearChatHandler(root);
  callbackForConfirmCreateChatModal(root);
  profileEditButtonsHandlers(root);
  settingsButtonsHandlers(root);
  filteringChatList(root);
  // callbackForConfirmRemoveChat(root);
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

// function callbackForConfirmRemoveChat(root: ShadowRoot) {
//   const removeChatModal = root.getElementById('removeChatModal') as Modal;
//   const headerModal = root.getElementById('removeModalHeader') as HTMLHeadingElement;
//   const currentChat = Store.getState('currentChat');
//   const chatData = Store.getState('chatList').filter((chat) => chat.id === currentChat)[0];

//   removeChatModal.openAction = () => {
//     if (chatData) {
//       headerModal.innerHTML = chatData.title;
//       // removeChatModal.innerHTML = `<h2 slot="header">${chatData.title}</h2>`;
//     }
//   };

//   removeChatModal.confirmRules = async () => {
//     if (currentChat) {
//       console.log({ currentChat, chatData });
//       // isConfirmValue = await API.chats.createChat({ data: { title: input.value } });
//       return true;
//     }

//     return false;
//   };
// }

function generateMessageList(root: ShadowRoot) {
  const chatMain = root.getElementById('chat-main') as Main;

  eventBus.on('store:update', (props: StoreProps) => {
    const { key } = props;
    if (key === 'currentChatWSLink') {
      API.messages.connectToChat();
    }
  });

  eventBus.on('store:update', (props: StoreProps) => {
    const { key, newState } = props;
    if (key === 'messageItemList') {
      chatMain.innerHTML = '';
      const { currentChat, chatList, messageItemList } = newState;

      const currentChatData = chatList.find((chat) => chat.id === currentChat);
      const hasLastMessages = Boolean(currentChatData?.last_message);
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
  const chatListEl = root.getElementById('chatlist-main') as Main;
  chatMain.innerHTML = noMessagesComponent;

  eventBus.on('store:update', (props: StoreProps) => {
    const {
      key,
      newState: { chatList }
    } = props;
    if (key === 'chatList') {
      chatListEl.innerHTML = '';
      const chatListData = mapChatApiToChatItem(chatList);
      generateCotnent<ChatItem, ChatItemData>(chatListEl, 'ypr-chat-item', chatListData);
    }
  });

  API.chats.getAllChats();
}

function filteringChatList(root: ShadowRoot) {
  const chatListEl = root.getElementById('chatlist-main') as Main;

  eventBus.on('search:chat', (props: { value: string }) => {
    const chatList = Store.getState('chatList');
    const { value } = props;
    let chatListData = mapChatApiToChatItem(chatList);
    if (value !== '' && value.length > 3) {
      chatListEl.innerHTML = '';
      chatListData = chatListData.filter((item) => {
        const regExp = new RegExp(value, 'g');
        return regExp.test(item.name);
      });
    }
    generateCotnent<ChatItem, ChatItemData>(chatListEl, 'ypr-chat-item', chatListData);
  });
}

function settingsPanelHandlers(root: ShadowRoot) {
  const btnOpenSettings = root.getElementById('openSettings') as HTMLButtonElement;
  const btnCloseSettings = root.getElementById('settingsBtn') as HTMLButtonElement;

  btnOpenSettings.addEventListener('click', () => {
    eventBus.emmit('panel:toggle', 'settings');
  });

  btnCloseSettings.addEventListener('click', () => {
    eventBus.emmit('panel:toggle');
  });
}

function chatListHandlers(root: ShadowRoot) {
  const btnOpenChatList = root.getElementById('openChatListBtn') as HTMLButtonElement;
  const btnCloseChatList = root.getElementById('chatlist-main') as HTMLButtonElement;

  btnOpenChatList.addEventListener('click', () => {
    eventBus.emmit('panel:toggle', 'chatlist');
  });

  btnCloseChatList.addEventListener('click', () => {
    eventBus.emmit('panel:toggle');
  });
}

function chatSettingsHandlers(root: ShadowRoot) {
  const btnOpenChatSettings = root.getElementById('openChatSettings') as HTMLButtonElement;
  const btnCloseChatSettings = root.getElementById('closeChatSettingsBtn') as HTMLButtonElement;

  btnOpenChatSettings.addEventListener('click', () => {
    eventBus.emmit('panel:toggle', 'chatsettings');
  });

  btnCloseChatSettings.addEventListener('click', () => {
    eventBus.emmit('panel:toggle');
  });
}

function profileEditButtonsHandlers(root: ShadowRoot) {
  const btnUpdateProfile = root.getElementById('btnSubmitProfile') as Button;
  const btnCancelUpdate = root.getElementById('btnCancelProfile') as Button;
  btnUpdateProfile.hide();
  btnCancelUpdate.hide();

  eventBus.on('store:update', (props: StoreProps) => {
    const { key, newState } = props;

    if (key === 'editProfileData' && newState.editProfileData !== null) {
      btnUpdateProfile.show();
      btnCancelUpdate.show();
      return;
    }
    btnUpdateProfile.hide();
    btnCancelUpdate.hide();
  });

  eventBus.on('profile:password:update:is_posible', () => {
    btnUpdateProfile.show();
    btnCancelUpdate.show();
  });

  eventBus.on('profile:password:update:is_not_posible', () => {
    btnUpdateProfile.hide();
    btnCancelUpdate.hide();
  });

  eventBus.on('profile:password:update:success', () => {
    btnUpdateProfile.hide();
    btnCancelUpdate.hide();
  });
}

function settingsButtonsHandlers(root: ShadowRoot) {
  const btnSettingsConfirm = root.getElementById('settingsConfirm') as Button;
  const btnSettingsCancel = root.getElementById('settingsCancel') as Button;

  if (btnSettingsConfirm && btnSettingsCancel) {
    btnSettingsConfirm.hide();
    btnSettingsCancel.hide();
  }
}

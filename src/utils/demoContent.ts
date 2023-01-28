import '../components';
import { togglePanel } from '../components/Layout/actions';

function clearChat() {
  const btnClearChat = document.getElementById('btnClearChat');
  const chatMain = document.getElementById('chat-main');

  if (btnClearChat && chatMain) {
    btnClearChat.addEventListener('click', () => {
      chatMain.innerHTML = `
      <ypr-empty>
        <h2>No Messages</h2>
      </ypr-empty>`;
    });
  }
}

export function cretaDemoContent() {
  // reasearch Custom Events
  const btnOpenSettings = document.getElementById('openSettings');
  const btnOpenChatList = document.getElementById('openChatListBtn');
  const btnOpenChatSettings = document.getElementById('openChatSettings');

  const btnCloseSettings = document.getElementById('settingsBtn');
  const btnCloseChatlist = document.getElementById('chatlist-main');
  const btnCloseChatSettings = document.getElementById('closeChatSettingsBtn');

  btnOpenChatSettings?.addEventListener('click', () => {
    togglePanel('chatsettings');
  });

  btnOpenChatList?.addEventListener('click', () => {
    togglePanel('chatlist');
  });

  btnOpenSettings?.addEventListener('click', () => {
    togglePanel('settings');
  });

  btnCloseSettings?.addEventListener('click', () => {
    togglePanel('settings');
  });

  btnCloseChatlist?.addEventListener('click', () => {
    togglePanel('chatlist');
  });

  btnCloseChatSettings?.addEventListener('click', () => {
    togglePanel('chatsettings');
  });

  // research watch attributes

  clearChat();
}

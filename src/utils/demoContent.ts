import '../components';
import { ChatItemData, ChatItem } from '../components/ChatItem';
import { chatListData } from '../components/ChatItem/data';
import { togglePanel } from '../components/Layout/actions';
import { MessageItem, MessageItemData } from '../components/MessageItem';
import { messageItemList } from '../components/MessageItem/data';
import { demoModals } from '../pages/DevPage/DevPage';
import { generateCotnent } from '../utils'

export function cretaDemoContent() {
  // reasearch Custom Events
  const btnOpenSettings = document.getElementById('openSettings')
  const btnOpenChatList = document.getElementById('openChatListBtn')
  const btnOpenChatSettings = document.getElementById('openChatSettings')

  const btnCloseSettings = document.getElementById('settingsBtn')
  const btnCloseChatlist = document.getElementById('chatlist-main')
  const btnCloseChatSettings = document.getElementById('closeChatSettingsBtn')


  btnOpenChatSettings?.addEventListener('click', () => {
    togglePanel('chatsettings');
  })

  btnOpenChatList?.addEventListener('click', () => {
    togglePanel('chatlist');
  })

  btnOpenSettings?.addEventListener('click', () => {
    togglePanel('settings');
  })


  btnCloseSettings?.addEventListener('click', () => {
    togglePanel("settings");
  })

  btnCloseChatlist?.addEventListener('click', () => {
    togglePanel("chatlist");
  })

  btnCloseChatSettings?.addEventListener('click', () => {
    togglePanel("chatsettings");
  })

  // research watch attributes

  demoModals();
  generateCotnent<MessageItem, MessageItemData>('chat-main', 'ypr-message-item', messageItemList);
  generateCotnent<ChatItem, ChatItemData>('chatlist-main', 'ypr-chat-item', chatListData);
}

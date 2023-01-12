import './components';
import { togglePanel } from './components/Layout/actions';
import { messageItemList } from './components/MessageItem/data';
import { routes } from './pages'
import { demoModals } from './pages/SettingsPage/SettingsPage';
import { Paths } from './types'
import { checkExistPath } from './utils'


const root = document.getElementById("root")
const path = window.location.pathname;
const pathExist = checkExistPath(path);

if (root) {
  if (pathExist) {
    root.insertAdjacentHTML("afterbegin", routes[path])
  }

  if (!pathExist) {
    root.insertAdjacentHTML("afterbegin", routes[Paths.pageNotFound])
  }
}

// reasearch Custom Events
const btnOpenSettings = document.getElementById('openSettings')
const btnOpenChatList = document.getElementById('openChatListBtn')
const btnOpenChatSettings = document.getElementById('openChatSettings')

const btnCloseSettings = document.getElementById('settingsBtn')
const btnCloseChatlist = document.getElementById('closeChatlistBtn')
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

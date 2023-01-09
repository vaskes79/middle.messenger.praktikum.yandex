import { chatList } from "./data";

function buildChatPage(data: { imgurl: string, name: string }) {
  return `
  <ypr-layout>
    <div slot="chat-header">
      <h1>Base Chat</h1>
      <a href="//ya.ru" target="_blank">ypr practicum</a>
      <button id="openChatListBtn">Open chat list</button>
      <button id="openSettings">open settings</button>
      <button id="openChatSettings">open chat settings</button>
    </div>

    <ypr-content slot="chat-main"></ypr-content>

    <div slot="settings-header">
      <h1>Settings Header</h1>
      <button id="settingsBtn">clos Settigs</button>
    </div>

    <ypr-nav slot="settings-main"></ypr-nav>

    <div slot="chatlist-header">
      <h1>Chat List Header</h1>
      <button id="closeChatlistBtn">clos chatlist</button>
    </div>

    <div slot="chatsettings-header">
      <h1>Chat Settings Header</h1>
      <a href="//ya.ru" target="_blank">ypr practicum</a>
      <button id="closeChatSettingsBtn">clos chat settings</button>
    </div>
  </ypr-layout>
  `
}

export function ChatPage() {
  return buildChatPage(chatList);
}

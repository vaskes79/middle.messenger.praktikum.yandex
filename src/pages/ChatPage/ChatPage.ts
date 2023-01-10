import { chatList } from "./data";

function buildChatPage(data: { imgurl: string, name: string }) {
  return `
  <ypr-layout activepanel="settings">
    <h2 slot="chat-header">Base Chat</h2>
    <a slot="chat-header" href="//ya.ru" target="_blank">ypr practicum</a>
    <button slot="chat-header" id="openChatListBtn">Open chat list</button>
    <button slot="chat-header" id="openSettings">open settings</button>
    <button slot="chat-header" id="openChatSettings">open chat settings</button>
    
    <ypr-content slot="chat-main"></ypr-content>

    <div slot="settings-header">
      <h2>Settings Header</h2>
      <button id="settingsBtn">clos Settigs</button>
    </div>

    <ypr-nav slot="settings-main"></ypr-nav>

    <ypr-header slot="chatlist-header">
      <button slot="tabs" id="closeChatlistBtn">clos chatlist</button>
    </ypr-header>

    <div slot="chatsettings-header">
      <h2>Chat Settings Header</h2>
      <a href="//ya.ru" target="_blank">ypr practicum</a>
      <button id="closeChatSettingsBtn">clos chat settings</button>
    </div>
  </ypr-layout>
  `
}

export function ChatPage() {
  return buildChatPage(chatList);
}

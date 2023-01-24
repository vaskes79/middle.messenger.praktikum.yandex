import html from 'bundle-text:./ChatPage.html';
import css from 'bundle-text:./ChatPage.css';
import { EventBus } from '../../core';

const eventBus = EventBus.getInstance();

export enum ChatPageEvent {
  CHATPAGE_MOUNT = 'chatpage:mount',
  CHATPAGE_UNMOUNT = 'chatpage:unmount'
}

eventBus.on(ChatPageEvent.CHATPAGE_MOUNT, (...args) => {
  console.log('ChagPage mounted', args);
});

eventBus.on(ChatPageEvent.CHATPAGE_UNMOUNT, () => {
  console.log('ChagPage unmount');
});

const tmpl = `<style>${css}</style>${html}`;

function buildChatPage() {
  return tmpl;
}

export function ChatPage() {
  return buildChatPage();
}

import { EventBus, Router, Store } from './core';
import { API } from './api';
import { Paths } from './types';
import type { MessageSocket } from './api/messages/MessageSocket';
import type { MessageItemData } from './components/MessageItem';

const eventBus = EventBus.getInstance();

export async function setupRootEventListeners() {
  eventBus.on('logout', async () => {
    await API.auth.logout();
    Store.setState('user', null);
    Store.setState('chatList', []);
    Store.setState('currentChat', null);
    Router.go(Paths.signIn);
  });

  eventBus.on('ws:open', (ws: MessageSocket) => {
    Store.setState('currentWSconnect', ws);
  });

  eventBus.on('ws:close', () => {
    Store.setState('currentWSconnect', null);
    Store.setState('messageItemList', []);
  });

  eventBus.on('ws:message:list', (msgItemData: MessageItemData[]) => {
    const msg = Store.getState('messageItemList');
    Store.setState('messageItemList', msgItemData.concat(msg).reverse());
  });

  eventBus.on('store:update', (key) => {
    console.log('store:update', key);
  });

  eventBus.on('messageinput:send:text', (content: string) => {
    const ws = Store.getState('currentWSconnect');
    if (ws) {
      ws.send({
        type: 'message',
        content
      });
    }
  });

  eventBus.on('component:mount', (name: string) => {
    console.log(`Component ${name} MOUNT`);
  });

  eventBus.on('component:unmount', (name: string) => {
    console.log(`Component ${name} UNMOUNT`);
  });

  const user = await API.auth.getUser();

  if (user && user.id) {
    Store.setState('user', user);
    Router.go(Paths.chat);
  }
}

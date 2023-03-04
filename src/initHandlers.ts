import { EventBus, Router, Store } from './core';
import { API } from './api';
import { Paths, StoreProps } from './types';
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
    const newMessageList = msgItemData.concat(msg);
    Store.setState('messageItemList', newMessageList);
  });

  eventBus.on('store:update', (props: StoreProps) => {
    const { key, newState } = props;
    console.log(`store:update:${key}: `, newState);
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

  eventBus.on('component:mount', (props: { name: string; data: unknown }) => {
    const { name, data } = props;
    console.log(`Component ${name} MOUNT: `, data);
  });

  eventBus.on('component:unmount', (props: { name: string; data: unknown }) => {
    const { name, data } = props;
    console.log(`Component ${name} MOUNT: `, data);
  });

  const user = await API.auth.getUser();

  if (user && user.id) {
    Store.setState('user', user);
    Router.go(Paths.chat);
  }
}

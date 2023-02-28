import { EventBus, Router, Store } from './core';
import { API } from './api';
import { Paths } from './types';

const eventBus = EventBus.getInstance();

export async function setupRootEventListeners() {
  eventBus.on('logout', async () => {
    await API.auth.logout();
    Store.setState('user', null);
    Store.setState('chatList', []);
    Store.setState('currentChat', null);
    Router.go(Paths.signIn);
  });

  eventBus.on('store:update', (key) => {
    console.log('store:update', key);
  });

  eventBus.on('component:mount', (name: string) => {
    console.log(`Component ${name} MOUNT`);
  });

  eventBus.on('component:unmount', (name: string) => {
    console.log(`Component ${name} UNMOUNT`);
  });

  const user = await API.auth.getUser();

  if (user) {
    Store.setState('user', user);
    Router.go(Paths.chat);
  }
}

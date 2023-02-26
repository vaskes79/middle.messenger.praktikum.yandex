import { EventBus } from './core';

const eventBus = EventBus.getInstance();

export function setupRootEventListeners() {
  eventBus.on('store:update', (key) => {
    console.log('store:update', key);
  });

  eventBus.on('component:mount', (name: string) => {
    console.log(`Component ${name} MOUNT`);
  });

  eventBus.on('component:unmount', (name: string) => {
    console.log(`Component ${name} UNMOUNT`);
  });
}

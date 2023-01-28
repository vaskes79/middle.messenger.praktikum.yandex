import { BaseComponentEvents, EventBus } from './core';

const eventBus = EventBus.getInstance();

export function setupRootEventListeners() {
  eventBus.on(BaseComponentEvents.MOUNT, (name: string) => {
    console.log(`Component ${name} MOUNT`);
  });

  eventBus.on(BaseComponentEvents.UNMOUNT, (name: string) => {
    console.log(`Component ${name} UNMOUNT`);
  });
}

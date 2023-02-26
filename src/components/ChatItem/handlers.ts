import { Store } from '../../core';
import { Handlers } from '../../types';

export const handlers: Handlers[] = [
  {
    selector: '.container',
    event: 'click',
    handler: (event: Event) => {
      const btn = event.currentTarget as HTMLButtonElement;

      if (btn.id && typeof btn.id === 'string') {
        Store.setState('currentChat', parseInt(btn.id));
      }
    }
  }
];

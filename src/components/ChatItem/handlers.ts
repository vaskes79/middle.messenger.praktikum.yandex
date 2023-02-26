import { API } from '../../api';
import { Store } from '../../core';
import { Handlers } from '../../types';

export const handlers: Handlers[] = [
  {
    selector: '.container',
    event: 'click',
    handler: (event: Event) => {
      const btn = event.currentTarget as HTMLButtonElement;
      const currentWsConnect = Store.getState('currentWSconnect');
      if (currentWsConnect) {
        currentWsConnect.close();
        Store.setState('currentWSconnect', null);
      }

      if (btn.id && typeof btn.id === 'string') {
        Store.setState('currentChat', parseInt(btn.id));
        API.messages.getWSConnectLink(btn.id);
      }
    }
  }
];

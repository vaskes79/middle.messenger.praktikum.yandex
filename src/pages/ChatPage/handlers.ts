import { submitHanler } from '../../utils';
import { Handlers } from '../../types';
import { EventBus } from '../../core';
const eventBuss = EventBus.getInstance();

export const handlers: Handlers[] = [
  {
    event: 'click',
    selector: '#btnSubmit',
    handler: submitHanler
  },
  {
    event: 'click',
    selector: '#btnLogout',
    handler: () => {
      eventBuss.emmit('logout');
    }
  },
  {
    event: 'click',
    selector: '#createChatBtn',
    handler: () => {
      eventBuss.emmit('modal:open', 'createChatModal');
    }
  }
];

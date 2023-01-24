import { EventBus } from '../../core';
import { Handlers } from '../../types';

const eventBuss = EventBus.getInstance();

const handleModal = () => {
  eventBuss.emmit('modal:open', 'id');
};

export const handlers: Handlers[] = [
  {
    event: 'click',
    selector: '#openModalBtn',
    handler: () => handleModal()
  },
  {
    event: 'click',
    selector: '#btn',
    handler: () => {
      console.log('btn handlers');
    }
  }
];

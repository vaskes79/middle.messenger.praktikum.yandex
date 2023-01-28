import { Handlers } from '../../types';

function closeHandler() {
  this.close();
}

export const handlers: Handlers[] = [
  {
    event: 'click',
    selector: '#cancelBtn',
    handler: closeHandler
  },
  {
    event: 'click',
    selector: '#confirmBtn',
    handler: closeHandler
  },
  {
    event: 'click',
    selector: '.bg',
    handler: closeHandler
  }
];

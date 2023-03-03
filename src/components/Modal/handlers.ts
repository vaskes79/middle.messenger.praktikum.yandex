import { Handlers } from '../../types';
import { Modal } from './Modal';

function closeHandler() {
  Modal.close(this.id);
}

function confirmHandler() {
  Modal.confirm(this.id);
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
    handler: confirmHandler
  },
  {
    event: 'click',
    selector: '.bg',
    handler: closeHandler
  }
];

import { Handlers } from '../../types';

function btnClickHandler() {
  this.openMenu();
}

function backDropClickHandler() {
  this.closeMenu();
}

export const handlers: Handlers[] = [
  {
    event: 'click',
    selector: '.backdrop',
    handler: backDropClickHandler
  },
  {
    event: 'click',
    selector: '#btn',
    handler: btnClickHandler
  },
  {
    event: 'click',
    selector: '.menu-list',
    handler: backDropClickHandler
  }
];

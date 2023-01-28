import { Handlers } from '../../types';

function infoMouseoverListener() {
  this.showDetails();
}

function infoMouseleaveListener() {
  this.hideDetails();
}

function onChangeInputListener(e: Event) {
  const { target } = e;
  this._value = (target as HTMLInputElement).value;
  if (!this._value && this._error) {
    this.clearError();
  }
  this._setupLabel();
}

export const handlers: Handlers[] = [
  {
    event: 'mouseover',
    selector: '.info',
    handler: infoMouseoverListener
  },
  {
    event: 'mouseleave',
    selector: '.info',
    handler: infoMouseleaveListener
  },
  {
    event: 'change',
    selector: 'input',
    handler: onChangeInputListener
  }
];

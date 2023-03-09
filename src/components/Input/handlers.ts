import { Handlers } from '../../types';

function infoMouseoverListener() {
  this.showDetails();
}

function infoMouseleaveListener() {
  this.hideDetails();
}

function onChangeInputListener(e: Event) {
  const { target } = e;
  this.value = (target as HTMLInputElement).value;
  this._setupLabel();
  const isValid = this.validate();
  if (isValid) {
    this.clearError();
  }
}

function validateHandler() {
  this.validate();
}

function focusHandler() {
  this.clearError();
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
    event: 'input',
    selector: 'input',
    handler: onChangeInputListener
  },
  {
    event: 'blur',
    selector: 'input',
    handler: validateHandler
  },
  {
    event: 'focus',
    selector: 'input',
    handler: focusHandler
  }
];

import { Handlers } from '../../types';

function sendMessageHandler() {
  const { value, name } = this._root.querySelector('input') as HTMLInputElement;

  if (value) {
    console.log({ name, value });
  }
}

export const handlers: Handlers[] = [
  {
    event: 'click',
    selector: '#btnSubmit',
    handler: sendMessageHandler
  }
];

import { Handlers } from '../../types';
import { EventBus } from '../../core';
const eventBus = EventBus.getInstance();

function handleChange(event: InputEvent) {
  const input = event.target as HTMLInputElement;
  if (input.value) {
    eventBus.emmit('search:chat', {
      value: input.value.trim()
    });
  }
}

export const handlers: Handlers[] = [
  {
    event: 'input',
    selector: 'input',
    handler: handleChange,
    multi: true
  }
];

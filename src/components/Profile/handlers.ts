import { Handlers } from '../../types';
import { EventBus } from '../../core';
import { Input } from '../../components/Input';
const eventBus = EventBus.getInstance();

function handleChange(event: InputEvent) {
  const input = event.target as Input;
  if (!input.error && input.validate()) {
    eventBus.emmit('profile:edit', {
      name: input.name,
      value: input.value
    });
  }
}

export const handlers: Handlers[] = [
  {
    event: 'input',
    selector: 'ypr-input',
    handler: handleChange,
    multi: true
  }
];

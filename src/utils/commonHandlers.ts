import { Form } from '../components/Form';
import { EventBus } from '../core';

const eventBus = EventBus.getInstance();

export function submitHanler() {
  const { id } = this._root.querySelector('ypr-form') as Form;
  if (id) {
    eventBus.emmit('submit', id);
  }
}

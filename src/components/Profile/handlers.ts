import { Handlers } from '../../types';
import { EventBus, Store } from '../../core';
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

function handleChangePassword(event: InputEvent) {
  const changePasswordData = Store.getState('changePasswordData');
  if (event.target) {
    const input = event.target as Input;
    const { name, value } = input;
    if (name === 'oldPassword' || name === 'newPassword') {
      Store.setState('changePasswordData', { ...changePasswordData, [name]: value });
    }

    const isNewConfirmField = name === 'newPasswordConfirm';

    const isEqualNewPassword =
      changePasswordData.oldPassword &&
      changePasswordData.newPassword &&
      changePasswordData.newPassword === value;

    if (isNewConfirmField && isEqualNewPassword) {
      eventBus.emmit('profile:password:update:is_posible');
      input.clearError();
    }

    if (isNewConfirmField && !isEqualNewPassword) {
      input.showError('Password not matche');
      eventBus.emmit('profile:password:update:is_not_posible');
    }
  }
}

export const handlers: Handlers[] = [
  {
    event: 'input',
    selector: 'ypr-input',
    handler: handleChange,
    multi: true
  },
  {
    event: 'input',
    selector: 'ypr-input[name=oldPassword]',
    handler: handleChangePassword
  },
  {
    event: 'input',
    selector: 'ypr-input[name=newPassword]',
    handler: handleChangePassword
  },
  {
    event: 'input',
    selector: 'ypr-input[name=newPasswordConfirm]',
    handler: handleChangePassword
  }
];

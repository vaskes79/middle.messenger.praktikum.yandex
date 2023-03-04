import { submitHanler } from '../../utils';
import { UpdateUserDTO } from '../../api/user';
import { Handlers } from '../../types';
import { EventBus, Store } from '../../core';
import { API } from '../../api';
const eventBuss = EventBus.getInstance();

export const handlers: Handlers[] = [
  {
    event: 'click',
    selector: '#btnSubmit',
    handler: submitHanler
  },
  {
    event: 'click',
    selector: '#btnLogout',
    handler: () => {
      eventBuss.emmit('logout');
    }
  },
  {
    event: 'click',
    selector: '#createChatBtn',
    handler: () => {
      eventBuss.emmit('modal:open', 'createChatModal');
    }
  },
  {
    event: 'click',
    selector: '#btnSubmitProfile',
    handler: () => {
      const editProfileData = Store.getState('editProfileData');
      const user = Store.getState('user');
      if (editProfileData && user) {
        const { first_name, second_name, display_name, login, email, phone } = user;
        const updateUserDTO: UpdateUserDTO = {
          data: {
            first_name,
            second_name,
            display_name,
            login,
            email,
            phone,
            ...editProfileData
          }
        };

        API.user.updateProfile(updateUserDTO);
      }
    }
  },
  {
    event: 'click',
    selector: '#btnCancelProfile',
    handler: () => {
      eventBuss.emmit('profile:edit:cancel');
    }
  }
];

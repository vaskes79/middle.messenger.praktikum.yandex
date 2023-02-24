import { submitHanler } from '../../utils';
import { Handlers } from '../../types';
import { API } from '../../api';

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
      API.auth.logout();
    }
  }
];

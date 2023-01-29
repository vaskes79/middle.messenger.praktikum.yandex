import { submitHanler } from '../../utils';
import { Handlers } from '../../types';

export const handlers: Handlers[] = [
  {
    event: 'click',
    selector: '#btnSubmit',
    handler: submitHanler
  }
];

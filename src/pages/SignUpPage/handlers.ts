import { Handlers } from '../../types';
import { submitHanler } from '../../utils';

export const handlers: Handlers[] = [
  {
    event: 'click',
    selector: '#btnSubmit',
    handler: submitHanler
  }
];

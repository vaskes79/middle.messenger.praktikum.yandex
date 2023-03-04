import { User } from '../../types';

export type ProfileData = User | null;

export enum ProfileEvents {
  EDIT_PROFILE = 'profile:edit',
  SAVE_ERROR_PROFILE = 'profile:save:error',
  SAVE_SUCCESS_PROFILE = 'profile:save:success',
  CANCEL_PROFILE = 'profile:edit:cancel'
}

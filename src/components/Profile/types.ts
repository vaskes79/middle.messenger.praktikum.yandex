import { User } from '../../types';

export type ProfileData = User | null;

export enum ProfileEvents {
  EDIT_PROFILE = 'profile:edit',
  SAVE_ERROR_PROFILE = 'profile:save:error',
  SAVE_SUCCESS_PROFILE = 'profile:save:success',
  CANCEL_PROFILE = 'profile:edit:cancel',
  SAVE_SUCCESS_AVATAR = 'profile:save:avatar',
  SAVE_ERROR_AVATAR = 'profile:save:avatar:error',
  PASSWORD_CAN_BE_UPDATED = 'profile:password:update:is_posible',
  PASSWORD_NOT_BE_UPDATED = 'profile:password:update:is_not_posible'
}

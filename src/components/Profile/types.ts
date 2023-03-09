import { User } from '../../types';

export type ProfileData = User | null;

export enum ProfileEvents {
  EDIT_PROFILE = 'profile:edit',
  CANCEL_PROFILE = 'profile:edit:cancel',
  SAVE_SUCCESS_AVATAR = 'profile:save:avatar',
  SAVE_ERROR_AVATAR = 'profile:save:avatar:error',
  PASSWORD_CAN_BE_UPDATED = 'profile:password:update:is_posible',
  PASSWORD_NOT_BE_UPDATED = 'profile:password:update:is_not_posible',
  PASSWORD_UPDATE_REQUEST = 'profile:password:update:request',
  PASSWORD_UPDATE_SUCCESS = 'profile:password:update:success',
  PASSWORD_UPDATE_ERROR = 'profile:password:update:error',
  PROFILE_UPDATE_REQUEST = 'profile:update:request',
  PROFILE_UPDATE_SUCCESS = 'profile:update:success',
  PROFILE_UPDATE_ERROR = 'profile:update:error'
}

export type PartOfUpdate = 'avatar' | 'password' | 'profile';

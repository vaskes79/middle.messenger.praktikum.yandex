import { User } from '../../types';

export type ProfileData = User | null;

export enum ProfileEvents {
  EDIT_PROFILE = 'profile:edit'
}

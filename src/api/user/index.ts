import { UserProfileApi, UpdateUserDTO } from './UserProfileApi';

export const user = {
  updateProfile: (userData: UpdateUserDTO) => new UserProfileApi().update(userData)
};

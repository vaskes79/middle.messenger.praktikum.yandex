import { UserAvatarUpdateDTO, UserAvatarUpdateApi } from './UserAvatarUpdate';
import { UserProfileApi, UpdateUserDTO } from './UserProfileApi';
import { UserPasswordUpdateApi, UserPasswordUpdateDTO } from './UserPasswordUpdateApi';

export const user = {
  updateProfile: (userData: UpdateUserDTO) => new UserProfileApi().update(userData),
  updateAvatar: (avatarData: UserAvatarUpdateDTO) => new UserAvatarUpdateApi().update(avatarData),
  updateUserPassword: (passData: UserPasswordUpdateDTO) =>
    new UserPasswordUpdateApi().update(passData)
};

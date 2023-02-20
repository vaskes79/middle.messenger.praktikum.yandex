import { UserAvatarUpdateDTO, UserAvatarUpdateApi } from './UserAvatarUpdate';
import { UserProfileApi, UpdateUserDTO } from './UserProfileApi';

export const user = {
  updateProfile: (userData: UpdateUserDTO) => new UserProfileApi().update(userData),
  updateAvatar: (avatarData: UserAvatarUpdateDTO) => new UserAvatarUpdateApi().update(avatarData)
};

export function isPasswordFields(name: string) {
  return name === 'oldPassword' || name === 'newPassword' || name === 'newPasswordConfirm';
}

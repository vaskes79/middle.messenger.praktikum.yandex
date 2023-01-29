import {
  displayNameRegExp,
  emailRegExp,
  loginRegExp,
  notEmptyRegExp,
  passRegExp,
  phoneRegExp
} from './regExps';

export enum ValidatorCheckNames {
  IS_EMAIL = 'isEmail',
  IS_DISPLAY_NAME = 'isDisplayName',
  IS_LOGIN = 'isLogin',
  IS_CORRECT_PASS = 'isCorrectPassword',
  IS_CORRECT_PHONE = 'isCorrectPhoneNumber',
  IS_NOT_EMPTY = 'isNotEmpty'
}

export class Validator {
  private static _instance: Validator = new Validator();

  constructor() {
    if (Validator._instance) {
      this._error('Instantiation failed: Using keyword new disable. This calss is the Singleton.');
    }
    Validator._instance = this;
  }

  private _checker(regExp: RegExp, str: string) {
    if (!regExp && !str) {
      this._error(`Error: _checker regExp: ${regExp} or str ${str} not set`);
    }
    return regExp.test(str);
  }

  private _error(msg?: string) {
    msg = `Error: ${msg}` || 'Error: Validator';
    throw new Error(msg);
  }

  static [ValidatorCheckNames.IS_EMAIL](str: string) {
    return this._instance._checker(emailRegExp, str);
  }

  static [ValidatorCheckNames.IS_DISPLAY_NAME](str: string) {
    return this._instance._checker(displayNameRegExp, str);
  }

  static [ValidatorCheckNames.IS_LOGIN](str: string) {
    return this._instance._checker(loginRegExp, str);
  }

  static [ValidatorCheckNames.IS_CORRECT_PASS](str: string) {
    return this._instance._checker(passRegExp, str);
  }

  static [ValidatorCheckNames.IS_CORRECT_PHONE](str: string) {
    return this._instance._checker(phoneRegExp, str);
  }

  static [ValidatorCheckNames.IS_NOT_EMPTY](str: string) {
    return this._instance._checker(notEmptyRegExp, str);
  }
}

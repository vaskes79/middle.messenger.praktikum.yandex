import {
  displayNameRegExp,
  emailRegExp,
  loginRegExp,
  notEmptyRegExp,
  passRegExp,
  phoneRegExp
} from './regExps';

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

  static isEmail(str: string) {
    return this._instance._checker(emailRegExp, str);
  }

  static isDisplayName(str: string) {
    return this._instance._checker(displayNameRegExp, str);
  }

  static isLogin(str: string) {
    return this._instance._checker(loginRegExp, str);
  }

  static isCorrectPassword(str: string) {
    return this._instance._checker(passRegExp, str);
  }

  static isCorrectPhoneNumber(str: string) {
    return this._instance._checker(phoneRegExp, str);
  }

  static isNotEmpty(str: string) {
    return this._instance._checker(notEmptyRegExp, str);
  }
}

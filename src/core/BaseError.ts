export class BaseError {
  private _name: string;
  constructor(name?: string) {
    this._name = name || 'BaseError';
  }

  error(msg?: string) {
    msg = msg ? `${this._name}: ${msg}` : `${this._name}`;
    throw new Error(msg);
  }
}

import { format, formatRelative, Locale } from 'date-fns';
import { enGB, ru } from 'date-fns/locale';
import { getLang } from '../utils';

const LOCALES = { enGB, ru };

type OptionsFormatRelative = {
  locale?: Locale;
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
};

export class DateTimeService {
  protected static _instance: DateTimeService = new DateTimeService();
  protected _defaultOpt: OptionsFormatRelative;

  constructor() {
    if (DateTimeService._instance) {
      this._error('Instantiation failed: Use DateTimeService.getInstance() instead of new.');
    }
    this._defaultOpt = {
      locale: LOCALES[getLang()] || LOCALES['enGB'],
      weekStartsOn: 1
    };

    DateTimeService._instance = this;
  }

  private _error(msg?: string) {
    msg = `Error: ${msg}` || 'Error: DateTimeService';
    throw new Error(msg);
  }

  static getRelativeDate(date: string, baseDate?: Date, opt?: OptionsFormatRelative) {
    const relativeDate = new Date(date);
    baseDate = baseDate || new Date();
    const options: OptionsFormatRelative = opt || this._instance._defaultOpt;
    return formatRelative(relativeDate, baseDate, options);
  }

  static format(dateStr: string, formatStr: string, opt?: OptionsFormatRelative) {
    const date = new Date(dateStr);
    const options: OptionsFormatRelative = opt || this._instance._defaultOpt;
    return format(date, formatStr, options);
  }
}

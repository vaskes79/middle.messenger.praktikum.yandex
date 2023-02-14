import { PageElementNames } from '../pages';
import { Paths } from '../types';
import type { BaseComponent } from './BaseComponent';

type PageElement = BaseComponent;

export class Route {
  private _pageElement: PageElement;
  private _rootElement: HTMLElement;

  constructor(
    private _path: Paths,
    private _attrs?: Record<string, string>,
    rootSelector = '#root'
  ) {
    if (!this._path) {
      this._error('Need set path for route');
    }
    const rootElement = document.querySelector(rootSelector);
    if (!rootElement) {
      this._error('Root element not found');
    }
    this._rootElement = rootElement as HTMLElement;
    this._createRoute();
  }

  private _error(msg?: string) {
    msg = `Error:Route: ${msg}` || 'Error: Route';
    throw new Error(msg);
  }

  private _createRoute() {
    this._pageElement = document.createElement(PageElementNames[this._path]) as PageElement;

    if (this._attrs) {
      for (const [key, value] of Object.entries(this._attrs)) {
        this._pageElement.setAttribute(key, value);
      }
    }
  }

  get pathName() {
    return this._path;
  }

  unmountRout() {
    this._rootElement.removeChild(this._pageElement);
  }

  mountRout() {
    this._rootElement.appendChild(this._pageElement);
  }
}

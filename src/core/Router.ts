import { Paths } from '../types';
import { Route } from './Route';

export class Router {
  private static _instance: Router = new Router();
  private _currentRoute: Route | null;
  private _history: History = window.history;
  private _routes: Record<string, Route> = {};

  constructor() {
    if (Router._instance) {
      return Router._instance;
    }
    Router._instance = this;
    this._routes[Paths.error404] = new Route(Paths.error404);
  }

  static use(path: Paths, attrs?: Record<string, string>) {
    const route = new Route(path, attrs);
    this._instance._routes[path] = route;
    return this;
  }

  private _locationPathHandler = (event: PopStateEvent) => {
    const { currentTarget } = event;
    const pathname = (currentTarget as Window).location.pathname;
    Router.go(pathname);
  };

  private _navigate(path: string) {
    const activeRoute = this._routes[path] || this._routes[Paths.error404];

    if (!this._currentRoute) {
      activeRoute.mountRout();
    } else {
      this._currentRoute.unmountRout();
      activeRoute.mountRout();
    }

    this._currentRoute = activeRoute;
  }

  static start() {
    window.addEventListener('popstate', this._instance._locationPathHandler);
    const path = window.location.pathname;
    this._instance._navigate(path);
  }

  static go(pathname: string) {
    this._instance._navigate(pathname);
    this._instance._history.pushState({}, pathname, pathname);
  }

  static back() {
    this._instance._history.back();
  }

  static forward() {
    this._instance._history.forward();
  }
}

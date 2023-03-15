import type { BaseComponent } from '../core';
import { Paths } from './Paths';

export type Route = {
  path: Paths;
  state: Record<string, unknown>;
};

export type RouteElem<ElemT extends BaseComponent> = ElemT | string;

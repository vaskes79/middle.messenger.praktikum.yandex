export function selectEl<Target extends HTMLElement>(selector: string, target?: Target) {
  const rootElem = target || document;
  return rootElem.querySelector(selector) as HTMLElement;
}

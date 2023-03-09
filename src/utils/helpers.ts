export function selectEl<Target extends HTMLElement>(selector: string, target?: Target) {
  const rootElem = target || document;
  return rootElem.querySelector(selector) as HTMLElement;
}

export function getLang() {
  if (navigator.languages != undefined) return navigator.languages[0] as 'ru' | 'enGB';
  return navigator.language as 'ru' | 'enGB';
}

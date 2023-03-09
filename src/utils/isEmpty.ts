export function isEmpty(obj: object) {
  for (const key in obj) {
    if (key) {
      return false;
    }
  }
  return true;
}

function isLength(value: unknown) {
  return (
    typeof value === 'number' && value > -1 && value % 1 === 0 && value <= Number.MAX_SAFE_INTEGER
  );
}

function isNil(value: unknown) {
  return value === null || value === undefined;
}

function isArrayLike(value: any) {
  return !isNil(value) && typeof value !== 'function' && isLength(value.length);
}

function isObjectLike(value: unknown) {
  return typeof value === 'object' && value !== null;
}

function getTag(value: unknown) {
  if (value === null) {
    return value === undefined ? '[object Undefined]' : '[object Null]';
  }
  return toString.call(value);
}

const objectProto = Object.prototype;
function isPrototype(value: unknown) {
  const ctor = value && value.constructor;
  const proto = (typeof ctor === 'function' && ctor.prototype) || objectProto;

  return value === proto;
}

function isArguments(value: unknown) {
  return isObjectLike(value) && getTag(value) === '[object Arguments]';
}

export function isEmpty(value: any) {
  if (value === null) {
    return true;
  }

  if (
    isArrayLike(value) &&
    (Array.isArray(value) ||
      typeof value === 'string' ||
      typeof value.splice === 'function' ||
      isArguments(value))
  ) {
    return !value.length;
  }

  const tag = getTag(value);
  if (tag === '[object Map]' || tag === '[object Set]') {
    return !value.size;
  }

  if (isPrototype(value)) {
    return !Object.keys(value).length;
  }
  for (const key in value) {
    if (Object.hasOwnProperty.call(value, key)) {
      return false;
    }
  }

  return true;
}

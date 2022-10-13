import { mergeAndCompare } from "merge-anything";
import { isFunction } from "../common";

export function mergeFn(origin: any, override: any) {
  if (isFunction(origin) || isFunction(override)) {
    return (...args: any[]) => {
      const originValue = isFunction(origin) ? origin(...args) : origin;
      const overrideValue = isFunction(override) ? override(...args) : override;
      return mergeAndCompare(mergeFn, {}, originValue, overrideValue);
    };
  }

  if (Array.isArray(origin) || Array.isArray(override)) {
    return (origin ?? []).concat(override ?? []);
  }

  return override;
}

export function mergeWith(...overrides: any[]): any {
  return mergeAndCompare(mergeFn, {}, ...overrides);
}

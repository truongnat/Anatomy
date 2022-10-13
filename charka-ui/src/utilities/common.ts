export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const camelCase = (str: string) => {
  return str.replace(/[-_](\w)/g, (_, c) => c.toUpperCase());
};

type Dict<T = any> = Record<string, T>;

export function isObject(value: any): value is Dict {
  const type = typeof value;
  return (
    value != null &&
    (type === "object" || type === "function") &&
    !Array.isArray(value)
  );
}

export function isFunction(value: any): value is Function {
  return typeof value === "function";
}

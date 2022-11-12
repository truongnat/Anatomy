export type Merge<T, P> = P & Omit<T, keyof P>;

export type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

export type FunctionArguments<T extends Function> = T extends (
  ...args: infer R
) => any
  ? R
  : never;

export type Dict<T = any> = Record<string, T>;

export type Booleanish = boolean | "true" | "false";
export type StringOrNumber = string | number;

export type EventKeys =
  | "ArrowDown"
  | "ArrowUp"
  | "ArrowLeft"
  | "ArrowRight"
  | "Enter"
  | "Space"
  | "Tab"
  | "Backspace"
  | "Control"
  | "Meta"
  | "Home"
  | "End"
  | "PageDown"
  | "PageUp"
  | "Delete"
  | "Escape"
  | " "
  | "Shift";

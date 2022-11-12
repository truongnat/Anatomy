import {
  PanEventHistory,
  Point,
  PointerEventInfo,
  TimestampedPoint,
} from "./types";

function subtract(a: Point, b: Point) {
  return { x: a.x - b.x, y: a.y - b.y };
}

function getPanInfo(info: PointerEventInfo, history: PanEventHistory) {
  return {
    point: info.point,
    delta: subtract(info.point, history[history.length - 1]),
    offset: subtract(info.point, history[0]),
    velocity: getVelocity(history, 0.1),
  };
}

const toMilliseconds = (v: number) => v * 1000;

function pipe<R>(...fns: Array<(a: R) => R>) {
  return (v: R) => fns.reduce((a, b) => b(a), v);
}

function distance1D(a: number, b: number) {
  return Math.abs(a - b);
}

function isPoint(point: any): point is { x: number; y: number } {
  return "x" in point && "y" in point;
}

export function distance<P extends Point | number>(a: P, b: P) {
  if (typeof a === "number" && typeof b === "number") {
    return distance1D(a, b);
  }

  if (isPoint(a) && isPoint(b)) {
    const xDelta = distance1D(a.x, b.x);
    const yDelta = distance1D(a.y, b.y);
    return Math.sqrt(xDelta ** 2 + yDelta ** 2);
  }

  return 0;
}

function getVelocity(history: TimestampedPoint[], timeDelta: number): Point {
  if (history.length < 2) {
    return { x: 0, y: 0 };
  }

  let i = history.length - 1;
  let timestampedPoint: TimestampedPoint | null = null;
  const lastPoint = history[history.length - 1];
  while (i >= 0) {
    timestampedPoint = history[i];
    if (
      lastPoint.timestamp - timestampedPoint.timestamp >
      toMilliseconds(timeDelta)
    ) {
      break;
    }
    i--;
  }

  if (!timestampedPoint) {
    return { x: 0, y: 0 };
  }

  const time = (lastPoint.timestamp - timestampedPoint.timestamp) / 1000;
  if (time === 0) {
    return { x: 0, y: 0 };
  }

  const currentVelocity = {
    x: (lastPoint.x - timestampedPoint.x) / time,
    y: (lastPoint.y - timestampedPoint.y) / time,
  };

  if (currentVelocity.x === Infinity) {
    currentVelocity.x = 0;
  }
  if (currentVelocity.y === Infinity) {
    currentVelocity.y = 0;
  }

  return currentVelocity;
}

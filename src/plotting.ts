import { Boundary } from './types';

// Scale a value in range [oldMin, oldMax] to the scale
// [newMin, newMax].
// See https://stackoverflow.com/a/5295202/6413814
export const scale = (
  newMax: number,
  newMin: number,
  oldMax: number,
  oldMin: number,
  x: number
) => {
  const scalar = newMax - newMin;
  const diff = oldMax - oldMin;
  if (!diff) return newMin;
  return (scalar * (x - oldMin)) / diff + newMin;
};

export const normalizeCoord = ({ value, isHorizontal, bounds, min, max }) => {
  const float = parseFloat(value);
  if (Number.isNaN(float)) throw Error(`Invalid coordinate ${value} in path`);

  const oldMax = bounds[isHorizontal ? Boundary.xMax : Boundary.yMax];
  const oldMin = bounds[isHorizontal ? Boundary.xMin : Boundary.yMin];

  return scale(max, min, oldMax, oldMin, float);
};

import { Boundary, Dimension, RangeTuple, ViewBoxTuple } from './types';
import { getLargestDimension } from './utils';

/**
 * Check if bounds are 1:1 aspect
 * @param bounds {ViewBoxTuple}
 */
export const areBoundsIdentical = (bounds: ViewBoxTuple) => {
  if (bounds[Boundary.xMin] !== bounds[Boundary.yMin]) return false;
  return bounds[Boundary.xMax] === bounds[Boundary.yMax];
};

/**
 * Scale a value in range [oldMin, oldMax] to the scale [newMin, newMax].
 * See https://stackoverflow.com/a/5295202/6413814
 * @param inputRange {[number, number]}
 * @param outputRange {[number, number]}
 * @return {(value: number) => number}
 */
export const interpolate = (inputRange: RangeTuple, outputRange: RangeTuple) => {
  const [minInput, maxInput] = inputRange;
  const [minOutput, maxOutput] = outputRange;
  const slope = (maxOutput - minOutput) / (maxInput - minInput);
  return (x: number): number => minOutput + slope * (x - minInput);
};

/**
 * Creates the interpolators to calculate points given an
 * input and output range.
 * @param min
 * @param max
 * @param bounds
 * @param maintainAspectRatio
 */
export const createInterpolators = (
  min: number,
  max: number,
  bounds: ViewBoxTuple,
  maintainAspectRatio?: boolean
) => {
  const xRange: RangeTuple = [bounds[Boundary.xMin], bounds[Boundary.xMax]];
  const yRange: RangeTuple = [bounds[Boundary.yMin], bounds[Boundary.yMax]];
  const outRange: RangeTuple = [min, max];
  if (!maintainAspectRatio || areBoundsIdentical(bounds))
    return {
      interpolateX: interpolate(xRange, outRange),
      interpolateY: interpolate(yRange, outRange),
    };
  const isHorizontal = getLargestDimension(bounds) === Dimension.horizontal;
  return {
    interpolateX: interpolate(isHorizontal ? xRange : yRange, outRange),
    interpolateY: interpolate(isHorizontal ? xRange : yRange, outRange),
  };
};

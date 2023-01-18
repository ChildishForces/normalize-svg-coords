import { Boundary, Dimension, RangeTuple, ViewBoxTuple } from './types';
import { getLargestDimension } from './utils';

export const areBoundsIdentical = (bounds: ViewBoxTuple) => {
  if (bounds[Boundary.xMin] !== bounds[Boundary.yMax]) return false;
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
 * Scales the smallest dimension to be centered
 * @param min
 * @param max
 * @param bounds
 * @param dimension
 */
export const interpolateWithAspect = (
  min: number,
  max: number,
  bounds: ViewBoxTuple,
  dimension: Dimension
): ((value: number) => number) => {
  const isHorizontal = dimension === Dimension.horizontal;

  const xMin = bounds[Boundary.xMin];
  const yMin = bounds[Boundary.yMin];

  const pathWidth = bounds[Boundary.xMax] - xMin;
  const pathHeight = bounds[Boundary.yMax] - yMin;

  const outputWidth = max - min;
  const outputHeight = max - min;

  const scaleX = outputWidth / pathWidth;
  const scaleY = outputHeight / pathHeight;

  const scale = Math.min(scaleX, scaleY);

  if (isHorizontal) return (value: number) => min + value * scale;
  return (value: number) => min + value * scale;
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
  const largestDimension = getLargestDimension(bounds);
  switch (largestDimension) {
    case Dimension.horizontal:
      return {
        interpolateX: interpolate(xRange, outRange),
        interpolateY: interpolateWithAspect(min, max, bounds, largestDimension),
      };
    case Dimension.vertical:
      return {
        interpolateX: interpolateWithAspect(min, max, bounds, largestDimension),
        interpolateY: interpolate(yRange, outRange),
      };
  }
};

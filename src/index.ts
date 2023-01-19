import { getPathInstruction, transformToInstructionConfig } from './instructions';
import parse from './parse';
import { createInterpolators } from './plotting';
import { Boundary, Dimension, INormaliseConfig, ViewBoxTuple } from './types';
import { getLargestDimension, getViewBoxTuple, roundToDecimalPlace } from './utils';

// Normalize an SVG path to between a specified min and max.
// Throws an error on invalid parameters.
const normalize = ({
  viewBox,
  path,
  min = 0,
  max = 1,
  precision = 4,
  asList,
  maintainAspectRatio,
}: INormaliseConfig) => {
  const bounds = getViewBoxTuple(path, viewBox);
  const { interpolateX, interpolateY } = createInterpolators(min, max, bounds, maintainAspectRatio);

  const normalized = parse(path).map(([rawInstruction, ...remaining]) => {
    const instruction = getPathInstruction(rawInstruction as string);
    const intermediates = transformToInstructionConfig(instruction, remaining as string[]);

    // Normalize the values of each coordinate.
    const coords = intermediates.reduce<Array<string>>(
      (processed, { value, skip, isHorizontal }) => {
        if (skip) return [...processed, value];
        const interpolator = isHorizontal ? interpolateX : interpolateY;
        const normalised = interpolator(roundToDecimalPlace(parseFloat(value), 3));
        return [...processed, String(Number(normalised.toFixed(precision)))];
      },
      [] as Array<string>
    );

    // Return as segmented list?
    if (asList) return [rawInstruction, ...coords];
    return `${rawInstruction}${coords.join(' ')}`;
  });

  if (asList) return normalized;
  return normalized.join(' ');
};

export default normalize;

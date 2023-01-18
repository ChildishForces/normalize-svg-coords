import { getPathInstruction, transformToInstructionConfig } from './instructions';
import parse from './parse';
import { createInterpolators } from './plotting';
import { INormaliseConfig } from './types';
import { getViewBoxTuple } from './utils';
import getBoundingBox from "./bounds";

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
  shouldCenter,
}: INormaliseConfig) => {
  const bounds = getViewBoxTuple(path, viewBox);
  const {interpolateX, interpolateY} = createInterpolators(min, max, bounds, maintainAspectRatio);

  const normalized = parse(path).map(([rawInstruction, ...remaining]) => {
    const instruction = getPathInstruction(rawInstruction as string);
    const intermediates = transformToInstructionConfig(instruction, remaining as string[]);

    // Normalize the values of each coordinate.
    const coords = intermediates.reduce<Array<string>>(
      (processed, {value, skip, isHorizontal}) => {
        if (skip) return [...processed, value];
        const interpolator = isHorizontal ? interpolateX : interpolateY;
        const normalised = interpolator(parseFloat(value));
        return [...processed, String(Number(normalised.toFixed(precision)))];
      },
      [] as Array<string>
    );

    // Return as segmented list?
    if (asList) return [rawInstruction, ...coords];
    return `${rawInstruction}${coords.join(' ')}`;
  });

  // TODO: Center logic
}

export default normalize;

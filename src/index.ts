import parse from 'parse-svg-path';
import { getPathInstruction, transformToInstructionConfig } from './instructions';
import { normalizeCoord } from './plotting';
import { INormaliseConfig } from './types';
import { getViewBoxTuple } from './utils';

// Normalize an SVG path to between a specified min and max.
// Throws an error on invalid parameters.
const normalize = ({
  viewBox,
  path,
  min = 0,
  max = 1,
  precision = 4,
  asList,
}: INormaliseConfig) => {
  const bounds = getViewBoxTuple(path, viewBox);
  const normalized = parse(path).map(([rawInstruction, ...remaining]) => {
    const instruction = getPathInstruction(rawInstruction);

    // Transform into IR
    const intermediates = transformToInstructionConfig(instruction, remaining);

    // Normalize the values of each coordinate.
    const coords = intermediates.reduce<Array<string>>(
      (processed, { value, skip, isHorizontal }) => {
        if (skip) return [...processed, value];
        const norm = normalizeCoord({
          value,
          min,
          max,
          bounds,
          isHorizontal,
        }).toFixed(precision);
        return [...processed, norm];
      },
      [] as Array<string>
    );

    // Return as segmented list?
    if (asList) return [rawInstruction, ...coords];
    return `${rawInstruction}${coords.join(' ')}`;
  });

  return asList ? normalized : normalized.join('');
};

export default normalize;

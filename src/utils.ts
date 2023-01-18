import getBoundingBox from './bounds';
import { Boundary, Dimension, INormaliseConfig, ViewBoxTuple } from './types';

/**
 * The viewBox string may be specified using spaces or commas as delimiters.
 * The order is: xmin, ymin, xmax, ymax
 * @param viewBoxStr
 * @returns {ViewBoxTuple}
 */
export const extractViewBox = (viewBoxStr: string): ViewBoxTuple => {
  const parts = viewBoxStr.split(/\s*,\s*|\s+/);
  return parts.map(parseFloat) as ViewBoxTuple;
};

/**
 * Function to discriminate a type to ViewBoxTuple
 * @param viewBox
 * @returns {boolean}
 */
export const isViewBoxTuple = (viewBox: object): viewBox is ViewBoxTuple =>
  Array.isArray(viewBox) && viewBox.length === 4 && viewBox.every((v) => typeof v === 'number');

/**
 * Gets the largest dimension from bounds
 * @param bounds
 * @returns {Dimension}
 */
export const getLargestDimension = (bounds: ViewBoxTuple): Dimension => {
  const { xMin, xMax, yMin, yMax } = Boundary;
  const xRange = bounds[xMax] - bounds[xMin];
  const yRange = bounds[yMax] - bounds[yMin];
  return xRange > yRange ? Dimension.horizontal : Dimension.vertical;
};

/**
 * Returns ViewBoxTuple from various acceptable types of bounds
 * @param path
 * @param viewBox
 * @returns {ViewBoxTuple}
 */
export const getViewBoxTuple = (
  path: string,
  viewBox?: INormaliseConfig['viewBox']
): ViewBoxTuple => {
  switch (typeof viewBox) {
    case 'string':
      return extractViewBox(viewBox);
    case 'object':
      if (isViewBoxTuple(viewBox)) return viewBox;
      return [viewBox.xmin, viewBox.ymin, viewBox.xmax, viewBox.ymax];
    case 'undefined': {
      const { minX, minY, maxX, maxY } = getBoundingBox(path);
      return [minX, minY, maxX, maxY];
    }
    default:
      throw Error('Unknown viewBox format');
  }
};

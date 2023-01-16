import getBounds from 'svg-path-bounds';
import { INormaliseConfig, ViewBoxTuple } from './types';

// The viewBox string may be specified using spaces or commas as delimiters.
// The order is: xmin, ymin, xmax, ymax
export const extractViewBox = (viewBoxStr: string): ViewBoxTuple => {
  const parts = viewBoxStr.split(/\s*,\s*|\s+/);
  return parts.map(parseFloat) as ViewBoxTuple;
};

export const isViewBoxTuple = (viewBox: object): viewBox is ViewBoxTuple =>
  Array.isArray(viewBox) && viewBox.length === 4;

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
    case 'undefined':
      return getBounds(path) as ViewBoxTuple;
    default:
      throw Error('Unknown viewBox format');
  }
};

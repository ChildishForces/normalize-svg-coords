export enum Boundary {
  xMin,
  yMin,
  xMax,
  yMax,
}

export enum PathCommand {
  moveTo,
  lineTo,
  horizontalLineTo,
  verticalLineTo,
  cubicBezierCurve,
  smoothCubicBezierCurve,
  quadraticBezierCurve,
  smoothQuadraticBezierCurve,
  ellipticalArcCurve,
  closePath,
}

export enum Dimension {
  vertical,
  horizontal,
}

export type RangeTuple = [number, number];

export type ViewBoxTuple = [number, number, number, number];

export interface IPathConfig {
  value: string;
  skip?: boolean;
  isHorizontal?: boolean;
}

export interface INormaliseConfig {
  viewBox?: Record<'xmin' | 'xmax' | 'ymin' | 'ymax', number> | ViewBoxTuple | string;
  path: string;
  min: number;
  max: number;
  precision?: number;
  asList?: boolean;
  maintainAspectRatio?: boolean;
  shouldCenter?: boolean;
}

export interface INormalizeCoordConfig {
  value: string;
  isHorizontal?: boolean;
  bounds: ViewBoxTuple;
  min: number;
  max: number;
}

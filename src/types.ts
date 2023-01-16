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

export type ViewBoxTuple = [number, number, number, number];

export interface INormaliseConfig {
  viewBox?: Record<'xmin' | 'xmax' | 'ymin' | 'ymax', number> | ViewBoxTuple | string;
  path: string;
  min: number;
  max: number;
  precision?: number;
  asList?: boolean;
}

export interface IPathConfig {
  value: string;
  skip?: boolean;
  isHorizontal?: boolean;
}

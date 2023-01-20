export declare enum Boundary {
    xMin = 0,
    yMin = 1,
    xMax = 2,
    yMax = 3
}
export declare enum PathCommand {
    moveTo = 0,
    lineTo = 1,
    horizontalLineTo = 2,
    verticalLineTo = 3,
    cubicBezierCurve = 4,
    smoothCubicBezierCurve = 5,
    quadraticBezierCurve = 6,
    smoothQuadraticBezierCurve = 7,
    ellipticalArcCurve = 8,
    closePath = 9
}
export declare enum Dimension {
    vertical = 0,
    horizontal = 1
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
    min?: number;
    max?: number;
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

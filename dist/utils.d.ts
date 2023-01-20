import { Dimension, INormaliseConfig, ViewBoxTuple } from './types';
/**
 * The viewBox string may be specified using spaces or commas as delimiters.
 * The order is: xmin, ymin, xmax, ymax
 * @param viewBoxStr
 * @returns {ViewBoxTuple}
 */
export declare const extractViewBox: (viewBoxStr: string) => ViewBoxTuple;
/**
 * Function to discriminate a type to ViewBoxTuple
 * @param viewBox
 * @returns {boolean}
 */
export declare const isViewBoxTuple: (viewBox: object) => viewBox is ViewBoxTuple;
/**
 * Gets the largest dimension from bounds
 * @param bounds
 * @returns {Dimension}
 */
export declare const getLargestDimension: (bounds: ViewBoxTuple) => Dimension;
/**
 * Returns ViewBoxTuple from various acceptable types of bounds
 * @param path
 * @param viewBox
 * @returns {ViewBoxTuple}
 */
export declare const getViewBoxTuple: (path: string, viewBox?: INormaliseConfig['viewBox']) => ViewBoxTuple;
/**
 * Rounds a value to the provided number of decimal places
 * @param value
 * @param precision
 */
export declare const roundToDecimalPlace: (value: number, precision: number) => number;

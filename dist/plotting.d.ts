import { RangeTuple, ViewBoxTuple } from './types';
/**
 * Check if bounds are 1:1 aspect
 * @param bounds {ViewBoxTuple}
 */
export declare const areBoundsIdentical: (bounds: ViewBoxTuple) => boolean;
/**
 * Scale a value in range [oldMin, oldMax] to the scale [newMin, newMax].
 * See https://stackoverflow.com/a/5295202/6413814
 * @param inputRange {[number, number]}
 * @param outputRange {[number, number]}
 * @return {(value: number) => number}
 */
export declare const interpolate: (inputRange: RangeTuple, outputRange: RangeTuple) => (x: number) => number;
/**
 * Creates the interpolators to calculate points given an
 * input and output range.
 * @param min
 * @param max
 * @param bounds
 * @param maintainAspectRatio
 */
export declare const createInterpolators: (min: number, max: number, bounds: ViewBoxTuple, maintainAspectRatio?: boolean) => {
    interpolateX: (x: number) => number;
    interpolateY: (x: number) => number;
};

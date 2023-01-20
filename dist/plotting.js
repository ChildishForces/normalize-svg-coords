"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createInterpolators = exports.interpolate = exports.areBoundsIdentical = void 0;
const types_1 = require("./types");
const utils_1 = require("./utils");
/**
 * Check if bounds are 1:1 aspect
 * @param bounds {ViewBoxTuple}
 */
const areBoundsIdentical = (bounds) => {
    if (bounds[types_1.Boundary.xMin] !== bounds[types_1.Boundary.yMin])
        return false;
    return bounds[types_1.Boundary.xMax] === bounds[types_1.Boundary.yMax];
};
exports.areBoundsIdentical = areBoundsIdentical;
/**
 * Scale a value in range [oldMin, oldMax] to the scale [newMin, newMax].
 * See https://stackoverflow.com/a/5295202/6413814
 * @param inputRange {[number, number]}
 * @param outputRange {[number, number]}
 * @return {(value: number) => number}
 */
const interpolate = (inputRange, outputRange) => {
    const [minInput, maxInput] = inputRange;
    const [minOutput, maxOutput] = outputRange;
    const slope = (maxOutput - minOutput) / (maxInput - minInput);
    return (x) => minOutput + slope * (x - minInput);
};
exports.interpolate = interpolate;
/**
 * Creates the interpolators to calculate points given an
 * input and output range.
 * @param min
 * @param max
 * @param bounds
 * @param maintainAspectRatio
 */
const createInterpolators = (min, max, bounds, maintainAspectRatio) => {
    const xRange = [bounds[types_1.Boundary.xMin], bounds[types_1.Boundary.xMax]];
    const yRange = [bounds[types_1.Boundary.yMin], bounds[types_1.Boundary.yMax]];
    const outRange = [min, max];
    if (!maintainAspectRatio || (0, exports.areBoundsIdentical)(bounds))
        return {
            interpolateX: (0, exports.interpolate)(xRange, outRange),
            interpolateY: (0, exports.interpolate)(yRange, outRange),
        };
    const isHorizontal = (0, utils_1.getLargestDimension)(bounds) === types_1.Dimension.horizontal;
    return {
        interpolateX: (0, exports.interpolate)(isHorizontal ? xRange : yRange, outRange),
        interpolateY: (0, exports.interpolate)(isHorizontal ? xRange : yRange, outRange),
    };
};
exports.createInterpolators = createInterpolators;
//# sourceMappingURL=plotting.js.map
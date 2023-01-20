"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.roundToDecimalPlace = exports.getViewBoxTuple = exports.getLargestDimension = exports.isViewBoxTuple = exports.extractViewBox = void 0;
const bounds_1 = __importDefault(require("./bounds"));
const types_1 = require("./types");
/**
 * The viewBox string may be specified using spaces or commas as delimiters.
 * The order is: xmin, ymin, xmax, ymax
 * @param viewBoxStr
 * @returns {ViewBoxTuple}
 */
const extractViewBox = (viewBoxStr) => {
    const parts = viewBoxStr.split(/\s*,\s*|\s+/);
    if (parts.length < 4)
        throw Error('Invalid viewBox string length');
    return parts.map(parseFloat);
};
exports.extractViewBox = extractViewBox;
/**
 * Function to discriminate a type to ViewBoxTuple
 * @param viewBox
 * @returns {boolean}
 */
const isViewBoxTuple = (viewBox) => Array.isArray(viewBox) && viewBox.length === 4 && viewBox.every((v) => typeof v === 'number');
exports.isViewBoxTuple = isViewBoxTuple;
/**
 * Gets the largest dimension from bounds
 * @param bounds
 * @returns {Dimension}
 */
const getLargestDimension = (bounds) => {
    const { xMin, xMax, yMin, yMax } = types_1.Boundary;
    const xRange = bounds[xMax] - bounds[xMin];
    const yRange = bounds[yMax] - bounds[yMin];
    return xRange > yRange ? types_1.Dimension.horizontal : types_1.Dimension.vertical;
};
exports.getLargestDimension = getLargestDimension;
/**
 * Returns ViewBoxTuple from various acceptable types of bounds
 * @param path
 * @param viewBox
 * @returns {ViewBoxTuple}
 */
const getViewBoxTuple = (path, viewBox) => {
    switch (typeof viewBox) {
        case 'string':
            return (0, exports.extractViewBox)(viewBox);
        case 'object':
            if ((0, exports.isViewBoxTuple)(viewBox))
                return viewBox;
            return [viewBox.xmin, viewBox.ymin, viewBox.xmax, viewBox.ymax];
        case 'undefined': {
            const { minX, minY, maxX, maxY } = (0, bounds_1.default)(path);
            return [minX, minY, maxX, maxY];
        }
        default:
            throw Error('Unknown viewBox format');
    }
};
exports.getViewBoxTuple = getViewBoxTuple;
/**
 * Rounds a value to the provided number of decimal places
 * @param value
 * @param precision
 */
const roundToDecimalPlace = (value, precision) => {
    const p = 10 ** precision;
    return Math.round(value * p) / p;
};
exports.roundToDecimalPlace = roundToDecimalPlace;
//# sourceMappingURL=utils.js.map
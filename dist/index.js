"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const instructions_1 = require("./instructions");
const parse_1 = __importDefault(require("./parse"));
const plotting_1 = require("./plotting");
const utils_1 = require("./utils");
// Normalize an SVG path to between a specified min and max.
// Throws an error on invalid parameters.
const normalize = ({ viewBox, path, min = 0, max = 1, precision = 4, asList, maintainAspectRatio, }) => {
    const bounds = (0, utils_1.getViewBoxTuple)(path, viewBox);
    const { interpolateX, interpolateY } = (0, plotting_1.createInterpolators)(min, max, bounds, maintainAspectRatio);
    const normalized = (0, parse_1.default)(path).map(([rawInstruction, ...remaining]) => {
        const instruction = (0, instructions_1.getPathInstruction)(rawInstruction);
        const intermediates = (0, instructions_1.transformToInstructionConfig)(instruction, remaining);
        // Normalize the values of each coordinate.
        const coords = intermediates.reduce((processed, { value, skip, isHorizontal }) => {
            if (skip)
                return [...processed, value];
            const interpolator = isHorizontal ? interpolateX : interpolateY;
            const normalised = interpolator((0, utils_1.roundToDecimalPlace)(parseFloat(value), 3));
            return [...processed, String(Number(normalised.toFixed(precision)))];
        }, []);
        // Return as segmented list?
        if (asList)
            return [rawInstruction, ...coords];
        return `${rawInstruction}${coords.join(' ')}`;
    });
    if (asList)
        return normalized;
    return normalized.join(' ');
};
exports.default = normalize;
//# sourceMappingURL=index.js.map
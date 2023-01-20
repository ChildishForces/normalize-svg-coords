"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPathInstruction = exports.transformToInstructionConfig = void 0;
const types_1 = require("./types");
const transformToInstructionConfig = (instruction, remaining) => {
    switch (instruction) {
        case types_1.PathCommand.ellipticalArcCurve: {
            const [rx, ry, xRot, largeArc, sweep, x, y] = remaining;
            return [
                { value: rx, isHorizontal: true },
                { value: ry },
                { value: xRot, skip: true },
                { value: largeArc, skip: true },
                { value: sweep, skip: true },
                { value: x, isHorizontal: true },
                { value: y },
            ];
        }
        case types_1.PathCommand.horizontalLineTo: {
            const [value] = remaining;
            return [{ value, isHorizontal: true }];
        }
        case types_1.PathCommand.verticalLineTo: {
            const [value] = remaining;
            return [{ value }];
        }
        default:
            return remaining.map((value, i) => ({
                value,
                isHorizontal: !(i % 2),
            }));
    }
};
exports.transformToInstructionConfig = transformToInstructionConfig;
const getPathInstruction = (instruction) => {
    switch (instruction) {
        case 'M':
        case 'm':
            return types_1.PathCommand.moveTo;
        case 'L':
        case 'l':
            return types_1.PathCommand.lineTo;
        case 'H':
        case 'h':
            return types_1.PathCommand.horizontalLineTo;
        case 'V':
        case 'v':
            return types_1.PathCommand.verticalLineTo;
        case 'C':
        case 'c':
            return types_1.PathCommand.cubicBezierCurve;
        case 'S':
        case 's':
            return types_1.PathCommand.smoothCubicBezierCurve;
        case 'Q':
        case 'q':
            return types_1.PathCommand.quadraticBezierCurve;
        case 'T':
        case 't':
            return types_1.PathCommand.smoothQuadraticBezierCurve;
        case 'A':
        case 'a':
            return types_1.PathCommand.ellipticalArcCurve;
        case 'Z':
        case 'z':
            return types_1.PathCommand.closePath;
        default:
            throw Error('Instruction not recognised');
    }
};
exports.getPathInstruction = getPathInstruction;
//# sourceMappingURL=instructions.js.map
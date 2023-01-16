import { IPathConfig, PathCommand } from './types';

export const transformToInstructionConfig = (
  instruction: PathCommand,
  remaining: string[]
): IPathConfig[] => {
  switch (instruction) {
    case PathCommand.ellipticalArcCurve: {
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
    case PathCommand.horizontalLineTo: {
      const [value] = remaining;
      return [{ value, isHorizontal: true }];
    }
    case PathCommand.verticalLineTo: {
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

export const getPathInstruction = (instruction: string): PathCommand => {
  switch (instruction) {
    case 'M':
    case 'm':
      return PathCommand.moveTo;
    case 'L':
    case 'l':
      return PathCommand.lineTo;
    case 'H':
    case 'h':
      return PathCommand.horizontalLineTo;
    case 'V':
    case 'v':
      return PathCommand.verticalLineTo;
    case 'C':
    case 'c':
      return PathCommand.cubicBezierCurve;
    case 'S':
    case 's':
      return PathCommand.smoothCubicBezierCurve;
    case 'Q':
    case 'q':
      return PathCommand.quadraticBezierCurve;
    case 'T':
    case 't':
      return PathCommand.smoothQuadraticBezierCurve;
    case 'A':
    case 'a':
      return PathCommand.ellipticalArcCurve;
    case 'Z':
    case 'z':
      return PathCommand.closePath;
    default:
      throw Error('Instruction not recognised');
  }
};

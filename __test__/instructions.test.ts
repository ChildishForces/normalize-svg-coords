import { getPathInstruction, transformToInstructionConfig } from '../src/instructions';
import { PathCommand } from '../src/types';

describe('transformToInstructionConfig', () => {
  it('should correctly transform elliptical arc curve instruction', () => {
    const instruction = PathCommand.ellipticalArcCurve;
    const remaining = ['10', '20', '30', '1', '0', '40', '50'];
    const config = transformToInstructionConfig(instruction, remaining);
    expect(config).toEqual([
      { value: '10', isHorizontal: true },
      { value: '20' },
      { value: '30', skip: true },
      { value: '1', skip: true },
      { value: '0', skip: true },
      { value: '40', isHorizontal: true },
      { value: '50' },
    ]);
  });

  it('should correctly transform horizontal line to instruction', () => {
    const instruction = PathCommand.horizontalLineTo;
    const remaining = ['30'];
    const config = transformToInstructionConfig(instruction, remaining);
    expect(config).toEqual([{ value: '30', isHorizontal: true }]);
  });

  it('should correctly transform vertical line to instruction', () => {
    const instruction = PathCommand.verticalLineTo;
    const remaining = ['40'];
    const config = transformToInstructionConfig(instruction, remaining);
    expect(config).toEqual([{ value: '40' }]);
  });

  it('should correctly transform other instruction types', () => {
    const instruction = PathCommand.cubicBezierCurve;
    const remaining = ['10', '20', '30', '40', '50', '60'];
    const config = transformToInstructionConfig(instruction, remaining);
    expect(config).toEqual([
      { value: '10', isHorizontal: true },
      { value: '20', isHorizontal: false },
      { value: '30', isHorizontal: true },
      { value: '40', isHorizontal: false },
      { value: '50', isHorizontal: true },
      { value: '60', isHorizontal: false },
    ]);
  });
});

describe('getPathInstruction', () => {
  test('returns the correct PathCommand for the given instruction', () => {
    expect(getPathInstruction('M')).toBe(PathCommand.moveTo);
    expect(getPathInstruction('m')).toBe(PathCommand.moveTo);
    expect(getPathInstruction('L')).toBe(PathCommand.lineTo);
    expect(getPathInstruction('l')).toBe(PathCommand.lineTo);
    expect(getPathInstruction('H')).toBe(PathCommand.horizontalLineTo);
    expect(getPathInstruction('h')).toBe(PathCommand.horizontalLineTo);
    expect(getPathInstruction('V')).toBe(PathCommand.verticalLineTo);
    expect(getPathInstruction('v')).toBe(PathCommand.verticalLineTo);
    expect(getPathInstruction('C')).toBe(PathCommand.cubicBezierCurve);
    expect(getPathInstruction('c')).toBe(PathCommand.cubicBezierCurve);
    expect(getPathInstruction('S')).toBe(PathCommand.smoothCubicBezierCurve);
    expect(getPathInstruction('s')).toBe(PathCommand.smoothCubicBezierCurve);
    expect(getPathInstruction('Q')).toBe(PathCommand.quadraticBezierCurve);
    expect(getPathInstruction('q')).toBe(PathCommand.quadraticBezierCurve);
    expect(getPathInstruction('T')).toBe(PathCommand.smoothQuadraticBezierCurve);
    expect(getPathInstruction('t')).toBe(PathCommand.smoothQuadraticBezierCurve);
    expect(getPathInstruction('A')).toBe(PathCommand.ellipticalArcCurve);
    expect(getPathInstruction('a')).toBe(PathCommand.ellipticalArcCurve);
    expect(getPathInstruction('Z')).toBe(PathCommand.closePath);
    expect(getPathInstruction('z')).toBe(PathCommand.closePath);
  });

  test('throws an error for an unrecognized instruction', () => {
    expect(() => getPathInstruction('X')).toThrowError('Instruction not recognised');
  });
});

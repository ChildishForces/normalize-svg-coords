import { areBoundsIdentical, createInterpolators, interpolate } from '../src/plotting';
import { RangeTuple, ViewBoxTuple } from '../src/types';

describe('areBoundsIdentical', () => {
  test('returns true for identical bounds', () => {
    const bounds: ViewBoxTuple = [1, 1, 1, 1];
    expect(areBoundsIdentical(bounds)).toBe(true);
  });

  test('returns false for non-identical bounds', () => {
    const bounds: ViewBoxTuple = [1, 2, 3, 4];
    expect(areBoundsIdentical(bounds)).toBe(false);
  });
});

describe('interpolate', () => {
  test('interpolates a value within the input range', () => {
    const inputRange: RangeTuple = [0, 10];
    const outputRange: RangeTuple = [100, 200];
    const interpolator = interpolate(inputRange, outputRange);
    expect(interpolator(5)).toBe(150);
  });

  test('interpolates a value outside of the input range', () => {
    const inputRange: RangeTuple = [0, 10];
    const outputRange: RangeTuple = [100, 200];
    const interpolator = interpolate(inputRange, outputRange);
    expect(interpolator(-5)).toBe(50);
  });
});

describe('createInterpolators', () => {
  test('creates correct interpolators when maintainAspectRatio is true', () => {
    const min = 0;
    const max = 10;
    const bounds: ViewBoxTuple = [1, 2, 3, 4];
    const interpolators = createInterpolators(min, max, bounds, true);

    expect(interpolators.interpolateX(1)).toBe(-5);
    expect(interpolators.interpolateX(3)).toBe(5);
    expect(interpolators.interpolateY(2)).toBe(0);
    expect(interpolators.interpolateY(4)).toBe(10);
  });

  test('creates correct interpolators when maintainAspectRatio is false', () => {
    const min = 0;
    const max = 10;
    const bounds: ViewBoxTuple = [1, 2, 3, 4];
    const interpolators = createInterpolators(min, max, bounds, false);

    expect(interpolators.interpolateX(1)).toBe(0);
    expect(interpolators.interpolateX(3)).toBe(10);
    expect(interpolators.interpolateY(2)).toBe(0);
    expect(interpolators.interpolateY(4)).toBe(10);
  });
});

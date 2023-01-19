import { Dimension, ViewBoxTuple } from '../src/types';
import {
  extractViewBox,
  getLargestDimension,
  getViewBoxTuple,
  isViewBoxTuple,
  roundToDecimalPlace,
} from '../src/utils';

describe('extractViewBox', () => {
  test('extracts values from viewBox string with commas', () => {
    const viewBoxStr = '1, 2, 3, 4';
    expect(extractViewBox(viewBoxStr)).toEqual([1, 2, 3, 4]);
  });

  test('extracts values from viewBox string with spaces', () => {
    const viewBoxStr = '1 2 3 4';
    expect(extractViewBox(viewBoxStr)).toEqual([1, 2, 3, 4]);
  });

  test('throws error for invalid viewBox string', () => {
    const viewBoxStr = '1, 2, 3';
    expect(() => extractViewBox(viewBoxStr)).toThrow();
  });
});

describe('isViewBoxTuple', () => {
  test('returns true for valid ViewBoxTuple', () => {
    const viewBox: ViewBoxTuple = [1, 2, 3, 4];
    expect(isViewBoxTuple(viewBox)).toBe(true);
  });

  test('returns false for invalid ViewBoxTuple', () => {
    const viewBox = [1, 2, 3];
    expect(isViewBoxTuple(viewBox)).toBe(false);
  });
});

describe('getLargestDimension', () => {
  test('returns horizontal for larger x range', () => {
    const bounds: ViewBoxTuple = [1, 2, 3, 2];
    expect(getLargestDimension(bounds)).toBe(Dimension.horizontal);
  });

  test('returns vertical for larger y range', () => {
    const bounds: ViewBoxTuple = [1, 2, 1, 4];
    expect(getLargestDimension(bounds)).toBe(Dimension.vertical);
  });
});

describe('getViewBoxTuple', () => {
  test('returns ViewBoxTuple from string', () => {
    const path = '';
    const viewBox = '1 2 3 4';
    expect(getViewBoxTuple(path, viewBox)).toEqual([1, 2, 3, 4]);
  });

  test('returns ViewBoxTuple from object', () => {
    const path = '';
    const viewBox = { xmin: 1, ymin: 2, xmax: 3, ymax: 4 };
    expect(getViewBoxTuple(path, viewBox)).toEqual([1, 2, 3, 4]);
  });

  test('returns ViewBoxTuple from undefined', () => {
    const path = '';
    expect(getViewBoxTuple(path)).toEqual([Infinity, Infinity, -Infinity, -Infinity]);
  });

  test('throws error for unknown viewBox format', () => {
    const path = '';
    const viewBox = 123;
    expect(() => getViewBoxTuple(path, viewBox as any)).toThrow();
  });
});

describe('roundToDecimalPlace', () => {
  it('should round a value to the provided number of decimal places', () => {
    expect(roundToDecimalPlace(1.23456, 2)).toEqual(1.23);
    expect(roundToDecimalPlace(1.23456, 3)).toEqual(1.235);
    expect(roundToDecimalPlace(1.23456, 4)).toEqual(1.2346);
  });
});

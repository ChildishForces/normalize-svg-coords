import normalize from '../src';

describe('normalize', () => {
  it('should normalize an SVG path to between a specified min and max', () => {
    const viewBox = '0 0 100 100';
    const path = 'M 10 20 L 30 40 L 50 60';
    const min = 0;
    const max = 1;
    const precision = 4;
    const asList = true;
    const maintainAspectRatio = true;
    const config = { viewBox, path, min, max, precision, asList, maintainAspectRatio };
    const expected = [
      ['M', '0.1', '0.2'],
      ['L', '0.3', '0.4'],
      ['L', '0.5', '0.6'],
    ];
    expect(normalize(config)).toEqual(expected);
  });
  it('should throws an error on invalid parameters', () => {
    const viewBox = '0 0 100 100';
    const path = 'M 10 20 L 30 40 L 50 60';
    const min = 0;
    const max = 1;
    const precision = 4;
    const asList = true;
    const maintainAspectRatio = true;
    const config = { viewBox, path, min, max, precision, asList, maintainAspectRatio };
    expect(() => normalize(config)).not.toThrow();
    config.path = 'invalid path';
    expect(() => normalize(config)).toThrow();
  });
});

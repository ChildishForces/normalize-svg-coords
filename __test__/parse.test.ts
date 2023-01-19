import parse from '../src/parse';

describe('parse', () => {
  it('should parse an SVG path data string', () => {
    const path = 'M10 10 L20 20 Q30 30 40 40';
    const expected = [
      ['M', 10, 10],
      ['L', 20, 20],
      ['Q', 30, 30, 40, 40],
    ];
    expect(parse(path)).toEqual(expected);
  });

  it('should handle overloaded moveTo commands', () => {
    const path = 'M10 10 20 30 Q40 50 60 70';
    const expected = [
      ['M', 10, 10],
      ['L', 20, 30],
      ['Q', 40, 50, 60, 70],
    ];
    expect(parse(path)).toEqual(expected);
  });

  it('should throw an error for malformed path data', () => {
    const path = 'M';
    expect(() => parse(path)).toThrowError('Malformed path data');
  });
});

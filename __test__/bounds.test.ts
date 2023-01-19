import getBoundingBox from '../src/bounds';

describe('getBoundingBox', () => {
  it('should return the correct bounding box for a simple path', () => {
    const path = 'M10 10 L20 10 L20 20 L10 20 Z';
    const boundingBox = getBoundingBox(path);
    expect(boundingBox).toEqual({ minX: 10, minY: 10, maxX: 20, maxY: 20 });
  });

  it('should return the correct bounding box for a path with curves', () => {
    const path =
      'M10 10 C20 10 30 20 40 20 S50 30 60 40 Q70 50 80 60 T90 70 100 80 A5 5 0 1 1 110 90';
    const boundingBox = getBoundingBox(path);
    expect(boundingBox).toEqual({ minX: 10, minY: 10, maxX: 115, maxY: 95 });
  });

  it('should return the correct bounding box for a path with negative coordinates', () => {
    const path = 'M-10 -10 L-20 -10 L-20 -20 L-10 -20 Z';
    const boundingBox = getBoundingBox(path);
    expect(boundingBox).toEqual({ minX: -20, minY: -20, maxX: -10, maxY: -10 });
  });
});

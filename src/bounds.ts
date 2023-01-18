import parse from './parse';

interface BoundingBox {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
}

const getBoundingBox = (path: string): BoundingBox => {
  const instructions = parse(path);

  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  for (let i = 0; i < instructions.length; i += 1) {
    const instruction = instructions[i];
    const [type] = instruction;
    const values = instruction.slice(1).map(Number);

    switch (type) {
      case 'M':
      case 'L': {
        minX = Math.min(minX, values[0]);
        minY = Math.min(minY, values[1]);
        maxX = Math.max(maxX, values[0]);
        maxY = Math.max(maxY, values[1]);
        break;
      }
      case 'H': {
        minX = Math.min(minX, values[0]);
        maxX = Math.max(maxX, values[0]);
        break;
      }
      case 'V': {
        minY = Math.min(minY, values[0]);
        maxY = Math.max(maxY, values[0]);
        break;
      }
      case 'C':
      case 'S':
      case 'Q':
      case 'T': {
        for (let j = 0; j < values.length; j += 2) {
          minX = Math.min(minX, values[j]);
          minY = Math.min(minY, values[j + 1]);
          maxX = Math.max(maxX, values[j]);
          maxY = Math.max(maxY, values[j + 1]);
        }
        break;
      }

      case 'A': {
        const x = values[5];
        const y = values[6];
        minX = Math.min(minX, x - values[0]);
        minY = Math.min(minY, y - values[1]);
        maxX = Math.max(maxX, x + values[0]);
        maxY = Math.max(maxY, y + values[1]);
      }
    }
  }

  return {
    minX,
    minY,
    maxX,
    maxY,
  };
};

export default getBoundingBox;

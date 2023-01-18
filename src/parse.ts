/**
 * expected argument lengths
 * @type {Record<string, number>>}
 */
const LENGTH_MAP = {
  a: 7,
  c: 6,
  h: 1,
  l: 2,
  m: 2,
  q: 4,
  s: 4,
  t: 2,
  v: 1,
  z: 0,
};

/**
 * Path segment instruction matching pattern
 * @type {RegExp}
 */
const SEGMENT_REGEX = /([astvzqmhlc])([^astvzqmhlc]*)/gi;

/**
 * Path segment number matching pattern
 * @type {RegExp}
 */
const NUMBER_REGEX = /-?[0-9]*\.?[0-9]+(?:e[-+]?\d+)?/gi;

/**
 * Pattern to find two numbers separated by only a hyphen
 * @type {RegExp}
 */
const TERMINATING_HYPHEN_REGEX = /(\d*)-(\d*)/g;

/**
 * Matches numbers in an instruction set and casts to number
 * @param args
 */
const parseValues = (args: string): number[] => {
  const numbers = args.match(NUMBER_REGEX);
  return numbers ? numbers.map(Number) : [];
};

/**
 * Parse an SVG path data string. Generates an Array
 * of commands where each command is an Array of the
 * form `[command, arg1, arg2, ...]`
 *
 * @param {String} path
 * @return {Array}
 */
const parse = (path: string): Array<Array<string | number>> => {
  const data: Array<Array<string | number>> = [];
  const fixedWhitespace = path.replace(TERMINATING_HYPHEN_REGEX, '$1 -$2');
  const matches = [...fixedWhitespace.matchAll(SEGMENT_REGEX)];

  for (const match of matches) {
    let [command] = match.slice(1);
    const [args] = match.slice(2);
    let type = command.toLowerCase();
    const parsedArgs: Array<string | number> = parseValues(args);

    // overloaded moveTo
    if (type === 'm' && parsedArgs.length > 2) {
      data.push([command, ...parsedArgs.splice(0, 2)]);
      type = 'l';
      command = command === 'm' ? 'l' : 'L';
    }

    if (parsedArgs.length === LENGTH_MAP[type]) {
      data.push([command, ...parsedArgs]);
      continue;
    }

    if (args.length < LENGTH_MAP[type]) throw new Error('Malformed path data');
    data.push([command, ...parsedArgs.slice(0, LENGTH_MAP[type])]);
  }

  return data;
};

export default parse;

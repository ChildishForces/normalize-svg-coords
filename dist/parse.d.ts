/**
 * Parse an SVG path data string. Generates an Array
 * of commands where each command is an Array of the
 * form `[command, arg1, arg2, ...]`
 *
 * @param {String} path
 * @return {Array}
 */
declare const parse: (path: string) => Array<Array<string | number>>;
export default parse;

'use strict'

const parse = require('parse-svg-path')

// Taken from the SVG specification: https://www.w3.org/TR/SVG/paths.html
// Uppercase instructions refer to absolute coordinates whilst lowercase
// instructions use coordinates relative to the last instruction.
const INSTRUCTIONS = [
  'M', 'm',
  'L', 'l',
  'H', 'h',
  'V', 'v',
  'C', 'c',
  'S', 's',
  'Q', 'q',
  'T', 't',
  'A', 'a',
  'Z', 'z'
]

// The viewBox string may be specified using spaces or commas as delimiters.
// The order is: xmin, ymin, xmax, ymax
const extractViewBox = function(viewBoxStr) {
  const parts = viewBoxStr.split(/\s*,\s*/)
  return [
    parseFloat(parts[0]),
    parseFloat(parts[1]),
    parseFloat(parts[2]),
    parseFloat(parts[3])
  ]
}

// Normalize an SVG path to between a specified min and max.
// Throws an error on invalid parameters.
const normalize = function({viewBox, path, min = 0, max = 1, precision = 4}) {
  let rect
  switch (typeof viewBox) {
    case 'string':
      rect = extractViewBox(viewBox)
      break

    case 'object':
      rect = viewBox
      if (!Array.isArray(rect)) {
        rect = [rect.xmin, rect.ymin, rect.xmax, rect.ymax]
      }
      break

    case 'undefined':
      throw Error('No viewBox specified')
      break

    default:
      throw Error('Unknown viewBox format')
      break
  }

  return parse(path).map(feature => {
    const instruction = feature[0];
    if (INSTRUCTIONS.indexOf(instruction) === -1) {
      throw Error(`Unknown instruction ${instruction} in path`)
    }

    const remaining = feature.slice(1);
    if (remaining.length % 2 !== 0) {
      throw Error(`Path does not contain an even number of coordinates`)
    }

    // Normalize the values of each coordinate. X coordinates are at even
    // positions whilst y coordinates are at odd.
    const coords = remaining.map((item, i) => {
      const float = parseFloat(item)
      if (isNaN(float)) {
        throw Error(`Invalid coordinate ${item} in path`)
      }

      const even = i % 2 === 0
      const max = even ? rect[2] : rect[3]
      const min = even ? rect[0] : rect[1]
      return ((float - min) / (max - min)).toFixed(precision)
    })

    return instruction + coords.join(' ')
  }).join('')
}

module.exports = normalize;

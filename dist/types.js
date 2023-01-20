"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dimension = exports.PathCommand = exports.Boundary = void 0;
var Boundary;
(function (Boundary) {
    Boundary[Boundary["xMin"] = 0] = "xMin";
    Boundary[Boundary["yMin"] = 1] = "yMin";
    Boundary[Boundary["xMax"] = 2] = "xMax";
    Boundary[Boundary["yMax"] = 3] = "yMax";
})(Boundary = exports.Boundary || (exports.Boundary = {}));
var PathCommand;
(function (PathCommand) {
    PathCommand[PathCommand["moveTo"] = 0] = "moveTo";
    PathCommand[PathCommand["lineTo"] = 1] = "lineTo";
    PathCommand[PathCommand["horizontalLineTo"] = 2] = "horizontalLineTo";
    PathCommand[PathCommand["verticalLineTo"] = 3] = "verticalLineTo";
    PathCommand[PathCommand["cubicBezierCurve"] = 4] = "cubicBezierCurve";
    PathCommand[PathCommand["smoothCubicBezierCurve"] = 5] = "smoothCubicBezierCurve";
    PathCommand[PathCommand["quadraticBezierCurve"] = 6] = "quadraticBezierCurve";
    PathCommand[PathCommand["smoothQuadraticBezierCurve"] = 7] = "smoothQuadraticBezierCurve";
    PathCommand[PathCommand["ellipticalArcCurve"] = 8] = "ellipticalArcCurve";
    PathCommand[PathCommand["closePath"] = 9] = "closePath";
})(PathCommand = exports.PathCommand || (exports.PathCommand = {}));
var Dimension;
(function (Dimension) {
    Dimension[Dimension["vertical"] = 0] = "vertical";
    Dimension[Dimension["horizontal"] = 1] = "horizontal";
})(Dimension = exports.Dimension || (exports.Dimension = {}));
//# sourceMappingURL=types.js.map
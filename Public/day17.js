"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var file_manager_1 = require("./Utils/file_manager");
var input = file_manager_1.file_manager.get_input_from_file(__filename);
var WIDTH = 7;
// Rock shapes (relative coordinates)
var SHAPES = [
    // -
    [
        [0, 0],
        [1, 0],
        [2, 0],
        [3, 0],
    ],
    // +
    [
        [1, 0],
        [0, 1],
        [1, 1],
        [2, 1],
        [1, 2],
    ],
    // L (reverse L)
    [
        [0, 0],
        [1, 0],
        [2, 0],
        [2, 1],
        [2, 2],
    ],
    // |
    [
        [0, 0],
        [0, 1],
        [0, 2],
        [0, 3],
    ],
    // square
    [
        [0, 0],
        [1, 0],
        [0, 1],
        [1, 1],
    ],
];
function solve(input) {
    var jets = input.trim().split("");
    var jetIndex = 0;
    var occupied = new Set();
    var top = -1;
    var key = function (x, y) { return "".concat(x, ",").concat(y); };
    var collides = function (shape, dx, dy) {
        return shape.some(function (_a) {
            var x = _a[0], y = _a[1];
            var nx = x + dx;
            var ny = y + dy;
            if (nx < 0 || nx >= WIDTH || ny < 0)
                return true;
            return occupied.has(key(nx, ny));
        });
    };
    var place = function (shape, dx, dy) {
        for (var _i = 0, shape_1 = shape; _i < shape_1.length; _i++) {
            var _a = shape_1[_i], x = _a[0], y = _a[1];
            occupied.add(key(x + dx, y + dy));
            top = Math.max(top, y + dy);
        }
    };
    for (var i = 0; i < 2022; i++) {
        var shape = SHAPES[i % SHAPES.length];
        var x = 2;
        var y = top + 4;
        while (true) {
            // jet push
            var jet = jets[jetIndex++ % jets.length];
            var dx = jet === "<" ? -1 : 1;
            if (!collides(shape, x + dx, y)) {
                x += dx;
            }
            // fall
            if (!collides(shape, x, y - 1)) {
                y--;
            }
            else {
                place(shape, x, y);
                break;
            }
        }
    }
    return top + 1;
}
// Example usage:
console.log(solve(input));
//# sourceMappingURL=day17.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var file_manager_1 = require("./Utils/file_manager");
var input = file_manager_1.file_manager.get_input_from_file(__filename);
var dirs = [
    [1, 0, 0],
    [-1, 0, 0],
    [0, 1, 0],
    [0, -1, 0],
    [0, 0, 1],
    [0, 0, -1],
];
function key(x, y, z) {
    return "".concat(x, ",").concat(y, ",").concat(z);
}
function solve(input) {
    var cubes = new Set();
    var list = [];
    for (var _i = 0, _a = input.trim().split("\n"); _i < _a.length; _i++) {
        var line = _a[_i];
        var _b = line.split(",").map(Number), x = _b[0], y = _b[1], z = _b[2];
        cubes.add(key(x, y, z));
        list.push([x, y, z]);
    }
    var surface = 0;
    for (var _c = 0, list_1 = list; _c < list_1.length; _c++) {
        var _d = list_1[_c], x = _d[0], y = _d[1], z = _d[2];
        var exposed = 6;
        for (var _e = 0, dirs_1 = dirs; _e < dirs_1.length; _e++) {
            var _f = dirs_1[_e], dx = _f[0], dy = _f[1], dz = _f[2];
            var nx = x + dx;
            var ny = y + dy;
            var nz = z + dz;
            if (cubes.has(key(nx, ny, nz))) {
                exposed--;
            }
        }
        surface += exposed;
    }
    return surface;
}
// usage:
console.log(solve(input));
//# sourceMappingURL=day18.js.map
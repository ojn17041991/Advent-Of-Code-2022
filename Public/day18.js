"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const file_manager_1 = require("./Utils/file_manager");
let input = file_manager_1.file_manager.get_input_from_file(__filename);
const dirs = [
    [1, 0, 0],
    [-1, 0, 0],
    [0, 1, 0],
    [0, -1, 0],
    [0, 0, 1],
    [0, 0, -1],
];
function key(x, y, z) {
    return `${x},${y},${z}`;
}
function solve(input) {
    const cubes = new Set();
    const list = [];
    for (const line of input.trim().split("\n")) {
        const [x, y, z] = line.split(",").map(Number);
        cubes.add(key(x, y, z));
        list.push([x, y, z]);
    }
    let surface = 0;
    for (const [x, y, z] of list) {
        let exposed = 6;
        for (const [dx, dy, dz] of dirs) {
            const nx = x + dx;
            const ny = y + dy;
            const nz = z + dz;
            if (cubes.has(key(nx, ny, nz))) {
                exposed--;
            }
        }
        surface += exposed;
    }
    return surface;
}
console.log(solve(input));
//# sourceMappingURL=day18.js.map
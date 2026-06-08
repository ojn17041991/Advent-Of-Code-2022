"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const file_manager_1 = require("./Utils/file_manager");
let input = file_manager_1.file_manager.get_input_from_file(__filename);
const WIDTH = 7;
// Rock shapes (relative coordinates)
const SHAPES = [
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
    const jets = input.trim().split("");
    let jetIndex = 0;
    const occupied = new Set();
    let top = -1;
    const key = (x, y) => `${x},${y}`;
    const collides = (shape, dx, dy) => {
        return shape.some(([x, y]) => {
            const nx = x + dx;
            const ny = y + dy;
            if (nx < 0 || nx >= WIDTH || ny < 0)
                return true;
            return occupied.has(key(nx, ny));
        });
    };
    const place = (shape, dx, dy) => {
        for (const [x, y] of shape) {
            occupied.add(key(x + dx, y + dy));
            top = Math.max(top, y + dy);
        }
    };
    for (let i = 0; i < 2022; i++) {
        const shape = SHAPES[i % SHAPES.length];
        let x = 2;
        let y = top + 4;
        while (true) {
            // jet push
            const jet = jets[jetIndex++ % jets.length];
            const dx = jet === "<" ? -1 : 1;
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
console.log(solve(input));
//# sourceMappingURL=day17.js.map
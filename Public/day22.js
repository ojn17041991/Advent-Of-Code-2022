"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var file_manager_1 = require("./Utils/file_manager");
var input = file_manager_1.file_manager.get_input_from_file(__filename);
function solve(input) {
    var parts = input.split(/\r?\n\r?\n/);
    var mapLines = parts[0].split(/\r?\n/);
    var instructions = parts[1].trim();
    var width = Math.max.apply(null, mapLines.map(function (x) { return x.length; }));
    var grid = mapLines.map(function (line) { return line.padEnd(width, " ").split(""); });
    var row = 0;
    var col = grid[0].indexOf(".");
    // 0=right,1=down,2=left,3=up
    var facing = 0;
    var dirs = [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0],
    ];
    var tokens = instructions.match(/\d+|[LR]/g) || [];
    for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
        var token = tokens_1[_i];
        if (token === "L") {
            facing = (facing + 3) % 4;
            continue;
        }
        if (token === "R") {
            facing = (facing + 1) % 4;
            continue;
        }
        var steps = Number(token);
        for (var step = 0; step < steps; step++) {
            var nextRow = row + dirs[facing][0];
            var nextCol = col + dirs[facing][1];
            if (nextRow < 0 ||
                nextRow >= grid.length ||
                nextCol < 0 ||
                nextCol >= width ||
                grid[nextRow][nextCol] === " ") {
                if (facing === 0) {
                    nextCol = 0;
                    while (grid[row][nextCol] === " ") {
                        nextCol++;
                    }
                    nextRow = row;
                }
                else if (facing === 2) {
                    nextCol = width - 1;
                    while (grid[row][nextCol] === " ") {
                        nextCol--;
                    }
                    nextRow = row;
                }
                else if (facing === 1) {
                    nextRow = 0;
                    while (nextRow < grid.length && grid[nextRow][col] === " ") {
                        nextRow++;
                    }
                    nextCol = col;
                }
                else {
                    nextRow = grid.length - 1;
                    while (nextRow >= 0 && grid[nextRow][col] === " ") {
                        nextRow--;
                    }
                    nextCol = col;
                }
            }
            if (grid[nextRow][nextCol] === "#") {
                break;
            }
            row = nextRow;
            col = nextCol;
        }
    }
    return 1000 * (row + 1) + 4 * (col + 1) + facing;
}
console.log(solve(input));
//# sourceMappingURL=day22.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var file_manager_1 = require("./Utils/file_manager");
var input = file_manager_1.file_manager.get_input_from_file(__filename);
function solve(input) {
    var grid = input.trim().split(/\r?\n/);
    var height = grid.length;
    var width = grid[0].length;
    var start = {
        x: grid[0].indexOf("."),
        y: 0,
    };
    var end = {
        x: grid[height - 1].indexOf("."),
        y: height - 1,
    };
    var blizzards = [];
    for (var y = 0; y < height; y++) {
        for (var x = 0; x < width; x++) {
            var c = grid[y][x];
            if ("<>^v".includes(c)) {
                blizzards.push({
                    x: x,
                    y: y,
                    dir: c,
                });
            }
        }
    }
    var cache = new Map();
    function isBlocked(x, y, time) {
        var key = "".concat(x, ",").concat(y, ",").concat(time);
        if (cache.has(key)) {
            return cache.get(key);
        }
        var innerWidth = width - 2;
        var innerHeight = height - 2;
        for (var _i = 0, blizzards_1 = blizzards; _i < blizzards_1.length; _i++) {
            var b = blizzards_1[_i];
            var bx = b.x;
            var by = b.y;
            if (b.dir === ">") {
                bx = 1 + ((b.x - 1 + time) % innerWidth);
            }
            if (b.dir === "<") {
                bx = 1 + ((((b.x - 1 - time) % innerWidth) + innerWidth) % innerWidth);
            }
            if (b.dir === "v") {
                by = 1 + ((b.y - 1 + time) % innerHeight);
            }
            if (b.dir === "^") {
                by =
                    1 + ((((b.y - 1 - time) % innerHeight) + innerHeight) % innerHeight);
            }
            if (bx === x && by === y) {
                cache.set(key, true);
                return true;
            }
        }
        cache.set(key, false);
        return false;
    }
    var queue = [
        {
            x: start.x,
            y: start.y,
            time: 0,
        },
    ];
    var visited = new Set();
    var moves = [
        [0, 0], // wait
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
    ];
    while (queue.length > 0) {
        var current = queue.shift();
        if (current.x === end.x && current.y === end.y) {
            return current.time;
        }
        var nextTime = current.time + 1;
        for (var _i = 0, moves_1 = moves; _i < moves_1.length; _i++) {
            var move = moves_1[_i];
            var nx = current.x + move[0];
            var ny = current.y + move[1];
            var inside = nx > 0 && nx < width - 1 && ny > 0 && ny < height - 1;
            var valid = inside ||
                (nx === start.x && ny === start.y) ||
                (nx === end.x && ny === end.y);
            if (!valid) {
                continue;
            }
            if (isBlocked(nx, ny, nextTime)) {
                continue;
            }
            var stateKey = "".concat(nx, ",").concat(ny, ",").concat(nextTime % 1000);
            if (visited.has(stateKey)) {
                continue;
            }
            visited.add(stateKey);
            queue.push({
                x: nx,
                y: ny,
                time: nextTime,
            });
        }
    }
    throw new Error("No path found");
}
console.log(solve(input));
//# sourceMappingURL=day24.js.map
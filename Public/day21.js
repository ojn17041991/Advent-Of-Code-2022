"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var file_manager_1 = require("./Utils/file_manager");
var input = file_manager_1.file_manager.get_input_from_file(__filename);
function solve(input) {
    var monkeys = new Map();
    var lines = input.trim().split(/\r?\n/);
    for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
        var rawLine = lines_1[_i];
        var line = rawLine.trim();
        if (!line) {
            continue;
        }
        var parts = line.split(":");
        var name_1 = parts[0].trim();
        var expr = parts[1].trim();
        if (/^\d+$/.test(expr)) {
            monkeys.set(name_1, {
                type: "number",
                value: Number(expr),
            });
        }
        else {
            var tokens = expr.split(" ");
            monkeys.set(name_1, {
                type: "operation",
                left: tokens[0],
                op: tokens[1],
                right: tokens[2],
            });
        }
    }
    var cache = new Map();
    function evaluate(name) {
        var cached = cache.get(name);
        if (cached !== undefined) {
            return cached;
        }
        var job = monkeys.get(name);
        if (!job) {
            throw new Error("Monkey not found: " + name);
        }
        var result;
        if (job.type === "number") {
            result = job.value;
        }
        else {
            var left = evaluate(job.left);
            var right = evaluate(job.right);
            switch (job.op) {
                case "+":
                    result = left + right;
                    break;
                case "-":
                    result = left - right;
                    break;
                case "*":
                    result = left * right;
                    break;
                case "/":
                    result = left / right;
                    break;
                default:
                    throw new Error("Unknown operator: " + job.op);
            }
        }
        cache.set(name, result);
        return result;
    }
    return evaluate("root");
}
console.log(solve(input));
//# sourceMappingURL=day21.js.map
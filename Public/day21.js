"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const file_manager_1 = require("./Utils/file_manager");
let input = file_manager_1.file_manager.get_input_from_file(__filename);
function solve(input) {
    const monkeys = new Map();
    const lines = input.trim().split(/\r?\n/);
    for (const rawLine of lines) {
        const line = rawLine.trim();
        if (!line) {
            continue;
        }
        const parts = line.split(":");
        const name = parts[0].trim();
        const expr = parts[1].trim();
        if (/^\d+$/.test(expr)) {
            monkeys.set(name, {
                type: "number",
                value: Number(expr),
            });
        }
        else {
            const tokens = expr.split(" ");
            monkeys.set(name, {
                type: "operation",
                left: tokens[0],
                op: tokens[1],
                right: tokens[2],
            });
        }
    }
    const cache = new Map();
    function evaluate(name) {
        const cached = cache.get(name);
        if (cached !== undefined) {
            return cached;
        }
        const job = monkeys.get(name);
        if (!job) {
            throw new Error("Monkey not found: " + name);
        }
        let result;
        if (job.type === "number") {
            result = job.value;
        }
        else {
            const left = evaluate(job.left);
            const right = evaluate(job.right);
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
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const file_manager_1 = require("./Utils/file_manager");
let input = file_manager_1.file_manager.get_input_from_file(__filename);
function solve(input) {
    const original = input
        .trim()
        .split("\n")
        .map((line, index) => ({
        id: index,
        value: Number(line),
    }));
    const mixed = original.slice();
    for (const item of original) {
        const currentIndex = mixed.findIndex((x) => x.id === item.id);
        mixed.splice(currentIndex, 1);
        const length = mixed.length;
        let newIndex = (currentIndex + item.value) % length;
        if (newIndex < 0) {
            newIndex += length;
        }
        mixed.splice(newIndex, 0, item);
    }
    const zeroIndex = mixed.findIndex((x) => x.value === 0);
    const a = mixed[(zeroIndex + 1000) % mixed.length].value;
    const b = mixed[(zeroIndex + 2000) % mixed.length].value;
    const c = mixed[(zeroIndex + 3000) % mixed.length].value;
    return a + b + c;
}
console.log(solve(input));
//# sourceMappingURL=day20.js.map
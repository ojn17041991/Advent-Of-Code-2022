"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var file_manager_1 = require("./Utils/file_manager");
var input = file_manager_1.file_manager.get_input_from_file(__filename);
function solve(input) {
    var original = input
        .trim()
        .split("\n")
        .map(function (line, index) { return ({
        id: index,
        value: Number(line),
    }); });
    var mixed = original.slice();
    var _loop_1 = function (item) {
        var currentIndex = mixed.findIndex(function (x) { return x.id === item.id; });
        mixed.splice(currentIndex, 1);
        var length_1 = mixed.length;
        var newIndex = (currentIndex + item.value) % length_1;
        if (newIndex < 0) {
            newIndex += length_1;
        }
        mixed.splice(newIndex, 0, item);
    };
    for (var _i = 0, original_1 = original; _i < original_1.length; _i++) {
        var item = original_1[_i];
        _loop_1(item);
    }
    var zeroIndex = mixed.findIndex(function (x) { return x.value === 0; });
    var a = mixed[(zeroIndex + 1000) % mixed.length].value;
    var b = mixed[(zeroIndex + 2000) % mixed.length].value;
    var c = mixed[(zeroIndex + 3000) % mixed.length].value;
    return a + b + c;
}
// usage:
console.log(solve(input));
//# sourceMappingURL=day20.js.map
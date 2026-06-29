"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var file_manager_1 = require("./Utils/file_manager");
var input = file_manager_1.file_manager.get_input_from_file(__filename);
function solve(input) {
    var numbers = input.trim().split(/\r?\n/).map(fromSnafu);
    var sum = numbers.reduce(function (a, b) { return a + b; }, 0);
    return toSnafu(sum);
}
function fromSnafu(value) {
    var result = 0;
    for (var _i = 0, value_1 = value; _i < value_1.length; _i++) {
        var char = value_1[_i];
        result *= 5;
        switch (char) {
            case "2":
                result += 2;
                break;
            case "1":
                result += 1;
                break;
            case "0":
                result += 0;
                break;
            case "-":
                result -= 1;
                break;
            case "=":
                result -= 2;
                break;
        }
    }
    return result;
}
function toSnafu(value) {
    var result = "";
    while (value > 0) {
        var remainder = value % 5;
        value = Math.floor(value / 5);
        if (remainder <= 2) {
            result = remainder.toString() + result;
        }
        else if (remainder === 3) {
            result = "=" + result;
            value++;
        }
        else if (remainder === 4) {
            result = "-" + result;
            value++;
        }
    }
    return result;
}
console.log(solve(input));
//# sourceMappingURL=day25.js.map
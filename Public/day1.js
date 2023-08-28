"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const file_manager_1 = require("./Utils/file_manager");
const input_converter_1 = require("./Utils/input_converter");
const quick_sort_1 = require("./Utils/quick_sort");
let input = file_manager_1.file_manager.get_input_from_file(__filename);
let input_list = input_converter_1.input_converter.get_calorie_list(input);
let agg_list = [];
for (let i = 0; i < input_list.length; ++i) {
    let agg = 0;
    for (let j = 0; j < input_list[i].length; ++j) {
        agg += input_list[i][j];
    }
    agg_list.push(agg);
}
let sorted_list = quick_sort_1.quick_sort.sort(agg_list, 0, agg_list.length - 1);
// Task 1 output:
console.log(sorted_list[sorted_list.length - 1]);
// Task 2 output:
console.log(sorted_list[sorted_list.length - 1] +
    sorted_list[sorted_list.length - 2] +
    sorted_list[sorted_list.length - 3]);
//# sourceMappingURL=day1.js.map
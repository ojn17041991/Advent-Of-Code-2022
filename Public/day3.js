"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const file_manager_1 = require("./Utils/file_manager");
const input_converter_1 = require("./Utils/input_converter");
const day_specific_helper_1 = require("./Utils/day_specific_helper");
let input = file_manager_1.file_manager.get_input_from_file(__filename);
let input_list_compartments = input_converter_1.input_converter.get_backpack_list_compartments(input);
let input_list_for_groups = input_converter_1.input_converter.get_backpack_list_for_groups(input);
let sum_for_compartments = 0;
let sum_for_groups = 0;
for (let i = 0; i < input_list_compartments.length; ++i) {
    let fc = input_list_compartments[i]["first_compartment"];
    let sc = input_list_compartments[i]["second_compartment"];
    for (let j = 0; j < fc.length; ++j) {
        if (sc.includes(fc[j])) {
            // Get the score from the character code.
            sum_for_compartments += day_specific_helper_1.day_3_helper.get_score_from_char(fc, j);
            break; // Assumed that there is only one matching character.
        }
    }
}
for (let i = 0; i < input_list_for_groups.length; ++i) {
    let block = input_list_for_groups[i];
    for (let k in block[0]) {
        // If the current item exists in all 3 backpacks.
        if (block[1][k] !== undefined && block[2][k] !== undefined) {
            // Add the value to the sum.
            sum_for_groups += day_specific_helper_1.day_3_helper.get_score_from_char(k, 0);
            break;
        }
    }
}
// Task 1 output:
console.log(sum_for_compartments);
// Task 3 output:
console.log(sum_for_groups);
//# sourceMappingURL=day3.js.map
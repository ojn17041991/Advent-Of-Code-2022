"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const file_manager_1 = require("../Utils/file_manager");
const input_converter_1 = require("../Utils/input_converter");
require("../Utils/Prototype/array_prototype");
let input = file_manager_1.file_manager.get_input_from_file(__dirname + '\\input.txt');
let arrangments = input_converter_1.input_converter.get_crate_arrangement_list(input);
let moves = input_converter_1.input_converter.get_crate_move_list(input);
let top_stacks = "";
let solveTask1 = false;
for (let i = 0; i < moves.length; ++i) {
    if (solveTask1) {
        // How many crates do we need to move to execute this request?
        for (let j = 0; j < moves[i]["num"]; ++j) {
            // Pop the top crate from the donor stack.
            // Note the instructions are not 0-based, but our arrays are, so -1.
            let crate = arrangments[moves[i]["from"] - 1].pop();
            // Push the crate onto the recipient stack.
            arrangments[moves[i]["to"] - 1].push(crate);
        }
    }
    else {
        // Pop the top crate from the donor stack.
        // Note the instructions are not 0-based, but our arrays are, so -1.
        let crates = arrangments[moves[i]["from"] - 1].popMulti(moves[i]["num"]);
        // Push the crate onto the recipient stack.
        arrangments[moves[i]["to"] - 1].pushMulti(crates);
    }
}
for (let i = 0; i < arrangments.length; ++i) {
    let arrangement = arrangments[i];
    top_stacks += arrangement[arrangement.length - 1];
}
// Output tasks 1&2 solutions. Change solveTask1 flag to change task output.
console.log(top_stacks);
//# sourceMappingURL=main.js.map
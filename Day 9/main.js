"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const file_manager_1 = require("../Utils/file_manager");
const input_converter_1 = require("../Utils/input_converter");
const day_specific_helper_1 = require("../Utils/day_specific_helper");
let input = file_manager_1.file_manager.get_input_from_file(__dirname + '\\input.txt');
let list = input_converter_1.input_converter.get_key_value_list(input);
const NUM_KNOTS = 10;
let posList = [[0, 0]];
let curN = [];
// Populate the knots.
for (let i = 0; i < NUM_KNOTS; ++i) {
    curN[i] = [0, 0];
}
// Foreach command
for (let i = 0; i < list.length; ++i) {
    // Foreach step
    for (let j = 0; j < list[i][1]; ++j) {
        // Move N[0] step-by-step.
        let stepValue = day_specific_helper_1.day_9_helper.get_step_value(list[i][0]);
        curN[0][0] += stepValue[0];
        curN[0][1] += stepValue[1];
        // Foreach knot
        for (let k = 1; k < curN.length; ++k) {
            // Check if N[n] needs to move.
            if (day_specific_helper_1.day_9_helper.is_within_vicinity(curN[k], curN[k - 1])) {
                break;
            }
            else {
                // Move N[n] to next space.
                if (curN[k][0] != curN[k - 1][0]) {
                    let deltaX = curN[k - 1][0] - curN[k][0];
                    curN[k][0] += (deltaX / Math.abs(deltaX));
                }
                if (curN[k][1] != curN[k - 1][1]) {
                    let deltaY = curN[k - 1][1] - curN[k][1];
                    curN[k][1] += (deltaY / Math.abs(deltaY));
                }
                // N[M] has moved so check if the space has been visited.
                if (k == curN.length - 1) {
                    let spaceVisited = false;
                    for (let l = 0; l < posList.length; ++l) {
                        if (posList[l][0] == curN[k][0] && posList[l][1] == curN[k][1]) {
                            spaceVisited = true;
                            break;
                        }
                    }
                    if (!spaceVisited) {
                        let space = [curN[k][0], curN[k][1]];
                        posList.push(space);
                    }
                }
            }
        }
    }
}
console.log(posList.length);
//# sourceMappingURL=main.js.map
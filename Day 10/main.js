"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const file_manager_1 = require("../Utils/file_manager");
const input_converter_1 = require("../Utils/input_converter");
let input = file_manager_1.file_manager.get_input_from_file(__dirname + '\\input.txt');
let list = input_converter_1.input_converter.get_key_value_list(input);
const noop = "noop";
const addx = "addx";
const addxCycles = 2;
let total = 0;
let curValue = 1;
let queuedInstruction = [0, 0];
let waiting = false;
let cycleNum = 0; // Should be 1 for task 1.
const displayPixelsX = 40;
const displayPixelsY = 6;
let display = [];
for (let i = 0; i < displayPixelsY; ++i) {
    let xDim = [];
    for (let j = 0; j < displayPixelsX; ++j) {
        xDim.push(".");
    }
    display.push(xDim);
}
for (let i = 0; i < list.length;) {
    // Draw first.
    // Task 1 only:
    // if ((cycleNum - 20) % 40 == 0) {
    //     total += curValue * cycleNum;
    // }
    // ++cycleNum;
    // Task 2 only:
    let pixelX = cycleNum % displayPixelsX;
    if (pixelX >= curValue - 1 && pixelX <= curValue + 1) {
        let pixelY = Math.floor(cycleNum / displayPixelsX);
        display[pixelY][pixelX] = "#";
    }
    ++cycleNum;
    // Update second.
    if (waiting) {
        queuedInstruction[1] -= 1;
        if (queuedInstruction[1] == 1) {
            curValue += queuedInstruction[0];
            waiting = false;
            ++i;
        }
    }
    else {
        // New command.
        if (list[i][0] == addx) {
            queuedInstruction = [+list[i][1], addxCycles];
            waiting = true;
        }
        else if (list[i][0] == noop) {
            ++i;
        }
    }
}
console.log(total);
let displayOutput = "";
for (let i = 0; i < displayPixelsY; ++i) {
    let row = "";
    for (let j = 0; j < displayPixelsX; ++j) {
        row += display[i][j];
    }
    displayOutput += row + "\n";
}
console.log(displayOutput);
//# sourceMappingURL=main.js.map
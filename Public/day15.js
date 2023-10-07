"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sensor_instruction_1 = require("./Classes/sensor_instruction");
const vector_1 = require("./Classes/vector");
const file_manager_1 = require("./Utils/file_manager");
const input_converter_1 = require("./Utils/input_converter");
let input = file_manager_1.file_manager.get_input_from_file(__filename);
let instructions = input_converter_1.input_converter.get_sensor_instructions(input);
let intersections = new Set();
let peripheries = [];
let target_y = 2000000;
// Task 1:
// for (let i = 0; i < instructions.length; i++) {
//   let max_num_scanned_positions: number = instructions[i].d * 2 + 1;
//   let target_d_y: number = Math.abs(instructions[i].sensor.y - target_y);
//   let num_intersections: number = max_num_scanned_positions - target_d_y * 2;
//   for (let j = 0; j <= (num_intersections - 1) / 2; j++) {
//     let xL: number = instructions[i].sensor.x - j;
//     add_intersection(xL);
//     let xR: number = instructions[i].sensor.x + j;
//     add_intersection(xR);
//   }
// }
// function add_intersection(x: number) {
//   if (!intersections.has(x)) {
//     intersections.add(x);
//   }
// }
// console.log(intersections.size - 1);
// Task 2:
let simple_instructions = [];
for (let i = 0; i < instructions.length; i++) {
    simple_instructions.push(new sensor_instruction_1.SimpleSensorInstruction(instructions[i].sensor.x, instructions[i].sensor.y, instructions[i].d));
}
// Get only the positions that are on the periphery of the sensor range
for (let i = 0; i < instructions.length; i++) {
    //let pre_num_peripheries: number = peripheries.length;
    for (let cd = instructions[i].d; cd >= 0; cd--) {
        let pxl = instructions[i].sensor.x - cd - 1;
        let pxr = instructions[i].sensor.x + cd + 1;
        let invCd = instructions[i].d - cd;
        let yt = instructions[i].sensor.y - invCd;
        let yb = instructions[i].sensor.y + invCd;
        add_periphery(pxl, yt);
        add_periphery(pxl, yb);
        add_periphery(pxr, yt);
        add_periphery(pxr, yb);
    }
    //let post_num_peripheries: number = peripheries.length;
    //   if (
    //     post_num_peripheries - pre_num_peripheries !=
    //     (instructions[i].d + 1) * 4
    //   ) {
    //     console.log("Error in periphery calculation");
    //   }
}
function add_periphery(x, y) {
    if (x >= 0 && x <= 4000000 && y >= 0 && y <= 4000000) {
        peripheries.push(new vector_1.Vector(x, y));
    }
}
let found_beacon = false;
let missing_beacon = new vector_1.Vector(0, 0);
for (let i = 0; i < peripheries.length; i++) {
    let inside_any_range = false;
    for (let k = 0; k < simple_instructions.length; ++k) {
        if (manhattan_range(peripheries[i].x, peripheries[i].y, simple_instructions[k].sx, simple_instructions[k].sy) <= simple_instructions[k].d) {
            inside_any_range = true;
            break;
        }
    }
    if (!inside_any_range) {
        missing_beacon = peripheries[i];
        found_beacon = true;
        break;
    }
}
function manhattan_range(x, y, sx, sy) {
    return Math.abs(x - sx) + Math.abs(y - sy);
}
console.log(missing_beacon.x * 4000000 + missing_beacon.y);
//# sourceMappingURL=day15.js.map
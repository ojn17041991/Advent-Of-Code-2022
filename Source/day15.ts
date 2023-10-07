import { SensorInstruction } from "./Classes/sensor_instruction";
import { SimpleSensorInstruction } from "./Classes/sensor_instruction";
import { Vector } from "./Classes/vector";
import { file_manager } from "./Utils/file_manager";
import { input_converter } from "./Utils/input_converter";

let input: string = file_manager.get_input_from_file(__filename);
let instructions: SensorInstruction[] =
  input_converter.get_sensor_instructions(input);

let intersections: Set<number> = new Set<number>();
let peripheries: Vector[] = [];
let target_y: number = 2000000;

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
let simple_instructions: SimpleSensorInstruction[] = [];
for (let i = 0; i < instructions.length; i++) {
  simple_instructions.push(
    new SimpleSensorInstruction(
      instructions[i].sensor.x,
      instructions[i].sensor.y,
      instructions[i].d
    )
  );
}

// Get only the positions that are on the periphery of the sensor range
for (let i = 0; i < instructions.length; i++) {
  //let pre_num_peripheries: number = peripheries.length;
  for (let cd = instructions[i].d; cd >= 0; cd--) {
    let pxl: number = instructions[i].sensor.x - cd - 1;
    let pxr: number = instructions[i].sensor.x + cd + 1;
    let invCd: number = instructions[i].d - cd;
    let yt: number = instructions[i].sensor.y - invCd;
    let yb: number = instructions[i].sensor.y + invCd;
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

function add_periphery(x: number, y: number): void {
  if (x >= 0 && x <= 4000000 && y >= 0 && y <= 4000000) {
    peripheries.push(new Vector(x, y));
  }
}

let found_beacon: boolean = false;
let missing_beacon: Vector = new Vector(0, 0);
for (let i = 0; i < peripheries.length; i++) {
  let inside_any_range: boolean = false;
  for (let k = 0; k < simple_instructions.length; ++k) {
    if (
      manhattan_range(
        peripheries[i].x,
        peripheries[i].y,
        simple_instructions[k].sx,
        simple_instructions[k].sy
      ) <= simple_instructions[k].d
    ) {
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

function manhattan_range(x: number, y: number, sx: number, sy: number): number {
  return Math.abs(x - sx) + Math.abs(y - sy);
}

console.log(missing_beacon.x * 4000000 + missing_beacon.y);

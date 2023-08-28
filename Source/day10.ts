import { file_manager } from "./Utils/file_manager";
import { input_converter } from "./Utils/input_converter";

let input: string = file_manager.get_input_from_file(__filename);
let list: [string, number][] = input_converter.get_key_value_list(input);

const noop: string = "noop";
const addx: string = "addx";
const addxCycles: number = 2;

let total: number = 0;
let curValue: number = 1;
let queuedInstruction: [number, number] = [0, 0];
let waiting: boolean = false;
let cycleNum: number = 0; // Should be 1 for task 1.

const displayPixelsX = 40;
const displayPixelsY = 6;

let display: string[][] = [];
for (let i = 0; i < displayPixelsY; ++i) {
  let xDim: string[] = [];

  for (let j = 0; j < displayPixelsX; ++j) {
    xDim.push(".");
  }

  display.push(xDim);
}

for (let i = 0; i < list.length; ) {
  // Draw first.

  // Task 1 only:
  // if ((cycleNum - 20) % 40 == 0) {
  //     total += curValue * cycleNum;
  // }
  // ++cycleNum;

  // Task 2 only:
  let pixelX: number = cycleNum % displayPixelsX;
  if (pixelX >= curValue - 1 && pixelX <= curValue + 1) {
    let pixelY: number = Math.floor(cycleNum / displayPixelsX);
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
  } else {
    // New command.
    if (list[i][0] == addx) {
      queuedInstruction = [+list[i][1], addxCycles];
      waiting = true;
    } else if (list[i][0] == noop) {
      ++i;
    }
  }
}

console.log(total);

let displayOutput: string = "";
for (let i = 0; i < displayPixelsY; ++i) {
  let row: string = "";
  for (let j = 0; j < displayPixelsX; ++j) {
    row += display[i][j];
  }
  displayOutput += row + "\n";
}

console.log(displayOutput);

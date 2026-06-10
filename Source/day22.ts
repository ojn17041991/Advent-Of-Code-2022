import { file_manager } from "./Utils/file_manager";

let input: string = file_manager.get_input_from_file(__filename);

function solve(input: string): number {
  const parts = input.split(/\r?\n\r?\n/);

  const mapLines = parts[0].split(/\r?\n/);
  const instructions = parts[1].trim();

  const width = Math.max.apply(
    null,
    mapLines.map((x) => x.length),
  );

  const grid = mapLines.map((line) => line.padEnd(width, " ").split(""));

  let row = 0;
  let col = grid[0].indexOf(".");

  // 0=right,1=down,2=left,3=up
  let facing = 0;

  const dirs = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  const tokens = instructions.match(/\d+|[LR]/g) || [];

  for (const token of tokens) {
    if (token === "L") {
      facing = (facing + 3) % 4;
      continue;
    }

    if (token === "R") {
      facing = (facing + 1) % 4;
      continue;
    }

    const steps = Number(token);

    for (let step = 0; step < steps; step++) {
      let nextRow = row + dirs[facing][0];
      let nextCol = col + dirs[facing][1];

      if (
        nextRow < 0 ||
        nextRow >= grid.length ||
        nextCol < 0 ||
        nextCol >= width ||
        grid[nextRow][nextCol] === " "
      ) {
        if (facing === 0) {
          nextCol = 0;
          while (grid[row][nextCol] === " ") {
            nextCol++;
          }
          nextRow = row;
        } else if (facing === 2) {
          nextCol = width - 1;
          while (grid[row][nextCol] === " ") {
            nextCol--;
          }
          nextRow = row;
        } else if (facing === 1) {
          nextRow = 0;
          while (nextRow < grid.length && grid[nextRow][col] === " ") {
            nextRow++;
          }
          nextCol = col;
        } else {
          nextRow = grid.length - 1;
          while (nextRow >= 0 && grid[nextRow][col] === " ") {
            nextRow--;
          }
          nextCol = col;
        }
      }

      if (grid[nextRow][nextCol] === "#") {
        break;
      }

      row = nextRow;
      col = nextCol;
    }
  }

  return 1000 * (row + 1) + 4 * (col + 1) + facing;
}

console.log(solve(input));

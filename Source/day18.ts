import { file_manager } from "./Utils/file_manager";

let input: string = file_manager.get_input_from_file(__filename);

type Point = [number, number, number];

const dirs: Point[] = [
  [1, 0, 0],
  [-1, 0, 0],
  [0, 1, 0],
  [0, -1, 0],
  [0, 0, 1],
  [0, 0, -1],
];

function key(x: number, y: number, z: number): string {
  return `${x},${y},${z}`;
}

function solve(input: string): number {
  const cubes = new Set<string>();
  const list: Point[] = [];

  for (const line of input.trim().split("\n")) {
    const [x, y, z] = line.split(",").map(Number);
    cubes.add(key(x, y, z));
    list.push([x, y, z]);
  }

  let surface = 0;

  for (const [x, y, z] of list) {
    let exposed = 6;

    for (const [dx, dy, dz] of dirs) {
      const nx = x + dx;
      const ny = y + dy;
      const nz = z + dz;

      if (cubes.has(key(nx, ny, nz))) {
        exposed--;
      }
    }

    surface += exposed;
  }

  return surface;
}

// usage:
console.log(solve(input));

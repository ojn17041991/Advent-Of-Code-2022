import { file_manager } from "./Utils/file_manager";

let input: string = file_manager.get_input_from_file(__filename);

type Point = [number, number];

const WIDTH = 7;

// Rock shapes (relative coordinates)
const SHAPES: Point[][] = [
  // -
  [
    [0, 0],
    [1, 0],
    [2, 0],
    [3, 0],
  ],
  // +
  [
    [1, 0],
    [0, 1],
    [1, 1],
    [2, 1],
    [1, 2],
  ],
  // L (reverse L)
  [
    [0, 0],
    [1, 0],
    [2, 0],
    [2, 1],
    [2, 2],
  ],
  // |
  [
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
  ],
  // square
  [
    [0, 0],
    [1, 0],
    [0, 1],
    [1, 1],
  ],
];

function solve(input: string): number {
  const jets = input.trim().split("");
  let jetIndex = 0;

  const occupied = new Set<string>();
  let top = -1;

  const key = (x: number, y: number) => `${x},${y}`;

  const collides = (shape: Point[], dx: number, dy: number) => {
    return shape.some(([x, y]) => {
      const nx = x + dx;
      const ny = y + dy;
      if (nx < 0 || nx >= WIDTH || ny < 0) return true;
      return occupied.has(key(nx, ny));
    });
  };

  const place = (shape: Point[], dx: number, dy: number) => {
    for (const [x, y] of shape) {
      occupied.add(key(x + dx, y + dy));
      top = Math.max(top, y + dy);
    }
  };

  for (let i = 0; i < 2022; i++) {
    const shape = SHAPES[i % SHAPES.length];
    let x = 2;
    let y = top + 4;

    while (true) {
      // jet push
      const jet = jets[jetIndex++ % jets.length];
      const dx = jet === "<" ? -1 : 1;

      if (!collides(shape, x + dx, y)) {
        x += dx;
      }

      // fall
      if (!collides(shape, x, y - 1)) {
        y--;
      } else {
        place(shape, x, y);
        break;
      }
    }
  }

  return top + 1;
}

console.log(solve(input));

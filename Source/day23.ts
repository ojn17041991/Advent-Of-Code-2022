import { file_manager } from "./Utils/file_manager";

let input: string = file_manager.get_input_from_file(__filename);

type Point = {
  x: number;
  y: number;
};

function solve(input: string): number {
  const lines = input.trim().split(/\r?\n/);

  let elves = new Set<string>();

  for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[y].length; x++) {
      if (lines[y][x] === "#") {
        elves.add(key(x, y));
      }
    }
  }

  const directions = [
    {
      move: [0, -1],
      checks: [
        [-1, -1],
        [0, -1],
        [1, -1],
      ],
    },
    {
      move: [0, 1],
      checks: [
        [-1, 1],
        [0, 1],
        [1, 1],
      ],
    },
    {
      move: [-1, 0],
      checks: [
        [-1, -1],
        [-1, 0],
        [-1, 1],
      ],
    },
    {
      move: [1, 0],
      checks: [
        [1, -1],
        [1, 0],
        [1, 1],
      ],
    },
  ];

  for (let round = 0; round < 10; round++) {
    const proposals = new Map<string, string>();
    const counts = new Map<string, number>();

    for (const elf of elves) {
      const [x, y] = elf.split(",").map(Number);

      let hasNeighbour = false;

      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (dx === 0 && dy === 0) {
            continue;
          }

          if (elves.has(key(x + dx, y + dy))) {
            hasNeighbour = true;
          }
        }
      }

      if (!hasNeighbour) {
        continue;
      }

      for (let i = 0; i < 4; i++) {
        const dir = directions[(round + i) % 4];

        let clear = true;

        for (const check of dir.checks) {
          if (elves.has(key(x + check[0], y + check[1]))) {
            clear = false;
            break;
          }
        }

        if (clear) {
          const dest = key(x + dir.move[0], y + dir.move[1]);

          proposals.set(elf, dest);

          counts.set(dest, (counts.get(dest) || 0) + 1);

          break;
        }
      }
    }

    const next = new Set<string>();

    for (const elf of elves) {
      const proposal = proposals.get(elf);

      if (proposal && counts.get(proposal) === 1) {
        next.add(proposal);
      } else {
        next.add(elf);
      }
    }

    elves = next;
  }

  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;

  for (const elf of elves) {
    const [x, y] = elf.split(",").map(Number);

    minX = Math.min(minX, x);
    maxX = Math.max(maxX, x);
    minY = Math.min(minY, y);
    maxY = Math.max(maxY, y);
  }

  const area = (maxX - minX + 1) * (maxY - minY + 1);

  return area - elves.size;
}

function key(x: number, y: number): string {
  return x + "," + y;
}

console.log(solve(input));

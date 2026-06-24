import { file_manager } from "./Utils/file_manager";

let input: string = file_manager.get_input_from_file(__filename);

type Blizzard = {
  x: number;
  y: number;
  dir: string;
};

type State = {
  x: number;
  y: number;
  time: number;
};

function solve(input: string): number {
  const grid = input.trim().split(/\r?\n/);

  const height = grid.length;
  const width = grid[0].length;

  const start = {
    x: grid[0].indexOf("."),
    y: 0,
  };

  const end = {
    x: grid[height - 1].indexOf("."),
    y: height - 1,
  };

  const blizzards: Blizzard[] = [];

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const c = grid[y][x];

      if ("<>^v".includes(c)) {
        blizzards.push({
          x,
          y,
          dir: c,
        });
      }
    }
  }

  const cache = new Map<string, boolean>();

  function isBlocked(x: number, y: number, time: number): boolean {
    const key = `${x},${y},${time}`;

    if (cache.has(key)) {
      return cache.get(key)!;
    }

    const innerWidth = width - 2;
    const innerHeight = height - 2;

    for (const b of blizzards) {
      let bx = b.x;
      let by = b.y;

      if (b.dir === ">") {
        bx = 1 + ((b.x - 1 + time) % innerWidth);
      }

      if (b.dir === "<") {
        bx = 1 + ((((b.x - 1 - time) % innerWidth) + innerWidth) % innerWidth);
      }

      if (b.dir === "v") {
        by = 1 + ((b.y - 1 + time) % innerHeight);
      }

      if (b.dir === "^") {
        by =
          1 + ((((b.y - 1 - time) % innerHeight) + innerHeight) % innerHeight);
      }

      if (bx === x && by === y) {
        cache.set(key, true);
        return true;
      }
    }

    cache.set(key, false);
    return false;
  }

  const queue: State[] = [
    {
      x: start.x,
      y: start.y,
      time: 0,
    },
  ];

  const visited = new Set<string>();

  const moves = [
    [0, 0], // wait
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  while (queue.length > 0) {
    const current = queue.shift()!;

    if (current.x === end.x && current.y === end.y) {
      return current.time;
    }

    const nextTime = current.time + 1;

    for (const move of moves) {
      const nx = current.x + move[0];
      const ny = current.y + move[1];

      const inside = nx > 0 && nx < width - 1 && ny > 0 && ny < height - 1;

      const valid =
        inside ||
        (nx === start.x && ny === start.y) ||
        (nx === end.x && ny === end.y);

      if (!valid) {
        continue;
      }

      if (isBlocked(nx, ny, nextTime)) {
        continue;
      }

      const stateKey = `${nx},${ny},${nextTime % 1000}`;

      if (visited.has(stateKey)) {
        continue;
      }

      visited.add(stateKey);

      queue.push({
        x: nx,
        y: ny,
        time: nextTime,
      });
    }
  }

  throw new Error("No path found");
}

console.log(solve(input));

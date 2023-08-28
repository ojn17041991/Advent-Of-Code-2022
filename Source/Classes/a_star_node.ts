export class AStarNode {
  char: string;
  x: number;
  y: number;
  g: number;
  h: number = 1;
  f: number = Number.MAX_SAFE_INTEGER;
  closed: boolean = false;
  open: boolean = false;
  predecessor: AStarNode;
  steps_taken: number = 0;

  constructor(char: string, x: number, y: number) {
    this.char = char;
    this.x = x;
    this.y = y;
  }
}

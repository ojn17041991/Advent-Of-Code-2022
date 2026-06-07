export class Rock {
  map: string[][];
  type: number;

  constructor(type: number) {
    this.type = type;
    this.build(type);
  }

  build(type: number): void {
    switch (type) {
      case 0:
        this.map = [["#", "#", "#", "#"]];
        break;
      case 1:
        this.map = [
          [".", "#", "."],
          ["#", "#", "#"],
          [".", "#", "."],
        ];
        break;
      case 2:
        this.map = [
          ["#", "#", "#"],
          [".", ".", "#"],
          [".", ".", "#"],
        ];
        break;
      case 3:
        this.map = [["#"], ["#"], ["#"], ["#"]];
        break;
      case 4:
        this.map = [
          ["#", "#"],
          ["#", "#"],
        ];
        break;
    }
  }
}

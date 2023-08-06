export class Monkey {
  id: number;
  items: number[];
  inspectionCount: number;
  operation: Function;
  divisor: number;
  test: Function;

  constructor(
    id: number,
    items: number[],
    operation: Function,
    divisor: number,
    test: Function
  ) {
    this.id = id;
    this.items = items;
    this.inspectionCount = 0;
    this.operation = operation;
    this.divisor = divisor;
    this.test = test;
  }

  inspect() {
    this.inspectionCount++;
  }

  giveItem(item: number) {
    return this.items.shift();
  }

  receiveItem(item: number) {
    this.items.push(item);
  }
}

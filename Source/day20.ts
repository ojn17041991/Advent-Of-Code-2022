import { file_manager } from "./Utils/file_manager";

let input: string = file_manager.get_input_from_file(__filename);

type Item = {
  id: number;
  value: number;
};

function solve(input: string): number {
  const original: Item[] = input
    .trim()
    .split("\n")
    .map((line, index) => ({
      id: index,
      value: Number(line),
    }));

  const mixed = original.slice();

  for (const item of original) {
    const currentIndex = mixed.findIndex((x) => x.id === item.id);

    mixed.splice(currentIndex, 1);

    const length = mixed.length;

    let newIndex = (currentIndex + item.value) % length;

    if (newIndex < 0) {
      newIndex += length;
    }

    mixed.splice(newIndex, 0, item);
  }

  const zeroIndex = mixed.findIndex((x) => x.value === 0);

  const a = mixed[(zeroIndex + 1000) % mixed.length].value;
  const b = mixed[(zeroIndex + 2000) % mixed.length].value;
  const c = mixed[(zeroIndex + 3000) % mixed.length].value;

  return a + b + c;
}

// usage:
console.log(solve(input));

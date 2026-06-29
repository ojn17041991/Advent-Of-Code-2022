import { file_manager } from "./Utils/file_manager";

let input: string = file_manager.get_input_from_file(__filename);

function solve(input: string): string {
  const numbers = input.trim().split(/\r?\n/).map(fromSnafu);

  const sum = numbers.reduce((a, b) => a + b, 0);

  return toSnafu(sum);
}

function fromSnafu(value: string): number {
  let result = 0;

  for (const char of value) {
    result *= 5;

    switch (char) {
      case "2":
        result += 2;
        break;
      case "1":
        result += 1;
        break;
      case "0":
        result += 0;
        break;
      case "-":
        result -= 1;
        break;
      case "=":
        result -= 2;
        break;
    }
  }

  return result;
}

function toSnafu(value: number): string {
  let result = "";

  while (value > 0) {
    let remainder = value % 5;

    value = Math.floor(value / 5);

    if (remainder <= 2) {
      result = remainder.toString() + result;
    } else if (remainder === 3) {
      result = "=" + result;
      value++;
    } else if (remainder === 4) {
      result = "-" + result;
      value++;
    }
  }

  return result;
}

console.log(solve(input));

import { file_manager } from "./Utils/file_manager";
import { input_converter } from "./Utils/input_converter";

let input: string = file_manager.get_input_from_file(__filename);
let input_list: object[] = input_converter.get_rps_move_list(input);
let score1: number = 0;
let score2: number = 0;

for (let i = 0; i < input_list.length; ++i) {
  switch (input_list[i]["your_move"]) {
    case "X":
      score1 += 1;
      if (input_list[i]["opponents_move"] == "A") {
        score1 += 3;
        score2 += 3; // Scissors.
      } else if (input_list[i]["opponents_move"] == "C") {
        score1 += 6;
        score2 += 2; // Paper.
      } else {
        score2 += 1; // Rock.
      }
      break;
    case "Y":
      score1 += 2;
      score2 += 3; // Draw.
      if (input_list[i]["opponents_move"] == "B") {
        score1 += 3;
        score2 += 2; // Paper.
      } else if (input_list[i]["opponents_move"] == "A") {
        score1 += 6;
        score2 += 1; // Rock.
      } else {
        score2 += 3; // Scissors.
      }
      break;
    case "Z":
      score1 += 3;
      score2 += 6; // Win.
      if (input_list[i]["opponents_move"] == "C") {
        score1 += 3;
        score2 += 1; // Rock.
      } else if (input_list[i]["opponents_move"] == "B") {
        score1 += 6;
        score2 += 3; // Scissors.
      } else {
        score2 += 2; // Paper.
      }
      break;
  }
}

// Task 1 output:
console.log(score1);

// Task 2 output:
console.log(score2);

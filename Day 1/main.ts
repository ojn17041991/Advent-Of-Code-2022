import { file_manager } from "../Utils/file_manager";
import { input_converter } from "../Utils/input_converter";
import { quick_sort } from "../Utils/quick_sort";

let input: string = file_manager.get_input_from_file(__dirname + "\\input.txt");
let input_list: number[][] = input_converter.get_calorie_list(input);

let agg_list: number[] = [];
for (let i = 0; i < input_list.length; ++i) {
    let agg: number = 0;
    for (let j = 0; j < input_list[i].length; ++j) {
        agg += input_list[i][j];
    }
    agg_list.push(agg);
}

let sorted_list: number[] = quick_sort.sort(agg_list, 0, agg_list.length - 1);

// Task 1 output:
console.log(sorted_list[sorted_list.length - 1]);

// Task 2 output:
console.log(
    sorted_list[sorted_list.length - 1] + 
    sorted_list[sorted_list.length - 2] + 
    sorted_list[sorted_list.length - 3]
);
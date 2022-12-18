import { file_manager } from '../Utils/file_manager';
import { input_converter } from '../Utils/input_converter';

let input: string = file_manager.get_input_from_file(__dirname + '\\input.txt');
let camp_ranges: object[] = input_converter.get_camp_ranges(input);
let num_complete_overlaps: number = 0;
let num_partial_overlaps: number = 0;

for (let i = 0; i < camp_ranges.length; ++i) {
    let left_range: object = camp_ranges[i]["left"];
    let right_range: object = camp_ranges[i]["right"];

    // Check if there is a partial overlap between the 2 ranges.
    if ((left_range["min"] >= right_range["min"] && left_range["min"] <= right_range["max"]) ||
        (left_range["max"] >= right_range["min"] && left_range["max"] <= right_range["max"]) ||
        (right_range["max"] >= left_range["min"] && right_range["max"] <= left_range["max"]) ||
        (right_range["max"] >= left_range["min"] && right_range["max"] <= left_range["max"])) {
        ++num_partial_overlaps;
    } else {
        continue; // If there's no partial overlap, there's definitely no complete overlap, so skip.
    }

    // Check if there is one range completely encompasses the other.
    if ((left_range["min"] >= right_range["min"] && left_range["max"] <= right_range["max"]) ||
        (right_range["min"] >= left_range["min"] && right_range["max"] <= left_range["max"])) {
        ++num_complete_overlaps;
    }
}

// Task 1 output:
console.log(num_complete_overlaps);

// Task 2 output:
console.log(num_partial_overlaps);
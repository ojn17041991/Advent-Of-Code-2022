import { file_manager } from "../Utils/file_manager";
import { input_converter } from "../Utils/input_converter";
import { day_3_helper } from "../Utils/day_specific_helper";

let input: string = file_manager.get_input_from_file(__dirname + '\\input.txt');
let input_list_compartments: object[] = input_converter.get_backpack_list_compartments(input);
let input_list_for_groups: object[][] = input_converter.get_backpack_list_for_groups(input);
let sum_for_compartments: number = 0;
let sum_for_groups: number = 0;

for (let i = 0; i < input_list_compartments.length; ++i) {
    
    let fc: string = input_list_compartments[i]['first_compartment'];
    let sc: string = input_list_compartments[i]['second_compartment'];

    for (let j = 0; j < fc.length; ++j) {
        if (sc.includes(fc[j])) {

            // Get the score from the character code.
            sum_for_compartments += day_3_helper.get_score_from_char(fc, j);

            break; // Assumed that there is only one matching character.
        }
    }
}

for (let i = 0; i < input_list_for_groups.length; ++i) {

    let block = input_list_for_groups[i];
    for (let k in block[0]) {

        // If the current item exists in all 3 backpacks.
        if (block[1][k] !== undefined && block[2][k] !== undefined) {

            // Add the value to the sum.
            sum_for_groups += day_3_helper.get_score_from_char(k, 0);

            break;

        }

    }
}

// Task 1 output:
console.log(sum_for_compartments);

// Task 3 output:
console.log(sum_for_groups);

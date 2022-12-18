import { file_manager } from '../Utils/file_manager';

let input: string = file_manager.get_input_from_file(__dirname + '\\input.txt');
let solveTask1: Boolean = false;
let marker_length: number = solveTask1 ? 4 : 14;
let marker_position: number = 0;

// sc = starting character
for (let sc = 0; sc < input.length - marker_length; ++sc) {

    let duplicate_found: Boolean = false;

    // cc = current character
    for (let cc = 0; cc < marker_length; ++cc) {

        // nc = next character
        for (let nc = 1; nc < marker_length - cc; ++nc) {

            if (input[sc + cc] == input[sc + cc + nc]) {

                // Duplicate character in sequence.
                duplicate_found = true;
                break;

            }

        }

        if (duplicate_found) {
            // Move onto the next sequence of characters if a duplicate was found.
            break;
        }

    }

    if (duplicate_found == false) {
        // Marker found.
        marker_position = sc + marker_length;
        break;
    }

}

console.log(marker_position);
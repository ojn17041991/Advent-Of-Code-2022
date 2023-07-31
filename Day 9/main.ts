import { file_manager } from '../Utils/file_manager';
import { input_converter } from '../Utils/input_converter';
import { day_9_helper } from "../Utils/day_specific_helper";

let input: string = file_manager.get_input_from_file(__dirname + '\\input.txt');
let list: [string, number][] = input_converter.get_rope_list(input);

const NUM_KNOTS = 10;
let posList: [number, number][] = [[0, 0]];
let curN: [number, number][] = [];

// Populate the knots.
for (let i = 0; i < NUM_KNOTS; ++i) {
    curN[i] = [0, 0];
}

// Foreach command
for (let i = 0; i < list.length; ++i) {

    // Foreach step
    for (let j = 0; j < list[i][1]; ++j) {

        // Move N[0] step-by-step.
        let stepValue: [number, number] = day_9_helper.get_step_value(list[i][0]);
        curN[0][0] += stepValue[0];
        curN[0][1] += stepValue[1];

        // Foreach knot
        for (let k = 1; k < curN.length; ++k) {

            // Check if N[n] needs to move.
            if (day_9_helper.is_within_vicinity(curN[k], curN[k - 1]))
            {
                break;
            }
            else
            {
                // Move N[n] to next space.
                if (curN[k][0] != curN[k - 1][0])
                {
                    let deltaX: number = curN[k - 1][0] - curN[k][0];
                    curN[k][0] += (deltaX / Math.abs(deltaX))
                }
                if (curN[k][1] != curN[k - 1][1])
                {
                    let deltaY: number = curN[k - 1][1] - curN[k][1];
                    curN[k][1] += (deltaY / Math.abs(deltaY))
                }

                // N[M] has moved so check if the space has been visited.
                if (k == curN.length - 1) {

                    let spaceVisited: boolean = false;
                    for (let l = 0; l < posList.length; ++l) {
                        if (posList[l][0] == curN[k][0] && posList[l][1] == curN[k][1]) {
                            spaceVisited = true;
                            break;
                        }
                    }

                    if (!spaceVisited)
                    {
                        let space: [number, number] = [curN[k][0], curN[k][1]];
                        posList.push(space);
                    }
                }
            }
        }
    }
}

console.log(posList.length);
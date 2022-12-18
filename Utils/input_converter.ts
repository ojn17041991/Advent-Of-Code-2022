export module input_converter {

    // Day 1:
    export function get_calorie_list(input: string): number[][] {
        let outer_list: number[][] = []
        let inner_list: number[] = []

        let lines: string[] = input.split(/\r?\n/g);
        for (let i = 0; i < lines.length; ++i) {
            if (lines[i] == '') {
                outer_list.push(inner_list);
                inner_list = [];
            } else {
                inner_list.push(+lines[i]);
            }
        }

        return outer_list;
    }

    // Day 2:
    export function get_rps_move_list(input: string): object[] {
        let list: object[] = []

        let lines: string[] = input.split(/\r?\n/g);
        for (let i = 0; i < lines.length; ++i) {
            let parts: string[] = lines[i].split(' ');
            list.push({ 'opponents_move': parts[0], 'your_move': parts[1] });
        }

        return list;
    }

    // Day 3.1:
    export function get_backpack_list_compartments(input: string): object[] {
        let list: object[] = [];

        let lines: string[] = input.split(/\r?\n/g);
        for (let i = 0; i < lines.length; ++i) {
            list.push({
                "first_compartment": lines[i].substring(0, lines[i].length / 2),
                "second_compartment": lines[i].substring(lines[i].length / 2)
            });
        }

        return list;
    }

    // Day 3.2:
    export function get_backpack_list_for_groups(input: string): object[][] {
        let list: object[][] = [];
        let lines: string[] = input.split(/\r?\n/g);
        
        // Foreach block of 3 lines.
        for (let i = 0; i < lines.length; i+=3) {
            let block: object[] = [];

            // Foreach line in the block.
            for (let j = 0; j < 3; ++j) {
                let dict: object = {};

                // Foreach char in the string.
                for (let c = 0; c < lines[i+j].length; ++c) {
                    dict[lines[i+j][c]] = c; // Using a dict for fast compares, which means duplicates are ignored.
                                             // ...which is not important for this problem.
                }

                block.push(dict);
            }

            list.push(block);
        }

        return list;
    }

    // Day 4:
    export function get_camp_ranges(input: string): object[] {

        let ranges: object[] = [];
        let lines: string[] = input.split(/\r?\n/g);

        for (let i = 0; i < lines.length; ++i) {

            // Split each line on , to get the ranges for the left/right elves.
            // Then split each range on - to get the min/max.
            let splits: string[] = lines[i].split(',');
            let left_elf: string[] = splits[0].split('-');
            let right_elf: string[] = splits[1].split('-');

            // Define some type safe dictionaries to store the range information.
            let left_range: { [key: string]: number } = {
                "min": parseInt(left_elf[0]),
                "max": parseInt(left_elf[1])
            };
            let right_range: { [key: string]: number } = {
                "min": parseInt(right_elf[0]),
                "max": parseInt(right_elf[1])
            };
            let range: { [key: string]: object } = {
                "left": left_range,
                "right": right_range
            };

            ranges.push(range);
        }

        return ranges;
    }
}
export module input_converter {

    // Generic:
    function get_basic_list(input: string): string[] {
        return input.split(/\r?\n/g);
    }

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

    // Day 5:
    // Input is in 2 parts. Split the input and returned the selected part.
    function get_input_section(input: string, section_idx: number): string {
        let sections: string[] = input.split(/\n\s*\n/gm);
        if (section_idx >= 0 && section_idx < sections.length) {
            return sections[section_idx];
        }
        return "";
    }

    // How are the crates currently arranged?
    export function get_crate_arrangement_list(input: string): string[][] {
        // Get the first section and split into lines.
        let section: string = get_input_section(input, 0);
        let lines: string[] = section.split(/\r?\n/g);
        
        // Use the first line to get the max height of the crate arrangements.
        // Then set up some empty arrays to represent the crate columns.
        let total_height: number = (lines[0].length + 1) / 4;
        let crates: string[][] = [];
        for (let c = 0; c < total_height; ++c) {
            crates.push([]);
        }

        for (let i = 0; i < lines.length; ++i) {
            
            for (let j = 0; j < crates.length; ++j) {

                // Get the section of text representing a crate.
                // Each crate is 3 characters long and spaced by an extra character.
                let start_idx: number = j * 4;
                let end_idx: number = start_idx + 3;
                let crate: string = lines[i].substring(start_idx, end_idx);

                // Make sure there is a valid value to represent the crate.
                if (crate.match(/\[/g)) {
                    crates[j].unshift(crate.substring(1, 2));
                }
            }

        }

        return crates;
    }

    // How are the crates going to be moved?
    export function get_crate_move_list(input: string): object[] {
        let moves: object[] = []

        // Get the second section and split into lines.
        let section: string = get_input_section(input, 1);
        let lines: string[] = section.split(/\r?\n/g);

        // Search strings.
        let move_str: string = 'move ';
        let from_str: string = 'from ';
        let to_str: string = 'to ';

        for (let i = 0; i < lines.length; ++i) {
            
            // String location indexes.
            let move_loc: number = lines[i].indexOf(move_str);
            let from_loc: number = lines[i].indexOf(from_str);
            let to_loc: number = lines[i].indexOf(to_str);
            
            // Values.
            let num: number = parseInt(lines[i].substring(move_loc + move_str.length, from_loc));
            let from: number = parseInt(lines[i].substring(from_loc + from_str.length, to_loc));
            let to: number = parseInt(lines[i].substring(to_loc + to_str.length));

            let move: { [key: string]: number } = {
                "num": num,
                "from": from,
                "to": to
            };
            moves.push(move);
        }

        return moves;
    }

    // Day 6 - Not required.

    // Day 7:
    export function get_directory_tree(input: string): { [key:string]: any } {

        // Recursive function to populate the dictionary as we loop.
        function recurse(tree: { [key:string]: any }, depth: number, size: number): { [key:string]: any } {
    
            // Do we need to recurse further to get to the current branch?
            if (depth < directory_stack.length - 1) {
                recurse(tree[directory_stack[depth]], depth + 1, size);
                return tree;
            }

            // We've reached the current branch, so add the required branch/leaf.
            let branch: { [key: string]: any } = {};
            tree[directory_stack[depth]] = size > 0 ? size : branch; // If size is non-zero, it's a file, so append size.
            return tree;

        }

        // Tree structure and current directory stack references.
        let output: { [key: string]: any } = {};
        let directory_stack: string[] = [];

        // Get the list of commands.
        let commands: string[] = get_basic_list(input);
        for (let i = 0; i < commands.length; ++i) {

            // Get the command components and check the type.
            let components: string[] = commands[i].split(' ');
            if (components[0] == '$') {

                // Command.
                if (components[1] == 'cd') {

                    // cd - Update the current directory.
                    if (components[2] == '..') {
                        directory_stack.pop();
                    } else {
                        directory_stack.push(components[2]);

                        // This is a new branch in the tree, so we'll add it to the existing structure recursively.
                        output = recurse(output, 0, 0);
                    }

                } else if (components[1] == 'ls') {

                    // ls - Doesn't affect placement in the tree, so continue.
                    continue;

                }

            } else if (components[0] == 'dir') {

                // Directory - Just lists directories, but doesn't cd into them, so continue.
                continue;

            } else {

                // File - Add it as a leaf.
                directory_stack.push(components[1]);
                output = recurse(output, 0, parseInt(components[0]));
                directory_stack.pop(); // Done with the file now, so pop it from the stack.
            }

        }

        // Return the fully recursive tree structure.
        return output;
    }
}
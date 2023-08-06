"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.input_converter = void 0;
const monkey_1 = require("./Classes/monkey");
var input_converter;
(function (input_converter) {
    // Generic:
    function get_basic_list(input) {
        return input.split(/\r?\n/g);
    }
    // Day 1:
    function get_calorie_list(input) {
        let outer_list = [];
        let inner_list = [];
        let lines = input.split(/\r?\n/g);
        for (let i = 0; i < lines.length; ++i) {
            if (lines[i] == "") {
                outer_list.push(inner_list);
                inner_list = [];
            }
            else {
                inner_list.push(+lines[i]);
            }
        }
        return outer_list;
    }
    input_converter.get_calorie_list = get_calorie_list;
    // Day 2:
    function get_rps_move_list(input) {
        let list = [];
        let lines = input.split(/\r?\n/g);
        for (let i = 0; i < lines.length; ++i) {
            let parts = lines[i].split(" ");
            list.push({ opponents_move: parts[0], your_move: parts[1] });
        }
        return list;
    }
    input_converter.get_rps_move_list = get_rps_move_list;
    // Day 3.1:
    function get_backpack_list_compartments(input) {
        let list = [];
        let lines = input.split(/\r?\n/g);
        for (let i = 0; i < lines.length; ++i) {
            list.push({
                first_compartment: lines[i].substring(0, lines[i].length / 2),
                second_compartment: lines[i].substring(lines[i].length / 2),
            });
        }
        return list;
    }
    input_converter.get_backpack_list_compartments = get_backpack_list_compartments;
    // Day 3.2:
    function get_backpack_list_for_groups(input) {
        let list = [];
        let lines = input.split(/\r?\n/g);
        // Foreach block of 3 lines.
        for (let i = 0; i < lines.length; i += 3) {
            let block = [];
            // Foreach line in the block.
            for (let j = 0; j < 3; ++j) {
                let dict = {};
                // Foreach char in the string.
                for (let c = 0; c < lines[i + j].length; ++c) {
                    dict[lines[i + j][c]] = c; // Using a dict for fast compares, which means duplicates are ignored.
                    // ...which is not important for this problem.
                }
                block.push(dict);
            }
            list.push(block);
        }
        return list;
    }
    input_converter.get_backpack_list_for_groups = get_backpack_list_for_groups;
    // Day 4:
    function get_camp_ranges(input) {
        let ranges = [];
        let lines = input.split(/\r?\n/g);
        for (let i = 0; i < lines.length; ++i) {
            // Split each line on , to get the ranges for the left/right elves.
            // Then split each range on - to get the min/max.
            let splits = lines[i].split(",");
            let left_elf = splits[0].split("-");
            let right_elf = splits[1].split("-");
            // Define some type safe dictionaries to store the range information.
            let left_range = {
                min: parseInt(left_elf[0]),
                max: parseInt(left_elf[1]),
            };
            let right_range = {
                min: parseInt(right_elf[0]),
                max: parseInt(right_elf[1]),
            };
            let range = {
                left: left_range,
                right: right_range,
            };
            ranges.push(range);
        }
        return ranges;
    }
    input_converter.get_camp_ranges = get_camp_ranges;
    // Day 5:
    // Input is in 2 parts. Split the input and returned the selected part.
    function get_input_section(input, section_idx) {
        let sections = input.split(/\n\s*\n/gm);
        if (section_idx >= 0 && section_idx < sections.length) {
            return sections[section_idx];
        }
        return "";
    }
    // How are the crates currently arranged?
    function get_crate_arrangement_list(input) {
        // Get the first section and split into lines.
        let section = get_input_section(input, 0);
        let lines = section.split(/\r?\n/g);
        // Use the first line to get the max height of the crate arrangements.
        // Then set up some empty arrays to represent the crate columns.
        let total_height = (lines[0].length + 1) / 4;
        let crates = [];
        for (let c = 0; c < total_height; ++c) {
            crates.push([]);
        }
        for (let i = 0; i < lines.length; ++i) {
            for (let j = 0; j < crates.length; ++j) {
                // Get the section of text representing a crate.
                // Each crate is 3 characters long and spaced by an extra character.
                let start_idx = j * 4;
                let end_idx = start_idx + 3;
                let crate = lines[i].substring(start_idx, end_idx);
                // Make sure there is a valid value to represent the crate.
                if (crate.match(/\[/g)) {
                    crates[j].unshift(crate.substring(1, 2));
                }
            }
        }
        return crates;
    }
    input_converter.get_crate_arrangement_list = get_crate_arrangement_list;
    // How are the crates going to be moved?
    function get_crate_move_list(input) {
        let moves = [];
        // Get the second section and split into lines.
        let section = get_input_section(input, 1);
        let lines = section.split(/\r?\n/g);
        // Search strings.
        let move_str = "move ";
        let from_str = "from ";
        let to_str = "to ";
        for (let i = 0; i < lines.length; ++i) {
            // String location indexes.
            let move_loc = lines[i].indexOf(move_str);
            let from_loc = lines[i].indexOf(from_str);
            let to_loc = lines[i].indexOf(to_str);
            // Values.
            let num = parseInt(lines[i].substring(move_loc + move_str.length, from_loc));
            let from = parseInt(lines[i].substring(from_loc + from_str.length, to_loc));
            let to = parseInt(lines[i].substring(to_loc + to_str.length));
            let move = {
                num: num,
                from: from,
                to: to,
            };
            moves.push(move);
        }
        return moves;
    }
    input_converter.get_crate_move_list = get_crate_move_list;
    // Day 6 - Not required.
    // Day 7:
    function get_directory_tree(input) {
        // Recursive function to populate the dictionary as we loop.
        function recurse(tree, depth, size) {
            // Do we need to recurse further to get to the current branch?
            if (depth < directory_stack.length - 1) {
                recurse(tree[directory_stack[depth]], depth + 1, size);
                return tree;
            }
            // We've reached the current branch, so add the required branch/leaf.
            let branch = {};
            tree[directory_stack[depth]] = size > 0 ? size : branch; // If size is non-zero, it's a file, so append size.
            return tree;
        }
        // Tree structure and current directory stack references.
        let output = {};
        let directory_stack = [];
        // Get the list of commands.
        let commands = get_basic_list(input);
        for (let i = 0; i < commands.length; ++i) {
            // Get the command components and check the type.
            let components = commands[i].split(" ");
            if (components[0] == "$") {
                // Command.
                if (components[1] == "cd") {
                    // cd - Update the current directory.
                    if (components[2] == "..") {
                        directory_stack.pop();
                    }
                    else {
                        directory_stack.push(components[2]);
                        // This is a new branch in the tree, so we'll add it to the existing structure recursively.
                        output = recurse(output, 0, 0);
                    }
                }
                else if (components[1] == "ls") {
                    // ls - Doesn't affect placement in the tree, so continue.
                    continue;
                }
            }
            else if (components[0] == "dir") {
                // Directory - Just lists directories, but doesn't cd into them, so continue.
                continue;
            }
            else {
                // File - Add it as a leaf.
                directory_stack.push(components[1]);
                output = recurse(output, 0, parseInt(components[0]));
                directory_stack.pop(); // Done with the file now, so pop it from the stack.
            }
        }
        // Return the fully recursive tree structure.
        return output;
    }
    input_converter.get_directory_tree = get_directory_tree;
    // Day 8:
    function get_tree_grid(input) {
        let output = [];
        // Get each line from the input.
        let lines = get_basic_list(input);
        for (let i = 0; i < lines.length; ++i) {
            // Add empty array to output for the current line.
            output.push([]);
            // Start looping over each character in the line.
            let line = lines[i];
            for (let j = 0; j < line.length; ++j) {
                // Convert the char to numeric and push it into the output array.
                let digit = parseInt(line[j]);
                output[i].push(digit);
            }
        }
        // All numbers are now in the array so return it.
        return output;
    }
    input_converter.get_tree_grid = get_tree_grid;
    // Day 9:
    function get_key_value_list(input) {
        let output = [];
        let lines = get_basic_list(input);
        for (let i = 0; i < lines.length; ++i) {
            let components = lines[i].split(" ");
            let direction = components[0];
            let steps = +components[1];
            output.push([direction, steps]);
        }
        return output;
    }
    input_converter.get_key_value_list = get_key_value_list;
    // Day 10 - Not required.
    // Day 11:
    function get_monkeys(input) {
        const monkeys = [];
        let lines = get_basic_list(input);
        for (let i = 0; i < lines.length;) {
            // ID.
            let id = +lines[i].split(" ")[1].replace(":", "");
            ++i;
            // Items.
            let items = lines[i]
                .split(":")[1]
                .split(",")
                .map((item) => +item);
            ++i;
            // Operation.
            let operationComponents = lines[i]
                .split("= old")[1]
                .trim()
                .split(" ")
                .map((item) => item.trim());
            let operator = operationComponents[0];
            let operationValue = operationComponents[1];
            let operand = +operationValue;
            let operation = (x) => x;
            switch (operator) {
                case "+":
                    operation = (x) => x + operand;
                    break;
                case "-":
                    operation = (x) => x - operand;
                    break;
                case "*":
                    operation = (x) => operationValue == "old" ? Math.pow(x, 2) : x * operand;
                    break;
                case "/":
                    operation = (x) => x / operand;
                    break;
            }
            ++i;
            // Test.
            let divisor = +lines[i].split("by")[1];
            ++i;
            let trueRecipient = +lines[i].split("monkey")[1];
            ++i;
            let falseRecipient = +lines[i].split("monkey")[1];
            let test = (x) => {
                if (x % divisor == 0) {
                    return trueRecipient;
                }
                else {
                    return falseRecipient;
                }
            };
            // Add the monkey to the list.
            monkeys.push(new monkey_1.Monkey(id, items, operation, divisor, test));
            // Go to next monkey.
            i += 2;
        }
        return monkeys;
    }
    input_converter.get_monkeys = get_monkeys;
})(input_converter = exports.input_converter || (exports.input_converter = {}));
//# sourceMappingURL=input_converter.js.map
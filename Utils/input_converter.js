"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.input_converter = void 0;
var input_converter;
(function (input_converter) {
    // Day 1:
    function get_calorie_list(input) {
        let outer_list = [];
        let inner_list = [];
        let lines = input.split(/\r?\n/g);
        for (let i = 0; i < lines.length; ++i) {
            if (lines[i] == '') {
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
            let parts = lines[i].split(' ');
            list.push({ 'opponents_move': parts[0], 'your_move': parts[1] });
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
                "first_compartment": lines[i].substring(0, lines[i].length / 2),
                "second_compartment": lines[i].substring(lines[i].length / 2)
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
            let splits = lines[i].split(',');
            let left_elf = splits[0].split('-');
            let right_elf = splits[1].split('-');
            // Define some type safe dictionaries to store the range information.
            let left_range = {
                "min": parseInt(left_elf[0]),
                "max": parseInt(left_elf[1])
            };
            let right_range = {
                "min": parseInt(right_elf[0]),
                "max": parseInt(right_elf[1])
            };
            let range = {
                "left": left_range,
                "right": right_range
            };
            ranges.push(range);
        }
        return ranges;
    }
    input_converter.get_camp_ranges = get_camp_ranges;
})(input_converter = exports.input_converter || (exports.input_converter = {}));
//# sourceMappingURL=input_converter.js.map
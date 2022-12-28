"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const file_manager_1 = require("../Utils/file_manager");
const input_converter_1 = require("../Utils/input_converter");
// Get your input and convert it into a list of commands.
let input = file_manager_1.file_manager.get_input_from_file(__dirname + '\\input.txt');
let tree = input_converter_1.input_converter.get_directory_tree(input);
// First we need to get the sizes of all directories by recursing the tree.
let directory_sizes = {};
recurse(tree, '');
// Next we'll add them until we hit our cap; 100000.
let total_size = 0;
let size_limit = 100000;
for (let key in directory_sizes) {
    if (directory_sizes[key] <= size_limit) {
        total_size += directory_sizes[key];
    }
}
// We now need to find how much space we need to free up.
let system_size = 70000000;
let required_size = 30000000;
let free_space = system_size - directory_sizes['/'];
let required_free_space = required_size - free_space;
// What is the smallest directory that will free up enough space?
let min_delta = free_space; // Just some big number.
let smallest_compatible_directory_size = 0;
for (let key in directory_sizes) {
    let delta = directory_sizes[key] - required_free_space;
    if (delta >= 0 && delta < min_delta) {
        min_delta = delta;
        smallest_compatible_directory_size = directory_sizes[key];
    }
}
function recurse(branch, current_branch) {
    // Start looping through the branches and keep track of the directory size.
    let size = 0;
    for (let key in branch) {
        if (typeof (branch[key]) == "number") {
            // This is a file.
            size += branch[key];
        }
        else {
            // This is a branch.
            size += recurse(branch[key], current_branch.length < 2 ?
                current_branch + key :
                current_branch + '/' + key);
        }
    }
    // We've done looping for this branch, so add the total size to the list.
    directory_sizes[current_branch] = size;
    return size;
}
// Task 1:
console.log(total_size);
// Task 2:
console.log(smallest_compatible_directory_size);
//# sourceMappingURL=main.js.map
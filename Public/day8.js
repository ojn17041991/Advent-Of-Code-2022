"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const file_manager_1 = require("./Utils/file_manager");
const input_converter_1 = require("./Utils/input_converter");
// Get your input and convert it into a 2D array of tree values.
let input = file_manager_1.file_manager.get_input_from_file(__filename);
let grid = input_converter_1.input_converter.get_tree_grid(input);
// To calculate the total number of visible trees.
let total_visible = 0;
// To calculate the highest scenic score.
let highest_scenic_score = 0;
// The outer-most trees are always visible, so get their positions now.
let width = grid[0].length;
let height = grid.length;
for (let i = 0; i < grid.length; ++i) {
    for (let j = 0; j < grid[i].length; ++j) {
        // Outside edge of the grid.
        if (i == 0 || i == height || j == 0 || j == width) {
            total_visible += 1;
            continue;
        }
        // Get the current tree.
        let current_tree = grid[i][j];
        // Check if the current tree is visible from the top.
        let visible_top = true;
        let trees_visible_top = 0;
        for (let y = i - 1; y >= 0; --y) {
            trees_visible_top += 1;
            if (grid[y][j] >= current_tree) {
                visible_top = false;
                break;
            }
        }
        // Check if the current tree is visible from the bottom.
        let visible_bottom = true;
        let trees_visible_bottom = 0;
        for (let y = i + 1; y < height; ++y) {
            trees_visible_bottom += 1;
            if (grid[y][j] >= current_tree) {
                visible_bottom = false;
                break;
            }
        }
        // Check if the current tree is visible from the left.
        let visible_left = true;
        let trees_visible_left = 0;
        for (let x = j - 1; x >= 0; --x) {
            trees_visible_left += 1;
            if (grid[i][x] >= current_tree) {
                visible_left = false;
                break;
            }
        }
        // Check if the current tree is visible from the right.
        let visible_right = true;
        let trees_visible_right = 0;
        for (let x = j + 1; x < width; ++x) {
            trees_visible_right += 1;
            if (grid[i][x] >= current_tree) {
                visible_right = false;
                break;
            }
        }
        // Increase the counter if the tree is visible in any direction.
        if (visible_top || visible_bottom || visible_left || visible_right) {
            total_visible += 1;
        }
        // Get scenic score for tree.
        let scenic_score = trees_visible_top *
            trees_visible_bottom *
            trees_visible_left *
            trees_visible_right;
        if (scenic_score > highest_scenic_score) {
            highest_scenic_score = scenic_score;
        }
    }
}
// Task 1:
console.log(total_visible);
// Task 2:
console.log(highest_scenic_score);
//# sourceMappingURL=day8.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vector_1 = require("./Classes/vector");
const file_manager_1 = require("./Utils/file_manager");
const input_converter_1 = require("./Utils/input_converter");
const day_specific_helper_1 = require("./Utils/day_specific_helper");
let input = file_manager_1.file_manager.get_input_from_file(__filename);
let cave = input_converter_1.input_converter.draw_cave(input);
var sand_origin_vector = new vector_1.Vector(2500 + 500, 0); // Adding 2500 to create enough space for the sand to fill the cave.
var limit_y = day_specific_helper_1.day_14_helper.get_lowest_cave_point(cave);
var num_sand_particles = 0;
var sand_is_overflowing = false;
var sand_is_blocked = false;
while (!(sand_is_overflowing || sand_is_blocked)) {
    let sand_particle = new vector_1.Vector(sand_origin_vector.x, sand_origin_vector.y);
    let sand_is_moving = true;
    ++num_sand_particles;
    while (sand_is_moving) {
        if (cave[sand_particle.y + 1][sand_particle.x] == ".") {
            // Free directly below.
            sand_particle.y++;
        }
        else {
            if (cave[sand_particle.y + 1][sand_particle.x - 1] == ".") {
                // Free down and left.
                sand_particle.x--;
                sand_particle.y++;
            }
            else if (cave[sand_particle.y + 1][sand_particle.x + 1] == ".") {
                // Free down and right.
                sand_particle.x++;
                sand_particle.y++;
            }
            else {
                // No free space below.
                cave[sand_particle.y][sand_particle.x] = "o";
                sand_is_moving = false;
                if (num_sand_particles % 1000 == 0) {
                    //file_manager.save_2d_array_to_file(cave, "day14_output_current");
                }
            }
        }
        // Task 1:
        // if (sand_particle.y > limit_y) {
        //   sand_is_overflowing = true;
        //   sand_is_moving = false;
        //   --num_sand_particles;
        // }
    }
    // Task 2:
    if (sand_particle.x == sand_origin_vector.x &&
        sand_particle.y == sand_origin_vector.y) {
        file_manager_1.file_manager.save_2d_array_to_file(cave, "day14_output_current");
        sand_is_blocked = true;
    }
}
console.log(num_sand_particles);
//# sourceMappingURL=day14.js.map
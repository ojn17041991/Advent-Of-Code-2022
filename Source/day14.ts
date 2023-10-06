import { Vector } from "./Classes/vector";
import { file_manager } from "./Utils/file_manager";
import { input_converter } from "./Utils/input_converter";
import { day_14_helper } from "./Utils/day_specific_helper";

let input: string = file_manager.get_input_from_file(__filename);
let cave: string[][] = input_converter.draw_cave(input);

var sand_origin_vector: Vector = new Vector(2500 + 500, 0); // Adding 2500 to create enough space for the sand to fill the cave.
var limit_y: number = day_14_helper.get_lowest_cave_point(cave);

var num_sand_particles: number = 0;
var sand_is_overflowing: boolean = false;
var sand_is_blocked: boolean = false;
while (!(sand_is_overflowing || sand_is_blocked)) {
  let sand_particle: Vector = new Vector(
    sand_origin_vector.x,
    sand_origin_vector.y
  );
  let sand_is_moving: boolean = true;
  ++num_sand_particles;

  while (sand_is_moving) {
    if (cave[sand_particle.y + 1][sand_particle.x] == ".") {
      // Free directly below.
      sand_particle.y++;
    } else {
      if (cave[sand_particle.y + 1][sand_particle.x - 1] == ".") {
        // Free down and left.
        sand_particle.x--;
        sand_particle.y++;
      } else if (cave[sand_particle.y + 1][sand_particle.x + 1] == ".") {
        // Free down and right.
        sand_particle.x++;
        sand_particle.y++;
      } else {
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
  if (
    sand_particle.x == sand_origin_vector.x &&
    sand_particle.y == sand_origin_vector.y
  ) {
    file_manager.save_2d_array_to_file(cave, "day14_output_current");
    sand_is_blocked = true;
  }
}

console.log(num_sand_particles);

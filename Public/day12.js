"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const a_star_1 = require("./Utils/a_star");
const file_manager_1 = require("./Utils/file_manager");
const input_converter_1 = require("./Utils/input_converter");
let input = file_manager_1.file_manager.get_input_from_file(__filename);
let heightmap = input_converter_1.input_converter.get_heightmap(input);
// Task 1
let start_node = heightmap
    .map((row) => row.map((node) => node))
    .flat()
    .find((node) => node.char === "S");
start_node.char = "a";
let end_node = heightmap
    .map((row) => row.map((node) => node))
    .flat()
    .find((node) => node.char === "E");
end_node.char = "z";
let path = a_star_1.a_star.run(heightmap, start_node, end_node);
console.log(path.length);
// Task 2
let min_steps = a_star_1.a_star.find_shortest_start_node(heightmap, end_node);
console.log(min_steps);
//# sourceMappingURL=day12.js.map
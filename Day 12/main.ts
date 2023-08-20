import { AStarNode } from "../Utils/Classes/a_star_node";
import { a_star } from "../Utils/a_star";
import { file_manager } from "../Utils/file_manager";
import { input_converter } from "../Utils/input_converter";

let input: string = file_manager.get_input_from_file(__dirname + "\\input.txt");
let heightmap: AStarNode[][] = input_converter.get_heightmap(input);

// Task 1
let start_node: AStarNode = heightmap
  .map((row) => row.map((node) => node))
  .flat()
  .find((node) => node.char === "S");
start_node.char = "a";
let end_node: AStarNode = heightmap
  .map((row) => row.map((node) => node))
  .flat()
  .find((node) => node.char === "E");
end_node.char = "z";

let path: AStarNode[] = a_star.run(heightmap, start_node, end_node);

console.log(path.length);

// Task 2
let min_steps: number = a_star.find_shortest_start_node(heightmap, end_node);

console.log(min_steps);

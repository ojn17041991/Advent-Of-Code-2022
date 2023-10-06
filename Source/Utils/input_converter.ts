import { Monkey } from "../Classes/monkey";
import { AStarNode } from "../Classes/a_star_node";
import { Vector } from "../Classes/vector";
import * as fs from "fs";
import * as helper from "./day_specific_helper";

export module input_converter {
  // Generic:
  function get_basic_list(input: string): string[] {
    return input.split(/\r?\n/g);
  }

  // Day 1:
  export function get_calorie_list(input: string): number[][] {
    let outer_list: number[][] = [];
    let inner_list: number[] = [];

    let lines: string[] = input.split(/\r?\n/g);
    for (let i = 0; i < lines.length; ++i) {
      if (lines[i] == "") {
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
    let list: object[] = [];

    let lines: string[] = input.split(/\r?\n/g);
    for (let i = 0; i < lines.length; ++i) {
      let parts: string[] = lines[i].split(" ");
      list.push({ opponents_move: parts[0], your_move: parts[1] });
    }

    return list;
  }

  // Day 3.1:
  export function get_backpack_list_compartments(input: string): object[] {
    let list: object[] = [];

    let lines: string[] = input.split(/\r?\n/g);
    for (let i = 0; i < lines.length; ++i) {
      list.push({
        first_compartment: lines[i].substring(0, lines[i].length / 2),
        second_compartment: lines[i].substring(lines[i].length / 2),
      });
    }

    return list;
  }

  // Day 3.2:
  export function get_backpack_list_for_groups(input: string): object[][] {
    let list: object[][] = [];
    let lines: string[] = input.split(/\r?\n/g);

    // Foreach block of 3 lines.
    for (let i = 0; i < lines.length; i += 3) {
      let block: object[] = [];

      // Foreach line in the block.
      for (let j = 0; j < 3; ++j) {
        let dict: object = {};

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

  // Day 4:
  export function get_camp_ranges(input: string): object[] {
    let ranges: object[] = [];
    let lines: string[] = input.split(/\r?\n/g);

    for (let i = 0; i < lines.length; ++i) {
      // Split each line on , to get the ranges for the left/right elves.
      // Then split each range on - to get the min/max.
      let splits: string[] = lines[i].split(",");
      let left_elf: string[] = splits[0].split("-");
      let right_elf: string[] = splits[1].split("-");

      // Define some type safe dictionaries to store the range information.
      let left_range: { [key: string]: number } = {
        min: parseInt(left_elf[0]),
        max: parseInt(left_elf[1]),
      };
      let right_range: { [key: string]: number } = {
        min: parseInt(right_elf[0]),
        max: parseInt(right_elf[1]),
      };
      let range: { [key: string]: object } = {
        left: left_range,
        right: right_range,
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
    let moves: object[] = [];

    // Get the second section and split into lines.
    let section: string = get_input_section(input, 1);
    let lines: string[] = section.split(/\r?\n/g);

    // Search strings.
    let move_str: string = "move ";
    let from_str: string = "from ";
    let to_str: string = "to ";

    for (let i = 0; i < lines.length; ++i) {
      // String location indexes.
      let move_loc: number = lines[i].indexOf(move_str);
      let from_loc: number = lines[i].indexOf(from_str);
      let to_loc: number = lines[i].indexOf(to_str);

      // Values.
      let num: number = parseInt(
        lines[i].substring(move_loc + move_str.length, from_loc)
      );
      let from: number = parseInt(
        lines[i].substring(from_loc + from_str.length, to_loc)
      );
      let to: number = parseInt(lines[i].substring(to_loc + to_str.length));

      let move: { [key: string]: number } = {
        num: num,
        from: from,
        to: to,
      };
      moves.push(move);
    }

    return moves;
  }

  // Day 6 - Not required.

  // Day 7:
  export function get_directory_tree(input: string): { [key: string]: any } {
    // Recursive function to populate the dictionary as we loop.
    function recurse(
      tree: { [key: string]: any },
      depth: number,
      size: number
    ): { [key: string]: any } {
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
      let components: string[] = commands[i].split(" ");
      if (components[0] == "$") {
        // Command.
        if (components[1] == "cd") {
          // cd - Update the current directory.
          if (components[2] == "..") {
            directory_stack.pop();
          } else {
            directory_stack.push(components[2]);

            // This is a new branch in the tree, so we'll add it to the existing structure recursively.
            output = recurse(output, 0, 0);
          }
        } else if (components[1] == "ls") {
          // ls - Doesn't affect placement in the tree, so continue.
          continue;
        }
      } else if (components[0] == "dir") {
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

  // Day 8:
  export function get_tree_grid(input: string): number[][] {
    let output: number[][] = [];

    // Get each line from the input.
    let lines: string[] = get_basic_list(input);
    for (let i = 0; i < lines.length; ++i) {
      // Add empty array to output for the current line.
      output.push([]);

      // Start looping over each character in the line.
      let line: string = lines[i];
      for (let j = 0; j < line.length; ++j) {
        // Convert the char to numeric and push it into the output array.
        let digit: number = parseInt(line[j]);
        output[i].push(digit);
      }
    }

    // All numbers are now in the array so return it.
    return output;
  }

  // Day 9:
  export function get_key_value_list(input: string): [string, number][] {
    let output: [string, number][] = [];

    let lines: string[] = get_basic_list(input);
    for (let i = 0; i < lines.length; ++i) {
      let components: string[] = lines[i].split(" ");
      let direction: string = components[0];
      let steps: number = +components[1];
      output.push([direction, steps]);
    }

    return output;
  }

  // Day 10 - Not required.

  // Day 11:
  export function get_monkeys(input: string): Monkey[] {
    const monkeys: Monkey[] = [];
    let lines: string[] = get_basic_list(input);
    for (let i = 0; i < lines.length; ) {
      // ID.
      let id: number = +lines[i].split(" ")[1].replace(":", "");
      ++i;

      // Items.
      let items: number[] = lines[i]
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
      let operator: string = operationComponents[0];
      let operationValue: string = operationComponents[1];
      let operand: number = +operationValue;
      let operation: Function = (x: number) => x;
      switch (operator) {
        case "+":
          operation = (x: number): number => x + operand;
          break;
        case "-":
          operation = (x: number): number => x - operand;
          break;
        case "*":
          operation = (x: number): number =>
            operationValue == "old" ? x ** 2 : x * operand;
          break;
        case "/":
          operation = (x: number): number => x / operand;
          break;
      }
      ++i;

      // Test.
      let divisor: number = +lines[i].split("by")[1];
      ++i;
      let trueRecipient: number = +lines[i].split("monkey")[1];
      ++i;
      let falseRecipient: number = +lines[i].split("monkey")[1];
      let test: Function = (x: number): number => {
        if (x % divisor == 0) {
          return trueRecipient;
        } else {
          return falseRecipient;
        }
      };

      // Add the monkey to the list.
      monkeys.push(new Monkey(id, items, operation, divisor, test));

      // Go to next monkey.
      i += 2;
    }

    return monkeys;
  }

  // Day 12:
  export function get_heightmap(input: string): AStarNode[][] {
    let output: AStarNode[][] = [];

    // Get each line from the input.
    let lines: string[] = get_basic_list(input);
    for (let i = 0; i < lines.length; ++i) {
      output.push([]);
      // Start looping over each character in the line.
      let line: string = lines[i];
      for (let j = 0; j < line.length; ++j) {
        output[i].push(new AStarNode(lines[i][j], j, i));
      }
    }

    // All numbers are now in the array so return it.
    return output;
  }

  // Day 13.1:
  export function get_distress_signal_packets(input: string): any[] {
    let packets: any[] = [];

    let lines: string[] = get_basic_list(input);
    for (let i = 3; i < lines.length; i += 3) {
      let packet_container: any[] = [];
      for (let j = 0; j < 2; ++j) {
        let packet: any[] = [];
        char_ptr = 0;
        recurse(lines[i + j], packet, false);
        packet_container.push(packet);
      }
      packets.push([packet_container]);
    }

    return packets;
  }

  // Day 13.2:
  export function get_distress_signal_packets_for_ordering(
    input: string
  ): any[] {
    let packets: any[] = [];

    let lines: string[] = get_basic_list(input);
    for (let i = 0; i < lines.length; i++) {
      if (lines[i] === "") continue;

      let packet: any[] = [];
      char_ptr = 0;
      recurse(lines[i], packet, false);
      packets.push(packet);
    }

    return packets;
  }

  let char_ptr: number = 0;
  function recurse(line: string, parent: any[], append: boolean): void {
    while (char_ptr < line.length) {
      let char: string = line[char_ptr];
      ++char_ptr;
      switch (char) {
        case "[":
          append = false;
          let child: any[] = [];
          parent.push(child);
          recurse(line, child, append);
          break;
        case "]":
          append = false;
          return;
        case ",":
          append = false;
          break;
        default:
          if (append) {
            parent[parent.length - 1] = +(
              "" +
              parent[parent.length - 1] +
              char
            );
          } else {
            parent.push(+char);
          }
          append = true;
          break;
      }
    }
  }

  // Day 14:
  export function draw_cave(input: string): string[][] {
    // Draw a blank cave.
    let cave: string[][] = [];
    for (let i = 0; i < 1000; ++i) {
      cave.push([]);
      for (let j = 0; j < 5000; ++j) {
        cave[i].push(".");
      }
    }

    // Break down the input and draw lines.
    let lines: string[] = get_basic_list(input);
    for (let i = 0; i < lines.length; ++i) {
      let vectors: string[] = lines[i].split(" -> ");
      for (let j = 0; j < vectors.length; ++j) {
        if (j < vectors.length - 1) {
          var v: Vector = get_vector(vectors[j]);
          // If there is a second vector, draw the line.
          let v2: Vector = get_vector(vectors[j + 1]);
          // Assuming right now that there are no diagonal lines to draw.
          if (v.x != v2.x) {
            for (let k = Math.min(v.x, v2.x); k <= Math.max(v.x, v2.x); ++k) {
              cave[v.y][k + 2500] = "#";
            }
          } else if (v.y != v2.y) {
            for (let k = Math.min(v.y, v2.y); k <= Math.max(v.y, v2.y); ++k) {
              cave[k][v.x + 2500] = "#";
            }
          }
        }
      }
    }

    // Find the bottom.
    var limit_y: number = helper.day_14_helper.get_lowest_cave_point(cave);
    // remove all rows above limit_y from cave
    cave = cave.slice(0, limit_y + 3);

    // Create the floor.
    for (let i = 0; i < cave[cave.length - 1].length; ++i) {
      cave[cave.length - 1][i] = "#";
    }

    // var cave_str: string = cave.map((row) => row.join("")).join("\n");
    // fs.writeFileSync(
    //   "C:\\Users\\Oliver\\source\\repos\\Advent-Of-Code-2022\\Outputs\\day14_output.txt",
    //   cave_str
    // );

    return cave;
  }

  function get_vector(input: string): Vector {
    let components: string[] = input.split(",");
    return new Vector(+components[0], +components[1]);
  }
}

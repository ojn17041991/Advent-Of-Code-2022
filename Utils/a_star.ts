import { AStarNode } from "./Classes/a_star_node";

export module a_star {
  export function run(
    nodes: AStarNode[][],
    start_node: AStarNode,
    end_node: AStarNode
  ): AStarNode[] {
    let end_found: boolean = false;
    let steps: number[][] = [
      [-1, 0],
      [0, -1],
      [1, 0],
      [0, 1],
    ];
    start_node.closed = true;
    let cur_node: AStarNode = start_node;
    let outer_i: number = 0;

    while (outer_i < 6000) {
      for (let i = 0; i < steps.length; ++i) {
        // skip if the next tile is out of bounds
        let next_x: number = cur_node.x + steps[i][0];
        let next_y: number = cur_node.y + steps[i][1];
        if (next_x < 0 || next_x > nodes[0].length - 1) {
          continue;
        }
        if (next_y < 0 || next_y > nodes.length - 1) {
          continue;
        }
        // skip if the next tile is too high
        let next_node: AStarNode = nodes[next_y][next_x];
        if (!node_is_accessible(cur_node, next_node)) {
          continue;
        }
        // skip if the next node is open or closed
        if (next_node.open || next_node.closed) {
          continue;
        }
        // calculate the node values
        next_node.g = distance_between_nodes(next_node, start_node);
        next_node.h = distance_between_nodes(next_node, end_node);
        next_node.open = true;
        next_node.predecessor = cur_node;
        next_node.steps_taken = cur_node.steps_taken + 1;
        next_node.f = next_node.g + next_node.h + next_node.steps_taken * 100;
        // check if the next node is the end node
        if (next_node === end_node) {
          end_found = true;
          break;
        }
      }

      if (end_found) {
        let path: AStarNode[] = [];
        let cur_back_node = end_node;
        let inner_i: number = 0;

        while (inner_i < 1000) {
          //cur_back_node.char = ".";
          path.push(cur_back_node);
          cur_back_node = cur_back_node.predecessor;
          if (cur_back_node === start_node) {
            return path;
          }
          ++inner_i;
        }
      } else {
        // get the lowest f value of the open nodes
        let lowest_f_node: AStarNode;
        let lowest_f: number = Number.MAX_SAFE_INTEGER;
        for (let i = 0; i < nodes.length; ++i) {
          for (let j = 0; j < nodes[i].length; ++j) {
            let node: AStarNode = nodes[i][j];
            if (!node) {
              continue;
            }
            if (node.open) {
              if (
                node.f < lowest_f ||
                (node.f == lowest_f && node.g < lowest_f_node.g)
              ) {
                lowest_f = node.f;
                lowest_f_node = node;
              }
            }
          }
        }
        cur_node = lowest_f_node;
        if (!cur_node) {
          continue;
        }
        cur_node.open = false;
        cur_node.closed = true;
        ++outer_i;
      }
    }

    return [];
  }

  export function find_shortest_start_node(
    nodes: AStarNode[][],
    end_node: AStarNode
  ): number {
    let steps: number[][] = [
      [-1, 0],
      [0, -1],
      [1, 0],
      [0, 1],
    ];
    let shortest_start_node_distance: number = Number.MAX_SAFE_INTEGER;
    let elligible_start_nodes: AStarNode[] = [];

    for (let i = 0; i < nodes.length; ++i) {
      for (let j = 0; j < nodes[i].length; ++j) {
        let node: AStarNode = nodes[i][j];
        if (node.char === "a") {
          for (let k = 0; k < steps.length; ++k) {
            let next_x: number = node.x + steps[k][0];
            let next_y: number = node.y + steps[k][1];
            if (next_x < 0 || next_x > nodes[0].length - 1) {
              continue;
            }
            if (next_y < 0 || next_y > nodes.length - 1) {
              continue;
            }
            let next_node: AStarNode = nodes[next_y][next_x];
            if (next_node.char === "b") {
              reset_nodes(nodes);
              let path: AStarNode[] = run(nodes, node, end_node);
              if (path.length < shortest_start_node_distance) {
                shortest_start_node_distance = path.length;
              }
              elligible_start_nodes.push(node);
              break;
            }
          }
        }
      }
    }
    return shortest_start_node_distance;
  }

  function distance_between_nodes(a: AStarNode, b: AStarNode): number {
    //return pythagoras(Math.abs(a.x - b.x), Math.abs(a.y - b.y));
    // return the difference in x + the difference in y
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
  }

  function pythagoras(a: number, b: number): number {
    return Math.sqrt(a * a + b * b);
  }

  function nodes_are_adjacent(a: AStarNode, b: AStarNode): boolean {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y) == 1;
  }

  function node_is_accessible(
    cur_node: AStarNode,
    next_node: AStarNode
  ): boolean {
    return next_node.char.charCodeAt(0) - cur_node.char.charCodeAt(0) <= 1;
  }

  function reset_nodes(nodes: AStarNode[][]): void {
    for (let i = 0; i < nodes.length; ++i) {
      for (let j = 0; j < nodes[i].length; ++j) {
        let node: AStarNode = nodes[i][j];
        if (!node) {
          continue;
        }
        node.f = Number.MAX_SAFE_INTEGER;
        node.g = 0;
        node.h = 1;
        node.predecessor = null;
        node.open = false;
        node.closed = false;
        node.steps_taken = 0;
      }
    }
  }
}

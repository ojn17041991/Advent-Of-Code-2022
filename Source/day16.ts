import { Partner } from "./Classes/partner";
import { Valve } from "./Classes/valve";
import { file_manager } from "./Utils/file_manager";
import { input_converter } from "./Utils/input_converter";

let input: string = file_manager.get_input_from_file(__filename);
let valves: Valve[] = input_converter.get_valves(input);

// Task 1:
// let complete_path: string = "AA";
// let cur_min_option: number = 999999999;
// let options: string[] = [];
// let cur_max_heuristic: number = 0;
// let best_options: string[] = [];
// let current_valve: Valve = valves.find((valve: Valve) => valve.name === "AA");
// let steps_taken: number = 0;
// let total_fr: number = 0;

// while (steps_taken < 30) {
//   best_options = [];
//   cur_max_heuristic = 0;

//   // find the best path
//   for (let i = 0; i < valves.length; i++) {
//     if (
//       valves[i] != current_valve &&
//       !valves[i].is_open &&
//       valves[i].flow_rate > 0
//     ) {
//       // calculate distance to current valve
//       let target_valve: Valve = valves[i];
//       cur_min_option = 999999999;
//       options = [];
//       recurse("", 0, target_valve, current_valve);

//       if (options.length > 0) {
//         let heuristic: number = calculate_heuristic(target_valve);
//         if (heuristic > cur_max_heuristic) {
//           best_options = []; // We have a better option
//         }
//         if (heuristic >= cur_max_heuristic) {
//           best_options = best_options.concat(options); // there can be multiple options, but I don't know which one is the best
//           cur_max_heuristic = heuristic;
//         }
//       }
//     }
//   }

//   // start stepping over the path
//   let path: string[] = [];
//   if (best_options.length > 0) {
//     let path_segment: string = best_options[0].substring(3);
//     path = path_segment.split(",").filter((h: string) => h != "");
//   } else {
//     for (let i = 0; i < 30 - steps_taken; ++i) {
//       path.push("-");
//     }
//   }

//   for (let i = 0; i < path.length; i++) {
//     if (steps_taken == 30) {
//       break;
//     }
//     complete_path += "," + path[i];
//     steps_taken++;
//   }

//   if (steps_taken == 30) {
//     break;
//   }

//   // we've reached the end of the path, so we can open the last valve
//   let path_end_valve: Valve = valves.find(
//     (valve: Valve) => valve.name === path[path.length - 1]
//   );
//   current_valve = path_end_valve;
//   current_valve.is_open = true;
//   complete_path += ",open";
//   steps_taken++;
// }

// for (let i = 0; i < valves.length; i++) {
//   valves[i].is_open = false;
// }

// // we have a complete path now, so we can calculate the total flow rate
// let complete_path_steps: string[] = complete_path.split(",");
// for (let i = 1; i < complete_path_steps.length; i++) {
//   for (let j = 0; j < valves.length; j++) {
//     if (valves[j].is_open) {
//       total_fr += valves[j].flow_rate;
//     }
//     if (complete_path_steps[i] == "open") {
//       if (valves[j].name == complete_path_steps[i - 1]) {
//         valves[j].is_open = true;
//       }
//     }
//   }
// }

// function recurse(
//   path: string,
//   steps: number,
//   target_valve: Valve,
//   valve: Valve
// ): void {
//   path = path + "," + valve.name;
//   steps++;
//   if (steps > cur_min_option || steps > 10) {
//     return;
//   }
//   if (valve.name == target_valve.name) {
//     if (steps < cur_min_option) {
//       options = []; // We've found a better option, so we can clear all the existing options
//     }
//     cur_min_option = steps;
//     options.push(path); // You may end up with ties.
//   }
//   for (let i = 0; i < valve.connected_valves.length; i++) {
//     recurse(path, steps, target_valve, valve.connected_valves[i]);
//   }
// }

// function calculate_heuristic(valve: Valve): number {
//   return valve.flow_rate / Math.pow(cur_min_option, 2);
// }

//console.log(total_fr);

// Task 2:
let total_minutes: number = 26;
let initial_valve: Valve = valves.find((valve: Valve) => valve.name === "AA");

// Get a list of all valves with a value.
let valves_with_flow_rate: Valve[] = valves.filter(
  (v: Valve) => v.flow_rate > 0
);

// Add starting valve to list so we can pre-calculate all the step counts from the very beginning.
valves_with_flow_rate.push(initial_valve);

for (let i = 0; i < valves_with_flow_rate.length; ++i) {
  for (let j = 0; j < valves_with_flow_rate.length; ++j) {
    let x: Valve = valves_with_flow_rate[i];
    let y: Valve = valves_with_flow_rate[j];

    if (x.name == y.name) {
      continue;
    }

    if (!(x.name in y.valve_steps)) {
      let fewest_required_steps: number = 999999999;

      function count_steps(a: Valve, b: Valve, steps: number = 0) {
        if (steps == 15) {
          return;
        }

        if (a.name == b.name) {
          if (steps < fewest_required_steps) {
            fewest_required_steps = steps;
          }
          return;
        }

        ++steps;

        for (let i = 0; i < a.connected_valves.length; ++i) {
          count_steps(a.connected_valves[i], b, steps);
        }
      }

      count_steps(x, y);

      x.valve_steps[y.name] = fewest_required_steps;
      y.valve_steps[x.name] = fewest_required_steps;
    }
  }
}

// Get a list of all permutations that can be completed within 26 steps.
let permutations: Valve[][] = [];
function permute(arr: Valve[], m: Valve[], cur_steps: number = 0) {
  if (arr.length === 0) {
    permutations.push(m);
  } else {
    for (let i = 0; i < arr.length; i++) {
      let curr = arr.slice();
      let next = curr.splice(i, 1);
      let prev = m.length == 0 ? initial_valve : m[m.length - 1];
      let n = m.concat(next);

      // Figure out how long it takes to step from prev to next.
      // NOTE: On first pass, prev will be AA.
      if (cur_steps + prev.valve_steps[next[0].name] >= total_minutes) {
        permutations.push(n);
      } else {
        permute(curr.slice(), n, cur_steps + prev.valve_steps[next[0].name]);
      }
    }
  }
}

// Remove AA from the array here.
valves_with_flow_rate.splice(valves_with_flow_rate.length - 1, 1);

permute(valves_with_flow_rate, []);

let totals: [number, string[]][] = [];

for (let i = 0; i < permutations.length; ++i) {
  let total_flow_rate: number = 0;
  for (let j = 0; j < valves_with_flow_rate.length; ++j) {
    valves_with_flow_rate[j].is_open = false;
  }

  let path: Valve[] = permutations[i];
  if (path[0].name != "AA") {
    path.unshift(initial_valve);
  }
  let path_idx: number = 0;
  let turns_on_current_step: number = 0;

  for (let m = 1; m <= total_minutes; ++m) {
    // Increase the total flow rate.
    for (let k = 0; k < valves_with_flow_rate.length; ++k) {
      if (valves_with_flow_rate[k].is_open) {
        total_flow_rate += valves_with_flow_rate[k].flow_rate;
      }
    }

    // Check if the timer has expired.
    if (m == total_minutes) {
      break;
    }

    // How far to the next valve?
    let next_steps: number =
      path.length == path_idx + 1
        ? 999999999
        : path[path_idx].valve_steps[path[path_idx + 1].name];
    if (next_steps == turns_on_current_step) {
      // Time to open this valve and get the next one.
      valves_with_flow_rate.find(
        (v: Valve) => v.name == path[path_idx + 1].name
      ).is_open = true;
      path_idx += 1;
      turns_on_current_step = 0;
    } else {
      // Not arrived yet.
      turns_on_current_step += 1;
    }
  }

  if (path[0].name == "AA") {
    path.shift();
  }

  totals.push([total_flow_rate, permutations[i].map((x: Valve) => x.name)]);
}

let outer_max: number = 100;
let inner_max: number = 1000000;
let highest_totals: [number, string[]][] = totals
  .sort((a, b) => b[0] - a[0])
  .slice(0, inner_max);

let best_combination_total: number = 0;
for (let i = 0; i < outer_max; ++i) {
  for (let j = 0; j < highest_totals.length; ++j) {
    if (
      highest_totals[i][1].some((x: string) => highest_totals[j][1].includes(x))
    ) {
      continue;
    }
    let combination_total: number = highest_totals[i][0] + highest_totals[j][0];
    if (combination_total > best_combination_total) {
      best_combination_total = combination_total;
    }
  }
}

console.log(best_combination_total);

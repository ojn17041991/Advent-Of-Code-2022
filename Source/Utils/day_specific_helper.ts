export module day_3_helper {
  export function get_score_from_char(s: string, i: number): number {
    let matched_char_code: number = s.charCodeAt(i);
    if (matched_char_code >= 65 && matched_char_code <= 90) {
      return matched_char_code - 38;
    } else if (matched_char_code >= 97 && matched_char_code <= 122) {
      return matched_char_code - 96;
    }
  }
}

export module day_9_helper {
  export function is_within_vicinity(
    hPos: [number, number],
    tPos: [number, number]
  ): boolean {
    return (
      hPos[0] >= tPos[0] - 1 &&
      hPos[0] <= tPos[0] + 1 &&
      hPos[1] >= tPos[1] - 1 &&
      hPos[1] <= tPos[1] + 1
    );
  }

  export function get_step_value(dir: string): [number, number] {
    switch (dir) {
      case "U":
        return [0, -1];
      case "D":
        return [0, 1];
      case "L":
        return [-1, 0];
      case "R":
        return [1, 0];
    }
  }
}

export module day_14_helper {
  export function get_lowest_cave_point(cave: string[][]): number {
    var limit_y: number = 0;
    for (let i = 0; i < cave.length; i++) {
      for (let j = 0; j < cave[i].length; j++) {
        if (cave[i][j] == "#") {
          limit_y = Math.max(i, limit_y);
        }
      }
    }
    return limit_y;
  }
}

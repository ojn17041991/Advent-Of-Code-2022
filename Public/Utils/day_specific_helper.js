"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.day_14_helper = exports.day_9_helper = exports.day_3_helper = void 0;
var day_3_helper;
(function (day_3_helper) {
    function get_score_from_char(s, i) {
        let matched_char_code = s.charCodeAt(i);
        if (matched_char_code >= 65 && matched_char_code <= 90) {
            return matched_char_code - 38;
        }
        else if (matched_char_code >= 97 && matched_char_code <= 122) {
            return matched_char_code - 96;
        }
    }
    day_3_helper.get_score_from_char = get_score_from_char;
})(day_3_helper = exports.day_3_helper || (exports.day_3_helper = {}));
var day_9_helper;
(function (day_9_helper) {
    function is_within_vicinity(hPos, tPos) {
        return (hPos[0] >= tPos[0] - 1 &&
            hPos[0] <= tPos[0] + 1 &&
            hPos[1] >= tPos[1] - 1 &&
            hPos[1] <= tPos[1] + 1);
    }
    day_9_helper.is_within_vicinity = is_within_vicinity;
    function get_step_value(dir) {
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
    day_9_helper.get_step_value = get_step_value;
})(day_9_helper = exports.day_9_helper || (exports.day_9_helper = {}));
var day_14_helper;
(function (day_14_helper) {
    function get_lowest_cave_point(cave) {
        var limit_y = 0;
        for (let i = 0; i < cave.length; i++) {
            for (let j = 0; j < cave[i].length; j++) {
                if (cave[i][j] == "#") {
                    limit_y = Math.max(i, limit_y);
                }
            }
        }
        return limit_y;
    }
    day_14_helper.get_lowest_cave_point = get_lowest_cave_point;
})(day_14_helper = exports.day_14_helper || (exports.day_14_helper = {}));
//# sourceMappingURL=day_specific_helper.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.day_3_helper = void 0;
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
//# sourceMappingURL=day_specific_helper.js.map
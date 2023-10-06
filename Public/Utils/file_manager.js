"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.file_manager = void 0;
const fs = require("fs");
var file_manager;
(function (file_manager) {
    function get_file_name_no_extension(path) {
        return path.replace(/^.*[\\\/]/, "").replace(/\.[^/.]+$/, "");
    }
    function get_input_from_file(file_path) {
        let input_path = __dirname.split("\\Public\\")[0] +
            "\\Inputs\\" +
            get_file_name_no_extension(file_path) +
            "_input.txt";
        try {
            return fs.readFileSync(input_path, "utf-8");
        }
        catch (_a) {
            console.log("Error reading file: " + input_path);
            return "";
        }
    }
    file_manager.get_input_from_file = get_input_from_file;
    function save_2d_array_to_file(input, file_name) {
        var str = input.map((row) => row.join("")).join("\n");
        fs.writeFileSync("C:\\Users\\Oliver\\source\\repos\\Advent-Of-Code-2022\\Outputs\\" +
            file_name +
            ".txt", str);
    }
    file_manager.save_2d_array_to_file = save_2d_array_to_file;
})(file_manager = exports.file_manager || (exports.file_manager = {}));
//# sourceMappingURL=file_manager.js.map
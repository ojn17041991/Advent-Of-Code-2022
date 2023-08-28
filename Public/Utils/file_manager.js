"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.file_manager = void 0;
const fs_1 = require("fs");
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
            return (0, fs_1.readFileSync)(input_path, "utf-8");
        }
        catch (_a) {
            console.log("Error reading file: " + input_path);
            return "";
        }
    }
    file_manager.get_input_from_file = get_input_from_file;
})(file_manager = exports.file_manager || (exports.file_manager = {}));
//# sourceMappingURL=file_manager.js.map
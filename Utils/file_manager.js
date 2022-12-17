"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.file_manager = void 0;
const fs_1 = require("fs");
var file_manager;
(function (file_manager) {
    function get_input_from_file(path) {
        return (0, fs_1.readFileSync)(path, 'utf-8');
    }
    file_manager.get_input_from_file = get_input_from_file;
})(file_manager = exports.file_manager || (exports.file_manager = {}));
//# sourceMappingURL=file_manager.js.map
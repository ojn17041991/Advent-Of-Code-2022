import * as fs from "fs";

export module file_manager {
  function get_file_name_no_extension(path: string): string {
    return path.replace(/^.*[\\\/]/, "").replace(/\.[^/.]+$/, "");
  }

  export function get_input_from_file(file_path: string): string {
    let input_path: string =
      __dirname.split("\\Public\\")[0] +
      "\\Inputs\\" +
      get_file_name_no_extension(file_path) +
      "_input.txt";
    try {
      return fs.readFileSync(input_path, "utf-8");
    } catch {
      console.log("Error reading file: " + input_path);
      return "";
    }
  }

  export function save_2d_array_to_file(
    input: string[][],
    file_name: string
  ): void {
    var str: string = input.map((row) => row.join("")).join("\n");
    fs.writeFileSync(
      "C:\\Users\\Oliver\\source\\repos\\Advent-Of-Code-2022\\Outputs\\" +
        file_name +
        ".txt",
      str
    );
  }

  export function save_string_to_file(input: string, file_name: string): void {
    fs.writeFileSync(
      "C:\\Users\\Oliver\\source\\repos\\Advent-Of-Code-2022\\Outputs\\" +
        file_name +
        ".txt",
      input
    );
  }
}

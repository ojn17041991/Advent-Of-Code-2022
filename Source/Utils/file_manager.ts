import { readFileSync } from "fs";

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
      return readFileSync(input_path, "utf-8");
    } catch {
      console.log("Error reading file: " + input_path);
      return "";
    }
  }
}

import { readFileSync } from 'fs';

export module file_manager {

    export function get_input_from_file(path: string): string {
        return readFileSync(path, 'utf-8');
    }

}
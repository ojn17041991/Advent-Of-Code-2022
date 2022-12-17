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
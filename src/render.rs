/// Creates html elements
pub fn create_html_element(tag_name: String, text: String) -> String {
    format!("
    <div>
        <{}>{}<{}/>
    </div>", tag_name, text, tag_name)
}

pub fn create_unordered_list(tag_name: String, text: String) -> String {
    format!("
        <ul>
            <{}>
                {}
            </{}>
        </ul>
    ", tag_name, text, tag_name)
}

/// Check if we are currently in a new line
pub fn is_new_line(c: char) -> bool {
    c == '\n'
}
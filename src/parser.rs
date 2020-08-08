/// Markdown parser
/// Contains the position and input fields.
/// * position
/// * input: the string on the current line we are parsing
///
/// We use the position property to find out where in our string we have white-space
/// and then we split our string into small token characters and parse each as we get
/// them.
///
/// If we find a string with a `#` sign, we wrap it in a `<h1>` tag.

use macroz::tostr;

struct Parser {
    position: usize,
    input: String,
}

impl Parser {

    /// Checks to see whether or not the position of the character we
    /// are reading is greater-than or equal to the actual string length
    fn end_of_line(&self) -> bool {
        self.position >= self.input.len()
    }

    /// Check to see if at te current position the input starts with a
    /// specific character
    fn starts_with(&self, s: &str) -> bool {
        self.input[self.position..].starts_with(s)
    }

    /// Outputs the character at the next position of iterator
    fn next_char(&self) -> char {
        self.input[self.position..].chars().next().unwrap()
    }

    /// Advances through our string and return the next position
    fn consume_char(&mut self) -> char {
        let mut iter = self.input[self.position..].char_indices();
        let (_, current_char) = iter.next().unwrap();
        let (next_position, _) = iter.next().unwrap_or((1, ' '));
        self.position += next_position;
        current_char
    }

    /// Output string if the character is not at end of line
    /// and pushes the next char to the result string
    fn consume_while<F>(&mut self, condition: F) -> String
    where
        F: Fn(char) -> bool,
    {
        let mut result = String::new();
        while !self.end_of_line() && condition(self.next_char()) {
            result.push(self.consume_char());
        }
        result
    }

    /// Consume white-space
    fn consume_whitespace(&mut self) {
        self.consume_while(char::is_whitespace);
    }
}

/// Creates html elements
fn create_html_element(tag_name: String, text: String) -> String {
    format!("<{}>{}<{}/>", tag_name, text, tag_name)
}

/// Check if we are currently in a new line
fn is_new_line(c: char) -> bool {
    c == '\n'
}

impl Parser {
    fn parse_lines(&mut self) -> String {
        let mut result = String::new();

        loop {
            self.consume_whitespace();

            if self.end_of_line() {
                break
            }

            result.push_str(&self.parse_line());
        }

        result
    }

    /// Parses text within a line
    /// Consumes all chars in a string until it hits a new line
    fn parse_text(&mut self) -> String {
        self.consume_while(|c| !is_new_line(c))
    }

    /// Specifically finds the characters we are looking for
    fn parse_line(&mut self) -> String {
        match self.next_char() {
            '#' => self.parse_title(),
            '-' => self.check_li_char(),
            '*' => self.check_li_char(),
            _ => self.parse_text(),
        }
    }

    /// Parsing the `#` sign to create a title
    fn parse_title(&mut self) -> String {
        let pound_sign = self.consume_while(|c| c == '#');
        self.consume_whitespace();
        let text = self.parse_text();

        create_html_element(format!("h{}", pound_sign.len()), text)
    }

    /// Parses the `-` sign to create a list
    fn parse_unordered_list(&mut self) -> String {
        self.consume_char();
        self.consume_whitespace();

        let text = self.parse_text();
        create_html_element(tostr!("li"), text)
    }

    /// Checks if character preceding `-` or `*` is whitespace or text
    /// to either parse to a `<li>` or just text
    fn check_li_char(&mut self) -> String {
        if char::is_whitespace(self.input[self.position + 1..].chars().next().unwrap()) {
            self.parse_unordered_list()
        } else {
            self.parse_text()
        }
    }
}
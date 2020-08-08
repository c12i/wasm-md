#[allow(dead_code)]
mod parser;

use wasm_bindgen::prelude::*;
use macroz::tostr;

#[wasm_bindgen]
/// Push string from JavaScript layer to Rust layer
pub fn parse(input: &str) -> String {
    let result = parser::parse(tostr!(input));
    result
}
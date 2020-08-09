#[allow(dead_code)]
mod parser;

use wasm_bindgen::prelude::*;
use macroz::tostr;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
/// Push string from JavaScript layer to Rust layer
pub fn parse(input: &str) -> String {
    let result = parser::parse(tostr!(input));
    result
}
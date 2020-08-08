// #![feature(proc_macro, wasm_custom_section, wasm_import_module)]
mod parser;

use wasm_bindgen::prelude::*;
use cfg_if::cfg_if;
use macroz::tostr;

#[wasm_bindgen]
/// Push string from JavaScript layer to Rust layer
pub fn parse(input: &str) -> String {
    let result = parser::parse((tostr!(input)));
    result
}
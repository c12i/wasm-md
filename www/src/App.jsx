import React, { useState } from "react";
import { parse } from "wasm_md";

import './App.scss';

const App = () => {
  const [text, setText] = useState("");
  const [output, setOutput] = useState("");

  const handleChange = (e) => {
    setText({searchField: e.target.value});
  }

  const handleClick = (text) => {
    setOutput(parse(text))
  }

  return (
  <div className='app'>
    <textarea id="markdown" onChange={handleChange} value={text}></textarea>
    <button id="parse" onClick={(text) => handleClick(text)}>Parse the Text</button>
    <div id="output">{output}</div>
  </div>
  )
};

export default App;

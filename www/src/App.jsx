import React, { useState } from "react";
const wasm = import("wasm_md");

import './App.scss';

const App = ({ parse }) => {
  const [text, setText] = useState("");
  const [output, setOutput] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);
  }

  const handleClick = (text) => {
    wasm.then(wasm => {
      setOutput(wasm.parse(text.toString()))
    })
  }

  return (
  <div className='app'>
    <textarea id="card" onChange={handleChange} value={text}></textarea>
    <button id="parse" onClick={(text) => handleClick(text)}>Parse the Text</button>
    <div id="card">{output}</div>
  </div>
  )
};

export default App;

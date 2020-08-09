import React, { useState } from "react";
const wasm = import("wasm_md");

import './App.scss';

const App = ({ parse }) => {
  const [text, setText] = useState("");
  const [output, setOutput] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);
    wasm.then(wasm => {
      setOutput(wasm.parse(text.toString()))
    })
  }

  return (
  <div className='app'>
    <h1>Wasm Markdown Preview</h1>
    <textarea className="input" onChange={handleChange} value={text} placeholder="Input"></textarea>
    <div className="output" dangerouslySetInnerHTML={{ __html: output }} />
  </div>
  )
};

export default App;

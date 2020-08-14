import React, { useState } from "react";
import styled from "styled-components";
const wasm = import("wasm_md");

import "./App.scss";

const Title = styled.h1`
  font-size: 40px;
  text-align: center;
  font-family: sans-serif;
`;

const App = () => {
  const [text, setText] = useState("");
  const [output, setOutput] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);
    wasm.then((wasm) => {
      setOutput(wasm.parse(text.toString()));
    });
  };

  return (
    <>
      <Title>Wasm Markdown Parser</Title>
      <div className="app">
        <textarea
          className="input"
          onChange={handleChange}
          value={text}
          placeholder="Write some markdown"
        ></textarea>
        <div className="output" dangerouslySetInnerHTML={{ __html: output }} />
      </div>
    </>
  );
};

export default App;

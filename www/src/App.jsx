import React, { useState } from "react";
import styled from "styled-components";
const wasm = import("wasm_md");

import "./App.scss";

const Title = styled.h1`
  font-size: 40px;
  text-align: center;
  font-family: sans-serif;
`;

const Footer = styled.footer`
  text-align: center;
  margin-top: 3rem;
  font-family: sans-serif;
  font-size: 14px;
`;

const ClearButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;

  .btn {
  align-items: center;
  font-family: 'Open Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  display: inline-block;
  padding: 6px 12px;
  margin-bottom: 0;
  font-size: 14px;
  font-weight: normal;
  line-height: 1.428571429;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: 4px;
  outline:0;

&:hover,
&:focus {
  text-decoration: none;
  outline:0;
}

  }
`;

const App = () => {
  const [text, setText] = useState("");
  const [output, setOutput] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);
    wasm.then((wasm) => {
      setOutput(wasm.parse(text.toString()));
    });
  }

  const clearScreen = () => {
    setText("");
    setOutput("")
  }

  return (
    <>
      <Title>Wasm Markdown Parser</Title>
      <ClearButton onClick={clearScreen}>
        <button className="btn">Clear</button>
      </ClearButton>
      <div className="app">
        <textarea
          className="input"
          onChange={(e) => handleChange(e)}
          value={text}
          placeholder="Write some markdown"
        ></textarea>
        <div className="output" dangerouslySetInnerHTML={{ __html: output }} />
      </div>
      <Footer>
        <a href="https://github.com/collinsmuriuki/wasm-md">Github</a>
      </Footer>
    </>
  );
};

export default App;

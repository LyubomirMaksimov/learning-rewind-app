import React, { useState } from "react";
import "./Example.css";

const Summary = ({ example }) => {
  const [copySuccess, setCopySuccess] = useState(false);

  const copyToClipboard = () => {
    const codeElement = document.querySelector(".code-container code");
    const textArea = document.createElement("textarea");
    textArea.value = codeElement.textContent;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    setCopySuccess(true);
    setTimeout(() => {
      setCopySuccess(false);
    }, 1500);
  };

  return (
    <div className="example">
      <h3>{example.name}</h3>
      <pre
        className="explanation"
        dangerouslySetInnerHTML={{ __html: example.explanation }}
      ></pre>
      <div className="code-container">
        <h4>Example:</h4>
        <code>{example.code}</code>
        <button
          onClick={copyToClipboard}
          className={copySuccess ? "copied" : ""}
        >
          {copySuccess ? "Copied!" : "Copy Code"}
        </button>
      </div>
    </div>
  );
};

export default Summary;

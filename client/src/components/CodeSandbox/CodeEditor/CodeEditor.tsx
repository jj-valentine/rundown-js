import React, { useState } from "react";
// import MonacoEditor from "@monaco-editor/react";

interface CodeEditorProps {
  bundleInputCode: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, code: string) => void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({ bundleInputCode }) => {
  const [codeInput, setCodeInput] = useState<string>("");

  const handleUpdatingInput = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const inputValue = e.target.value;
    if (!inputValue && inputValue === codeInput) return;
    setCodeInput(inputValue);
  };

  return (
    <div className="code-editor-wrapper">
      {/* <MonacoEditor 
        height="30vh"
        width="70vw"
        language="javascript"
        options={{
          wordWrap: "on",
          minimap: { enabled: false },
          cursorStyle: "block"
        }}
        // loading={}
        value="Enter your JavaScript code here..."
      /> */}
      <textarea
        autoFocus 
        name="IDE Window" // required 
        placeholder="Enter your JavaScript code here..." 
        value={codeInput}
        rows={14} 
        cols={65} 
        onChange={e => handleUpdatingInput(e)}
      />
    
      <button onClick={e => bundleInputCode(e, codeInput)}>Run!</button>
    </div>
  );
};

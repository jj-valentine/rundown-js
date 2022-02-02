import React from "react";

// Component(s)
import { CodeEditor } from "./CodeEditor/CodeEditor";
import { Preview } from "./Preview/Preview";

export const CodeSandbox: React.FC = () => {
  return (
    <div className="sandbox-wrapper">
      <CodeEditor />
      {/* <Preview /> */}
    </div>
  );
};

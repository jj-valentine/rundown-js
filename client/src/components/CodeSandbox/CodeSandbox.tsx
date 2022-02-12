import React, { useState } from "react";
// Component(s)
import { CodeEditor } from "./CodeEditor/CodeEditor";
import { Preview } from "./Preview/Preview";
// Utils + Plugins
import { bundler } from "../../utils/bundler";

export const CodeSandbox: React.FC = () => {
  const [bundledCode, setBundledCode] = useState<string>("");

  const updateBundledCode = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, code: string) => {
    const updatedCode = await bundler.retrieveBundledCode(code);
    setBundledCode(updatedCode);
  };

  return (
    <div className="sandbox-wrapper">
      <CodeEditor bundleInputCode={updateBundledCode} />
      <Preview bundledCode={bundledCode} />
    </div>   
  );
};

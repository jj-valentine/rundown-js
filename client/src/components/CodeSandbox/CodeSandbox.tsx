import React, { useState } from "react";
// Utils → Plugins + Helpers
import { NewBundlerInstance as bundle } from "../../utils/bundler/bundle";
// Component(s)
import { CodeEditor } from "./CodeEditor/CodeEditor";
import { Preview } from "./Preview/Preview";

export const CodeSandbox: React.FC = () => {
  const [bundledCode, setBundledCode] = useState<string>("");
  
  const updateBundledCode = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, rawCode: string): Promise<void> => {
    const freshlyBundledCode = await bundle.retrieveBundledCode(rawCode);
    setBundledCode(freshlyBundledCode);
  };

  return (
    <div className="sandbox-wrapper">
      <CodeEditor bundleInputCode={updateBundledCode} />
      <Preview bundledCode={bundledCode} />
    </div>   
  );
};

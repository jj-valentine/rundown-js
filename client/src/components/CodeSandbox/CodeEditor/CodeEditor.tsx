import React, { useState, useEffect, useRef } from "react";
// import MonacoEditor from "@monaco-editor/react";
import * as esbuild from "esbuild-wasm";
// Utils + Plugins
import { iFrameHTML } from "../../../utils/iframe-html";
import { unpkgPathPlugin } from "../../../utils/plugins/unpkg-path-plugin";
import { fetchPlugin } from "../../../utils/plugins/fetch-plugin";
// Component(s)
// import Loading from "../Loading/Loading";

export const CodeEditor: React.FC = () => {
  const [codeInput, setCodeInput] = useState("");
  const serviceRef = useRef<any>()
  const iFrameRef = useRef<HTMLIFrameElement | null>(null);
  
  useEffect(() => {
    (async () => {
      serviceRef.current = await esbuild.startService({
        worker: true,
        wasmURL: "https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm"
      });
    })().catch(err => {
      console.error(err);
    });
  }, []);

  const handleChangingInput = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const inputValue = e.target.value;
    if (!inputValue && inputValue === codeInput) return;
    setCodeInput(inputValue);
  };

  const handleUpdatingBundledCode = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (!serviceRef.current) return;
    try {
      const bundle = await serviceRef.current.build({
        entryPoints: ["index.tsx"],
        bundle: true,
        write: false,
        plugins: [
          unpkgPathPlugin(),
          fetchPlugin(codeInput)
        ],
        define: {
          global: "window",
          "process.env.NODE_ENV": "'production'"
        }
      });
      
      if (!iFrameRef.current || !iFrameRef.current.contentWindow) return;
      const iFrameWindow = iFrameRef.current.contentWindow;
      /* send updated/freshly bundled code to 'iframe' via message */
      iFrameWindow.postMessage(bundle.outputFiles[0].text, "*");
    } catch (err) {
      console.error(err);
    }
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
        onChange={e => handleChangingInput(e)}
      />
    
      <button onClick={e => handleUpdatingBundledCode(e)}>Run!</button>

      {/* TODO: move this into 'Preview' component (once you figure out state management) */}
      <div className="preview-wrapper">
        <iframe 
          id="preview-context" 
          title="preview" 
          ref={iFrameRef} 
          sandbox="allow-scripts" 
          srcDoc={iFrameHTML}>
        </iframe>
      </div>
    </div>
  );
};

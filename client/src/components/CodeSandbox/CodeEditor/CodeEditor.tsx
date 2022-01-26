import React, { useState, useEffect, useRef } from "react";
import * as esbuild from "esbuild-wasm";
// Utils + Plugins
import { iFrameHTML } from "../../../utils/iframe-html";
import { unpkgPathPlugin } from "../../../utils/plugins/unpkg-path-plugin";
import { fetchPlugin } from "../../../utils/plugins/fetch-plugin";

export const CodeEditor: React.FC = () => {
  const [codeInput, setCodeInput] = useState("");
  const serviceRef = useRef<any>()
  const iframeRef = useRef<any>();
  
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

  function handleUpdatingInput(e: any) {
    const newInput = e.target.value;
    if (newInput !== codeInput) setCodeInput(newInput);
  }

  async function handleUpdatingBundledCode(e: any) {
    e.preventDefault();
    if (!serviceRef.current) return;
    try {
      const bundled = await serviceRef.current.build({
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
      
      const iframeWindow = iframeRef.current.contentWindow;
      /* send updated/freshly bundled code to 'iframe' via message */
      iframeWindow.postMessage(bundled.outputFiles[0].text, "*");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="code-editor-wrapper">
      <textarea
        autoFocus 
        name="IDE Window" // required 
        placeholder="Enter your JavaScript code here..." 
        value={codeInput}
        rows={14} 
        cols={65} 
        onChange={e => handleUpdatingInput(e)}
      />
      <button onClick={e => handleUpdatingBundledCode(e)}>Run!</button>

      {/* TODO: move this into 'Preview' component (once you figure out state management) */}
      <div className="preview-wrapper">
        <iframe 
          id="child-context" 
          title="Preview Context" 
          ref={iframeRef} 
          sandbox="allow-scripts" 
          srcDoc={iFrameHTML}>
        </iframe>
      </div>
      {/* <pre>{bundledCode}</pre> */}
    </div>
  );
};

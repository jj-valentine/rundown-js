import { useState, useEffect, useRef } from "react";
import * as esbuild from "esbuild-wasm";
// Utils + Plugins
import { unpkgPathPlugin } from "../../plugins/unpkg-path-plugin";
import { fetchPlugin } from "../../plugins/fetch-plugin";
// Component(s)

function CodeSandbox() {
  const [codeInput, setCodeInput] = useState("");
  const [bundledCode, setBundledCode] = useState("bundled code...");
  // const [service, _setService] =   
  const serviceRef = useRef<any>()
  
  useEffect(() => {
    const startService = async () => {
      serviceRef.current = await esbuild.startService({
        worker: true,
        wasmURL: "https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm"
      });
    };
    
    startService();
  }, []);

  function handleUpdateInput(e: any) {
    setCodeInput(e.target.value);
  }

  async function handleBundleCode(e: any) {
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
      
      setBundledCode(bundled.outputFiles[0].text);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <form onSubmit={handleBundleCode}>
        <textarea
          autoFocus 
          // required 
          name="IDE Window" 
          placeholder="Write code here..." 
          value={codeInput}
          rows={14} 
          cols={65} 
          onChange={handleUpdateInput}
        />
        <button type="submit">Run!</button>
      </form>
      <pre>{bundledCode}</pre>
    </>
  );
}

export default CodeSandbox;
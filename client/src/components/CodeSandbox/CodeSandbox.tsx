import { useState, useEffect, useRef } from "react";
import * as esbuild from "esbuild-wasm";

function CodeSandbox() {
  const [codeInput, setCodeInput] = useState("");
  const [transpiledCode, setTranspiledCode] = useState("transpiled code...");
  // const [service, _setService] =   
  const serviceRef = useRef<any>()
  
  useEffect(() => {
    const startService = async () => {
      serviceRef.current = await esbuild.startService({
        worker: true,
        wasmURL: "/esbuild.wasm"
      });
    };
    
    startService();
  }, []);

  function handleUpdateInput(e: any) {
    setCodeInput(e.target.value);
  }

  async function handleSubmitCode(e: any) {
    e.preventDefault();
    if (!serviceRef.current) return;
    try {
      await serviceRef.current.transform(codeInput, {
          loader: "jsx",
          target: "es2015"
        }).then((transformed: any) => {
          setTranspiledCode(transformed.code);
        });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmitCode}>
        <textarea
          autoFocus 
          required 
          name="IDE Window" 
          placeholder="Write code here..." 
          value={codeInput}
          rows={25} 
          cols={100} 
          onChange={handleUpdateInput}
        />
        <button type="submit">Run!</button>
      </form>
      <pre>{transpiledCode}</pre>
    </>
      
  );
}

export default CodeSandbox;
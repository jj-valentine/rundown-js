import * as esbuild from "esbuild-wasm";
// Utils (Plugins, Classes/Helpers, etc.)
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { fetchPlugin } from "./plugins/fetch-plugin";

export const NewBundlerInstance = (() => {
  /* initialize service instance */
  const promisedService = (async (): Promise<esbuild.Service> => {
    return await esbuild.startService({
      worker: true,
      wasmURL: "https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm"
    });
  })();

  const retrieveBundledCode = async (code: string): Promise<any> => {
    /* ensure service is initialized and running → attempt to user code input */
    if (!promisedService) return;
    const service = await promisedService;

    try {
      const fullBundle = await service.build({
        entryPoints: ["index.tsx"],
        bundle: true,
        write: false,
        plugins: [
          unpkgPathPlugin(),
          fetchPlugin(code)
        ],
        define: {
          global: "window",
          "process.env.NODE_ENV": "'production'"
        }
      });
      
      /* return string of newly bundled code */
      return fullBundle.outputFiles[0].text;
    } catch (err) {
      console.error(err);
      return err;
    }
  }

  return {
    retrieveBundledCode
  };
})();


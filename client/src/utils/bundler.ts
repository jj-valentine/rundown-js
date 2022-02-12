import * as esbuild from "esbuild-wasm";
// Utils + Plugins
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { fetchPlugin } from "./plugins/fetch-plugin";

export const bundler = (() => {
  const service = (async (): Promise<esbuild.Service> => {
    return await esbuild.startService({
      worker: true,
      wasmURL: "https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm"
    });
  })();

  const retrieveBundledCode = async (code: string): Promise<any> => {
    if (!service) return;
    const on = await service;
    try {
      const bundle = await on.build({
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
      
      const bundledCode = bundle.outputFiles[0].text;
      return bundledCode;
    } catch (err) {
      console.error(err);
      return err;
    }
  }

  return {
    retrieveBundledCode
  };
})();


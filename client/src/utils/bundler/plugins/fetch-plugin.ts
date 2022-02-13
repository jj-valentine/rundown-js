import * as esbuild from "esbuild-wasm";
import localForage from "localforage";
import axios from "axios";

const moduleCache = localForage.createInstance({ name: "moduleCache" });
 
const retrieveDataAndCache = async (path: string, escapeCSS: { (data: string): string } | undefined) => {   
  const { data, request } = await axios.get(path);
  const contents = escapeCSS ? escapeCSS(data) : data;
  
  const newData: esbuild.OnLoadResult = {
    loader: "jsx",
    contents,
    resolveDir: new URL("./", request.responseURL).pathname
  };

  /* cache freshly loaded package */
  await moduleCache.setItem(path, newData);
  return newData;
};

export const fetchPlugin = (code: string) => {
  return {
    name: "fetch-plugin",
    setup(build: esbuild.PluginBuild) {
      /* handle loading input code from root entry file ("index.tsx") */
      build.onLoad({ filter: /(^index\.tsx$)/ }, () => {
        return { loader: "jsx", contents: code };
      });

      /* if module was previously loaded (i.e. cached), return it */
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        const cachedData = await moduleCache.getItem<esbuild.OnLoadResult>(args.path);
        if (cachedData) return cachedData;
      });

      /* handle loading/escaping CSS modules */
      build.onLoad({ filter: /.css$/ }, (args: any) => {
        const handleCSSFiles = (data: string): string => {
          const escapedCSS = data
                .replace(/\n/g, "")
                .replace(/"/g, '\\"')
                .replace(/'/g, "\\'")
          return `
            const style = document.createElement("style");
            style.innerText = "${escapedCSS}";
            document.head.appendChild(style);
          `;
        };

        return retrieveDataAndCache(args.path, handleCSSFiles);
      });

      /* handle fetching/loading new + cached modules/packages */
      build.onLoad({ filter: /.*/ }, (args: any) => retrieveDataAndCache(args.path, undefined));
    }
  };
};


import * as esbuild from "esbuild-wasm";
import localForage from "localforage";
import axios from "axios";

const moduleCache = localForage.createInstance({ name: "moduleCache" });

export const fetchPlugin = (code: string) => {
  return {
    name: "fetch-plugin",
    setup(build: esbuild.PluginBuild) {
      /* handle loading input code from root entry file ("index.tsx") */
      build.onLoad({ filter: /(^index\.tsx$)/ }, () => {
        return { loader: "jsx", contents: code };
      });

      /* handle fetching/loading new and cached modules/packages */
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        const path = args.path;
        try {
          const cachedData = await moduleCache.getItem<esbuild.OnLoadResult>(path);

          if (cachedData) return cachedData;
          else {            
            const { data, request } = await axios.get(path);
            const newData: esbuild.OnLoadResult = {
              loader: "jsx",
              contents: data,
              resolveDir: new URL("./", request.responseURL).pathname
            };
            /* cache files for new module */
            moduleCache.setItem(path, newData);
            return newData;
          }
        } catch (error) {
          console.log(error);
        }
      });
    }
  };
};


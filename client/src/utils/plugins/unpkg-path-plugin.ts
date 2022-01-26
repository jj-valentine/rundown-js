import * as esbuild from "esbuild-wasm";

export const unpkgPathPlugin = () => {
  return {
    name: "unpkg-path-plugin",
    setup(build: esbuild.PluginBuild) {
      /* handle resolving root entry file ("index.tsx") */
      build.onResolve({ filter: /(^index\.tsx$)/ }, () => {
        return { path: "index.tsx", namespace: "a" };
      });

      /* handle resolving relative module paths */
      build.onResolve({ filter: /^\.+\// }, async (args: any) => {
        const path = new URL(args.path, "https://unpkg.com" + args.resolveDir + "/").href
        return { path, namespace: "a" };
      });

      build.onResolve({ filter: /.*/ }, async (args: any) => {
        return { path: `https://unpkg.com/${args.path}`, namespace: "a" };
      });
    }
  };
};


/// <reference types="vitest" />
import { defineConfig } from "vite"
import pugPlugin from "vite-plugin-pug"
// import { viteSingleFile } from "vite-plugin-singlefile"
import mockServer from "./mock/server.mock"

/**
 * @param newFilename {string}
 * @returns {import ("vite").Plugin}
 */
const renameIndexPlugin = (newFilename) => {
  if (!newFilename) return
  return {
    name: "renameIndex",
    enforce: "post",
    generateBundle(options, bundle) {
      const indexHtml = bundle["index.html"]
      indexHtml.fileName = newFilename
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isDev = mode === "development";

  return {
    plugins: [
      pugPlugin({}),
      isDev ? mockServer : [],
      // viteSingleFile(),
      // renameIndexPlugin("rcremote.html")
    ],
    resolve: {
      alias: {
        "~scripts": "/src/scripts",
        "~components": "/src/lib/components",
        "~sections": "/src/lib/sections"
      }
    },
    test: {
    }
  };
});

import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { viteSingleFile } from 'vite-plugin-singlefile'
import mockServer from './mock/server.mock'

/**
 * @param newFilename {string}
 * @returns {import ('vite').Plugin}
 */
const renameIndexPlugin = (newFilename) => {
  if (!newFilename) return
  return {
    name: 'renameIndex',
    enforce: 'post',
    generateBundle(options, bundle) {
      const indexHtml = bundle['index.html']
      indexHtml.fileName = newFilename
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isDev = mode === 'development';

  return {
    plugins: [
      svelte(),
      isDev ? mockServer : [],
      viteSingleFile(),
      renameIndexPlugin('rcremote.html')
    ]
  };
});

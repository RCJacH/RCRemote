import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import sveltePreprocess from 'svelte-preprocess';

export default {
  // Consult https://svelte.dev/docs#compile-time-svelte-preprocess
  // for more information about preprocessors
  preprocess: [
    sveltePreprocess({ postcss: true }),
  ],
  compilerOptions: {
    // NOTE: this is a workaround and may be needed until it's fixed in Svelte
    accessors: true,
  },
}

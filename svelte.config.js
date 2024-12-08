import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      platformProxy: {
        environment: 'production',
      },
    }),
    alias: {
      '@shared': './src/shared',
      '@assets': './src/assets',
      '@widgets': './src/widgets',
      '@entities': './src/entities',
    },
  },
};

export default config;

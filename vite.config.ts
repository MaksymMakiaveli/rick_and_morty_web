import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
// import svgr from 'vite-plugin-svelte-svgr';
import svg from '@poppanator/sveltekit-svg';

export default defineConfig({
  plugins: [
    sveltekit(),
    svg({
      includePaths: ['./src/assets/icons'],
    }),
  ],

  optimizeDeps: {
    exclude: ['@urql/svelte'],
  },
});

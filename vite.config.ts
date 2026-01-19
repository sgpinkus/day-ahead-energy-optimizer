import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vuePyodide from './vite-plugin-pyodide';
import unpluginTypia from '@ryoppippi/unplugin-typia/vite';
import { basePath } from './src/config';

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: { exclude: ['pyodide'] },
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ['import', 'global-builtin'],
      },
    },
  },
  plugins: [
    vue(),
    vueJsx(),
    vuePyodide(),
    unpluginTypia({}),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@package': fileURLToPath(new URL('./package.json', import.meta.url)),
      '@config': fileURLToPath(new URL('./src/config.dev.ts', import.meta.url)),
    },
  },
  base: basePath,
  build: {
    minify: 'terser',
    terserOptions: {
      keep_classnames: true,
      keep_fnames: true,
    },
  },
});

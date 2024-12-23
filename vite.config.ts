import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vuePyodide from './vite-plugin-pyodide';
import unpluginTypia from '@ryoppippi/unplugin-typia/vite';
import { basePath } from './src/config';

// https://vitejs.dev/config/
export const config = {
  optimizeDeps: { exclude: ['pyodide'] },
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
    },
  },
  base: basePath,
};

export default defineConfig(config);

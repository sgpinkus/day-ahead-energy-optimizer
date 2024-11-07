import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vuePyodide from './vite-plugin-pyodide';
import { basePath } from './src/config';


// https://vitejs.dev/config/
export default defineConfig({
  define: {
    __APP_VERSION__: JSON.stringify('v0.0.1'),
    __GH_BUILD__: true,
  },
  optimizeDeps: { exclude: ['pyodide'] },
  plugins: [
    vue(),
    vueJsx(),
    vuePyodide('dist-gh/assets')
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    outDir: 'dist-gh',
    minify: 'terser',
  },
  base: basePath,
});

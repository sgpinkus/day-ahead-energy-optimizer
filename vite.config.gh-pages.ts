import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vuePyodide from './vite-plugin-pyodide';
import { basePath } from './src/config';
import { viteStaticCopy } from 'vite-plugin-static-copy';


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
    vuePyodide('dist-gh/assets'),
    viteStaticCopy({
      targets: [
        { src: 'screenshot.png', dest: '.' },
        { src: 'README.md', dest: '.' },
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@package': fileURLToPath(new URL('./package.json', import.meta.url)),
    },
  },
  build: {
    outDir: 'dist-gh',
    minify: 'terser',
    terserOptions: {
      keep_classnames: true,
      keep_fnames: true,
      mangle: false,
    },
  },
  base: basePath,
});

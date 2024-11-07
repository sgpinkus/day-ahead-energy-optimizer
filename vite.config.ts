import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { copyFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { basePath } from './src/config';


// https://vitejs.dev/config/
export const config = {
  optimizeDeps: { exclude: ['pyodide'] },
  plugins: [
    vue(),
    vueJsx(),
    {
      name: 'vite-plugin-pyodide',
      generateBundle: async () => {
        const assetsDir = 'dist/assets';
        await mkdir(assetsDir, { recursive: true });
        const files = [
          'pyodide-lock.json',
          'pyodide.asm.js',
          'pyodide.asm.wasm',
          'python_stdlib.zip',
        ];
        for (const file of files) {
          await copyFile(
            join('node_modules/pyodide', file),
            join(assetsDir, file),
          );
        }
      },
    },
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // build: {
  //   outDir: 'docs',
  // },
  base: basePath,
};

export default defineConfig(config);

import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vuePyodide from './vite-plugin-pyodide';
import unpluginTypia from '@ryoppippi/unplugin-typia/vite';
import { basePath } from './src/config';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const config = command === 'serve' ? './src/config.dev.ts' : './src/config.prod.ts';
  console.info(`Using config file ${config}`);
  return {
    define: {
      __APP_VERSION__: JSON.stringify('v0.0.1'),
      __BUILD_COMMAND__: command,
    },
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
        '@config': fileURLToPath(new URL(config, import.meta.url)),
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
  };
});

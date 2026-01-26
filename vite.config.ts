import { fileURLToPath, URL } from 'node:url';
import { execSync } from 'node:child_process';
import { defineConfig, UserConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vuePyodide from './vite-plugin-pyodide';
import unpluginTypia from '@ryoppippi/unplugin-typia/vite';

const gitHash = execSync('git rev-parse --short HEAD')
  .toString()
  .trim();

function resolveConfigFile(mode: string): string {
  if (process.env['APP_CONFIG']) {
    return process.env['APP_CONFIG'];
  }
  else if (mode === 'production') {
    return './src/config.prod.ts';
  }
  return './src/config.dev.ts';
}


// https://vitejs.dev/config/
export default defineConfig(async ({ command, mode }): Promise<UserConfig> => {
  const configFile = fileURLToPath(new URL(resolveConfigFile(mode), import.meta.url));
  console.info(`Using config file ${configFile} [command=${command}, mode=${mode}]`);
  const config = await import(configFile);
  return {
    define: {
      __GIT_HASH__: JSON.stringify(gitHash),
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
        '@config': configFile,
      },
    },
    base: config.basePath,
    build: {
      minify: 'terser',
      terserOptions: {
        keep_classnames: true,
        keep_fnames: true,
      },
      outDir: 'docs',
      emptyOutDir: true, // optional but recommended
    },
  };
});

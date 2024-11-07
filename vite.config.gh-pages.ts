import { defineConfig } from 'vite';
import { config } from './vite.config';
import { basePath } from './src/config';

export default defineConfig({ ...config,
  define: {
    __APP_VERSION__: JSON.stringify('v0.0.1'),
    __GH_BUILD__: true,
  },
  base: basePath,
  build: {
    outDir: 'dist-gh',
    minify: 'terser',
  },
  plugins: [
    ...config.plugins,
  ],
  resolve: {
    alias: {
      ...config.resolve.alias,
    },
  },
});
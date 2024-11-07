import { copyFile, mkdir } from 'fs/promises';
import { join } from 'path';

export default (assetsDir = 'dist/assets') => ({
  name: 'vite-plugin-pyodide',
  generateBundle: async () => {
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
});
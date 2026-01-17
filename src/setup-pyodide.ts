import { loadPyodide } from 'pyodide';
import { basePath, venvRequirementsTxt, venvRequirementsUrls } from '@/config';

export type Pyodide = any;
export type SetupPyodideState = 'initial' | 'loading' | 'installing' | 'ready' | 'error';

// async function loadPyodide(): Promise<Pyodide> {
//   return new Promise((resolve, reject) => {
//     const script = document.createElement('script');
//     script.onerror = e => reject(e);
//     script.onload = async () => {
//       const pyodide = await (window as any).loadPyodide();
//       resolve(pyodide);
//     };
//     script.src = 'https://cdn.jsdelivr.net/pyodide/v0.26.3/full/pyodide.js';
//     document.body.appendChild(script);
//   });
// }

export async function setupPyodide(
  onStateChange: (newStateCode: SetupPyodideState, newStateName: string) => any,
): Promise<Pyodide> {
  try {
    onStateChange('loading', 'Loading Pyodide');
    const pyodide = await loadPyodide({ indexURL: `${basePath}pyodide` });

    onStateChange('installing', 'Installing dependencies');
    await pyodide.loadPackage('micropip');
    const micropip = pyodide.pyimport('micropip');

    // Filter mocked packages from requirements
    const requirementsTxt: string[] = venvRequirementsTxt.split('\n').filter(i => i);
    console.log(requirementsTxt);

    // Install all packages to recreate the venv
    await micropip.install.callKwargs({
      requirements: requirementsTxt,
      deps: false,
    });

    // Set up debug logging
    const coloredlogs = pyodide.pyimport('coloredlogs');
    coloredlogs.install.callKwargs({ level: 'DEBUG' });

    // Install via URLS (install.callKwargs wont accept URL)
    const requirementsUrls: string[] = venvRequirementsUrls.split('\n').filter(i => i);
    for (const url of requirementsUrls) {
      await micropip.install(url);
    }

    onStateChange('ready', 'Pyodide ready');
    return pyodide;
  } catch (e: any) {
    console.error('Error when setting up pyodide', e);
    onStateChange('error', e.message);
  }
}

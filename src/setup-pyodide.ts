import { loadPyodide } from 'pyodide';
import { basePath } from'@/config';

const venvRequirementsTxt = `
async-timeout==4.0.3
coloredlogs==15.0.1
humanfriendly==10.0
scipy
pandas
matplotlib
numdifftools==0.9.41
device_kit==1.0.6
`;
export type Pyodide = any;

export const PyodideLoadStates = {
  0: 'Loading Pyodide',
  1: 'Installing dependencies',
  2: 'Ready',
};

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
  onStateChange: (newStateCode: number, newStateName: string) => any
): Promise<Pyodide> {
  onStateChange(0, PyodideLoadStates[0]);
  const pyodide = await loadPyodide({ indexURL: `${basePath}pyodide` });

  onStateChange(1, PyodideLoadStates[1]);
  await pyodide.loadPackage('micropip');
  const micropip = pyodide.pyimport('micropip');

  // Filter mocked packages from requirements
  const requirements: string[] = venvRequirementsTxt.split('\n').filter(i => i);
  console.log(requirements);

  // Install all packages to recreate the venv
  await micropip.install.callKwargs({
    requirements: requirements,
    deps: false,
  });

  // Set up debug logging
  const coloredlogs = pyodide.pyimport('coloredlogs');
  coloredlogs.install.callKwargs({ level: 'DEBUG' });

  // Dev
  // await micropip.install('http://127.0.0.1:8080/device_kit-1.0.5-py3-none-any.whl');

  onStateChange(2, PyodideLoadStates[2]);

  return pyodide;
}

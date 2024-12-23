
import { setupPyodide, type Pyodide, type SetupPyodideState } from '@/setup-pyodide';
import { ref, type Ref } from 'vue';

export let pyodidePromise: Promise<Pyodide>;

export const pyodideLoadingStateCode: Ref<SetupPyodideState> = ref('initial'); // State code returned from setupPyodide.
export const pyodideLoadingStateMessage: Ref<string> = ref('');

function pyodideLoadingStateCallback(code: SetupPyodideState, name: string) {
  pyodideLoadingStateCode.value = code;
  pyodideLoadingStateMessage.value = name;
}

export function getPyodide() {
  if (pyodidePromise) return pyodidePromise;
  pyodidePromise = setupPyodide(pyodideLoadingStateCallback);
  return pyodidePromise;
}
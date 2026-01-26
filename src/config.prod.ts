export const basePath = '/day-ahead-energy-optimizer/';
export const venvRequirementsTxt = `
async-timeout==4.0.3
coloredlogs==15.0.1
humanfriendly==10.0
pandas
matplotlib
scipy<=1.15
numdifftools==0.9.41
device_kit==1.0.10
`;
export const preloadPyodide = true;
// For local device_kit dev: python -m http.server -d .
export const venvRequirementsUrls = '';
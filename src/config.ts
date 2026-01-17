export const basePath = '/day-ahead-energy-planner/';
export const venvRequirementsTxt = `
async-timeout==4.0.3
coloredlogs==15.0.1
humanfriendly==10.0
pandas
matplotlib
numdifftools==0.9.41
`;
// For local device_kit dev: python -m http.server -d .
export const venvRequirementsUrls = `
http://127.0.0.1:8080/device_kit-1.0.10-py3-none-any.whl
`;
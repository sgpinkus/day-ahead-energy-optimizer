/**
 * This is just static stash of result of running dedvice_kit simulation.
 * TODO: data is just the random crap passed back from the scripts we wrote to interface with device_kit. Ultimately
 * we just want back labeled data table and then build aggregates tables and plots on JS side ..
 */
export type OptimizationResult = {
  id: string,
  busId: string,
  // busVersion: string,
  busExport: string,
  createdAt: string,
  data: {
    flowData: string,
    totalFlowsData: string,
    totalCostsData: string,
    flowDerivsData: string,
    plot1Image: string,
    plot2Image: string,
  }
}
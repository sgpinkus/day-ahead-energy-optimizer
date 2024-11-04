import pandas as pd

def table(deviceset, x):
  df1 = pd.DataFrame.from_dict(dict(deviceset.map(x)), orient='index')
  df1.loc['total'] = df1.sum()
  flows_total = df1.copy()
  csv_options = {
    'float_format': '%.3f',
    'index_label': 'device',
  }
  df_derivs = pd.DataFrame.from_dict(dict(deviceset.map(deviceset.deriv(x, 0))), orient='index')
  # Dont show derivs and costs for non supply coz it's too confusing what it means.
  df_derivs = df_derivs.loc[list(filter(lambda x: x.find('supply') >= 0, df_derivs.index))]
  costs_total = pd.Series({ _id: d.cost(_x, 0) for (_id, d, _x) in deviceset.mapDevices(x)})
  costs_total = costs_total.loc[filter(lambda x: x.find('supply') >= 0, costs_total.index)]
  return df1.to_csv(**csv_options), flows_total.sum(axis=1).to_csv(**csv_options), costs_total.to_csv(**csv_options),  df_derivs.to_csv(**csv_options)

table
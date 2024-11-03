import pandas as pd

def table(deviceset, x):
  df1 = pd.DataFrame.from_dict(dict(deviceset.map(x)), orient='index')
  df1.loc['total'] = df1.sum()
  df2 = df1.copy()
  df1.loc['prices'] = df1.sum() # Dummy data.
  csv_options = {
    'float_format': '%.3f',
    'index_label': 'device',
  }
  return df1.to_csv(**csv_options), df2.sum(axis=1).to_csv(**csv_options)

table
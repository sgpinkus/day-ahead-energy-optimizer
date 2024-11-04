import base64
import io
import pandas as pd
import device_kit
from device_kit.plots import plot_dataframe_as_stacked_bars
import json

def plot(deviceset, x):
  df = pd.DataFrame.from_dict(dict(deviceset.map(x)), orient='index')
  df_derivs = pd.DataFrame.from_dict(dict(deviceset.map(deviceset.deriv(x, 0))), orient='index')
  fig, ax = plot_dataframe_as_stacked_bars(df, None)
  for (label, d) in df_derivs.iterrows():
    if label.find('supply') >= 0:
      ax.plot(d.index, d, label=label + '_deriv')
  buffer = io.BytesIO()
  ax.set_xlim(-2, len(deviceset)+2)
  # ax.set_ylim(df.min(), df.max())
  # ax.set_title(title)
  ax.legend(
    prop={'size': 10},
    # loc='upper right',
    framealpha=0.6,
    frameon=True,
    fancybox=True,
    borderaxespad=-3
  )
  fig.savefig(buffer, format='png')
  buffer.seek(0)
  image_png = base64.b64encode(buffer.getvalue()).decode('utf8')
  buffer.close()
  return image_png, image_png

plot


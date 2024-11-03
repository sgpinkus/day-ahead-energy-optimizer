import base64
import io
import pandas as pd
import device_kit
from device_kit.plots import plot_dataframe_as_stacked_bars
import json

def plot(deviceset, x):
  df = pd.DataFrame.from_dict(dict(deviceset.map(x)), orient='index')
  buffer = io.BytesIO()
  plot_dataframe_as_stacked_bars(df, None, buffer)
  buffer.seek(0)
  image_png = base64.b64encode(buffer.getvalue()).decode('utf8')
  buffer.close()
  return image_png, image_png

plot


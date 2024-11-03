import device_kit
from device_kit.loaders import builder_loader
import json

def load(json_data: str):
  data = json.loads(json_data)['data']
  deviceset = builder_loader.load_data(data)
  deviceset.sbounds = (0,0)
  return deviceset

load
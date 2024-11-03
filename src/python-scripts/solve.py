import device_kit

class Cb():
  def __init__(self):
    self.i = 0
  def __call__(self, device, x):
    print('step=%d; cost=%.6f' % (self.i, device.cost(x, 0)))
    self.i += 1

def solve(deviceset):
  (x, solve_meta) = device_kit.solve(deviceset, solver_options={'ftol': 1e-6 }, cb=Cb()) # Convenience convex solver.
  return x, solve_meta

solve
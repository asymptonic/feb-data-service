import type { Datapoint } from '../lib/types/datapoint';

export async function analyzeIncrementalEnergy(data: Datapoint[]) {
  let total = 0;

  for (const point of data) {
    if (point.Incremental_Energy) {
      total += parseFloat(`${point.Incremental_Energy}`);
    }
  }

  return total;
}

export async function analyzeWheelSpeed(data: Datapoint[]) {
  let total = 0;

  for (const point of data) {
    if (point.Wheel_Speed) {
      total += parseFloat(`${point.Wheel_Speed}`);
    }
  }

  return total / data.length;
}

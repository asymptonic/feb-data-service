import ky from 'ky';
import Papa from 'papaparse';
import './env';
import { pb, superuserLogin } from './lib/pocketbase';
import type { Datapoint } from './lib/types/datapoint';
import { sleep } from 'bun';
import { analyzeIncrementalEnergy } from './processing/analyze-incremental-energy';
import type { FilesResponse } from './lib/types/db';
import { analyzeWheelSpeed } from './processing/analyze-wheel-speed';

await superuserLogin(pb);

pb.collection('files').subscribe('*', async (e) => {
  if (e.action !== 'create') return;

  await sleep(10_000); // simulate processing delay for heavy workloads

  await runAnalysis(e.record);
});

async function runAnalysis(record: FilesResponse) {
  const csvString = await ky(pb.files.getURL(record, record.file)).text();
  const { data, errors } = Papa.parse<Datapoint>(csvString, {
    header: true,
  });

  const totalUsedIncrementalEnergy = await analyzeIncrementalEnergy(data);
  const averageWheelSpeed = await analyzeWheelSpeed(data);

  await pb.collection('files').update(record.id, {
    analysis: {
      used_incremental_energy: totalUsedIncrementalEnergy,
      average_wheel_speed: averageWheelSpeed,
      efficiency_score: averageWheelSpeed / totalUsedIncrementalEnergy,
    },
  });

  console.log('analysis complete');
}

const files = await pb.collection('files').getFullList();

for (const file of files) {
  if (!file.analysis) {
    runAnalysis(file);
  }
}

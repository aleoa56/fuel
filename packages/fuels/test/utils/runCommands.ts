import { existsSync, rmSync } from 'fs';
import { join } from 'path';

import { run } from '../../src/cli';

export const fixtures = join(__dirname, '..', 'fixtures');
export const workspace = join(fixtures, 'project');
export const output = join(fixtures, 'types');
export const fuelsConfig = join(fixtures, 'fuels.config.ts');
export const contractsJson = join(output, 'contracts.json');

export async function runInit() {
  const argv = [
    'node',
    'fuels',
    'init',
    ['-w', workspace],
    ['-o', output],
    ['-p', fixtures],
    '--silent',
  ].flat();
  await run(argv);

  return { argv };
}

export async function runBuild() {
  const argv = ['node', 'fuels', 'build', ['-p', fixtures], '--silent'].flat();
  await run(argv);
  return { argv };
}

export async function runDeploy() {
  const argv = ['node', 'fuels', 'deploy', ['-p', fixtures], '--silent'].flat();
  await run(argv);
  return { argv };
}

export function clean() {
  if (existsSync(fuelsConfig)) {
    rmSync(fuelsConfig);
  }
  if (existsSync(output)) {
    rmSync(output, { recursive: true });
  }
}

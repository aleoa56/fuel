import { safeExec } from '@fuel-ts/errors/test-utils';
import chalk from 'chalk';
import { existsSync, readFileSync } from 'fs';

import { clean, fuelsConfigPath, generatedDir, runInit } from '../utils/runCommands';

describe('init', () => {
  beforeEach(clean);
  afterAll(clean);

  it('should run `init` command', async () => {
    await runInit();
    expect(existsSync(fuelsConfigPath)).toBeTruthy();
    const fuelsContents = readFileSync(fuelsConfigPath, 'utf-8');
    expect(fuelsContents).toMatch(`workspace: 'project',`);
    expect(fuelsContents).toMatch(`output: 'generated',`);
    expect(fuelsContents).toMatch(`useBuiltinForc: true,`);
    expect(fuelsContents).toMatch(`useBuiltinFuelCore: true,`);
  });

  it('should run `init` command and throw for existent config file', async () => {
    const firstRun = await safeExec(() => runInit());
    expect(firstRun.error).not.toBeTruthy();

    // second time will trigger error
    const secondRun = await safeExec(() => runInit());
    expect(secondRun.result).not.toBeTruthy();
    expect(chalk.reset(secondRun.error)).toMatch(/Config file exists, aborting./);
  });

  it('should error if not inputs are informed', async () => {
    const { error } = await safeExec(() => runInit(['-o', generatedDir].flat()));

    expect(error).toBeTruthy();
    expect(error?.toString()).toMatch(/Workspace not informed./i);
  });
});
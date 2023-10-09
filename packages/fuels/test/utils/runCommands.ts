import { existsSync, rmSync } from 'fs';
import { join } from 'path';

import { Commands } from '../../src';
import { run } from '../../src/cli';

export const fixturesDir = join(__dirname, '..', 'fixtures');

export const workspaceDir = join(fixturesDir, 'project');

export const contractsDir = join(workspaceDir, 'contracts');
export const scriptsDir = join(workspaceDir, 'scripts');
export const predicateDir = join(workspaceDir, 'predicate');

export const fooContractMainPath = join(contractsDir, 'foo', 'src', 'main.sw');

export const fuelsConfigPath = join(fixturesDir, 'fuels.config.ts');
export const generatedDir = join(fixturesDir, 'generated');
export const contractsJsonPath = join(generatedDir, 'contracts.json');
export const fooContractFactoryPath = join(
  generatedDir,
  'contracts',
  'factories',
  'FooBarAbi__factory.ts'
);

export async function runCommand(commandName: string, params: string[] = []) {
  const argv = ['node', 'fuels', '--silent', commandName, '-p', fixturesDir].concat(params);
  return { argv, command: await run(argv) };
}

export const initFlagsWorkspace = ['-w', workspaceDir, '-o', generatedDir];
export const initFlagsUseBuiltinBinaries = ['--use-builtin-forc', '--use-builtin-fuel-core'];
export const initFlagsAutoStartFuelCore = '--auto-start-fuel-core';
export const initFlagsDefault = [
  initFlagsWorkspace,
  initFlagsUseBuiltinBinaries,
  initFlagsAutoStartFuelCore,
];

export async function runInit(flags: string[] = initFlagsDefault.flat()) {
  return runCommand(Commands.init, flags.flat());
}

export async function runBuild() {
  return runCommand(Commands.build);
}

export async function runDeploy() {
  return runCommand(Commands.deploy);
}

export async function runDev() {
  return runCommand(Commands.dev);
}

export function clean() {
  if (existsSync(fuelsConfigPath)) {
    rmSync(fuelsConfigPath);
  }
  if (existsSync(generatedDir)) {
    rmSync(generatedDir, { recursive: true });
  }
}
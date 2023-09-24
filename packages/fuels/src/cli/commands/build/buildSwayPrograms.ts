import { spawn } from 'child_process';
import { join } from 'path';

import type { ParsedFuelsConfig } from '../../types';
import { findPackageRoot } from '../../utils/findPackageRoot';
import { logSection, loggingConfig } from '../../utils/logger';

export async function buildSwayProgram(config: ParsedFuelsConfig, path: string) {
  logSection('Building Sway program', path);

  const pkgRootDir = findPackageRoot();

  return new Promise((resolve, reject) => {
    const forcPath = join(pkgRootDir, 'node_modules', '.bin', 'fuels-forc');

    const command = config.useSystemForc ? 'forc' : forcPath;
    const forc = spawn(command, ['build', '-p', path], { stdio: 'pipe' });

    forc.stderr?.pipe(process.stderr);
    if (loggingConfig.isDebugEnabled) {
      forc.stdout?.pipe(process.stdout);
    }

    forc
      .on('exit', (code) => {
        if (!code) {
          resolve(0);
          return;
        }
        reject(code);
      })
      .on('error', (err) => {
        reject(err);
      });
  });
}

export async function buildSwayPrograms(config: ParsedFuelsConfig) {
  logSection('Building Sway programs..');

  const paths = config.workspace
    ? [config.workspace]
    : [config.contracts, config.predicates, config.scripts].flat();

  await Promise.all(paths.map((path) => buildSwayProgram(config, path)));
}

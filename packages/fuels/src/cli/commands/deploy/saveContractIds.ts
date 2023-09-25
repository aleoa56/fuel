import { writeFile, mkdir } from 'fs/promises';
import { resolve } from 'path';

import type { ContractDeployed } from '../../types';
import { log } from '../../utils/logger';

export async function saveContractIds(contracts: ContractDeployed[], output: string) {
  const contractsMap = contracts.reduce(
    (cConfig, { name, contractId }) => ({
      ...cConfig,
      [name]: contractId,
    }),
    {}
  );

  const filePath = resolve(output, 'contracts.json');

  await mkdir(output, { recursive: true });
  await writeFile(filePath, JSON.stringify(contractsMap, null, 2));

  log(`Contract IDs saved at: ${filePath}`);
}

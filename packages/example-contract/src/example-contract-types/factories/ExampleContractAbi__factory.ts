/* eslint-disable eslint-comments/no-unlimited-disable */
/* Autogenerated file. Do not edit manually. */

/* tslint:disable */
/* eslint-disable */

/*
  Fuels version: 0.42.0
  Forc version: 0.35.5
  Fuel-Core version: 0.17.3
*/

import { Interface, Contract } from 'fuels';
import type { Provider, Account, AbstractAddress } from 'fuels';
import type { ExampleContractAbi, ExampleContractAbiInterface } from '../ExampleContractAbi';

const _abi = {
  types: [
    {
      typeId: 0,
      type: 'u64',
      components: null,
      typeParameters: null,
    },
  ],
  functions: [
    {
      inputs: [
        {
          name: 'input',
          type: 0,
          typeArguments: null,
        },
      ],
      name: 'return_input',
      output: {
        name: '',
        type: 0,
        typeArguments: null,
      },
      attributes: null,
    },
  ],
  loggedTypes: [],
  messagesTypes: [],
  configurables: [],
};

export class ExampleContractAbi__factory {
  static readonly abi = _abi;
  static createInterface(): ExampleContractAbiInterface {
    return new Interface(_abi) as unknown as ExampleContractAbiInterface;
  }
  static connect(
    id: string | AbstractAddress,
    accountOrProvider: Account | Provider
  ): ExampleContractAbi {
    return new Contract(id, _abi, accountOrProvider) as unknown as ExampleContractAbi;
  }
}

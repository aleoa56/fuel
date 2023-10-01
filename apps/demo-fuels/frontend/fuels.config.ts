import type {
  CommandEvent,
  // DeployOptions,
  FuelsConfig,
} from 'fuels';
import { createConfig } from 'fuels';

export default createConfig({
  // ----------------------------------- Inputs

  /**
   * Instead of informing `contracts`, `scripts` and `predicates`
   * individually, you can also use workspaces (recommended)
   * @param workspace - Path to Sway/Forc Workspace
   */
  workspace: '../backend',

  /**
   * This property should not be used alongside `workspace`
   * @param contracts - Paths to Sway Contracts
   */
  // contracts: ['./sway/contracts'],

  /**
   * This property should not be used alongside `workspace`
   * @param predicates - Paths to Sway Predicates
   */
  // predicates: ['./sway/predicates'],

  /**
   * This property should not be used alongside `workspace`
   * @param scripts - Path to Sway scripts
   */
  // scripts: ['./sway/scripts'],

  /**
   * @param output - Where to generate Typescript definitions
   */
  output: 'src/backend-api',

  // ----------------------------------- Node & Deployment settings

  /**
   * @param privateKey - Your wallet private key
   */
  // Should ideally como from env — `process.env.MY_PRIVATE_KEY`
  privateKey: '0xa449b1ffee0e2205fa924c6740cc48b3b473aa28587df6dab12abc245d1f5298',

  /**
   * Defaults to http://localhost:4000
   * @param providerUrl - Contracts will be deployed using this provider
   */
  // providerUrl: '...',

  /**
   * @param chainConfig - Path to custom `chainConfig.json` file
   */
  // chainConfig: '...',

  /**
   * This method can be used for crafting custon deployment flows.
   *
   * Sometimes we need to deploy two contracts, and the second
   * depends on the first—in such cses, you can use the contracts
   * object to get the necessary contract id's. Amother option is,
   * you could also fetch remote data for some reason.
   */
  /*
  deployConfig: async (options: DeployOptions) => {

    await Promise.resolve(`simulating remote data fetch`);

    const contract = options.contracts.find(
      (c) => c.name === '<my contract deployed name>'
    );

    if (!contract) {
      throw new Error('Contract not found!');
    }

    return {
      gasPrice: 1,
      storageSlots: [
        {
          // storage slot to initialize w/ previous contract id
          key: '0x000....0000',
          value: contract.contractId,
        },
      ],
    };
  },
  */

  // ----------------------------------- Forc/FuelCore settings
  /**
   * Optional property, defaults to false
   * @param useSystemForc - Skip using internal wrapped Forc binaries
   */
  // useSystemForc: false,

  /**
   * Optional property, defaults to false
   * @param useSystemFuelCore - Skip using internal wrapped FuelCore binaries
   */
  // useSystemFuelCore: false,

  /**
   * Optional property, defaults to true
   * @param autoStartFuelCore - When set to false, it will skip spinning up
   * a FuelCore node. In this case, you'll need to start the node yourself.
   */
  // autoStartFuelCore: true,

  // ----------------------------------- Callbacks

  /**
   * This function is called after a successful run
   * @param event - The event that triggered this execution
   * @param config - The loaded `fuels.config`
   */
  onSuccess: (_event: CommandEvent, _config: FuelsConfig) => {
    // console.log('fuels:onSuccess', { event, config });
  },

  /**
   * This function is called in case of errors
   * @param error - The error that interrupted the execution
   */
  onFailure: (_error: Error) => {
    // console.log('fuels:onFailure', { error });
  },
});

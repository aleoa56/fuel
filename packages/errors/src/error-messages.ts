import type { ErrorCode } from './error-codes';

export const errorMessages = {
  'insufficient-balance': {},
  'invalid-address': {
    'unknown-format': 'Unknown address format: only Bech32, B256, or Public Key (512) supported.',
    'invalid-bech32': `Invalid Bech32 Address.`,
  },
  'invalid-url': {},
  'parse-failed': {
    'missing-code-property': "missing 'code' property.",
    'unknown-error-code': 'Unknown error code.',
    'unknown-message-key': `Unknown message key.`,
  },
  'transaction-failed': {},
  'invalid-multicall': {
    'only-one-call-with-heap-return-allowed.':
      'Only one call that returns a heap type is allowed on a multicall.',
    'call-with-heap-return-must-be-last':
      'The contract call with the heap type return must be at the last position on the multicall.',
  },
} as const;

type ErrorMessagesHasKeyForEveryErrorCode = IsTrue<
  ErrorCode extends keyof typeof errorMessages ? true : false
>;

type IsTrue<T extends true> = T;

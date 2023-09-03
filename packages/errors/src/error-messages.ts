import { ErrorCode } from './error-codes';

export const errorMessages = {
  [ErrorCode.INSUFFICIENT_BALANCE]: {},
  [ErrorCode.INVALID_ADDRESS]: {
    'unknown-format': 'Unknown address format: only Bech32, B256, or Public Key (512) supported.',
    'invalid-bech32': 'Invalid Bech32 Address.',
  },
  [ErrorCode.INVALID_URL]: {},
  [ErrorCode.PARSE_FAILED]: {
    'missing-code-property': "missing 'code' property.",
    'unknown-error-code': 'Unknown error code.',
    'unknown-message-key': `Unknown message key.`,
  },
  [ErrorCode.TRANSACTION_FAILED]: {},
  [ErrorCode.INVALID_MULTICALL]: {
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

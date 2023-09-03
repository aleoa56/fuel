import { versions } from '@fuel-ts/versions';

import { ErrorCode } from './error-codes';
import { errorMessages } from './error-messages';

export class FuelError<
  EC extends ErrorCode = ErrorCode,
  MessageKey extends keyof (typeof errorMessages)[EC] = keyof (typeof errorMessages)[EC]
> extends Error {
  static readonly CODES = ErrorCode;
  readonly VERSIONS = versions;

  static parse(e: unknown) {
    const error = e as FuelError<ErrorCode>;

    if (error.code === undefined) {
      throw new FuelError(ErrorCode.PARSE_FAILED, 'missing-code-property');
    }

    const enumValues = Object.values(ErrorCode);
    const codeIsKnown = enumValues.includes(error.code);

    if (!codeIsKnown) {
      throw new FuelError(ErrorCode.PARSE_FAILED, 'unknown-error-code');
    }

    const messageKeyKnown = Object.keys(errorMessages[error.code]).includes(error.messageKey);

    if (!messageKeyKnown) {
      throw new FuelError(ErrorCode.PARSE_FAILED, 'unknown-message-key');
    }

    return new FuelError(error.code, error.messageKey);
  }

  code: EC;
  messageKey: MessageKey;
  additionalInfo: Record<string, unknown>;

  constructor(code: EC, messageKey: MessageKey, additionalInfo: Record<string, unknown> = {}) {
    const message = errorMessages[code][messageKey];

    super(message);

    this.messageKey = messageKey;
    this.code = code;
    this.name = 'FuelError';
    this.additionalInfo = additionalInfo;
  }

  toObject() {
    const { code, name, message, VERSIONS, messageKey, additionalInfo } = this;
    return { code, name, message, VERSIONS, messageKey, additionalInfo };
  }
}

import { versions } from '@fuel-ts/versions';

import { FuelError, ErrorCode } from '.';
import { errorMessages } from './error-messages';
import { expectToThrowFuelError } from './test-utils/expect-to-throw-fuel-error';

it('has properties set as expected on creation', () => {
  const error = new FuelError(FuelError.CODES.PARSE_FAILED, 'unknown-error-code', { prop: 'prop' });

  expect(error.message).toBe(errorMessages[error.code]['unknown-error-code']);
  expect(error.code).toBe(ErrorCode.PARSE_FAILED);
  expect(error.name).toBe('FuelError');
  expect(error.VERSIONS).toStrictEqual(versions);
  expect(error.additionalInfo).toStrictEqual({ prop: 'prop' });
});

describe('Parsing', () => {
  it('parses correctly', () => {
    const message = 'my-message';
    const error = FuelError.parse({ code: ErrorCode.INVALID_URL, message });
    expect(error).toBeInstanceOf(FuelError);
    expect(error.message).toBe(message);
    expect(error.code).toBe(ErrorCode.INVALID_URL);
  });

  it('fails when parsing an object without a code property', () => {
    const expectedError = new FuelError(FuelError.CODES.PARSE_FAILED, 'missing-code-property');
    expectToThrowFuelError(() => FuelError.parse({}), expectedError);
  });

  it('fails when parsing an object with an unknown error code', () => {
    const code = 'qweqwe';
    const expectedError = new FuelError(ErrorCode.PARSE_FAILED, 'unknown-error-code');
    expectToThrowFuelError(() => FuelError.parse({ code }), expectedError);
  });
});

it('converts error to plain object', () => {
  const code = FuelError.CODES.PARSE_FAILED;
  const name = 'FuelError';
  const err = new FuelError(code, 'missing-code-property', { prop123: 'asdf' });
  expect(err.toObject()).toStrictEqual({
    code,
    name,
    message: "missing 'code' property.",
    VERSIONS: err.VERSIONS,
    messageKey: 'missing-code-property',
    additionalInfo: { prop123: 'asdf' },
  });
});

import type { BN } from '@fuel-ts/math';
import { bn, multiply } from '@fuel-ts/math';
import type { Witness } from '@fuel-ts/transactions';
import { ReceiptType } from '@fuel-ts/transactions';

import type {
  TransactionResultReceipt,
  TransactionResultScriptResultReceipt,
} from '../transaction-response';

/** @hidden */
export const calculatePriceWithFactor = (gasUsed: BN, gasPrice: BN, priceFactor: BN): BN =>
  bn(Math.ceil(gasUsed.toNumber() / priceFactor.toNumber()) * gasPrice.toNumber());

/** @hidden */
export const getGasUsedFromReceipts = (receipts: Array<TransactionResultReceipt>): BN => {
  const scriptResult = receipts.filter(
    (receipt) => receipt.type === ReceiptType.ScriptResult
  ) as TransactionResultScriptResultReceipt[];

  const gasUsed = scriptResult.reduce((prev, receipt) => prev.add(receipt.gasUsed), bn(0));

  return gasUsed;
};

/** @hidden */
export interface CalculateTxChargeableBytesFeeParams {
  gasPrice: BN;
  transactionBytes: Uint8Array;
  transactionWitnesses: Witness[];
  gasPriceFactor: BN;
  gasPerByte?: BN;
}

/** @hidden */
export const calculateTxChargeableBytesFee = (params: CalculateTxChargeableBytesFeeParams): BN => {
  const { gasPrice, transactionBytes, transactionWitnesses, gasPerByte, gasPriceFactor } = params;

  const witnessSize = transactionWitnesses?.reduce((total, w) => total + w.dataLength, 0) || 0;

  const txChargeableBytes = bn(transactionBytes.length - witnessSize);

  const txChargeableBytesGasUsed = bn(
    Math.ceil(
      (txChargeableBytes.toNumber() * bn(gasPerByte).toNumber()) / bn(gasPriceFactor).toNumber()
    )
  );

  const chargeableBytesFee = txChargeableBytesGasUsed.mul(gasPrice);

  return chargeableBytesFee;
};

export interface CalculateTransactionFeeParams {
  receipts: TransactionResultReceipt[];
  gasPrice: BN;
  margin?: number;
  transactionBytes: Uint8Array;
  transactionWitnesses: Witness[];
  gasPriceFactor: BN;
  gasPerByte?: BN;
}

/** @hidden */
export const calculateTransactionFee = ({
  receipts,
  gasPrice,
  gasPriceFactor,
  gasPerByte,
  transactionBytes,
  transactionWitnesses,
  margin,
}: CalculateTransactionFeeParams) => {
  const chargeableBytesFee = calculateTxChargeableBytesFee({
    gasPrice,
    transactionBytes,
    transactionWitnesses,
    gasPriceFactor,
    gasPerByte,
  });

  const gasUsed = multiply(getGasUsedFromReceipts(receipts), margin || 1);
  const partialFee = calculatePriceWithFactor(gasUsed, gasPrice, gasPriceFactor);

  return {
    fee: partialFee.add(chargeableBytesFee),
    gasUsed,
  };
};

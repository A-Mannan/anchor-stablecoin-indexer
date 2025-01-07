import { BigDecimal, BigInt } from "@graphprotocol/graph-ts";
import { Borrower } from "../../generated/schema";
import { ZERO } from "./constants";

export function getOrCreateBorrower(address: string): Borrower {
  let borrower = Borrower.load(address);
  if (!borrower) {
    borrower = new Borrower(address);
    borrower.debt = ZERO;
    borrower.collateral = ZERO;
    borrower.collateralRatio = ZERO.toBigDecimal();
    borrower.isRedemptionProvider = false;
  }
  return borrower;
}

function bigIntToBigDecimal(value: BigInt): BigDecimal {
  return value.toBigDecimal();
}

export function calculateCollateralRatio(
  collateral: BigInt,
  debt: BigInt
): BigDecimal {
  if (debt.isZero()) {
    return BigDecimal.fromString("Infinity");
  }

  return bigIntToBigDecimal(collateral).div(bigIntToBigDecimal(debt));
}

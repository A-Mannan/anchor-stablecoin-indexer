import {
  DepositEther,
  WithdrawEther,
  Mint,
  Burn,
} from "../../generated/AnchorEngine/AnchorEngine";
import {
  calculateCollateralRatio,
  getOrCreateBorrower,
} from "../utils/helpers";

export function handleDepositEther(event: DepositEther): void {
  let borrower = getOrCreateBorrower(event.params.onBehalfOf.toHex());
  borrower.collateral = borrower.collateral.plus(event.params.amount);
  borrower.collateralRatio = calculateCollateralRatio(
    borrower.collateral,
    borrower.debt
  );
  borrower.save();
}

export function handleWithdrawEther(event: WithdrawEther): void {
  let borrower = getOrCreateBorrower(event.params.onBehalfOf.toHex());
  borrower.collateral = borrower.collateral.minus(event.params.amount);
  borrower.collateralRatio = calculateCollateralRatio(
    borrower.collateral,
    borrower.debt
  );
  borrower.save();
}

export function handleMint(event: Mint): void {
  let borrower = getOrCreateBorrower(event.params.onBehalfOf.toHex());
  borrower.debt = borrower.debt.plus(event.params.amount);
  borrower.collateralRatio = calculateCollateralRatio(
    borrower.collateral,
    borrower.debt
  );
  borrower.save();
}

export function handleBurn(event: Burn): void {
  let borrower = getOrCreateBorrower(event.params.onBehalfOf.toHex());
  borrower.debt = borrower.debt.minus(event.params.amount);
  borrower.collateralRatio = calculateCollateralRatio(
    borrower.collateral,
    borrower.debt
  );
  borrower.save();
}

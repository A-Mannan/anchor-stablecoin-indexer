import {
  RedemptionProviderRegistered,
  RedemptionProviderRemoved,
  RedeemedCollateral,
} from "../../generated/AnchorEngine/AnchorEngine";
import { Borrower } from "../../generated/schema";
import {
  calculateCollateralRatio,
  getOrCreateBorrower,
} from "../utils/helpers";

export function handleRedemptionProviderRegistered(
  event: RedemptionProviderRegistered
): void {
  let borrower = getOrCreateBorrower(event.params.user.toHex());
  borrower.isRedemptionProvider = true;
  borrower.redemptionFeeRate = event.params.feeRate;
  borrower.redemptionAmount = event.params.amount;
  borrower.save();
}

export function handleRedemptionProviderRemoved(
  event: RedemptionProviderRemoved
): void {
  let borrower = Borrower.load(event.params.user.toHex());
  if (borrower) {
    borrower.isRedemptionProvider = false;
    borrower.redemptionFeeRate = null;
    borrower.redemptionAmount = null;
    borrower.save();
  }
}

export function handleRedeemedCollateral(event: RedeemedCollateral): void {
  let provider = getOrCreateBorrower(event.params.provider.toHex());
  provider.collateral = provider.collateral.minus(event.params.etherAmount);

  if (provider.isRedemptionProvider && provider.redemptionAmount) {
    provider.redemptionAmount = provider.redemptionAmount.minus(
      event.params.anchorUSDAmount
    );
  }
  provider.collateralRatio = calculateCollateralRatio(
    provider.collateral,
    provider.debt
  );
  provider.save();
}

import { LiquidationRecord } from "../../generated/AnchorEngine/AnchorEngine";
import { calculateCollateralRatio, getOrCreateBorrower } from "../utils/helpers";

export function handleLiquidationRecord(event: LiquidationRecord): void {
  let onBehalfOf = getOrCreateBorrower(event.params.onBehalfOf.toHex());
  // onBehalfOf.debt = onBehalfOf.debt.minus(event.params.anchorUSDAmount);
  onBehalfOf.collateral = onBehalfOf.collateral.plus(
    event.params.LiquidateEtherAmount
  );
  onBehalfOf.collateralRatio = calculateCollateralRatio(onBehalfOf.collateral, onBehalfOf.debt);
  onBehalfOf.save();
}

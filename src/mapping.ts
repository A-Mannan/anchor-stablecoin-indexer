import { BigInt } from "@graphprotocol/graph-ts";
import {
  DepositEther,
  WithdrawEther,
  Mint,
  Burn,
} from "../generated/AnchorEngine/AnchorEngine";
import { Borrower } from "../generated/schema";

export function handleDepositEther(event: DepositEther): void {
  let borrower = Borrower.load(event.params.onBehalfOf.toHex());
  if (!borrower) {
    borrower = new Borrower(event.params.onBehalfOf.toHex());
    borrower.address = event.params.onBehalfOf;
    borrower.debt = BigInt.fromI32(0);
    borrower.collateral = BigInt.fromI32(0); 
  }
  borrower.collateral = borrower.collateral.plus(event.params.amount);
  borrower.save();
}

export function handleWithdrawEther(event: WithdrawEther): void {
  let borrower = Borrower.load(event.params.onBehalfOf.toHex());
  if (!borrower) {
    borrower = new Borrower(event.params.onBehalfOf.toHex());
    borrower.address = event.params.onBehalfOf;
    borrower.debt = BigInt.fromI32(0);
    borrower.collateral = BigInt.fromI32(0); 
  }
  borrower.collateral = borrower.collateral.minus(event.params.amount);
  borrower.save();
}

export function handleMint(event: Mint): void {
  let borrower = Borrower.load(event.params.onBehalfOf.toHex());
  if (!borrower) {
    borrower = new Borrower(event.params.onBehalfOf.toHex());
    borrower.address = event.params.onBehalfOf;
    borrower.debt = BigInt.fromI32(0);
    borrower.collateral = BigInt.fromI32(0);
  }
  borrower.debt = borrower.debt.plus(event.params.amount);
  borrower.save();
}

export function handleBurn(event: Burn): void {
  let borrower = Borrower.load(event.params.onBehalfOf.toHex());
  if (!borrower) {
    borrower = new Borrower(event.params.onBehalfOf.toHex());
    borrower.address = event.params.onBehalfOf;
    borrower.debt = BigInt.fromI32(0);
    borrower.collateral = BigInt.fromI32(0);
  }
  borrower.debt = borrower.debt.minus(event.params.amount);
  borrower.save();
}

// export function handleRedemptionProviderRegistered(event: RedemptionProviderRegistered): void {
//   let provider = RedemptionProvider.load(event.params.user.toHex());
//   if (!provider) {
//     provider = new RedemptionProvider(event.params.user.toHex());
//     provider.address = event.params.user;
//     provider.collateral = BigInt.fromI32(0); // Initialize collateral
//     provider.debt = BigInt.fromI32(0); // Initialize debt
//     provider.feeRate = BigInt.fromI32(0); // Initialize feeRate
//     provider.availableAnchorUSD = BigInt.fromI32(0); // Initialize availableAnchorUSD
//   }
//   provider.save();
// }

// export function handleRedemptionProviderRemoved(event: RedemptionProviderRemoved): void {
//   let provider = RedemptionProvider.load(event.params.user.toHex());
//   if (provider) {
//     store.remove('RedemptionProvider', provider.id);
//   }
// }

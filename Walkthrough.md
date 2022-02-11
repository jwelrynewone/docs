---
Simulate the P&L and the TVL for the Matrix Protocol
---

# Concepts Overview

## Steps involved in the Matrix Protocol

- The user deposits BTC worth 100 USD to the vault of Matrix Protocol. (We will use an oracle to calculate the price of BTC.)
- Matrix Protocol will mint 100 stablecoins (100 USDM). Total USD value of BTC deposited by the user = amount of USDM issued to the user.
- Users transact USDM. The user can transfer, exchange, and store USDM.
- USDM Protocol transfers the BTC to a derivative dex and creates a delta neutral position to hedge.
- The user deposits 100 USDM to the USDM Protocol vault for redemption into 100 USD worth of BTC.
- The delta neutral position is unwinded at the derivative dex and the BTC is withdrawn to the USDM Protocol vault.
- UXD Protocol will destroy the USDM and an equivalent amount of BTC will be withdrawn to the user’s wallet.
- Users will also be able to obtain USDM through centralized and decentralized exchanges, and other third party services. Once the USDM is in circulation, it is freely traded.

## Mechanism for the derivative exchange

- Delta Neutral Position For UXD Protocol to always be able to issue/redeem UXD at par value, UXD Protocol will short BTC/USD perpetual swaps on a derivatives dex(decentralized exchange) to an equivalent amount of the UXD in circulation. 
- As a result, the position will be delta neutral and UXD Protocol will be protected from price fluctuations of BTC. Example Let’s assume that BTC/USD is trading at $10,000. A user issues 10,000 UXD in exchange for 1 BTC. 
- Then there is 10,000 UXD in circulation. 
- UXD Protocol will then have a 1 BTC short position using the 1 BTC as collateral on a derivatives dex. 
- The position is delta neutral and the value of the position + collateral will always be worth $10,000 which can be seen from the simulations below. 
- If the price of BTC increases to $20,000, the value of the collateral increases from $10,000 to $20,000 and the PnL is $10,000. The PnL of the short position is 1 BTC*( $10,000-$20,000) = -$10,000. 
- The total PnL is $0. 
- If the price of BTC decreases to $5,000, the value of the collateral decreases from $10,000 to $5,000 and the PnL is -$5,000. 
- The PnL of the short position is 1 BTC*($10,000-$5,000) = $5,000. 
- The total PnL is also $0.

## Funding Rate payments

- Users of USDM will earn part of the interest generated from the funding rate when the funding rate is positive. 
- By utilizing smart contracts, UXD holders' balance will increase by the amount of interest automatically.
- When the funding rate is negative, the negative interest will be paid out from the insurance fund.

## Insurance Fund

- The insurance fund is set up so that the holders of UXD will not have to pay interest when the funding rate is negative.

Let’s define the USDM value of the insurance fund as INSusd.

Then,
- if INSusd > 0, the negative funding rate can be paid out from the insurance fund.
- if INSusd < 0, UXD protocol will do an auction of governance tokens(UXP) to the public and replenish the insurance fund until INSusd > 0.

Besides the auction of UXP, there will be a constant positive flow of funds to the insurance fund when the funding rate is positive, since part of the funding rate will go to the insurance fund

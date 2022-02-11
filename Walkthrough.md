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

## Protocol Challenges

 - Outside of general smart contract risk, there exist a few key challenge areas for a protocol like UXD to not just work, but to scale efficiently to the size a stablecoin protocol needs.

## Perpetual Market Size 
- Currently there is roughly $30M in open interest on Perpetual Exchanges. 
- Stablecoin market caps require nearly $1B in market cap to be considered successful and to be considered sufficiently liquid for widespread use. 
- For USDM to reach significant levels of adoption, the amount of market activity on Perpetual exchanges would need to scale significantly. 
- At the current size of the perp markets, USDM would almost assuredly drive the funding rates negative on the exchanges since it would create an imbalance of positions to the short side. 
- However, this would attract more traders to trade against cheaper fund borrowing rates so there is a self-referential playbook here that can scale both USDM and the perpetual markets on Solana.

## Negative Funding Rates 
- Along the same vein, when funding rates on the perpetual exchange turn negative, it’s on the USDM protocol itself to pay out. 
- Usually, funding rates are positive in crypto due to the much larger demand to be on the long side of assets and in this case USDM protocol would be making additional money via traders paying it funding. 
- However, if USDM scales faster than OI on the exchanges, there exists a real possibility funding could get driven negative, and the protocol would be paying. 
- To counteract this probability, sufficient funds are stored in the insurance fund to cover negative funding periods (which have historically not been long in duration). 
- In the unlikely event that the insurance fund is depleted paying funding payments, additional UXP would be auctioned off to replenish the insurance fund. 
- Even in this unlikely event, the insurance fund would not rapidly be depleted via funding payments (no flash crashes, just predictable payments over known periods of time) so USDM holders would nearly always be able to redeem for collateral.

## Exchange Exit Liquidity 

- Related to exchange sizes, there needs to exist enough counter side liquidity for USDM to unwind its short positions. 
- USDM by design puts on short positions every time a user deposits collateral into the protocol, but when the USDM holder wishes to exchange the stablecoin for their collateral, the short position needs to be unwound and the collateral returned. 
- For this to happen, there needs to be liquidity (users or market makers) on the exchange willing to sell tokens to USDM protocol in the size required. 
- This risk is more prevalent in times of market volatility.

## Treasury Management 

- USDM as a protocol is designed not to make money from UXD users but in the way it manages its collateral (positive funding rates) and its insurance fund. 
- As the insurance fund is deployed in asset management strategies, the benefit is clearly the capital appreciation of the fund size. 
- However, on the flip side there is introduced risk that funds are subjected to which needs to be considered. 
- Not a great concern as presumably the fund will be deployed in low-risk strategies with the only notable risk being smart contract risk.

## USDM Supply and Demand 

- Every stablecoin is subject to fluctuations in demand which can drive prices off peg. 
- What matters is the ability of the protocol to absorb price volatility via redemption mechanisms to remain at peg or user confidence in the future redemption abilities (fiat stablecoins)?
- USDM offers both avenues but as a growing stablecoin, it’s still subjected to the risk - especially in its early stages when concentrated amounts of USDM can experience more volatility pressure than if the supply of USDM was vast.

## Looking Ahead

- USDM offers a unique solution to the stablecoin landscape. 
- As Cosmos continues to build out its DeFi ecosystem, having truly decentralized, native stablecoins will greatly benefit the ecosystem. 
- Market demand for this type of solution is rapidly increasing, not just on Cosmos, but across DeFi as projects and users alike look for stable assets without centralization risk and that synergistically benefit the ecosystem. 
- USDM has the potential to propel Cosmos derivatives market into new territory by catalyzing the cost of trading down and providing sufficient stable liquidity.


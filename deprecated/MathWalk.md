---
Simulate the P&L and the TVL for the Nibiru Protocol
---

# Concepts Overview

## Steps involved in the Nibiru Protocol

- The user deposits OSMO worth 100 USD to the vault of Nibiru Protocol. We will use a front-running resistant oracle to calculate the price of OSMO.
- Nibiru Protocol will mint 100 stablecoins (100 USDM). $ value of OSMO = amount of USDM issued to the user.
- Users transact USDM, (transfer, exchange, and store USDM).
- Nibiru Protocol transfers the OSMO to a derivative dex and creates a delta neutral position to hedge.
- The user deposits 100 USDM to the Nibiru Protocol vault for redemption into 100 USD worth of OSMO.
- The delta neutral position is unwinded at the derivative dex and the OSMO is withdrawn to the Nibiru Protocol vault (specific to OSMO). 
- Nibiru Protocol will destroy the USDM when the OSMO will be withdrawn to the user’s wallet.
- Users will also be able to obtain USDM through DEXes OSMOSIS, and GRAVITY-DEX. Once the USDM is in circulation, it is freely traded.

## Mechanism for the derivative exchange

- Delta Neutral Position For Nibiru Protocol to always be able to issue/redeem USDM at par value, Nibiru Protocol will short OSMO/USD perpetual swaps on a derivatives dex(decentralized exchange) to an equivalent amount of the USDM in circulation. 
- The position will be delta neutral and Nibiru Protocol will be protected from price fluctuations of OSMO. 

## Example 
- Let’s assume that OSMO is trading at $10,000. A user issues 10,000 UXD in exchange for 1 BTC. 
- Then there is 10,000 UXD in circulation. 
- UXD Protocol will then have a 1 BTC short position using the 1 BTC as collateral on a derivatives dex. 
- The position is delta neutral and the value of the position + collateral will always be worth $10,000 which can be seen from the simulations below. 

- If the price of OSMO increases to $20,000, the value of the collateral increases from $10,000 to $20,000 and the PnL is $10,000. 
- The PnL of the short position is 1 OSMO*( $10,000-$20,000) = -$10,000. 
- The total PnL is $0. 
- If the price of OSMO decreases to $5,000, the value of the collateral decreases from $10,000 to $5,000 and the PnL is -$5,000. 
- The PnL of the short position is 1 OSMO*($10,000-$5,000) = $5,000. 
- The total PnL is also $0.

## Funding Rate payments

- Users of USDM will earn part of the interest generated from the funding rate when the funding rate is positive. 
- By utilizing smart contracts, USDM holders' balance will increase by the amount of interest automatically.
- When the funding rate is negative, the negative interest will be paid out from the insurance fund.

## Insurance Fund

- The insurance fund is set up so that the holders of USDM will not have to pay interest when the funding rate is negative.

Let’s define the USDM value of the insurance fund.

Then,
- the negative funding rate can be paid out from the insurance fund.
- Nibiru protocol will do an auction of governance tokens(NEO) to the public and replenish the insurance fund until funding rate > 0.
- The auction of NEO, there will be a constant positive flow of funds to the insurance fund when the funding rate is positive, since part of the funding rate will go to the insurance fund

## Protocol Challenges

 - Outside of general smart contract risk, there exist a few challenge areas for Nibiru protocol to scale efficiently.

## Perpetual Market Size 
- Stablecoin market caps require nearly $1B in market cap to be considered successful and to be considered sufficiently liquid for widespread use. 
- For USDM to reach significant levels of adoption, the amount of market activity on Perpetual exchanges would need to scale significantly. 
- USDM would almost drive the funding rates negative on the exchanges. 

## Negative Funding Rates 
- When funding rates on the perpetual exchange turn negative, Nibiru protocol pay out. 
- Funding rates are positive in crypto due to larger demand on the long side of assets. 
- If USDM scales faster than OI on the other exchanges, funding could get driven negative, Nibiru protocol would be paying. 
- To counteract this probability, sufficient funds are stored in the insurance fund to cover negative funding periods. 
- If the insurance fund is depleted paying funding payments, NEO could be be auctioned off to replenish the insurance fund. 
- Flash crisis premium would need to be modeled to make sure the funding payments would not be made like regular payments.

## Exchange Exit Liquidity 
- Related to exchange sizes, there needs to exist enough counter side liquidity for USDM to unwind its short positions. 
- This risk is more prevalent in times of market volatility.

## Treasury Management 
- Nibiru protocol is designed not to make money from USDM users but in the way it manages its collateral (positive funding rates) and its insurance fund. 
- As the insurance fund is deployed in asset management strategies, the benefit is clearly the capital appreciation of the fund size. 
- However, on the flip side there is introduced risk that funds are subjected to which needs to be considered; the fund will be deployed in low-risk strategies with the only notable risk being smart contract risk.

## USDM Supply and Demand 
- Every stablecoin is subject to fluctuations in demand which can drive prices off peg. 
- What matters is the ability of the protocol to absorb price volatility via redemption mechanisms to remain at peg or user confidence in the future redemption abilities (fiat stablecoins)?
- USDM offers both avenues but as a growing stablecoin, it’s still subjected to the risk - especially in its early stages when concentrated amounts of USDM can experience more volatility pressure than if the supply of USDM was vast.

## Looking Ahead
- USDM offers a unique solution to the stablecoin landscape. 
- As Cosmos continues to build out its DeFi ecosystem, having truly decentralized, native stablecoins will greatly benefit the ecosystem. 
- Market demand for this type of solution is rapidly increasing, not just on Cosmos, but across DeFi as projects and users alike look for stable assets without centralization risk and that synergistically benefit the ecosystem. 
- USDM has the potential to propel Cosmos derivatives market into new territory by catalyzing the cost of trading down and providing sufficient stable liquidity.


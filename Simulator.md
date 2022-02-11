---
Matrix Simulator
---

# Concepts Overview

## TL;DR

- Matrix involves three different types of agents: Stable-coins minter/redeemer, Leverage agents and Insurance Agents.
- Matrix can issue multiple stablecoins for different types of whitelisted collateral at 1:1 capital efficiency using front-running resistant Oracle design.

# Problem 1

## Assumptions

- Whitelist OSMO and ATOM as collateral
- Mint USDM stable coin at 1:1 capital efficiency with Fees (2-4bps **RD**)
- If you mint USDM for Osmo -> Goes to OSMO vault -> LAs & IAs specific to OSMO
- If you mint USDM for ATOM -> Goes to ATOM vault -> LAs & IAs specific to ATOM
- Liquidations for OSMO does not overlap with the liquidations of ATOM (linear superposition **RD**, What is the scenario for multi-cross-sectional liquidations?)
- Insurance Fund seeded at genesis to pay for the negative funding rate regimes.
- LAs provide insurance for the downside of the collateral volatility by issuance of perp (OSMO/USDM, ATOM/USDM)
- LAs do not pay funding rate to go long the collateral volatility, (Massive incentive for long traders to use leverage)
- How the LAs can enter to get the perp to insure the collateral volatility is based on a bonding curve --> which has fees/slippage -> goes to the IF
- LAs have a guage to lock their exposure, longer time period gauge has less slippage bonding curve
- Every slippage goes to the Insurance Fund
- LAs have only access to the collateral at 1:1
- DAO which is governed by NEO decides on a lock period for realizing the gains
- LAs are nothing but a call option on the collateral for which USDM has been minted, with premium being the slippage paid to the Insurance Fund.
- IAs can bring capital to over-collateralize the protocol, and they get minted LP tokens on pools which can be locked to get governance vNEO tokens.
- IAs also recieve the asset management fees of the remaining uninsured collateral and the investment of their money on AAVE using gravity bridge.
- IAs concur fees while taking out their capital or locking their LP tokens in governance contract -> these fees go back to the Insurance Fund.

# Math
1. Let say the user brings 10000 OSMO to Mint —> USDM 
2. Current OSMO PRICE = 10
3. Matrix Protocol Exposure = 100,000 USD 
4. LA brings 10,000 USD and chooses CR (coverage ratio : 100) --> implied leverage = 10
5. LA would be liquidated in a 10% down move 
6. Major incentive of the LA to come to the Matrix protocol is —> they can go long a perp with zero funding rate for a long period of time

# Scenario 1 (Market goes up)

1. OSMO goes to 11 $
2. Matrix Expsoure: 110,000 USD, PNL : 10,000 USD
3. Whole Pnl goes to the LA : 10,000 
4. If the LA wants to take it out -> fees are decided based on the CR and then send to the IF

# Scenario 2 (Market goes down)

1. OSMO goes to 9 $
2. Matrix Expsoure: 90,000 USD, PNL : -10,000 USD
3. LAs 10,000$ is liquidated 
4. If the LA wants to take it out -> fees are decided based on the CR and then send to the IF

# What is the incentive for the LA come to the protocol if we enter a prolong bearish market ?

1. So let's say the 10% move happened over 6 hours | Derivative exchange pays funding rate every hour
2. t_1 = 100,000 * 100 * 1e-4 = 1000
   t_2 = 1000
   ….
   t_6 = 1000
3. So the LA has made 6000$ and lost 10000$ at the end of 6 hours -> Net pnl is -4000$
4. Since LAs can come in during bearish market, the fees to get perp for the stable-coin collateral minted is a non-linear function. The first agent entry is lot cheaper than the 100th entry. FEES is non linear function —> replinishes the IF






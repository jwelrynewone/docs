---
Core Concepts of Matrix Protocol
---

# Concepts Overview

## TL;DR

- Matrix involves three different types of agents: Stable-coins minter/redeemer, Leverage agents and Insurance Agents.
- Matrix can issue multiple stablecoins for different types of whitelisted collateral at 1:1 capital efficiency using front-running resistant Oracle design.

## Different Agents on the Matrix Protocol

The Matrix protocol relies on three types of agents to maintain the stability of the stablecoin :

- **Stable-coins Users:** 
- Users swap collateral against stable assets and conversely swap stable assets against a whitelisted collateral of their choice at oracle value and with minimal slippage (RN). 
- Users must pay small transaction fees when they mint and/or burn. 
- i.e. the price of OSMO is 10$, and the transaction fees charged are 5 bps, swap 1 OSMO for 9.995 USDM stablecoins. Conversely, with 10 USDM stablecoins, transaction fees are 10 bps, it is possible to get 0.990 OSMO.

- **Leverage Agents (LAs):** 
- Get perpetual futures with their choice of leverage on a pair collateral/stablecoin. 
- LAs insure the protocol against the volatility of the collateral on Matrix protocol. 
- If the price of the collateral increases with respect to the value of the stablecoin, LAs make leveraged capital gains, whereas if the price decreases, LAs can lose a portion of the collateral they brought.

- **Insurance Agents (IAs):** 
- IAs lend money to the protocol and recieve the transaction fees from Matrix Protocol for stable seekers minting and burning
- IAs obtain returns from lending of the protocol reserves to lending protocols. 
- For Matrix, IAs serve as a backstop to the LAs. IAs may face a small slippage when they exit if the protocol is not well collateralized.

## Generalization to Multiple Stable Assets

- Matrix can issue multiple stablecoins based on a front-running resistant oracle. 
- Matrix protocol want to launch USDM (USD based stablecoin) and the idea is to issue stablecoins pegged to other currencies like EUR.
- Each stablecoin issuing pool is independent from the other stablecoins, meaning that the collateral pools are different. 
- Being a LA for the OSMO/USDM pool does not overlap with being an LA on the ATOM/USDM pool. 
- Being an IA for the OSMO/USDM pool does not overlap with other pools. 
- If the stable USDM experiences a bank-run situation it does not imply anything for the other stablecoins.

## Next 

- In the following pages, we dive in-depth into the specificities of each stakeholder on Matrix Protocol and explain in more detail.




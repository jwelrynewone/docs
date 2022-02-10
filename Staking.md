---
description: Details of Staking with Matrix Protocol (NEEDS WORK)
---

# Staking - Getting Governance Tokens

## TL;DR

A portion of Matrix's governance tokens are distributed to Matrix protocol and LP token users.

## Rationale

- Matrix aims to be a decentralized protocol. To this extent, the protocol will only succeed if the ownership of the governance token backing the protocol is decentralized.
- A vast portion of the governance tokens are distributed through staking contracts by the protocol to protocol and USDM users. 
- This include Leverage Agents, Insurance Agents, and USDM LPs on specific pools.
- While Leverage Agents automatically can accumulate governance tokens automatically as they stay in the protocol, Standard Liquidity Providers as well as stable holders have to stake their tokens (LP tokens for SLPs and USDM for stable holders) in specific contracts to earn governance tokens. 
- The protocol leaves them the opportunity to stake directly and seamlessly from the app after having minted.

## Token Distribution

The distribution of governance tokens between the different staking contracts (called gauges) happens through weekly votes from veMATRIX token holders. They assign specific weights to the different gauges, and the sum of their votes will dictate the next rewards distribution.

400,000,000 MATRIX (40% of the total supply) is being distributed through staking. The amount being distributed are divided by 1.5^(1/52) = 1.007827 every week, equivalent to dividing the distribution by 1.50 every year.

We built some simulations to evaluate how supply evolves over time, you can take a look at this .

## Gauges and rewards allocation

Each staking contract receiving rewards should have a dedicated gauge. Gauges are used so that veMATRIX holders can dedicate their voting powers to influence the distribution of MATRIX rewards between the different staking contracts.

veMATRIX holders assign specific weights of their voting power to the different gauges, and the sum of all the veMATRIX assigned to each gauge by all holders will determine the quantity of rewards to be distributed. Once weights are allocated, they will be reverberated in the following weeks without users having to do anything except if they want to change it.


## Boost on rewards

Stakers on contracts internal to Matrix can boost the rewards they receive by holding veMATRIX. Note that this doesn't impact the inflation rate, and only change the rewards they receive compared to other LPs on this pool.

This boost can go up to x2.5 the base quantity of rewards, and depends on the liquidity on the staking contract and the veMATRIX balance of the stakers. All the information about the boost can be found on the 






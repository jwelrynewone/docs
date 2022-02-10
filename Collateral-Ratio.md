---
description: Matrix is over-collateralized
---

# Collateral Ratio

## TL;DR

* Thanks to its two types of liquidity providers \(LAs and IAs\), Matrix is an over-collateralized protocol. 
* Due to the protocol's structure, the exact level of over-collateralization that will be reached is still hard to determine.

## Collateral Ratio Structure

* Matrix protocol does not try to target collateral ratio while trying to be 1:1 capital efficient protocol. 
* The way governance can influence the collateral ratio is through the structure of the slippage for IAs and HAs, 
* For IAs the transaction fees taken from users minting and burning stablecoins 
* For HAs joining or exiting the protocol.

The protocol's collateral ratio depends on the yield targeted by IAs and the average leverage chosen by HAs.

## Collateral Ratio Estimation

-- In Matrix protocol, over-collateralization comes from both LAs and IAs liqudity. 

## example 

- Estimate how over-collateralized the Matrix protocol could be in theory, starting with 1000 of OSMO collateral in the protocol coming from users.
- If LAs cover all the collateral from users with a leverage of 3, meaning that they brought 500 OSMO to commit to 1000, the protocol is collateralized at 150%.
- In Matrix, IAs earn a portion of the yield and rewards coming from lending the protocol's collateral. 
- If 80% of the collateral is lent, and IAs are looking to earn twice as much yield as they would on another protocol.
- Bringing 1000 OSMO, IAs would earn yield on 80% x 2500 = 2000, that is twice the collateral that they brought initially. 
- This means that they would earn a yield that is twice higher than what they could get by using their collateral in another platform: this corresponds to what they target. The protocol is collateralized at 250%.




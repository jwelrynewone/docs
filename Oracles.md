---
description: Giving the Matrix protocol access to price feeds
---

# Oracles

## TL;DR

- Matrix combines Uniswap V3 Time Weighted Average Price \(TWAP\) using a 10 minutes time window with Chainlink oracles to provide price feeds for each collateral/stablecoin pair.
- If Uniswap's value differs from that of Chainlink, the protocol chooses the value which is most at its advantage.

## Matrix's Need for Oracles

- Matrix Protocol lets people swap their collateral against the protocol's native stablecoins \(minting\). 
- It also allows Leverage Agents to take leveraged long positions through perpetual futures on a collateral/stablecoin pair. 
- The protocol needs to be able to access price feeds for all the supported collateral/stablecoin pairs: it does so using oracles.

## example 
For instance, if USD and EUR stablecoins are supported, and ATOM and OSMO are used as collateral, then the protocol needs to be able to have the following oracle feeds: ATOM/USD, OSMO/USD, ATOM/EUR, OSMO/EUR.

{% hint style="info" %}
In the beginning, the USDM stablecoin will only accept OSMO and then ATOM.
{% endhint %}

## Matrix's Oracle Design

- Matrix uses a combination of Chainlink and Uniswap V3 TWAP oracles with a 10 minutes time window. T
- The idea is that whenever there is a need for an oracle value, the protocol chooses between the output of the Uniswap feed and the Chainlink feed that is most at the advantage of the protocol.

- For instance, for a mint transaction using collateral, Matrix keeps the lowest value between Chainlink and Uniswap. 
- But for a burn transaction, the protocol keeps the highest one. If Uniswap's feed price for 1 OSMO is 10$ and if Chainlink's feed price is 9.9$. Then, a user could get 9.9 USDM with 1 OSMO, and 1 OSMO from 10 USDM.
- For some pairs, there may not be the direct feeds on Chainlink or pools on Uniswap to compute the price. The protocol should thus work with circuits of pairs to decompose the computation of the price: ETH/USD and then USD/EUR for a ETH/EUR feed.
- On Uniswap, Matrix will always consider that 1 USDC is worth 1 USDM.

## Combining Uniswap and Chainlink Feeds

- For some pairs, Uniswap V3 pools may not be sufficient. For instance, for a wETH/EUR pair, there may not be a Uniswap V3 pool allowing to get the price of wETH versus EUR \(even in an indirect way using a circuit of pools\). To this extent, the protocol may have to use a combination of a Uniswap and a Chainlink feeds to get the price of wETH vs. EUR.
- In this case, the protocol uses an only-Chainlink feed \(wETH/USD then USD/EUR\) and a feed made up of Uniswap for the part wETH/USD and Chainlink for the part USD/EUR, compares both feeds and chooses the one that is most at its advantage.

## Front-Running Risk and How We Prevent it

- Given that Matrix lets people swap their collateral against stablecoins with no slippage, and given on-chain oracle latency \(especially Chainlink\), there can be a front-running risk.

- If, at a point in time, the on-chain price for wETH is 1000€, but the real market price \(which is the future on-chain price\) is 1100€, then people have incentives to use EUR stablecoins to get wETH at the price of 1 wETH for 1000 EUR stablecoins on-chain, and then wait for the on-chain oracle price to be updated to sell instantly the wETH at a higher price. By doing so, the person takes advantage of the discrepancy in price and frontruns the protocol, draining some of the collateral of the protocol and making risk-free profit.

- This oracle latency is the cause of front-running risk Matrix is subject to. Using a combination of Uniswap V3 time-weighted average price and Chainlink, along with transaction fees allows to mitigate this risk.

- Uniswap V3 active price oracles are difficult to technically front run, as you would have to front run an active market, and as a result do not expose clean, “pure profit” front running opportunities akin to those based on oracle latency. Furthermore, they have been carefully constructed to be resilient to manipulation from both flashloans and longer-window attacks. Nevertheless, TWAP allow front run in period of high volatility as they take more time to tend to the off-chain price.

- The fact that both Uniswap and Chainlink oracles are used allows to take a spread from the real market price that gets bigger when there are important price deviations and Chainlink values are lagging. Uniswap V3 prices are time-weighted average prices, meaning it places less emphasis on newer observations, and thus mitigates the impact of important price changes, making it less reactive to important changes in price.

{% hint style="info" %}
- A high spread between Chainlink and Uniswap value is equivalent to taking more important transaction fees. This is likely to happen in case of high volatility of the collateral, and thus in situations where frontrunning risk is higher.
{% endhint %}

## Flash Loans Resistance

- The oracle values taken by Matrix are not manipulable within a block. 
- UniswapV3 TWAP are constant in a given block, and Chainlink values, given the decentralized nature of the system, cannot be manipulated. 
- To this extent, it is going to be impossible with a flash loan, in a single block, to manipulate the price and make profits using Matrix.

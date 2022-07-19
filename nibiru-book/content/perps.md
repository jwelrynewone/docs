# Nibi-Perps

Perps are the most popular financial instrument in the modern day crypto markets. Their trading volume across major exchanges reaches trillions of notional USD value each year.

While most perps exchanges are designed with off-chain order books, perp implementations can differ greatly from exchange to exchange.  The Nibiru blockchain powers a decentralized and fully on-chain perpetual futures exchange called **NibiPerps**. There are several open problems Nibiru seeks to address with this exchange:

- **Minimize latency during periods of high volatility.**
- **Minimize the imbalance in open interest.**
- **Increase the number of unique traders on the platform.**
- **Reduce the bleeding of the ecosystem fund**: One of the top priorities on the Nibiru Perps protocol it to keep the funding rates of the listed perps at parity to all other perpetual futures exchanges while monitoring the opportunity for arbitrageurs.

## Mark Price and Index Price 

A perpetual futures contract, or perp, is a special type of futures contracts that doesn’t have an expiry date. The derivative value of a perp position is represented by its **mark price**, and the value of the underlying is represented by its **index price**. Traders can take up to 10x leverage on long or short positions. 

Perp positions remain effective until either the trader closes their position or the position goes underwater. This allows traders to speculate on the future price without having to own the underlying asset. More info [here](https://academy.binance.com/en/articles/what-are-perpetual-futures-contracts).

## Virtual Pools

Positions on Nibiru Perps are priced using virtual liquidity pools with no real assets stored inside. In this model, assets are priced using the constant product model (`x*y=k`) pioneered by Uniswap. Tokens are sent to a clearing house, which stores the collateral in a vault, and where virtual pools are leveraged for price discovery of the derivatives. This allows for the use of leverage trading and removes the need for liquidity providers, or makers.

Virtual pools enable Nibiru to have **clear pricing rules.** Each futures contract specifies the base asset’s quantity delivered for a single contract. For instance, OSMO/USDC, UMEE/USDC and ATOM/USDC futures contracts represent only one unit of its respective base asset, similar to spot markets.

## Funding Payments

Funding payments are used to incentivize traders to take long/short positions. A time-weighted average price from the virtual pool is taken to compute the mark price. The index price is derived from an oracle. Funding payments are calculated and exchanged between traders hourly on Nibiru.

### Liquidations

When using leverage on positions, traders naturally become exposed to liquidation risks. For example, when the underlying value of a trader’s perp declines, the derivative asset will approach the value of its margin, putting the exchange at risk. To prevent the position from falling below the value of the margin that backs it, the protocol will proactively liquidate the position. Liquidations are triggered by **liquidations bots** that earn a small percentage of the remaining position. 

## Opening Positions

When opening a position, tokens are deposited and locked as **margin**. Under the hood, these tokens are stored with the **clearing house**, which uses the virtual pools for price discovery, converting the deposit into virtual assets.

These virtual assets change the reserves of their corresponding pool, determining the price of the derivative (position) while enabling the use of leverage. The protocol controls the funding payments in NUSD, actively monitoring the liquidation and the management of the Ecosystem Fund. 

## Perp: NIBI Token

Holders who stake their NIBI tokens can vote on or propose new ideas to improve the perps protocol. A small percentage of the protocol’s NIBI inflation feeds into the Ecosystem Fund. NIBI stakers vote on, among others, exchange improvements, parameter alterations, new feature implementations, chain updates, and alterations to reward mechanisms.

## Perp VIP Trading Program

Holders who stake their NIBI tokens can vote on and/or propose new ideas to develop the perps protocol. 10% of staked NIBI feeds into the ecosystem fund. The NIBI token acts as a backstop mechanism. In the event that Perp EF is unable to cover unexpected losses, the protocol will mint new NIBI tokens, immediately selling the new tokens for collateral to keep the system solvent.

NIBI holders will have the ability to vote on exchange improvements, parameter alterations, new feature implementations, chain updates, and inflationary reward mechanisms. NIBI stakers enjoy a trading fee discount proportional to the amount staked.

## What are the risks?

Naturally, risks are inherent with any novel project being built. Nibiru’s ecosystem is built to promote the robust decentralization, permissionless creation of perps. As a result, community members can start trading without the supervision of a central authority, meaning the safety of having a facilitating party will not exist to the same degree. That being said, new market proposals will require governance approval for listing and a listing fee in NIBI tokens.

The permissionless state of market creation can drive the protocol to in-solvency in a black swan event. To mitigate against the risk of one market spilling over to others, Nibiru requires each new pair to establish an insurance fund before trading can commence.
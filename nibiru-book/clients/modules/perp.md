---
description: >-
  The perp module enables leveraged trading via perpetual swaps.
---

# perp module

## Available Commands

#### Transactions

| Command: `nibid tx perp` | Description |
| :--- | :--- |
| [open-position](#nibid-tx-perp-open-position) | Alters the current position on a trading pair.  |
| [close-position](#nibid-tx-perp-close-position) |   |
| [add-margin](#nibid-tx-perp-add-margin) |   |
| [remove-margin](#nibid-tx-perp-remove-margin) |   |

#### Queries

| Command: `nibid query perp` | Description |
| :--- | :--- |
| [trader-position](#nibid-query-bank-balances) | Query for account balances by address |
| [params](#nibid-query-bank-total) | Query the total supply of coins of the chain |

---

### nibid tx perp open-position 

Opening a position

```sh
nibid tx perp open-position buy|sell pair leverage quoteAmt baseAmtLimit [flags]
```

```sh
# example
nibid tx perp open-position buy ubtc:unusd 10 1000000 0 --from addr
```

### nibid tx perp close-position

```sh
nibid tx perp close-position [pair] [flags]
```

```sh
# example
nibid tx perp close-position ubtc:unusd --from addr
```

### nibid tx perp add-margin

```sh
nibid tx perp add-margin [pair] [margin] [flags]
```

```sh
# example
nibid tx perp add-margin ubtc:unusd 1000000unusd --from addr
```

### nibid tx perp remove-margin

```sh
nibid tx perp remove-margin [pair] [margin] [flags]
```

```
# example
nibid tx perp remove-margin ubtc:unusd 1000000unusd --from addr
```

### nibid query perp trader-position

```sh
nibid query perp trader-position [trader] [pair] [flags]
```

```sh
# example
nibid query perp trader-position nibi1zaavvzxez0elundtn32qnk9lkm8kmcsz44g7xl ubtc:unusd --node tcp://localhost:26657
```

### nibid query perp params

```sh
nibid query perp params
```

---

# Parameters of Nibi-Perps

* [Module Parameters](perp.md#module-parameters)
  * [FeePoolFeeRatio](perp.md#feepoolfeeratio)
  * [EcosystemFundFeeRatio](perp.md#ecosystemfundfeeratio)
  * [LiquidationFeeRatio](perp.md#liquidationfeeratio)
  * [PartialLiquidationRatio](perp.md#partialliquidationratio)
  * [FundingRateInterval](perp.md#fundingrateinterval)
  * [TwapLookbackWindow](perp.md#twaplookbackwindow)
* [Market Specific Parameters](perp.md#market-specific-parameters)
  * [TradeLimitRatio](perp.md#tradelimitratio)
  * [FluctuationLimitRatio](perp.md#fluctuationlimitratio)
  * [MaxOracleSpreadLimitRatio](perp.md#maxoraclespreadlimitratio)
  * [MaintenanceMarginRatio](perp.md#maintenancemarginratio)

## Module Parameters 

| Parameter               |  Value                |
| ---------------         | --------------------- |
| FeePoolFeeRatio         | 0.001 (0.1%)          | 
| EcosystemFundFeeRatio   | 0.001 (0.1%)          | 
| LiquidationFeeRatio     | 0.025 (2.5%)          |
| PartialLiquidationRatio | 0.25 (25%)            | 
| FundingRateInterval     | 30 minutes            |
| TwapLookbackWindow      | 900 seconds           |

### FeePoolFeeRatio

The fee paid to the treasury for opening/closing a position.

### EcosystemFundFeeRatio

The fee paid to the ecosystem fund for opening/closing a position.

### LiquidationFeeRatio

When a position gets liquidated (either partial or full), how much of the exchanged notional value is taken as a fee to the liquidator. Half of the fee is given to the liquidator and half of the fee is given to the ecosystem fund.

For example, let's say a position gets liquidated for 100 NUSD. 1.25 NUSD would go to the liquidator and 1.25 NUSD would go to the ecosystem fund.

This parameter also dictates the boundary at which liquidations become full liquidations. Once the margin ratio falls below 2.5%, full liquidations occur because otherwise there won't be enough margin remaining to pay the liquidator and ecosystem fund.

### PartialLiquidationRatio

When a position gets partially liquidated, this parameter dictates how much of the position gets liquidated.

For example, if a position goes slightly underwater and is eligible for partial liquidation, a 25% `PartialLiquidationRatio` would mean 1/4 of the position size would be liquidated.

### FundingRateInterval

How often the funding rate is applied. Please read [here](../content/perps.md#funding-payments) for more information about Funding Payments.

### TwapLookbackWindow

How far back to look for time-weighted average price calculations. The default value of 900s means that the past 900s of pricefeed data will be taken into account when calculating the TWAP.

## Market Specific Parameters

| Market   | TradeLimitRatio | FluctuationLimitRatio | MaxOracleSpreadRatio | MaintenanceMarginRatio |
| -------- | --------------- | --------------------- | -------------------- | ---------------------- |
| BTC:NUSD | 0.1 (10%)       | 0.1 (10%)             | 0.1 (10%)            | 0.0625 (6.25%)         |
| ETH:NUSD | 0.1 (10%)       | 0.1 (10%)             | 0.1 (10%)            | 0.0625 (6.25%)         |

### TradeLimitRatio

Every virtual pool has a parameter called the `TradeLimitRatio`, which limits how much of the asset reserves a trader can affect in a single transaction. For example, if a virtual pool had 100 BTC and 2,000,000 NUSD, a `TradeLimitRatio` of `0.1` would only allow the trader to deposit or withdraw up to 10 BTC or 200,000 NUSD. This is done to prevent predatory traders from sending other traders' positions underwater.

### FluctuationLimitRatio

The fluctuation limit ratio limits inter-block fluctuations of the reserve assets. For example, if a virtual pool had 100 BTC and 2,000,000 NUSD at block 1, along with a `FluctuationLimitRatio` of 0.2, then the maximum amount of reserve asset fluctuation that can happen in block 2 is 20 BTC or 400,000 NUSD. This is also to prevent predatory traders from sending other traders' positions underwater.

### MaxOracleSpreadLimitRatio

Every virtual pool has a parameter called the `MaxOracleSpreadLimitRatio`. It comes into effect in extreme market conditions, when the mark (spot) price has deviated from the index (oracle) price by too much. Liquidations will start happening based on the index price instead of the mark price.

For example, let's imagine a virtual pool of BTC/NUSD and a `MaxOracleSpreadLimitRatio` of `0.1`. One day, the mark price and index price are equal to each other at $1000 (1000 NUSD per BTC). The next day, if the index price stays constant at $1000, but the mark price moves to 1100 or 900, then the market is deemed volatile and the oracle price is used for determining margin ratio and, thus, liquidations. This is to protect traders in times of extreme market volatility.

### MaintenanceMarginRatio

The minimum margin ratio required before a position becomes underwater and can be liquidated.
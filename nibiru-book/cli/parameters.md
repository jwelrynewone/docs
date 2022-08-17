---
description: Parameters used for testnet
---

# Parameters of Nibi-Perps

* [Perpetual Swap Trading](parameters.md#perpetual-swap-trading)
  * [Overall Parameters](parameters.md#overall-parameters)
    * [FeePoolFeeRatio](parameters.md#feepoolfeeratio)
    * [EcosystemFundFeeRatio](parameters.md#ecosystemfundfeeratio)
    * [LiquidationFeeRatio](parameters.md#liquidationfeeratio)
    * [PartialLiquidationRatio](parameters.md#partialliquidationratio)
    * [FundingRateInterval](parameters.md#fundingrateinterval)
    * [TwapLookbackWindow](parameters.md#twaplookbackwindow)
  * [Market Specific Parameters](parameters.md#market-specific-parameters)
    * [TradeLimitRatio](parameters.md#tradelimitratio)
    * [FluctuationLimitRatio](parameters.md#fluctuationlimitratio)
    * [MaxOracleSpreadLimitRatio](parameters.md#maxoraclespreadlimitratio)
    * [MaintenanceMarginRatio](parameters.md#maintenancemarginratio)

## Module Parameters for `x/perp`

| FeePoolFeeRatio | EcosystemFundFeeRatio | LiquidationFeeRatio | PartialLiquidationRatio | FundingRateInterval | TwapLookbackWindow |
| --------------- | --------------------- | ------------------- | ----------------------- | ------------------- | ------------------ |
| 0.001 (0.1%)    | 0.001 (0.1%)          | 0.025 (2.5%)        | 0.25 (25%)              | 30 minutes          | 900 seconds        |

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

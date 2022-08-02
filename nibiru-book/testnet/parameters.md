---
description: Parameters used for testnet
---

# Testnet Parameters

- [Testnet Parameters](#testnet-parameters)
  - [Blockchain Parameters](#blockchain-parameters)
  - [Perpetuals Trading Parameters](#perpetuals-trading-parameters)
    - [Overall Parameters](#overall-parameters)
      - [FeePoolFeeRatio](#feepoolfeeratio)
      - [EcosystemFundFeeRatio](#ecosystemfundfeeratio)
      - [LiquidationFeeRatio](#liquidationfeeratio)
      - [PartialLiquidationRatio](#partialliquidationratio)
      - [FundingRateInterval](#fundingrateinterval)
      - [TwapLookbackWindow](#twaplookbackwindow)
    - [Market Specific Parameters](#market-specific-parameters)
      - [TradeLimitRatio](#tradelimitratio)
      - [FluctuationLimitRatio](#fluctuationlimitratio)
      - [MaxOracleSpreadLimitRatio](#maxoraclespreadlimitratio)
      - [MaintenanceMarginRatio](#maintenancemarginratio)

## Blockchain Parameters

| Block Time  | Unbonding Time | Voting Period |
|-------------|----------------|---------------|
| 1.5 seconds | 21 days        | 10 hours      |

## Perpetuals Trading Parameters

### Overall Parameters

| FeePoolFeeRatio | EcosystemFundFeeRatio | LiquidationFeeRatio | PartialLiquidationRatio | FundingRateInterval | TwapLookbackWindow |
|-----------------|-----------------------|---------------------|-------------------------|---------------------|--------------------|
| 0.001 (0.1%)    | 0.001 (0.1%)          | 0.025 (2.5%)        | 0.25 (25%)              | 30 minutes          | 900 seconds        |

#### FeePoolFeeRatio

The fee paid to the treasury for opening/closing a position.

#### EcosystemFundFeeRatio

The fee paid to the ecosystem fund for opening/closing a position.

#### LiquidationFeeRatio

When a position gets liquidated (either partial or full), how much of the exchanged notional value is taken as a fee to the liquidator. Half of the fee is given to the liquidator and half of the fee is given to the ecosystem fund.

For example, let's say a position gets liquidated for 100 NUSD. 1.25 NUSD would go to the liquidator and 1.25 NUSD would go to the ecosystem fund.

This parameter also dictates the boundary at which liquidations become full liquidations. Once the margin ratio falls below 2.5%, full liquidations occur because otherwise there won't be enough margin remaining to pay the liquidator and ecosystem fund.

#### PartialLiquidationRatio

When a position gets partially liquidated, this parameter dictates how much of the position gets liquidated.

For example, if a position goes slightly underwater and is eligible for partial liquidation, a 25% `PartialLiquidationRatio` would mean 1/4 of the position size would be liquidated.

#### FundingRateInterval

How often the funding rate is applied. Please read [here](../content/perps.md#funding-payments) for more information about Funding Payments.

#### TwapLookbackWindow

How far back to look for time-weighted average price calculations. The default value of 900s means that the past 900s of pricefeed data will be taken into account when calculating the TWAP.

### Market Specific Parameters

| Market   | TradeLimitRatio | FluctuationLimitRatio | MaxOracleSpreadRatio | MaintenanceMarginRatio |
|----------|-----------------|-----------------------|----------------------|------------------------|
| BTC:NUSD | 0.1 (10%)       | 0.1 (10%)             | 0.1 (10%)            | 0.0625 (6.25%)         |
| ETH:NUSD | 0.1 (10%)       | 0.1 (10%)             | 0.1 (10%)            | 0.0625 (6.25%)         |

#### TradeLimitRatio

See [here](../content/perps.md#trade-limit-ratio).

#### FluctuationLimitRatio

See [here](../content/perps.md#fluctuation-limit-ratio).

#### MaxOracleSpreadLimitRatio

See [here](../content/perps.md#max-oracle-spread-limit-ratio).

#### MaintenanceMarginRatio

The minimum margin ratio required before a position becomes underwater and can be liquidated.

---
description: Usage guide for the CLI
---

# Using the CLI                   <!-- omit in toc -->

- [x/vpool module](#xvpool-module)
  - [`query vpool reserve-assets` - Virtual AMM liquidity](#query-vpool-reserve-assets---virtual-amm-liquidity)
  - [`query vpool prices` - Solve xy=k for x (base amount)](#query-vpool-prices---solve-xyk-for-x-base-amount)
  - [`query vpool all-pools` - Fetch all pools and prices](#query-vpool-all-pools---fetch-all-pools-and-prices)
- [x/perp module](#xperp-module)
  - [Opening a position](#opening-a-position)
  - [Closing a position](#closing-a-position)
  - [Add margin to a position](#add-margin-to-a-position)
  - [Remove margin from a position](#remove-margin-from-a-position)
  - [Query a position](#query-a-position)

## x/vpool module

### `query vpool reserve-assets` - Virtual AMM liquidity

```sh
# template 
nibid q vpool reserve-assets [pair] [flags]
```

- `pair`: A pair is a string of the form "`base:quote`". For example, `ubtc:unusd` or `ueth:unusd`.

```sh
nibid q vpool reserve-assets ubtc:unusd 
nibid q vpool reserve-assets ueth:unusd
```

### `query vpool prices` - Solve xy=k for x (base amount) 

A perpetual swap on a virtual pool is just like a swap on Uniswap V2 or SushiSwap. 
When the trader goes long, she's essentially buying base assets, `x` (selling `y`). Similarly, going short means selling `x`.

The `vpool prices` query returns the amount of `y` (virtual quote) received or required to swap with some amount of `x` (virtual base). 

```sh
# template 
nibid q vpool prices [pair] [direction] [base-asset-amount] [flags]
```

- `pair`: A pair is a string of the form "`base:quote`". For example, `ubtc:unusd` or `ueth:unusd`.
- `direction`: The direction is an integer representing long (1) or short (0). Note that values greater than 1 will still run. The default `direction` is short if you enter a value an integer greater than 1.
- `base-asset-amount`: Amount of virtual pool, `x` tokens. These are the derivatives assets meant to track the underlying. In other words, a `ueth` pair uses the price of Ether as its index price.

#### Examples - `q vpool prices`

```sh
nibid q vpool prices ubtc:unusd 0 7
# Returns the amount of unusd required to purchase 7 ubtc of short exposure 
# Equivalently, the nusd recieved from closing 7 ubtc of long exposure
```

```sh
nibid q vpool prices ueth:unusd 1 45
# Returns the amount of unusd required to purchase 45 ueth of long exposure 
# Equivalently, the nusd recieved from closing 45 ubtc of short exposure
```

### `query vpool all-pools` - Fetch all pools and prices

This command doesn't require any arguments. 

```sh
nibid query vpool all-pools 
```

It displays all available information for every virtual pool. Here's an example output in YAML.

```yaml
pools:
- base_asset_reserve: "49999999999.960000000000032000"
  fluctuation_limit_ratio: "0.100000000000000000"
  maintenance_margin_ratio: "0.062500000000000000"
  max_leverage: "12.000000000000000000"
  max_oracle_spread_ratio: "0.100000000000000000"
  pair:
    token0: ubtc
    token1: unusd
  quote_asset_reserve: "1000000000000800.000000000000000000"
  trade_limit_ratio: "0.100000000000000000"
prices:
- block_number: "3900"
  index_price: "0.000000000000000000"
  mark_price: "20000.000000032000000000"
  swap_invariant: "50000000000000000000000000"
  twap_mark: "20000.000000015213377174"
```

## x/perp module

### Opening a position

```bash
# parameters
nibid tx perp open-position buy|sell pair leverage quoteAmt baseAmtLimit [flags]

# example
nibid tx perp open-position buy ubtc:unusd 10 1000000 0 --from addr
```

### Closing a position

```bash
# parameters
nibid tx perp close-position pair [flags]

# example
nibid tx perp close-position ubtc:unusd --from addr
```

### Add margin to a position

```bash
# parameters
nibid tx perp add-margin pair margin [flags]

# example
nibid tx perp add-margin ubtc:unusd 1000000unusd --from addr
```

### Remove margin from a position

```bash
# parameters
nibid tx perp remove-margin pair margin [flags]

# example
nibid tx perp remove-margin ubtc:unusd 1000000unusd --from addr
```

### Query a position

```bash
# parameters
nibid query perp trader-position traderAddr pair [flags]

# example
nibid query perp trader-position nibi1zaavvzxez0elundtn32qnk9lkm8kmcsz44g7xl ubtc:unusd --node tcp://localhost:26657
```


<!--  Commenting out for now - dex, stablecoin

## x/dex module

### Provide liquidity to a pool

```bash
# parameters
nibid tx dex join-pool --pool-id poolId --tokens-in token1,token2 [flags]

# example
nibid tx dex join-pool --pool-id 1 --tokens-in 100unibi,100unusd --from addr
```

### Withdraw liquidity from a pool

```bash
# parameters
nibid tx dex exit-pool --pool-id poolId --pool-shares-out lpToken [flags]

# example
nibid tx dex --pool-id 1 --pool-shares-out 100nibiru/pool/1 --from addr
```

### Swap assets

```bash
# parameters
nibid tx dex swap-assets --pool-id poolId --tokens-in tokensIn --token-out-denom tokenOutDenom [flags]

# example
nibid tx dex swap-assets --pool-id 1 --tokens-in 100unusd --token-out-denom unibi --from addr
```

## x/stablecoin module

### Mint stablecoin

```bash
# parameters
nibid tx stablecoin mint-sc stableAmt [flags]

# example
nibid tx stablecoin mint-sc 1000000unusd [flags]
```

### Burn stablecoin

```bash
# parameters
nibid tx stablecoin burn-sc stableAmt [flags]

# example
nibid tx stablecoin burn-sc 1000000unusd [flags]
``` 

-->

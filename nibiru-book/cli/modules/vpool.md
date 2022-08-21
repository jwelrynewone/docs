---
description: >-
  The vpool module manages the virtual AMM pools (vpools) that support Nibi-Perps.
---

# vpool module

#### Queries

| `nibid query vpool` | Description |
| :--- | :--- |
| [all-pools](#nibid-query-vpool-all-pools) | The most informative query. Retusn all prices and parameters on every pool. |
| [reserve-assets](#nibid-query-vpool-reserve-assets) | Solves the constant-product formulate for the required base asset amount. Calls the `GetBaseAssetPrice` function. Direction is 1 (`ADD_TO_POOL`) or 2 (`REMOVE_FROM_POOL`) |
| [prices](#nibid-query-vpool-prices) | Query the quote and base asset reserves for a vpool. |

### nibid query vpool reserve-assets 

Returns the virtual pool liquidity

```sh
nibid q vpool reserve-assets [pair] [flags]
```

- `pair`: A pair is a string of the form "`base:quote`". For example, `ubtc:unusd` or `ueth:unusd`.

```sh
# Examples
nibid q vpool reserve-assets ubtc:unusd 
nibid q vpool reserve-assets ueth:unusd
```

### nibid query vpool prices 

A perpetual swap on a virtual pool is just like a swap on Uniswap V2 or SushiSwap. 
When the trader goes long, she's essentially buying base assets, `x` (selling `y`). Similarly, going short means selling `x`.

The `vpool prices` query returns the amount of `y` (virtual quote) received or required to swap with some amount of `x` (virtual base). In other words, it solves `xy=k` for `x` (base amount) .

```sh
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

### nibid query vpool all-pools

This command fetches all pools and corresponding prices. It doesn't require any arguments. 

```sh
nibid query vpool all-pools 
```

Here's an example output in YAML format.

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

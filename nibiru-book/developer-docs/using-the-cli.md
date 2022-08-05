---
description: Usage guide for the CLI
---

# Using the CLI                   <!-- omit in toc -->

- [x/perp module](#xperp-module)
  - [Opening a position](#opening-a-position)
  - [Closing a position](#closing-a-position)
  - [Add margin to a position](#add-margin-to-a-position)
  - [Remove margin from a position](#remove-margin-from-a-position)
  - [Query a position](#query-a-position)
- [x/vpool module](#xvpool-module)
  - [Query vpool reserve assets](#query-vpool-reserve-assets)
  - [Query all pools](#query-all-pools)
  - [Query base asset prices](#query-base-asset-prices)
- [x/dex module](#xdex-module)
  - [Provide liquidity to a pool](#provide-liquidity-to-a-pool)
  - [Withdraw liquidity from a pool](#withdraw-liquidity-from-a-pool)
  - [Swap assets](#swap-assets)
- [x/stablecoin module](#xstablecoin-module)
  - [Mint stablecoin](#mint-stablecoin)
  - [Burn stablecoin](#burn-stablecoin)

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

## x/vpool module

### Query vpool reserve assets

```bash
# parameters
nibid query vpool reserve-assets pair [flags]

# example
nibid query vpool reserve-assets ubtc:unusd --node tcp://localhost:26657
```

### Query all pools

```bash
# parameters
nibid query vpool all-pools [flags]

# example
nibid query vpool all-pools --node tcp://localhost:26657
```

### Query base asset prices

```bash
# parameters
nibid query vpool prices pair direction baseAmt

# example
nibid query vpool prices ubtc:unusd 1 1000000
```

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

---
description: Usage guide for the CLI
---

# Using the CLI                   <!-- omit in toc -->

- [perp module](#perp-module)
  - [nibid tx perp open-position](#nibid-tx-perp-open-position)
  - [nibid tx perp close-position](#nibid-tx-perp-close-position)
  - [nibid tx perp add-margin](#nibid-tx-perp-add-margin)
  - [nibid tx perp remove-margin](#nibid-tx-perp-remove-margin)
  - [nibid query perp trader-position](#nibid-query-perp-trader-position)
  - [nibid query perp params](#nibid-query-perp-params)


## perp module

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
nibid tx perp close-position pair [flags]
```

```sh
# example
nibid tx perp close-position ubtc:unusd --from addr
```

### nibid tx perp add-margin

```sh
nibid tx perp add-margin pair margin [flags]
```

```sh
# example
nibid tx perp add-margin ubtc:unusd 1000000unusd --from addr
```

### nibid tx perp remove-margin

```sh
nibid tx perp remove-margin pair margin [flags]
```

```
# example
nibid tx perp remove-margin ubtc:unusd 1000000unusd --from addr
```

### nibid query perp trader-position

```sh
nibid query perp trader-position traderAddr pair [flags]
```

```sh
# example
nibid query perp trader-position nibi1zaavvzxez0elundtn32qnk9lkm8kmcsz44g7xl ubtc:unusd --node tcp://localhost:26657
```

### nibid query perp params

```sh
nibid a perp params
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

---
description: An introduction to clients that enable programmatic access to Nibiru.
---

# Clients for Nibiru                   <!-- omit in toc -->

- [Python SDK](#python-sdk)
- [The nibid CLI](#the-nibid-cli)
- [TypeScript SDK](#typescript-sdk)

# Python SDK

[NibiruChain/py-sdk](https://github.com/NibiruChain/py-sdk/)

# The nibid CLI

{% content-ref url="modules/README.md" %}
[modules/README.md](modules/README.md)
{% endcontent-ref %}

[NibiruChain/nibiru](https://github.com/NibiruChain/nibiru/)

# TypeScript SDK

[NibiruChain/ts-sdk](https://github.com/NibiruChain/ts-sdk/)


<!-- Client options 

Python SDK
The nibid CLI
TypeScript SDK

-->



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

---
description: Instructions on joining the testnet as a validator
---

# Validating on Testnet

As the first step, please follow the [instructions](../nodes-and-validators/joining-testnet/) to join the testnet.

## Create the validator

Make sure you have the chain synced prior to executing this command.

```bash
nibid tx staking create-validator \
--amount 10000000unibi \
--commission-max-change-rate "0.1" \
--commission-max-rate "0.20" \
--commission-rate "0.1" \
--min-self-delegation "1" \
--details "put your validator description there" \
--pubkey=$(nibid tendermint show-validator) \
--moniker <your_moniker> \
--chain-id nibiru-testnet-1 \
--gas-prices 0.025unibi \
--from <key-name>
```

Verify your validator status via [nibiru-testnet-1 block explorer](https://explorer.testnet-1.nibiru.fi/)

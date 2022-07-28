---
description: Instructions on joining the testnet as a validator
---

# Running a validator

As the first step, please follow the [instructions](testnet.md) to join the testnet.

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
--chain-id nibiru-testnet-3 \
--gas-prices 0.025unibi \
--from <key-name>
```

Verify your validator status via the [nibiru-testnet-3 Block Explorer](http://ec2-54-221-169-63.compute-1.amazonaws.com:3003/validators).

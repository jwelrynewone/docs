---
description: Instructions for validators to rebuild in the case of a chain reset.
---

# Resetting a validator node

Any upcoming resets are going to be announced in the Nibiru Chain Discord server (`#testnet` channel).\
To reset your node and rejoin the testnet, please follow the steps below:

## Remove the old chain data and binary

```bash
sudo rm -rf $HOME/.nibid
sudo rm $HOME/go/bin/nibid
```

## Install the new binary version

Version is going to be announced in the Discord `#testnet` channel

```bash
# git clone git@github.com:NibiruChain/nibiru.git # (ssh)
# git clone https://github.com/NibiruChain/nibiru.git # (https)
cd nibiru
git pull
git fetch --tags
git checkout v0.13.0
make install
```

Verify the binary version by running

```bash
nibid version
# > v0.13.0
```

## Recreate the validator

Follow the same steps from ["Validating on Testnet"](./validators.md) again.

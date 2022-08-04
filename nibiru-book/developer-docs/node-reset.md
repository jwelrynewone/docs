# Node Reset

  Any upcoming resets are going to be announced in the Nibiru Chain Discord server (`#testnet` channel).  
  To reset your node and rejoin the testnet, please follow the steps below:

## Remove the old chain data and binary

  ```bash
  sudo rm -rf $HOME/.nibid
  sudo rm $HOME/go/bin/nibid
  ```
  
## Install the new binary version

  Version is going to be announced in the Discord `#testnet` channel

  ```bash
  cd nibiru
  git pull
  git fetch --tags
  git checkout v0.12.1
  make install
  ```

  Verify the binary version by running
  
  ```bash
  nibid version
  # v0.12.1
  ```

## Recreate the validator

Follow the same steps [from Joining Testnet](joining-testnet.md) again

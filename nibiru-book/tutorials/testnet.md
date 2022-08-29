---
description: >-
  Testnets are testing instances of the Nibiru blockchain. Testnet tokens are
  separate and distinct from real assets.
---

# Joining Testnet                               <!-- omit in toc -->

You can find a table of each Nibiru testnet and its current status below. In order to join a network, you'll need to use its corresponding version of the binary.

### Networks

| Network | Chain ID         | Description              | Version | Status |
| ------- | ---------------- | ------------------------ | ------- | ------ |
| Testnet | nibiru-testnet-3 | Nibiru's default testnet | v0.13.0 | Active |

{% hint style="info" %}
You can see current status of the blockchain at the [Nibiru Block Explorer](https://explorer.testnet.nibiru.fi/).
The explorer allows you to search through transactions, blocks, wallet addresses, and other on-chain data.
{% endhint %}

### Blockchain Parameters

| Block Time | Unbonding Time | Voting Period |
| ---------- | -------------- | ------------- |
| 2 seconds  | 21 days        | 10 hours      |

**Contents**

- [Installation prerequisites and Nibiru binary](#installation-prerequisites-and-nibiru-binary)
  - [Minimum hardware requirements](#minimum-hardware-requirements)
  - [Update the system](#update-the-system)
  - [Install prerequisites](#install-prerequisites)
  - [Install Golang](#install-golang)
  - [Verify nibid version](#verify-nibid-version)
  - [Setup Cosmovisor (Option 1, recommended)](#setup-cosmovisor-option-1-recommended)
  - [nibid systemd (Option 2)](#nibid-systemd-option-2)
  - [Init the Chain](#init-the-chain)
- [Some example `nibid` commands](#some-example-nibid-commands)

## Installation prerequisites and Nibiru binary

### Minimum hardware requirements

- 2CPU
- 4GB RAM
- 100GB of disk space (SSD)

### Update the system

```bash
sudo apt update
sudo apt upgrade --yes
```

### Install prerequisites

```bash
sudo apt install git build-essential ufw curl jq snapd make gcc --yes
```

### Install Golang

```bash
wget -q -O - https://git.io/vQhTU | bash -s -- --version 1.18
```

The official installation instructions can be found at [go.dev/docs/install](https://go.dev/doc/install).

After the installation open a new terminal to properly load go or run `source $HOME/.bashrc`

### Verify nibid version

Please check for the correct version of the binary. If you have not installed `nibid`, please start with the instructions on [building the Nibiru binary](./building-the-nibiru-binary.md) or extract the archive received from the Nibiru team.

```bash
nibid version
v0.13.0
```

**Then choose systemd or Cosmovisor**

### Setup Cosmovisor (Option 1, recommended)

1. Install Cosmovisor

    ```bash
    git clone https://github.com/cosmos/cosmos-sdk
    cd cosmos-sdk
    git checkout cosmovisor/v1.2.0
    make cosmovisor
    cp cosmovisor/cosmovisor $GOPATH/bin/cosmovisor
    cd $HOME
    ```

2. Set up enviromental variables

    ```bash
    export DAEMON_NAME=nibid
    export DAEMON_HOME=$HOME/.nibid
    source ~/.profile
    ```

3. Create required directories

    ```bash
    mkdir -p $DAEMON_HOME/cosmovisor/genesis/bin
    mkdir -p $DAEMON_HOME/cosmovisor/upgrades
    ```

4. Add the genesis version of the binary (currently it is `v0.13`). You can verify your binary location with `which nibid` command. For the default location you can use the example below:

    ```bash
    cp ~/go/bin/nibid $DAEMON_HOME/cosmovisor/genesis/bin
    ```

5. Create the service for the Cosmovisor

    ```bash
    sudo tee /etc/systemd/system/cosmovisor-nibiru.service<<EOF
    [Unit]
    Description=Cosmovisor for Nibiru Node
    Requires=network-online.target
    After=network-online.target

    [Service]
    Type=exec
    User=<your_user>
    Group=<your_user_group>
    ExecStart=/home/<your_user>/go/bin/cosmovisor run start --home /home/<your_user>/.nibid
    Restart=on-failure
    RestartSec=3
    Environment="DAEMON_NAME=nibid"
    Environment="DAEMON_HOME=/home/<your_user>/.nibid"
    Environment="DAEMON_ALLOW_DOWNLOAD_BINARIES=false"
    Environment="DAEMON_RESTART_AFTER_UPGRADE=true"
    Environment="DAEMON_LOG_BUFFER_SIZE=512"
    LimitNOFILE=65535

    [Install]
    WantedBy=multi-user.target
    EOF
    ```

    Enable the service:

    ```bash
    sudo systemctl daemon-reload
    sudo systemctl enable cosmovisor-nibiru
    ```

### nibid systemd (Option 2)

1. Create a service file

    ```bash
    sudo tee /etc/systemd/system/nibiru.service<<EOF
    [Unit]
    Description=Nibiru Node
    Requires=network-online.target
    After=network-online.target

    [Service]
    Type=exec
    User=<your_user>
    Group=<your_user_group>
    ExecStart=/home/<your_user>/go/bin/nibid start --home /home/<your_user>/.nibid
    Restart=on-failure
    ExecReload=/bin/kill -HUP $MAINPID
    KillSignal=SIGTERM
    PermissionsStartOnly=true
    LimitNOFILE=65535

    [Install]
    WantedBy=multi-user.target
    EOF
    ```

2. Enable the service

    ```bash
    sudo systemctl daemon-reload
    sudo systemctl enable nibiru
    ```

### Init the Chain

1. Init the chain

    ```bash
    nibid init <moniker-name> --chain-id=nibiru-testnet-3 --home $HOME/.nibid
    ```

2. Create a local key pair

    ```bash
    nibid keys add <key-name>
    nibid keys show <key-name> -a
    ```

3. Copy the genesis file included in the archive received from the Nibiru team to the `$HOME/.nibid/config` folder.

    ```bash
    cp genesis.json $HOME/.nibid/config/genesis.json
    ```

    **Genesis.json sha256**

    ```bash
     shasum -a 256 $HOME/.nibid/config/genesis.json
     94fbd99543f4b7da14f292ea1c61b21ba753e3a84cca64454b8c2fd2d209e6de /home/<user>/.nibid/config/genesis.json
    ```

4. Update persistent peers list in the configuration file `$HOME/.nibid/config/config.toml` with the ones from the persistent\_peers.txt.

    Navigate to the directory with the `persistent_peers.txt`file you've received from the Nibiru team manually and run

    ```bash
    export PEERS=$(cat persistent_peers.txt| tr '\n' '_' | sed 's/_/,/g;s/,$//;s/^/"/;s/$/"/') && sed -i "s/persistent_peers = \"\"/persistent_peers = ${PEERS}/g" $HOME/.nibid/config/config.toml
    ```

5. Set minimum gas prices

    ```bash
    sed -i 's/minimum-gas-prices =.*/minimum-gas-prices = "0.025unibi"/g' $HOME/.nibid/config/app.toml
    ```

6. Update block time parameters

    ```bash
     sed -i 's/timeout_propose =.*/timeout_propose = "100ms"/g' $HOME/.nibid/config/config.toml
     sed -i 's/timeout_propose_delta =.*/timeout_propose_delta = "500ms"/g' $HOME/.nibid/config/config.toml
     sed -i 's/timeout_prevote =.*/timeout_prevote = "100ms"/g' $HOME/.nibid/config/config.toml
     sed -i 's/timeout_prevote_delta =.*/timeout_prevote_delta = "500ms"/g' $HOME/.nibid/config/config.toml
     sed -i 's/timeout_precommit =.*/timeout_precommit = "100ms"/g' $HOME/.nibid/config/config.toml
     sed -i 's/timeout_precommit_delta =.*/timeout_precommit_delta = "500ms"/g' $HOME/.nibid/config/config.toml
     sed -i 's/timeout_commit =.*/timeout_commit = "1s"/g' $HOME/.nibid/config/config.toml
     sed -i 's/skip_timeout_commit =.*/skip_timeout_commit = false/g' $HOME/.nibid/config/config.toml
    ```

7. Start your node (choose one of the options)

    ```bash
    # without a daemon
    nibid start

    # with systemd
    sudo systemctl start nibiru

    # with cosmovisor
    sudo systemctl start cosmovisor-nibiru
    ```

8. Request tokens from the [Web Faucet for nibiru-testnet-3](https://faucet.testnet-3.nibiru.fi/) if required.

    ```bash
    curl -X POST -d '{"address": "your address here", "coins": ["10000000unibi"]}' https://faucet.testnet-3.nibiru.fi/
    ```

    You can also request `unusd`.

    ```bash
    curl -X POST -d '{"address": "your address here", "coins": ["100000000000unusd"]}' <https://faucet.testnet-3.nibiru.fi/>
    ```

    Please note, that current Testnet Web Faucet limit is `10000000unibi` and `100000000000unusd`.

    You can also use the testnet Faucet from the #faucet channel of the [Nibiru Chain Discord](https://discord.gg/sgPw8ZYfpQ).

See the [validator docs](validators.md) on how to participate as a validator.

## Some example `nibid` commands

Ex: Query to see which pools are open for trading on Nibi-Perps and the current mark and index prices.

```bash
nibid query vpool all-pools
```

Ex: Open a long position on BTC with 10 leverage with 100 μNUSD as margin and uncapped slippage tolerance.

```bash
# template
nibid tx perp open-position buy|sell pair leverage quoteAmt baseAmtLimit [flags]
# example
nibid tx perp open-position buy ubtc:unusd 10 100 0 --from <key> --home $HOME/.nibid
```

See the [`nibid` CLI guide](../clients/modules/README.md) for the full list of `nibid` commands.

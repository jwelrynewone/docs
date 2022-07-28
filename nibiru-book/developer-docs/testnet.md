---
description: >-
  Testnets are testing instances of the Nibiru blockchain. Testnet tokens are
  separate and distinct from real assets.
---

# ⛓️️ Testnet

- [⛓️️ Testnet](#️️-testnet)
  - [1. Initialize the chain](#1-initialize-the-chain)
  - [2. Create a local key pair](#2-create-a-local-key-pair)
  - [3. Download genesis file](#3-download-genesis-file)
    - [Genesis.json sha256](#genesisjson-sha256)
  - [4. Update persistent peers list](#4-update-persistent-peers-list)
  - [5. Set gas prices](#5-set-gas-prices)
  - [6. Start your node](#6-start-your-node)
  - [7. Update the binary](#7-update-the-binary)
  - [8. Request tokens from faucet](#8-request-tokens-from-faucet)
  - [Some example `nibid` commands](#some-example-nibid-commands)

You can find the table of each Nibiru testnet and its current status below. In order to join a network, you'll need to use its corresponding version of the binary, which is its version tag on GitHub.

| Network | Chain ID         | Version | Description                      | Status |
| ------- | ---------------- | ------- | -------------------------------- | ------ |
| Testnet | nibiru-testnet-3 | v0.9.2  | Nibiru's default testnet | active |

{% hint style="info" %}
You can see the validator status via the [`nibiru-testnet-3` Block Explorer](http://ec2-54-221-169-63.compute-1.amazonaws.com:3003/validators).&#x20;
{% endhint %}

As the first step, please check for the correct version of the binary. If you have not installed `nibid`, please start with the instructions on [building the Nibiru binary](developer-docs/building-the-nibiru-binary.md).

```
nibid version
v0.9.2
```

***

**[OPTIONAL]** To run the binary as a background daemon, create a system service

```shell
sudo tee /etc/systemd/system/nibiru.service<<EOF
[Unit]
Description=Nibiru Node
Requires=network-online.target
After=network-online.target

[Service]
Type=exec
User=<your_user>
Group=<your_user_group>
ExecStart=/<path>/<to>/<binary> start --home /home/<your_user>/.nibid
Restart=on-failure
ExecReload=/bin/kill -HUP $MAINPID
KillSignal=SIGTERM
PermissionsStartOnly=true
LimitNOFILE=65535

[Install]
WantedBy=multi-user.target
EOF
```

The following commands enable the service.

```shell
sudo systemctl daemon-reload
sudo systemctl enable nibiru
```

Otherwise, run the binary manually via the command line

## 1. Initialize the chain

```shell
nibid init <moniker-name> --chain-id=nibiru-testnet-3 --home $HOME/.nibid
```

## 2. Create a local key pair

```shell
nibid keys add <key-name> --home $HOME/.nibid
nibid keys show <key-name> -a --home $HOME/.nibid
```

This will be your key for signing transactions. Ensure that you keep it secret. Do not share the mnemonic with anyone.

## 3. Download genesis file

   ```bash
   cd $HOME
   git clone https://github.com/NibiruChain/Networks
   cp $HOME/Networks/Testnet/nibiru-testnet-3/genesis.json $HOME/.nibid/config/genesis.json
   ```

### Genesis.json sha256

   ```bash
    shasum -a 256 $HOME/.nibid/config/genesis.json
    5c881b95bfa735cb3f60513910f9c8035a6888933b4d2cea89fa0ef69351134c  /home/<user>/.nibid/config/genesis.json
   ```

   Or copy the genesis file included in the archive received from the Nibiru Team to the `$HOME/.nibid/config` folder

## 4. Update persistent peers list

```bash
cd $HOME/Networks/Testnet/nibiru-testnet-3
export PEERS=$(cat persistent_peers.txt| tr '\n' '_' | sed 's/_/,/g;s/,$//;s/^/"/;s/$/"/') && sed -i "s/persistent_peers = \"\"/persistent_peers = ${PEERS}/g" $HOME/.nibid/config/config.toml
```

or navigate to the directory with the `persistent_peers.txt`file you've received from the Nibiru team manually and run

```bash
export PEERS=$(cat persistent_peers.txt| tr '\n' '_' | sed 's/_/,/g;s/,$//;s/^/"/;s/$/"/') && sed -i "s/persistent_peers = \"\"/persistent_peers = ${PEERS}/g" $HOME/.nibid/config/config.toml
```

## 5. Set gas prices

```bash
sudo nano $HOME/.nibid/config/app.toml
# recommended to set to "0.025unibi"
```

## 6. Start your node

```bash
nibid start --home $HOME/.nibid
```

{% hint style="info" %}
If you set up a system daemon above, the command will be:`sudo systemctl start nibiru`
{% endhint %}

## 7. Update the binary

When the chain reaches upgrade height (not required for Cosmovisor setup)  

Your node is going to stop syncing the blocks at height 98640. You will see the error message in the logs like `ERR UPGRADE "v0.10.0" NEEDED at height: 98640:`  

Stop your nibid binary or its service, if you've configured one. Open the folder with the Nibiru git ($HOME/nibiru by default) and update the binary  

```bash
git pull
git fetch --tags
git checkout v0.10.0
make install
```

Launch your binary or service again and confirm it is further syncing the blocks with `nibid status 2>&1 | jq .`

## 8. Request tokens from faucet

Go to the [Web Faucet for nibiru-testnet-3](http://ec2-35-172-193-127.compute-1.amazonaws.com:8003/) and enter your address.

Or you can request tokens via CLI:

```bash
curl -X POST -d '{"address": "your address here", "coins": ["10000000unibi"]}' http://ec2-35-172-193-127.compute-1.amazonaws.com:8003
```

Or tou can also use Testnet Discord Faucet in the Nibiru Chain server (#faucet channel).

Please note, that current Testnet Web Faucet limit is `10000000unibi`.

## Some example `nibid` commands

Query to see which pools are open for trading on Nibi-Perps:

```bash
nibid query vpool all-pools
```

Open a position.

```bash
nibid tx perp open-position buy ubtc:unusd 10 100 0 --from <name> --home $HOME/.nibid
```

See [here](using-the-cli.md) for the full list of `nibid` commands.

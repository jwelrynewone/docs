---
description: >-
  Testnets are testing instances of the Nibiru blockchain. Testnet tokens are
  separate and distinct from real assets.
---

# ⛓️️ Testnet

You can find the table of each Nibiru testnet and its current status below. In order to join a network, you'll need to use its corresponding version of the binary, which is its version tag on GitHub.

| Network | Chain ID         | Version | Description                      | Status |
| ------- | ---------------- | ------- | -------------------------------- | ------ |
| Testnet | nibiru-testnet-3 | v0.9.2  | Nibiru-1: Default Nibiru testnet | active |

{% hint style="info" %}
You can see the validator status via the [`nibiru-testnet-3` Block Explorer](http://ec2-54-221-169-63.compute-1.amazonaws.com:3003/validators).&#x20;
{% endhint %}

As the first step, please check for the correct version of the binary. If you have not installed `nibid`, please start with the instructions on [building the Nibiru binary](developer-docs/building-the-nibiru-binary.md).

```
nibid version
v0.9.2
```

***

**\[OPTIONAL]** To run the binary as a background daemon, create a system service

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

### **1. Initialize the chain and start your node.**

```shell
nibid init <moniker-name> --chain-id=nibiru-testnet-2 --home $HOME/.nibid
```

### **2. Create a local key pair.**&#x20;

```shell
nibid keys add <key-name> --home $HOME/.nibid
nibid keys show <key-name> -a --home $HOME/.nibid
```

This will be your key for signing transactions. Ensure that you keep it secret. Do not share the mnemonic with anyone.

### **3. Set the genesis**

Download genesis file**:**

```shell
curl https://<your_github_access_token>@raw.githubusercontent.com/NibiruChain/Networks/main/Testnet/Nibiru-testnet-1/genesis.json > $HOME/.nibid/config/genesis.jsonCopy the provided genesis.json file to your chain’s config folder.
```

Genesis sha256

```shell
 shasum -a 256 ~/.nibid/config/genesis.json
 5c881b95bfa735cb3f60513910f9c8035a6888933b4d2cea89fa0ef69351134c  /home/<user>/.nibid/config/genesis.json
```

```bash
mv genesis.json $HOME/.nibid/config/genesis.json
```

### **4. Set persistent peers**

Update the persistent peers config with the provided `persistent_peers.txt`. This is how your node will know which initial peers to talk to in order to catch up the block history.

```shell
cd $HOME
git clone https://github.com/NibiruChain/Networks
cd Networks/Testnet/Nibiru-testnet-1
export PEERS=$(cat persistent_peers.txt| tr '\n' '_' | sed 's/_/,/g;s/,$//;s/^/"/;s/$/"/') && sed -i "s/persistent_peers = \"\"/persistent_peers = ${PEERS}/g" $HOME/.nibid/config/config.toml
```

***

```shell
export PEERS=$(cat persistent_peers.txt| tr '\n' '_' | sed 's/_/,/g;s/,$//;s/^/"/;s/$/"/') && sed -i "s/persistent_peers = \"\"/persistent_peers = ${PEERS}/g" $HOME/.nibid/config/config.toml
```

### 5. Start your node.

```
nibid start --home $HOME/.nibid
```

{% hint style="info" %}
If you set up a system daemon above, the command will be:`sudo systemctl start nibiru`
{% endhint %}

### **6. Request tokens from the faucet**

```
curl -X POST -d '{"address": "your address here", "coins": ["10000000unibi"]}' http://ec2-35-172-193-127.compute-1.amazonaws.com:8003
```

Please note, that current Testnet Web Faucet limit is `10000000unibi` (10 NIBI).



### Some example `nibid` commands

Query to see which pools are open for trading on Nibi-Perps:

```
nibid query vpool all-pools
```

Open a position.

```
nibid tx perp open-position buy uBTC:uNUSD 10 100 0 --from <name> --home $HOME/.nibid
```

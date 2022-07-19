# ⛓️️ Testnet and the nibid CLI            <!-- omit in toc -->

- [Local development](#local-development)
    - [Build and install the Nibiru binary](#build-and-install-the-nibiru-binary)
- [Testnet](#testnet)

---

# Local development

#### Install Go

The installation process for Go depends on your OS. Nibiru is meant to build with a Unix system such as MacOS, Ubuntu, or WSL. See [go.dev/doc/install](https://go.dev/doc/install) for instructions on how to install Go.

#### Install make and gcc

```sh
sudo apt-get update
sudo apt-get upgrade
```

### Build and install the Nibiru binary

Begin by cloning the `nibiru` repo.

```sh
cd $HOME
git clone https://github.com/NibiruChain/nibiru
cd nibiru
make build 
make install
```

Running each of these commands should have created a `build` folder and installed a binary named `nibid`. You should now be able to view a list of all available commands with 
```sh
nibid [command]
```

Optionally, you can run the all of the tests to make sure everything is working properly.
```sh
go test ./... -cover 
```

Lastly, you can run the chain for local development with `make localnet`. After opening another terminal, you'll be able to use the full suite of `nibid` commands.

#### Note: Docker Engine

You'll need Docker to run commands that use external containers like `make proto-gen`. Instructions for installing Docker can be found [here](https://docs.docker.com/engine/install/).

<!-- 
instructions for preparing an account 
nibid keys list 
-->

---

# Testnet 

As the first step, please check for the correct version of the binary 

```sh
nibid version
v0.9.2
```

---

**[OPTIONAL]** To run the binary as a background daemon, create a system service

```sh
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

sudo systemctl daemon-reload
sudo systemctl enable nibiru
```

Otherwise, run the binary manually via the command line


#### Create the config folder

```sh
nibid init <moniker-name> --chain-id=nibiru-testnet-2 --home $HOME/.nibid
```

#### Create a local keypair

```sh
nibid keys add <key-name> --home $HOME/.nibid
nibid keys show <key-name> -a --home $HOME/.nibid
```

This will be your key for signing transactions. Ensure that you keep it secret. Do not share the mnemonic with anyone.

#### Setting the genesis

Copy the provided `genesis.json` file to your chain’s config folder. 

```bash
mv genesis.json $HOME/.nibid/config/genesis.json
```

#### Setting persistent peers

Update the persistent peers config with the provided `persistent_peers.txt`. This is how your node will know which initial peers to talk to in order to catch up the block history.

```sh
export PEERS=$(cat persistent_peers.txt| tr '\n' '_' | sed 's/_/,/g;s/,$//;s/^/"/;s/$/"/') && sed -i "s/persistent_peers = \"\"/persistent_peers = ${PEERS}/g" $HOME/.nibid/config/config.toml
```

---

Run the binary. 

```sh
nibid start --home $HOME/.nibid
```

If you set up a system daemon above, the command will be:

```sh
sudo systemctl start nibiru
```

#### Request tokens from the faucet

```sh
curl -X POST -d '{"address": "your address here", "coins": ["10000000unibi"]}' http://ec2-35-172-193-127.compute-1.amazonaws.com:8003
```

---

Query to see which pools are open for trading on Nibi-Perps:

```sh
nibid query vpool all-pools
```

Open a position.

```sh
nibid tx perp open-position buy uBTC:uNUSD 10 100 0 --from <name> --home $HOME/.nibid
```
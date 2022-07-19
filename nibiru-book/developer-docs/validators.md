# Running the `nibid` binary

As the first step, please check for the correct version of the binary 

```bash
$ nibid version
v0.9.2
```

---

**[OPTIONAL]** To run the binary as a background daemon, create a system service

```bash
$ sudo tee /etc/systemd/system/nibiru.service<<EOF
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

$ sudo systemctl daemon-reload
$ sudo systemctl enable nibiru
```

Otherwise, run the binary manually via the command line


#### Create the config folder

```bash
$ nibid init <moniker-name> --chain-id=nibiru-testnet-2 --home $HOME/.nibid
```

#### Create a local keypair

```bash
nibid keys add <key-name> --home $HOME/.nibid
nibid keys show <key-name> -a --home $HOME/.nibid
```

This will be your key for signing transactions. Ensure that you keep it secret. Do not share the mnemonic with anyone.

#### Setting the genesis

Copy the provided `genesis.json` file to your chain’s config folder. 

```bash
$ mv genesis.json $HOME/.nibid/config/genesis.json
```

#### Setting persistent peers

Update the persistent peers config with the provided `persistent_peers.txt`. This is how your node will know which initial peers to talk to in order to catch up the block history.

```bash
export PEERS=$(cat persistent_peers.txt| tr '\n' '_' | sed 's/_/,/g;s/,$//;s/^/"/;s/$/"/') && sed -i "s/persistent_peers = \"\"/persistent_peers = ${PEERS}/g" $HOME/.nibid/config/config.toml
```

---

Run the binary. 

```bash
$ nibid start --home $HOME/.nibid
```

If you set up a system daemon above, the command will be:

```bash
$ sudo systemctl start nibiru
```

#### Request tokens from the faucet

```bash
$ curl -X POST -d '{"address": "your address here", "coins": ["10000000unibi"]}' http://ec2-35-172-193-127.compute-1.amazonaws.com:8003
```

---

Open a position

```bash
$ nibid tx perp open-position buy uBTC:uNUSD 10 100 0 --from <name> --home $HOME/.nibid
```
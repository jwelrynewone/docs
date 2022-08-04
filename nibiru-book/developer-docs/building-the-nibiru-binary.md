---
description: Instructions on building and installing the nibid binary
---

# ⚙️ Building the Nibiru Binary from Source

- [⚙️ Building the Nibiru Binary from Source](#️-building-the-nibiru-binary-from-source)
  - [Install Go](#install-go)
  - [Install make and gcc](#install-make-and-gcc)
  - [Build and install the Nibiru binary](#build-and-install-the-nibiru-binary)
  - [Local development](#local-development)
    - [Note: Docker Engine](#note-docker-engine)

## Install Go

The installation process for Go depends on your OS. Nibiru is meant to build with a Unix system such as MacOS, Ubuntu, or WSL. Please install Go v1.18 using the instructions at [go.dev/doc/install](https://go.dev/doc/install). For Ubuntu, you can use:

```shell
wget https://golang.org/dl/go1.18.2.linux-amd64.tar.gz
sudo tar -C /usr/local -xzf go1.18.2.linux-amd64.tar.gz
```

You'll also want to set the following environment variables in your shell config (e.g. `.bashrc`, `.zshrc`).

```shell
export GOROOT=/usr/local/go
export GOPATH=$HOME/go
export GO111MODULE=on
export PATH=$PATH:/usr/local/go/bin:$HOME/go/bin
```

## Install make and gcc

```bash
sudo apt-get update
sudo apt-get upgrade
sudo apt install git build-essential ufw curl jq snapd --yes
```

## Build and install the Nibiru binary

Begin by cloning the `nibiru` repo.

```bash
cd $HOME
git clone https://github.com/NibiruChain/nibiru
cd nibiru
git checkout v0.12.1
make install
```

Running these commands should have made `nibid` available in your `$PATH`. You should now be able to view a list of all available commands with

```bash
nibid [command]
```

Optionally, you can run the all of the tests to make sure everything is working properly.

```bash
go test ./... -cover 
```

## Local development

Lastly, you can run the chain for local development with `make localnet`. After opening another terminal, you'll be able to use the full suite of `nibid` commands.

### Note: Docker Engine

You'll need Docker to run commands that use external containers like `make proto-gen`. Instructions for installing Docker can be found [here](https://docs.docker.com/engine/install/).

Sections:
- [Install Go](#install-go)
- [Install make and gcc](#install-make-and-gcc)
- [Build and install the Nibiru binary](#build-and-install-the-nibiru-binary)
- [Local development](#local-development)

---

### Install Go

The installation process for Go depends on your OS. Nibiru is meant to build with a Unix system such as MacOS, Ubuntu, or WSL. See [go.dev/doc/install](https://go.dev/doc/install) for instructions on how to install Go.

### Install make and gcc

```sh
sudo apt-get update
sudo apt-get upgrade
sudo apt install git build-essential ufw curl jq snapd --yes
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

### Local development

Lastly, you can run the chain for local development with `make localnet`. After opening another terminal, you'll be able to use the full suite of `nibid` commands.

#### Note: Docker Engine

You'll need Docker to run commands that use external containers like `make proto-gen`. Instructions for installing Docker can be found [here](https://docs.docker.com/engine/install/).

<!-- 
instructions for preparing an account 
nibid keys list 
-->

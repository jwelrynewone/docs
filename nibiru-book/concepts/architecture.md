# 🧱 Blockchain Architecture

TODO diagram IBC, Wasm 

## IBC paragraph TODO

Inter-Blockchain Communication Protocol (IBC) enables secure and permissionless transfers of funds between blockchains. 

IBC allows cross-chain computation and transfer of arbitrary data. This includes cross-chain smart contract calls, fee payments, NFTs, and fungible token transfers. 

IBC has connected over 40 blockchains

Brought about by the [Stargate upgrade](https://www.figment.io/resources/cosmos-stargate-upgrade-overview), which completed the set of features described in the original Cosmos Whitepaper. 

IBC is not reliant on a multi-sig or centralized bridging solution.

Nibiru multi-chain DeFi  

## CosmWasm paragraph TODO

permission-less and censorship resistant platform for developers to deploy smart contracts in Go and Rust.

CW20 tokens


TODO diagram Tendermint, Cosmos-SDK 

![](img/cosmos-sdk-tendermint-box.svg)

The security of the Nibiru blockchain relies on a set of validators to commit new blocks and participate in Tendermint BFT consensus by brodcasting votes that contain cryptographic signatures signed by each validator's private key. Validators stake **NIBI**, the protocol's native token used for gas, governance, and "mining". Users can delegate NIBI to validators that record and verify transactions in exchange for rewards.


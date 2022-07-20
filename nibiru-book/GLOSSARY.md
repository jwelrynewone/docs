# 📘 Glossary

## 📘 Glossary

* [Glossary — General](GLOSSARY.md#glossary--general)
  * [Block](GLOSSARY.md#block)
  * [Blockchain](GLOSSARY.md#blockchain)
  * [Cosmos Hub / Gaia](GLOSSARY.md#cosmos-hub--gaia)
  * [Cosmos-SDK](GLOSSARY.md#cosmos-sdk)
  * [Cosmos Ecosystem](GLOSSARY.md#cosmos-ecosystem)
  * [IBC Relayer](GLOSSARY.md#ibc-relayer)
  * [Proof of Stake (PoS)](GLOSSARY.md#proof-of-stake-pos)
  * [Tendermint Consensus](GLOSSARY.md#tendermint-consensus)
* [Glossary — Nibi-Swap](GLOSSARY.md#glossary--nibi-swap)
  * [Automated Market-Maker (AMM)](GLOSSARY.md#automated-market-maker-amm)
  * [Swap](GLOSSARY.md#swap)
  * [Liquidity](GLOSSARY.md#liquidity)
  * [Liquidity Provider](GLOSSARY.md#liquidity-provider)
  * [Total Value Locked (TVL)](GLOSSARY.md#total-value-locked-tvl)
* [Glossary — Nibi-Perps](GLOSSARY.md#glossary--nibi-perps)
  * [Perpetual Swap (Contract)](GLOSSARY.md#perpetual-swap-contract)
  * [Funding Payment](GLOSSARY.md#funding-payment)
* [Glossary — NUSD Stablecoin](GLOSSARY.md#glossary--nusd-stablecoin)
  * [NUSD Mint](GLOSSARY.md#nusd-mint)
  * [NUSD Redeem / Burn](GLOSSARY.md#nusd-redeem--burn)
  * [Collateral](GLOSSARY.md#collateral)
  * [Buyback](GLOSSARY.md#buyback)
  * [Re-collateralize](GLOSSARY.md#re-collateralize)
* [References](GLOSSARY.md#references)

***

## Glossary — General

### Block

Groups of information stored on a [blockchain](GLOSSARY.md#blockchain). Each block contains transactions that are grouped, verified, and signed by validators.

### Blockchain

An immutable ledger of transactions maintained across a network of independent computer systems.

### Cosmos Hub / Gaia

The Cosmos Hub, also called Gaia, is the first blockchain created within the Cosmos Ecosystem. Gaia is a proof-of-stake chain supported by the ATOM token, which is used for staking, governance, and block rewards. Gaia is also one of the main relayers of data between blockchains in the Cosmos Ecosystem.

### Cosmos-SDK

An open-source framework for building multi-asset public blockchains like [Gaia](https://hub.cosmos.network/), [Binance Chain](https://docs.binance.org/), and [Juno](https://docs.junonetwork.io/juno/readme). Nibiru is built on the Cosmos-SDK. Check out the [Cosmos-SDK docs](https://docs.cosmos.network/main/intro/overview.html) for more information.

### Cosmos Ecosystem

Definition TODO

### IBC Relayer

In the Inter-Blockchain Communication (IBC) Protocol, blockchains do not directly pass messages to each other over the network. Instead, relayers monitor for updates on open paths between sets of IBC enabled chains and then submits their own updates with specific message types to the counterparty chains. Clients are then used to track and verify the consensus state. For more information on IBC concepts like relayers, connections, packets, clients, and channels, visit [ibc.cosmos.network](https://ibc.cosmos.network/).

### Proof of Stake (PoS)

Proof-of-stake is a type of consensus mechanism used by blockchains to achieve distributed consensus. In proof-of-work, miners prove they have capital at risk by expending energy. In Nibiru proof-of-stake, validators explicitly stake capital in the form of NIBI. Staked NIBI acts as collateral that can be destroyed if the validator behaves dishonestly or lazily. Validators are responsible for creating new blocks, propagating blocks across the network, and verifying that blocks are valid. PoS is also

### Tendermint Consensus

Tendermint Byzantine Fault Tolerant (BFT) consensus is a solution that packages the networking and consensus layers of a blockchain into a generic engine, allowing developers to focus on application development as opposed to the complex underlying protocol. Tendermint provides the equivalent of a web-server, database, and supporting libraries for blockchain applications written in any programming language.

***

## Glossary — Nibi-Swap

### Automated Market-Maker (AMM)

Automated market makers are mechanisms in the decentralized finance (DeFi) ecosystem that allow digital assets to be traded in a permissionless and automatic way using liquidity pools rather than a traditional market of buyers and sellers. AMM users supply liquidity pools with crypto tokens. Token prices in a pool are determined by a fixed mathematical formula.

### Swap

Trading one cryptocurrency for another.

### Liquidity

Digital assets stored in a pool that are able to be traded against are liquid. These assets are often just called liquidity.

### Liquidity Provider

A liquidity provider is someone that deposits assets into a liquidity pool.

### Total Value Locked (TVL)

TVL is the overall value of crypto assets deposited into some structure (often denoted in US dollars). Usually, TVL is given for pools or entire protocols.

***

## Glossary — Nibi-Perps

### Perpetual Swap (Contract)

Perpetual swap contracts are [swaps](GLOSSARY.md#swap) that allow traders to buy or sell a derivative of some underlying asset without expiration and with a potentially

### Funding Payment

Funding payments are regularly scheduled payments between longs and shorts on Nibi-Perps. These payments are meant to converge the price between the derivative contract (mark), or perp, and its underlying asset (index). A time-weighted average price from the virtual pool is taken to compute the mark price. The index price is derived from an oracle. Funding payments are calculated and exchanged between traders every half hour on Nibiru.

***

## Glossary — NUSD Stablecoin

### NUSD Mint

Definition TODO

### NUSD Redeem / Burn

Definition TODO

### Collateral

Definition TODO

### Buyback

Definition TODO

### Re-collateralize

Definition TODO

***

## References

* BitMEX. Perpetual Contracts Guide. https://www.bitmex.com/app/perpetualContractsGuide

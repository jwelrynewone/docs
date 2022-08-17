---
description: Nibiru is a decentralized blockchain governed by its community members.
---

# ⚖ Governance and NIBI

## Submitting Proposals

NIBI token is integral to the security and governance of the chain. You will need NIBI tokens to submit a governance proposal.&#x20;

* [Submitting Proposals](submitting-proposals.md#submitting-proposals)
  * [Whitelist an oracle](submitting-proposals.md#whitelist-an-oracle)
  * [Creating a proposal](submitting-proposals.md#creating-a-proposal)
  * [Types of proposals](submitting-proposals.md#types-of-proposals)
  * [Add oracle](submitting-proposals.md#add-oracle)
  * [Create a virtual pool](submitting-proposals.md#create-a-virtual-pool)
* [Querying a proposal](submitting-proposals.md#querying-a-proposal)

### Creating a proposal

Anybody can submit proposals with a deposit. Once the minimum deposit is reached, proposal enters voting period. Participants can vote on proposals that are in the voting period. Delegators inherit their validator's vote if they don't vote themselves. Users that deposited on proposals can recover their deposits if the proposal was accepted OR if the proposal never entered voting period.

Please refer to the [Cosmos SDK docs](https://docs.cosmos.network/v0.45/modules/gov/07\_client.html#submit-proposal) on how to submit proposals.

Nibiru supports all of the base Cosmos-sdk proposal types listed [here](https://docs.cosmos.network/v0.45/modules/gov/07\_client.html#submit-proposal), as well as additional proposal types outlined below.

### Types of proposals

The

### Whitelisting an oracle address with `add-oracle`

```bash
# parameters
nibid tx gov submit-proposal add-oracle [proposal-file] --deposit [deposit] [flags]

# example
nibid tx gov submit-proposal add-oracle /path/to/proposal.json --deposit 1000unibi --from validator
```

A typical add-oracle proposal json file contains

```json
{
 "title": "add Delphi oracle",
 "description": "Whitelists Delphi to post prices for BTC",
 "oracles": ["nibi1zaavvzxez0elundtn32qnk9lkm8kmcsz44g7xl"],
 "pairs": ["ubtc:unusd"]
}
```

### Create a virtual pool

```bash
# parameters
nibid tx gov submit-proposal create-pool proposalFile --deposit deposit [flags]

# example
nibid tx gov submit-proposal create-pool /path/to/proposal.json --deposit 1000unibi --from validator
```

A typical create-pool proposal JSON file contains

```json
{
    "title": "Create vpool for BTC:NUSD",
    "description": "We want to allow leveraged BTC perp trading.",
    "pair": "ubtc:unusd",
    "quote_asset_reserve": "1000000",
    "base_asset_reserve": "1000000",
    "trade_limit_ratio": "0.1",
    "fluctuation_limit_ratio": "0.01",
    "max_oracle_spread_ratio": "0.1",
    "maintenance_margin_ratio": "0.0625"
}
```

## Querying a proposal

One can use the following command to query for proposals:

```bash
# parameters
nibid query gov proposal [proposal-id]

# example
nibid query gov proposal 1
```

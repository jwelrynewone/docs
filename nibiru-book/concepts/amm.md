---
description: >-
  Nibi-Swap, Nibiru's Spot DEX. Swap, LP, and earn boosted rewards for longer
  liquidity locks.
---

# 💧 Nibi-Swap

![](<../.gitbook/assets/image (2).png>)

Separate from Nibiru’s perps product, Nibiru includes an automated liquidity protocol (AMM) for spot trading called Nibi-Swap. Nibi-Swap is autonomous, permissionless, blockchain-native, and composable. All of its functionality can be integrated with other applications without intermediaries.

<!-- 
What is a pool? 
How are pools created?

-->

## Swap Invariant 

Pools on Nibi-Swap can include more than two assets with differing token weights. From the quantity and normalized weight of each asset, we compute a **swap invariant**, `k`.

$$
\begin{aligned}
&\mathcal{W}_n :\text{normalized weight of token $n$ } \\ &\mathcal{Q}_n :\text{quantity of token $n$ in the pool} \\ &k :\text{the swap invariant } \\ \end{aligned} \\ \prod\limits_{n=1}^t \mathcal{Q}_n^{\mathcal{W}_n} = k.
$$

For a given pool, the sum of the normalized weights must equal 1. The swap invariant `k` does not change when users swap assets. It only changes when a **liquidity provider (LP)** adds or removes liquidity. Each pool contains `t` tokens. Thus, the number of trading pairs is equal to the number of combinations of size 2:

$$
\binom{t}{2} = \frac{t!}{2!(t - 2)!} .
$$

And between each of these pairs exists a spot price.

## Spot Price

Spot price is the instantaneous price at which a swap occurs. It is computed as the ratio of the token balances normalized by token weight:

$$
\begin{aligned}
&\mathcal{B}_{\text{in}}: \text{amount of token in} \\ 
&\mathcal{W}_{\text{in}}: \text{weight of token in} \\ 
&\mathcal{B}_{\text{out}}: \text{amount of token out} \\ 
&\mathcal{W}_{\text{out}}: \text{weight of token out} 
\end{aligned} \\ 
\text{SpotPrice}_{\text{in$\to$ out}} = \frac{(\mathcal{Q}_{in}/\mathcal{W}_{in})}{(\mathcal{Q}_{out}/\mathcal{W}_{out})} 
$$

If the asset reserse are not modified by liquidity providers, then `k` remains constant and the price changes solely based on trades since the asset weights also remain constant. This ensures that the price of the asset bought increases while the price of the asset sold decreases. The arbitrage opportunities guarantee that the prices offered by the pools move in conjunction with the rest of the market.

## Providing Liquidity 

Pools on Nibi-Swap fascilitate trades between pairs of fungible coins. Adding liquidity gives an account **pool shares**, also called LP shares or LP tokens. Anyone can become a **liquidity provider (LP)** by adding an equivalent value of tokens to the pool. Here, equivalent value more precisely means equivalent ratio of the reserves. 

For example, let's say there's a pool with two assets of equal weight defined by the following.

```ts
totalShares = 1000
reserves = {tokenA: 200, tokenB: 40}
```

In order to add 20 units of `tokenA` to the pool, i.e. 10% of the reserves, the same proportion of `tokenB` needs to be added to the reserves as well. The proportional change to the total number of shares would also be 10%. And if we assume equal token weights, this also implies a swap invariant value of `k = 8000`, resulting in the following pool. 

```ts
totalShares = 1100
reserves = {tokenA: 220, tokenB: 44}
```

The liquidity provider receives 100 `tokenA:tokenB` LP shares, which can be reclaimed for the underlying funds at any point,  and the swap invariant is now `k = 9680`. Pool shares are fungible tokens that quantitatively express ownership of a liquidity pool's reserves. They serve a similar purpose to ERC-20 shares of an [ERC-4626 tokenized vault](https://eips.ethereum.org/EIPS/eip-4626). 

### Swap Fees

Whenever a trade occurs, a small percentage fee is charged to the sender of the transaction. Because each liquidity provider owns shares of the pool, the **swap fee** is given pro-rata to all LPs due to the claimable value of their shares. This is, however, an unrealized gain as the LP shares would still need be burned in exchange for coins to end up in a liquidity provider's account.

<!-- Deposit diagram? TODO
totalShares=1000,  Reserves{200 TokenA, 40 TokenB}, with equal weights k=8000
→  
totalShares=1100, sharesOut=100, Reserves{220 TokenA, 44 TokenB}, k=9,680
-->

{% hint style="info" %}
A Cosmos coin, or `sdk.Coin`, defines a token with a denomination and an amount. IBC vouchers, native staking assets, and LP shares are all Cosmos coins. 
{% endhint %}

## Stableswaps

Given the proliferation of stablecoins about to reach the Cosmos ecosystem, the Nibiru AMM will support stableswap pools based on [Curve’s Stableswap](https://curve.fi/files/stableswap-paper.pdf) invariant. 

$$
\begin{aligned}
\text{(constant-price invariant)} \quad& D = \sum_{i=1}^t x_i \quad\quad \\
\text{(constant-product invariant)} \quad& \prod x_i = \left( \frac{D}{t} \right)^t 
\end{aligned}
$$

The stableswap invariant operates like a constant-price curve when a portfolio of assets is balanced and tends toward behaving like a constant-product curve if the tokens lose peg.

*D* denotes the sum of all token quantities when they have an equal price.  

$$
\begin{aligned}
&A: \text{amplification coefficient}  \\
&\{x_i\}: \text{set of coins} \\
\end{aligned}\\ 
At^t \left( \sum_{i=1}^t x_i \right) + D = ADt^t + \frac{D^{t+1}}{t^t\left( \prod\limits_{i=1}^t x_i \right) } 
$$

This operates as the constraint equation when users perform stable-swaps if we solve for *D* given a set of coins and hold this equality.  

<!-- TODO amplification coefficient -->
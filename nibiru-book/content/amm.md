---
description: Real world examples of content published using HonKit.
---

# 💧 Nibi-Swap

Separate from Nibiru’s perps product, Nibiru includes a constant-product spot AMM called Nibi-Swap. Pools on Nibi-Swap can include more than two assets with differing token weights. Denoting $\mathcal{W}\_n$ as the normalized weight and $\mathcal{Q}\_n$ as the quantity of asset $n$, each pool has an **invariant $k$** defined by:

$$\begin{gather} \prod\limits_{n=1}^t \mathcal{Q}_n^{\mathcal{W}_n} = k.  \end{gather}$$​

For a given pool, the sum of the normalized weights must equal 1. The invariant $k$ does not change when users swap assets. It only changes when a liquidity provider adds or removes liquidity. Each pool contains $t$ tokens. Thus, the number of trading pairs (combinations of size 2) is

$$
\binom{t}{2} = \frac{t!}{2!(t - 2)!} .
$$

A spot price exists between each pair of tokens. The spot price is the ratio between the two normalized quantities:

Formally, the instantaneous spot price that the swap executes at is computed as the ratio of the token balances normalized by the token weight:

$$
\text{SpotPrice}_{\text{in$\to$ out}} = \frac{(\mathcal{Q}_{in}/\mathcal{W}_{in})}{(\mathcal{Q}_{out}/\mathcal{W}_{out})} \\ \\ \mathcal{B}_i = \text{amount of token in} \\ \mathcal{W}_i = \text{weight of token in} \\ \mathcal{B}_o = \text{amount of token out} \\ \mathcal{W}_i = \text{weight of token out}
$$

If liquidity providers don’t modify the asset reserves, then k remains constant and the price changes solely based on trades since the asset weights also remain constant. This ensures that the price of the asset bought increases while the price of the asset sold decreases. The arbitrage opportunities guarantee that the prices offered by the pools move in conjunction with the rest of the market.

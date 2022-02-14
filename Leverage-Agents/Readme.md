---
description: Leverage Agents: Insuring the protocol against collateral volatility.
---

# Leverage Agents

## TL;DR

- Leverage Agents (LAs) get perpetual futures from the protocol: they can get leveraged in one transaction on the evolution of the price of a collateral with a multiplier of their choice.
- They are here to insure the protocol against the volatility of the collateral brought by users. With enough demand for LAs, the protocol could resist collateral price drops of up to 99%.
- LAs can make significant gains in case of price increase but also substantial losses when collateral price decreases.
- They pay small transaction fees (potentially around 0.3%) when they open their position and when they close it.
- Contrary to centralized exchanges, they do not have to pay funding rates for holding their positions.

## Principle

- Matrix Protocol by essence is highly dependent on collateral volatility. 
- Let's say one stable seeker brings 1 OSMO against 200 USDM and the price of OSMO then decreases by 50% (from 200 to 100). The protocol then needs to find 1 OSMO to ensure the redeemability of the 200 USDM of stablecoins and maintain their stability.
- We say that the protocol needs to insure itself against the volatility of the collateral. While surges in collateral prices are beneficial to the protocol, drops, as in the example above, are less desirable.
- For this reason, Matrix transfers this volatility to other actors looking to get leverage on the collateral: Levarage Agents (LAs). They are the agents insuring the protocol against drops in collateral prices, making sure that the protocol has always enough reserves to reimburse users.

## Perpetual Futures

- Leverage Agents are taking perpetual futures from the protocol. 
- When they come in the protocol to open a position, they bring a certain amount of collateral (their margin), and choose an amount of the same collateral from the protocol they want to hedge (or cover/back). The protocol then stores the oracle value and timestamp at which they opened a position.
- Hedging Agents are independent from one another, meaning that the actions of one Hedging Agent have no impact on the position of another Hedging Agent.

Precisely speaking, if a LA enters with an amount `x` of collateral (`x`is the margin) and decides to take on the volatility of an amount `y` of the same collateral (`y` is the amount committed, or the position size) that was brought by users minting stablecoins, then the protocol stores `x`, `y`, the oracle value and the timestamp at which this HA came in.

At any given point in time, the LA is entitled to get from the protocol:

$$
\texttt{cash out amount} = x+y\cdot (1-\frac{\texttt{initial oracle price}}{\texttt{current oracle price}})
$$

This formula means that the LA will get back their input `x`, plus or minus the capital gains or losses of the amount `y` they decided to back.

The **PnL** of the LA on this position is therefore:

$$
\texttt{PnL} = y\cdot (1-\frac{\texttt{initial oracle price}}{\texttt{current oracle price}})
$$

Since LAs bring collateral to the protocol, we define their **leverage** as:

$$
\texttt{leverage} = \frac{x+y}{x} = \frac{\texttt{margin + amount committed}}{\texttt{margin}}
$$

### Price Increase Scenario

- When the collateral price increases (with respect to the asset stablecoins are pegged to), besides their margin (amount brought initially), LAs are entitled to get the capital gains they would have made if they had owned the collateral they hedged.

If an LA brought 1 OSMO and decided to back 1 OSMO from the protocol, at a OSMO price of 200$, then:

$$
x = 1, \space y=1
$$

$$
\texttt{initial oracle price} = 200
$$

If the price of wETH increases to 400$, then according to the formula above, the LA can get from the protocol:

$$
\texttt{cash out amount} = 1.5 \space \texttt{OSMO}
$$

The HA made 600$ from their initial 200$. If they had just stayed long without leverage, they would have only 400$.

### Price Decrease Scenario

When the collateral price decreases (with respect to the asset stablecoins are pegged to), LAs will incur losses on their margin as if they had owned the collateral they covered.

Back to the previous example, if the price of OSMO decreases to 100$, then the cash out amount of the LA becomes:

$$
\texttt{cash out amount} = 1 + 1 \cdot (1-2) = 0
$$

At this point, the HA is liquidated and their collateral goes to the protocol. They cannot claim anything.

In general, the cash out amount of a LA can go to zero if the price drops to:

$$
\texttt{current price} = \frac{y}{x+y}\cdot \texttt{initial price}
$$

## 💧 LAs Liquidations

In practice, and like in most centralized perpetual swaps exchanges, there is a maintenance margin meaning that if the value of the theorical cash out amount gets too small compared with the amount committed by a LA, then this LA's position can get liquidated. HAs can hence get liquidated even with a non null cash out amount.

Mathematically speaking, we define the margin ratio of a LA as:

$$
\texttt{margin ratio} = \frac{\texttt{margin + PnL}}{\texttt{amount committed}}
$$

Or to use the above notations:

$$
\texttt{margin ratio} = \frac{x}{y} + (1-\frac{\texttt{initial oracle price}}{\texttt{current oracle price}})
$$

A HA can get liquidated if:

$$
\texttt{margin ratio} \leq \texttt{maintenance margin}
$$

## HAs Hedged Amounts

When LAs enter the protocol, they specify a position size denominated in collateral, representing an amount of the protocol collateral reserves they are hedging. Yet from a protocol perspective, when HAs come in the protocol, they insure a fixed amount of stablecoins.

This quantity remains constant and only depends on variables fixed upon LAs entry. So while LAs only see that they back an amount of collateral from users, from a protocol perspective, each LA insures the protocol for a fixed amount of stablecoins. This is what the accounting of the protocol keeps track of when determining when to let new LAs come in or not.

The total amount hedged by LAs for a given collateral/stablecoin pair is hence the sum of the product between the amount committed by LAs and their entry price: it is a measure of how much stablecoins issued are backed and insured.

This quantity is compared to the amount of collateral `in stablecoin value` needed by the protocol to pay back users in case they all want to burn their stablecoins. For example, if some users bring 1 OSMO to mint 200$, and others burn 100$, the amount to hedge is 100 USD of OSMO. LAs can hedge a fraction of this quantity (close to 100%): this is called the target hedge amount.

The hedge ratio of the protocol **for a given stablecoin/collateral pair** is hence defined as:

$$
\texttt{Hedge Ratio} = \frac{\texttt{Total amount hedged by HAs in stablecoin}}{\texttt{Total value of stablecoins issued}}
$$

## Insurance of the Protocol Against Collateral Volatility

Here we explain in a more imaged way how the protocol can always have enough collateral to pay back users burning stablecoins in case of price changes of the collateral.

If HAs have a 6x leverage and back all the collateral in the protocol that was used to issue stablecoins:

## 🪙 Transaction Fees

In Angle, Hedging Agents have to pay small transaction fees when they open and close positions from the protocol. These transaction fees are computed on the amount that is committed by the LA (the position size). Entry and exit fees for HAs depend on hedging curves, which define transaction fees for HAs based on the hedging ratio of the protocol.

{% hint style="success" %}
Note that on Angle, there is no funding rate to be paid by perpetual futures holders as opposed to most perps exchanges. This allow traders to hold their positions longer at a much lower cost.
{% endhint %}

{% hint style="info" %}
The exact values of the transaction fees for HAs depend on the hedge ratio (sometimes referred to as coverage ratio) of the specific agToken/collateral pair. You can see the current fees situation in the [analytics](https://analytics.angle.money) page related to the collateral/stablecoin pool in question.
{% endhint %}

### Entry Transaction Fees

The entry transaction fees for LAs is an upfront cost paid when HAs open a position.

The higher the hedging ratio, the more expensive it gets to be an LA. Conversely, LAs should be incentivized to enter positions to help hedge the protocol when the hedging ratio is low: transaction fees would be lower in this case.

Let' say a LA comes to the protocol with 1 OSMO and opens a 2 OSMO poisition (hedging the protocol against the changes in price of these 2 OSMO). If the transaction fees are 0.3%, then the protocol considers that the LA has a margin of (1 - (0.003 x 2)) = 0,994 OSMO for a position of 2 OSMO.

### Exit Transaction Fees

Exit fees are paid by LAs when they close their perpetuals. The more collateral is hedged by LAs, the less expensive it is to exit the protocol. When the hedging ratio is low, LAs should be discouraged to exit with higher transaction fees.

If a LA had an initial margin of 1 OSMO and a position size of 2 OSMO, then with 0.3% transaction fees, they will get in OSMO the current value of their perpetual according to the cash out formula above minus 0.3% of 2 OSMO (the amount hedged at the opening).

### Fees To Add or Remove Margin

When LAs open a perpetual, they have the opportunity to add or remove to their margin thus decreasing or increasing their leverage. As entry and exit fees depend only on the position size (or committed amount) of LAs, and these add/remove operations do not modify it, no fees are paid for such operations.



# 🎓 AI Wallet Assistant - UI Educational Tooltips

**Beginner-Friendly Explanations for All UI Elements**

---

## 💰 Transaction & Wallet Terms

### **Gas Limit**
**Simple Explanation:**
Imagine you're hiring a worker. The "gas limit" is the maximum amount you're willing to pay for their work. If the work costs less, you don't pay the full amount - you only pay what's used.

**Why It Matters:**
- Set too low → Transaction fails, you lose gas fees
- Set too high → You overpay unnecessarily

**Real Example:**
```
Simple transfer: 21,000 gas
Complex swap: 100,000+ gas
Set limit to: At least the estimated amount
```

**[Learn More about Gas →](#)**

---

### **Nonce**
**Simple Explanation:**
Think of it like a sequence number on checks. Each transaction must have the next number in order. It prevents the same transaction from being processed twice.

**Why It Matters:**
- Ensures transactions happen in the right order
- Prevents "double-spending" (sending same funds twice)
- Resets to 0 if account hasn't sent transactions

**Real Example:**
```
Transaction 1: Nonce = 0
Transaction 2: Nonce = 1
Transaction 3: Nonce = 2
Skip a number → Transaction waits for correct nonce
```

**[Learn More about Nonce →](#)**

---

### **Contract Data**
**Simple Explanation:**
The instructions you're sending to a smart contract. Like writing a note to a robot telling it exactly what to do with your funds.

**Why It Matters:**
- Tells the contract what action to perform
- Must be correct or transaction fails
- Should match the contract's intended function

**Real Example:**
```
✅ Approve tokens → Clear, safe instruction
❌ Unknown function call → Risky, verify first
```

**[Learn More about Contract Data →](#)**

---

### **Slippage**
**Simple Explanation:**
When you swap tokens, the price might change before your transaction completes. Slippage is the difference between your expected price and actual price.

**Why It Matters:**
- High slippage = Bad deal for you
- Low slippage = Better price
- Protects you from front-running attacks

**Real Example:**
```
Expected: 1 ETH = 2000 USDC
Price changes slightly...
Actual: 1 ETH = 1950 USDC
Slippage: 50 USDC (2.5%)
```

**[Learn More about Slippage →](#)**

---

### **Approval**
**Simple Explanation:**
Giving a website or app permission to move your tokens. Like signing a check that says "you can take up to X amount from my account."

**⚠️ Critical Risk:**
- **Unlimited Approval** = Blank check. App can steal everything!
- **Limited Approval** = Safe. App can only use what you specify

**Safe Practice:**
```
❌ Approve unlimited → High risk
✅ Approve exact amount → Safe
✅ Revoke after use → Best practice
```

**[Learn More about Approvals →](#)**

---

## 🔴 Risk Detection Terms

### **Honeypot Contract**
**Simple Explanation:**
A fake trap contract that looks legitimate but locks your money inside. You can put money in, but can't take it out.

**Red Flags:**
```
🚨 Transfer restrictions
🚨 Owner-only withdrawal functions
🚨 Can't sell tokens after buying
🚨 Suspicious contract code
```

**How to Avoid:**
- Check contract source code on Etherscan
- Use contract analyzers
- Test with small amounts first

**[Learn More about Honeypots →](#)**

---

### **Rug Pull**
**Simple Explanation:**
A scam where developers create a fake token, take people's money, then disappear. Like pulling a rug out from under someone.

**Red Flags:**
```
🚨 Locked liquidity? No!
🚨 Anonymous team
🚨 Unrealistic promises
🚨 Liquidity suddenly removed
```

**Safety Check:**
- ✅ Liquidity locked for years
- ✅ Known team members
- ✅ Realistic goals
- ✅ Active development

**[Learn More about Rug Pulls →](#)**

---

### **Phishing Attempt**
**Simple Explanation:**
A fake website or contract that LOOKS real but steals your information. Like a forged check that looks authentic.

**Common Types:**
```
🚨 Fake wallet website (looks like MetaMask)
🚨 Copy-cat token names (BTC.e instead of BTC)
🚨 Mimic popular protocols (Uniswap2 vs Uniswap)
🚨 Fake airdrop links
```

**Stay Safe:**
- Always check URLs carefully
- Bookmark official sites
- Never click links from strangers
- Verify contract addresses

**[Learn More about Phishing →](#)**

---

### **Flash Loan Attack**
**Simple Explanation:**
A hacker borrows huge amounts of tokens for ONE transaction, manipulates prices, then returns the loan. Happens in milliseconds.

**Your Protection:**
- No safe way to prevent it yourself
- Platform developers must code defensively
- High-risk for inexperienced traders

**[Learn More about Flash Loans →](#)**

---

## 💎 DeFi & Trading Terms

### **Liquidity Pool**
**Simple Explanation:**
A digital pot of money where both sides of a trade are available. You deposit 2 different tokens, and people trade between them. You earn fees.

**How It Works:**
```
Deposit: 50 ETH + 100,000 USDC
↓
People swap between ETH ↔ USDC
↓
You earn small fees (0.01-1%) per trade
↓
You can withdraw anytime
```

**Risks:**
- ⚠️ Impermanent loss (price goes up/down)
- ⚠️ Smart contract bugs
- ⚠️ Low trading volume = no fees

**[Learn More about Liquidity Pools →](#)**

---

### **Yield Farming**
**Simple Explanation:**
Deposit your crypto into a protocol and earn rewards (like interest) on your deposit. Higher yields usually mean higher risk.

**Example:**
```
Deposit: 100 USDC
↓
Earn: 20% APY
↓
After 1 year: 120 USDC profit (if no liquidation)
```

**Risk Levels:**
- 🟢 **Low Risk (2-5% APY):** Stable platforms, established protocols
- 🟡 **Medium Risk (5-20% APY):** Newer protocols, moderate smart contract risk
- 🔴 **High Risk (20%+ APY):** New projects, high exploitation risk

**[Learn More about Yield Farming →](#)**

---

### **Impermanent Loss**
**Simple Explanation:**
When you provide liquidity to a pool and token prices change dramatically, you end up with less value than if you'd just held the tokens.

**Simple Example:**
```
Deposit: 1 ETH + 1,000 USDC (ETH = $1,000)

Scenario 1: Prices stay same
👍 No loss, earn trading fees

Scenario 2: ETH → $2,000
😟 You have less ETH than you started with
❌ Impermanent loss = profit in fees wasn't enough
```

**[Learn More about Impermanent Loss →](#)**

---

## 🔐 Security & Safety Terms

### **Private Key**
**Simple Explanation:**
Your SECRET password that proves you own your crypto. Like the master key to a vault. NEVER share it.

**Golden Rules:**
```
✅ NEVER type into websites
✅ NEVER screenshot it
✅ NEVER share with anyone
✅ Store in secure location (hardware wallet)
✅ NEVER send to "customer support"
```

**If Compromised:**
- Move all funds immediately
- Create new wallet
- The old wallet is no longer safe

**[Learn More about Private Keys →](#)**

---

### **Seed Phrase (Mnemonic)**
**Simple Explanation:**
12-24 words that can recreate your private key. Like a master password that unlocks everything. BACKUP SAFELY.

**Security:**
```
✅ Write on paper, store safely
✅ Not stored on computer
✅ Keep copies in secure locations
✅ Don't photograph or digitize
```

**Common Scams:**
- 🚨 Websites asking for seed phrase
- 🚨 "Support" requesting seed phrase
- 🚨 Emails claiming you need to verify

**[Learn More about Seed Phrases →](#)**

---

### **Two-Factor Authentication (2FA)**
**Simple Explanation:**
Double protection for your account. Even if someone steals your password, they still need the second factor (like phone code) to log in.

**Types:**
```
🟢 Authenticator apps (Google Authenticator, Authy)
🟢 SMS text messages (less secure)
🟡 Email confirmations
🔴 Security questions (least secure)
```

**Best Practice:**
- Use authenticator app + backup codes
- Save backup codes in secure location
- Disable SMS if possible

**[Learn More about 2FA →](#)**

---

## 📊 Risk Level Indicators

### **🟢 LOW RISK**
**What it means:** Safe to proceed  
**Examples:**
- Simple ETH transfer
- Buying established tokens
- Swaps on major platforms
- Limited approvals

**Action:** ✅ Proceed with confidence

---

### **🟡 MEDIUM RISK**
**What it means:** Verify before proceeding  
**Examples:**
- New token interaction
- Moderately complex transaction
- Smaller amount of funds
- Need to verify contract

**Action:** ⚠️ Review details carefully before signing

---

### **🔴 HIGH RISK**
**What it means:** Do NOT proceed without caution  
**Examples:**
- Unlimited approvals
- Unknown contract
- Phishing patterns detected
- Rug pull indicators
- Large fund movements

**Action:** ❌ DO NOT SIGN - Verify thoroughly or skip

---

## 🎯 Action Recommendations

### **When You See: "Cancel Transaction"**
❌ This means: Risk is too high. Do not sign this transaction.  
🛡️ Action: Close the transaction and report the contract.

---

### **When You See: "Verify Contract Address"**
⚠️ This means: The contract looks suspicious. Double-check it's legitimate.  
✅ Action:
1. Copy contract address
2. Search on Etherscan
3. Check social media for verification
4. Compare with official website

---

### **When You See: "Use Limited Approval"**
🔒 This means: Instead of approving unlimited, specify exact amount.  
✅ Action:
1. Enter exact amount needed
2. Approve that amount only
3. Revoke after transaction complete

---

### **When You See: "Check Sources"**
🔍 This means: Verify information from multiple places.  
✅ Action:
1. Check official Discord/Twitter
2. Ask in communities
3. Use contract analyzer tools
4. Never trust single source

---

## 🔗 Glossary of Terms

### A
- **Address:** Your unique wallet identifier (starts with 0x)
- **Approval:** Permission to move your tokens
- **APY:** Annual Percentage Yield (yearly returns)
- **AMM:** Automated Market Maker (protocol for swaps)

### B
- **Blockchain:** Distributed ledger recording all transactions
- **Bridge:** Transfer assets between blockchains

### C
- **Chain:** Blockchain network (Ethereum, Polygon, etc.)
- **Contract:** Smart contract code on blockchain
- **CBDC:** Central Bank Digital Currency

### D
- **DEX:** Decentralized Exchange
- **DeFi:** Decentralized Finance

### E
- **ETH:** Ethereum native token
- **ERC-20:** Standard for fungible tokens

### F
- **Flash Loan:** Uncollateralized instant loan

### G
- **Gas:** Fee for blockchain transactions
- **Gwei:** Unit of ETH (1 ETH = 1 billion Gwei)

### H
- **Honeypot:** Trap contract that locks funds

### L
- **Liquidity:** Ability to buy/sell without huge price impact
- **LP:** Liquidity Provider

### M
- **Mainnet:** Live blockchain network
- **MEV:** Miner Extractable Value

### N
- **Nonce:** Transaction sequence number
- **NFT:** Non-Fungible Token

### P
- **Private Key:** Secret key for your wallet

### R
- **Rug Pull:** Scam where devs steal funds and disappear
- **RPC:** Remote Procedure Call (blockchain connection)

### S
- **Seed Phrase:** Words that restore wallet
- **Slippage:** Price difference in swaps
- **Smart Contract:** Code that executes automatically
- **Staking:** Locking crypto to earn rewards

### T
- **Token:** Digital asset on blockchain
- **TXN:** Transaction

### W
- **Wei:** Smallest ETH unit
- **Web3:** Decentralized internet

---

## 🎓 Learning Resources

### Beginner Courses
- **Ethereum.org** - Free official Ethereum education
- **CryptoZombies** - Learn Solidity by building games
- **Khan Academy** - Blockchain basics

### YouTube Channels
- **Whiteboard Crypto** - Clear explanations
- **The Coin Bureau** - In-depth education
- **Andreas M. Antonopoulos** - Technical deep dives

### Community Forums
- **r/cryptocurrency** - Reddit discussion
- **Ethereum Research** - Technical discussion
- **DeFi Pulse Discord** - Community support

### Security Resources
- **Etherscan Blog** - Latest security tips
- **MyCrypto Guide** - Wallet security
- **OpenSea Safety** - NFT security

---

## 📝 Tooltip Implementation

### For Developers

**React Component Example:**
```tsx
<Tooltip text="Maximum gas units your transaction can consume">
  <span>Gas Limit</span>
</Tooltip>
```

**HTML Hover Example:**
```html
<span title="Maximum amount of computational work your transaction can use">
  Gas Limit ℹ️
</span>
```

**CSS Styling:**
```css
.tooltip-icon {
  cursor: help;
  color: #00FF87;
  font-weight: bold;
  border-bottom: 1px dotted;
}

.tooltip-text {
  background: #1A1A1A;
  color: #FFEA00;
  padding: 10px;
  border-radius: 5px;
  font-size: 0.85rem;
}
```

---

**Always ask questions when you're unsure. Better to learn than to lose funds!** 🚀

Questions? Check the [FAQ](./README_COMPLETE.md#-faq) or ask in our [Discord community](https://discord.gg/).

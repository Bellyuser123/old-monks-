# AI Wallet Assistant - AI Upgrade TODO

## Approved Plan Steps (from user feedback)

### 1. Backend Dependencies & Setup
- [ ] Update backend/package.json (add openai dep)
- [ ] Install deps (npm install)
- [ ] Create backend/.env (OPENAI_API_KEY placeholder)

### 2. Backend Logic Upgrades (index.js)
- [ ] Require dotenv, OpenAI client
- [ ] Implement real analyzeWithAI() with OpenAI chat.completions + structured prompt
- [ ] Parse AI response to {summary, risk

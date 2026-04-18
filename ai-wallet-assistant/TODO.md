# AI Wallet Assistant - AI Upgrade TODO

## Approved Plan Steps (from user feedback)

### 1. Backend Dependencies & Setup
- [ ] Update backend/package.json (add openai dep)
- [ ] Install deps (npm install)
- [ ] Create backend/.env (OPENAI_API_KEY placeholder)

### 2. Backend Logic Upgrades (index.js)
- [x] Require dotenv, OpenAI client
- [x] Implement real analyzeWithAI() with OpenAI chat.completions + structured prompt
- [x] Parse AI response to {summary, risk_level, explanation}

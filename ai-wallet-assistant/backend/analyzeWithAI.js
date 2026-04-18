async function analyzeWithAI(txData, fallbackSummary, fallbackRisk, fallbackRisks) {
  const openai = require("openai");
  const openaiInstance = new openai({
    apiKey: process.env.OPENAI_API_KEY,
  });
  
  if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'sk-your-openai-api-key-here') {
    return {
      summary: fallbackSummary,
      risk_level: fallbackRisk,
      explanation: "OpenAI not configured. Set OPENAI_API_KEY in .env. Using keyword analysis only."
    };
  }

  try {
    const completion = await openaiInstance.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are a crypto security expert.
Explain the given blockchain transaction in simple terms for a beginner.

Also:
- Identify if it is risky or safe
- Detect scams like unlimited approvals, phishing, draining wallets
- Return ONLY valid JSON: {
  "summary": "1 line simple explanation",
  "risk_level": "LOW" | "MEDIUM" | "HIGH", 
  "explanation": "clear reasoning"
}`
        },
        {
          role: "user",
          content: `Transaction: ${txData}`
        }
      ],
      temperature: 0.1
    });

    const aiResponse = completion.choices[0].message.content;
    const jsonMatch = aiResponse.match(/\{.*\}/s);
    if (jsonMatch) {
      const aiResult = JSON.parse(jsonMatch[0]);
      return aiResult;
    }
    return {
      summary: fallbackSummary,
      risk_level: fallbackRisk, 
      explanation: aiResponse || "AI analysis failed to parse."
    };
  } catch (error) {
    console.error('OpenAI error:', error);
    return {
      summary: fallbackSummary,
      risk_level: fallbackRisk,
      explanation: "AI service temporarily unavailable. Using keyword analysis."
    };
  }
}


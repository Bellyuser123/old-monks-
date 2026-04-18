const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const OpenAI = require("openai");

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const app = express();

app.use(cors());
app.use(express.json());

app.post("/analyze", async (req, res) => {
    const { transaction_data } = req.body || {};

    if (!transaction_data) {
        return res.status(400).json({ error: "transaction_data is required" });
    }

    // Risk detection keywords (Fallback/Safety check)
    const highRiskKeywords = [
        /approve.*unlimited/i,
        /transfer.*all/i,
        /setowner/i,
        /selfdestruct/i
    ];
    const mediumRiskKeywords = [
        /unknown contract/i,
        /suspicious token/i,
        /permit/i
    ];

    let riskLevel = "LOW";
    let summary = "This transaction appears safe.";
    let risks = [];

    // Keyword detection
    if (highRiskKeywords.some(regex => regex.test(transaction_data))) {
        riskLevel = "HIGH";
        risks.push("Unlimited approvals or full transfers detected via keyword analysis.");
        summary = "HIGH RISK: Potentially malicious!";
    } else if (mediumRiskKeywords.some(regex => regex.test(transaction_data))) {
        riskLevel = "MEDIUM";
        risks.push("Suspicious patterns found via keyword search.");
        summary = "MEDIUM RISK: Proceed with caution.";
    }

    async function analyzeWithAI(txData) {
        if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'sk-your-openai-api-key-here') {
            return {
                summary: summary,
                risk_level: riskLevel,
                explanation: (risks.join(" ") || "No specific risks identified by keywords.") + " (OpenAI not configured, fallback used)"
            };
        }

        try {
            const completion = await openai.chat.completions.create({
                model: "gpt-4o-mini",
                messages: [
                    {
                        role: "system",
                        content: `You are a crypto security expert and wallet assistant.

Your job is to explain blockchain transactions in simple, beginner-friendly language and detect potential risks.

IMPORTANT RULES:
- Use very simple English (assume user is new to crypto)
- Avoid technical jargon OR explain it clearly
- Be concise but informative
- Always warn clearly if something is risky
- Never assume the transaction is safe

You must return output in this exact JSON format:
{
  "summary": "1 line simple explanation",
  "risk_level": "LOW | MEDIUM | HIGH",
  "explanation": "Clear explanation of what is happening and why it may be risky"
}

Risk Detection Guidelines:
- If transaction includes unlimited approval → HIGH
- If contract is unknown/unverified → MEDIUM or HIGH
- If user gives control of funds → HIGH
- If simple transfer → LOW
- If unsure → MEDIUM

Focus on:
1. What the user is doing
2. What permissions they are giving
3. What could go wrong`
                    },
                    {
                        role: "user",
                        content: `Analyze the transaction below:
Transaction: ${txData}`
                    }
                ],
                temperature: 0.1,
                response_format: { type: "json_object" }
            });

            const aiResponse = completion.choices[0].message.content;
            try {
                return JSON.parse(aiResponse);
            } catch (e) {
                // Fallback parsing if JSON is wrapped in markdown
                const jsonMatch = aiResponse.match(/\{.*\}/s);
                return jsonMatch ? JSON.parse(jsonMatch[0]) : null;
            }
        } catch (error) {
            console.error('OpenAI error:', error);
            return null;
        }
    }

    const aiAnalysis = await analyzeWithAI(transaction_data);
    
    if (aiAnalysis) {
        res.json(aiAnalysis);
    } else {
        // Ultimate fallback
        res.json({
            summary: summary,
            risk_level: riskLevel,
            explanation: (risks.join(" ") || "Analysis failed to produce a response. Please check transaction manually.")
        });
    }
});

app.post("/chat", async (req, res) => {
    const { question, transaction_data } = req.body;

    if (!question) {
        return res.status(400).json({ error: "question is required" });
    }

    const context = transaction_data ? `Context transaction: ${transaction_data}\n` : '';
    const fullPrompt = `${context}Question: ${question}`;

    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'sk-your-openai-api-key-here') {
        return res.json({
            answer: "Chat requires OpenAI API key in .env. Question noted for demo."
        });
    }

    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: "You are an expert crypto wallet assistant. Answer questions about blockchain transactions clearly and help users avoid scams. Be concise but thorough."
                },
                {
                    role: "user",
                    content: fullPrompt
                }
            ]
        });

        const answer = completion.choices[0].message.content;
        res.json({ answer });
    } catch (error) {
        console.error('Chat OpenAI error:', error);
        res.status(500).json({ error: "Chat analysis failed" });
    }
});

app.listen(5000, () => console.log("AI Wallet Assistant Backend running on port 5000"));

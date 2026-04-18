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

app.post("/analyze", (req, res) => {
    const { transaction_data } = req.body || {};

    if (!transaction_data) {
        return res.status(400).json({ error: "transaction_data is required" });
    }

    // Risk detection keywords
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
    let risks = [];
    let summary = "This transaction appears safe. Standard operation detected.";

    // Check for risks
    if (highRiskKeywords.some(regex => regex.test(transaction_data))) {
        riskLevel = "HIGH";
        risks.push("Unlimited approvals, full balance transfers, or destructive calls detected.");
        summary = "HIGH RISK: Potentially malicious transaction!";
    } else if (mediumRiskKeywords.some(regex => regex.test(transaction_data))) {
        riskLevel = "MEDIUM";
        risks.push("Suspicious patterns or unknown contracts found.");
        summary = "MEDIUM RISK: Proceed with caution.";
    }

async function analyzeWithAI(txData) {
        if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'sk-your-openai-api-key-here') {
            return {
                summary: summary,
                risk_level: riskLevel,
                explanation: "OpenAI not configured. Set OPENAI_API_KEY in .env. Using keyword analysis only."
            };
        }

        try {
            const completion = await openai.chat.completions.create({
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
            // Parse JSON from response
            const jsonMatch = aiResponse.match(/\{.*\}/s);
            if (jsonMatch) {
                const aiResult = JSON.parse(jsonMatch[0]);
                return aiResult;
            }
            return {
                summary: summary,
                risk_level: riskLevel, 
                explanation: aiResponse || "AI analysis failed to parse."
            };
        } catch (error) {
            console.error('OpenAI error:', error);
            return {
                summary: summary,
                risk_level: riskLevel,
                explanation: "AI service temporarily unavailable. Using keyword analysis."
            };
        }
    }

    console.log('POST /analyze received:', transaction_data.substring(0, 50) + '...');
    
    // Keyword analysis first
    let keywordRisk = riskLevel;
    let keywordSummary = summary;
    
    // Async AI analysis (no double response)
    analyzeWithAI(transaction_data).then(aiAnalysis => {
        console.log('AI analysis complete:', aiAnalysis.risk_level);
        res.json({
            summary: aiAnalysis.summary || keywordSummary,
            risk_level: aiAnalysis.risk_level || keywordRisk,
            explanation: aiAnalysis.explanation
        });
    }).catch(err => {
        console.error('AI analysis error:', err);
        res.json({
            summary: keywordSummary,
            risk_level: keywordRisk,
            explanation: risks.join(" ") || "Keyword analysis complete. AI temporarily unavailable."
        });
    });
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

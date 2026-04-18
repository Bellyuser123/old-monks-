const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const OpenAI = require("openai");
const analyzeWithAI = require('./analyzeWithAI');

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

    console.log('POST /analyze received:', transaction_data.substring(0, 50) + '...');
    
    try {
        const aiAnalysis = await analyzeWithAI(transaction_data, summary, riskLevel, risks);
        console.log('AI analysis complete:', aiAnalysis.risk_level);
        res.json({
            summary: aiAnalysis.summary,
            risk_level: aiAnalysis.risk_level,
            explanation: aiAnalysis.explanation
        });
    } catch (err) {
        console.error('AI analysis error:', err);
        res.status(500).json({ error: "Analysis failed" });
    }
});

app.post("/chat", async (req, res) => {
    const { question, transaction_data } = req.body;

    if (!question) {
        return res.status(400).json({ error: "question is required" });
    }

    const context = transaction_data ? `Context transaction: ${transaction_data}\\n` : '';
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

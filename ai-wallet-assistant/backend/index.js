const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const OpenAI = require("openai");
const analyzeWithAI = require('./analyzeWithAI');

dotenv.config();

const openai = new OpenAI({
  baseURL: process.env.NVIDIA_BASE_URL || "https://integrate.api.nvidia.com/v1",
  apiKey: process.env.OPENAI_API_KEY || process.env.NVIDIA_API_KEY || "dummy_key_to_allow_initialization",
});

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ status: "active", message: "AI Wallet Assistant Backend is running" });
});

app.get("/health", (req, res) => {
    res.status(200).send("OK");
});

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
        /selfdestruct/i,
        /0xffffffffffffffffffffffffffffffff/i,
        /0x[f]{64}/i
    ];
    const mediumRiskKeywords = [
        /unknown contract/i,
        /suspicious token/i,
        /permit/i
    ];

    let riskLevel = "LOW";
    let summary = "This transaction appears safe.";
    let risks = [];

    if (highRiskKeywords.some(regex => regex.test(transaction_data))) {
        riskLevel = "HIGH";
        risks.push("Unlimited approvals or full transfers detected.");
        summary = "HIGH RISK: Potentially malicious!";
    } else if (mediumRiskKeywords.some(regex => regex.test(transaction_data))) {
        riskLevel = "MEDIUM";
        risks.push("Suspicious patterns found.");
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
    const { message, transaction_data } = req.body;

    if (!message) {
        return res.status(400).json({ error: "message is required" });
    }

<<<<<<< HEAD
    const context = transaction_data ? `Context transaction: ${transaction_data}\\n` : '';
    const fullPrompt = `${context}Question: ${question}`;
=======
    const context = transaction_data ? `Transaction context: ${transaction_data}` : '';
    const fullPrompt = `${context} Q: ${message}`;
>>>>>>> 8c02ef48f325ea3b08178f8e8c515fc25bb8ca7b

    if (!process.env.NVIDIA_API_KEY || process.env.NVIDIA_API_KEY === 'nvapi-your-key-here') {
        return res.json({ reply: "Chat requires NVIDIA API key in .env. Message noted for demo." });
    }

    try {
        const completion = await openai.chat.completions.create({
            model: "meta/llama-3.3-70b-instruct",
            messages: [
                {
                    role: "system",
                    content: "You are a crypto wallet assistant. Answer clearly about transactions and security."
                },
                {
                    role: "user",
                    content: fullPrompt
                }
            ],
            temperature: 0.2,
            top_p: 0.7,
            max_tokens: 1024
        });

        const reply = completion.choices[0].message.content;
        res.json({ reply });
    } catch (error) {
        console.error('Chat NVIDIA API error:', error);
        res.status(500).json({ error: "Chat analysis failed" });
    }
});

app.listen(5000, () => console.log("AI Wallet Backend on port 5000"));

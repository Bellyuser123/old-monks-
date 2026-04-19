const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const OpenAI = require('openai');
const analyzeWithAI = require('./analyzeWithAI');
const authRoutes = require('./routes/auth');

dotenv.config();

// Connect to MongoDB
connectDB();

const openai = new OpenAI({
  baseURL: process.env.NVIDIA_BASE_URL || "https://integrate.api.nvidia.com/v1",
  apiKey: process.env.OPENAI_API_KEY || process.env.NVIDIA_API_KEY || "dummy_key_to_allow_initialization",
});

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '10mb' }));

// API Routes - Auth
app.use('/api/auth', authRoutes);

// Existing AI Routes
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

    const context = transaction_data ? `Transaction context: ${transaction_data}` : '';
    const fullPrompt = `${context} Q: ${message}`;

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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`AI Wallet Backend on port ${PORT}`);
});


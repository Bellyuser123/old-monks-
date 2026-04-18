const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const OpenAI = require("openai");

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: "https://integrate.api.nvidia.com/v1"
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

    async function analyzeWithAI(txData) {
        if (!process.env.OPENAI_API_KEY) {
            return {
                summary: summary,
                risk_level: riskLevel,
                risk_score: riskLevel === "HIGH" ? 90 : riskLevel === "MEDIUM" ? 50 : 10,
                risk_factors: risks,
                explanation: {
                    simple: risks.join(" ") || "No specific risks identified.",
                    technical: "API key not configured. Using keyword fallback."
                }
            };
        }

        try {
            const completion = await openai.chat.completions.create({
                model: "meta/llama-3.3-70b-instruct",
                messages: [
                    {
                        role: "system",
                        content: "You are a crypto security expert. Analyze transactions and return structured JSON: {summary, risk_level (LOW/MEDIUM/HIGH), risk_score (0-100), risk_factors (array), explanation (simple + technical)}."
                    },
                    {
                        role: "user",
                        content: `Analyze: ${txData}`
                    }
                ],
                temperature: 0.1,
                response_format: { type: "json_object" }
            });

            return JSON.parse(completion.choices[0].message.content);
        } catch (error) {
            console.error('AI error:', error);
            return {
                summary: summary,
                risk_level: riskLevel,
                risk_score: riskLevel === "HIGH" ? 90 : riskLevel === "MEDIUM" ? 50 : 10,
                risk_factors: risks,
                explanation: {
                    simple: "AI unavailable, keyword fallback used.",
                    technical: error.message
                }
            };
        }
    }

    const aiAnalysis = await analyzeWithAI(transaction_data);
    res.json(aiAnalysis);
});

app.post("/chat", async (req, res) => {
    const { message, transaction_data } = req.body;

    if (!message) {
        return res.status(400).json({ error: "message is required" });
    }

    const context = transaction_data ? `Transaction context: ${transaction_data}` : '';
    const fullPrompt = `${context} Q: ${message}`;

    if (!process.env.OPENAI_API_KEY) {
        return res.json({ reply: "API key required in .env" });
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
            ]
        });

        const reply = completion.choices[0].message.content;
        res.json({ reply });
    } catch (error) {
        console.error('Chat error:', error);
        res.status(500).json({ reply: "AI unavailable - " + error.message });
    }
});

app.listen(5000, () => console.log("AI Wallet Backend on port 5000"));
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const OpenAI = require("openai");

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: "https://integrate.api.nvidia.com/v1"
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

    async function analyzeWithAI(txData) {
        if (!process.env.OPENAI_API_KEY) {
            return {
                summary: summary,
                risk_level: riskLevel,
                risk_score: riskLevel === "HIGH" ? 90 : riskLevel === "MEDIUM" ? 50 : 10,
                risk_factors: risks,
                explanation: {
                    simple: risks.join(" ") || "No specific risks identified.",
                    technical: "API key not configured. Using keyword fallback."
                }
            };
        }

        try {
            const completion = await openai.chat.completions.create({
                model: "meta/llama-3.3-70b-instruct",
                messages: [
                    {
                        role: "system",
                        content: "You are a crypto security expert. Analyze transactions and return structured JSON: {summary, risk_level (LOW/MEDIUM/HIGH), risk_score (0-100), risk_factors (array), explanation (simple + technical)}."
                    },
                    {
                        role: "user",
                        content: `Analyze: ${txData}`
                    }
                ],
                temperature: 0.1,
                response_format: { type: "json_object" }
            });

            return JSON.parse(completion.choices[0].message.content);
        } catch (error) {
            console.error('AI error:', error);
            return {
                summary: summary,
                risk_level: riskLevel,
                risk_score: riskLevel === "HIGH" ? 90 : riskLevel === "MEDIUM" ? 50 : 10,
                risk_factors: risks,
                explanation: {
                    simple: "AI unavailable, keyword fallback used.",
                    technical: error.message
                }
            };
        }
    }

    const aiAnalysis = await analyzeWithAI(transaction_data);
    res.json(aiAnalysis);
});

app.post("/chat", async (req, res) => {
    const { message, transaction_data } = req.body;

    if (!message) {
        return res.status(400).json({ error: "message is required" });
    }

    const context = transaction_data ? `Transaction context: ${transaction_data}` : '';
    const fullPrompt = `${context} Q: ${message}`;

    if (!process.env.OPENAI_API_KEY) {
        return res.json({ reply: "API key required in .env" });
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
            ]
        });

        const reply = completion.choices[0].message.content;
        res.json({ reply });
    } catch (error) {
        console.error('Chat error:', error);
        res.status(500).json({ reply: "AI unavailable - " + error.message });
    }
});

app.listen(5000, () => console.log("AI Wallet Backend on port 5000"));


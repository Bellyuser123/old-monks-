/**
 * Transaction Analyzer Component
 * Main interface for analyzing blockchain transactions
 */

'use client';

import React, { useState } from 'react';

interface TransactionData {
  from: string;
  to: string;
  value: string;
  data: string;
  gasLimit: string;
  gasPrice?: string;
  nonce: number;
  chainId?: number;
}

interface AnalysisResult {
  risk_level: 'LOW' | 'MEDIUM' | 'HIGH';
  risk_score: number;
  summary: string;
  explanation: string;
  flags: Array<{
    flag: string;
    severity: string;
    description: string;
  }>;
  recommendations: string[];
  confidence_score: number;
}

export default function TransactionAnalyzer() {
  const [txInput, setTxInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('analyze');

  const handleAnalyze = async () => {
    if (!txInput.trim()) {
      setError('Please enter transaction data');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Parse transaction data
      let txData: TransactionData;
      try {
        txData = JSON.parse(txInput);
      } catch {
        setError('Invalid JSON format. Please check your transaction data.');
        setIsLoading(false);
        return;
      }

      // Call API
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transaction_data: txData }),
      });

      if (!response.ok) {
        throw new Error('Analysis failed');
      }

      const result = await response.json();
      setAnalysis(result);
    } catch (err) {
      setError('Failed to analyze transaction. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'LOW':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'MEDIUM':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'HIGH':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'LOW':
        return '✅';
      case 'MEDIUM':
        return '⚠️';
      case 'HIGH':
        return '🚨';
      default:
        return '❓';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-2">
          Transaction Analyzer
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Paste your transaction data to analyze risks and get AI-powered explanations
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <label className="block text-sm font-semibold mb-2">Transaction Data (JSON)</label>
            <textarea
              value={txInput}
              onChange={(e) => setTxInput(e.target.value)}
              placeholder={`{
  "from": "0x742d35Cc6634C0532925a3b844Bc226e4f71aAA0",
  "to": "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
  "value": "0",
  "data": "0x...",
  "gasLimit": "200000",
  "nonce": 42
}`}
              className="w-full h-48 p-4 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {error && <p className="text-red-600 text-sm mt-2">❌ {error}</p>}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleAnalyze}
              disabled={isLoading}
              className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg font-semibold transition-all"
            >
              {isLoading ? '⏳ Analyzing...' : '🔍 Analyze Transaction'}
            </button>
            <button
              onClick={() => setTxInput('')}
              className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
            >
              Clear
            </button>
          </div>

          {/* Sample Data */}
          <details className="text-sm text-gray-600 dark:text-gray-400">
            <summary className="cursor-pointer font-semibold mb-2">📋 Sample Transactions</summary>
            <div className="space-y-2">
              <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded text-xs font-mono overflow-auto max-h-24">
                Simple ETH Transfer
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded text-xs font-mono overflow-auto max-h-24">
                Token Swap (Uniswap)
              </div>
            </div>
          </details>
        </div>

        {/* Quick Info Panel */}
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl shadow-sm p-6">
            <h3 className="font-semibold mb-3">💡 Tips</h3>
            <ul className="space-y-2 text-sm">
              <li>✓ Paste raw transaction data</li>
              <li>✓ Check for red flags</li>
              <li>✓ Read AI explanation</li>
              <li>✓ Follow recommendations</li>
            </ul>
          </div>

          <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-xl p-6">
            <h3 className="font-semibold text-orange-900 dark:text-orange-200 mb-2">⚠️ Disclaimer</h3>
            <p className="text-sm text-orange-800 dark:text-orange-300">
              This tool is for educational purposes. Always verify with official sources before signing transactions.
            </p>
          </div>
        </div>
      </div>

      {/* Analysis Results */}
      {analysis && (
        <div className="space-y-6 animate-fadeIn">
          {/* Risk Summary */}
          <div className={`border-2 rounded-xl p-8 ${getRiskColor(analysis.risk_level)}`}>
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-3xl">{getRiskIcon(analysis.risk_level)}</span>
                  <span className="text-3xl font-bold">{analysis.risk_level} RISK</span>
                </div>
                <p className="text-lg font-semibold mb-4">{analysis.summary}</p>
                <div className="flex items-center gap-4">
                  <div>
                    <div className="text-sm font-medium opacity-75">Risk Score</div>
                    <div className="text-2xl font-bold">{analysis.risk_score}/100</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium opacity-75">Confidence</div>
                    <div className="text-2xl font-bold">{analysis.confidence_score}%</div>
                  </div>
                </div>
              </div>
              <div className="w-32 h-32 rounded-full border-4 border-current flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl font-bold">{analysis.risk_score}</div>
                  <div className="text-xs opacity-75">Score</div>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Explanation */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold mb-4">📖 Detailed Analysis</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{analysis.explanation}</p>
          </div>

          {/* Risk Flags */}
          {analysis.flags.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold mb-4">🚩 Risk Flags</h3>
              <div className="space-y-3">
                {analysis.flags.map((flag, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border-l-4 border-red-500"
                  >
                    <span className="text-xl mt-1">
                      {flag.severity === 'HIGH' ? '🔴' : flag.severity === 'MEDIUM' ? '🟡' : '🟢'}
                    </span>
                    <div>
                      <div className="font-semibold">{flag.flag}</div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{flag.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recommendations */}
          {analysis.recommendations.length > 0 && (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4 text-green-900 dark:text-green-200">✅ Recommendations</h3>
              <ul className="space-y-2">
                {analysis.recommendations.map((rec, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-green-800 dark:text-green-300">
                    <span className="text-xl mt-0.5">→</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

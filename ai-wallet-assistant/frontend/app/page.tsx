"use client";

import { useState, FormEvent } from 'react';
import { saveAnalysis, createAnalysis } from '@/lib/history';
import Link from 'next/link';

interface AnalysisResult {
  summary: string;
  risk_level: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  risk_score?: number;
  risk_factors?: string[];
  explanation: {
    simple: string;
    technical: string;
  };
}

interface ChatMessage {
  type: 'user' | 'ai';
  text: string;
}

export default function Home() {
  const [transactionData, setTransactionData] = useState('');

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);

  const RISKY_EXAMPLE = `Approve unlimited USDT tokens to suspicious contract 0xdeadbeef... This could drain your wallet!`;

  const handleAnalyze = async (e: FormEvent) => {
    e.preventDefault();
    if (!transactionData.trim()) {
      setError('Please enter transaction data');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('http://localhost:5000/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transaction_data: transactionData }),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const data: AnalysisResult = await response.json();
      setResult(data);

      // Auto-save to history
      const statusMap = {
        LOW: 'Safe' as const,
        MEDIUM: 'Warning' as const,
        HIGH: 'Critical' as const,
      };
      const analysis = createAnalysis(
        transactionData,
        {
          status: statusMap[data.risk_level as keyof typeof statusMap],
          summary: data.summary,
          details: typeof data.explanation === 'object'
            ? `${data.explanation.simple}\n\n${data.explanation.technical}`
            : data.explanation,
        }
      );
      saveAnalysis(analysis);
    } catch (err: any) {
      setError(err.message || 'Analysis failed. Start backend: cd ai-wallet-assistant/backend && node index.js');
    } finally {
      setLoading(false);
    }
  };


  const handleTryExample = () => {
    setTransactionData(RISKY_EXAMPLE);
    setError('');
  };

  const handleSendChat = async (e: FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage: ChatMessage = { type: 'user', text: chatInput };
    const tempMessages = [...chatMessages, userMessage];
    setChatMessages(tempMessages);
    setChatInput('');
    setChatLoading(true);

    try {
      const response = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: chatInput,
          transaction_data: result ? transactionData : undefined 
        }),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const data = await response.json();
      const aiMessage: ChatMessage = { type: 'ai', text: data.reply || 'No response' };
      const newMessages = [...tempMessages, aiMessage];
      setChatMessages(newMessages);

      // Append to analysis chatHistory if result exists
      if (result && transactionData) {
        const statusMap = {
          LOW: 'Safe' as const,
          MEDIUM: 'Warning' as const,
          HIGH: 'Critical' as const,
        };
        const analysis = createAnalysis(
          transactionData,
          {
            status: statusMap[result.risk_level as keyof typeof statusMap],
            summary: result.summary,
            details: result.explanation.simple || JSON.stringify(result.explanation),
          },
          newMessages.map(m => ({
            role: m.type === 'user' ? 'user' : 'assistant',
            message: m.text
          }))
        );
        saveAnalysis(analysis);
      }
    } catch (err: any) {
      const errorMessage: ChatMessage = { type: 'ai', text: `Error: ${err.message}. Backend must be running.` };
      setChatMessages([...tempMessages, errorMessage]);
    } finally {
      setChatLoading(false);
    }
  };


  const getRiskStyle = (risk: string) => {
    const styles = {
      LOW: { backgroundColor: '#16a34a', color: 'white' },
      MEDIUM: { backgroundColor: 'orange', color: 'black' },
      HIGH: { backgroundColor: '#dc2626', color: 'white' }
    };
    return styles[risk as keyof typeof styles] || { backgroundColor: 'gray', color: 'white' };
  };

  return (
    <main style={{
      minHeight: '100vh',
      padding: '64px 32px',
      backgroundColor: '#fafafa',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui',
      lineHeight: 1.6
    }}>
      <div style={{
        maxWidth: '900px',
        margin: '0 auto'
      }}> 
        <header style={{
          textAlign: 'center',
          marginBottom: '64px',
          paddingBottom: '32px'
        }}>
          <h1 style={{
            fontSize: '48px',
            fontWeight: '700',
            color: '#111',
            marginBottom: '16px',
            lineHeight: 1.1
          }}>
            AI Wallet Assistant
          </h1>
          <p style={{
            fontSize: '20px',
            color: '#666',
            margin: 0
          }}>
            Clean transaction analysis
          </p>
        </header>

        {/* Analysis Section */}
        <section style={{
          marginBottom: '64px',
          padding: '32px',
          backgroundColor: 'white',
          border: '1px solid #eee',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{
            fontSize: '32px',
            fontWeight: '700',
            color: '#111',
            marginBottom: '32px'
          }}>
            Analyze Transaction
          </h2>
          
          <button
            onClick={handleTryExample}
            style={{
              padding: '12px 24px',
              backgroundColor: '#f0f0f0',
              color: '#111',
              border: '1px solid #ddd',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '500',
              cursor: 'pointer',
              marginBottom: '24px',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e0e0e0'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
          >
            Try Example
          </button>

          <form onSubmit={handleAnalyze} style={{ marginBottom: '32px' }}>
            <textarea
              value={transactionData}
              onChange={(e) => setTransactionData(e.target.value)}
              placeholder="Paste your transaction data here..."
              style={{
                width: '100%',
                minHeight: '160px',
                padding: '20px',
                border: '1px solid #ddd',
                borderRadius: '12px',
                fontFamily: 'monospace',
                fontSize: '16px',
                lineHeight: 1.6,
                resize: 'vertical',
                outline: 'none',
                backgroundColor: 'white',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
              }}
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !transactionData.trim()}
              style={{
                width: '100%',
                padding: '20px',
                backgroundColor: '#0070f3',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '18px',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                marginTop: '20px',
                transition: 'all 0.2s',
                boxShadow: '0 4px 12px rgba(0,112,243,0.3)'
              }}
              onMouseOver={(e) => {
                if (!loading && transactionData.trim()) {
                  e.currentTarget.style.backgroundColor = '#0056b3';
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,112,243,0.4)';
                }
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = '#0070f3';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,112,243,0.3)';
              }}
            >
              {loading ? 'Analyzing...' : 'Analyze'}
            </button>
          </form>

<<<<<<< HEAD
          {error && (
=======
            <form onSubmit={handleAnalyze} style={{ marginBottom: '2rem' }}>
              <textarea
                value={transactionData}
                onChange={(e) => setTransactionData(e.target.value)}
                placeholder="PASTE YOUR TRANSACTION DATA HERE..."
                style={{
                  width: '100%',
                  height: '160px',
                  padding: '1.5rem',
                  border: '4px solid black',
                  backgroundColor: '#fafafa',
                  fontFamily: 'monospace',
                  fontSize: '1rem',
                  lineHeight: 1.5,
                  resize: 'vertical',
                  boxShadow: 'inset 4px 4px 0 #ddd',
                  fontWeight: '500'
                }}
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !transactionData.trim()}
                style={{
                  width: '100%',
                  padding: '1.5rem 2rem',
                  backgroundColor: '#ff0000',
                  color: 'white',
                  border: '4px solid black',
                  fontSize: '1.3rem',
                  fontWeight: 'bold',
                  fontFamily: '"Arial Black", sans-serif',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  boxShadow: '6px 6px 0 black',
                  marginTop: '1.5rem',
                  textTransform: 'uppercase',
                  transition: 'all 0.1s'
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.transform = 'translate(4px, 4px)';
                  e.currentTarget.style.boxShadow = '2px 2px 0 black';
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.transform = '';
                  e.currentTarget.style.boxShadow = '6px 6px 0 black';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = '';
                  e.currentTarget.style.boxShadow = '6px 6px 0 black';
                }}
              >
                {loading ? 'AI THINKING...' : 'RIP & TEAR ANALYZE'}
              </button>
            </form>

            {error && (
              <div style={{
                padding: '1.5rem',
                border: '4px solid #ff4444',
                backgroundColor: '#ffeeee',
                marginTop: '1rem',
                fontWeight: 'bold',
                color: 'black'
              }}>
                ERROR: {error}
              </div>
            )}

            {result && (
              <div style={{
                border: '4px solid black',
                backgroundColor: '#fff',
                boxShadow: '6px 6px 0 black',
                padding: '2rem',
                marginTop: '2rem',
                rotate: '-0.5deg'
              }}>
                <div style={{ 
                  display: 'flex', 
                  gap: '1.5rem', 
                  alignItems: 'flex-start',
                  marginBottom: '1.5rem' 
                }}>
                  <div style={{
                    padding: '1rem 2rem',
                    minWidth: '140px',
                    textAlign: 'center',
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    border: '3px solid black',
                    textTransform: 'uppercase',
                    boxShadow: '4px 4px 0 black',
                    ...getRiskStyle(result.risk_level)
                  }}>
                    {result.risk_level} RISK
                  </div>
                  <h3 style={{
                    fontSize: '2rem',
                    fontWeight: '900',
                    color: 'black',
                    margin: 0,
                    lineHeight: 1.2,
                    flex: 1,
                    fontFamily: '"Arial Black", sans-serif'
                  }}>
                    {result.summary}
                  </h3>
                </div>
                {result.risk_score !== undefined && (
                  <div style={{
                    padding: '0.5rem 1rem',
                    border: '2px solid black',
                    backgroundColor: '#f5f5f5',
                    color: 'black',
                    fontWeight: 'bold',
                    marginBottom: '1rem',
                    fontFamily: 'monospace'
                  }}>
                    RISK SCORE: {result.risk_score}/100
                  </div>
                )}
                {result.risk_factors && result.risk_factors.length > 0 && (
                  <ul style={{
                    margin: '0 0 1rem 0',
                    paddingLeft: '1.5rem',
                    fontFamily: 'monospace',
                    fontWeight: '500',
                    color: 'black'
                  }}>
                    {result.risk_factors.map((factor, i) => (
                      <li key={i} style={{ marginBottom: '0.3rem', color: 'black' }}>{factor}</li>
                    ))}
                  </ul>
                )}
                <p style={{
                  fontSize: '1rem',
                  color: 'black',
                  lineHeight: 1.6,
                  margin: '0 0 0.75rem 0',
                  fontFamily: 'monospace',
                  fontWeight: '500'
                }}>
                  <strong>Simple:</strong> {result.explanation?.simple}
                </p>
                <p style={{
                  fontSize: '0.9rem',
                  color: '#444',
                  lineHeight: 1.6,
                  margin: 0,
                  fontFamily: 'monospace'
                }}>
                  <strong>Technical:</strong> {result.explanation?.technical}
                </p>
                <Link href="/history" style={{
                  display: 'inline-block',
                  marginTop: '1.5rem',
                  padding: '1rem 2rem',
                  backgroundColor: '#4f46e5',
                  color: 'white',
                  textDecoration: 'none',
                  fontWeight: 'bold',
                  border: '3px solid black',
                  boxShadow: '4px 4px 0 black',
                  fontFamily: '"Arial Black", sans-serif'
                }}>
                  VIEW IN HISTORY →
                </Link>
              </div>
            )}

          </div>

          {/* Chat Panel */}
          <div style={{
            border: '4px solid black',
            backgroundColor: '#fff',
            boxShadow: '-8px 8px 0 black',
            rotate: '-0.5deg',
            padding: '2rem'
          }}>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: '900',
              color: 'black',
              margin: '0 0 2rem 0',
              borderBottom: '3px solid black',
              paddingBottom: '0.5rem',
              fontFamily: '"Arial Black", sans-serif'
            }}>
              AI CHAT TERMINAL
            </h2>
>>>>>>> 8c02ef48f325ea3b08178f8e8c515fc25bb8ca7b
            <div style={{
              padding: '20px',
              border: '1px solid #f87171',
              backgroundColor: '#fef2f2',
              borderRadius: '12px',
              marginTop: '20px',
              color: '#dc2626',
              fontWeight: '500'
            }}>
              {error}
            </div>
          )}

          {result && (
            <div style={{
              padding: '32px',
              backgroundColor: 'white',
              border: '1px solid #eee',
              borderRadius: '12px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
              marginTop: '32px'
            }}>
              <div style={{ 
                display: 'flex', 
                gap: '24px', 
                alignItems: 'flex-start',
                marginBottom: '24px' 
              }}>
                <div style={{
                  padding: '12px 24px',
                  backgroundColor: getRiskStyle(result.risk_level).backgroundColor,
                  color: getRiskStyle(result.risk_level).color,
                  borderRadius: '8px',
                  fontSize: '18px',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  minWidth: '160px',
                  textAlign: 'center',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                }}>
                  {result.risk_level} Risk
                </div>
                <h3 style={{
                  fontSize: '32px',
                  fontWeight: '700',
                  color: '#111',
                  margin: 0,
                  lineHeight: 1.2,
                  flex: 1
                }}>
                  {result.summary}
                </h3>
              </div>
              <p style={{
                fontSize: '18px',
                color: '#333',
                lineHeight: 1.7,
                margin: 0
              }}>
                {result.explanation}
              </p>
              <Link href="/history" style={{
                display: 'inline-block',
                marginTop: '24px',
                padding: '16px 32px',
                backgroundColor: '#10b981',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '12px',
                fontWeight: '600',
                fontSize: '16px',
                boxShadow: '0 4px 12px rgba(16,185,129,0.3)'
              }}>
                View History →
              </Link>
            </div>
          )}
        </section>

        {/* Chat Section */}
        <section style={{
          padding: '32px',
          backgroundColor: 'white',
          border: '1px solid #eee',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{
            fontSize: '32px',
            fontWeight: '700',
            color: '#111',
            marginBottom: '32px'
          }}>
            Ask Questions
          </h2>
          
          <div style={{
            height: '400px',
            border: '1px solid #ddd',
            borderRadius: '12px',
            backgroundColor: '#f8f9fa',
            padding: '24px',
            overflowY: 'auto',
            marginBottom: '24px',
            fontFamily: 'monospace'
          }}>
            {chatMessages.length === 0 ? (
              <div style={{ 
                color: '#666', 
                textAlign: 'center', 
                padding: '48px 24px',
                fontSize: '18px' 
              }}>
                Ask questions about your analysis above
              </div>
            ) : (
              chatMessages.map((msg, idx) => (
                <div key={idx} style={{
                  marginBottom: '24px',
                  padding: '20px',
                  backgroundColor: msg.type === 'user' ? '#e3f2fd' : '#f1f3f4',
                  borderRadius: '12px',
                  maxWidth: '80%',
                  marginLeft: msg.type === 'user' ? 'auto' : 0,
                  marginRight: msg.type === 'user' ? 0 : 'auto',
                  fontSize: '16px',
                  lineHeight: 1.6,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                }}>
                  <strong style={{ 
                    color: msg.type === 'user' ? '#1976d2' : '#555',
                    fontSize: '14px',
                    textTransform: 'uppercase',
                    marginBottom: '8px',
                    display: 'block'
                  }}>
                    {msg.type.toUpperCase()}
                  </strong>
                  {msg.text}
                </div>
              ))
            )}
            {chatLoading && (
              <div style={{
                marginBottom: '24px',
                padding: '20px',
                backgroundColor: '#f1f3f4',
                borderRadius: '12px',
                maxWidth: '80%',
                fontSize: '16px'
              }}>
                <strong style={{ color: '#555', fontSize: '14px' }}>AI</strong>
                <span> Thinking...</span>
              </div>
            )}
          </div>

          <form onSubmit={handleSendChat} style={{ display: 'flex', gap: '16px' }}>
            <input
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Ask about the transaction..."
              style={{
                flex: 1,
                padding: '20px',
                border: '1px solid #ddd',
                borderRadius: '12px',
                fontSize: '16px',
                fontFamily: 'monospace',
                outline: 'none',
                backgroundColor: 'white',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
              }}
              disabled={chatLoading}
            />
            <button
              type="submit"
              disabled={chatLoading || !chatInput.trim()}
              style={{
                padding: '20px 32px',
                backgroundColor: '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: chatLoading ? 'not-allowed' : 'pointer',
                whiteSpace: 'nowrap',
                boxShadow: '0 4px 12px rgba(16,185,129,0.3)',
                transition: 'all 0.2s'
              }}
            >
              Send
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}



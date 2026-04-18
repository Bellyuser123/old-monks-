"use client";

import { useState } from 'react';

interface Guide {
  id: string;
  title: string;
  content: string;
}

interface Tip {
  id: string;
  title: string;
  description: string;
  category: string;
}

const GUIDES: Guide[] = [
  {
    id: 'getting-started',
    title: '🚀 Getting Started',
    content: `Welcome to AI Wallet Assistant! Here's how to use it:

1. ANALYZE TRANSACTIONS
   • Paste your transaction data in the left panel
   • Click "RIP & TEAR ANALYZE" to get AI analysis
   • View risk level (LOW/MEDIUM/HIGH) with explanation

2. ASK THE AI
   • Use the right panel chat to ask crypto questions
   • Ask about gas fees, token approvals, contract risks
   • Get instant explanations for Web3 concepts

3. UNDERSTAND RISKS
   • 🟢 GREEN = Safe transaction, low risk
   • 🟡 YELLOW = Be cautious, medium risk
   • 🔴 RED = Dangerous! High risk, do not sign`
  },
  {
    id: 'crypto-basics',
    title: '💡 Crypto Basics for Beginners',
    content: `New to crypto? Start here:

WALLET: Digital account holding your crypto assets
GAS: Fee paid to miners for processing transactions
TOKEN: Digital asset on blockchain (like ETH, USDC, etc)
SMART CONTRACT: Automated program running on blockchain
APPROVAL: Permission given to contract to spend your tokens
NONCE: Number tracking transaction order from your wallet

KEY SAFETY RULES:
✓ Never share your private key
✓ Double-check contract addresses
✓ Start with small transactions
✓ Use trusted wallets only (MetaMask, Ledger, etc)`
  },
  {
    id: 'transaction-types',
    title: '🔄 Common Transaction Types',
    content: `Understanding different transaction types:

SIMPLE TRANSFER
Sending crypto to another address
Risk: LOW (if address is correct)

TOKEN APPROVAL
Giving smart contract permission to spend your tokens
Risk: MEDIUM-HIGH (watch for unlimited approvals!)

TOKEN SWAP
Trading one token for another on DEX (Uniswap, SushiSwap)
Risk: MEDIUM (check slippage & contract)

CONTRACT INTERACTION
Calling functions on a smart contract
Risk: VARIES (can range from low to very high)`
  },
  {
    id: 'danger-signs',
    title: '⚠️ Danger Signs to Watch',
    content: `RED FLAGS that indicate risky transactions:

🚩 UNLIMITED APPROVAL
Contract can take ANY amount of your tokens forever
Always approve specific amounts only!

🚩 UNKNOWN CONTRACT
Don't interact with contracts you haven't verified
Check etherscan.io for contract details

🚩 PHISHING ATTACKS
Fake wallet prompts or lookalike contracts
Always verify URLs (check for typos)

🚩 HIDDEN FEES
Surprise high slippage in token swaps
Review price impact before confirming

🚩 HONEYPOT TOKENS
Scam tokens that let you buy but not sell
Check if previous buyers are trapped`
  }
];

const TIPS: Tip[] = [
  {
    id: 'tip-1',
    title: 'Check Gas Fees',
    description: 'High gas fees = transaction is expensive. Use gas trackers to find cheaper times.',
    category: 'Gas & Fees'
  },
  {
    id: 'tip-2',
    title: 'Verify Contract Address',
    description: 'Always verify the contract address on etherscan.io before interacting.',
    category: 'Security'
  },
  {
    id: 'tip-3',
    title: 'Limit Approvals',
    description: 'Never approve unlimited token spending. Always set a specific amount.',
    category: 'Security'
  },
  {
    id: 'tip-4',
    title: 'Check Slippage',
    description: 'Slippage = price difference between order & execution. Set max slippage to 5%.',
    category: 'Trading'
  },
  {
    id: 'tip-5',
    title: 'Test Small First',
    description: 'Start with small amounts before making large transactions.',
    category: 'Best Practice'
  },
  {
    id: 'tip-6',
    title: 'Avoid Phishing',
    description: 'Never click links from DMs. Always navigate directly to official websites.',
    category: 'Security'
  },
  {
    id: 'tip-7',
    title: 'Understand Nonce',
    description: 'Nonce = transaction counter. If one fails, higher nonces may fail too.',
    category: 'Technical'
  },
  {
    id: 'tip-8',
    title: 'Monitor Holdings',
    description: 'Regularly check your wallet on etherscan.io to verify your tokens are there.',
    category: 'Best Practice'
  },
];

export default function GuideTipsWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'guides' | 'tips'>('guides');
  const [selectedGuide, setSelectedGuide] = useState<string | null>(null);
  const [selectedTip, setSelectedTip] = useState<string | null>(null);

  const currentGuide = GUIDES.find(g => g.id === selectedGuide);
  const currentTip = TIPS.find(t => t.id === selectedTip);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          width: '60px',
          height: '60px',
          borderRadius: 0,
          border: '4px solid black',
          backgroundColor: '#00ff87',
          color: 'black',
          fontSize: '2rem',
          fontWeight: 'bold',
          cursor: 'pointer',
          boxShadow: '6px 6px 0 black',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.1s',
          zIndex: 99,
          fontFamily: '"Arial Black", sans-serif'
        }}
        onMouseDown={(e) => {
          e.currentTarget.style.transform = 'translate(3px, 3px)';
          e.currentTarget.style.boxShadow = '3px 3px 0 black';
        }}
        onMouseUp={(e) => {
          e.currentTarget.style.transform = '';
          e.currentTarget.style.boxShadow = '6px 6px 0 black';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = '';
          e.currentTarget.style.boxShadow = '6px 6px 0 black';
        }}
        title="Open Guide & Tips"
      >
        ?
      </button>

      {/* Modal Panel */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '7rem',
            right: '2rem',
            width: '420px',
            maxHeight: '600px',
            backgroundColor: 'white',
            border: '4px solid black',
            boxShadow: '8px 8px 0 black',
            zIndex: 100,
            display: 'flex',
            flexDirection: 'column',
            fontFamily: '"Arial Black", sans-serif',
            rotate: '0deg'
          }}
        >
          {/* Header */}
          <div
            style={{
              borderBottom: '4px solid black',
              padding: '1.5rem',
              backgroundColor: '#ffff00',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <h3 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 'bold' }}>
              GUIDE & TIPS
            </h3>
            <button
              onClick={() => {
                setIsOpen(false);
                setSelectedGuide(null);
                setSelectedTip(null);
              }}
              style={{
                background: 'black',
                color: 'white',
                border: '2px solid black',
                padding: '0.3rem 0.8rem',
                fontSize: '1.2rem',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              ✕
            </button>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', borderBottom: '3px solid black' }}>
            <button
              onClick={() => {
                setActiveTab('guides');
                setSelectedGuide(null);
                setSelectedTip(null);
              }}
              style={{
                flex: 1,
                padding: '1rem',
                border: 'none',
                borderRight: '3px solid black',
                backgroundColor: activeTab === 'guides' ? '#ffd700' : '#e0e0e0',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '1rem',
                fontFamily: '"Arial Black", sans-serif',
                textTransform: 'uppercase',
                color: 'black',
                textAlign: 'center'
              }}
            >
              📖 Guides
            </button>
            <button
              onClick={() => {
                setActiveTab('tips');
                setSelectedGuide(null);
                setSelectedTip(null);
              }}
              style={{
                flex: 1,
                padding: '1rem',
                border: 'none',
                backgroundColor: activeTab === 'tips' ? '#ffd700' : '#e0e0e0',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '1rem',
                fontFamily: '"Arial Black", sans-serif',
                textTransform: 'uppercase',
                color: 'black',
                textAlign: 'center'
              }}
            >
              💡 Tips
            </button>
          </div>

          {/* Content Area */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '1.5rem',
              backgroundColor: '#f9f9f9'
            }}
          >
            {activeTab === 'guides' ? (
              <>
                {selectedGuide ? (
                  <div>
                    <button
                      onClick={() => setSelectedGuide(null)}
                      style={{
                        backgroundColor: 'white',
                        border: '2px solid black',
                        padding: '0.5rem 1rem',
                        marginBottom: '1rem',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        fontSize: '0.9rem',
                        fontFamily: '"Arial Black", sans-serif'
                      }}
                    >
                      ← Back
                    </button>
                    <h4 style={{ margin: '1rem 0 0.5rem 0', fontSize: '1.1rem' }}>
                      {currentGuide?.title}
                    </h4>
                    <p
                      style={{
                        whiteSpace: 'pre-wrap',
                        fontSize: '0.9rem',
                        lineHeight: 1.6,
                        color: '#333',
                        fontFamily: 'monospace',
                        fontWeight: '500',
                        margin: 0
                      }}
                    >
                      {currentGuide?.content}
                    </p>
                  </div>
                ) : (
                  <div>
                    <p style={{ fontSize: '0.9rem', color: '#666', margin: '0 0 1rem 0' }}>
                      Select a guide to learn more:
                    </p>
                    {GUIDES.map(guide => (
                      <button
                        key={guide.id}
                        onClick={() => setSelectedGuide(guide.id)}
                        style={{
                          width: '100%',
                          padding: '1rem',
                          marginBottom: '0.8rem',
                          backgroundColor: '#ffffff',
                          border: '3px solid black',
                          textAlign: 'left',
                          cursor: 'pointer',
                          fontWeight: 'bold',
                          fontSize: '1rem',
                          fontFamily: '"Arial Black", sans-serif',
                          boxShadow: '3px 3px 0 #ccc',
                          transition: 'all 0.1s'
                        }}
                        onMouseDown={(e) => {
                          e.currentTarget.style.transform = 'translate(2px, 2px)';
                          e.currentTarget.style.boxShadow = '1px 1px 0 #ccc';
                        }}
                        onMouseUp={(e) => {
                          e.currentTarget.style.transform = '';
                          e.currentTarget.style.boxShadow = '3px 3px 0 #ccc';
                        }}
                      >
                        {guide.title}
                      </button>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <>
                {selectedTip ? (
                  <div>
                    <button
                      onClick={() => setSelectedTip(null)}
                      style={{
                        backgroundColor: 'white',
                        border: '2px solid black',
                        padding: '0.5rem 1rem',
                        marginBottom: '1rem',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        fontSize: '0.9rem',
                        fontFamily: '"Arial Black", sans-serif'
                      }}
                    >
                      ← Back
                    </button>
                    <h4 style={{ margin: '1rem 0 0.5rem 0', fontSize: '1.1rem' }}>
                      {currentTip?.title}
                    </h4>
                    <p
                      style={{
                        fontSize: '0.85rem',
                        color: '#666',
                        margin: '0.5rem 0',
                        fontFamily: 'monospace'
                      }}
                    >
                      <strong>Category:</strong> {currentTip?.category}
                    </p>
                    <p
                      style={{
                        fontSize: '0.9rem',
                        lineHeight: 1.6,
                        color: '#333',
                        margin: 0,
                        fontFamily: 'monospace',
                        fontWeight: '500'
                      }}
                    >
                      {currentTip?.description}
                    </p>
                  </div>
                ) : (
                  <div>
                    <p style={{ fontSize: '0.9rem', color: '#666', margin: '0 0 1rem 0' }}>
                      Quick tips for safe transactions:
                    </p>
                    {TIPS.map(tip => (
                      <button
                        key={tip.id}
                        onClick={() => setSelectedTip(tip.id)}
                        style={{
                          width: '100%',
                          padding: '1rem',
                          marginBottom: '0.8rem',
                          backgroundColor: '#ffffff',
                          border: '3px solid black',
                          textAlign: 'left',
                          cursor: 'pointer',
                          fontWeight: 'bold',
                          fontSize: '0.95rem',
                          fontFamily: '"Arial Black", sans-serif',
                          boxShadow: '3px 3px 0 #ccc',
                          transition: 'all 0.1s'
                        }}
                        onMouseDown={(e) => {
                          e.currentTarget.style.transform = 'translate(2px, 2px)';
                          e.currentTarget.style.boxShadow = '1px 1px 0 #ccc';
                        }}
                        onMouseUp={(e) => {
                          e.currentTarget.style.transform = '';
                          e.currentTarget.style.boxShadow = '3px 3px 0 #ccc';
                        }}
                      >
                        <div>{tip.title}</div>
                        <div style={{ fontSize: '0.8rem', color: '#999', marginTop: '0.3rem' }}>
                          {tip.category}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

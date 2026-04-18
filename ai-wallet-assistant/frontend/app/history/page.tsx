"use client";

import HistoryTable from '@/components/HistoryTable';
import { getAllAnalyses, clearHistory, type Analysis } from '@/lib/history';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function HistoryPage() {
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = getAllAnalyses();
    setAnalyses(data);
    setLoading(false);
  }, []);

  const handleClear = () => {
    if (confirm('Clear all history? This cannot be undone.')) {
      clearHistory();
      setAnalyses([]);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="border-8 border-black bg-white shadow-[20px_20px_0_black] p-12 rotate-2">
          <div className="animate-pulse bg-gray-200 h-12 w-48 mb-4"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

    <main style={{ minHeight: '100vh', padding: '2.5rem 1.5rem', backgroundColor: '#f9fafb' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>

        {/* Header - More Compact */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', borderBottom: '4px solid black', paddingBottom: '1rem' }}>
          <div>
            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: '900',
              textTransform: 'uppercase',
              color: 'black',
              fontFamily: 'var(--font-bold)',
              lineHeight: '1',
              marginBottom: '0.25rem'
            }}>
              ANALYSIS <span style={{ backgroundColor: 'var(--warning)', padding: '0.25rem 0.5rem', border: '2px solid black' }}>HISTORY</span>
            </h1>

            <p style={{ fontSize: '1rem', color: '#000', fontWeight: 'bold', fontFamily: 'monospace', marginTop: '0.5rem' }}>
              > Your crypto security track record
            </p>
          </div>
          
          <button
            onClick={handleClear}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: 'white',
              color: 'black',
              border: '4px solid black',
              fontSize: '0.75rem',
              fontWeight: '900',
              fontFamily: '"Arial Black", sans-serif',
              cursor: 'pointer',
              boxShadow: '4px 4px 0 black',
              textTransform: 'uppercase'
            }}
          >
            Clear History
          </button>
        </div>

        {/* Empty State */}
        {analyses.length === 0 ? (
          <div style={{
            border: '4px solid black',
            backgroundColor: 'white',
            boxShadow: '8px 8px 0 black',
            padding: '4rem 2rem',
            textAlign: 'center',
            maxWidth: '600px',
            margin: '4rem auto'
          }}>
            <h2 style={{ fontSize: '2rem', fontWeight: '900', color: 'black', marginBottom: '1rem', fontFamily: '"Arial Black", sans-serif' }}>
              EMPTY HISTORY
            </h2>
            <Link href="/" style={{
              display: 'inline-block',
              padding: '1rem 2rem',
              backgroundColor: '#00e676',
              color: 'black',
              textDecoration: 'none',
              fontWeight: '900',
              border: '4px solid black',
              boxShadow: '4px 4px 0 black',
              fontFamily: '"Arial Black", sans-serif',
              textTransform: 'uppercase'
            }}>
              START ANALYSIS →
>>>>>>> Stashed changes
            </Link>

=======
  return (
    <main style={{ minHeight: '100vh', padding: '2.5rem 1.5rem', backgroundColor: '#f9fafb' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>

        {/* Header */}
        <div className="text-center mb-12 border-4 border-black bg-white p-8 shadow-[12px_12px_0_black] rotate-[-0.5deg]">
          <h1 className="text-5xl md:text-6xl font-black uppercase tracking-wider mb-6 bg-black text-white p-4 inline-block shadow-[4px_4px_0_white]">
            ANALYSIS <span className="bg-yellow-400 text-black border-2 border-black p-2 ml-2">HISTORY</span>
          </h1>
          <p className="text-xl font-mono text-black font-bold">
            > Your crypto security track record
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            <button
              onClick={handleClear}
              className="brutalist-btn bg-red-500 text-white px-8 py-4 text-xl"
            >
              Clear History
            </button>
            <Link href="/" className="brutalist-btn bg-green-400 text-black px-8 py-4 text-xl">
              ← Back
            </Link>
          </div>
        </div>

        {/* Stats & Safety */}
        {analyses.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="brutalist-card p-8">
                <div className="text-xs font-mono uppercase tracking-wider text-gray-600 mb-2">Total</div>
                <div className="text-4xl font-black">{analyses.length}</div>
              </div>
              <div className="brutalist-card p-8 bg-red-500 text-white">
                <div className="text-xs font-mono uppercase tracking-wider mb-2">High Risk</div>
                <div className="text-4xl font-black">0</div>
              </div>
              <div className="brutalist-card p-8 bg-green-400 col-span-2">
                <div className="flex justify-between items-center">
                  <div className="text-xs font-mono uppercase tracking-wider">Safe Rate</div>
                  <div className="text-3xl font-black">100%</div>
                </div>
              </div>
            </div>

            {/* Safety Overview */}
            <div className="brutalist-card p-8">
              <div className="text-sm font-mono uppercase mb-6 border-b-2 border-black pb-2 font-black">Safety Overview</div>
              <div className="grid grid-cols-3 gap-4">
                <div className="brutalist-card p-4 text-center text-sm font-black bg-green-400">
                  <div className="text-xs font-mono uppercase">Week</div>
                  <div>✅ SAFE</div>
                </div>
                <div className="brutalist-card p-4 text-center text-sm font-black bg-yellow-400">
                  <div className="text-xs font-mono uppercase">Month</div>
                  <div>⚠️ RISK</div>
                </div>
                <div className="brutalist-card p-4 text-center text-sm font-black bg-green-400">
                  <div className="text-xs font-mono uppercase">Year</div>
                  <div>✅ SAFE</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* HistoryTable */}
        <div className="bg-white border-4 border-black shadow-[16px_16px_0_black] p-8">
          <HistoryTable analyses={analyses} />
        </div>

        {/* Empty State */}
        {analyses.length === 0 && (
          <div className="brutalist-card max-w-2xl mx-auto mt-24 p-16 text-center rotate-1">
            <h2 className="text-4xl font-black mb-8">No Transactions Yet</h2>
            <Link href="/" className="brutalist-btn bg-green-400 text-black px-12 py-6 text-xl">
              Start Analysis →
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}

=======
    <main style={{ minHeight: '100vh', padding: '2.5rem 1.5rem', backgroundColor: '#f9fafb' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>

        {/* Header - More Compact */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', borderBottom: '4px solid black', paddingBottom: '1rem' }}>
          <div>
            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: '900',
              textTransform: 'uppercase',
              color: 'black',
              fontFamily: 'var(--font-bold)',
              lineHeight: '1',
              marginBottom: '0.25rem'
            }}>
              ANALYSIS <span style={{ backgroundColor: 'var(--warning)', padding: '0.25rem 0.5rem', border: '2px solid black' }}>HISTORY</span>
            </h1>

            <p style={{ fontSize: '1rem', color: '#000', fontWeight: 'bold', fontFamily: 'monospace', marginTop: '0.5rem' }}>
              &gt; Your crypto security track record
            </p>
          </div>
          
          <button
            onClick={handleClear}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: 'white',
              color: 'black',
              border: '4px solid black',
              fontSize: '0.75rem',
              fontWeight: '900',
              fontFamily: '"Arial Black", sans-serif',
              cursor: 'pointer',
              boxShadow: '4px 4px 0 black',
              textTransform: 'uppercase'
            }}
          >
            Clear History
          </button>
        </div>

        {/* Empty State */}
        {analyses.length === 0 ? (
          <div style={{
            border: '4px solid black',
            backgroundColor: 'white',
            boxShadow: '8px 8px 0 black',
            padding: '4rem 2rem',
            textAlign: 'center',
            maxWidth: '600px',
            margin: '4rem auto'
          }}>
            <h2 style={{ fontSize: '2rem', fontWeight: '900', color: 'black', marginBottom: '1rem', fontFamily: '"Arial Black", sans-serif' }}>
              EMPTY HISTORY
            </h2>
            <Link href="/" style={{
              display: 'inline-block',
              padding: '1rem 2rem',
              backgroundColor: '#00e676',
              color: 'black',
              textDecoration: 'none',
              fontWeight: '900',
              border: '4px solid black',
              boxShadow: '4px 4px 0 black',
              fontFamily: '"Arial Black", sans-serif',
              textTransform: 'uppercase'
            }}>
              START ANALYSIS →
>>>>>>> Stashed changes
            </Link>
          </div>
        </div>
        
        <div className="bg-white border-4 border-black shadow-[16px_16px_0_black]">
          <HistoryTable analyses={analyses} />
        </div>
      </div>
    </main>
  );
}


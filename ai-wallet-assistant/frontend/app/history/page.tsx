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

  return (
<<<<<<< Updated upstream
    <main className="min-h-screen py-8 px-4 md:px-8 lg:px-16 bg-[#f5f5f5] font-black">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8 border-4 border-black bg-white p-6 shadow-[12px_12px_0_black] rotate-[-0.5deg]">
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-wider mb-4 bg-black text-white p-2 inline-block">
            ANALYSIS HISTORY
          </h1>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-4">
            <button
              onClick={handleClear}
              className="px-6 py-3 bg-red-500 text-white border-4 border-black font-black text-lg uppercase tracking-wider shadow-[6px_6px_0_black] hover:shadow-[3px_3px_0_black] hover:translate-x-[3px] hover:translate-y-[3px] transition-all duration-100 active:translate-x-[6px] active:translate-y-[6px] active:shadow-none"
            >
              PURGE DATA
            </button>
            <Link
              href="/"
              className="px-6 py-3 bg-[#ffd700] text-black border-4 border-black font-black text-lg uppercase tracking-wider shadow-[6px_6px_0_black] hover:shadow-[3px_3px_0_black] hover:translate-x-[3px] hover:translate-y-[3px] transition-all duration-100"
            >
              ← BACK
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


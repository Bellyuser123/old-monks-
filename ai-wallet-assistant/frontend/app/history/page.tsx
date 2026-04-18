"use client";

import HistoryTable from '@/components/HistoryTable';
import { getAllAnalyses, clearHistory, type Analysis } from '@/lib/history';
import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';

export default function HistoryPage() {
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = getAllAnalyses();
    setAnalyses(data);
    setLoading(false);
  }, []);

  // Stats calculation (simple for demo)
  const stats = useMemo(() => ({
    total: analyses.length,
    highRisk: analyses.filter(a => a.result.status === 'Critical').length,
    safePercent: analyses.length > 0 ? Math.round((analyses.filter(a => a.result.status === 'Safe').length / analyses.length) * 100) : 0
  }), [analyses]);

  const handleClear = () => {
    if (confirm('Clear all history? This cannot be undone.')) {
      clearHistory();
      setAnalyses([]);
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', backgroundColor: 'var(--bg-primary)' }}>
        <div className="brutalist-card" style={{
          borderWidth: '8px',
          padding: '4rem 3rem',
          boxShadow: '24px 24px 0 black',
          transform: 'rotate(2deg)',
          textAlign: 'center',
          maxWidth: '400px'
        }}>
          <div className="animate-pulse" style={{ backgroundColor: '#f3f4f6', height: '3.5rem', width: '14rem', margin: '0 auto 2rem', borderRadius: '8px' }}></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
            <div className="animate-pulse" style={{ backgroundColor: '#f3f4f6', height: '1.25rem', width: '80%', borderRadius: '4px' }}></div>
            <div className="animate-pulse" style={{ backgroundColor: '#f3f4f6', height: '1.25rem', width: '60%', borderRadius: '4px' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main style={{ minHeight: '100vh', padding: '2.5rem 1.5rem', backgroundColor: 'var(--bg-primary)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Header */}
        <div className="brutalist-card text-center mb-12 p-12 shadow-[16px_16px_0_black] rotate-[-1deg]">
          <h1 style={{
            fontSize: '4rem',
            fontWeight: '900',
            textTransform: 'uppercase',
            color: 'black',
            fontFamily: 'var(--font-bold)',
            lineHeight: '1',
            marginBottom: '1rem'
          }}>
            ANALYSIS <span style={{ backgroundColor: 'var(--warning)', padding: '0.5rem 1rem', border: '4px solid black', boxShadow: '4px 4px 0 black' }}>HISTORY</span>
          </h1>
          <p style={{ fontSize: '1.25rem', color: '#333', fontFamily: 'var(--font-mono)', fontWeight: 'bold', marginBottom: '2rem' }}>
            > Your crypto security track record
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center', '@media (min-width: 640px)': { flexDirection: 'row' } }}>
            <button
              onClick={handleClear}
              className="brutalist-btn"
              style={{ backgroundColor: 'var(--danger)', color: 'white', padding: '1rem 2rem', fontSize: '1.125rem' }}
            >
              Clear History
            </button>
            <Link href="/" className="brutalist-btn" style={{ backgroundColor: 'var(--success)', color: 'black', padding: '1rem 2rem', fontSize: '1.125rem' }}>
              ← Back Home
            </Link>
          </div>
        </div>

        {/* Dashboard Stats & Safety */}
        {analyses.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '3rem', '@media (max-width: 1024px)': { gridTemplateColumns: '1fr' } }}>
            {/* Stats Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div className="brutalist-card" style={{ padding: '2rem' }}>
                <div style={{ fontSize: '0.875rem', fontWeight: '900', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', color: '#666', marginBottom: '1rem' }}>Total Analyses</div>
                <div style={{ fontSize: '3.5rem', fontWeight: '900', fontFamily: 'var(--font-bold)' }}>{stats.total}</div>
              </div>
              <div className="brutalist-card" style={{ backgroundColor: 'var(--danger)', color: 'white', padding: '2rem' }}>
                <div style={{ fontSize: '0.875rem', fontWeight: '900', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', marginBottom: '1rem' }}>High Risk</div>
                <div style={{ fontSize: '3.5rem', fontWeight: '900', fontFamily: 'var(--font-bold)' }}>{stats.highRisk}</div>
              </div>
              <div className="brutalist-card" style={{ backgroundColor: 'var(--success)', padding: '2rem', gridColumn: '1 / -1' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: '0.875rem', fontWeight: '900', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>Safe Rate</div>
                  <div style={{ fontSize: '3rem', fontWeight: '900', fontFamily: 'var(--font-bold)' }}>{stats.safePercent}%</div>
                </div>
              </div>
            </div>

            {/* Safety Overview */}
            <div className="brutalist-card" style={{ padding: '2.5rem' }}>
              <div style={{ fontSize: '1rem', fontWeight: '900', fontFamily: 'var(--font-mono)', marginBottom: '1.5rem', borderBottom: '4px solid black', paddingBottom: '1rem', textTransform: 'uppercase' }}>
                Safety Overview
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                <div className="brutalist-card" style={{ padding: '1.5rem 1rem', textAlign: 'center', backgroundColor: 'var(--success)', fontWeight: '900', fontSize: '1rem' }}>
                  <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Week</div>
                  <div>✅ SAFE</div>
                </div>
                <div className="brutalist-card" style={{ padding: '1.5rem 1rem', textAlign: 'center', backgroundColor: 'var(--warning)', fontWeight: '900', fontSize: '1rem' }}>
                  <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Month</div>
                  <div>⚠️ CAUTION</div>
                </div>
                <div className="brutalist-card" style={{ padding: '1.5rem 1rem', textAlign: 'center', backgroundColor: 'var(--success)', fontWeight: '900', fontSize: '1rem' }}>
                  <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Year</div>
                  <div>✅ SAFE</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* History Container */}
        <div className="brutalist-card" style={{ padding: '3rem', boxShadow: '12px 12px 0 black' }}>
          <HistoryTable analyses={analyses} />
        </div>

        {/* Empty State */}
        {analyses.length === 0 && (
          <div className="brutalist-card max-w-3xl mx-auto mt-20 p-12 text-center" style={{ transform: 'rotate(1deg)' }}>
            <h2 style={{ fontSize: '3rem', fontWeight: '900', color: 'black', marginBottom: '2rem', fontFamily: 'var(--font-bold)' }}>
              No Transactions Analyzed Yet
            </h2>
            <Link href="/" className="brutalist-btn inline-block" style={{ backgroundColor: 'var(--success)', padding: '1.5rem 3rem', fontSize: '1.25rem' }}>
              Start Your First Analysis →
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}


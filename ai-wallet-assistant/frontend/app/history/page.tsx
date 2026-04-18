"use client";

import HistoryTable from '@/components/HistoryTable';
import { getAllAnalyses, clearHistory, type Analysis, type Status } from '@/lib/history';
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

  // Calculate stats
  const stats = useMemo(() => {
    const total = analyses.length;
    const safe = analyses.filter(a => a.result.status === 'Safe').length;
    const warning = analyses.filter(a => a.result.status === 'Warning').length;
    const critical = analyses.filter(a => a.result.status === 'Critical').length;
    const safePercent = total > 0 ? Math.round((safe / total) * 100) : 0;
    return { total, safe, warning, critical, safePercent };
  }, [analyses]);

  // Safety overview calculation
  const safetyOverview = useMemo(() => {
    const now = Date.now();
    const dayMs = 24 * 60 * 60 * 1000;
    const weekAgo = now - 7 * dayMs;
    const monthAgo = now - 30 * dayMs;
    const yearAgo = now - 365 * dayMs;

    const getStatusForPeriod = (cutoff: number) => {
      const periodAnalyses = analyses.filter(a => a.timestamp >= cutoff);
      if (periodAnalyses.length === 0) return 'N/A';
      const criticalCount = periodAnalyses.filter(a => a.result.status === 'Critical').length;
      if (criticalCount > 0) return 'CAUTION';
      return 'SAFE';
    };

    return {
      week: getStatusForPeriod(weekAgo),
      month: getStatusForPeriod(monthAgo),
      year: getStatusForPeriod(yearAgo),
    };
  }, [analyses]);

  const handleClear = () => {
    if (confirm('Clear all history? This cannot be undone.')) {
      clearHistory();
      setAnalyses([]);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8" style={{ backgroundColor: '#f9fafb' }}>
        <div style={{
          border: '8px solid black',
          backgroundColor: 'white',
          boxShadow: '20px 20px 0 black',
          padding: '3rem',
          transform: 'rotate(2deg)'
        }}>
          <div className="animate-pulse" style={{ backgroundColor: '#e5e7eb', height: '3rem', width: '12rem', marginBottom: '1rem' }}></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="animate-pulse" style={{ backgroundColor: '#e5e7eb', height: '1rem', width: '75%', borderRadius: '4px' }}></div>
            <div className="animate-pulse" style={{ backgroundColor: '#e5e7eb', height: '1rem', width: '50%', borderRadius: '4px' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main style={{ minHeight: '100vh', padding: '2rem 1.5rem', backgroundColor: '#f9fafb' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{
            fontSize: '4rem',
            fontWeight: '900',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: 'black',
            marginBottom: '0.5rem',
            fontFamily: '"Arial Black", sans-serif'
          }}>
            ANALYSIS HISTORY
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#4b5563', fontFamily: 'monospace' }}>
            Your transaction security record
          </p>
        </div>

        {/* Empty State */}
        {analyses.length === 0 ? (
          <div style={{
            border: '4px solid black',
            backgroundColor: 'white',
            boxShadow: '6px 6px 0 black',
            padding: '4rem 2rem',
            textAlign: 'center',
            maxWidth: '500px',
            margin: '0 auto'
          }}>
            <div style={{
              fontSize: '4rem',
              marginBottom: '1rem'
            }}>
              📭
            </div>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: '900',
              color: 'black',
              marginBottom: '0.5rem',
              fontFamily: '"Arial Black", sans-serif'
            }}>
              NO TRANSACTIONS YET
            </h2>
            <p style={{ color: '#6b7280', marginBottom: '1.5rem', fontFamily: 'monospace' }}>
              Start analyzing transactions to see history here.
            </p>
            <Link href="/" style={{
              display: 'inline-block',
              padding: '1rem 2rem',
              backgroundColor: 'black',
              color: 'white',
              textDecoration: 'none',
              fontWeight: 'bold',
              border: '4px solid black',
              boxShadow: '4px 4px 0 black',
              fontFamily: '"Arial Black", sans-serif',
              textTransform: 'uppercase',
              transition: 'all 0.1s'
            }}>
              ANALYZE NOW →
            </Link>
          </div>
        ) : (
          <>
            {/* Stats Panel */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1rem',
              marginBottom: '1.5rem'
            }}>
              <div style={{
                border: '4px solid black',
                backgroundColor: 'white',
                boxShadow: '6px 6px 0 black',
                padding: '1.5rem',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '3rem', fontWeight: '900', color: 'black', fontFamily: '"Arial Black", sans-serif' }}>
                  {stats.total}
                </div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Total Transactions
                </div>
              </div>
              <div style={{
                border: '4px solid black',
                backgroundColor: 'white',
                boxShadow: '6px 6px 0 black',
                padding: '1.5rem',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '3rem', fontWeight: '900', color: '#ff3b3b', fontFamily: '"Arial Black", sans-serif' }}>
                  {stats.critical}
                </div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  High Risk
                </div>
              </div>
              <div style={{
                border: '4px solid black',
                backgroundColor: 'white',
                boxShadow: '6px 6px 0 black',
                padding: '1.5rem',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '3rem', fontWeight: '900', color: '#00e676', fontFamily: '"Arial Black", sans-serif' }}>
                  {stats.safePercent}%
                </div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Safe Rate
                </div>
              </div>
            </div>

            {/* Safety Overview */}
            <div style={{
              border: '4px solid black',
              backgroundColor: 'white',
              boxShadow: '6px 6px 0 black',
              padding: '1.5rem',
              marginBottom: '1.5rem'
            }}>
              <h2 style={{
                fontSize: '1.25rem',
                fontWeight: '900',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '1rem',
                fontFamily: '"Arial Black", sans-serif',
                borderBottom: '4px solid black',
                paddingBottom: '0.75rem'
              }}>
                🛡️ SAFETY OVERVIEW
              </h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1rem',
                textAlign: 'center'
              }}>
                {[
                  { label: 'Week', status: safetyOverview.week },
                  { label: 'Month', status: safetyOverview.month },
                  { label: 'Year', status: safetyOverview.year }
                ].map(({ label, status }) => (
                  <div key={label}>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280', fontFamily: 'monospace', textTransform: 'uppercase' }}>
                      {label}
                    </div>
                    <div style={{
                      fontSize: '1.25rem',
                      fontWeight: '900',
                      fontFamily: '"Arial Black", sans-serif',
                      color: status === 'SAFE' ? '#00e676' : status === 'CAUTION' ? '#ffd600' : '#9ca3af'
                    }}>
                      {status === 'SAFE' && '✅ SAFE'}
                      {status === 'CAUTION' && '⚠️ CAUTION'}
                      {status === 'N/A' && '— N/A'}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* History Table */}
            <div style={{
              border: '4px solid black',
              backgroundColor: 'white',
              boxShadow: '6px 6px 0 black'
            }}>
              <HistoryTable analyses={analyses} />
            </div>

            {/* Clear Button */}
            <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
              <button
                onClick={handleClear}
                style={{
                  padding: '1rem 2rem',
                  backgroundColor: '#ff3b3b',
                  color: 'white',
                  border: '4px solid black',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  fontFamily: '"Arial Black", sans-serif',
                  cursor: 'pointer',
                  boxShadow: '6px 6px 0 black',
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
                Clear All History
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}


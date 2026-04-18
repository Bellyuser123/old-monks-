"use client";

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Analysis } from '@/lib/history';

interface HistoryTableProps {
  analyses: Analysis[];
}

export default function HistoryTable({ analyses }: HistoryTableProps) {
  const router = useRouter();
  const [search, setSearch] = useState('');

  const filteredAnalyses = useMemo(() => {
    if (!search) return analyses;
    const q = search.toLowerCase();
    return analyses.filter(a =>
      a.inputText.toLowerCase().includes(q) ||
      a.result.summary.toLowerCase().includes(q)
    );
  }, [analyses, search]);

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const truncate = (text: string, max: number) =>
    text.length > max ? text.slice(0, max) + '...' : text;

  // Get risk badge styles
  const getRiskStyle = (status: string) => {
    const styles: Record<string, React.CSSProperties> = {
      Safe: {
        backgroundColor: '#00e676',
        color: 'black',
      },
      Warning: {
        backgroundColor: '#ffd600',
        color: 'black',
      },
      Critical: {
        backgroundColor: '#ff3b3b',
        color: 'white',
      },
    };
    return styles[status] || { backgroundColor: 'gray', color: 'white' };
  };

  if (filteredAnalyses.length === 0) {
    return (
      <div style={{ padding: '3rem', textAlign: 'center' }}>
        <div style={{
          fontSize: '3rem',
          marginBottom: '1rem'
        }}>
          🔍
        </div>
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: '900',
          color: 'black',
          marginBottom: '0.5rem',
          fontFamily: '"Arial Black", sans-serif'
        }}>
          NO MATCHES FOUND
        </h2>
        <p style={{ color: '#6b7280', fontFamily: 'monospace' }}>
          Try a different search term
        </p>
      </div>
    );
  }

  return (
    <div style={{ width: '100%' }}>
      {/* Search Bar */}
      <div style={{
        padding: '1.5rem',
        borderBottom: '4px solid black',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', gap: '1rem', width: '100%', maxWidth: '600px' }}>
          <input
            type="text"
            placeholder="Search transactions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              flex: 1,
              padding: '1rem 1.25rem',
              border: '4px solid black',
              backgroundColor: '#f9fafb',
              fontFamily: 'monospace',
              fontSize: '1rem',
              boxShadow: '6px 6px 0 black',
              outline: 'none'
            }}
          />
        </div>
        <span style={{ fontSize: '0.875rem', fontFamily: 'monospace', color: '#6b7280' }}>
          Showing {filteredAnalyses.length} of {analyses.length} transactions
        </span>
      </div>

      {/* Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
        gap: '1rem',
        padding: '1.5rem',
        maxHeight: '60vh',
        overflowY: 'auto'
      }}>
        {filteredAnalyses.map((analysis) => (
          <div
            key={analysis.id}
            onClick={() => router.push(`/history/${analysis.id}`)}
            style={{
              border: '4px solid black',
              backgroundColor: 'white',
              boxShadow: '6px 6px 0 black',
              padding: '1.25rem',
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '8px 8px 0 black';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '6px 6px 0 black';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = 'translate(4px, 4px)';
              e.currentTarget.style.boxShadow = '2px 2px 0 black';
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '8px 8px 0 black';
            }}
          >
            {/* Risk Badge */}
            <div style={{
              display: 'inline-block',
              padding: '0.5rem 1rem',
              border: '3px solid black',
              fontWeight: '900',
              fontSize: '0.875rem',
              textTransform: 'uppercase',
              fontFamily: '"Arial Black", sans-serif',
              marginBottom: '1rem',
              boxShadow: '4px 4px 0 black',
              ...getRiskStyle(analysis.result.status)
            }}>
              {analysis.result.status}
            </div>

            {/* Summary */}
            <h3 style={{
              fontSize: '1.125rem',
              fontWeight: '700',
              color: 'black',
              marginBottom: '0.75rem',
              lineHeight: 1.3,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}>
              {analysis.result.summary}
            </h3>

            {/* Input Text Preview */}
            <p style={{
              fontSize: '0.875rem',
              color: '#4b5563',
              fontFamily: 'monospace',
              marginBottom: '1rem',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              lineHeight: 1.4
            }}>
              {truncate(analysis.inputText, 100)}
            </p>

            {/* Date */}
            <div style={{
              fontSize: '0.75rem',
              color: '#9ca3af',
              fontFamily: 'monospace',
              borderTop: '2px solid #e5e7eb',
              paddingTop: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              📅 {formatDate(analysis.timestamp)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


"use client";

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Analysis } from '@/lib/history';
import StatusBadge from './StatusBadge';

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
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const truncate = (text: string, max: number) => 
    text.length > max ? text.slice(0, max) + '...' : text;

<<<<<<< Updated upstream
=======
  // Get risk badge styles
  const getRiskStyle = (status: string) => {
    const styles: Record<string, React.CSSProperties> = {
      Safe: {
        backgroundColor: 'var(--success)',
        color: 'black',
      },
      Warning: {
        backgroundColor: 'var(--warning)',
        color: 'black',
      },
      Critical: {
        backgroundColor: 'var(--danger)',
        color: 'white',
      },
    };
    return styles[status] || { backgroundColor: 'gray', color: 'white' };
  };


>>>>>>> Stashed changes
  if (filteredAnalyses.length === 0) {
    return (
      <div className="border-8 border-black bg-white shadow-[20px_20px_0_black] rotate-1 p-12 text-center">
        <h2 className="text-4xl font-black uppercase tracking-widest mb-4 text-black">NO ANALYSES</h2>
        <p className="text-xl font-mono text-gray-600">Start analyzing transactions to see history here.</p>
      </div>
    );
  }

  return (
<<<<<<< Updated upstream
    <div className="w-full">
      <div className="mb-8 flex flex-col sm:flex-row gap-4 items-center px-4 pt-6">
        <div className="relative flex-1 w-full group">
          <input
=======
    <div style={{ width: '100%' }}>
      {/* Search Bar */}
      <div style={{
        padding: '2rem 0',
        marginBottom: '2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        <div style={{ position: 'relative', width: '100%', maxWidth: '100%' }}>
            <input
>>>>>>> Stashed changes
            type="text"
            placeholder="FILTER BY DATA OR RESULT..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
<<<<<<< Updated upstream
            className="w-full px-6 py-4 border-4 border-black bg-white font-black text-lg uppercase tracking-wider shadow-[8px_8px_0_#ffd700] focus:outline-none focus:shadow-[4px_4px_0_#ffd700] focus:translate-x-[4px] focus:translate-y-[4px] transition-all placeholder-gray-400"
          />
          <div className="absolute top-0 right-0 h-full flex items-center pr-6 pointer-events-none">
            <span className="text-lg font-black text-black">🔍</span>
=======
            className="brutalist-card"
            style={{
              width: '100%',
              padding: '1.5rem 2rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '1.125rem',
              fontWeight: '600',
              outline: 'none'
            }}
          />

          <div style={{
            position: 'absolute',
            right: '1.5rem',
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: '1.25rem',
            pointerEvents: 'none'
          }}>
            🔍
>>>>>>> Stashed changes
          </div>
        </div>
        <div className="bg-black text-white px-4 py-2 border-2 border-black font-black uppercase text-xs shadow-[4px_4px_0_#ffd700] rotate-1">
          {filteredAnalyses.length} / {analyses.length} LOGS
        </div>
      </div>

<<<<<<< Updated upstream
      <div className="overflow-x-auto pb-8">
        <table className="w-full border-4 border-black bg-white shadow-[12px_12px_0_black] border-collapse">
          <thead>
            <tr className="bg-black text-white border-b-4 border-black text-sm">
              <th className="p-4 text-left font-black uppercase tracking-widest border-r-4 border-black">DATE_STAMP</th>
              <th className="p-4 text-left font-black uppercase tracking-widest border-r-4 border-black">INPUT_PAYLOAD</th>
              <th className="p-4 text-center font-black uppercase tracking-widest">RISK_HEX</th>
            </tr>
          </thead>
          <tbody>
            {filteredAnalyses.map((analysis) => (
              <tr 
                key={analysis.id}
                className="group hover:bg-[#fff9c4] border-b-4 border-black cursor-pointer transition-all active:bg-[#fff176]"
                onClick={() => router.push(`/history/${analysis.id}`)}
              >
                <td className="p-4 font-black font-mono text-sm border-r-4 border-black group-hover:bg-black group-hover:text-white transition-colors">
                  {formatDate(analysis.timestamp)}
                </td>
                <td className="p-4 font-black font-mono text-sm border-r-4 border-black">
                  {truncate(analysis.inputText, 60)}
                </td>
                <td className="p-4 text-center group-hover:scale-105 transition-transform">
                  <StatusBadge status={analysis.result.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
=======
      {/* Cards List */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        {filteredAnalyses.map((analysis) => (
          <div
            key={analysis.id}
            onClick={() => router.push(`/history/${analysis.id}`)}
            style={{
              border: '4px solid black',
              backgroundColor: 'white',
              boxShadow: '8px 8px 0 black',
              padding: '1.5rem',
              cursor: 'pointer',
              transition: 'all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '12px 12px 0 black';
              e.currentTarget.style.transform = 'translate(-2px, -2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '8px 8px 0 black';
              e.currentTarget.style.transform = 'translate(0, 0)';
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = 'translate(4px, 4px)';
              e.currentTarget.style.boxShadow = '2px 2px 0 black';
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = 'translate(-2px, -2px)';
              e.currentTarget.style.boxShadow = '12px 12px 0 black';
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div className="risk-badge" style={{
                padding: '0.5rem 1.25rem',
                fontSize: '0.875rem',
                ...getRiskStyle(analysis.result.status)
              }}>
                {analysis.result.status === 'Safe' ? 'LOW' : analysis.result.status === 'Warning' ? 'MEDIUM' : 'HIGH'}
              </div>

              <div style={{
                fontSize: '0.875rem',
                color: 'black',
                fontWeight: 'bold',
                fontFamily: 'monospace'
              }}>
                ID: {analysis.id.slice(0, 8)}...
              </div>
            </div>

            <div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '900',
                color: 'black',
                marginBottom: '0.5rem',
                fontFamily: '"Arial Black", sans-serif',
                lineHeight: '1.2'
              }}>
                {analysis.result.summary}
              </h3>
              <p style={{
                fontSize: '1rem',
                color: '#000',
                fontFamily: 'monospace',
                lineHeight: '1.5',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}>
                {analysis.inputText}
              </p>
            </div>

            <div style={{
              marginTop: 'auto',
              paddingTop: '1rem',
              borderTop: '4px solid black',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div style={{
                fontSize: '0.875rem',
                color: 'black',
                fontWeight: 'bold',
                fontFamily: 'monospace'
              }}>
                DATE: {formatDate(analysis.timestamp)}
              </div>
              <div style={{
                fontSize: '0.875rem',
                fontWeight: '900',
                fontFamily: 'monospace',
                textDecoration: 'underline'
              }}>
                VIEW FULL ANALYSIS →
              </div>
            </div>
          </div>
        ))}
>>>>>>> Stashed changes
      </div>
    </div>
  );
}


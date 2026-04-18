"use client";

import { Analysis, Status } from '@/lib/history';
import StatusBadge from './StatusBadge';
import { useRouter } from 'next/navigation';

interface HistoryCardProps {
  analysis: Analysis;
}

const getBgColor = (status: Status) => {
  switch (status) {
    case 'Safe': return '#10b981';
    case 'Warning': return '#f59e0b';
    case 'Critical': return '#ef4444';
    default: return '#6b7280';
  }
};

export default function HistoryCard({ analysis }: HistoryCardProps) {
  const router = useRouter();
  const formatDate = (timestamp: number) => new Date(timestamp).toLocaleDateString();
  const truncate = (text: string) => text.length > 100 ? text.slice(0, 100) + '...' : text;

  const handleClick = () => {
    router.push(`/history/${analysis.id}`);
  };

  return (
    <div
      style={{
        cursor: 'pointer',
        padding: '24px',
        backgroundColor: 'white',
        border: '1px solid #eee',
        borderRadius: '12px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
        marginBottom: '24px',
        transition: 'all 0.2s',
        maxWidth: '400px'
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)';
        e.currentTarget.style.transform = 'translateY(-4px)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
      onClick={handleClick}
    >
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '24px',
        gap: '16px'
      }}>
        <StatusBadge status={analysis.result.status} />
        <div style={{
          textAlign: 'right'
        }}>
          <div style={{
            fontSize: '24px',
            fontWeight: '700',
            color: '#111'
          }}>
            {formatDate(analysis.timestamp)}
          </div>
          <div style={{
            fontSize: '14px',
            color: '#999',
            textTransform: 'uppercase',
            fontWeight: '500',
            letterSpacing: '0.5px'
          }}>
            analyzed
          </div>
        </div>
      </div>
      
      <div style={{
        marginBottom: '20px'
      }}>
        <h3 style={{
          fontSize: '20px',
          fontWeight: '700',
          color: '#111',
          marginBottom: '12px',
          lineHeight: 1.3
        }}>
          {truncate(analysis.inputText)}
        </h3>
      </div>

      <div style={{
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        fontSize: '16px',
        fontFamily: 'monospace',
        lineHeight: 1.5,
        backgroundColor: '#f8f9fa',
        color: getBgColor(analysis.result.status)
      }}>
        {analysis.result.summary}
      </div>
    </div>
  );

}


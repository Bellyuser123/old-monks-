"use client";

import { getAllAnalyses } from '@/lib/history';
import { useEffect, useState } from 'react';

interface Stats {
  total: number;
  highRisk: number;
  safePercent: number;
}

export default function StatsPanel() {
  const [stats, setStats] = useState<Stats>({ total: 0, highRisk: 0, safePercent: 100 });

  useEffect(() => {
    const analyses = getAllAnalyses();
    const total = analyses.length;
    const highRiskCount = analyses.filter(a => a.result.status === 'Critical').length;
    const safePercent = total > 0 ? Math.round(((total - highRiskCount - analyses.filter(a => a.result.status === 'Warning').length) / total) * 100) : 100;

    setStats({ total, highRisk: highRiskCount, safePercent });
  }, []);

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '32px',
      marginBottom: '64px',
      maxWidth: '900px',
      margin: '0 auto'
    }}>
      <div style={{
        padding: '32px',
        backgroundColor: 'white',
        border: '1px solid #eee',
        borderRadius: '12px',
        textAlign: 'center',
        boxShadow: '0 4px 16px rgba(0,0,0,0.08)'
      }}>
        <div style={{
          fontSize: '48px',
          fontWeight: '900',
          color: '#111',
          marginBottom: '12px'
        }}>
          {stats.total}
        </div>
        <div style={{
          fontSize: '18px',
          color: '#666',
          fontWeight: '600',
          textTransform: 'uppercase',
          letterSpacing: '1px'
        }}>
          Total Analyses
        </div>
      </div>
      <div style={{
        padding: '32px',
        backgroundColor: 'white',
        border: '1px solid #eee',
        borderRadius: '12px',
        textAlign: 'center',
        boxShadow: '0 4px 16px rgba(0,0,0,0.08)'
      }}>
        <div style={{
          fontSize: '48px',
          fontWeight: '900',
          color: '#ef4444',
          marginBottom: '12px'
        }}>
          {stats.highRisk}
        </div>
        <div style={{
          fontSize: '18px',
          color: '#666',
          fontWeight: '600',
          textTransform: 'uppercase',
          letterSpacing: '1px'
        }}>
          High Risk
        </div>
      </div>
      <div style={{
        padding: '32px',
        backgroundColor: 'white',
        border: '1px solid #eee',
        borderRadius: '12px',
        textAlign: 'center',
        boxShadow: '0 4px 16px rgba(0,0,0,0.08)'
      }}>
        <div style={{
          fontSize: '48px',
          fontWeight: '900',
          color: '#16a34a',
          marginBottom: '12px'
        }}>
          {stats.safePercent}%
        </div>
        <div style={{
          fontSize: '18px',
          color: '#666',
          fontWeight: '600',
          textTransform: 'uppercase',
          letterSpacing: '1px'
        }}>
          Safe Actions
        </div>
      </div>
    </div>
  );

}


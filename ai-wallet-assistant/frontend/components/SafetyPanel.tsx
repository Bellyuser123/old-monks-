"use client";

import { getAllAnalyses } from '@/lib/history';
import { useEffect, useState } from 'react';

interface SafetyData {
  week: 'SAFE' | 'CAUTION' | 'UNSAFE';
  month: 'SAFE' | 'CAUTION' | 'UNSAFE';
  year: 'SAFE' | 'CAUTION' | 'UNSAFE';
}

export default function SafetyPanel() {
  const [safetyData, setSafetyData] = useState<SafetyData>({ week: 'SAFE', month: 'SAFE', year: 'SAFE' });

  useEffect(() => {
    const analyses = getAllAnalyses();
    const now = Date.now();
    
    const hasHighRiskWeek = analyses.some(a => 
      now - a.timestamp < 7 * 24 * 60 * 60 * 1000 && a.result.status === 'Critical'
    );
    const hasHighRiskMonth = analyses.some(a => 
      now - a.timestamp < 30 * 24 * 60 * 60 * 1000 && a.result.status === 'Critical'
    );
    const hasHighRiskYear = analyses.some(a => 
      now - a.timestamp < 365 * 24 * 60 * 60 * 1000 && a.result.status === 'Critical'
    );

    const hasMixRiskWeek = analyses.some(a => 
      now - a.timestamp < 7 * 24 * 60 * 60 * 1000 && (a.result.status === 'Warning' || a.result.status === 'Critical')
    ) && !hasHighRiskWeek;
    const hasMixRiskMonth = analyses.some(a => 
      now - a.timestamp < 30 * 24 * 60 * 60 * 1000 && a.result.status === 'Warning'
    ) && !hasHighRiskMonth;
    const hasMixRiskYear = analyses.some(a => 
      now - a.timestamp < 365 * 24 * 60 * 60 * 1000 && a.result.status === 'Warning'
    ) && !hasHighRiskYear;

    setSafetyData({
      week: hasHighRiskWeek ? 'UNSAFE' : (hasMixRiskWeek ? 'CAUTION' : 'SAFE'),
      month: hasHighRiskMonth ? 'UNSAFE' : (hasMixRiskMonth ? 'CAUTION' : 'SAFE'),
      year: hasHighRiskYear ? 'UNSAFE' : (hasMixRiskYear ? 'CAUTION' : 'SAFE')
    });

  }, []);

  const getEmoji = (status: string) => {
    if (status === 'SAFE') return '✅';
    if (status === 'CAUTION') return '⚠️';
    return '❌';
  };

  return (
    <div style={{
      padding: '48px 32px',
      backgroundColor: 'white',
      borderRadius: '16px',
      boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
      maxWidth: '900px',
      margin: '0 auto 64px',
      border: '1px solid #eee'
    }}>
      <h2 style={{
        fontSize: '36px',
        fontWeight: '700',
        color: '#111',
        marginBottom: '32px',
        paddingBottom: '16px',
        borderBottom: '3px solid #333'
      }}>
        Safety Overview
      </h2>
      <div style={{
        display: 'grid',
        gap: '24px',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        textAlign: 'center'
      }}>
        <div>
          <div style={{
            fontSize: '48px',
            fontWeight: '900',
            marginBottom: '8px',
            color: safetyData.week === 'SAFE' ? '#16a34a' : safetyData.week === 'CAUTION' ? '#f59e0b' : '#ef4444'
          }}>
            {getEmoji(safetyData.week)}
          </div>
          <div style={{
            fontSize: '18px',
            color: '#666',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            Week
          </div>
        </div>
        <div>
          <div style={{
            fontSize: '48px',
            fontWeight: '900',
            marginBottom: '8px',
            color: safetyData.month === 'SAFE' ? '#16a34a' : safetyData.month === 'CAUTION' ? '#f59e0b' : '#ef4444'
          }}>
            {getEmoji(safetyData.month)}
          </div>
          <div style={{
            fontSize: '18px',
            color: '#666',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            Month
          </div>
        </div>
        <div>
          <div style={{
            fontSize: '48px',
            fontWeight: '900',
            marginBottom: '8px',
            color: safetyData.year === 'SAFE' ? '#16a34a' : safetyData.year === 'CAUTION' ? '#f59e0b' : '#ef4444'
          }}>
            {getEmoji(safetyData.year)}
          </div>
          <div style={{
            fontSize: '18px',
            color: '#666',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            Year
          </div>
        </div>
      </div>
    </div>
  );

}


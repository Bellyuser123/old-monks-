"use client";

import { useState } from 'react';

export default function HistoryTable() {
  return (
    <div style={{
      padding: '64px 32px',
      textAlign: 'center',
      maxWidth: '900px',
      margin: '0 auto'
    }}>
      <h2 style={{
        fontSize: '48px',
        fontWeight: '900',
        color: '#111',
        marginBottom: '32px',
        lineHeight: 1.1
      }}>
        History Coming Soon
      </h2>
      <p style={{
        fontSize: '20px',
        color: '#666',
        margin: 0,
        lineHeight: 1.5
      }}>
        Analysis history will appear here
      </p>
    </div>
  );
}


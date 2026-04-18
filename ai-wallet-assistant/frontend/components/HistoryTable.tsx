"use client";

import { useState } from 'react';

export default function HistoryTable() {
  return (
<<<<<<< HEAD
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
=======
    <div className="w-full">
      <div className="mb-8 flex flex-col sm:flex-row gap-4 items-center px-4 pt-6">
        <div className="relative flex-1 w-full group">
          <input
            type="text"
            placeholder="FILTER BY DATA OR RESULT..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-6 py-4 border-4 border-black bg-white font-black text-lg uppercase tracking-wider shadow-[8px_8px_0_#ffd700] focus:outline-none focus:shadow-[4px_4px_0_#ffd700] focus:translate-x-[4px] focus:translate-y-[4px] transition-all placeholder-gray-400"
          />
          <div className="absolute top-0 right-0 h-full flex items-center pr-6 pointer-events-none">
            <span className="text-lg font-black text-black">🔍</span>
          </div>
        </div>
        <div className="bg-black text-white px-4 py-2 border-2 border-black font-black uppercase text-xs shadow-[4px_4px_0_#ffd700] rotate-1">
          {filteredAnalyses.length} / {analyses.length} LOGS
        </div>
      </div>

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
      </div>
>>>>>>> 8c02ef48f325ea3b08178f8e8c515fc25bb8ca7b
    </div>
  );
}


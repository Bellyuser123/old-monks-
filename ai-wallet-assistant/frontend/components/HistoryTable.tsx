"use client";

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
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

  // Render empty state if there's no history tracking data at all
  if (analyses.length === 0) {
    return (
      <div className="border-8 border-black bg-white shadow-[20px_20px_0_black] rotate-1 p-12 text-center">
        <h2 className="text-4xl font-black uppercase tracking-widest mb-4 text-black">NO ANALYSES</h2>
        <p className="text-xl font-mono text-gray-600">Start analyzing transactions to see history here.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      
      {/* Search Bar */}
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
        <div className="bg-black text-white px-4 py-2 border-2 border-black font-black uppercase text-xs shadow-[4px_4px_0_#ffd700] rotate-1 whitespace-nowrap">
          {filteredAnalyses.length} / {analyses.length} LOGS
        </div>
      </div>

      {/* Main Content Body */}
      <div className="overflow-x-auto pb-8 px-4">
        {filteredAnalyses.length === 0 ? (
          
          /* Nothing matches search filter */
          <div className="border-4 border-black bg-gray-50 p-8 text-center shadow-[12px_12px_0_black]">
             <h3 className="text-2xl font-black uppercase tracking-wider mb-2">No Results Found</h3>
             <p className="font-mono text-gray-700">Try a different search term.</p>
          </div>

        ) : (

          /* Reusable Table */
          <table className="w-full border-4 border-black bg-white shadow-[12px_12px_0_black] border-collapse min-w-[700px]">
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
                  <td className="p-4 font-black font-mono text-sm border-r-4 border-black group-hover:bg-black group-hover:text-white transition-colors whitespace-nowrap">
                    {formatDate(analysis.timestamp)}
                  </td>
                  <td className="p-4 font-black font-mono text-sm border-r-4 border-black break-words max-w-sm">
                    {truncate(analysis.inputText, 60)}
                  </td>
                  <td className="p-4 text-center">
                    <div className="group-hover:scale-105 transition-transform inline-block">
                      <StatusBadge status={analysis.result.status} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        )}
      </div>
      
    </div>
  );
}

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

  if (filteredAnalyses.length === 0) {
    return (
      <div className="border-8 border-black bg-white shadow-[20px_20px_0_black] rotate-1 p-12 text-center">
        <h2 className="text-4xl font-black uppercase tracking-widest mb-4 text-black">NO ANALYSES</h2>
        <p className="text-xl font-mono text-gray-600">Start analyzing transactions to see history here.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-8 flex flex-col sm:flex-row gap-4 items-center">
        <input
          type="text"
          placeholder="Search analyses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-6 py-4 border-4 border-black bg-gray-50 font-mono text-lg shadow-[6px_6px_0_black] focus:outline-none focus:border-gray-800"
        />
        <span className="text-sm font-mono text-gray-500">
          {filteredAnalyses.length} of {analyses.length} results
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-8 border-black bg-white shadow-[16px_16px_0_black] rotate-1">
          <thead>
            <tr className="bg-gray-900 text-white">
              <th className="p-6 text-left font-black uppercase tracking-wider text-xl border-r-4 border-white">Date</th>
              <th className="p-6 text-left font-black uppercase tracking-wider text-xl border-r-4 border-white">Input</th>
              <th className="p-6 text-center font-black uppercase tracking-wider text-xl">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredAnalyses.map((analysis) => (
              <tr 
                key={analysis.id}
                className="hover:bg-gray-50 border-t-4 border-black cursor-pointer transition-all hover:shadow-[4px_4px_0_black]"
                onClick={() => router.push(`/history/${analysis.id}`)}
              >
                <td className="p-6 font-mono text-lg border-r-4 border-black">
                  {formatDate(analysis.timestamp)}
                </td>
                <td className="p-6 font-mono text-lg max-w-md truncate" title={analysis.inputText}>
                  {truncate(analysis.inputText, 80)}
                </td>
                <td className="p-6 text-center">
                  <StatusBadge status={analysis.result.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


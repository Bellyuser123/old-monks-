"use client";

import HistoryTable from '@/components/HistoryTable';
import { getAllAnalyses, clearHistory, type Analysis } from '@/lib/history';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function HistoryPage() {
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = getAllAnalyses();
    setAnalyses(data);
    setLoading(false);
  }, []);

  const handleClear = () => {
    if (confirm('Clear all history? This cannot be undone.')) {
      clearHistory();
      setAnalyses([]);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="border-8 border-black bg-white shadow-[20px_20px_0_black] p-12 rotate-2">
          <div className="animate-pulse bg-gray-200 h-12 w-48 mb-4"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen py-8 px-4 md:px-8 lg:px-16 bg-[#f5f5f5] font-black">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8 border-4 border-black bg-white p-6 shadow-[12px_12px_0_black] rotate-[-0.5deg]">
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-wider mb-4 bg-black text-white p-2 inline-block">
            ANALYSIS HISTORY
          </h1>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-4">
            <button
              onClick={handleClear}
              className="px-6 py-3 bg-red-500 text-white border-4 border-black font-black text-lg uppercase tracking-wider shadow-[6px_6px_0_black] hover:shadow-[3px_3px_0_black] hover:translate-x-[3px] hover:translate-y-[3px] transition-all duration-100 active:translate-x-[6px] active:translate-y-[6px] active:shadow-none"
            >
              PURGE DATA
            </button>
            <Link
              href="/"
              className="px-6 py-3 bg-[#ffd700] text-black border-4 border-black font-black text-lg uppercase tracking-wider shadow-[6px_6px_0_black] hover:shadow-[3px_3px_0_black] hover:translate-x-[3px] hover:translate-y-[3px] transition-all duration-100"
            >
              ← BACK
            </Link>
          </div>
        </div>
        
        <div className="bg-white border-4 border-black shadow-[16px_16px_0_black]">
          <HistoryTable analyses={analyses} />
        </div>
      </div>
    </main>
  );
}


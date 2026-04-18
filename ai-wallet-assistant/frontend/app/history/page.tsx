"use client";

import { getAllAnalyses } from '@/lib/history';
import HistoryCard from '@/components/HistoryCard';
import SafetyPanel from '@/components/SafetyPanel';
import StatsPanel from '@/components/StatsPanel';
import Link from 'next/link';

export default function HistoryPage() {
  const analyses = getAllAnalyses();

  return (
    <main className="min-h-screen py-12 px-6 md:px-12 lg:px-24 bg-[#f9fafb]">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16 border-4 border-black bg-white p-8 shadow-[12px_12px_0_black] rotate-[-0.5deg]">
          <h1 className="text-5xl md:text-6xl font-black uppercase tracking-wider mb-6 bg-black text-white p-4 inline-block shadow-[4px_4px_0_white]">
            ANALYSIS <span className="bg-yellow-400 text-black border-2 border-black p-2 ml-2">HISTORY</span>
          </h1>
          <p className="text-xl font-mono text-black font-bold mb-8">
            &gt; Your crypto security track record
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            <Link 
              href="/"
              className="inline-flex items-center gap-3 px-8 py-4 bg-green-400 text-black border-4 border-black font-black uppercase tracking-wide text-xl shadow-[8px_8px_0_black] hover:shadow-[4px_4px_0_black] hover:translate-x-[4px] hover:translate-y-[4px] transition-all"
            >
              ← Back to Analysis
            </Link>
          </div>
        </div>

        {/* Stats & Safety - Only show if there are analyses */}
        {analyses.length > 0 && (
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <StatsPanel />
            <SafetyPanel />
          </div>
        )}

        {/* History List */}
        <div className="border-8 border-black bg-white shadow-[30px_30px_0_black] rotate-1 p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {analyses.length === 0 ? (
              
              /* Empty State */
              <div className="col-span-full text-center py-24">
                <h2 className="text-4xl font-black uppercase mb-8 tracking-wide border-b-4 border-black pb-4 inline-block">
                  No Analyses Yet
                </h2>
                <p className="text-xl text-gray-600 mb-8 font-mono font-bold">
                  &gt; Start your first transaction analysis to see history here
                </p>
                <Link 
                  href="/"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-[#00e676] text-black border-4 border-black font-black text-xl uppercase shadow-[8px_8px_0_black] hover:shadow-[4px_4px_0_black] hover:translate-x-[4px] hover:translate-y-[4px] transition-all"
                >
                  Start Analysis →
                </Link>
              </div>

            ) : (

              /* Populated State */
              analyses.map((analysis) => (
                <HistoryCard key={analysis.id} analysis={analysis} />
              ))

            )}
          </div>
        </div>
        
      </div>
    </main>
  );
}

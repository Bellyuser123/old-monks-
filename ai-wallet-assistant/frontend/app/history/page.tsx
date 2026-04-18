"use client";

import { getAllAnalyses } from '@/lib/history';
import HistoryCard from '@/components/HistoryCard';
import SafetyPanel from '@/components/SafetyPanel';
import StatsPanel from '@/components/StatsPanel';
import Link from 'next/link';

export default function HistoryPage() {
  const analyses = getAllAnalyses();

  return (
    <main className="min-h-screen py-12 px-6 md:px-12 lg:px-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl lg:text-7xl font-black uppercase tracking-widest mb-6 bg-gradient-to-r from-black via-gray-800 to-black bg-clip-text">
            Analysis History
          </h1>
          <Link 
            href="/"
            className="inline-flex items-center gap-3 px-8 py-4 bg-green-500 text-white border-4 border-black font-black uppercase tracking-wide text-xl shadow-[8px_8px_0_black] hover:shadow-[4px_4px_0_black] hover:translate-x-[4px] hover:translate-y-[4px]"
          >
            ← New Analysis
          </Link>
        </div>

        {/* Stats & Safety */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <StatsPanel />
          <SafetyPanel />
        </div>

        {/* History List */}
        <div className="border-8 border-black bg-white shadow-[30px_30px_0_black] rotate-1 p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {analyses.length === 0 ? (
              <div className="col-span-full text-center py-24">
                <h2 className="text-4xl font-black uppercase mb-8 tracking-wide border-b-4 border-black pb-4 inline-block">
                  No Analyses Yet
                </h2>
                <p className="text-xl text-gray-600 mb-8">
                  Start your first transaction analysis to see history here
                </p>
                <Link 
                  href="/"
                  className="px-8 py-4 bg-blue-500 text-white border-4 border-blue-700 font-black text-xl uppercase shadow-[8px_8px_0_#1d4ed8] hover:shadow-[4px_4px_0_#1d4ed8]"
                >
                  Analyze First Transaction
                </Link>
              </div>
            ) : (
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

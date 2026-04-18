"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getAnalysisById, type Analysis } from '@/lib/history';
import StatusBadge from '@/components/StatusBadge';
import Link from 'next/link';

export default function HistoryDetail() {
  const params = useParams();
  const id = params.id as string;
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const data = getAnalysisById(id);
      setAnalysis(data);
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="border-8 border-black bg-white shadow-[20px_20px_0_black] p-12 rotate-1">
          Loading analysis...
        </div>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
        <div className="border-8 border-black bg-white shadow-[20px_20px_0_black] p-12 rotate-2 max-w-4xl">
          <h1 className="text-5xl font-black uppercase mb-8">Analysis Not Found</h1>
          <Link 
            href="/history"
            className="inline-block px-8 py-4 bg-blue-500 text-white border-4 border-blue-700 font-black text-xl uppercase shadow-[8px_8px_0_#1d4ed8] hover:shadow-[4px_4px_0_#1d4ed8]"
          >
            ← Back to History
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (timestamp: number) => 
    new Date(timestamp).toLocaleString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    });

  return (
    <main className="min-h-screen py-8 px-4 md:px-8 lg:px-16 bg-[#f5f5f5] font-black">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <div className="mb-8">
          <Link 
            href="/history"
            className="inline-flex items-center gap-2 px-6 py-2 bg-black text-white border-4 border-black font-black uppercase tracking-widest shadow-[6px_6px_0_#444] hover:shadow-[3px_3px_0_#444] hover:translate-x-[3px] hover:translate-y-[3px] transition-all"
          >
            ← BACK
          </Link>
        </div>

        {/* Header */}
        <div className="border-4 border-black bg-white shadow-[12px_12px_0_black] rotate-1 p-8 mb-8">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center">
            <StatusBadge status={analysis.result.status} />
            <h1 className="text-2xl lg:text-3xl font-black uppercase tracking-wider text-black">
              {formatDate(analysis.timestamp)}
            </h1>
          </div>
        </div>

        {/* Input */}
        <div className="border-4 border-black bg-white shadow-[10px_10px_0_black] rotate-[-0.5deg] p-8 mb-8">
          <h2 className="text-xl font-black uppercase mb-4 tracking-wide border-b-4 border-black pb-2">TX PAYLOAD</h2>
          <pre className="font-mono text-sm leading-relaxed bg-[#111] text-[#00ff00] p-6 border-2 border-black shadow-inner whitespace-pre-wrap overflow-auto max-h-64">
            {analysis.inputText}
          </pre>
        </div>

        {/* Result */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Summary */}
          <div className="border-4 border-black bg-white shadow-[10px_10px_0_black] p-8 rotate-[0.5deg]">
            <h3 className="text-xl font-black uppercase mb-4 tracking-wide border-b-2 border-black pb-2">AI SUMMARY</h3>
            <p className="text-lg font-mono leading-relaxed text-black">{analysis.result.summary}</p>
          </div>

          {/* Details */}
          <div className="border-4 border-black bg-white shadow-[-10px_10px_0_black] p-8 rotate-[-1deg]">
            <h3 className="text-xl font-black uppercase mb-4 tracking-wide border-b-2 border-black pb-2">FORENSICS</h3>
            <p className="text-base font-mono leading-relaxed text-black">{analysis.result.details}</p>
          </div>
        </div>

        {/* Chat History */}
        {analysis.chatHistory.length > 0 && (
          <div className="border-4 border-black bg-black text-[#00ff00] shadow-[12px_12px_0_#333] p-8 mb-8">
            <h3 className="text-2xl font-black uppercase mb-6 tracking-wide border-b-2 border-[#00ff00] pb-2 text-white">COMMS LOG</h3>
            <div className="space-y-4 max-h-64 overflow-y-auto">
              {analysis.chatHistory.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xl p-4 border-2 border-[#00ff00] bg-black rounded-none font-mono text-base shadow-lg ${
                    msg.role === 'user' ? 'border-[#ffd700] text-[#ffd700] ml-auto' : ''
                  }`}>
                    <div className="font-black uppercase tracking-widest mb-1 text-xs">
                      {msg.role === 'user' ? '>> USER' : '>> ASSISTANT'}
                    </div>
                    <div>{msg.message}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}


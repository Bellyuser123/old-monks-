import HistoryTable from '@/components/HistoryTable';
import { getAllAnalyses, clearHistory } from '@/lib/history';
import { useEffect, useState } from 'react';

export default function HistoryPage() {
  const [analyses, setAnalyses] = useState([]);
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
    <main className="min-h-screen py-12 px-6 md:px-12 lg:px-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-7xl font-black uppercase tracking-widest mb-6 bg-gradient-to-r from-black to-gray-800 bg-clip-text text-transparent rotate-[-1deg] shadow-[0_4px_0_black]">
            ANALYSIS HISTORY
          </h1>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={handleClear}
              className="px-8 py-4 bg-red-500 text-white border-4 border-red-700 font-black text-xl uppercase tracking-wide shadow-[8px_8px_0_#b91c1c] hover:shadow-[4px_4px_0_#b91c1c] hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-200"
            >
              Clear All History
            </button>
          </div>
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm">
          <HistoryTable analyses={analyses} />
        </div>
      </div>
    </main>
  );
}


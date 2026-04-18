"use client";

import { Status } from "@/lib/history";

interface StatusBadgeProps {
  status: Status;
  className?: string;
}

const statusStyles: Record<Status, string> = {
  Safe: "bg-[#16a34a] text-white shadow-[4px_4px_0_#052e16]",
  Warning: "bg-[#ffd700] text-black shadow-[4px_4px_0_#854d0e]",
  Critical: "bg-[#dc2626] text-white shadow-[4px_4px_0_#450a0a]"
};

export default function StatusBadge({ status, className = "" }: StatusBadgeProps) {
  return (
<<<<<<< Updated upstream
    <div 
      className={`
        px-4 py-2 border-2 border-black font-black text-sm uppercase tracking-widest
        inline-block shadow-[6px_6px_0_black] hover:shadow-[3px_3px_0_black] hover:translate-x-[3px] hover:translate-y-[3px]
        transition-all duration-100 active:translate-x-[6px] active:translate-y-[6px] active:shadow-none
        ${statusStyles[status]} ${className}
      `}
=======
    <div
      className={className}
      style={{
        padding: '0.5rem 1rem',
        backgroundColor: style.bg,
        color: style.text,
        border: '3px solid black',
        fontWeight: '900',
        fontSize: '0.875rem',
        textTransform: 'uppercase',
        fontFamily: 'var(--font-bold)',
        boxShadow: `6px 6px 0 ${style.shadow}`,
        display: 'inline-block',
        transition: 'all 0.15s'
      }}
>>>>>>> Stashed changes
    >
      {status === 'Safe' ? 'LOW' : status === 'Warning' ? 'MEDIUM' : 'HIGH'} RISK
    </div>

  );
}


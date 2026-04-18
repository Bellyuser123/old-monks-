"use client";

import { Status } from "@/lib/history";

interface StatusBadgeProps {
  status: Status;
  className?: string;
}

const statusStyles: Record<Status, string> = {
  Safe: "bg-[#00e676] text-black border-[#00b85c] shadow-[6px_6px_0_#00a655]",
  Warning: "bg-[#ffd600] text-black border-[#e6c200] shadow-[6px_6px_0_#ccaa00]",
  Critical: "bg-[#ff3b3b] text-white border-[#e52a2a] shadow-[6px_6px_0_#cc2424]"
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


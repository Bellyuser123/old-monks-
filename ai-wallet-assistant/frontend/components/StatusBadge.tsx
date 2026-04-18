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
    <div 
      className={`
        px-4 py-2 border-2 border-black font-black text-sm uppercase tracking-widest
        inline-block shadow-[6px_6px_0_black] hover:shadow-[3px_3px_0_black] hover:translate-x-[3px] hover:translate-y-[3px]
        transition-all duration-100 active:translate-x-[6px] active:translate-y-[6px] active:shadow-none
        ${statusStyles[status]} ${className}
      `}
    >
      {status} RISK
    </div>
  );
}


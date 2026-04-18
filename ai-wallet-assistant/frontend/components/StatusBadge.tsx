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


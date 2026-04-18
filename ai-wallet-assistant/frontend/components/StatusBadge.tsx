"use client";

import { Status } from "@/lib/history";

interface StatusBadgeProps {
  status: Status;
  className?: string;
}

const statusStyles: Record<Status, string> = {
  Safe: "bg-green-500 text-white border-green-700 shadow-[6px_6px_0_#15803d]",
  Warning: "bg-yellow-400 text-black border-yellow-600 shadow-[6px_6px_0_#ca8a04]",
  Critical: "bg-red-500 text-white border-red-700 shadow-[6px_6px_0_#b91c1c]"
};

export default function StatusBadge({ status, className = "" }: StatusBadgeProps) {
  return (
    <div 
      className={`
        px-6 py-3 border-4 border-black font-black text-lg uppercase tracking-wide
        inline-block shadow-[6px_6px_0_black] hover:shadow-[3px_3px_0_black] hover:translate-x-[3px] hover:translate-y-[3px]
        transition-all duration-150 active:translate-x-[6px] active:translate-y-[6px] active:shadow-none
        ${statusStyles[status]} ${className}
      `}
    >
      {status} RISK
    </div>
  );
}


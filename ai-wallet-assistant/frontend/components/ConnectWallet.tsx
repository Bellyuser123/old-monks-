'use client';

import { useAccount } from 'wagmi';
import { useEffect, useState } from 'react';

/**
 * ConnectWallet Component
 * Uses Reown's <appkit-button /> web component to show connect button
 * Shows wallet address when connected
 */
export function ConnectWallet() {
  const { address, isConnected } = useAccount();
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted before rendering (prevents hydration mismatch)
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm">
        Loading...
      </div>
    );
  }

  if (isConnected && address) {
    // Format address to show first 6 and last 4 characters
    const displayAddress = `${address.slice(0, 6)}...${address.slice(-4)}`;

    return (
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-2 bg-green-50 border border-green-200 rounded-lg">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-sm font-medium text-green-900">{displayAddress}</span>
        </div>
        {/* Reown AppKit button for account menu */}
        {/* @ts-expect-error - appkit-button is a custom web component */}
        <appkit-button />
      </div>
    );
  }

  // Show connect button using Reown's AppKit button
  // @ts-expect-error - appkit-button is a custom web component
  return <appkit-button />;
}

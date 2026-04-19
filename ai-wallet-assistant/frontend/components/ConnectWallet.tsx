'use client';

import { useEffect, useState } from 'react';

export function ConnectWallet() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleConnectWallet = async () => {
    try {
      if (typeof window !== 'undefined' && (window as any).ethereum) {
        await (window as any).ethereum.request({
          method: 'eth_requestAccounts',
        });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (!mounted) return null;

  return (
    <button
      onClick={handleConnectWallet}
      style={{
        padding: '10px 20px',
        backgroundColor: '#0070f3',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer'
      }}
    >
      Connect Wallet
    </button>
  );
}

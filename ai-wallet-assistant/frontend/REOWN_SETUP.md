# Reown (WalletConnect) Integration Setup Guide

## ✅ Integration Complete

Your Next.js frontend now has full Reown (WalletConnect) integration with wallet connection, address display, and seamless UI integration.

---

## 🎯 What Was Done

### New Files Created:

1. **[app/providers.tsx](app/providers.tsx)** - Web3 Provider Wrapper
   - Wraps app with `WagmiProvider` for wallet state management
   - Includes `QueryClientProvider` for data caching
   - Handles Ethereum mainnet configuration via wagmi

2. **[lib/web3.ts](lib/web3.ts)** - Wagmi Configuration
   - Simple wagmi config with Ethereum mainnet
   - Public HTTP transport for wallet connections

3. **[components/ConnectWallet.tsx](components/ConnectWallet.tsx)** - Wallet Connection Component
   - Displays "Connect Wallet" button when not connected
   - Shows formatted wallet address (truncated) when connected
   - Uses Reown's `<appkit-button />` web component
   - Handles SSR/hydration properly

4. **[components/Header.tsx](components/Header.tsx)** - Header with Wallet Integration
   - Top-level header component with branding
   - Includes ConnectWallet component
   - Client-side rendering for wagmi hooks

### Updated Files:

- **[app/layout.tsx](app/layout.tsx)**
  - Wrapped with `<Providers>` component
  - Integrated `<Header>` with wallet button
  - Preserved existing structure and styling

- **[app/history/page.tsx](app/history/page.tsx)**
  - Added `"use client"` directive
  - Fixed TypeScript types

- **[app/history/[id]/page.tsx](app/history/%5Bid%5D/page.tsx)**
  - Fixed TypeScript types for analysis state

- **[app/page.tsx](app/page.tsx)**
  - Fixed explanation data handling for history storage

### Dependencies Installed:

- `@reown/appkit-adapter-wagmi` - Reown adapter for wagmi
- `@tanstack/react-query` - Data caching and synchronization

---

## 🚀 Getting Started (3 Easy Steps)

### Step 1️⃣ Get Your Reown Project ID

1. Go to **https://cloud.reown.com**
2. Sign up or log in with your account
3. Create a new project
4. Copy your **Project ID** (looks like: `abc123def456...`)

### Step 2️⃣ Set Environment Variable

Create or update `.env.local` in the frontend folder:

```env
NEXT_PUBLIC_REOWN_PROJECT_ID=your_actual_project_id_here
```

**⚠️ Important:** The variable must start with `NEXT_PUBLIC_` to be available in the browser.

### Step 3️⃣ Start the Development Server

```bash
cd frontend
npm run dev
```

Then open **http://localhost:3000** in your browser.

---

## ✨ Features

### Connect Wallet Button
- Click "Connect Wallet" button in the top-right header
- Select your wallet (MetaMask, Rainbow, Coinbase, WalletConnect, etc.)
- Sign the connection request

### Display Wallet Address
- Once connected, your wallet address appears as: `0x1234...5678`
- Green indicator shows active connection
- Click account menu to manage connection

### Existing Functionality Preserved
✅ `/analyze` API still works
✅ `/chat` API fully operational  
✅ History tracking unchanged
✅ All existing components functional

---

## 📁 Project Structure

```
frontend/
├── app/
│   ├── layout.tsx              ✏️ Updated - wrapped with Providers & Header
│   ├── providers.tsx           🆕 Wagmi + QueryClient setup
│   ├── page.tsx                ✏️ Fixed explanation data
│   ├── globals.css
│   ├── history/
│   │   ├── page.tsx            ✏️ Added "use client" & types
│   │   └── [id]/
│   │       └── page.tsx        ✏️ Fixed types
├── components/
│   ├── ConnectWallet.tsx       🆕 Wallet button + address display
│   ├── Header.tsx              🆕 Top header with wallet integration
│   ├── HistoryTable.tsx        unchanged
│   └── StatusBadge.tsx         unchanged
├── lib/
│   ├── web3.ts                 🆕 Wagmi configuration
│   ├── web3Config.ts           🆕 Alternative config (reference)
│   ├── history.ts              unchanged
├── REOWN_SETUP.md              🆕 This file
├── package.json                ✏️ Dependencies added
└── next.config.ts              unchanged
```

---

## 🔧 Customization

### Add More Blockchains

Edit [app/providers.tsx](app/providers.tsx):

```typescript
import { createConfig, http } from 'wagmi';
import { mainnet, polygon, arbitrum } from 'wagmi/chains';

const wagmiConfig = createConfig({
  chains: [mainnet, polygon, arbitrum],  // Add more chains here
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [arbitrum.id]: http(),
  },
});
```

### Customize Colors & Styling

Edit [components/ConnectWallet.tsx](components/ConnectWallet.tsx):

```typescript
// Change loading state color
<div className="px-4 py-2 bg-gray-200 ...">  {/* Modify here */}

// Change connected state colors
<div className="px-3 py-2 bg-green-50 border border-green-200 ..."> {/* Modify here */}
```

### Use Wagmi in Other Components

```typescript
'use client';
import { useAccount, useBalance } from 'wagmi';

export function MyComponent() {
  const { address, isConnected, chain } = useAccount();
  const { data: balance } = useBalance({ address });

  if (!isConnected) return <p>Please connect wallet</p>;

  return (
    <>
      <p>Address: {address}</p>
      <p>Balance: {balance?.formatted} {balance?.symbol}</p>
      <p>Chain: {chain?.name}</p>
    </>
  );
}
```

---

## 🔒 Security Best Practices

1. **Never commit `NEXT_PUBLIC_REOWN_PROJECT_ID` in code** - always use environment variables
2. **Public RPC endpoints are read-only** - fine for balance checks and contract queries
3. **For production, consider:**
   - Using Alchemy, Infura, or QuickNode RPC endpoints
   - Rate limiting on API calls
   - Custom backend for sensitive operations
4. **Store sensitive operations on backend** - never expose private keys in browser

---

## 🧪 Testing the Integration

### 1. Test Connection
```bash
npm run dev
# Open http://localhost:3000
# Click "Connect Wallet" button
```

### 2. Verify in Browser Console
```javascript
// Check if wagmi is available
window.__wagmi__  // Should exist

// Check if Reown AppKit is loaded
window.__reown__  // Should exist
```

### 3. Test Existing APIs
- Try analyzing a transaction using the `/analyze` API
- Test the chat feature with `/chat` API
- Verify history tracking still works

### 4. Build for Production
```bash
npm run build
npm run start
```

---

## 🐛 Troubleshooting

### "PROJECT_ID not set" Warning
**Solution:** Add `NEXT_PUBLIC_REOWN_PROJECT_ID` to `.env.local`
```env
NEXT_PUBLIC_REOWN_PROJECT_ID=your_id_here
```

### Button Not Showing
**Possible causes:**
- Project ID not set → Add to `.env.local`
- Reown AppKit script not loaded → Check network tab
- Browser cache → Clear and refresh

**Solution:**
1. Set PROJECT_ID in `.env.local`
2. Clear browser cache (`Ctrl+Shift+Del`)
3. Refresh page (`Ctrl+F5`)

### "useAccount must be within WagmiProvider"
**Solution:** Ensure [app/layout.tsx](app/layout.tsx) wraps children with `<Providers>`

### Build Fails
**Solution:** Run these commands:
```bash
npm install                    # Ensure all dependencies installed
npm run build                 # Build again
```

### Wallet Connection Fails
**Possible causes:**
- Browser wallet extension not installed
- Reown Project ID is invalid
- Network connectivity issues

**Solution:**
1. Install MetaMask or other wallet extension
2. Verify Project ID is correct at https://cloud.reown.com
3. Check browser network tab for errors

---

## 📚 Resources & Documentation

- **[Reown AppKit Docs](https://docs.reown.com/appkit/overview)**
- **[Wagmi Documentation](https://wagmi.sh)**
- **[Viem Documentation](https://viem.sh)**
- **[Next.js App Router Docs](https://nextjs.org/docs/app)**
- **[Supported Wallets](https://docs.reown.com/supported-wallets)**

---

## ✅ Verification Checklist

Before deploying to production:

- [ ] `.env.local` has `NEXT_PUBLIC_REOWN_PROJECT_ID` set
- [ ] `npm run build` completes without errors
- [ ] `npm run dev` starts successfully  
- [ ] "Connect Wallet" button appears in top-right header
- [ ] Can click button and see wallet modal
- [ ] Can connect wallet and see address displayed
- [ ] Address format shows as `0x1234...5678`
- [ ] `/analyze` API still works
- [ ] `/chat` API still works
- [ ] History tracking still functional
- [ ] No console errors in browser DevTools

---

## 📝 Notes

- This integration uses **Ethereum mainnet by default**
- **Public HTTP RPC** - no authentication needed, but rate-limited
- **WalletConnect protocol** - supports 100+ wallets
- **No breaking changes** - all existing features preserved
- **SSR safe** - proper client component handling

---

## 🎉 You're All Set!

Your app now has a complete Web3 wallet integration. Users can:
1. Connect their favorite wallet
2. See their connected address
3. Use all existing AI transaction analysis features

For questions or issues, refer to the [troubleshooting section](#-troubleshooting) above.


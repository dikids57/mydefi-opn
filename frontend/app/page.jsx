'use client';

import { useState } from 'react';
import { 
  createConfig, 
  http, 
  useAccount, 
  useConnect, 
  useDisconnect, 
  useSwitchChain 
} from 'wagmi';
import { injected } from 'wagmi/connectors';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const opnTestnet = {
  id: 984,
  name: 'OPN Testnet',
  nativeCurrency: { name: 'OPN', symbol: 'OPN', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://testnet-rpc.iopn.tech'] },
  },
  blockExplorers: {
    default: { name: 'OPNScan', url: 'https://testnet.iopn.tech' },
  },
};

const config = createConfig({
  chains: [opnTestnet],
  connectors: [injected()],
  transports: {
    [opnTestnet.id]: http(),
  },
});

const queryClient = new QueryClient();

export default function MyDeFi() {
  const { address, isConnected, chain } = useAccount();
  const { connect, connectors, isPending: isConnecting } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain, isPending: isSwitching } = useSwitchChain();

  const [showModal, setShowModal] = useState(false);
  const opnChainId = 984;

  const truncateAddress = (addr) => addr ? `\( {addr.slice(0, 6)}... \){addr.slice(-4)}` : '';
  const isOnOPNChain = chain?.id === opnChainId;

  const handleConnect = () => {
    const connector = connectors[0];
    if (connector) {
      connect({ connector });
    } else {
      setShowModal(true);
    }
  };

  const handleSwitchToOPN = () => {
    switchChain({ chainId: opnChainId });
  };

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-950 via-purple-950 to-black p-6">
          <div className="text-center max-w-md mx-auto">
            <div className="mb-8">
              <h1 className="text-7xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                MyDeFi
              </h1>
              <p className="text-xl mt-3 text-purple-300">Savings & Lending on OPN Chain</p>
            </div>

            <div className="bg-zinc-900/80 backdrop-blur-xl border border-purple-500/30 rounded-3xl p-10 shadow-2xl">
              <p className="text-lg mb-8">Demo untuk OPN Builders Season 1</p>
              
              {!isConnected ? (
                <button 
                  onClick={handleConnect}
                  disabled={isConnecting}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 py-5 rounded-2xl text-xl font-semibold transition-all active:scale-95 disabled:opacity-70"
                >
                  {isConnecting ? 'Connecting...' : 'Connect Wallet'}
                </button>
              ) : (
                <div className="space-y-4">
                  <div className="bg-zinc-800/50 rounded-2xl p-4 border border-purple-500/20">
                    <p className="text-sm text-purple-300 mb-1">Connected Wallet</p>
                    <p className="font-mono text-lg text-white">{truncateAddress(address)}</p>
                    <p className="text-xs text-zinc-400 mt-1">
                      {isOnOPNChain ? '✅ OPN Testnet' : '⚠️ Wrong Network'}
                    </p>
                  </div>

                  {!isOnOPNChain && (
                    <button
                      onClick={handleSwitchToOPN}
                      disabled={isSwitching}
                      className="w-full bg-yellow-600 hover:bg-yellow-700 py-3 rounded-xl text-white font-semibold transition-all disabled:opacity-70"
                    >
                      {isSwitching ? 'Switching...' : 'Switch to OPN Testnet'}
                    </button>
                  )}

                  <button 
                    onClick={() => disconnect()}
                    className="w-full bg-zinc-700 hover:bg-zinc-600 py-3 rounded-xl text-white font-semibold transition-all"
                  >
                    Disconnect Wallet
                  </button>
                </div>
              )}

              <p className="mt-6 text-sm opacity-70">Gas murah • On-chain • OPN Chain</p>
            </div>

            <p className="mt-12 text-xs opacity-50">Built with ❤️ for Season 1</p>
          </div>

          {showModal && (
            <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
              <div className="bg-zinc-900 border border-purple-500/30 rounded-3xl p-8 max-w-sm w-full">
                <div className="text-center">
                  <div className="text-4xl mb-4">🦊</div>
                  <h3 className="text-xl font-bold mb-2">Wallet Tidak Terdeteksi</h3>
                  <p className="text-zinc-400 mb-6">Silakan install MetaMask atau wallet EVM lain.</p>
                  <button onClick={() => setShowModal(false)} className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-xl font-semibold">
                    Oke
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

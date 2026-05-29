'use client';

export default function MyDeFi() {
  return (
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
          
          <button 
            onClick={() => alert('🎉 Wallet Connect akan datang dalam versi penuh!')}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 py-5 rounded-2xl text-xl font-semibold transition-all active:scale-95"
          >
            Connect Wallet
          </button>

          <p className="mt-6 text-sm opacity-70">Gas murah • On-chain • OPN Chain</p>
        </div>

        <p className="mt-12 text-xs opacity-50">Built with ❤️ for Season 1</p>
      </div>
    </div>
  );
}

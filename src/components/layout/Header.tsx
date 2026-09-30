import React, { useState, useEffect } from 'react';

interface HeaderProps {
  onLock: () => void;
  currentUser: {
    username: string;
    title: string;
    enclave: string;
  };
}

export const Header: React.FC<HeaderProps> = ({ onLock, currentUser }) => {
  const [timeStr, setTimeStr] = useState<string>('14:28:09.412 UTC');
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const h = String(now.getUTCHours()).padStart(2, '0');
      const m = String(now.getUTCMinutes()).padStart(2, '0');
      const s = String(now.getUTCSeconds()).padStart(2, '0');
      const ms = String(now.getUTCMilliseconds()).padStart(3, '0');
      setTimeStr(`${h}:${m}:${s}.${ms} UTC`);
    };
    const interval = setInterval(updateTime, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 h-14 bg-[#0a0e16] border-b border-[#3b494b] z-50 flex items-center justify-between px-4 select-none">
      {/* Brand & Classification Zone */}
      <div className="flex items-center gap-3">
        <img
          alt="VAJRA-NET Brand Logo"
          className="h-8 w-auto object-contain"
          src="https://lh3.googleusercontent.com/aida/AEtjO1We1VygcNY4i8TN6mdpr2DACj1lgJipSJcAM4bgFfV86I69AJ05GH3NnisSfXzVqBg7iHkswfszpAegTtM7hn-xsifX8oFfCo7-8Lde1cHGzgGphOBghoH6Owlx82gC9wsBDlNmNFBXdqsTUpigeNvkIG5MohEGVTylvRIx592TFJhDcclac48oVp1tWbPbp2RBW5bkJrscaWf545_CtMSC8s-ud9mEKGDsti8zInbaReW3bYZ1rI90t-Q"
        />
        <div className="flex flex-col">
          <span className="font-headline text-lg tracking-wider text-[#dbfcff] font-bold leading-none">
            VAJRA-NET
          </span>
          <span className="font-mono text-[9px] tracking-widest text-[#849495] uppercase leading-tight mt-0.5">
            SOVEREIGN C4I PLATFORM
          </span>
        </div>

        <div className="h-6 w-px bg-[#3b494b] mx-1"></div>

        <div className="flex items-center gap-1.5 px-2 py-0.5 bg-[#93000a]/20 border border-[#93000a]">
          <span className="material-symbols-outlined text-[#ffb4ab] text-[14px]">
            gpp_maybe
          </span>
          <span className="font-mono text-[11px] tracking-widest text-[#ffb4ab] uppercase font-bold">
            TOP SECRET // NTRO CYBER INTELLIGENCE
          </span>
        </div>
      </div>

      {/* Telemetry & Operator Zone */}
      <div className="flex items-center gap-5">
        {/* Real-time Subsystem Status Cluster */}
        <div className="hidden xl:flex items-center gap-3 border border-[#3b494b] bg-[#181c24] px-3 py-1 text-xs">
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3] animate-pulse"></span>
            <span className="font-mono text-[10px] text-[#b9cacb] uppercase">API:</span>
            <span className="font-mono text-[11px] text-[#4edea3]">200 OK</span>
          </div>
          <span className="text-[#3b494b]">|</span>
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3]"></span>
            <span className="font-mono text-[10px] text-[#b9cacb] uppercase">GRAPH:</span>
            <span className="font-mono text-[11px] text-[#7df4ff]">SYNCD</span>
          </div>
          <span className="text-[#3b494b]">|</span>
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3]"></span>
            <span className="font-mono text-[10px] text-[#b9cacb] uppercase">SEARCH:</span>
            <span className="font-mono text-[11px] text-[#4edea3]">0.42ms</span>
          </div>
          <span className="text-[#3b494b]">|</span>
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3] animate-pulse"></span>
            <span className="font-mono text-[10px] text-[#b9cacb] uppercase">INGEST:</span>
            <span className="font-mono text-[11px] text-[#dbfcff]">98.4K/S</span>
          </div>
        </div>

        {/* Live Enclave Timestamp & Operator Profile */}
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end border-r border-[#3b494b] pr-3">
            <div className="flex items-center gap-1 font-mono text-[11px] text-[#dbfcff] tracking-wider">
              <span className="material-symbols-outlined text-[#849495] text-[13px]">schedule</span>
              <span>{timeStr}</span>
            </div>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3]"></span>
              <span className="font-mono text-[9px] text-[#b9cacb] tracking-wider uppercase">
                ENCLAVE: {currentUser.enclave} [SECURE]
              </span>
            </div>
          </div>

          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 pl-1 cursor-pointer hover:opacity-85 transition-opacity"
            >
              <div className="flex flex-col text-right">
                <span className="font-mono text-[12px] text-[#dbfcff] font-bold leading-tight">
                  {currentUser.username}
                </span>
                <span className="font-mono text-[10px] text-[#b9cacb] leading-tight">
                  {currentUser.title}
                </span>
              </div>
              <div className="w-8 h-8 rounded-full bg-[#00f0ff] flex items-center justify-center text-[#00363a] font-bold">
                <span className="material-symbols-outlined text-[18px]">person</span>
              </div>
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-[#0a0e16] border border-[#3b494b] p-3 shadow-2xl flex flex-col gap-2 z-50 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-[#3b494b]">
                  <span className="font-mono text-[10px] text-[#849495] uppercase">Session Provenance</span>
                  <span className="text-[10px] text-[#4edea3] font-mono">mTLS 1.3</span>
                </div>
                <div className="font-mono text-[11px] text-[#dfe2ee]">
                  <div>User: <span className="text-[#00f0ff] font-bold">{currentUser.username}</span></div>
                  <div>Rank: <span className="text-[#dfe2ee]">{currentUser.title}</span></div>
                  <div>Node: <span className="text-[#7df4ff]">NODE-BLR-04 (Air-gap)</span></div>
                  <div className="text-[10px] text-[#849495] mt-1">CAC: #9941-8812 (FIPS-140-3 L4)</div>
                </div>
                <div className="h-px bg-[#3b494b] my-1"></div>
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    onLock();
                  }}
                  className="w-full py-1.5 px-2 bg-[#181c24] hover:bg-[#262a33] text-[#ffb4ab] font-mono text-[11px] uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors border border-[#3b494b]"
                >
                  <span className="material-symbols-outlined text-[14px]">lock</span>
                  <span>Lock Console & Sever Session</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

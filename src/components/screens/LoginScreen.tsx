import React, { useState } from 'react';

interface LoginScreenProps {
  onLoginSuccess: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const [agentId, setAgentId] = useState('analyst01@ntro.gov.in');
  const [passphrase, setPassphrase] = useState('••••••••••••••••••••');
  const [cacPin, setCacPin] = useState('881204');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [statusText, setStatusText] = useState('[ SIGN IN TO SECURE ENCLAVE ]');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusText('[ VERIFYING IDENTITY PROVENANCE... ]');

    setTimeout(() => {
      setStatusText('[ ACCESS GRANTED // ROUTING ]');
      setTimeout(() => {
        onLoginSuccess();
      }, 700);
    }, 900);
  };

  return (
    <div className="min-h-screen bg-[#0f131c] flex items-center justify-center p-4 relative select-none overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#00f0ff]/5 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-[#4edea3]/5 blur-3xl pointer-events-none"></div>

      <main className="w-full max-w-lg bg-[#181c24] border border-[#3b494b] p-8 shadow-2xl relative z-10">
        <div className="flex flex-col items-center w-full mb-6 text-center">
          <div className="relative flex items-center justify-center p-2 mb-4 bg-[#262a33] shadow-md border border-[#3b494b]">
            <img
              alt="VAJRA-NET Sovereign Threat Command Emblem"
              className="w-16 h-16 object-contain"
              src="https://lh3.googleusercontent.com/aida/AEtjO1We1VygcNY4i8TN6mdpr2DACj1lgJipSJcAM4bgFfV86I69AJ05GH3NnisSfXzVqBg7iHkswfszpAegTtM7hn-xsifX8oFfCo7-8Lde1cHGzgGphOBghoH6Owlx82gC9wsBDlNmNFBXdqsTUpigeNvkIG5MohEGVTylvRIx592TFJhDcclac48oVp1tWbPbp2RBW5bkJrscaWf545_CtMSC8s-ud9mEKGDsti8zInbaReW3bYZ1rI90t-Q"
            />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 bg-[#31353e] text-[#4edea3] font-mono text-[10px] uppercase tracking-widest mb-2 border border-[#4edea3]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3] animate-pulse"></span>
            RESTRICTED ACCESS // AUTHORIZED NTRO PERSONNEL ONLY
          </div>

          <h1 className="font-headline text-2xl font-bold tracking-wider text-[#dbfcff] uppercase">
            VAJRA-NET
          </h1>
          <p className="font-mono text-[11px] text-[#b9cacb] tracking-widest mt-0.5">
            SOVEREIGN THREAT ACTOR DE-ANONYMIZATION PLATFORM
          </p>
        </div>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          {/* Agent ID */}
          <div className="flex flex-col gap-1">
            <label className="font-mono text-[11px] text-[#dfe2ee] uppercase tracking-wider flex items-center gap-1">
              <span className="text-[#00f0ff] font-mono">01//</span> Username / Agent ID
            </label>
            <div className="relative flex items-center bg-[#0a0e16] border border-[#3b494b] focus-within:border-[#00f0ff]">
              <span className="absolute left-3 text-[#00f0ff]/80 material-symbols-outlined text-[18px]">
                key
              </span>
              <input
                type="text"
                value={agentId}
                onChange={(e) => setAgentId(e.target.value)}
                required
                className="w-full pl-10 pr-3 py-2.5 bg-transparent font-mono text-[12px] text-[#dfe2ee] focus:outline-none"
              />
            </div>
          </div>

          {/* Passphrase */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <label className="font-mono text-[11px] text-[#dfe2ee] uppercase tracking-wider flex items-center gap-1">
                <span className="text-[#00f0ff] font-mono">02//</span> Passphrase / Cryptographic Key
              </label>
              <span className="font-mono text-[9px] text-[#849495] uppercase">SHA-512 ENCRYPTED</span>
            </div>
            <div className="relative flex items-center bg-[#0a0e16] border border-[#3b494b] focus-within:border-[#00f0ff]">
              <span className="absolute left-3 text-[#00f0ff]/80 material-symbols-outlined text-[18px]">
                lock
              </span>
              <input
                type={showPass ? 'text' : 'password'}
                value={passphrase}
                onChange={(e) => setPassphrase(e.target.value)}
                required
                className="w-full pl-10 pr-10 py-2.5 bg-transparent font-mono text-[12px] text-[#dfe2ee] tracking-widest focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 text-[#849495] hover:text-[#00f0ff] focus:outline-none"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {showPass ? 'visibility' : 'visibility_off'}
                </span>
              </button>
            </div>
          </div>

          {/* Hardware Token PIN */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <label className="font-mono text-[11px] text-[#dfe2ee] uppercase tracking-wider flex items-center gap-1">
                <span className="text-[#00f0ff] font-mono">03//</span> Hardware Token / CAC PIN
              </label>
              <div className="flex items-center gap-1 text-[#4edea3] font-mono text-[10px]">
                <span className="material-symbols-outlined text-[13px]">usb</span>
                <span>TOKEN CONNECTED</span>
              </div>
            </div>
            <div className="relative flex items-center bg-[#0a0e16] border border-[#3b494b] focus-within:border-[#00f0ff]">
              <span className="absolute left-3 text-[#00f0ff]/80 material-symbols-outlined text-[18px]">
                pin
              </span>
              <input
                type="password"
                maxLength={6}
                value={cacPin}
                onChange={(e) => setCacPin(e.target.value)}
                required
                className="w-full pl-10 pr-3 py-2.5 bg-transparent font-mono text-[13px] text-[#dfe2ee] tracking-[0.35em] focus:outline-none"
              />
            </div>
          </div>

          {/* Enclave Parameters */}
          <div className="flex items-center justify-between px-1 py-1 text-[#b9cacb] font-mono text-[11px]">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-[#00f0ff] rounded-full"></span>
              ENCLAVE: <strong className="text-[#dbfcff]">NEW-DELHI-01</strong>
            </span>
            <span className="text-[#849495] text-[10px] tracking-wide uppercase">CIPHER: ECDSA-P384</span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 font-mono text-[13px] font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer border ${
              loading
                ? 'bg-[#00a572] text-[#003824] border-[#4edea3]'
                : 'bg-[#00f0ff] hover:bg-[#7df4ff] text-[#00363a] border-[#00f0ff] active:scale-[0.99]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">
              {loading ? 'progress_activity' : 'terminal'}
            </span>
            <span>{statusText}</span>
          </button>
        </form>

        {/* Security Legal & Session Metadata Footer */}
        <div className="w-full mt-6 flex flex-col gap-2 bg-[#0a0e16] border border-[#3b494b] p-3 text-xs">
          <div className="flex items-center justify-between text-[#b9cacb] font-mono text-[10px]">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#4edea3]"></span>
              <span>Authentication Service: <strong className="text-[#dfe2ee]">Keycloak Ready</strong></span>
            </div>
            <span className="text-[#4edea3]">mTLS 1.3 Active</span>
          </div>
          <p className="font-sans text-[11px] text-[#b9cacb]/80 leading-relaxed border-t border-[#3b494b]/60 pt-2">
            All sessions are tamper-evidently logged with Merkle hash-chaining under Indian IT Act §69A &amp; NTRO statutory provisions. Unauthorized access is punishable by law.
          </p>
          <div className="flex items-center justify-between text-[#849495] font-mono text-[9px] pt-1">
            <span>SESSION ID: 7A99-E8C2-4B11</span>
            <span>AUDIT HASH: 8f2a...c09e</span>
          </div>
        </div>
      </main>
    </div>
  );
};

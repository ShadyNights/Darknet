import React, { useState } from 'react';
import { THREAT_ACTORS, ATTRIBUTION_CANDIDATES, CASE_FILES } from '../../data/mockData';
import { ScreenId } from '../../types';
import { WhyLinkedSlideOver } from '../modals/WhyLinkedSlideOver';
import { DossierExportModal } from '../modals/DossierExportModal';

interface ActorDetailScreenProps {
  actorId: string;
  onNavigate: (screen: ScreenId) => void;
  onSelectCandidate?: (candidateId: string) => void;
}

export const ActorDetailScreen: React.FC<ActorDetailScreenProps> = ({
  actorId,
  onNavigate,
  onSelectCandidate,
}) => {
  const [isWhyLinkedOpen, setIsWhyLinkedOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const actor = THREAT_ACTORS.find((a) => a.id === actorId) || THREAT_ACTORS[0];
  const candidate = ATTRIBUTION_CANDIDATES[0]; // C-1042 ShadowVendor77 vs NightTrader
  const caseFile = CASE_FILES[0]; // C-2026-001

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(label);
    setTimeout(() => setCopiedKey(null), 1500);
  };

  return (
    <div className="flex flex-col w-full gap-4 pb-12 font-mono">
      {/* Top Breadcrumb & Action Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#0a0e16] p-3 border border-[#3b494b]">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('actors')}
            className="p-1 text-[#849495] hover:text-[#dbfcff] hover:bg-[#262a33] transition-colors"
          >
            <span className="material-symbols-outlined text-lg">arrow_back</span>
          </button>
          <div className="flex items-center gap-2">
            <span className="text-[#849495] text-xs">ACTORS /</span>
            <span className="text-[#00f0ff] font-bold text-xs uppercase">{actor.id}</span>
            <span className="text-[#dbfcff] font-bold text-xs">({actor.handle})</span>
          </div>
          <span className="px-2 py-0.5 text-[9px] bg-[#4edea3]/20 text-[#4edea3] border border-[#4edea3]/40 font-bold uppercase">
            CONFIRMED TARGET
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsWhyLinkedOpen(true)}
            className="px-3 py-1 bg-[#00f0ff]/10 hover:bg-[#00f0ff]/20 text-[#00f0ff] border border-[#00f0ff]/40 text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">account_tree</span>
            WHY LINKED (EXPLAINABILITY)
          </button>

          <button
            onClick={() => onNavigate('graph')}
            className="px-3 py-1 bg-[#141923] hover:bg-[#262a33] text-[#dbfcff] border border-[#3b494b] text-xs flex items-center gap-1.5 transition-colors"
          >
            <span className="material-symbols-outlined text-[16px] text-[#00f0ff]">hub</span>
            TOPOLOGY GRAPH
          </button>

          <button
            onClick={() => setIsExportModalOpen(true)}
            className="px-3 py-1 bg-[#00f0ff] hover:bg-[#7df4ff] text-[#00363a] text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <span className="material-symbols-outlined text-[16px]">ios_share</span>
            EXPORT DOSSIER
          </button>
        </div>
      </div>

      {/* Target Identity Hero Card */}
      <div className="bg-[#0e131d] border border-[#3b494b] p-5 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#3b494b]/60 pb-4">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-16 h-16 rounded-sm bg-[#1b2230] border-2 border-[#00f0ff]/60 flex items-center justify-center text-[#00f0ff] text-2xl font-bold shrink-0 shadow-lg">
              {actor.handle.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl font-bold text-[#dbfcff] tracking-wide">
                  {actor.handle}
                </h1>
                <span className="text-xs text-[#849495]">({actor.id})</span>
                <span className="px-2 py-0.5 text-[9px] bg-[#ff5555]/20 text-[#ff5555] border border-[#ff5555]/40 font-bold uppercase">
                  THREAT: {actor.metrics.threatLevel}
                </span>
                <span className="px-2 py-0.5 text-[9px] bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/30 uppercase">
                  {actor.category.replace('-', ' ')}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#b9cacb] mt-1.5 flex-wrap">
                <span className="text-[#849495]">KNOWN ALIASES:</span>
                {actor.aliases.map((al, idx) => (
                  <span
                    key={idx}
                    className="px-1.5 py-0.5 bg-[#1e2532] text-[#dbfcff] border border-[#3b494b] text-[10px]"
                  >
                    {al}
                  </span>
                ))}
                <span className="text-[#849495] ml-2">OBSERVED TENURE:</span>
                <span className="text-[#dbfcff] font-bold">{actor.observedTenure}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-[#141923] p-3 border border-[#3b494b] self-start lg:self-auto">
            <div className="text-center px-3 border-r border-[#3b494b]">
              <div className="text-[10px] text-[#849495] uppercase">Confidence</div>
              <div className="text-lg font-bold text-[#4edea3]">
                {Math.round(actor.confidence * 100)}%
              </div>
            </div>
            <div className="text-center px-3 border-r border-[#3b494b]">
              <div className="text-[10px] text-[#849495] uppercase">Admissibility</div>
              <div className="text-lg font-bold text-[#00f0ff]">
                {actor.metrics.admissibility}%
              </div>
            </div>
            <div className="text-center px-2">
              <div className="text-[10px] text-[#849495] uppercase">Victims Link</div>
              <div className="text-sm font-bold text-[#ffb86c]">
                {actor.metrics.victims}
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Meta Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-4 text-xs">
          <div className="p-2.5 bg-[#141923] border border-[#3b494b]">
            <span className="text-[10px] text-[#849495] uppercase block">Primary Linguistic Dialect</span>
            <span className="text-[#dbfcff] font-bold mt-0.5 block">{actor.primaryDialect}</span>
          </div>

          <div className="p-2.5 bg-[#141923] border border-[#3b494b]">
            <span className="text-[10px] text-[#849495] uppercase block">Intercepted Communications</span>
            <span className="text-[#dbfcff] font-bold mt-0.5 block">{actor.interceptedPosts} posts / messages</span>
          </div>

          <div className="p-2.5 bg-[#141923] border border-[#3b494b]">
            <span className="text-[10px] text-[#849495] uppercase block">Escrow Deals Tracked</span>
            <span className="text-[#dbfcff] font-bold mt-0.5 block">{actor.escrowDeals} verified transactions</span>
          </div>

          <div className="p-2.5 bg-[#141923] border border-[#3b494b]">
            <span className="text-[10px] text-[#849495] uppercase block">Legal Admissibility Chain</span>
            <span className="text-[#4edea3] font-bold mt-0.5 block">Sec 65B Indian Ev. Act Certified</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Cryptographic Evidence & Infrastructure */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left Column: Cryptographic Keys & Wallets */}
        <div className="space-y-4">
          {/* PGP Keys */}
          <div className="bg-[#0e131d] border border-[#3b494b] p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-[#3b494b]/60 pb-2">
              <span className="font-bold text-[#dbfcff] text-xs uppercase flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#00f0ff] text-base">key</span>
                PGP Master Fingerprint &amp; Subkeys
              </span>
              <span className="text-[10px] text-[#4edea3]">Cryptographic Anchor</span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 bg-[#141923] border border-[#3b494b]">
                <div className="flex justify-between items-center text-[10px] text-[#849495] mb-1">
                  <span>MASTER RSA 4096 SIGNING KEY:</span>
                  <button
                    onClick={() => handleCopy(actor.pgpMasterKey, 'master')}
                    className="hover:text-[#00f0ff] text-[9px] flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[12px]">content_copy</span>
                    {copiedKey === 'master' ? 'COPIED' : 'COPY'}
                  </button>
                </div>
                <div className="font-mono text-[11px] text-[#00f0ff] break-all select-all font-bold">
                  {actor.pgpMasterKey}
                </div>
              </div>

              <div className="p-2.5 bg-[#141923] border border-[#3b494b]">
                <div className="flex justify-between items-center text-[10px] text-[#849495] mb-1">
                  <span>ED25519 SUBKEY IDENTIFIER:</span>
                  <span className="text-[#ffb86c] text-[9px]">ACTIVE IN LAST 48H</span>
                </div>
                <div className="font-mono text-[11px] text-[#dbfcff]">
                  {actor.pgpSubkey}
                </div>
              </div>
            </div>
          </div>

          {/* Monitored Wallets */}
          <div className="bg-[#0e131d] border border-[#3b494b] p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-[#3b494b]/60 pb-2">
              <span className="font-bold text-[#dbfcff] text-xs uppercase flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#00f0ff] text-base">currency_bitcoin</span>
                De-Anonymized Crypto Wallets &amp; Mixing Clusters
              </span>
              <span className="text-[10px] text-[#849495]">{actor.wallets.length} Monitored</span>
            </div>

            <div className="space-y-2">
              {actor.wallets.map((wallet, idx) => (
                <div key={idx} className="p-2.5 bg-[#141923] border border-[#3b494b] text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[#dbfcff] font-bold text-[11px]">{wallet.type}</span>
                    <span className="text-[10px] text-[#ffb86c] font-mono">{wallet.details}</span>
                  </div>
                  <div className="flex items-center justify-between gap-2 bg-[#0a0e16] p-1.5 border border-[#262a33]">
                    <span className="font-mono text-[10px] text-[#00f0ff] truncate select-all">
                      {wallet.address}
                    </span>
                    <button
                      onClick={() => handleCopy(wallet.address, `wallet-${idx}`)}
                      className="text-[#849495] hover:text-[#dbfcff] shrink-0 text-[10px]"
                    >
                      {copiedKey === `wallet-${idx}` ? 'COPIED' : 'COPY'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Infrastructure & Linked Personas */}
        <div className="space-y-4">
          {/* Attached Infrastructure */}
          <div className="bg-[#0e131d] border border-[#3b494b] p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-[#3b494b]/60 pb-2">
              <span className="font-bold text-[#dbfcff] text-xs uppercase flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#00f0ff] text-base">dns</span>
                Hosting Infrastructure &amp; Network Nodes
              </span>
              <button
                onClick={() => onNavigate('infrastructure')}
                className="text-[10px] text-[#00f0ff] hover:underline"
              >
                INFRA CONSOLE →
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 bg-[#141923] border border-[#3b494b]">
                <span className="text-[10px] text-[#849495] uppercase block">Hidden Service (.onion)</span>
                <span className="text-[#dbfcff] font-bold text-[11px] truncate block mt-0.5">
                  🧅 {actor.infrastructure.onion}
                </span>
              </div>

              <div className="p-2.5 bg-[#141923] border border-[#3b494b]">
                <span className="text-[10px] text-[#849495] uppercase block">De-Anonymized Clearnet IP</span>
                <span className="text-[#00f0ff] font-bold text-[11px] block mt-0.5">
                  {actor.infrastructure.clearnetIp}
                </span>
              </div>

              <div className="p-2.5 bg-[#141923] border border-[#3b494b] col-span-2">
                <div className="flex justify-between">
                  <span className="text-[10px] text-[#849495] uppercase">Autonomous System (ASN)</span>
                  <span className="text-[10px] text-[#4edea3]">Tor Exit Leak Verified</span>
                </div>
                <span className="text-[#dbfcff] text-[11px] font-mono mt-0.5 block">
                  {actor.infrastructure.asn}
                </span>
              </div>
            </div>
          </div>

          {/* Linked Persona Slide-Over Trigger Box */}
          <div className="bg-[#141923] border-2 border-[#00f0ff]/40 p-4 space-y-3 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-[#00f0ff] text-[#00363a] text-[9px] font-bold px-2 py-0.5 uppercase tracking-widest">
              PRIMARY CANDIDATE C-1042
            </div>

            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#00f0ff] text-xl">
                compare_arrows
              </span>
              <h3 className="font-bold text-[#dbfcff] text-xs uppercase tracking-wide">
                Linked Persona Correlation Matrix
              </h3>
            </div>

            <p className="text-[11px] text-[#b9cacb] leading-relaxed">
              Attribution analysis demonstrates a <span className="text-[#4edea3] font-bold">98.8% posterior probability</span> linking <span className="text-[#dbfcff] font-bold">ShadowVendor77</span> (MarketX) with <span className="text-[#dbfcff] font-bold">NightTrader</span> (Dread / Exploit.in).
            </p>

            <div className="p-2.5 bg-[#0e131d] border border-[#3b494b] flex items-center justify-between">
              <div>
                <div className="text-[10px] text-[#849495]">Confidence / Total LOR</div>
                <div className="text-sm font-bold text-[#4edea3]">89% (+2.85 Log-Odds)</div>
              </div>
              <div>
                <div className="text-[10px] text-[#849495]">Shared Factors</div>
                <div className="text-sm font-bold text-[#00f0ff]">PGP + Bitcoin + Syntax</div>
              </div>
              <button
                onClick={() => setIsWhyLinkedOpen(true)}
                className="px-3 py-1.5 bg-[#00f0ff] hover:bg-[#7df4ff] text-[#00363a] font-bold text-xs transition-colors flex items-center gap-1 shadow-sm"
              >
                <span>WHY LINKED?</span>
                <span className="material-symbols-outlined text-sm">open_in_new</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Slide-over & Modals */}
      <WhyLinkedSlideOver
        isOpen={isWhyLinkedOpen}
        onClose={() => setIsWhyLinkedOpen(false)}
        candidate={candidate}
      />

      <DossierExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        actor={actor}
      />
    </div>
  );
};

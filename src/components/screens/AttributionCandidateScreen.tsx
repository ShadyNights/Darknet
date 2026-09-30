import React, { useState } from 'react';
import { ATTRIBUTION_CANDIDATES } from '../../data/mockData';
import { ScreenId } from '../../types';
import { WhyLinkedSlideOver } from '../modals/WhyLinkedSlideOver';

interface AttributionCandidateScreenProps {
  candidateId: string;
  onNavigate: (screen: ScreenId) => void;
  onSelectActor?: (actorId: string) => void;
}

export const AttributionCandidateScreen: React.FC<AttributionCandidateScreenProps> = ({
  candidateId,
  onNavigate,
  onSelectActor,
}) => {
  const candidate =
    ATTRIBUTION_CANDIDATES.find((c) => c.id === candidateId) ||
    ATTRIBUTION_CANDIDATES[0];

  const [isWhyLinkedOpen, setIsWhyLinkedOpen] = useState(false);
  const [adjudicationStatus, setAdjudicationStatus] = useState<string>(candidate.status);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleAction = (status: string, message: string) => {
    setAdjudicationStatus(status);
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="flex flex-col w-full gap-4 pb-12 font-mono">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-14 right-6 z-50 bg-[#141923] border border-[#00f0ff] p-3 text-xs text-[#00f0ff] shadow-xl flex items-center gap-2 animate-in fade-in">
          <span className="material-symbols-outlined text-base">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Breadcrumb & Action Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#0a0e16] p-3 border border-[#3b494b]">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('attribution')}
            className="p-1 text-[#849495] hover:text-[#dbfcff] hover:bg-[#262a33] transition-colors"
          >
            <span className="material-symbols-outlined text-lg">arrow_back</span>
          </button>
          <div className="flex items-center gap-2">
            <span className="text-[#849495] text-xs">ATTRIBUTION /</span>
            <span className="text-[#00f0ff] font-bold text-xs uppercase">{candidate.id}</span>
            <span className="text-[#dbfcff] font-bold text-xs">
              ({candidate.personaA.handle} ↔ {candidate.personaB.handle})
            </span>
          </div>
          <span
            className={`px-2 py-0.5 text-[9px] font-bold border uppercase ${
              adjudicationStatus === 'Confirmed'
                ? 'bg-[#4edea3]/20 text-[#4edea3] border-[#4edea3]/40'
                : adjudicationStatus === 'Rejected'
                ? 'bg-[#ff5555]/20 text-[#ff5555] border-[#ff5555]/40'
                : 'bg-[#ffb86c]/20 text-[#ffb86c] border-[#ffb86c]/40'
            }`}
          >
            {adjudicationStatus}
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
            INSPECT GRAPH
          </button>
        </div>
      </div>

      {/* Hero Comparative Header */}
      <div className="grid grid-cols-1 md:grid-cols-7 gap-3 items-stretch">
        {/* Persona A Card */}
        <div className="md:col-span-3 bg-[#0e131d] border border-[#3b494b] p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-[#3b494b]/60 pb-2">
              <span className="text-[10px] text-[#849495] uppercase font-bold tracking-wider">
                PERSONA A (ORIGINATING ENTITY)
              </span>
              <span className="px-2 py-0.5 text-[9px] bg-[#4edea3]/20 text-[#4edea3] border border-[#4edea3]/40 font-bold">
                {candidate.personaA.status}
              </span>
            </div>

            <div className="flex items-center gap-3.5 mt-3">
              <div className="w-12 h-12 rounded-sm bg-[#1b2230] border border-[#00f0ff]/50 flex items-center justify-center text-[#00f0ff] font-bold text-lg">
                {candidate.personaA.handle.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <h2 className="text-base font-bold text-[#dbfcff]">
                  {candidate.personaA.handle}
                </h2>
                <div className="text-xs text-[#849495]">
                  Platform: <span className="text-[#00f0ff] font-bold">{candidate.personaA.platform}</span>
                </div>
                <div className="text-[10px] text-[#849495]">
                  ID: <span className="text-[#dbfcff] font-mono">{candidate.personaA.entId}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-1.5 text-xs">
              <div className="flex justify-between text-[#849495]">
                <span>First Observed:</span>
                <span className="text-[#dbfcff]">{candidate.personaA.firstSeen}</span>
              </div>
              <div className="flex justify-between text-[#849495]">
                <span>Last Observed:</span>
                <span className="text-[#dbfcff]">{candidate.personaA.lastSeen}</span>
              </div>
              <div className="flex justify-between text-[#849495]">
                <span>Listing Volume:</span>
                <span className="text-[#4edea3] font-bold">{candidate.personaA.listingVolume}</span>
              </div>
              <div className="flex justify-between text-[#849495]">
                <span>Target Focus:</span>
                <span className="text-[#dbfcff]">{candidate.personaA.target}</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#3b494b]/40">
            <span className="text-[10px] text-[#849495] uppercase block mb-1">PGP Key Footprint</span>
            <div className="p-1.5 bg-[#141923] text-[10px] text-[#00f0ff] font-mono break-all border border-[#262a33]">
              {candidate.personaA.pgp}
            </div>
          </div>
        </div>

        {/* Center Correlation Badge */}
        <div className="md:col-span-1 bg-[#141923] border border-[#3b494b] p-3 flex flex-col items-center justify-center text-center">
          <span className="material-symbols-outlined text-[#00f0ff] text-2xl mb-1">
            all_inclusive
          </span>
          <div className="text-[10px] text-[#849495] uppercase font-bold">MATCH SCORE</div>
          <div className="text-3xl font-bold text-[#4edea3] my-1">{candidate.score}%</div>
          <div className="text-xs font-bold text-[#00f0ff]">{candidate.totalLor} LOR</div>
          <div className="text-[9px] text-[#849495] mt-2">Bayesian Certainty: 98.8%</div>
          <div className="w-full h-1 bg-[#262a33] mt-2">
            <div className="h-full bg-[#4edea3]" style={{ width: `${candidate.score}%` }}></div>
          </div>
        </div>

        {/* Persona B Card */}
        <div className="md:col-span-3 bg-[#0e131d] border border-[#3b494b] p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-[#3b494b]/60 pb-2">
              <span className="text-[10px] text-[#849495] uppercase font-bold tracking-wider">
                PERSONA B (CORRELATED TARGET)
              </span>
              <span className="px-2 py-0.5 text-[9px] bg-[#4edea3]/20 text-[#4edea3] border border-[#4edea3]/40 font-bold">
                {candidate.personaB.status}
              </span>
            </div>

            <div className="flex items-center gap-3.5 mt-3">
              <div className="w-12 h-12 rounded-sm bg-[#1b2230] border border-[#ffb86c]/50 flex items-center justify-center text-[#ffb86c] font-bold text-lg">
                {candidate.personaB.handle.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <h2 className="text-base font-bold text-[#dbfcff]">
                  {candidate.personaB.handle}
                </h2>
                <div className="text-xs text-[#849495]">
                  Platform: <span className="text-[#ffb86c] font-bold">{candidate.personaB.platform}</span>
                </div>
                <div className="text-[10px] text-[#849495]">
                  ID: <span className="text-[#dbfcff] font-mono">{candidate.personaB.entId}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-1.5 text-xs">
              <div className="flex justify-between text-[#849495]">
                <span>First Observed:</span>
                <span className="text-[#dbfcff]">{candidate.personaB.firstSeen}</span>
              </div>
              <div className="flex justify-between text-[#849495]">
                <span>Last Observed:</span>
                <span className="text-[#dbfcff]">{candidate.personaB.lastSeen}</span>
              </div>
              <div className="flex justify-between text-[#849495]">
                <span>Listing Volume:</span>
                <span className="text-[#4edea3] font-bold">{candidate.personaB.listingVolume}</span>
              </div>
              <div className="flex justify-between text-[#849495]">
                <span>Target Focus:</span>
                <span className="text-[#dbfcff]">{candidate.personaB.target}</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#3b494b]/40">
            <span className="text-[10px] text-[#849495] uppercase block mb-1">PGP Key Footprint</span>
            <div className="p-1.5 bg-[#141923] text-[10px] text-[#ffb86c] font-mono break-all border border-[#262a33]">
              {candidate.personaB.pgp}
            </div>
          </div>
        </div>
      </div>

      {/* Deep Signal Comparison: Linguistic, Temporal, Blockchain */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Pillar 1: Stylometry & Linguistic Analysis */}
        <div className="bg-[#0e131d] border border-[#3b494b] p-4 space-y-3">
          <div className="flex items-center justify-between border-b border-[#3b494b]/60 pb-2">
            <span className="font-bold text-[#dbfcff] text-xs uppercase flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#00f0ff] text-base">spellcheck</span>
              1. Stylometric Dialectology
            </span>
            <span className="text-[10px] text-[#4edea3] font-bold">+1.42 LOR</span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-2 bg-[#141923] border border-[#3b494b]">
              <div className="text-[10px] text-[#849495] uppercase">Prepositional Idiosyncrasy</div>
              <div className="text-[#dbfcff] mt-0.5">
                Both personas repeatedly employ Indian Subcontinent dialectal tokens:
                <span className="text-[#00f0ff] font-bold"> &quot;kindly revert back&quot;</span>,
                <span className="text-[#00f0ff] font-bold"> &quot;preponed release&quot;</span>, and
                <span className="text-[#00f0ff] font-bold"> &quot;do the needful&quot;</span>.
              </div>
            </div>

            <div className="p-2 bg-[#141923] border border-[#3b494b]">
              <div className="text-[10px] text-[#849495] uppercase">Punctuation &amp; Whitespace Habit</div>
              <div className="text-[#dbfcff] mt-0.5">
                Double period omission (<code className="text-[#ffb86c]">..</code> instead of standard ellipsis <code className="text-[#ffb86c]">...</code>) observed in 82% of listing disclaimers on both forums.
              </div>
            </div>

            <div className="p-2 bg-[#141923] border border-[#3b494b]">
              <div className="flex justify-between text-[10px] text-[#849495]">
                <span>Cosine TF-IDF Vector Similarity:</span>
                <span className="text-[#4edea3] font-bold">94.2%</span>
              </div>
              <div className="w-full h-1.5 bg-[#262a33] mt-1">
                <div className="h-full bg-[#4edea3]" style={{ width: '94.2%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Pillar 2: Temporal Activity Histogram */}
        <div className="bg-[#0e131d] border border-[#3b494b] p-4 space-y-3">
          <div className="flex items-center justify-between border-b border-[#3b494b]/60 pb-2">
            <span className="font-bold text-[#dbfcff] text-xs uppercase flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#00f0ff] text-base">schedule</span>
              2. Temporal Sleep Cycle Overlap
            </span>
            <span className="text-[10px] text-[#4edea3] font-bold">+0.65 LOR</span>
          </div>

          <div className="space-y-2 text-xs">
            <p className="text-[#b9cacb] text-[11px]">
              Chronological post timestamps across 210 forum intercepts show strict circadian alignment:
            </p>

            <div className="p-2.5 bg-[#141923] border border-[#3b494b] space-y-2">
              <div className="text-[10px] text-[#849495] uppercase">Activity by Time Window (UTC)</div>
              {/* Visual simulated bar chart */}
              <div className="space-y-1 text-[10px]">
                <div className="flex items-center gap-2">
                  <span className="w-16 text-[#849495]">00-06 UTC</span>
                  <div className="flex-1 bg-[#262a33] h-2">
                    <div className="bg-[#ff5555] h-full" style={{ width: '8%' }}></div>
                  </div>
                  <span className="w-8 text-right text-[#849495]">8%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-16 text-[#849495]">06-12 UTC</span>
                  <div className="flex-1 bg-[#262a33] h-2">
                    <div className="bg-[#ffb86c] h-full" style={{ width: '28%' }}></div>
                  </div>
                  <span className="w-8 text-right text-[#849495]">28%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-16 text-[#00f0ff] font-bold">12-18 UTC</span>
                  <div className="flex-1 bg-[#262a33] h-2">
                    <div className="bg-[#00f0ff] h-full" style={{ width: '42%' }}></div>
                  </div>
                  <span className="w-8 text-right text-[#00f0ff] font-bold">42%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-16 text-[#4edea3] font-bold">18-24 UTC</span>
                  <div className="flex-1 bg-[#262a33] h-2">
                    <div className="bg-[#4edea3] h-full" style={{ width: '22%' }}></div>
                  </div>
                  <span className="w-8 text-right text-[#4edea3]">22%</span>
                </div>
              </div>
            </div>

            <div className="p-2 bg-[#141923] border border-[#3b494b] text-[10px]">
              <span className="text-[#849495]">Inferred Base Timezone: </span>
              <strong className="text-[#dbfcff]">UTC+05:30 (Indian Standard Time)</strong>
            </div>
          </div>
        </div>

        {/* Pillar 3 & 4: Blockchain & PGP Co-affinity */}
        <div className="bg-[#0e131d] border border-[#3b494b] p-4 space-y-3">
          <div className="flex items-center justify-between border-b border-[#3b494b]/60 pb-2">
            <span className="font-bold text-[#dbfcff] text-xs uppercase flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#00f0ff] text-base">link</span>
              3. UTXO &amp; Cryptographic Cluster
            </span>
            <span className="text-[10px] text-[#4edea3] font-bold">+0.78 LOR</span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-2 bg-[#141923] border border-[#3b494b]">
              <div className="text-[10px] text-[#849495] uppercase">CoinJoin Peel Chain Concurrence</div>
              <div className="text-[#dbfcff] mt-0.5">
                MarketX deposit TXID <code className="text-[#00f0ff]">7fa91...4e2</code> and Dread escrow payout TXID <code className="text-[#ffb86c]">01d89...c19</code> converged into the identical Wasabi CoinJoin mix pool within 3 blocks.
              </div>
            </div>

            <div className="p-2 bg-[#141923] border border-[#3b494b]">
              <div className="text-[10px] text-[#849495] uppercase">Subkey Digest Parity</div>
              <div className="text-[#dbfcff] mt-0.5">
                Shared Ed25519 signing key digest: <code className="text-[#4edea3]">SHA256: 8819af924...b901</code>.
                Random generation collision probability: <span className="text-[#ff5555]">1 in 10^77</span>.
              </div>
            </div>

            <div className="p-2 bg-[#141923] border border-[#3b494b]">
              <div className="text-[10px] text-[#849495] uppercase">Evidence Admissibility Certification</div>
              <div className="text-[#4edea3] font-bold mt-0.5">Section 65B Certificate #NTRO-EV-2026-992</div>
            </div>
          </div>
        </div>
      </div>

      {/* Adjudication Action Console */}
      <div className="bg-[#0e131d] border-2 border-[#00f0ff]/40 p-4 flex flex-wrap items-center justify-between gap-4 shadow-lg">
        <div>
          <h3 className="font-bold text-[#dbfcff] text-xs uppercase flex items-center gap-2">
            <span className="material-symbols-outlined text-[#00f0ff]">gavel</span>
            INVESTIGATIVE ADJUDICATION CONSOLE
          </h3>
          <p className="text-[11px] text-[#849495] mt-0.5">
            Adjudicating candidate C-1042 updates the sovereign actor registry and seals forensic chain-of-custody blocks.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={() => handleAction('Rejected', 'Candidate C-1042 dismissed and archived.')}
            className="px-4 py-2 border border-[#ff5555]/50 text-[#ff5555] hover:bg-[#ff5555]/10 text-xs font-bold transition-colors"
          >
            DISMISS / REJECT
          </button>

          <button
            onClick={() =>
              handleAction(
                'Under Adjudication',
                'Signal reconnaissance order dispatched to NTRO intercept mesh.'
              )
            }
            className="px-4 py-2 bg-[#141923] hover:bg-[#262a33] text-[#dbfcff] border border-[#3b494b] text-xs font-bold transition-colors flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px] text-[#ffb86c]">radar</span>
            REQUEST SIGNAL RECON
          </button>

          <button
            onClick={() => {
              handleAction('Confirmed', 'Attribution CONFIRMED! Linked into Sovereign Actor Registry.');
              if (onSelectActor) onSelectActor('A-0142');
            }}
            className="px-5 py-2 bg-[#00f0ff] hover:bg-[#7df4ff] text-[#00363a] text-xs font-bold transition-colors flex items-center gap-1.5 shadow-md"
          >
            <span className="material-symbols-outlined text-[16px]">verified</span>
            CONFIRM ATTRIBUTION (MERGE TO A-0142)
          </button>
        </div>
      </div>

      {/* Slide-over */}
      <WhyLinkedSlideOver
        isOpen={isWhyLinkedOpen}
        onClose={() => setIsWhyLinkedOpen(false)}
        candidate={candidate}
        onAdjudicate={(decision) => {
          if (decision === 'CONFIRMED') {
            handleAction('Confirmed', 'Attribution confirmed via explainability panel.');
          } else {
            handleAction('Rejected', 'Candidate rejected via explainability panel.');
          }
        }}
      />
    </div>
  );
};

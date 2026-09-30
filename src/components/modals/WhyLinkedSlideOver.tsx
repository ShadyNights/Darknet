import React from 'react';
import { AttributionCandidate } from '../../types';

interface WhyLinkedSlideOverProps {
  isOpen: boolean;
  onClose: () => void;
  candidate: AttributionCandidate | null;
  onAdjudicate?: (decision: 'CONFIRMED' | 'REJECTED') => void;
}

export const WhyLinkedSlideOver: React.FC<WhyLinkedSlideOverProps> = ({
  isOpen,
  onClose,
  candidate,
  onAdjudicate,
}) => {
  if (!isOpen || !candidate) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-xs flex justify-end transition-opacity duration-300">
      <div
        className="w-full max-w-2xl bg-[#0e131d] border-l border-[#3b494b] h-full flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-right duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="p-4 bg-[#141923] border-b border-[#3b494b] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[#00f0ff] text-2xl">
              account_tree
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#00f0ff] font-bold">
                  CORRELATION EXPLAINABILITY ENGINE
                </span>
                <span className="px-2 py-0.5 text-[9px] font-mono bg-[#4edea3]/20 text-[#4edea3] border border-[#4edea3]/40 font-bold">
                  CONFIDENCE: {candidate.score}%
                </span>
              </div>
              <h2 className="text-sm font-bold text-[#dbfcff] font-mono">
                WHY LINKED: {candidate.personaA.handle} ↔ {candidate.personaB.handle}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#849495] hover:text-[#dbfcff] hover:bg-[#262a33] transition-colors"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Content body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5 text-[#b9cacb] text-xs font-mono">
          {/* Quick Metrics Ribbon */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 bg-[#191e28] border border-[#3b494b]">
              <div className="text-[10px] text-[#849495] uppercase">Total Log-Odds (LOR)</div>
              <div className="text-lg font-bold text-[#4edea3] mt-0.5">{candidate.totalLor}</div>
              <div className="text-[9px] text-[#849495]">Bayesian Posterior: 0.988</div>
            </div>
            <div className="p-3 bg-[#191e28] border border-[#3b494b]">
              <div className="text-[10px] text-[#849495] uppercase">Vector Pillars</div>
              <div className="text-lg font-bold text-[#00f0ff] mt-0.5">{candidate.evidencePillars.length} / 4 Active</div>
              <div className="text-[9px] text-[#849495]">Independent Signal Paths</div>
            </div>
            <div className="p-3 bg-[#191e28] border border-[#3b494b]">
              <div className="text-[10px] text-[#849495] uppercase">Admissibility Rating</div>
              <div className="text-lg font-bold text-[#ffb86c] mt-0.5">Tier-1 Legal</div>
              <div className="text-[9px] text-[#849495]">Sec. 65B Indian Ev. Act</div>
            </div>
          </div>

          {/* Mathematical Likelihood Breakdown */}
          <div className="bg-[#141923] border border-[#3b494b] p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-[#3b494b]/60 pb-2">
              <span className="font-bold text-[#dbfcff] text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#00f0ff] text-base">functions</span>
                Multi-Factor Weight Distribution
              </span>
              <span className="text-[10px] text-[#849495]">Weights normalized against NTRO-V3 baseline</span>
            </div>

            <div className="space-y-3 pt-1">
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[#dbfcff]">1. Stylometric & Linguistic Dialectology</span>
                  <span className="text-[#4edea3] font-bold">+1.42 LOR (52% Contrib.)</span>
                </div>
                <div className="w-full h-2 bg-[#262a33] overflow-hidden">
                  <div className="h-full bg-[#00f0ff]" style={{ width: '52%' }}></div>
                </div>
                <p className="text-[10px] text-[#849495] mt-1">
                  Idiosyncratic Indian English prepositional syntax (&quot;revert back kindly&quot;, double punctuation &quot;..&quot;), zero Oxford comma, 94.2% cosine overlap in TF-IDF n-grams.
                </p>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[#dbfcff]">2. Cryptographic Key Ring Affinity</span>
                  <span className="text-[#4edea3] font-bold">+0.78 LOR (28% Contrib.)</span>
                </div>
                <div className="w-full h-2 bg-[#262a33] overflow-hidden">
                  <div className="h-full bg-[#ff79c6]" style={{ width: '28%' }}></div>
                </div>
                <p className="text-[10px] text-[#849495] mt-1">
                  Identical Ed25519 signing subkey digest referenced in MarketX escrow and Dread signature block. Creation timestamp within 14 seconds.
                </p>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[#dbfcff]">3. Blockchain UTXO Co-Spend Cluster</span>
                  <span className="text-[#4edea3] font-bold">+0.65 LOR (20% Contrib.)</span>
                </div>
                <div className="w-full h-2 bg-[#262a33] overflow-hidden">
                  <div className="h-full bg-[#ffb86c]" style={{ width: '20%' }}></div>
                </div>
                <p className="text-[10px] text-[#849495] mt-1">
                  Common wallet input in TXID <code className="text-[#dbfcff]">7fa910...4e2</code> merging deposit outputs into shared Wasabi CoinJoin mix address.
                </p>
              </div>
            </div>
          </div>

          {/* Evidence Pillars Deep Inspection */}
          <div className="space-y-2">
            <h3 className="font-bold text-[#dbfcff] text-[11px] uppercase tracking-wider flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#00f0ff] text-base">verified_user</span>
              Cryptographically Verified Pillars of Proof
            </h3>

            <div className="space-y-2.5">
              {candidate.evidencePillars.map((pillar, idx) => (
                <div key={idx} className="p-3 bg-[#141923] border border-[#3b494b] space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[#dbfcff] font-bold text-[11px]">{pillar.title}</span>
                    <span className="px-2 py-0.5 text-[9px] bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/30 font-bold">
                      {pillar.weight}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#b9cacb] leading-relaxed">
                    {pillar.description}
                  </p>
                  <div className="pt-1 flex items-center gap-2 text-[10px] text-[#849495] font-mono border-t border-[#3b494b]/40">
                    <span className="material-symbols-outlined text-[12px] text-[#4edea3]">lock</span>
                    <span className="text-[#849495]">PROOF DIGEST:</span>
                    <span className="text-[#dbfcff] break-all">{pillar.hashOrTx}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cross-Persona Matrix Comparison */}
          <div className="bg-[#141923] border border-[#3b494b] p-3 space-y-2">
            <div className="font-bold text-[#dbfcff] text-[11px] uppercase">
              Cross-Platform Temporal Correlation (IST/UTC)
            </div>
            <div className="p-2.5 bg-[#0a0e16] border border-[#262a33] text-[10px] space-y-1">
              <div className="flex justify-between text-[#849495]">
                <span>Activity Peak Window:</span>
                <span className="text-[#dbfcff] font-bold">14:00 - 21:00 UTC (19:30 - 02:30 IST)</span>
              </div>
              <div className="flex justify-between text-[#849495]">
                <span>Correlated Inactive Period:</span>
                <span className="text-[#dbfcff] font-bold">02:00 - 07:00 UTC (Night cycle in GMT+5:30)</span>
              </div>
              <div className="flex justify-between text-[#849495]">
                <span>Typing Speed / Keystroke Profile:</span>
                <span className="text-[#4edea3] font-bold">98.1% Biometric Congruence</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-[#141923] border-t border-[#3b494b] flex items-center justify-between gap-3">
          <button
            onClick={() => {
              if (onAdjudicate) onAdjudicate('REJECTED');
              onClose();
            }}
            className="px-4 py-2 border border-[#ff5555]/40 text-[#ff5555] hover:bg-[#ff5555]/10 text-xs font-mono font-bold transition-colors"
          >
            DISMISS CANDIDATE
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-[#262a33] hover:bg-[#3b494b] text-[#dbfcff] text-xs font-mono transition-colors"
            >
              CLOSE
            </button>
            <button
              onClick={() => {
                if (onAdjudicate) onAdjudicate('CONFIRMED');
                onClose();
              }}
              className="px-4 py-2 bg-[#00f0ff] hover:bg-[#7df4ff] text-[#00363a] text-xs font-mono font-bold transition-colors shadow-sm flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">verified</span>
              CONFIRM ATTRIBUTION
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

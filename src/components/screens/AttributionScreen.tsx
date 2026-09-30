import React, { useState } from 'react';
import { ATTRIBUTION_CANDIDATES } from '../../data/mockData';
import { ScreenId, AttributionCandidate } from '../../types';
import { WhyLinkedSlideOver } from '../modals/WhyLinkedSlideOver';

interface AttributionScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onSelectCandidate: (candidateId: string) => void;
}

export const AttributionScreen: React.FC<AttributionScreenProps> = ({
  onNavigate,
  onSelectCandidate,
}) => {
  const [activeTab, setActiveTab] = useState<'ALL' | 'PENDING' | 'ADJUDICATION' | 'CONFIRMED'>('ALL');
  const [selectedCandidateForSlideOver, setSelectedCandidateForSlideOver] =
    useState<AttributionCandidate | null>(null);

  const filteredCandidates = ATTRIBUTION_CANDIDATES.filter((c) => {
    if (activeTab === 'ALL') return true;
    if (activeTab === 'PENDING') return c.status === 'Pending Review';
    if (activeTab === 'ADJUDICATION') return c.status === 'Under Adjudication';
    if (activeTab === 'CONFIRMED') return c.status === 'Confirmed';
    return true;
  });

  return (
    <div className="flex flex-col w-full gap-4 pb-12 font-mono">
      {/* Top Banner Ribbon */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#0a0e16] p-3 border border-[#3b494b]">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-[#262a33] text-[#dbfcff] border border-[#3b494b]">
            <span className="material-symbols-outlined text-[16px] text-[#00f0ff]">
              compare_arrows
            </span>
            <span className="text-[11px] font-bold tracking-wider uppercase">
              PERSONA LINKAGE // ATTRIBUTION QUEUE
            </span>
          </div>
          <span className="text-xs text-[#849495]">
            BAYESIAN LOG-ODDS HEURISTICS ENGINE V3.2
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('graph')}
            className="px-3 py-1 bg-[#141923] hover:bg-[#262a33] border border-[#3b494b] text-xs text-[#dbfcff] flex items-center gap-1.5 transition-colors"
          >
            <span className="material-symbols-outlined text-[14px] text-[#00f0ff]">hub</span>
            CORRELATION GRAPH
          </button>
        </div>
      </div>

      {/* KPI Ribbon */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-[#0e131d] border border-[#3b494b] p-3.5 flex flex-col justify-between">
          <div className="text-[10px] text-[#849495] uppercase tracking-wider flex items-center justify-between">
            <span>Pending Adjudication</span>
            <span className="material-symbols-outlined text-[#ffb86c] text-base">hourglass_top</span>
          </div>
          <div className="text-2xl font-bold text-[#ffb86c] mt-1">7</div>
          <div className="text-[10px] text-[#849495] mt-1">Require senior investigator signoff</div>
        </div>

        <div className="bg-[#0e131d] border border-[#3b494b] p-3.5 flex flex-col justify-between">
          <div className="text-[10px] text-[#849495] uppercase tracking-wider flex items-center justify-between">
            <span>High Confidence (&gt;85%)</span>
            <span className="material-symbols-outlined text-[#4edea3] text-base">verified</span>
          </div>
          <div className="text-2xl font-bold text-[#4edea3] mt-1">4</div>
          <div className="text-[10px] text-[#849495] mt-1">Tri-vector cryptographic concurrence</div>
        </div>

        <div className="bg-[#0e131d] border border-[#3b494b] p-3.5 flex flex-col justify-between">
          <div className="text-[10px] text-[#849495] uppercase tracking-wider flex items-center justify-between">
            <span>Average Log-Odds Ratio</span>
            <span className="material-symbols-outlined text-[#00f0ff] text-base">calculate</span>
          </div>
          <div className="text-2xl font-bold text-[#00f0ff] mt-1">+2.42</div>
          <div className="text-[10px] text-[#849495] mt-1">Posterior probability ~98.1%</div>
        </div>

        <div className="bg-[#0e131d] border border-[#3b494b] p-3.5 flex flex-col justify-between">
          <div className="text-[10px] text-[#849495] uppercase tracking-wider flex items-center justify-between">
            <span>Adjudicated This Week</span>
            <span className="material-symbols-outlined text-[#dbfcff] text-base">task_alt</span>
          </div>
          <div className="text-2xl font-bold text-[#dbfcff] mt-1">19</div>
          <div className="text-[10px] text-[#849495] mt-1">Added to Sovereign Evidence Chain</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#3b494b] bg-[#0a0e16] p-1 gap-1">
        {(['ALL', 'PENDING', 'ADJUDICATION', 'CONFIRMED'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-xs font-bold transition-colors ${
              activeTab === tab
                ? 'bg-[#141923] text-[#00f0ff] border-b-2 border-[#00f0ff]'
                : 'text-[#849495] hover:text-[#dbfcff]'
            }`}
          >
            {tab === 'ALL'
              ? 'ALL CANDIDATES'
              : tab === 'PENDING'
              ? 'PENDING REVIEW (5)'
              : tab === 'ADJUDICATION'
              ? 'UNDER ADJUDICATION (2)'
              : 'CONFIRMED (12)'}
          </button>
        ))}
      </div>

      {/* Candidate Cards / Table */}
      <div className="space-y-3">
        {filteredCandidates.map((candidate) => (
          <div
            key={candidate.id}
            className="bg-[#0e131d] border border-[#3b494b] hover:border-[#00f0ff]/50 p-4 transition-all duration-150 space-y-3"
          >
            {/* Header line of candidate card */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#3b494b]/40 pb-2.5">
              <div className="flex items-center gap-2.5">
                <span className="font-bold text-[#00f0ff] text-xs">{candidate.id}</span>
                <span className="text-[10px] text-[#849495]">THREAT CLASS:</span>
                <span className="px-1.5 py-0.5 bg-[#ff5555]/20 text-[#ff5555] border border-[#ff5555]/40 text-[9px] font-bold uppercase">
                  {candidate.threatClass}
                </span>
                <span className="text-[10px] text-[#849495]">• Age: {candidate.age}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] text-[#849495]">STATUS:</span>
                <span
                  className={`px-2 py-0.5 text-[9px] font-bold border uppercase ${
                    candidate.status === 'Confirmed'
                      ? 'bg-[#4edea3]/20 text-[#4edea3] border-[#4edea3]/40'
                      : candidate.status === 'Under Adjudication'
                      ? 'bg-[#ffb86c]/20 text-[#ffb86c] border-[#ffb86c]/40'
                      : 'bg-[#262a33] text-[#dbfcff] border-[#3b494b]'
                  }`}
                >
                  {candidate.status}
                </span>
              </div>
            </div>

            {/* Persona A vs Persona B Visual Bridge */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-center">
              {/* Persona A */}
              <div className="md:col-span-2 p-3 bg-[#141923] border border-[#3b494b] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-sm bg-[#1b2230] border border-[#3b494b] flex items-center justify-center text-[#dbfcff] font-bold text-sm">
                    {candidate.personaA.handle.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="font-bold text-[#dbfcff] text-xs">
                      {candidate.personaA.handle}
                    </div>
                    <div className="text-[10px] text-[#849495]">
                      Platform: <span className="text-[#00f0ff]">{candidate.personaA.platform}</span>
                    </div>
                    <div className="text-[9px] text-[#849495]">
                      Active: {candidate.personaA.firstSeen} — {candidate.personaA.lastSeen}
                    </div>
                  </div>
                </div>
                <div className="text-right text-[10px] text-[#b9cacb]">
                  <div className="text-[#4edea3] font-bold">{candidate.personaA.listingVolume}</div>
                  <div className="text-[9px] text-[#849495]">{candidate.personaA.status}</div>
                </div>
              </div>

              {/* Correlation Score Centerpiece */}
              <div className="md:col-span-1 flex flex-col items-center justify-center text-center p-2 bg-[#0a0e16] border border-[#3b494b]">
                <div className="text-[9px] text-[#849495] uppercase">Match Score</div>
                <div className="text-xl font-bold text-[#4edea3]">{candidate.score}%</div>
                <div className="text-[9px] text-[#00f0ff] font-bold">{candidate.totalLor} LOR</div>
                <div className="flex gap-1 mt-1">
                  {candidate.vectors.slice(0, 3).map((v, i) => (
                    <span
                      key={i}
                      className="px-1 py-0.2 text-[8px] bg-[#262a33] text-[#b9cacb] border border-[#3b494b]"
                    >
                      {v.substring(0, 4)}
                    </span>
                  ))}
                </div>
              </div>

              {/* Persona B */}
              <div className="md:col-span-2 p-3 bg-[#141923] border border-[#3b494b] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-sm bg-[#1b2230] border border-[#3b494b] flex items-center justify-center text-[#dbfcff] font-bold text-sm">
                    {candidate.personaB.handle.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="font-bold text-[#dbfcff] text-xs">
                      {candidate.personaB.handle}
                    </div>
                    <div className="text-[10px] text-[#849495]">
                      Platform: <span className="text-[#ffb86c]">{candidate.personaB.platform}</span>
                    </div>
                    <div className="text-[9px] text-[#849495]">
                      Active: {candidate.personaB.firstSeen} — {candidate.personaB.lastSeen}
                    </div>
                  </div>
                </div>
                <div className="text-right text-[10px] text-[#b9cacb]">
                  <div className="text-[#4edea3] font-bold">{candidate.personaB.listingVolume}</div>
                  <div className="text-[9px] text-[#849495]">{candidate.personaB.status}</div>
                </div>
              </div>
            </div>

            {/* Evidence summary & Quick Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1 text-xs">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] text-[#849495]">EVIDENCE PILLARS:</span>
                {candidate.evidencePillars.map((p, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 bg-[#141923] text-[#dbfcff] border border-[#3b494b] text-[10px]"
                  >
                    {p.title}: <strong className="text-[#4edea3]">{p.weight}</strong>
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedCandidateForSlideOver(candidate)}
                  className="px-3 py-1 bg-[#141923] hover:bg-[#262a33] text-[#00f0ff] border border-[#00f0ff]/40 text-xs font-bold transition-colors flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[14px]">account_tree</span>
                  WHY LINKED
                </button>

                <button
                  onClick={() => {
                    onSelectCandidate(candidate.id);
                    onNavigate('attribution-candidate');
                  }}
                  className="px-3 py-1 bg-[#00f0ff] hover:bg-[#7df4ff] text-[#00363a] text-xs font-bold transition-colors flex items-center gap-1 shadow-sm"
                >
                  DEEP ADJUDICATE
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Slide-over */}
      <WhyLinkedSlideOver
        isOpen={Boolean(selectedCandidateForSlideOver)}
        onClose={() => setSelectedCandidateForSlideOver(null)}
        candidate={selectedCandidateForSlideOver}
      />
    </div>
  );
};

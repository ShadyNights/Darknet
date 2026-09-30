import React, { useState } from 'react';
import { INFRASTRUCTURE_CANDIDATES } from '../../data/mockData';
import { ScreenId } from '../../types';

interface InfrastructureScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onSelectActor?: (actorId: string) => void;
}

export const InfrastructureScreen: React.FC<InfrastructureScreenProps> = ({
  onNavigate,
  onSelectActor,
}) => {
  const [selectedCandidateId, setSelectedCandidateId] = useState<string>('INF-9921');
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const candidate =
    INFRASTRUCTURE_CANDIDATES.find((c) => c.id === selectedCandidateId) ||
    INFRASTRUCTURE_CANDIDATES[0];

  const handleAction = (msg: string) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(null), 3000);
  };

  return (
    <div className="flex flex-col w-full gap-4 pb-12 font-mono">
      {/* Notice Banner */}
      {actionNotice && (
        <div className="fixed top-14 right-6 z-50 bg-[#141923] border border-[#00f0ff] p-3 text-xs text-[#00f0ff] shadow-xl flex items-center gap-2 animate-in fade-in">
          <span className="material-symbols-outlined text-base">check_circle</span>
          <span>{actionNotice}</span>
        </div>
      )}

      {/* Top Banner Ribbon */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#0a0e16] p-3 border border-[#3b494b]">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-[#262a33] text-[#dbfcff] border border-[#3b494b]">
            <span className="material-symbols-outlined text-[16px] text-[#00f0ff]">
              dns
            </span>
            <span className="text-[11px] font-bold tracking-wider uppercase">
              INFRASTRUCTURE CORRELATION &amp; DE-ANONYMIZATION
            </span>
          </div>
          <span className="text-xs text-[#849495]">
            TOR V3 HIDDEN SERVICE ↔ CLEARNET SERVER CORRELATOR
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('graph')}
            className="px-3 py-1 bg-[#141923] hover:bg-[#262a33] border border-[#3b494b] text-xs text-[#dbfcff] flex items-center gap-1.5 transition-colors"
          >
            <span className="material-symbols-outlined text-[14px] text-[#00f0ff]">hub</span>
            TOPOLOGY GRAPH
          </button>
        </div>
      </div>

      {/* Candidate Selector Ribbon */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {INFRASTRUCTURE_CANDIDATES.map((item) => (
          <button
            key={item.id}
            onClick={() => setSelectedCandidateId(item.id)}
            className={`px-3 py-2 text-xs border text-left shrink-0 transition-colors ${
              selectedCandidateId === item.id
                ? 'border-[#00f0ff] bg-[#141923] text-[#dbfcff]'
                : 'border-[#3b494b] bg-[#0e131d] text-[#849495] hover:border-[#849495]'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#00f0ff]">{item.id}</span>
              <span className="text-[10px] text-[#4edea3] font-bold">{item.score}% MATCH</span>
            </div>
            <div className="text-[10px] text-[#849495] truncate max-w-[220px]">
              🧅 {item.onion}
            </div>
          </button>
        ))}
      </div>

      {/* Hero Correlation Bridge Card */}
      <div className="bg-[#0e131d] border border-[#3b494b] p-5">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#3b494b]/60 pb-3 mb-4">
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-[#dbfcff]">
              CORRELATION TARGET: <span className="text-[#00f0ff]">{candidate.id}</span>
            </span>
            <span className="px-2 py-0.5 text-[9px] bg-[#ff5555]/20 text-[#ff5555] border border-[#ff5555]/40 font-bold uppercase">
              HIGH CONFIDENCE UNMASKING
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="text-[#849495]">ACTIVE VECTORS:</span>
            <span className="text-[#4edea3] font-bold">{candidate.vectorsCount} Signals</span>
            <span className="text-[#849495]">|</span>
            <span className="text-[#849495]">GEO:</span>
            <span className="text-[#dbfcff] font-bold">{candidate.geo}</span>
          </div>
        </div>

        {/* Onion to Clearnet Visual Split */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
          {/* Onion Left */}
          <div className="md:col-span-2 p-4 bg-[#141923] border border-[#3b494b] space-y-2">
            <div className="flex items-center justify-between border-b border-[#3b494b]/40 pb-1.5">
              <span className="text-[10px] text-[#849495] uppercase font-bold">
                TOR V3 HIDDEN SERVICE
              </span>
              <span className="text-[9px] text-[#4edea3] font-bold">ONLINE</span>
            </div>
            <div className="text-xs text-[#00f0ff] font-bold break-all">
              🧅 {candidate.onion}
            </div>
            <div className="space-y-1 text-[10px] text-[#849495] pt-1">
              <div>Rendezvous Nodes: <span className="text-[#dbfcff]">{candidate.descriptors.rendezvous}</span></div>
              <div>Descr Hash: <span className="text-[#dbfcff] font-mono">{candidate.descriptors.descrHash}</span></div>
              <div>First Registered: <span className="text-[#dbfcff]">{candidate.descriptors.firstRecord}</span></div>
            </div>
          </div>

          {/* Unmasking Arrow Center */}
          <div className="md:col-span-1 flex flex-col items-center justify-center text-center p-3 bg-[#0a0e16] border border-[#3b494b]">
            <span className="material-symbols-outlined text-[#00f0ff] text-2xl animate-pulse">
              leak_add
            </span>
            <div className="text-[10px] text-[#849495] uppercase font-bold mt-1">CONFIDENCE</div>
            <div className="text-2xl font-bold text-[#4edea3]">{candidate.score}%</div>
            <div className="text-[9px] text-[#849495] mt-1">4 Independent Leaks</div>
          </div>

          {/* Clearnet Right */}
          <div className="md:col-span-2 p-4 bg-[#141923] border border-[#3b494b] space-y-2">
            <div className="flex items-center justify-between border-b border-[#3b494b]/40 pb-1.5">
              <span className="text-[10px] text-[#849495] uppercase font-bold">
                DE-ANONYMIZED CLEARNET IP
              </span>
              <span className="text-[9px] text-[#ff5555] font-bold">ACTIVE HOST</span>
            </div>
            <div className="text-base text-[#dbfcff] font-bold font-mono">
              🌐 {candidate.clearnetIp}
            </div>
            <div className="space-y-1 text-[10px] text-[#849495] pt-1">
              <div>Host / PTR: <span className="text-[#00f0ff] font-mono">{candidate.descriptors.ptr}</span></div>
              <div>Autonomous System: <span className="text-[#dbfcff]">{candidate.asn}</span></div>
              <div>Location: <span className="text-[#dbfcff]">{candidate.geo}</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* Forensic Indicators Table */}
      <div className="bg-[#0e131d] border border-[#3b494b] p-4 space-y-3">
        <div className="flex items-center justify-between border-b border-[#3b494b]/60 pb-2">
          <span className="font-bold text-[#dbfcff] text-xs uppercase flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#00f0ff] text-base">verified_user</span>
            Forensic Technical Proof Vectors
          </span>
          <span className="text-[10px] text-[#849495]">Section 65B Admissible Indicators</span>
        </div>

        <div className="space-y-2.5">
          {candidate.indicators.map((ind, idx) => (
            <div
              key={idx}
              className="p-3 bg-[#141923] border border-[#3b494b] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#dbfcff] text-[11px]">{ind.name}</span>
                  <span className="px-1.5 py-0.5 bg-[#262a33] text-[#00f0ff] text-[9px] font-bold border border-[#3b494b]">
                    {ind.type}
                  </span>
                </div>
                <div className="text-[#b9cacb] text-[11px]">{ind.detail}</div>
                <div className="text-[10px] text-[#849495] font-mono break-all">
                  {ind.subDetail}
                </div>
              </div>

              <div className="text-right shrink-0">
                <div className="text-[10px] text-[#849495]">Weight Score</div>
                <div className="text-base font-bold text-[#4edea3]">+{ind.points} pts</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Adjudication & Takedown Console */}
      <div className="bg-[#0e131d] border-2 border-[#00f0ff]/40 p-4 flex flex-wrap items-center justify-between gap-3 shadow-lg">
        <div>
          <h3 className="font-bold text-[#dbfcff] text-xs uppercase flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#00f0ff] text-base">shield</span>
            SOVEREIGN INTERCEPT &amp; ADJUDICATION DIRECTIVE
          </h3>
          <p className="text-[11px] text-[#849495] mt-0.5">
            Deploy legal notices or seal network correlation into target dossier A-0142.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={() => handleAction('Sec 69A IT Act Takedown Warrant Dispatched to ISP.')}
            className="px-4 py-2 border border-[#ff5555]/50 text-[#ff5555] hover:bg-[#ff5555]/10 text-xs font-bold transition-colors"
          >
            ISSUE TAKEDOWN / INTERCEPT
          </button>

          <button
            onClick={() => {
              handleAction('Infrastructure linked to Actor A-0142 (ShadowVendor77)');
              if (onSelectActor) onSelectActor('A-0142');
              onNavigate('actor-detail');
            }}
            className="px-5 py-2 bg-[#00f0ff] hover:bg-[#7df4ff] text-[#00363a] text-xs font-bold transition-colors flex items-center gap-1.5 shadow-md"
          >
            <span className="material-symbols-outlined text-[16px]">link</span>
            BIND TO DOSSIER A-0142
          </button>
        </div>
      </div>
    </div>
  );
};

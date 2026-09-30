import React, { useState } from 'react';
import { CASE_FILES } from '../../data/mockData';
import { ScreenId } from '../../types';
import { ExportCaseModal } from '../modals/ExportCaseModal';

interface CaseDetailScreenProps {
  caseId: string;
  onNavigate: (screen: ScreenId) => void;
  onSelectActor?: (actorId: string) => void;
}

export const CaseDetailScreen: React.FC<CaseDetailScreenProps> = ({
  caseId,
  onNavigate,
  onSelectActor,
}) => {
  const caseFile =
    CASE_FILES.find((c) => c.id === caseId) || CASE_FILES[0];

  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [copiedHash, setCopiedHash] = useState<string | null>(null);
  const [showAddExhibit, setShowAddExhibit] = useState(false);
  const [newExhibitSource, setNewExhibitSource] = useState('');
  const [newExhibitDesc, setNewExhibitDesc] = useState('');
  const [evidencesList, setEvidencesList] = useState(caseFile.evidences);

  const handleCopy = (hash: string, id: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(id);
    setTimeout(() => setCopiedHash(null), 1500);
  };

  const handleAddExhibit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExhibitSource.trim() || !newExhibitDesc.trim()) return;

    // Simulated SHA-256 hash generator
    const randomHash = Array.from({ length: 64 }, () =>
      Math.floor(Math.random() * 16).toString(16)
    ).join('');

    const newEx = {
      id: `EX-${Math.floor(10000 + Math.random() * 90000)}`,
      source: newExhibitSource,
      description: newExhibitDesc,
      hashMatch: randomHash,
    };

    setEvidencesList([newEx, ...evidencesList]);
    setShowAddExhibit(false);
    setNewExhibitSource('');
    setNewExhibitDesc('');
  };

  return (
    <div className="flex flex-col w-full gap-4 pb-12 font-mono">
      {/* Top Banner Ribbon */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#0a0e16] p-3 border border-[#3b494b]">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('cases')}
            className="p-1 text-[#849495] hover:text-[#dbfcff] hover:bg-[#262a33] transition-colors"
          >
            <span className="material-symbols-outlined text-lg">arrow_back</span>
          </button>
          <div className="flex items-center gap-2">
            <span className="text-[#849495] text-xs">CASE FILE /</span>
            <span className="text-[#00f0ff] font-bold text-xs">{caseFile.id}</span>
            <span className="text-[#dbfcff] font-bold text-xs">({caseFile.title})</span>
          </div>
          <span className="px-2 py-0.5 text-[9px] bg-[#ff5555]/20 text-[#ff5555] border border-[#ff5555]/40 font-bold uppercase">
            {caseFile.classification}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAddExhibit(true)}
            className="px-3 py-1 bg-[#141923] hover:bg-[#262a33] text-[#dbfcff] border border-[#3b494b] text-xs flex items-center gap-1.5 transition-colors"
          >
            <span className="material-symbols-outlined text-[16px] text-[#00f0ff]">post_add</span>
            ADD EXHIBIT
          </button>

          <button
            onClick={() => setIsExportModalOpen(true)}
            className="px-3 py-1 bg-[#00f0ff] hover:bg-[#7df4ff] text-[#00363a] font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <span className="material-symbols-outlined text-[16px]">ios_share</span>
            EXPORT CASE DOSSIER
          </button>
        </div>
      </div>

      {/* Case Overview Card */}
      <div className="bg-[#0e131d] border border-[#3b494b] p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#3b494b]/60 pb-3">
          <div>
            <h1 className="text-lg font-bold text-[#dbfcff]">
              {caseFile.title}
            </h1>
            <p className="text-xs text-[#849495] mt-0.5">
              LEAD INVESTIGATOR: <span className="text-[#dbfcff] font-bold">{caseFile.leadInvestigator}</span> · DATE SEALED: <span className="text-[#00f0ff]">{caseFile.createdDate}</span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (onSelectActor) onSelectActor(caseFile.primaryActorId);
                onNavigate('actor-detail');
              }}
              className="px-3 py-1 bg-[#141923] hover:bg-[#262a33] text-[#00f0ff] border border-[#00f0ff]/40 text-xs font-bold transition-colors"
            >
              PRIMARY TARGET DOSSIER ({caseFile.primaryActorId}) →
            </button>
          </div>
        </div>

        <p className="text-xs text-[#b9cacb] leading-relaxed">
          {caseFile.targetSynopsis}
        </p>

        {/* Case Metrics Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
          <div className="p-2.5 bg-[#141923] border border-[#3b494b]">
            <span className="text-[10px] text-[#849495] uppercase block">Exfiltrated Data Volume</span>
            <span className="text-[#ffb86c] font-bold text-sm mt-0.5 block">{caseFile.exfiltratedVolume}</span>
          </div>

          <div className="p-2.5 bg-[#141923] border border-[#3b494b]">
            <span className="text-[10px] text-[#849495] uppercase block">Monitored Wallet Cluster</span>
            <span className="text-[#00f0ff] font-bold text-sm mt-0.5 block">{caseFile.walletsCluster}</span>
          </div>

          <div className="p-2.5 bg-[#141923] border border-[#3b494b]">
            <span className="text-[10px] text-[#849495] uppercase block">Chain of Custody Legal Seal</span>
            <span className="text-[#4edea3] font-bold text-sm mt-0.5 block">Sec. 65B Indian Evidence Act Valid</span>
          </div>
        </div>
      </div>

      {/* Evidence Repository Section */}
      <div className="bg-[#0e131d] border border-[#3b494b] p-4 space-y-3">
        <div className="flex items-center justify-between border-b border-[#3b494b]/60 pb-2">
          <span className="font-bold text-[#dbfcff] text-xs uppercase flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#00f0ff] text-base">verified</span>
            Evidentiary Exhibits Repository ({evidencesList.length} Sealed Items)
          </span>
          <span className="text-[10px] text-[#849495]">All artifacts anchored to Merkle Root</span>
        </div>

        <div className="space-y-2.5">
          {evidencesList.map((ev) => (
            <div
              key={ev.id}
              className="p-3 bg-[#141923] border border-[#3b494b] text-xs space-y-2"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#00f0ff] text-[11px]">{ev.id}</span>
                  <span className="px-1.5 py-0.2 bg-[#262a33] text-[#dbfcff] text-[9px] border border-[#3b494b]">
                    {ev.source}
                  </span>
                </div>
                <span className="text-[9px] text-[#4edea3] font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[12px]">lock</span>
                  CRYPTOGRAPHICALLY SEALED
                </span>
              </div>

              <div className="text-[#b9cacb] text-xs leading-relaxed">
                {ev.description}
              </div>

              <div className="flex items-center justify-between gap-2 p-1.5 bg-[#0a0e16] border border-[#262a33] text-[10px]">
                <div className="flex items-center gap-2 overflow-hidden">
                  <span className="text-[#849495] shrink-0">SHA-256 SEAL:</span>
                  <code className="text-[#4edea3] truncate select-all">{ev.hashMatch}</code>
                </div>
                <button
                  onClick={() => handleCopy(ev.hashMatch, ev.id)}
                  className="text-[#849495] hover:text-[#00f0ff] shrink-0"
                >
                  {copiedHash === ev.id ? 'COPIED' : 'COPY'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Exhibit Modal */}
      {showAddExhibit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4">
          <form
            onSubmit={handleAddExhibit}
            className="bg-[#0e131d] border border-[#3b494b] w-full max-w-md p-5 space-y-4 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-[#3b494b] pb-2">
              <span className="font-bold text-[#dbfcff] text-sm flex items-center gap-2">
                <span className="material-symbols-outlined text-[#00f0ff] text-base">add_moderator</span>
                ATTACH EVIDENCE EXHIBIT
              </span>
              <button
                type="button"
                onClick={() => setShowAddExhibit(false)}
                className="text-[#849495] hover:text-[#dbfcff]"
              >
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-[10px] text-[#849495] uppercase block mb-1">
                  EVIDENTIARY SOURCE / COLLECTION PLATFORM:
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. MarketX Escrow Dump / Tor Intercept"
                  value={newExhibitSource}
                  onChange={(e) => setNewExhibitSource(e.target.value)}
                  className="w-full bg-[#141923] border border-[#3b494b] p-2 text-xs text-[#dbfcff] focus:outline-hidden focus:border-[#00f0ff]"
                />
              </div>

              <div>
                <label className="text-[10px] text-[#849495] uppercase block mb-1">
                  EXHIBIT FORENSIC DESCRIPTION:
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Detail forensic artifacts, extraction parameters, and actor correlation..."
                  value={newExhibitDesc}
                  onChange={(e) => setNewExhibitDesc(e.target.value)}
                  className="w-full bg-[#141923] border border-[#3b494b] p-2 text-xs text-[#dbfcff] focus:outline-hidden focus:border-[#00f0ff]"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#3b494b]/60">
              <button
                type="button"
                onClick={() => setShowAddExhibit(false)}
                className="px-3 py-1.5 bg-[#262a33] text-[#dbfcff] text-xs hover:bg-[#3b494b]"
              >
                CANCEL
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-[#00f0ff] hover:bg-[#7df4ff] text-[#00363a] font-bold text-xs"
              >
                NOTARIZE &amp; SEAL EXHIBIT
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Export Case Modal */}
      <ExportCaseModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        caseFile={caseFile}
      />
    </div>
  );
};

import React, { useState } from 'react';
import { CASE_FILES } from '../../data/mockData';
import { ScreenId, CaseFile } from '../../types';

interface CasesScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onSelectCase: (caseId: string) => void;
}

export const CasesScreen: React.FC<CasesScreenProps> = ({
  onNavigate,
  onSelectCase,
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [showNewModal, setShowNewModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newTarget, setNewTarget] = useState('');
  const [casesList, setCasesList] = useState<CaseFile[]>(CASE_FILES);

  const handleCreateCase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newCase: CaseFile = {
      id: `C-2026-${String(casesList.length + 1).padStart(3, '0')}`,
      title: newTitle,
      targetSynopsis: newTarget || 'Active threat actor surveillance.',
      actorsCount: 1,
      evidenceCount: 1,
      updatedUtc: 'Just now',
      classification: 'SECRET // REL TO IND/NTRO',
      status: 'ACTIVE',
      leadInvestigator: 'analyst01@ntro.gov.in',
      createdDate: new Date().toISOString().split('T')[0],
      primaryActorId: 'A-0142',
      walletsCluster: 'Unassigned',
      exfiltratedVolume: 'Pending Ingestion',
      evidences: [
        {
          id: 'EX-INIT-01',
          description: 'Initial reconnaissance report',
          source: 'Internal Ingestion',
          hashMatch: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
        },
      ],
    };

    setCasesList([newCase, ...casesList]);
    setShowNewModal(false);
    setNewTitle('');
    setNewTarget('');
  };

  const filteredCases = casesList.filter((c) => {
    if (filterStatus === 'ALL') return true;
    return c.status === filterStatus;
  });

  return (
    <div className="flex flex-col w-full gap-4 pb-12 font-mono">
      {/* Top Banner Ribbon */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#0a0e16] p-3 border border-[#3b494b]">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-[#262a33] text-[#dbfcff] border border-[#3b494b]">
            <span className="material-symbols-outlined text-[16px] text-[#00f0ff]">
              folder_managed
            </span>
            <span className="text-[11px] font-bold tracking-wider uppercase">
              CASE MANAGEMENT // INVESTIGATION DOSSIERS
            </span>
          </div>
          <span className="text-xs text-[#849495]">
            SOVEREIGN PROSECUTION &amp; INTERCEPT DIRECTORY
          </span>
        </div>

        <button
          onClick={() => setShowNewModal(true)}
          className="px-3 py-1 bg-[#00f0ff] hover:bg-[#7df4ff] text-[#00363a] font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
        >
          <span className="material-symbols-outlined text-[16px]">add</span>
          INITIATE NEW CASE FILE
        </button>
      </div>

      {/* KPI Ribbon */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-[#0e131d] border border-[#3b494b] p-3.5">
          <div className="text-[10px] text-[#849495] uppercase">Active Case Files</div>
          <div className="text-2xl font-bold text-[#00f0ff] mt-1">
            {casesList.filter((c) => c.status === 'ACTIVE').length}
          </div>
          <div className="text-[10px] text-[#849495] mt-0.5">Live surveillance &amp; chain of custody</div>
        </div>

        <div className="bg-[#0e131d] border border-[#3b494b] p-3.5">
          <div className="text-[10px] text-[#849495] uppercase">Ministry Review (MHA)</div>
          <div className="text-2xl font-bold text-[#ffb86c] mt-1">
            {casesList.filter((c) => c.status === 'MHA_REVIEW').length}
          </div>
          <div className="text-[10px] text-[#849495] mt-0.5">Prepared for sovereign warrant dispatch</div>
        </div>

        <div className="bg-[#0e131d] border border-[#3b494b] p-3.5">
          <div className="text-[10px] text-[#849495] uppercase">Sealed Evidence Exhibits</div>
          <div className="text-2xl font-bold text-[#4edea3] mt-1">44</div>
          <div className="text-[10px] text-[#849495] mt-0.5">Sec 65B notarized on immutable ledger</div>
        </div>
      </div>

      {/* Status Filter */}
      <div className="flex border-b border-[#3b494b] bg-[#0a0e16] p-1 gap-1 text-xs">
        {['ALL', 'ACTIVE', 'MHA_REVIEW'].map((st) => (
          <button
            key={st}
            onClick={() => setFilterStatus(st)}
            className={`px-3 py-1.5 font-bold transition-colors ${
              filterStatus === st
                ? 'bg-[#141923] text-[#00f0ff] border-b-2 border-[#00f0ff]'
                : 'text-[#849495] hover:text-[#dbfcff]'
            }`}
          >
            {st === 'ALL' ? 'ALL CASE FILES' : st === 'ACTIVE' ? 'ACTIVE (SURVEILLANCE)' : 'MHA REVIEW'}
          </button>
        ))}
      </div>

      {/* Case List */}
      <div className="space-y-3">
        {filteredCases.map((c) => (
          <div
            key={c.id}
            onClick={() => {
              onSelectCase(c.id);
              onNavigate('case-detail');
            }}
            className="bg-[#0e131d] border border-[#3b494b] hover:border-[#00f0ff]/50 p-4 transition-all duration-150 cursor-pointer space-y-3 group"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#3b494b]/40 pb-2.5">
              <div className="flex items-center gap-2.5">
                <span className="font-bold text-[#00f0ff] text-xs group-hover:underline">
                  {c.id}
                </span>
                <span className="text-sm font-bold text-[#dbfcff]">
                  {c.title}
                </span>
                <span className="px-2 py-0.5 bg-[#ff5555]/20 text-[#ff5555] border border-[#ff5555]/40 text-[9px] font-bold uppercase">
                  {c.classification}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`px-2 py-0.5 text-[9px] font-bold border uppercase ${
                    c.status === 'ACTIVE'
                      ? 'bg-[#4edea3]/20 text-[#4edea3] border-[#4edea3]/40'
                      : 'bg-[#ffb86c]/20 text-[#ffb86c] border-[#ffb86c]/40'
                  }`}
                >
                  {c.status.replace('_', ' ')}
                </span>
              </div>
            </div>

            <p className="text-xs text-[#b9cacb] leading-relaxed">
              {c.targetSynopsis}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-[10px] text-[#849495]">
              <div>
                Lead: <strong className="text-[#dbfcff]">{c.leadInvestigator}</strong>
              </div>
              <div>
                Monitored Entities: <strong className="text-[#00f0ff]">{c.actorsCount} Actors</strong>
              </div>
              <div>
                Exhibits: <strong className="text-[#4edea3]">{c.evidenceCount} Sealed Items</strong>
              </div>
              <div className="text-right">
                Updated: <strong className="text-[#dbfcff]">{c.updatedUtc}</strong>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal: New Case Initiation */}
      {showNewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4">
          <form
            onSubmit={handleCreateCase}
            className="bg-[#0e131d] border border-[#3b494b] w-full max-w-md shadow-2xl p-5 space-y-4"
          >
            <div className="flex items-center justify-between border-b border-[#3b494b] pb-2">
              <span className="font-bold text-[#dbfcff] text-sm flex items-center gap-2">
                <span className="material-symbols-outlined text-[#00f0ff] text-lg">folder_open</span>
                INITIATE SOVEREIGN INVESTIGATION FILE
              </span>
              <button
                type="button"
                onClick={() => setShowNewModal(false)}
                className="text-[#849495] hover:text-[#dbfcff]"
              >
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-[10px] text-[#849495] uppercase block mb-1">
                  OPERATION TITLE / CODE NAME:
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Operation Vajra-Shield"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-[#141923] border border-[#3b494b] p-2 text-xs text-[#dbfcff] focus:outline-hidden focus:border-[#00f0ff]"
                />
              </div>

              <div>
                <label className="text-[10px] text-[#849495] uppercase block mb-1">
                  TARGET SYNOPSIS &amp; INTELLIGENCE SCOPE:
                </label>
                <textarea
                  rows={3}
                  placeholder="Specify targeted actors, suspected infrastructure, and national security impact..."
                  value={newTarget}
                  onChange={(e) => setNewTarget(e.target.value)}
                  className="w-full bg-[#141923] border border-[#3b494b] p-2 text-xs text-[#dbfcff] focus:outline-hidden focus:border-[#00f0ff]"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#3b494b]/60">
              <button
                type="button"
                onClick={() => setShowNewModal(false)}
                className="px-3 py-1.5 bg-[#262a33] text-[#dbfcff] text-xs hover:bg-[#3b494b]"
              >
                CANCEL
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-[#00f0ff] hover:bg-[#7df4ff] text-[#00363a] font-bold text-xs"
              >
                SEAL &amp; CREATE FILE
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

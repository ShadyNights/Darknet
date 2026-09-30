import React, { useState } from 'react';
import { THREAT_ACTORS } from '../../data/mockData';
import { ScreenId, ThreatActor } from '../../types';

interface ActorsDirectoryScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onSelectActor: (actorId: string) => void;
}

export const ActorsDirectoryScreen: React.FC<ActorsDirectoryScreenProps> = ({
  onNavigate,
  onSelectActor,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedThreatLevel, setSelectedThreatLevel] = useState<string>('all');

  const filteredActors = THREAT_ACTORS.filter((actor) => {
    const matchesSearch =
      actor.handle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      actor.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      actor.aliases.some((a) => a.toLowerCase().includes(searchQuery.toLowerCase())) ||
      actor.wallets.some((w) => w.address.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      selectedCategory === 'all' || actor.category === selectedCategory;

    const matchesThreat =
      selectedThreatLevel === 'all' || actor.metrics.threatLevel === selectedThreatLevel;

    return matchesSearch && matchesCategory && matchesThreat;
  });

  return (
    <div className="flex flex-col w-full gap-4 pb-12 font-mono">
      {/* Top Banner Ribbon */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#0a0e16] p-3 border border-[#3b494b]">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-[#262a33] text-[#dbfcff] border border-[#3b494b]">
            <span className="material-symbols-outlined text-[16px] text-[#00f0ff]">
              groups
            </span>
            <span className="text-[11px] font-bold tracking-wider uppercase">
              SOVEREIGN ACTOR REGISTRY // DIRECTORY
            </span>
          </div>
          <span className="text-xs text-[#849495]">
            TOTAL MONITORED ENTITIES: <span className="text-[#dbfcff] font-bold">{THREAT_ACTORS.length}</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('search')}
            className="px-3 py-1 bg-[#141923] hover:bg-[#262a33] border border-[#3b494b] text-xs text-[#dbfcff] flex items-center gap-1.5 transition-colors"
          >
            <span className="material-symbols-outlined text-[14px] text-[#00f0ff]">
              travel_explore
            </span>
            ADVANCED SEARCH
          </button>
          <button
            onClick={() => onNavigate('graph')}
            className="px-3 py-1 bg-[#00f0ff]/10 hover:bg-[#00f0ff]/20 border border-[#00f0ff]/40 text-xs text-[#00f0ff] flex items-center gap-1.5 transition-colors"
          >
            <span className="material-symbols-outlined text-[14px]">
              hub
            </span>
            TOPOLOGY GRAPH
          </button>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-[#0e131d] border border-[#3b494b] p-3.5 flex flex-col justify-between">
          <div className="text-[10px] text-[#849495] uppercase tracking-wider flex items-center justify-between">
            <span>Critical Severity Targets</span>
            <span className="material-symbols-outlined text-[#ff5555] text-base">emergency</span>
          </div>
          <div className="text-2xl font-bold text-[#ff5555] mt-1">4</div>
          <div className="text-[10px] text-[#849495] mt-1">Direct state &amp; telecom intrusion threats</div>
        </div>

        <div className="bg-[#0e131d] border border-[#3b494b] p-3.5 flex flex-col justify-between">
          <div className="text-[10px] text-[#849495] uppercase tracking-wider flex items-center justify-between">
            <span>De-Anonymized Confirmed</span>
            <span className="material-symbols-outlined text-[#4edea3] text-base">verified</span>
          </div>
          <div className="text-2xl font-bold text-[#4edea3] mt-1">3</div>
          <div className="text-[10px] text-[#849495] mt-1">Admissibility score &gt; 90% (Sec 65B certified)</div>
        </div>

        <div className="bg-[#0e131d] border border-[#3b494b] p-3.5 flex flex-col justify-between">
          <div className="text-[10px] text-[#849495] uppercase tracking-wider flex items-center justify-between">
            <span>Cross-Persona Linkages</span>
            <span className="material-symbols-outlined text-[#00f0ff] text-base">sync_alt</span>
          </div>
          <div className="text-2xl font-bold text-[#00f0ff] mt-1">11</div>
          <div className="text-[10px] text-[#849495] mt-1">High-confidence Bayesian correlations</div>
        </div>

        <div className="bg-[#0e131d] border border-[#3b494b] p-3.5 flex flex-col justify-between">
          <div className="text-[10px] text-[#849495] uppercase tracking-wider flex items-center justify-between">
            <span>Exfiltrated Breaches Logged</span>
            <span className="material-symbols-outlined text-[#ffb86c] text-base">dataset</span>
          </div>
          <div className="text-2xl font-bold text-[#ffb86c] mt-1">18.6M</div>
          <div className="text-[10px] text-[#849495] mt-1">Records linked to tracked actors</div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-[#0e131d] border border-[#3b494b] p-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex-1 min-w-[280px] relative">
          <span className="material-symbols-outlined absolute left-2.5 top-2.5 text-[#849495] text-[18px]">
            search
          </span>
          <input
            type="text"
            placeholder="Filter by Actor Handle, ID, Alias, or Wallet Address..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#141923] border border-[#3b494b] pl-9 pr-3 py-1.5 text-xs text-[#dbfcff] placeholder-[#849495] focus:outline-hidden focus:border-[#00f0ff]"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 text-xs text-[#849495]">
            <span>CATEGORY:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-[#141923] border border-[#3b494b] text-xs text-[#dbfcff] px-2 py-1 focus:outline-hidden focus:border-[#00f0ff]"
            >
              <option value="all">ALL CATEGORIES</option>
              <option value="stolen-data">STOLEN DATA</option>
              <option value="ransomware">RANSOMWARE</option>
              <option value="financial-fraud">FINANCIAL FRAUD</option>
              <option value="exploit-broker">EXPLOIT BROKER</option>
              <option value="narcotics">NARCOTICS</option>
              <option value="terror-finance">TERROR FINANCE</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-[#849495]">
            <span>SEVERITY:</span>
            <select
              value={selectedThreatLevel}
              onChange={(e) => setSelectedThreatLevel(e.target.value)}
              className="bg-[#141923] border border-[#3b494b] text-xs text-[#dbfcff] px-2 py-1 focus:outline-hidden focus:border-[#00f0ff]"
            >
              <option value="all">ALL SEVERITIES</option>
              <option value="CRITICAL">CRITICAL</option>
              <option value="HIGH">HIGH</option>
              <option value="ELEVATED">ELEVATED</option>
              <option value="MODERATE">MODERATE</option>
            </select>
          </div>

          {(searchQuery || selectedCategory !== 'all' || selectedThreatLevel !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedThreatLevel('all');
              }}
              className="text-[10px] text-[#ff5555] hover:underline px-2 py-1"
            >
              RESET FILTERS
            </button>
          )}
        </div>
      </div>

      {/* Actors Table */}
      <div className="bg-[#0e131d] border border-[#3b494b] overflow-x-auto shadow-sm">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-[#141923] border-b border-[#3b494b] text-[10px] text-[#849495] uppercase tracking-wider">
              <th className="py-2.5 px-3">Entity ID &amp; Handle</th>
              <th className="py-2.5 px-3">Known Aliases</th>
              <th className="py-2.5 px-3">Classification &amp; Threat</th>
              <th className="py-2.5 px-3">Confidence &amp; Admissibility</th>
              <th className="py-2.5 px-3">Intercepts / Escrow</th>
              <th className="py-2.5 px-3">Infrastructure Footprint</th>
              <th className="py-2.5 px-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#3b494b]/40">
            {filteredActors.map((actor) => (
              <tr
                key={actor.id}
                className="hover:bg-[#141923]/60 transition-colors group cursor-pointer"
                onClick={() => onSelectActor(actor.id)}
              >
                {/* ID & Handle */}
                <td className="py-3 px-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#1b2230] border border-[#3b494b] flex items-center justify-center text-[#00f0ff] font-bold text-xs shrink-0">
                      {actor.handle.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-bold text-[#dbfcff] group-hover:text-[#00f0ff] transition-colors flex items-center gap-1.5">
                        {actor.handle}
                        {actor.confidenceLabel === 'Confirmed' && (
                          <span className="material-symbols-outlined text-[#4edea3] text-[14px]">
                            verified
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-[#849495]">{actor.id}</div>
                    </div>
                  </div>
                </td>

                {/* Aliases */}
                <td className="py-3 px-3">
                  <div className="flex flex-wrap gap-1 max-w-[160px]">
                    {actor.aliases.map((alias, i) => (
                      <span
                        key={i}
                        className="px-1.5 py-0.5 bg-[#262a33] text-[9px] text-[#b9cacb] border border-[#3b494b]"
                      >
                        {alias}
                      </span>
                    ))}
                  </div>
                </td>

                {/* Classification & Threat */}
                <td className="py-3 px-3">
                  <div className="flex flex-col gap-1 items-start">
                    <span
                      className={`px-1.5 py-0.5 text-[9px] font-bold border uppercase ${
                        actor.metrics.threatLevel === 'CRITICAL'
                          ? 'bg-[#ff5555]/20 text-[#ff5555] border-[#ff5555]/40'
                          : actor.metrics.threatLevel === 'HIGH'
                          ? 'bg-[#ffb86c]/20 text-[#ffb86c] border-[#ffb86c]/40'
                          : 'bg-[#00f0ff]/10 text-[#00f0ff] border-[#00f0ff]/30'
                      }`}
                    >
                      {actor.metrics.threatLevel}
                    </span>
                    <span className="text-[10px] text-[#849495] uppercase">
                      {actor.category.replace('-', ' ')}
                    </span>
                  </div>
                </td>

                {/* Confidence & Admissibility */}
                <td className="py-3 px-3">
                  <div className="space-y-1 min-w-[120px]">
                    <div className="flex justify-between text-[10px]">
                      <span className="text-[#849495]">Confidence:</span>
                      <span className="text-[#4edea3] font-bold">
                        {Math.round(actor.confidence * 100)}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-[#262a33]">
                      <div
                        className="h-full bg-[#4edea3]"
                        style={{ width: `${actor.confidence * 100}%` }}
                      ></div>
                    </div>
                    <div className="text-[9px] text-[#849495]">
                      Admissibility: <span className="text-[#dbfcff] font-bold">{actor.metrics.admissibility}%</span>
                    </div>
                  </div>
                </td>

                {/* Intercepts */}
                <td className="py-3 px-3 text-[#b9cacb]">
                  <div className="text-[11px] font-bold text-[#dbfcff]">
                    {actor.interceptedPosts} Intercepts
                  </div>
                  <div className="text-[10px] text-[#849495]">
                    {actor.escrowDeals} Escrow Operations
                  </div>
                </td>

                {/* Infrastructure */}
                <td className="py-3 px-3">
                  <div className="text-[10px] space-y-0.5">
                    <div className="text-[#dbfcff] truncate max-w-[180px]">
                      🧅 {actor.infrastructure.onion}
                    </div>
                    <div className="text-[#849495]">
                      IP: <span className="text-[#00f0ff]">{actor.infrastructure.clearnetIp}</span>
                    </div>
                  </div>
                </td>

                {/* Actions */}
                <td className="py-3 px-3 text-right" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      onClick={() => onSelectActor(actor.id)}
                      className="px-2.5 py-1 bg-[#262a33] hover:bg-[#00f0ff] hover:text-[#00363a] text-xs text-[#dbfcff] font-bold border border-[#3b494b] transition-colors"
                    >
                      DOSSIER
                    </button>
                    <button
                      onClick={() => onNavigate('attribution')}
                      title="Run attribution review"
                      className="p-1 hover:bg-[#262a33] text-[#849495] hover:text-[#00f0ff] transition-colors"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        compare_arrows
                      </span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

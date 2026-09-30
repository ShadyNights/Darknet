import React, { useState } from 'react';
import { ScreenId } from '../../types';
import { ThreatHeatmap } from '../dashboard/ThreatHeatmap';

interface DashboardScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onOpenCandidate?: (candidateId: string) => void;
  onSelectActor?: (actorId: string) => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  onNavigate,
  onOpenCandidate,
  onSelectActor,
}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [showCircuitModal, setShowCircuitModal] = useState(false);
  const [circuitResetting, setCircuitResetting] = useState<string | null>(null);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 600);
  };

  const handleResetCircuit = (name: string) => {
    setCircuitResetting(name);
    setTimeout(() => {
      setCircuitResetting(null);
    }, 1000);
  };

  return (
    <div className="flex flex-col w-full gap-4 pb-8">
      {/* Tactical Control Ribbon */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#0a0e16] p-3 border border-[#3b494b] shadow-sm">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-[#262a33] text-[#dbfcff] border border-[#3b494b]">
            <span className="material-symbols-outlined text-[16px] text-[#00f0ff]">
              shield_with_heart
            </span>
            <span className="font-mono text-[11px] tracking-wider uppercase font-bold">
              TACTICAL_RADAR // RECON
            </span>
          </div>

          <div className="flex items-center gap-1 text-[#b9cacb] font-mono text-[11px]">
            <span>LAST UPDATE:</span>
            <span className="text-[#dbfcff] font-bold">14:28:10 UTC</span>
          </div>

          <div className="flex items-center gap-1.5 px-2 py-0.5 bg-[#4edea3]/10 border border-[#4edea3]/30">
            <span className="w-2 h-2 rounded-full bg-[#4edea3] animate-pulse"></span>
            <span className="font-mono text-[10px] text-[#4edea3] uppercase font-bold tracking-widest">
              LIVE STREAM
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center bg-[#262a33] px-3 py-1 gap-2 border border-[#3b494b]">
            <span className="font-mono text-[10px] text-[#849495] uppercase tracking-wider">
              DEFCON LEVEL:
            </span>
            <span className="font-mono text-[11px] text-[#ffb4ab] font-bold">
              2 - ELEVATED
            </span>
          </div>

          <button
            onClick={handleRefresh}
            className="flex items-center gap-1.5 px-3 py-1 bg-[#00f0ff] hover:bg-[#7df4ff] text-[#00363a] font-mono text-[11px] font-bold transition-all shadow-sm cursor-pointer"
          >
            <span
              className={`material-symbols-outlined text-[16px] ${
                refreshing ? 'animate-spin' : ''
              }`}
            >
              autorenew
            </span>
            <span>REFRESH SYNC</span>
          </button>
        </div>
      </div>

      {/* 4 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Stat 1: Designated Threat Actors */}
        <div
          onClick={() => onNavigate('actors')}
          className="bg-[#0a0e16] p-4 border border-[#3b494b] hover:border-[#00f0ff] transition-all cursor-pointer group"
        >
          <div className="flex items-start justify-between">
            <div>
              <span className="font-mono text-[10px] text-[#849495] tracking-widest uppercase block mb-1">
                DESIGNATED THREAT ACTORS
              </span>
              <div className="flex items-baseline gap-2">
                <span className="font-headline text-3xl text-[#dbfcff] font-bold tracking-tight">
                  142
                </span>
                <span className="font-mono text-[11px] text-[#4edea3] font-bold flex items-center">
                  <span className="material-symbols-outlined text-[14px]">arrow_upward</span>+6%
                </span>
              </div>
              <span className="font-mono text-[10px] text-[#b9cacb] block mt-1">
                48 UNDER ACTIVE SURVEILLANCE
              </span>
            </div>
            <div className="w-10 h-10 bg-[#262a33] flex items-center justify-center text-[#00f0ff]">
              <span className="material-symbols-outlined text-[20px]">target</span>
            </div>
          </div>
          <div className="mt-3 w-full bg-[#31353e] h-1 overflow-hidden">
            <div className="bg-[#00f0ff] h-full w-[78%]"></div>
          </div>
        </div>

        {/* Stat 2: Correlated Linkages */}
        <div
          onClick={() => onNavigate('attribution')}
          className="bg-[#0a0e16] p-4 border border-[#3b494b] hover:border-[#4edea3] transition-all cursor-pointer group"
        >
          <div className="flex items-start justify-between">
            <div>
              <span className="font-mono text-[10px] text-[#849495] tracking-widest uppercase block mb-1">
                CORRELATED LINKAGES
              </span>
              <div className="flex items-baseline gap-2">
                <span className="font-headline text-3xl text-[#4edea3] font-bold tracking-tight">
                  18
                </span>
                <span className="font-mono text-[11px] text-[#4edea3] font-bold flex items-center">
                  <span className="material-symbols-outlined text-[14px]">bolt</span>NEW
                </span>
              </div>
              <span className="font-mono text-[10px] text-[#b9cacb] block mt-1">
                MATCH CONFIDENCE ≥ 0.70 AVG
              </span>
            </div>
            <div className="w-10 h-10 bg-[#262a33] flex items-center justify-center text-[#4edea3]">
              <span className="material-symbols-outlined text-[20px]">hub</span>
            </div>
          </div>
          <div className="mt-3 w-full bg-[#31353e] h-1 overflow-hidden">
            <div className="bg-[#4edea3] h-full w-[64%]"></div>
          </div>
        </div>

        {/* Stat 3: Pending Review Queue */}
        <div
          onClick={() => onNavigate('attribution')}
          className="bg-[#0a0e16] p-4 border border-[#3b494b] hover:border-[#ffb95f] transition-all cursor-pointer group"
        >
          <div className="flex items-start justify-between">
            <div>
              <span className="font-mono text-[10px] text-[#849495] tracking-widest uppercase block mb-1">
                PENDING REVIEW QUEUE
              </span>
              <div className="flex items-baseline gap-2">
                <span className="font-headline text-3xl text-[#ffb95f] font-bold tracking-tight">
                  07
                </span>
                <span className="font-mono text-[11px] text-[#ffb95f] font-bold uppercase tracking-wider">
                  PRIORITY
                </span>
              </div>
              <span className="font-mono text-[10px] text-[#b9cacb] block mt-1">
                2 EVIDENCE DOSSIERS DOCKED
              </span>
            </div>
            <div className="w-10 h-10 bg-[#262a33] flex items-center justify-center text-[#ffb95f]">
              <span className="material-symbols-outlined text-[20px]">pending_actions</span>
            </div>
          </div>
          <div className="mt-3 w-full bg-[#31353e] h-1 overflow-hidden">
            <div className="bg-[#ffb95f] h-full w-[45%]"></div>
          </div>
        </div>

        {/* Stat 4: Global Source Integrity */}
        <div
          onClick={() => onNavigate('admin')}
          className="bg-[#0a0e16] p-4 border border-[#3b494b] hover:border-[#4edea3] transition-all cursor-pointer group"
        >
          <div className="flex items-start justify-between">
            <div>
              <span className="font-mono text-[10px] text-[#849495] tracking-widest uppercase block mb-1">
                GLOBAL SOURCE INTEGRITY
              </span>
              <div className="flex items-baseline gap-2">
                <span className="font-headline text-3xl text-[#4edea3] font-bold tracking-tight">
                  94%
                </span>
                <span className="font-mono text-[11px] text-[#849495] font-normal">
                  NOMINAL
                </span>
              </div>
              <span className="font-mono text-[10px] text-[#ffb4ab] block mt-1">
                1 CIR-TIMEOUT / 1 DEGRADED
              </span>
            </div>
            <div className="w-10 h-10 bg-[#262a33] flex items-center justify-center text-[#4edea3]">
              <span className="material-symbols-outlined text-[20px]">vital_signs</span>
            </div>
          </div>
          <div className="mt-3 w-full bg-[#31353e] h-1 overflow-hidden">
            <div className="bg-[#4edea3] h-full w-[94%]"></div>
          </div>
        </div>
      </div>

      {/* Global Threat Heatmap & Geographical Overlay Component */}
      <ThreatHeatmap onNavigate={onNavigate} onSelectActor={onSelectActor} />

      {/* Operational Grid: Row 1 (Heatmap + Ingestion Health) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-3">
        {/* Heatmap Matrix (7 cols) */}
        <div className="xl:col-span-7 bg-[#0a0e16] p-4 border border-[#3b494b] shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#3b494b]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#00f0ff] text-[18px]">
                  grid_view
                </span>
                <span className="font-mono text-[11px] uppercase tracking-widest text-[#dbfcff] font-bold">
                  SOURCE COVERAGE HEATMAP
                </span>
              </div>
              <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#849495]">
                <span>INGEST_SWEEP: ACTIVE</span>
                <div className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-ping"></div>
              </div>
            </div>

            <p className="font-sans text-[12px] text-[#b9cacb] mb-3">
              Tactical telemetry density breakdown across classified feed topologies and contraband threat vectors.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-[11px] border-collapse">
                <thead>
                  <tr className="bg-[#181c24] text-[#849495]">
                    <th className="py-2 px-3 font-semibold uppercase text-[10px]">FEED TOPOLOGY</th>
                    <th className="py-2 px-3 font-semibold uppercase text-[10px] text-center">STOLEN DATA</th>
                    <th className="py-2 px-3 font-semibold uppercase text-[10px] text-center">NARCOTICS</th>
                    <th className="py-2 px-3 font-semibold uppercase text-[10px] text-center">FINANCIAL FRAUD</th>
                    <th className="py-2 px-3 font-semibold uppercase text-[10px] text-center">EXPLOIT HUBS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#181c24]">
                  <tr className="hover:bg-[#181c24]/50 transition-colors">
                    <td className="py-2 px-3 text-[#dfe2ee] font-bold flex items-center gap-2">
                      <span className="material-symbols-outlined text-[15px] text-[#00f0ff]">
                        vpn_lock
                      </span>
                      Tor Marketplaces
                    </td>
                    <td className="py-2 px-3 text-center">
                      <span className="px-2 py-0.5 bg-[#00a572]/20 text-[#4edea3] font-bold">98.2%</span>
                    </td>
                    <td className="py-2 px-3 text-center">
                      <span className="px-2 py-0.5 bg-[#00a572]/20 text-[#4edea3] font-bold">94.7%</span>
                    </td>
                    <td className="py-2 px-3 text-center">
                      <span className="px-2 py-0.5 bg-[#00a572]/20 text-[#4edea3] font-bold">89.4%</span>
                    </td>
                    <td className="py-2 px-3 text-center">
                      <span className="px-2 py-0.5 bg-[#ffd19c]/20 text-[#ffb95f] font-bold">76.0%</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-[#181c24]/50 transition-colors">
                    <td className="py-2 px-3 text-[#dfe2ee] font-bold flex items-center gap-2">
                      <span className="material-symbols-outlined text-[15px] text-[#00f0ff]">
                        forum
                      </span>
                      Darknet Forums
                    </td>
                    <td className="py-2 px-3 text-center">
                      <span className="px-2 py-0.5 bg-[#00a572]/20 text-[#4edea3] font-bold">91.5%</span>
                    </td>
                    <td className="py-2 px-3 text-center">
                      <span className="px-2 py-0.5 bg-[#ffd19c]/20 text-[#ffb95f] font-bold">64.3%</span>
                    </td>
                    <td className="py-2 px-3 text-center">
                      <span className="px-2 py-0.5 bg-[#00a572]/20 text-[#4edea3] font-bold">95.1%</span>
                    </td>
                    <td className="py-2 px-3 text-center">
                      <span className="px-2 py-0.5 bg-[#00a572]/20 text-[#4edea3] font-bold">98.8%</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-[#181c24]/50 transition-colors">
                    <td className="py-2 px-3 text-[#dfe2ee] font-bold flex items-center gap-2">
                      <span className="material-symbols-outlined text-[15px] text-[#00f0ff]">
                        content_paste_go
                      </span>
                      Raw Paste Sites
                    </td>
                    <td className="py-2 px-3 text-center">
                      <span className="px-2 py-0.5 bg-[#00a572]/20 text-[#4edea3] font-bold">99.4%</span>
                    </td>
                    <td className="py-2 px-3 text-center">
                      <span className="px-2 py-0.5 bg-[#93000a]/30 text-[#ffb4ab] font-bold">18.2%</span>
                    </td>
                    <td className="py-2 px-3 text-center">
                      <span className="px-2 py-0.5 bg-[#ffd19c]/20 text-[#ffb95f] font-bold">71.0%</span>
                    </td>
                    <td className="py-2 px-3 text-center">
                      <span className="px-2 py-0.5 bg-[#00a572]/20 text-[#4edea3] font-bold">88.5%</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-[#181c24]/50 transition-colors">
                    <td className="py-2 px-3 text-[#dfe2ee] font-bold flex items-center gap-2">
                      <span className="material-symbols-outlined text-[15px] text-[#00f0ff]">
                        folder_delete
                      </span>
                      Ransom / Leak Portals
                    </td>
                    <td className="py-2 px-3 text-center">
                      <span className="px-2 py-0.5 bg-[#00a572]/20 text-[#4edea3] font-bold">96.0%</span>
                    </td>
                    <td className="py-2 px-3 text-center">
                      <span className="px-2 py-0.5 bg-[#262a33] text-[#849495] font-bold">N/A</span>
                    </td>
                    <td className="py-2 px-3 text-center">
                      <span className="px-2 py-0.5 bg-[#00a572]/20 text-[#4edea3] font-bold">83.9%</span>
                    </td>
                    <td className="py-2 px-3 text-center">
                      <span className="px-2 py-0.5 bg-[#00a572]/20 text-[#4edea3] font-bold">92.1%</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-3 pt-2 bg-[#181c24] p-3 flex items-center justify-between border border-[#3b494b] flex-wrap gap-2">
            <div className="flex items-center gap-4 text-xs font-mono">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-[#4edea3]"></span>
                <span className="text-[#849495]">Optimum (&gt;85%)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-[#ffb95f]"></span>
                <span className="text-[#849495]">Moderate (60-85%)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-[#ffb4ab]"></span>
                <span className="text-[#849495]">Blindspot (&lt;60%)</span>
              </div>
            </div>
            <span className="font-mono text-[10px] text-[#00f0ff] uppercase font-bold tracking-widest">
              GLOBAL HARVEST INDEX: 89.1%
            </span>
          </div>
        </div>

        {/* Source Recon Ingestion Health (5 cols) */}
        <div className="xl:col-span-5 bg-[#0a0e16] p-4 border border-[#3b494b] shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#3b494b]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#4edea3] text-[18px]">
                  dns
                </span>
                <span className="font-mono text-[11px] uppercase tracking-widest text-[#dbfcff] font-bold">
                  SOURCE RECON INGESTION HEALTH
                </span>
              </div>
              <span className="font-mono text-[11px] text-[#4edea3] font-bold">
                4 FEED MONITORS
              </span>
            </div>

            <div className="space-y-2">
              {/* Source 1 */}
              <div className="p-2.5 bg-[#181c24] border border-[#3b494b]/60 flex items-center justify-between hover:bg-[#262a33] transition-colors">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#4edea3]"></span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[12px] text-[#dfe2ee] font-bold">
                        MarketX Onion Hub
                      </span>
                      <span className="px-1.5 py-0.2 bg-[#4edea3]/10 text-[#4edea3] font-mono text-[10px] border border-[#4edea3]/30">
                        TOR-V3
                      </span>
                    </div>
                    <span className="font-mono text-[10px] text-[#849495]">
                      Last Scan: 14:24:48 UTC (22s ago)
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-mono text-[12px] text-[#4edea3] font-bold">99.8%</span>
                  <span className="font-mono text-[9px] text-[#849495] block">UPTIME (30D)</span>
                </div>
              </div>

              {/* Source 2 */}
              <div className="p-2.5 bg-[#181c24] border border-[#3b494b]/60 flex items-center justify-between hover:bg-[#262a33] transition-colors">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#4edea3]"></span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[12px] text-[#dfe2ee] font-bold">
                        ForumY Clearance Gate
                      </span>
                      <span className="px-1.5 py-0.2 bg-[#4edea3]/10 text-[#4edea3] font-mono text-[10px] border border-[#4edea3]/30">
                        I2P-TUNNEL
                      </span>
                    </div>
                    <span className="font-mono text-[10px] text-[#849495]">
                      Last Scan: 14:23:12 UTC (2m ago)
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-mono text-[12px] text-[#4edea3] font-bold">98.4%</span>
                  <span className="font-mono text-[9px] text-[#849495] block">UPTIME (30D)</span>
                </div>
              </div>

              {/* Source 3 */}
              <div className="p-2.5 bg-[#181c24] border border-[#ffb95f]/30 flex items-center justify-between hover:bg-[#262a33] transition-colors">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ffb95f] animate-pulse"></span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[12px] text-[#ffb95f] font-bold">
                        RussianUnderground
                      </span>
                      <span className="px-1.5 py-0.2 bg-[#ffb95f]/20 text-[#ffb95f] font-mono text-[10px]">
                        DEGRADED
                      </span>
                    </div>
                    <span className="font-mono text-[10px] text-[#ffb95f]">
                      Latency Jitter: 1840ms [RTT Drift]
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-mono text-[12px] text-[#ffb95f] font-bold">87.1%</span>
                  <span className="font-mono text-[9px] text-[#849495] block">UPTIME (30D)</span>
                </div>
              </div>

              {/* Source 4 */}
              <div className="p-2.5 bg-[#181c24] border border-[#ffb4ab]/30 flex items-center justify-between hover:bg-[#262a33] transition-colors">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ffb4ab]"></span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[12px] text-[#ffb4ab] font-bold">
                        DarkLeaks Paste Mirr-4
                      </span>
                      <span className="px-1.5 py-0.2 bg-[#93000a]/40 text-[#ffb4ab] font-mono text-[10px]">
                        FAILED
                      </span>
                    </div>
                    <span className="font-mono text-[10px] text-[#ffb4ab]">
                      Circuit Timeout: Onion guard reset
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-mono text-[12px] text-[#ffb4ab] font-bold">64.2%</span>
                  <span className="font-mono text-[9px] text-[#849495] block">UPTIME (30D)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3 pt-2 border-t border-[#3b494b] flex items-center justify-between font-mono text-[11px] text-[#b9cacb]">
            <span>AUTO-PROBE CADENCE: 60s</span>
            <button
              onClick={() => setShowCircuitModal(true)}
              className="text-[#00f0ff] hover:underline uppercase font-bold flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[14px]">tune</span>
              CIRCUIT MGR
            </button>
          </div>
        </div>
      </div>

      {/* Operational Grid: Row 2 (Linkages + Activity Stream) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-3">
        {/* Candidates (7 cols) */}
        <div className="xl:col-span-7 bg-[#0a0e16] p-4 border border-[#3b494b] shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#3b494b]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#4edea3] text-[18px]">
                  share
                </span>
                <span className="font-mono text-[11px] uppercase tracking-widest text-[#dbfcff] font-bold">
                  RECENT SAME_ACTOR_AS CANDIDATE PAIRS
                </span>
              </div>
              <span className="font-mono text-[10px] text-[#b9cacb]">
                AUTO-RESOLVED GRAPH
              </span>
            </div>

            <p className="font-sans text-[12px] text-[#b9cacb] mb-3">
              De-anonymization inference engine matched common PGP subkeys, BTC clustering, and style-signature hashes.
            </p>

            <div className="space-y-2">
              {/* Pair 1 */}
              <div className="p-3 bg-[#181c24] border border-[#3b494b] flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#262a33] transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#262a33] flex items-center justify-center text-[#00f0ff] border border-[#3b494b]">
                    <span className="material-symbols-outlined text-[16px]">fingerprint</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-[12px] text-[#00f0ff] font-bold">ShadowVendor77</span>
                      <span className="material-symbols-outlined text-[#849495] text-[14px]">east</span>
                      <span className="font-mono text-[12px] text-[#dfe2ee] font-bold">NightTrader</span>
                      <span className="px-2 py-0.5 bg-[#00a572]/20 text-[#4edea3] font-mono text-[10px] font-bold border border-[#4edea3]/30">
                        HIGH 0.83
                      </span>
                    </div>
                    <span className="font-mono text-[10px] text-[#849495] block mt-0.5">
                      Vector: Shared PGP fingerprint &amp; Monero sub-address prefix
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (onOpenCandidate) onOpenCandidate('C-1042');
                    else onNavigate('attribution');
                  }}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-[#262a33] hover:bg-[#00f0ff] hover:text-[#00363a] text-[#dbfcff] font-mono text-[11px] font-bold transition-all border border-[#3b494b] cursor-pointer whitespace-nowrap self-start sm:self-center"
                >
                  <span>REVIEW ATTR</span>
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </button>
              </div>

              {/* Pair 2 */}
              <div className="p-3 bg-[#181c24] border border-[#3b494b] flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#262a33] transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#262a33] flex items-center justify-center text-[#ffb95f] border border-[#3b494b]">
                    <span className="material-symbols-outlined text-[16px]">link</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-[12px] text-[#00f0ff] font-bold">GhostBroker</span>
                      <span className="material-symbols-outlined text-[#849495] text-[14px]">east</span>
                      <span className="font-mono text-[12px] text-[#dfe2ee] font-bold">NullByte</span>
                      <span className="px-2 py-0.5 bg-[#ffd19c]/20 text-[#ffb95f] font-mono text-[10px] font-bold border border-[#ffb95f]/30">
                        MEDIUM 0.61
                      </span>
                    </div>
                    <span className="font-mono text-[10px] text-[#849495] block mt-0.5">
                      Vector: Stylometry match &amp; Telegram drop correlation
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => onNavigate('attribution')}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-[#262a33] hover:bg-[#00f0ff] hover:text-[#00363a] text-[#dbfcff] font-mono text-[11px] font-bold transition-all border border-[#3b494b] cursor-pointer whitespace-nowrap self-start sm:self-center"
                >
                  <span>REVIEW ATTR</span>
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </button>
              </div>

              {/* Pair 3 */}
              <div className="p-3 bg-[#181c24] border border-[#3b494b] flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#262a33] transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#262a33] flex items-center justify-center text-[#849495] border border-[#3b494b]">
                    <span className="material-symbols-outlined text-[16px]">shuffle</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-[12px] text-[#00f0ff] font-bold">KaliOps</span>
                      <span className="material-symbols-outlined text-[#849495] text-[14px]">east</span>
                      <span className="font-mono text-[12px] text-[#dfe2ee] font-bold">HydraRoot</span>
                      <span className="px-2 py-0.5 bg-[#262a33] text-[#849495] font-mono text-[10px] font-bold">
                        LOW 0.38
                      </span>
                    </div>
                    <span className="font-mono text-[10px] text-[#849495] block mt-0.5">
                      Vector: Overlapping ASN hosting range (AS13335)
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => onNavigate('attribution')}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-[#262a33] hover:bg-[#00f0ff] hover:text-[#00363a] text-[#dbfcff] font-mono text-[11px] font-bold transition-all border border-[#3b494b] cursor-pointer whitespace-nowrap self-start sm:self-center"
                >
                  <span>REVIEW ATTR</span>
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>

          <div className="mt-3 pt-2 border-t border-[#3b494b] flex items-center justify-between font-mono text-[11px] text-[#b9cacb]">
            <span>PENDING VERIFICATION QUEUE: 7 CLUSTERS</span>
            <button
              onClick={() => onNavigate('graph')}
              className="text-[#4edea3] hover:underline font-bold uppercase flex items-center gap-1 cursor-pointer"
            >
              <span>GRAPH VISUALIZER</span>
              <span className="material-symbols-outlined text-[14px]">open_in_new</span>
            </button>
          </div>
        </div>

        {/* Tactical Event Ledger (5 cols) */}
        <div className="xl:col-span-5 bg-[#0a0e16] p-4 border border-[#3b494b] shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#3b494b]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#00f0ff] text-[18px]">
                  notifications_active
                </span>
                <span className="font-mono text-[11px] uppercase tracking-widest text-[#dbfcff] font-bold">
                  TACTICAL EVENT LEDGER
                </span>
              </div>
              <span className="font-mono text-[10px] text-[#4edea3]">CHAIN-OF-CUSTODY OK</span>
            </div>

            <div className="relative pl-4 space-y-3 before:absolute before:left-1 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#3b494b]">
              {/* Event 1 */}
              <div className="relative">
                <span className="absolute -left-[19px] top-1 w-2.5 h-2.5 rounded-full bg-[#4edea3]"></span>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] text-[#4edea3] font-bold">14:22:04 UTC</span>
                  <span className="font-mono text-[9px] text-[#849495] uppercase">[CANDIDATE]</span>
                </div>
                <p className="font-sans text-[12px] text-[#dfe2ee] font-semibold mt-0.5">
                  New candidate <span className="text-[#00f0ff] font-mono">C-1042</span> queued for forensic attribution review
                </p>
                <span className="font-mono text-[10px] text-[#b9cacb] block">
                  Confidence engine flagged identical SSH banner 0x8F9
                </span>
              </div>

              {/* Event 2 */}
              <div className="relative">
                <span className="absolute -left-[19px] top-1 w-2.5 h-2.5 rounded-full bg-[#ffb95f]"></span>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] text-[#ffb95f] font-bold">14:18:31 UTC</span>
                  <span className="font-mono text-[9px] text-[#849495] uppercase">[SOURCE_CIRCUIT]</span>
                </div>
                <p className="font-sans text-[12px] text-[#dfe2ee] font-semibold mt-0.5">
                  Source <span className="text-[#ffb95f] font-mono">DarkLeaks</span> circuit degraded
                </p>
                <span className="font-mono text-[10px] text-[#b9cacb] block">
                  Packet loss spiked to 38% across exit relay #409
                </span>
              </div>

              {/* Event 3 */}
              <div className="relative">
                <span className="absolute -left-[19px] top-1 w-2.5 h-2.5 rounded-full bg-[#00f0ff]"></span>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] text-[#00f0ff] font-bold">14:05:19 UTC</span>
                  <span className="font-mono text-[9px] text-[#849495] uppercase">[EVIDENCE_EXPORT]</span>
                </div>
                <p className="font-sans text-[12px] text-[#dfe2ee] font-semibold mt-0.5">
                  Case <span className="text-[#00f0ff] font-mono">C-2026-001</span> signed PDF export generated
                </p>
                <span className="font-mono text-[10px] text-[#b9cacb] block">
                  Operator <span className="text-[#dbfcff]">analyst01</span> applied NTRO-GPG signature
                </span>
              </div>

              {/* Event 4 */}
              <div className="relative">
                <span className="absolute -left-[19px] top-1 w-2.5 h-2.5 rounded-full bg-[#4edea3]"></span>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] text-[#4edea3] font-bold">13:58:44 UTC</span>
                  <span className="font-mono text-[9px] text-[#849495] uppercase">[ROUTING]</span>
                </div>
                <p className="font-sans text-[12px] text-[#dfe2ee] font-semibold mt-0.5">
                  BGP anchor verified across 14 AS routes
                </p>
                <span className="font-mono text-[10px] text-[#b9cacb] block">
                  RPKI cryptographic validation confirmed 0 route anomalies
                </span>
              </div>
            </div>
          </div>

          <div className="mt-3 pt-2 border-t border-[#3b494b] flex items-center justify-between font-mono text-[11px] text-[#b9cacb]">
            <span>LOG STREAM: AUDIT_IMMUTABLE</span>
            <button
              onClick={() => onNavigate('admin')}
              className="text-[#dbfcff] hover:underline font-bold uppercase flex items-center gap-1 cursor-pointer"
            >
              <span>EXPAND AUDIT</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>

      {/* Persistent System Status Ribbon */}
      <div className="bg-[#0a0e16] p-3 border border-[#3b494b] flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 font-mono text-[10px] text-[#849495] uppercase tracking-wider">
          <span className="material-symbols-outlined text-[16px] text-[#4edea3]">health_and_safety</span>
          <span>SUBSYSTEM ORCHESTRATION INTEGRITY:</span>
        </div>

        <div className="flex flex-wrap items-center gap-3 font-mono text-[11px]">
          <div className="flex items-center gap-1.5 px-2 py-0.5 bg-[#262a33] border border-[#3b494b]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3]"></span>
            <span className="text-[#b9cacb]">API:</span>
            <span className="text-[#4edea3] font-bold">Healthy (14ms)</span>
          </div>

          <div className="flex items-center gap-1.5 px-2 py-0.5 bg-[#262a33] border border-[#3b494b]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3]"></span>
            <span className="text-[#b9cacb]">Graph DB:</span>
            <span className="text-[#4edea3] font-bold">Healthy (Cluster Synced)</span>
          </div>

          <div className="flex items-center gap-1.5 px-2 py-0.5 bg-[#262a33] border border-[#3b494b]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3]"></span>
            <span className="text-[#b9cacb]">Search Index:</span>
            <span className="text-[#4edea3] font-bold">Healthy (0.42ms)</span>
          </div>

          <div className="flex items-center gap-1.5 px-2 py-0.5 bg-[#262a33] border border-[#3b494b]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3]"></span>
            <span className="text-[#b9cacb]">Ingestion Engine:</span>
            <span className="text-[#4edea3] font-bold">Healthy (98.4K/s)</span>
          </div>
        </div>

        <div className="flex items-center gap-1 font-mono text-[11px] text-[#849495]">
          <span className="material-symbols-outlined text-[14px]">lock</span>
          <span>AIR-GAP HARDENED</span>
        </div>
      </div>

      {/* Circuit Manager Modal */}
      {showCircuitModal && (
        <div className="fixed inset-0 z-50 bg-[#0f131c]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-[#181c24] border border-[#3b494b] p-6 shadow-2xl flex flex-col gap-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#3b494b]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#00f0ff] text-[20px]">tune</span>
                <h3 className="font-headline text-lg font-bold text-[#dbfcff]">
                  TOR &amp; I2P CIRCUIT MONITOR MANAGER
                </h3>
              </div>
              <button
                onClick={() => setShowCircuitModal(false)}
                className="text-[#849495] hover:text-[#dfe2ee]"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <p className="font-sans text-xs text-[#b9cacb]">
              Dynamic circuit dispatch router. Re-assign guard nodes or flush exit hops to restore degraded or timed-out crawler ingress.
            </p>

            <div className="space-y-2 font-mono text-xs">
              <div className="p-2.5 bg-[#0a0e16] border border-[#3b494b] flex items-center justify-between">
                <div>
                  <div className="text-[#dbfcff] font-bold">RussianUnderground (RTT Jitter 1840ms)</div>
                  <div className="text-[10px] text-[#849495]">Route: Guard-08 -&gt; Relay-22 -&gt; Exit-11</div>
                </div>
                <button
                  onClick={() => handleResetCircuit('RU')}
                  className="px-3 py-1 bg-[#ffb95f]/20 hover:bg-[#ffb95f] hover:text-[#00363a] text-[#ffb95f] border border-[#ffb95f] text-[11px] font-bold"
                >
                  {circuitResetting === 'RU' ? 'RE-ROUTING...' : 'RE-CYCLE CIRCUIT'}
                </button>
              </div>

              <div className="p-2.5 bg-[#0a0e16] border border-[#3b494b] flex items-center justify-between">
                <div>
                  <div className="text-[#ffb4ab] font-bold">DarkLeaks Paste Mirr-4 (Timeout)</div>
                  <div className="text-[10px] text-[#849495]">Guard reset failed. Circuit dropped at exit #409.</div>
                </div>
                <button
                  onClick={() => handleResetCircuit('DL')}
                  className="px-3 py-1 bg-[#93000a]/40 hover:bg-[#93000a] text-[#ffb4ab] border border-[#ffb4ab] text-[11px] font-bold"
                >
                  {circuitResetting === 'DL' ? 'RE-BUILDING...' : 'PURGE & RE-BUILD'}
                </button>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowCircuitModal(false)}
                className="px-4 py-1.5 bg-[#262a33] text-[#dbfcff] hover:bg-[#31353e] font-mono text-xs font-bold"
              >
                Close Manager
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

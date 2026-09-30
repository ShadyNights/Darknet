import React, { useState } from 'react';
import { AUDIT_BLOCKS, ENCLAVE_USERS } from '../../data/mockData';
import { ScreenId, AdminTab } from '../../types';

interface AdminScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const AdminScreen: React.FC<AdminScreenProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('audit');
  const [isVerifyingLedger, setIsVerifyingLedger] = useState(false);
  const [ledgerVerified, setLedgerVerified] = useState(false);
  const [userList, setUserList] = useState(ENCLAVE_USERS);

  // Engine weights state
  const [weights, setWeights] = useState({
    linguistic: 52,
    cryptographic: 28,
    blockchain: 20,
    infrastructure: 35,
    minConfidence: 85,
  });
  const [weightsSaved, setWeightsSaved] = useState(false);

  const handleVerifyLedger = () => {
    setIsVerifyingLedger(true);
    setTimeout(() => {
      setIsVerifyingLedger(false);
      setLedgerVerified(true);
      setTimeout(() => setLedgerVerified(false), 4000);
    }, 1200);
  };

  const handleRevokeUser = (id: string) => {
    setUserList(
      userList.map((u) => (u.id === id ? { ...u, status: 'Inactive' } : u))
    );
  };

  const handleSaveWeights = (e: React.FormEvent) => {
    e.preventDefault();
    setWeightsSaved(true);
    setTimeout(() => setWeightsSaved(false), 2000);
  };

  return (
    <div className="flex flex-col w-full gap-4 pb-12 font-mono">
      {/* Top Banner Ribbon */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#0a0e16] p-3 border border-[#3b494b]">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-[#262a33] text-[#dbfcff] border border-[#3b494b]">
            <span className="material-symbols-outlined text-[16px] text-[#00f0ff]">
              admin_panel_settings
            </span>
            <span className="text-[11px] font-bold tracking-wider uppercase">
              ENCLAVE GOVERNANCE // SYSTEM ADMINISTRATION
            </span>
          </div>
          <span className="text-xs text-[#849495]">
            SOVEREIGN HARDENED ENVIRONMENT · CLEARANCE: LEVEL 5
          </span>
        </div>

        <button
          onClick={() => onNavigate('dashboard')}
          className="px-3 py-1 bg-[#141923] hover:bg-[#262a33] border border-[#3b494b] text-xs text-[#dbfcff] flex items-center gap-1.5 transition-colors"
        >
          <span className="material-symbols-outlined text-[14px] text-[#00f0ff]">dashboard</span>
          TACTICAL RADAR
        </button>
      </div>

      {/* Admin Tabs */}
      <div className="flex border-b border-[#3b494b] bg-[#0a0e16] p-1 gap-1 text-xs">
        <button
          onClick={() => setActiveTab('audit')}
          className={`px-4 py-2 font-bold transition-colors flex items-center gap-1.5 ${
            activeTab === 'audit'
              ? 'bg-[#141923] text-[#00f0ff] border-b-2 border-[#00f0ff]'
              : 'text-[#849495] hover:text-[#dbfcff]'
          }`}
        >
          <span className="material-symbols-outlined text-sm">enhanced_encryption</span>
          IMMUTABLE AUDIT LEDGER
        </button>

        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2 font-bold transition-colors flex items-center gap-1.5 ${
            activeTab === 'users'
              ? 'bg-[#141923] text-[#00f0ff] border-b-2 border-[#00f0ff]'
              : 'text-[#849495] hover:text-[#dbfcff]'
          }`}
        >
          <span className="material-symbols-outlined text-sm">badge</span>
          USER DIRECTORY &amp; CAC CLEARANCE
        </button>

        <button
          onClick={() => setActiveTab('sources')}
          className={`px-4 py-2 font-bold transition-colors flex items-center gap-1.5 ${
            activeTab === 'sources'
              ? 'bg-[#141923] text-[#00f0ff] border-b-2 border-[#00f0ff]'
              : 'text-[#849495] hover:text-[#dbfcff]'
          }`}
        >
          <span className="material-symbols-outlined text-sm">satellite_alt</span>
          INGESTION SOURCES HEALTH
        </button>

        <button
          onClick={() => setActiveTab('parameters')}
          className={`px-4 py-2 font-bold transition-colors flex items-center gap-1.5 ${
            activeTab === 'parameters'
              ? 'bg-[#141923] text-[#00f0ff] border-b-2 border-[#00f0ff]'
              : 'text-[#849495] hover:text-[#dbfcff]'
          }`}
        >
          <span className="material-symbols-outlined text-sm">tune</span>
          HEURISTICS ENGINE TUNING
        </button>
      </div>

      {/* TAB 1: AUDIT LEDGER */}
      {activeTab === 'audit' && (
        <div className="space-y-4">
          <div className="bg-[#0e131d] border border-[#3b494b] p-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="font-bold text-[#dbfcff] text-xs uppercase flex items-center gap-2">
                <span className="material-symbols-outlined text-[#00f0ff] text-base">verified</span>
                CRYPTOGRAPHIC MERKLE AUDIT TRAIL
              </h3>
              <p className="text-[11px] text-[#849495] mt-0.5">
                Every investigative view, dossier export, and attribution confirmation is permanently anchored into SHA-256 Merkle blocks.
              </p>
            </div>

            <button
              onClick={handleVerifyLedger}
              disabled={isVerifyingLedger}
              className="px-4 py-2 bg-[#00f0ff] hover:bg-[#7df4ff] text-[#00363a] font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
            >
              {isVerifyingLedger ? (
                <>
                  <span className="material-symbols-outlined text-sm animate-spin">refresh</span>
                  VERIFYING BLOCK INTEGRITY...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-sm">check_circle</span>
                  VERIFY MERKLE INTEGRITY
                </>
              )}
            </button>
          </div>

          {ledgerVerified && (
            <div className="p-3 bg-[#4edea3]/10 border border-[#4edea3] text-[#4edea3] text-xs flex items-center gap-2 animate-in fade-in">
              <span className="material-symbols-outlined text-base">verified</span>
              <span>
                SUCCESS: All 16 blocks cryptographically verified with zero hash discrepancies. Sovereign chain unbroken!
              </span>
            </div>
          )}

          {/* Audit Blocks Table */}
          <div className="bg-[#0e131d] border border-[#3b494b] overflow-x-auto shadow-sm">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#141923] border-b border-[#3b494b] text-[10px] text-[#849495] uppercase">
                  <th className="py-2.5 px-3">Block #</th>
                  <th className="py-2.5 px-3">Timestamp (UTC)</th>
                  <th className="py-2.5 px-3">Analyst / Role</th>
                  <th className="py-2.5 px-3">Action Description</th>
                  <th className="py-2.5 px-3">Target Entity</th>
                  <th className="py-2.5 px-3">Record Hash &amp; Proof</th>
                  <th className="py-2.5 px-3 text-right">Integrity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#3b494b]/40">
                {AUDIT_BLOCKS.map((block) => (
                  <tr key={block.blockIndex} className="hover:bg-[#141923]/60 transition-colors">
                    <td className="py-2.5 px-3 font-bold text-[#00f0ff]">
                      #{String(block.blockIndex).padStart(4, '0')}
                    </td>
                    <td className="py-2.5 px-3 text-[#dbfcff]">{block.timeUtc}</td>
                    <td className="py-2.5 px-3">
                      <div className="text-[#dbfcff] font-bold">{block.user}</div>
                      <div className="text-[10px] text-[#849495]">{block.role}</div>
                    </td>
                    <td className="py-2.5 px-3 text-[#b9cacb]">{block.action}</td>
                    <td className="py-2.5 px-3 text-[#ffb86c] font-mono">{block.entityRef}</td>
                    <td className="py-2.5 px-3">
                      <div className="text-[10px] text-[#849495] font-mono truncate max-w-[200px] select-all">
                        {block.recordHash}
                      </div>
                      <div className="text-[9px] text-[#4edea3]">Signer: {block.notarizationKey}</div>
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <span className="px-2 py-0.5 bg-[#4edea3]/20 text-[#4edea3] border border-[#4edea3]/40 text-[9px] font-bold">
                        {block.chainStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: USER DIRECTORY & CAC CLEARANCE */}
      {activeTab === 'users' && (
        <div className="space-y-4">
          <div className="bg-[#0e131d] border border-[#3b494b] p-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="font-bold text-[#dbfcff] text-xs uppercase flex items-center gap-2">
                <span className="material-symbols-outlined text-[#00f0ff] text-base">badge</span>
                SOVEREIGN ENCLAVE OPERATORS &amp; ANALYST CAC TOKENS
              </h3>
              <p className="text-[11px] text-[#849495] mt-0.5">
                Common Access Card (CAC) and FIPS 140-3 hardware security module token management.
              </p>
            </div>
            <span className="text-xs text-[#849495]">
              ACTIVE OPERATORS: <strong className="text-[#4edea3]">{userList.filter((u) => u.status === 'Active').length}</strong>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {userList.map((user) => (
              <div
                key={user.id}
                className="bg-[#0e131d] border border-[#3b494b] p-4 space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-[#3b494b]/60 pb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#1b2230] border border-[#3b494b] flex items-center justify-center text-[#00f0ff] text-xs font-bold">
                        {user.fullName.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-bold text-[#dbfcff] text-xs">{user.fullName}</div>
                        <div className="text-[10px] text-[#849495]">{user.rank}</div>
                      </div>
                    </div>
                    <span
                      className={`px-2 py-0.5 text-[9px] font-bold border uppercase ${
                        user.status === 'Active'
                          ? 'bg-[#4edea3]/20 text-[#4edea3] border-[#4edea3]/40'
                          : 'bg-[#ff5555]/20 text-[#ff5555] border-[#ff5555]/40'
                      }`}
                    >
                      {user.status}
                    </span>
                  </div>

                  <div className="space-y-1.5 pt-3 text-xs">
                    <div className="flex justify-between text-[#849495]">
                      <span>Role:</span>
                      <span className="text-[#dbfcff] font-bold">{user.role}</span>
                    </div>
                    <div className="flex justify-between text-[#849495]">
                      <span>Clearance:</span>
                      <span className="text-[#ff5555] font-bold">{user.clearance}</span>
                    </div>
                    <div className="flex justify-between text-[#849495]">
                      <span>Node IP:</span>
                      <span className="text-[#00f0ff] font-mono">{user.ip}</span>
                    </div>
                    <div className="flex justify-between text-[#849495]">
                      <span>CAC Serial:</span>
                      <span className="text-[#dbfcff] font-mono">{user.cacId}</span>
                    </div>
                    <div className="flex justify-between text-[#849495]">
                      <span>Last Login:</span>
                      <span className="text-[#dbfcff]">{user.relativeTime}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#3b494b]/40 flex justify-between items-center">
                  <span className="text-[10px] text-[#849495]">CAC Expiry: {user.cacExpiry}</span>
                  {user.status === 'Active' && (
                    <button
                      onClick={() => handleRevokeUser(user.id)}
                      className="px-2 py-0.5 border border-[#ff5555]/40 text-[#ff5555] hover:bg-[#ff5555]/10 text-[10px] transition-colors"
                    >
                      REVOKE ACCESS
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: INGESTION SOURCES HEALTH */}
      {activeTab === 'sources' && (
        <div className="space-y-4">
          <div className="bg-[#0e131d] border border-[#3b494b] p-4">
            <h3 className="font-bold text-[#dbfcff] text-xs uppercase flex items-center gap-2">
              <span className="material-symbols-outlined text-[#00f0ff] text-base">sensors</span>
              INTELLIGENCE INGESTION PIPELINES &amp; CRAWLER CLUSTERS
            </h3>
            <p className="text-[11px] text-[#849495] mt-0.5">
              Live crawler status across darknet marketplaces, Tor exit relays, and monitored Telegram channels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#0e131d] border border-[#3b494b] p-4 space-y-3">
              <div className="flex justify-between items-center border-b border-[#3b494b]/60 pb-2">
                <span className="font-bold text-[#dbfcff] text-xs">MarketX Onion Scraper Pool</span>
                <span className="px-2 py-0.5 bg-[#4edea3]/20 text-[#4edea3] text-[9px] font-bold border border-[#4edea3]/40">
                  HEALTHY (32/32 Circuits)
                </span>
              </div>
              <div className="text-xs space-y-1 text-[#849495]">
                <div>Ingestion Rate: <strong className="text-[#dbfcff]">140 records / min</strong></div>
                <div>Last Sync: <strong className="text-[#00f0ff]">3 seconds ago</strong></div>
                <div>Queue Backlog: <strong className="text-[#4edea3]">0 items</strong></div>
              </div>
            </div>

            <div className="bg-[#0e131d] border border-[#3b494b] p-4 space-y-3">
              <div className="flex justify-between items-center border-b border-[#3b494b]/60 pb-2">
                <span className="font-bold text-[#dbfcff] text-xs">Dread Forum &amp; Exploit.in Mirror</span>
                <span className="px-2 py-0.5 bg-[#4edea3]/20 text-[#4edea3] text-[9px] font-bold border border-[#4edea3]/40">
                  HEALTHY (18/18 Workers)
                </span>
              </div>
              <div className="text-xs space-y-1 text-[#849495]">
                <div>Ingestion Rate: <strong className="text-[#dbfcff]">88 threads / min</strong></div>
                <div>Last Sync: <strong className="text-[#00f0ff]">12 seconds ago</strong></div>
                <div>Queue Backlog: <strong className="text-[#4edea3]">2 items</strong></div>
              </div>
            </div>

            <div className="bg-[#0e131d] border border-[#3b494b] p-4 space-y-3">
              <div className="flex justify-between items-center border-b border-[#3b494b]/60 pb-2">
                <span className="font-bold text-[#dbfcff] text-xs">Bitcoin UTXO &amp; Mempool Snooper</span>
                <span className="px-2 py-0.5 bg-[#4edea3]/20 text-[#4edea3] text-[9px] font-bold border border-[#4edea3]/40">
                  SYNCED (Block #892,104)
                </span>
              </div>
              <div className="text-xs space-y-1 text-[#849495]">
                <div>Tracked Addresses: <strong className="text-[#dbfcff]">4,820</strong></div>
                <div>Mixer Unpeel Engine: <strong className="text-[#00f0ff]">Wasabi &amp; Whirlpool Active</strong></div>
              </div>
            </div>

            <div className="bg-[#0e131d] border border-[#3b494b] p-4 space-y-3">
              <div className="flex justify-between items-center border-b border-[#3b494b]/60 pb-2">
                <span className="font-bold text-[#dbfcff] text-xs">Telegram Underground Channels (Asia/ME)</span>
                <span className="px-2 py-0.5 bg-[#ffb86c]/20 text-[#ffb86c] text-[9px] font-bold border border-[#ffb86c]/40">
                  LATENCY ELEVATED (4.2s)
                </span>
              </div>
              <div className="text-xs space-y-1 text-[#849495]">
                <div>Channels Monitored: <strong className="text-[#dbfcff]">142 Sovereign Feeds</strong></div>
                <div>Anti-Flood Throttling: <strong className="text-[#ffb86c]">Enabled (API Rate Limit)</strong></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: HEURISTICS ENGINE TUNING */}
      {activeTab === 'parameters' && (
        <form
          onSubmit={handleSaveWeights}
          className="bg-[#0e131d] border border-[#3b494b] p-5 space-y-4 max-w-2xl"
        >
          <div className="border-b border-[#3b494b]/60 pb-3">
            <h3 className="font-bold text-[#dbfcff] text-xs uppercase flex items-center gap-2">
              <span className="material-symbols-outlined text-[#00f0ff] text-base">tune</span>
              ATTRIBUTION LOG-ODDS HEURISTICS WEIGHTS
            </h3>
            <p className="text-[11px] text-[#849495] mt-0.5">
              Tune prior probability multipliers for the Bayesian persona correlation algorithm.
            </p>
          </div>

          {weightsSaved && (
            <div className="p-2.5 bg-[#4edea3]/10 border border-[#4edea3] text-[#4edea3] text-xs">
              Heuristic weights applied to active enclave engine!
            </div>
          )}

          <div className="space-y-4 text-xs">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-[#dbfcff]">Stylometric &amp; Dialectology Weight</span>
                <span className="text-[#00f0ff] font-bold">{weights.linguistic}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="80"
                value={weights.linguistic}
                onChange={(e) =>
                  setWeights({ ...weights, linguistic: Number(e.target.value) })
                }
                className="w-full accent-[#00f0ff]"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-[#dbfcff]">Cryptographic Key Ring Affinity Weight</span>
                <span className="text-[#00f0ff] font-bold">{weights.cryptographic}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="80"
                value={weights.cryptographic}
                onChange={(e) =>
                  setWeights({ ...weights, cryptographic: Number(e.target.value) })
                }
                className="w-full accent-[#00f0ff]"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-[#dbfcff]">UTXO Co-Spend Cluster Weight</span>
                <span className="text-[#00f0ff] font-bold">{weights.blockchain}%</span>
              </div>
              <input
                type="range"
                min="5"
                max="50"
                value={weights.blockchain}
                onChange={(e) =>
                  setWeights({ ...weights, blockchain: Number(e.target.value) })
                }
                className="w-full accent-[#00f0ff]"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-[#dbfcff]">Minimum Confidence for Auto-Adjudication Alert</span>
                <span className="text-[#4edea3] font-bold">{weights.minConfidence}%</span>
              </div>
              <input
                type="range"
                min="70"
                max="98"
                value={weights.minConfidence}
                onChange={(e) =>
                  setWeights({ ...weights, minConfidence: Number(e.target.value) })
                }
                className="w-full accent-[#4edea3]"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-[#3b494b]/60 flex justify-end">
            <button
              type="submit"
              className="px-5 py-2 bg-[#00f0ff] hover:bg-[#7df4ff] text-[#00363a] font-bold text-xs"
            >
              APPLY POLICY CONFIGURATION
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

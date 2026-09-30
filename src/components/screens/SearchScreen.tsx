import React, { useState } from 'react';
import { ScreenId } from '../../types';

interface SearchScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onSelectActor?: (actorId: string) => void;
}

export const SearchScreen: React.FC<SearchScreenProps> = ({
  onNavigate,
  onSelectActor,
}) => {
  const [query, setQuery] = useState('ShadowVendor77');
  const [searched, setSearched] = useState(true);
  const [activeSources, setActiveSources] = useState({
    darknet: true,
    telegram: true,
    blockchain: true,
    tor: true,
  });

  const sampleResults = [
    {
      id: 'RES-01',
      title: 'Actor Profile: ShadowVendor77 (A-0142)',
      domain: 'Sovereign Actor Directory',
      source: 'Internal Registry & Intelligence Enclave',
      score: 99,
      timestamp: '2026-09-18 04:00 UTC',
      snippet:
        'Matched Handle: ShadowVendor77 | PGP Fingerprint: 3F2A BD81 4099 22E1 A08C... | Category: Stolen Telecom Data | 142 Intercepted Posts.',
      actorId: 'A-0142',
      type: 'ACTOR',
    },
    {
      id: 'RES-02',
      title: 'Attribution Candidate C-1042: ShadowVendor77 ↔ NightTrader',
      domain: 'Bayesian Heuristics Engine',
      source: 'MarketX vs Dread Forum Correlator',
      score: 96,
      timestamp: '2026-09-17 18:42 UTC',
      snippet:
        'Tri-vector match confirmed: Shared Wasabi CoinJoin UTXO cluster, identical Ed25519 subkey digest, South Asian English syntactic fingerprint (+2.85 LOR).',
      actorId: 'A-0142',
      type: 'ATTRIBUTION',
    },
    {
      id: 'RES-03',
      title: 'Infrastructure Node: svend77hidden99x7ab2...onion',
      domain: 'Tor V3 Recon Service',
      source: 'Crawler Enclave Node 4',
      score: 92,
      timestamp: '2026-09-16 11:20 UTC',
      snippet:
        'Unmasked to clearnet IP 185.220.101.42 (Bucharest, Romania). Reverse PTR leak: host-91-240-118-42.srl-colo.eu. TLS cert SHA256 match.',
      type: 'INFRA',
    },
    {
      id: 'RES-04',
      title: 'Blockchain UTXO Cluster: bc1q87xvd3m8u9e2m09xwrf823k4j89as091jklq23',
      domain: 'Ledger Forensics',
      source: 'Bitcoin Mainnet Memory Pool',
      score: 88,
      timestamp: '2026-09-15 09:12 UTC',
      snippet:
        'Cumulative flow: 42.8 BTC. 14 Hops tracked through Wasabi CoinJoin mixer. Output merged with deposit address on MarketX escrow.',
      actorId: 'A-0142',
      type: 'WALLET',
    },
    {
      id: 'RES-05',
      title: 'Breached Telecom Subscriber Dump: 4.8M Records',
      domain: 'Darknet Marketplace Intercept',
      source: 'MarketX Listing #88921',
      score: 84,
      timestamp: '2026-08-30 22:15 UTC',
      snippet:
        'Seller: ShadowVendor77. Asking price: 1.25 BTC. Sample contains Indian Aadhaar numbers, IMSI, and tower logs. Admissibility Sec 65B notarized.',
      actorId: 'A-0142',
      type: 'BREACH',
    },
  ];

  const handleQuickSearch = (term: string) => {
    setQuery(term);
    setSearched(true);
  };

  return (
    <div className="flex flex-col w-full gap-4 pb-12 font-mono">
      {/* Top Banner Ribbon */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#0a0e16] p-3 border border-[#3b494b]">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-[#262a33] text-[#dbfcff] border border-[#3b494b]">
            <span className="material-symbols-outlined text-[16px] text-[#00f0ff]">
              travel_explore
            </span>
            <span className="text-[11px] font-bold tracking-wider uppercase">
              MULTI-MODAL FORENSIC SEARCH // C4I QUERY
            </span>
          </div>
          <span className="text-xs text-[#849495]">
            SUPPORTS HANDLES, PGP KEYS, ONIONS, UTXOS, AND REGEX
          </span>
        </div>

        <button
          onClick={() => onNavigate('timeline')}
          className="px-3 py-1 bg-[#141923] hover:bg-[#262a33] border border-[#3b494b] text-xs text-[#dbfcff] flex items-center gap-1.5 transition-colors"
        >
          <span className="material-symbols-outlined text-[14px] text-[#00f0ff]">timeline</span>
          TIMELINE STREAM
        </button>
      </div>

      {/* Search Input Box */}
      <div className="bg-[#0e131d] border border-[#3b494b] p-4 space-y-3">
        <div className="relative flex items-center">
          <span className="material-symbols-outlined absolute left-3 text-[#00f0ff] text-xl">
            search
          </span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && setSearched(true)}
            placeholder="Search by Handle, Alias, PGP Key, Onion v3, BTC Address, or RegEx..."
            className="w-full bg-[#141923] border-2 border-[#3b494b] focus:border-[#00f0ff] pl-10 pr-24 py-2.5 text-xs text-[#dbfcff] placeholder-[#849495] focus:outline-hidden"
          />
          <button
            onClick={() => setSearched(true)}
            className="absolute right-2 px-4 py-1.5 bg-[#00f0ff] hover:bg-[#7df4ff] text-[#00363a] font-bold text-xs transition-colors flex items-center gap-1"
          >
            EXECUTE
          </button>
        </div>

        {/* Quick query chips */}
        <div className="flex items-center gap-2 flex-wrap text-[10px]">
          <span className="text-[#849495]">QUICK PIVOTS:</span>
          <button
            onClick={() => handleQuickSearch('ShadowVendor77')}
            className="px-2 py-0.5 bg-[#141923] hover:bg-[#262a33] text-[#00f0ff] border border-[#3b494b]"
          >
            ShadowVendor77
          </button>
          <button
            onClick={() => handleQuickSearch('NightTrader')}
            className="px-2 py-0.5 bg-[#141923] hover:bg-[#262a33] text-[#dbfcff] border border-[#3b494b]"
          >
            NightTrader
          </button>
          <button
            onClick={() => handleQuickSearch('bc1q87xvd3m8u9e2m09xwrf823k4j89as091jklq23')}
            className="px-2 py-0.5 bg-[#141923] hover:bg-[#262a33] text-[#ffb86c] border border-[#3b494b]"
          >
            bc1q87x...q23 (BTC)
          </button>
          <button
            onClick={() => handleQuickSearch('svend77hidden99x7ab2...onion')}
            className="px-2 py-0.5 bg-[#141923] hover:bg-[#262a33] text-[#4edea3] border border-[#3b494b]"
          >
            🧅 svend77...onion
          </button>
        </div>

        {/* Source filter toggles */}
        <div className="flex items-center gap-4 flex-wrap pt-2 border-t border-[#3b494b]/40 text-xs">
          <span className="text-[10px] text-[#849495] uppercase">INDEX REPOSITORIES:</span>
          <label className="flex items-center gap-1.5 cursor-pointer text-[#dbfcff]">
            <input
              type="checkbox"
              checked={activeSources.darknet}
              onChange={(e) =>
                setActiveSources({ ...activeSources, darknet: e.target.checked })
              }
              className="accent-[#00f0ff]"
            />
            <span>Darknet Forums &amp; Markets</span>
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer text-[#dbfcff]">
            <input
              type="checkbox"
              checked={activeSources.telegram}
              onChange={(e) =>
                setActiveSources({ ...activeSources, telegram: e.target.checked })
              }
              className="accent-[#00f0ff]"
            />
            <span>Telegram Channel Intercepts</span>
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer text-[#dbfcff]">
            <input
              type="checkbox"
              checked={activeSources.blockchain}
              onChange={(e) =>
                setActiveSources({ ...activeSources, blockchain: e.target.checked })
              }
              className="accent-[#00f0ff]"
            />
            <span>Blockchain Ledgers</span>
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer text-[#dbfcff]">
            <input
              type="checkbox"
              checked={activeSources.tor}
              onChange={(e) =>
                setActiveSources({ ...activeSources, tor: e.target.checked })
              }
              className="accent-[#00f0ff]"
            />
            <span>Tor Onion Descriptors</span>
          </label>
        </div>
      </div>

      {/* Results Section */}
      {searched && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-[#849495] px-1">
            <span>
              SHOWING <strong className="text-[#dbfcff]">{sampleResults.length}</strong> HITS FOR &quot;{query}&quot;
            </span>
            <span>QUERY LATENCY: 34ms (INDEX: SOVEREIGN-V3)</span>
          </div>

          <div className="space-y-3">
            {sampleResults.map((result) => (
              <div
                key={result.id}
                className="bg-[#0e131d] border border-[#3b494b] hover:border-[#00f0ff]/50 p-4 transition-all duration-150 space-y-2.5"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#3b494b]/40 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.5 bg-[#262a33] text-[#00f0ff] text-[9px] font-bold border border-[#3b494b]">
                      {result.type}
                    </span>
                    <h3 className="font-bold text-[#dbfcff] text-xs hover:text-[#00f0ff] cursor-pointer">
                      {result.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-3 text-[10px] text-[#849495]">
                    <span>RELEVANCE: <strong className="text-[#4edea3]">{result.score}%</strong></span>
                    <span>{result.timestamp}</span>
                  </div>
                </div>

                <div className="text-xs text-[#b9cacb] leading-relaxed">
                  {result.snippet}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-[10px] text-[#849495]">
                  <div className="flex items-center gap-2">
                    <span>Source: <strong className="text-[#dbfcff]">{result.source}</strong></span>
                    <span>•</span>
                    <span>Domain: <strong className="text-[#00f0ff]">{result.domain}</strong></span>
                  </div>

                  <div className="flex items-center gap-2">
                    {result.actorId && (
                      <button
                        onClick={() => {
                          if (onSelectActor) onSelectActor(result.actorId);
                          onNavigate('actor-detail');
                        }}
                        className="px-2.5 py-1 bg-[#141923] hover:bg-[#262a33] text-[#00f0ff] border border-[#00f0ff]/40 font-bold transition-colors"
                      >
                        VIEW DOSSIER
                      </button>
                    )}
                    <button
                      onClick={() => onNavigate('graph')}
                      className="px-2.5 py-1 bg-[#262a33] hover:bg-[#3b494b] text-[#dbfcff] transition-colors"
                    >
                      GRAPH INSPECT
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

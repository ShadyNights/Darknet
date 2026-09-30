import React, { useState } from 'react';
import { ScreenId } from '../../types';

interface GraphScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onSelectActor?: (actorId: string) => void;
}

interface Node {
  id: string;
  name: string;
  type: 'actor' | 'persona' | 'wallet' | 'infra' | 'breach';
  x: number;
  y: number;
  r: number;
  color: string;
  detail: string;
  meta: string;
}

interface Edge {
  from: string;
  to: string;
  label: string;
  weight: number;
}

export const GraphScreen: React.FC<GraphScreenProps> = ({
  onNavigate,
  onSelectActor,
}) => {
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [activeTypes, setActiveTypes] = useState({
    actor: true,
    persona: true,
    wallet: true,
    infra: true,
    breach: true,
  });

  const nodes: Node[] = [
    {
      id: 'n-target',
      name: 'ShadowVendor77 (A-0142)',
      type: 'actor',
      x: 380,
      y: 260,
      r: 32,
      color: '#00f0ff',
      detail: 'Primary sovereign target entity. Confirmed de-anonymization score 94%.',
      meta: 'Admissibility 94% · Sec 65B Certified',
    },
    {
      id: 'n-p1',
      name: 'MarketX: ShadowVendor77',
      type: 'persona',
      x: 220,
      y: 150,
      r: 22,
      color: '#4edea3',
      detail: 'MarketX identity. 89 verified escrow sales of telecom and database dumps.',
      meta: 'Active 2025-04 to present',
    },
    {
      id: 'n-p2',
      name: 'Dread: NightTrader',
      type: 'persona',
      x: 200,
      y: 350,
      r: 22,
      color: '#4edea3',
      detail: 'Dread / Exploit.in identity. Linked via PGP subkey and Wasabi CoinJoin mix.',
      meta: 'Total LOR +2.85 · Candidate C-1042',
    },
    {
      id: 'n-w1',
      name: 'BTC: bc1q87x...q23',
      type: 'wallet',
      x: 540,
      y: 160,
      r: 20,
      color: '#ffb86c',
      detail: 'Primary SegWit cluster address. 42.8 BTC cumulative volume over 14 hops.',
      meta: 'Mixer: Wasabi CoinJoin',
    },
    {
      id: 'n-w2',
      name: 'ETH: 0x71C8...c99',
      type: 'wallet',
      x: 580,
      y: 280,
      r: 18,
      color: '#ffb86c',
      detail: 'Gnosis Safe 2/3 multi-sig contract holding escrow security bonds.',
      meta: 'Volume: 18.4 ETH',
    },
    {
      id: 'n-inf1',
      name: '🧅 svend77...onion',
      type: 'infra',
      x: 320,
      y: 430,
      r: 22,
      color: '#ff79c6',
      detail: 'Tor v3 hidden service hosting automated dump drops.',
      meta: 'Rendezvous: 3 Nodes active',
    },
    {
      id: 'n-inf2',
      name: 'IP: 185.220.101.42',
      type: 'infra',
      x: 480,
      y: 440,
      r: 20,
      color: '#ff79c6',
      detail: 'De-anonymized clearnet host. HostRoyale S.R.L., Bucharest Romania.',
      meta: 'Reverse PTR: host-91-240-118-42.srl-colo.eu',
    },
    {
      id: 'n-br1',
      name: 'Telecom Exfil 4.8M',
      type: 'breach',
      x: 100,
      y: 240,
      r: 18,
      color: '#ff5555',
      detail: 'Subscriber IMSI, tower records, and identity files offered on MarketX.',
      meta: 'Exhibit NTRO-EVID-88194',
    },
  ];

  const edges: Edge[] = [
    { from: 'n-target', to: 'n-p1', label: 'Primary Persona', weight: 4 },
    { from: 'n-target', to: 'n-p2', label: 'Correlated Link (+2.85 LOR)', weight: 3 },
    { from: 'n-target', to: 'n-w1', label: 'Deposit Control', weight: 3 },
    { from: 'n-target', to: 'n-w2', label: 'Multi-sig Signer', weight: 2 },
    { from: 'n-target', to: 'n-inf1', label: 'Operates Service', weight: 3 },
    { from: 'n-inf1', to: 'n-inf2', label: 'TLS Cert / PTR Leak', weight: 4 },
    { from: 'n-p1', to: 'n-br1', label: 'Listed for 1.25 BTC', weight: 2 },
    { from: 'n-p1', to: 'n-w1', label: 'Escrow Payout', weight: 3 },
    { from: 'n-p2', to: 'n-w1', label: 'CoinJoin Co-Spend', weight: 3 },
  ];

  const visibleNodes = nodes.filter((n) => activeTypes[n.type]);
  const visibleEdges = edges.filter(
    (e) =>
      visibleNodes.some((n) => n.id === e.from) &&
      visibleNodes.some((n) => n.id === e.to)
  );

  return (
    <div className="flex flex-col w-full gap-4 pb-12 font-mono">
      {/* Top Banner Ribbon */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#0a0e16] p-3 border border-[#3b494b]">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-[#262a33] text-[#dbfcff] border border-[#3b494b]">
            <span className="material-symbols-outlined text-[16px] text-[#00f0ff]">
              hub
            </span>
            <span className="text-[11px] font-bold tracking-wider uppercase">
              TOPOLOGY CORRELATION // GRAPH RECON
            </span>
          </div>
          <span className="text-xs text-[#849495]">
            CLUSTER: <strong className="text-[#dbfcff]">A-0142 (ShadowVendor77)</strong>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (onSelectActor) onSelectActor('A-0142');
              onNavigate('actor-detail');
            }}
            className="px-3 py-1 bg-[#141923] hover:bg-[#262a33] text-[#00f0ff] border border-[#00f0ff]/40 text-xs font-bold transition-colors"
          >
            VIEW DOSSIER
          </button>
        </div>
      </div>

      {/* Filter and Legend Bar */}
      <div className="bg-[#0e131d] border border-[#3b494b] p-3 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[10px] text-[#849495] uppercase">NODE FILTERS:</span>
          {(['actor', 'persona', 'wallet', 'infra', 'breach'] as const).map((type) => (
            <button
              key={type}
              onClick={() =>
                setActiveTypes({ ...activeTypes, [type]: !activeTypes[type] })
              }
              className={`px-2 py-0.5 text-[10px] border transition-colors ${
                activeTypes[type]
                  ? 'border-[#00f0ff] bg-[#141923] text-[#dbfcff]'
                  : 'border-[#3b494b] text-[#849495] opacity-50'
              }`}
            >
              {type.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="text-[10px] text-[#849495]">
          CLICK ANY NODE TO INSPECT PROPERTIES
        </div>
      </div>

      {/* Main Canvas & Inspector Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* SVG Graph View */}
        <div className="lg:col-span-3 bg-[#0a0e16] border border-[#3b494b] relative min-h-[500px] flex items-center justify-center overflow-hidden">
          {/* Subtle grid background */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(#3b494b 1px, transparent 1px), linear-gradient(90deg, #3b494b 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          ></div>

          <svg
            viewBox="0 0 760 520"
            className="w-full h-full select-none"
            style={{ maxHeight: '600px' }}
          >
            <defs>
              <marker
                id="arrow"
                viewBox="0 0 10 10"
                refX="22"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#3b494b" />
              </marker>
            </defs>

            {/* Render Edges */}
            {visibleEdges.map((e, idx) => {
              const fromNode = nodes.find((n) => n.id === e.from);
              const toNode = nodes.find((n) => n.id === e.to);
              if (!fromNode || !toNode) return null;

              return (
                <g key={idx}>
                  <line
                    x1={fromNode.x}
                    y1={fromNode.y}
                    x2={toNode.x}
                    y2={toNode.y}
                    stroke="#3b494b"
                    strokeWidth={e.weight}
                    strokeDasharray={e.weight < 3 ? '4,4' : undefined}
                  />
                  {/* Edge label */}
                  <text
                    x={(fromNode.x + toNode.x) / 2}
                    y={(fromNode.y + toNode.y) / 2 - 4}
                    fill="#849495"
                    fontSize="9"
                    textAnchor="middle"
                    className="font-mono bg-[#0a0e16]"
                  >
                    {e.label}
                  </text>
                </g>
              );
            })}

            {/* Render Nodes */}
            {visibleNodes.map((n) => {
              const isSelected = selectedNode?.id === n.id;
              return (
                <g
                  key={n.id}
                  onClick={() => setSelectedNode(n)}
                  className="cursor-pointer group"
                >
                  {/* Glow ring if selected */}
                  {isSelected && (
                    <circle
                      cx={n.x}
                      cy={n.y}
                      r={n.r + 8}
                      fill="none"
                      stroke={n.color}
                      strokeWidth="2"
                      strokeDasharray="4,4"
                      className="animate-spin"
                    />
                  )}

                  {/* Main Circle */}
                  <circle
                    cx={n.x}
                    cy={n.y}
                    r={n.r}
                    fill="#141923"
                    stroke={n.color}
                    strokeWidth={isSelected ? '3' : '2'}
                    className="transition-all duration-200 group-hover:scale-110"
                  />

                  {/* Node Label */}
                  <text
                    x={n.x}
                    y={n.y + n.r + 14}
                    fill="#dbfcff"
                    fontSize="10"
                    fontWeight="bold"
                    textAnchor="middle"
                    className="font-mono"
                  >
                    {n.name}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Quick Graph Zoom Overlay Controls */}
          <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-[#141923] border border-[#3b494b] p-1 text-xs">
            <button
              onClick={() => setSelectedNode(nodes[0])}
              className="px-2 py-0.5 hover:bg-[#262a33] text-[#dbfcff]"
            >
              FOCUS TARGET
            </button>
            <button
              onClick={() => setSelectedNode(null)}
              className="px-2 py-0.5 hover:bg-[#262a33] text-[#849495]"
            >
              RESET
            </button>
          </div>
        </div>

        {/* Right Inspector Drawer */}
        <div className="bg-[#0e131d] border border-[#3b494b] p-4 flex flex-col justify-between">
          {selectedNode ? (
            <div className="space-y-4">
              <div className="border-b border-[#3b494b]/60 pb-2">
                <span className="text-[10px] text-[#849495] uppercase font-bold">
                  NODE INSPECTION // {selectedNode.type.toUpperCase()}
                </span>
                <h3 className="text-sm font-bold text-[#dbfcff] mt-1">
                  {selectedNode.name}
                </h3>
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-[10px] text-[#849495] uppercase block">Analysis Notes</span>
                  <p className="text-[#b9cacb] mt-0.5 leading-relaxed">
                    {selectedNode.detail}
                  </p>
                </div>

                <div className="p-2 bg-[#141923] border border-[#3b494b]">
                  <span className="text-[10px] text-[#849495] uppercase block">Cryptographic Meta</span>
                  <span className="text-[#00f0ff] font-mono text-[10px] mt-0.5 block">
                    {selectedNode.meta}
                  </span>
                </div>
              </div>

              {selectedNode.type === 'actor' && (
                <button
                  onClick={() => {
                    if (onSelectActor) onSelectActor('A-0142');
                    onNavigate('actor-detail');
                  }}
                  className="w-full py-2 bg-[#00f0ff] hover:bg-[#7df4ff] text-[#00363a] text-xs font-bold transition-colors"
                >
                  OPEN TARGET DOSSIER →
                </button>
              )}

              {selectedNode.type === 'persona' && (
                <button
                  onClick={() => onNavigate('attribution')}
                  className="w-full py-2 bg-[#141923] hover:bg-[#262a33] text-[#00f0ff] border border-[#00f0ff]/40 text-xs font-bold transition-colors"
                >
                  CORRELATION EXPLAINABILITY →
                </button>
              )}

              {selectedNode.type === 'infra' && (
                <button
                  onClick={() => onNavigate('infrastructure')}
                  className="w-full py-2 bg-[#141923] hover:bg-[#262a33] text-[#00f0ff] border border-[#00f0ff]/40 text-xs font-bold transition-colors"
                >
                  DE-ANONYMIZATION DETAILS →
                </button>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center h-full py-12 text-[#849495]">
              <span className="material-symbols-outlined text-4xl mb-2 text-[#3b494b]">
                touch_app
              </span>
              <p className="text-xs">Select any node on the topology to view cryptographic links, hashes, and dossier pivots.</p>
            </div>
          )}

          <div className="pt-3 border-t border-[#3b494b]/40 text-[10px] text-[#849495]">
            ENCLAVE TOPOLOGY ENGINE V3 · NTRO C4I
          </div>
        </div>
      </div>
    </div>
  );
};

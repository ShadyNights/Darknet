import React, { useState, useId } from 'react';
import { ScreenId } from '../../types';

interface ThreatHeatmapProps {
  onNavigate: (screen: ScreenId) => void;
  onSelectActor?: (actorId: string) => void;
}

export interface Hotspot {
  id: string;
  name: string;
  theater: string;
  lat: number;
  lng: number;
  x: number; // mapped svg coordinate (0 - 1000)
  y: number; // mapped svg coordinate (0 - 500)
  density: number; // 0 - 100
  threatLevel: 'CRITICAL' | 'HIGH' | 'ELEVATED' | 'MODERATE';
  vector: 'stolen-data' | 'tor-exit' | 'utxo-mix' | 'ransomware' | 'exploit';
  vectorLabel: string;
  primaryActor: string;
  actorId?: string;
  incidentsCount: number;
  volume: string;
  unmaskedIp?: string;
  asn?: string;
  description: string;
  recentActivityUtc: string;
}

const HOTSPOTS: Hotspot[] = [
  {
    id: 'HS-DEL',
    name: 'New Delhi / NCR Sector',
    theater: 'South Asia (IND)',
    lat: 28.6139,
    lng: 77.209,
    x: 714,
    y: 171,
    density: 96,
    threatLevel: 'CRITICAL',
    vector: 'stolen-data',
    vectorLabel: 'Telecom & Aadhaar Exfil',
    primaryActor: 'ShadowVendor77 (A-0142)',
    actorId: 'A-0142',
    incidentsCount: 142,
    volume: '4.8M Subscriber Records',
    unmaskedIp: '185.220.101.42 (Linked)',
    asn: 'AS49505 HostRoyale',
    description: 'Primary target zone for large-scale subscriber identity dumps and mobile IMSI database leaks offered on MarketX.',
    recentActivityUtc: '8 mins ago',
  },
  {
    id: 'HS-MUM',
    name: 'Mumbai Financial Corridor',
    theater: 'Western Coast (IND)',
    lat: 19.076,
    lng: 72.8777,
    x: 702,
    y: 197,
    density: 88,
    threatLevel: 'HIGH',
    vector: 'stolen-data',
    vectorLabel: 'Banking Credential Dumps',
    primaryActor: 'GhostBroker',
    actorId: 'A-0142',
    incidentsCount: 89,
    volume: '1.2M Credit / KYC Rows',
    unmaskedIp: '45.154.255.89',
    asn: 'AS200019 Alexhost',
    description: 'Intercepted banking API token leaks and corporate payroll extortion threads detected in Telegram underground relays.',
    recentActivityUtc: '24 mins ago',
  },
  {
    id: 'HS-BUC',
    name: 'Bucharest Colocation Cluster',
    theater: 'Eastern Europe (ROU)',
    lat: 44.4268,
    lng: 26.1025,
    x: 572,
    y: 126,
    density: 92,
    threatLevel: 'CRITICAL',
    vector: 'tor-exit',
    vectorLabel: 'Tor Exit Proxy & Reverse PTR',
    primaryActor: 'svend77hidden...onion',
    actorId: 'A-0142',
    incidentsCount: 118,
    volume: '34 TB Escrow Traffic',
    unmaskedIp: '185.220.101.42',
    asn: 'AS49505 HostRoyale S.R.L.',
    description: 'De-anonymized bulletproof infrastructure hosting darknet onion escrow services. Confirmed TLS certificate SHA-256 match.',
    recentActivityUtc: '14 mins ago',
  },
  {
    id: 'HS-FRA',
    name: 'Frankfurt / Rhine-Main Node',
    theater: 'Western Europe (DEU)',
    lat: 50.1109,
    lng: 8.6821,
    x: 524,
    y: 111,
    density: 81,
    threatLevel: 'HIGH',
    vector: 'utxo-mix',
    vectorLabel: 'Wasabi CoinJoin Cluster',
    primaryActor: 'NightTrader',
    actorId: 'A-0142',
    incidentsCount: 64,
    volume: '42.8 BTC Laundering',
    unmaskedIp: '194.26.29.112',
    asn: 'AS197019 Cherry Servers',
    description: 'Cryptographic UTXO co-spend cluster consolidating escrow payouts from MarketX and Dread forum escrow contracts.',
    recentActivityUtc: '32 mins ago',
  },
  {
    id: 'HS-BKK',
    name: 'Bangkok / Golden Triangle Mesh',
    theater: 'Southeast Asia (THA/MMR)',
    lat: 13.7563,
    lng: 100.5018,
    x: 779,
    y: 212,
    density: 76,
    threatLevel: 'ELEVATED',
    vector: 'stolen-data',
    vectorLabel: 'Syndicate Escrow Arbitrage',
    primaryActor: 'KaliOps',
    incidentsCount: 53,
    volume: '18.4 ETH Multi-sig',
    unmaskedIp: '103.145.13.2',
    asn: 'AS13335 Cloudflare Proxy',
    description: 'Transnational cyber syndicate operating cryptocurrency wash cycles and illicit SIM-swap broker channels.',
    recentActivityUtc: '1 hour ago',
  },
  {
    id: 'HS-ASH',
    name: 'Ashburn / US-East Data Hub',
    theater: 'North America (USA)',
    lat: 39.0438,
    lng: -77.4874,
    x: 285,
    y: 141,
    density: 68,
    threatLevel: 'ELEVATED',
    vector: 'exploit',
    vectorLabel: 'Exploit Brokerage Repos',
    primaryActor: 'NullByte',
    incidentsCount: 41,
    volume: '14 Zero-Day Strains',
    unmaskedIp: '198.51.100.24',
    asn: 'AS16509 Amazon AWS',
    description: 'Staging ground for weaponized zero-day exploits targeting telecom SS7/Diameter routing hardware and gateway interfaces.',
    recentActivityUtc: '2 hours ago',
  },
  {
    id: 'HS-DXB',
    name: 'Dubai Cyber Gateway',
    theater: 'Middle East (UAE)',
    lat: 25.2048,
    lng: 55.2708,
    x: 653,
    y: 180,
    density: 62,
    threatLevel: 'MODERATE',
    vector: 'utxo-mix',
    vectorLabel: 'OTC Crypto Liquidity Desk',
    primaryActor: 'A-0089 (HydraRoot)',
    incidentsCount: 29,
    volume: '15.6 BTC OTC Flow',
    unmaskedIp: '94.200.11.8',
    asn: 'AS5384 Emirates Telecom',
    description: 'Unregistered peer-to-peer cryptocurrency cash-out desk monitored for laundering darknet marketplace proceeds.',
    recentActivityUtc: '3 hours ago',
  },
];

export const ThreatHeatmap: React.FC<ThreatHeatmapProps> = ({
  onNavigate,
  onSelectActor,
}) => {
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot>(HOTSPOTS[0]);
  const [activeVector, setActiveVector] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'hybrid' | 'heat' | 'nodes'>('hybrid');
  const [radarActive, setRadarActive] = useState<boolean>(true);
  const [intensity, setIntensity] = useState<number>(85);

  const baseId = useId();

  // Filter hotspots based on selected vector
  const filteredHotspots = HOTSPOTS.filter((h) => {
    if (activeVector === 'all') return true;
    return h.vector === activeVector;
  });

  return (
    <div className="bg-[#0a0e16] border border-[#3b494b] shadow-xl overflow-hidden font-mono flex flex-col">
      {/* Top Threat Heatmap Header Ribbon */}
      <div className="p-3 bg-[#111622] border-b border-[#3b494b] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#262a33] text-[#dbfcff] border border-[#3b494b]">
            <span className="material-symbols-outlined text-[16px] text-[#00f0ff] animate-pulse">
              public
            </span>
            <span className="text-[11px] font-bold tracking-wider uppercase">
              GLOBAL THREAT DENSITY MAP // TACTICAL GEOPOLITICAL OVERLAY
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#849495]">THEATER:</span>
            <span className="text-[#4edea3] font-bold">INDO-PACIFIC &amp; EURASIA RECON</span>
          </div>
        </div>

        {/* View Mode & Radar Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center bg-[#181f2c] border border-[#3b494b] p-0.5 text-[10px]">
            <button
              onClick={() => setViewMode('hybrid')}
              className={`px-2 py-0.5 font-bold transition-colors ${
                viewMode === 'hybrid'
                  ? 'bg-[#00f0ff] text-[#00363a]'
                  : 'text-[#849495] hover:text-[#dbfcff]'
              }`}
            >
              HYBRID OVERLAY
            </button>
            <button
              onClick={() => setViewMode('heat')}
              className={`px-2 py-0.5 font-bold transition-colors ${
                viewMode === 'heat'
                  ? 'bg-[#00f0ff] text-[#00363a]'
                  : 'text-[#849495] hover:text-[#dbfcff]'
              }`}
            >
              THERMAL DENSITY
            </button>
            <button
              onClick={() => setViewMode('nodes')}
              className={`px-2 py-0.5 font-bold transition-colors ${
                viewMode === 'nodes'
                  ? 'bg-[#00f0ff] text-[#00363a]'
                  : 'text-[#849495] hover:text-[#dbfcff]'
              }`}
            >
              TARGET NODES
            </button>
          </div>

          <button
            onClick={() => setRadarActive(!radarActive)}
            className={`px-2.5 py-1 text-[10px] font-bold border transition-colors flex items-center gap-1 ${
              radarActive
                ? 'bg-[#4edea3]/20 border-[#4edea3]/60 text-[#4edea3]'
                : 'bg-[#181f2c] border-[#3b494b] text-[#849495]'
            }`}
          >
            <span className="material-symbols-outlined text-[13px]">
              {radarActive ? 'radar' : 'motion_photos_off'}
            </span>
            <span>{radarActive ? 'RADAR ACTIVE' : 'RADAR PAUSED'}</span>
          </button>
        </div>
      </div>

      {/* Filter Chips Bar */}
      <div className="px-3 py-2 bg-[#0c1018] border-b border-[#3b494b]/60 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[10px] text-[#849495] uppercase font-bold mr-1">
            VECTOR LAYERS:
          </span>
          {[
            { id: 'all', label: 'ALL VECTORS' },
            { id: 'stolen-data', label: 'STOLEN DATA / TELECOM' },
            { id: 'tor-exit', label: 'TOR UNMASKED PROXIES' },
            { id: 'utxo-mix', label: 'UTXO MIXING CLUSTERS' },
            { id: 'exploit', label: 'EXPLOITS & ZERO-DAYS' },
          ].map((vec) => (
            <button
              key={vec.id}
              onClick={() => setActiveVector(vec.id)}
              className={`px-2 py-0.5 text-[10px] border transition-colors ${
                activeVector === vec.id
                  ? 'border-[#00f0ff] bg-[#00f0ff]/15 text-[#00f0ff] font-bold'
                  : 'border-[#3b494b]/60 text-[#849495] hover:text-[#dbfcff] bg-[#141923]'
              }`}
            >
              {vec.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 text-[10px] text-[#849495]">
          <span>HEAT INTENSITY:</span>
          <input
            type="range"
            min="40"
            max="100"
            value={intensity}
            onChange={(e) => setIntensity(Number(e.target.value))}
            className="w-20 h-1 accent-[#00f0ff] cursor-pointer"
          />
          <span className="text-[#00f0ff] font-bold w-6">{intensity}%</span>
        </div>
      </div>

      {/* Main Interactive Map & Inspector Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 relative">
        {/* SVG World Map View (9 cols on large screen) */}
        <div className="lg:col-span-8 xl:col-span-9 bg-[#070b13] relative overflow-hidden min-h-[360px] md:min-h-[460px] flex items-center justify-center p-2 select-none border-b lg:border-b-0 lg:border-r border-[#3b494b]">
          {/* Subtle Tactical Grid Lines */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage:
                'linear-gradient(to right, #3b494b 1px, transparent 1px), linear-gradient(to bottom, #3b494b 1px, transparent 1px)',
              backgroundSize: '50px 50px',
            }}
          />

          {/* SVG Map Container */}
          <svg
            viewBox="0 0 1000 500"
            className="w-full h-full max-h-[500px] z-10"
            style={{ filter: 'drop-shadow(0 0 12px rgba(0, 240, 255, 0.05))' }}
          >
            <defs>
              {/* Density Heat Radial Gradients */}
              <radialGradient id={`${baseId}-heat-critical`} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ff5555" stopOpacity="0.85" />
                <stop offset="35%" stopColor="#ff79c6" stopOpacity="0.55" />
                <stop offset="70%" stopColor="#ffb86c" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#00f0ff" stopOpacity="0" />
              </radialGradient>

              <radialGradient id={`${baseId}-heat-high`} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffb86c" stopOpacity="0.8" />
                <stop offset="40%" stopColor="#f1fa8c" stopOpacity="0.45" />
                <stop offset="75%" stopColor="#4edea3" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#00f0ff" stopOpacity="0" />
              </radialGradient>

              <radialGradient id={`${baseId}-heat-elevated`} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.75" />
                <stop offset="45%" stopColor="#4edea3" stopOpacity="0.4" />
                <stop offset="80%" stopColor="#00f0ff" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#00363a" stopOpacity="0" />
              </radialGradient>

              {/* Blur Filter for Density Overlay */}
              <filter id={`${baseId}-heat-blur`} x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="16" />
              </filter>
            </defs>

            {/* Latitude / Longitude Tactical Graticules */}
            <g stroke="#263345" strokeWidth="0.75" strokeDasharray="3,3" opacity="0.6">
              {/* Equator */}
              <line x1="0" y1="250" x2="1000" y2="250" stroke="#00f0ff" strokeWidth="1" strokeDasharray="6,4" opacity="0.4" />
              {/* Tropics */}
              <line x1="0" y1="185" x2="1000" y2="185" />
              <line x1="0" y1="315" x2="1000" y2="315" />
              {/* Parallels */}
              <line x1="0" y1="83" x2="1000" y2="83" />
              <line x1="0" y1="417" x2="1000" y2="417" />
              {/* Prime Meridian & Meridians */}
              <line x1="500" y1="0" x2="500" y2="500" stroke="#00f0ff" strokeWidth="1" strokeDasharray="6,4" opacity="0.4" />
              <line x1="250" y1="0" x2="250" y2="500" />
              <line x1="750" y1="0" x2="750" y2="500" />
            </g>

            {/* Stylized World Landmass Silhouettes (Tactical military C4I vector outlines) */}
            <g fill="#141c2c" stroke="#2a394f" strokeWidth="1" opacity="0.95">
              {/* North America */}
              <path d="M 120,60 L 190,40 L 260,50 L 320,80 L 290,130 L 240,150 L 290,190 L 250,220 L 220,180 L 190,180 L 160,150 L 130,120 L 110,80 Z" />
              {/* Greenland */}
              <path d="M 360,30 L 420,25 L 430,60 L 380,80 L 350,60 Z" />
              {/* Central America & Caribbean */}
              <path d="M 220,185 L 260,230 L 240,260 L 210,220 Z" />
              {/* South America */}
              <path d="M 270,250 L 340,270 L 370,330 L 340,430 L 310,470 L 290,420 L 260,330 L 250,270 Z" />
              {/* Europe */}
              <path d="M 470,75 L 530,65 L 580,85 L 590,135 L 530,150 L 480,145 L 460,110 Z" />
              {/* British Isles */}
              <path d="M 460,85 L 480,80 L 475,115 L 455,110 Z" />
              {/* Scandinavia */}
              <path d="M 510,40 L 550,35 L 560,80 L 530,85 Z" />
              {/* Africa */}
              <path d="M 480,165 L 570,170 L 610,240 L 580,350 L 520,390 L 470,300 L 450,210 Z" />
              {/* Madagascar */}
              <path d="M 625,320 L 640,315 L 630,360 L 615,355 Z" />
              {/* Central & North Asia / Siberia */}
              <path d="M 590,75 L 750,55 L 890,70 L 920,120 L 860,150 L 780,140 L 670,110 L 600,120 Z" />
              {/* Middle East & Arabian Peninsula */}
              <path d="M 590,155 L 660,155 L 670,210 L 620,230 L 585,185 Z" />
              {/* South Asia (Indian Subcontinent - Highlighted with sovereign subtle glow) */}
              <path
                d="M 670,145 L 740,140 L 760,185 L 725,250 L 690,215 L 670,175 Z"
                fill="#182338"
                stroke="#00f0ff"
                strokeWidth="1.25"
                opacity="1"
              />
              {/* East & Southeast Asia */}
              <path d="M 770,145 L 860,150 L 850,220 L 795,250 L 765,220 L 760,165 Z" />
              {/* Indonesian Archipelago & Philippines */}
              <path d="M 780,265 L 830,260 L 880,285 L 820,305 Z" />
              {/* Australia & New Zealand */}
              <path d="M 800,320 L 910,310 L 920,390 L 840,410 L 780,360 Z" />
              <path d="M 930,380 L 950,375 L 945,420 L 925,410 Z" />
              {/* Japan */}
              <path d="M 880,120 L 905,145 L 890,180 L 870,150 Z" />
            </g>

            {/* Tactical Vector Arcs / Flight Connection Lines */}
            {(viewMode === 'hybrid' || viewMode === 'nodes') && (
              <g stroke="#00f0ff" strokeWidth="1" strokeDasharray="3,3" opacity="0.45">
                {/* Bucharest -> New Delhi */}
                <path d="M 572,126 Q 643,90 714,171" fill="none" stroke="#00f0ff" />
                {/* Frankfurt -> New Delhi */}
                <path d="M 524,111 Q 619,80 714,171" fill="none" stroke="#4edea3" />
                {/* New Delhi -> Mumbai */}
                <path d="M 714,171 L 702,197" fill="none" stroke="#ff5555" strokeWidth="1.5" />
                {/* Mumbai -> Bangkok */}
                <path d="M 702,197 Q 740,230 779,212" fill="none" stroke="#ffb86c" />
                {/* Ashburn -> Bucharest */}
                <path d="M 285,141 Q 428,80 572,126" fill="none" stroke="#ff79c6" />
              </g>
            )}

            {/* DENSITY HEATMAP LAYER (Thermal Gaussian Radial Gradients) */}
            {(viewMode === 'hybrid' || viewMode === 'heat') && (
              <g filter={`url(#${baseId}-heat-blur)`} style={{ opacity: intensity / 100 }}>
                {filteredHotspots.map((hs) => {
                  const radius = (hs.density / 100) * 85;
                  const gradId =
                    hs.threatLevel === 'CRITICAL'
                      ? `${baseId}-heat-critical`
                      : hs.threatLevel === 'HIGH'
                      ? `${baseId}-heat-high`
                      : `${baseId}-heat-elevated`;

                  return (
                    <circle
                      key={`heat-${hs.id}`}
                      cx={hs.x}
                      cy={hs.y}
                      r={radius}
                      fill={`url(#${gradId})`}
                      className="pointer-events-none"
                    />
                  );
                })}
              </g>
            )}

            {/* TARGET NODES LAYER: Pulsing Circles & Interactive Nodes */}
            {(viewMode === 'hybrid' || viewMode === 'nodes') &&
              filteredHotspots.map((hs) => {
                const isSelected = selectedHotspot.id === hs.id;
                const markerColor =
                  hs.threatLevel === 'CRITICAL'
                    ? '#ff5555'
                    : hs.threatLevel === 'HIGH'
                    ? '#ffb86c'
                    : '#00f0ff';

                return (
                  <g
                    key={`node-${hs.id}`}
                    className="cursor-pointer group"
                    onClick={() => setSelectedHotspot(hs)}
                  >
                    {/* Animated Pulsing Ring */}
                    <circle
                      cx={hs.x}
                      cy={hs.y}
                      r={isSelected ? 18 : 12}
                      fill="none"
                      stroke={markerColor}
                      strokeWidth="1.5"
                      opacity="0.75"
                    >
                      <animate
                        attributeName="r"
                        values={isSelected ? '12;26;12' : '8;18;8'}
                        dur="2.4s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        values="0.8;0.1;0.8"
                        dur="2.4s"
                        repeatCount="indefinite"
                      />
                    </circle>

                    {/* Secondary Ping */}
                    {isSelected && (
                      <circle
                        cx={hs.x}
                        cy={hs.y}
                        r="32"
                        fill="none"
                        stroke="#00f0ff"
                        strokeWidth="1"
                        strokeDasharray="4,4"
                        opacity="0.4"
                      />
                    )}

                    {/* Center Core Dot */}
                    <circle
                      cx={hs.x}
                      cy={hs.y}
                      r={isSelected ? 6 : 4}
                      fill={markerColor}
                      stroke="#070b13"
                      strokeWidth="1.5"
                      className="transition-all duration-200 group-hover:scale-125"
                    />

                    {/* Node Tag Label */}
                    <text
                      x={hs.x}
                      y={hs.y - 12}
                      textAnchor="middle"
                      fill={isSelected ? '#00f0ff' : '#dbfcff'}
                      fontSize="9"
                      fontWeight="bold"
                      className="font-mono select-none pointer-events-none drop-shadow-md"
                    >
                      {hs.name.split('/')[0].trim()}
                    </text>
                  </g>
                );
              })}

            {/* Real-time Rotating Radar Beam Sweep Effect */}
            {radarActive && (
              <g transform="translate(500, 250)">
                <line
                  x1="0"
                  y1="0"
                  x2="520"
                  y2="0"
                  stroke="#00f0ff"
                  strokeWidth="1.5"
                  opacity="0.5"
                >
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0"
                    to="360"
                    dur="7s"
                    repeatCount="indefinite"
                  />
                </line>
                <circle
                  cx="0"
                  cy="0"
                  r="480"
                  fill="none"
                  stroke="#00f0ff"
                  strokeWidth="0.5"
                  strokeDasharray="8,8"
                  opacity="0.15"
                />
              </g>
            )}
          </svg>

          {/* Map Overlay HUD Badges */}
          <div className="absolute top-3 left-3 flex items-center gap-2 pointer-events-none">
            <div className="px-2 py-1 bg-[#0a0e16]/90 border border-[#3b494b] text-[10px] text-[#dbfcff] backdrop-blur-xs flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3] animate-ping" />
              <span>LIVE INCIDENT STREAM: 7 ACTIVE THEATERS</span>
            </div>
            <div className="hidden sm:flex px-2 py-1 bg-[#0a0e16]/90 border border-[#3b494b] text-[10px] text-[#849495] backdrop-blur-xs">
              GRID: WGS-84 / EQUIRECTANGULAR
            </div>
          </div>

          <div className="absolute bottom-3 left-3 flex items-center gap-2 pointer-events-none">
            <div className="px-2 py-1 bg-[#0a0e16]/90 border border-[#3b494b] text-[10px] text-[#849495] backdrop-blur-xs">
              PRIMARY TARGET: <span className="text-[#00f0ff] font-bold">A-0142 (ShadowVendor77)</span>
            </div>
          </div>
        </div>

        {/* Hotspot Inspector Drawer (Right Side HUD) */}
        <div className="lg:col-span-4 xl:col-span-3 bg-[#0e131d] p-4 flex flex-col justify-between space-y-4">
          <div>
            {/* Inspector Header */}
            <div className="border-b border-[#3b494b]/80 pb-2.5 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#849495] uppercase tracking-wider block">
                  THEATER NODE INSPECTOR
                </span>
                <h3 className="text-sm font-bold text-[#dbfcff] flex items-center gap-1.5 mt-0.5">
                  <span className="material-symbols-outlined text-[#00f0ff] text-base">
                    location_on
                  </span>
                  {selectedHotspot.name}
                </h3>
              </div>
              <span
                className={`px-2 py-0.5 text-[9px] font-bold border uppercase ${
                  selectedHotspot.threatLevel === 'CRITICAL'
                    ? 'bg-[#ff5555]/20 text-[#ff5555] border-[#ff5555]/50'
                    : selectedHotspot.threatLevel === 'HIGH'
                    ? 'bg-[#ffb86c]/20 text-[#ffb86c] border-[#ffb86c]/50'
                    : 'bg-[#00f0ff]/15 text-[#00f0ff] border-[#00f0ff]/40'
                }`}
              >
                {selectedHotspot.threatLevel}
              </span>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
              <div className="p-2 bg-[#141923] border border-[#3b494b]/60">
                <span className="text-[10px] text-[#849495] uppercase block">Density Rating</span>
                <span className="text-[#4edea3] font-bold text-base mt-0.5 block">
                  {selectedHotspot.density}%
                </span>
                <div className="w-full h-1 bg-[#262a33] mt-1">
                  <div
                    className="h-full bg-[#4edea3]"
                    style={{ width: `${selectedHotspot.density}%` }}
                  />
                </div>
              </div>

              <div className="p-2 bg-[#141923] border border-[#3b494b]/60">
                <span className="text-[10px] text-[#849495] uppercase block">Logged Intercepts</span>
                <span className="text-[#dbfcff] font-bold text-base mt-0.5 block">
                  {selectedHotspot.incidentsCount} events
                </span>
                <span className="text-[9px] text-[#849495] mt-1 block">
                  {selectedHotspot.recentActivityUtc}
                </span>
              </div>
            </div>

            {/* Technical Detail Points */}
            <div className="space-y-2 mt-3 text-xs">
              <div className="p-2.5 bg-[#141923] border border-[#3b494b]/60 space-y-1">
                <div className="text-[10px] text-[#849495] uppercase flex justify-between">
                  <span>Target Threat Vector:</span>
                  <span className="text-[#00f0ff] font-bold">{selectedHotspot.vectorLabel}</span>
                </div>
                <div className="text-[#dbfcff] font-bold text-[11px]">
                  {selectedHotspot.volume}
                </div>
              </div>

              <div className="p-2.5 bg-[#141923] border border-[#3b494b]/60 space-y-1">
                <div className="text-[10px] text-[#849495] uppercase flex justify-between">
                  <span>Linked Actor Identity:</span>
                  <span className="text-[#4edea3] font-bold">{selectedHotspot.primaryActor}</span>
                </div>
                {selectedHotspot.unmaskedIp && (
                  <div className="text-[10px] text-[#849495]">
                    Host IP: <span className="text-[#00f0ff] font-mono">{selectedHotspot.unmaskedIp}</span>
                  </div>
                )}
                {selectedHotspot.asn && (
                  <div className="text-[10px] text-[#849495]">
                    ASN: <span className="text-[#dbfcff] font-mono">{selectedHotspot.asn}</span>
                  </div>
                )}
              </div>

              <p className="text-[11px] text-[#b9cacb] leading-relaxed p-2 bg-[#0c1018] border border-[#262a33]">
                {selectedHotspot.description}
              </p>
            </div>
          </div>

          {/* Hotspot Actions */}
          <div className="space-y-2 pt-2 border-t border-[#3b494b]/60">
            {selectedHotspot.actorId ? (
              <button
                onClick={() => {
                  if (onSelectActor && selectedHotspot.actorId) {
                    onSelectActor(selectedHotspot.actorId);
                  }
                  onNavigate('actor-detail');
                }}
                className="w-full py-2 bg-[#00f0ff] hover:bg-[#7df4ff] text-[#00363a] font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm"
              >
                <span className="material-symbols-outlined text-[15px]">badge</span>
                OPEN DOSSIER ({selectedHotspot.primaryActor.split(' ')[0]})
              </button>
            ) : (
              <button
                onClick={() => onNavigate('infrastructure')}
                className="w-full py-2 bg-[#00f0ff] hover:bg-[#7df4ff] text-[#00363a] font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm"
              >
                <span className="material-symbols-outlined text-[15px]">dns</span>
                INSPECT INFRASTRUCTURE CORRELATION
              </button>
            )}

            <button
              onClick={() => onNavigate('attribution')}
              className="w-full py-1.5 bg-[#141923] hover:bg-[#262a33] text-[#dbfcff] border border-[#3b494b] text-xs font-bold transition-colors flex items-center justify-center gap-1"
            >
              <span className="material-symbols-outlined text-[14px] text-[#00f0ff]">
                account_tree
              </span>
              ATTRIBUTION QUEUE →
            </button>
          </div>
        </div>
      </div>

      {/* Geopolitical Regional Density Metrics Strip */}
      <div className="p-3 bg-[#0c1018] border-t border-[#3b494b] grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
        <div className="p-2 bg-[#141923] border border-[#3b494b]/60">
          <div className="flex justify-between items-center text-[10px] text-[#849495]">
            <span>SOUTH ASIA</span>
            <span className="text-[#ff5555] font-bold">42% HEAT</span>
          </div>
          <div className="w-full h-1 bg-[#262a33] mt-1.5">
            <div className="h-full bg-[#ff5555]" style={{ width: '42%' }} />
          </div>
          <span className="text-[9px] text-[#849495] mt-1 block">A-0142 Primary Focus</span>
        </div>

        <div className="p-2 bg-[#141923] border border-[#3b494b]/60">
          <div className="flex justify-between items-center text-[10px] text-[#849495]">
            <span>EASTERN EUROPE</span>
            <span className="text-[#ffb86c] font-bold">26% HEAT</span>
          </div>
          <div className="w-full h-1 bg-[#262a33] mt-1.5">
            <div className="h-full bg-[#ffb86c]" style={{ width: '26%' }} />
          </div>
          <span className="text-[9px] text-[#849495] mt-1 block">Tor Exit AS49505 Leak</span>
        </div>

        <div className="p-2 bg-[#141923] border border-[#3b494b]/60">
          <div className="flex justify-between items-center text-[10px] text-[#849495]">
            <span>SOUTHEAST ASIA</span>
            <span className="text-[#00f0ff] font-bold">16% HEAT</span>
          </div>
          <div className="w-full h-1 bg-[#262a33] mt-1.5">
            <div className="h-full bg-[#00f0ff]" style={{ width: '16%' }} />
          </div>
          <span className="text-[9px] text-[#849495] mt-1 block">Telegram SIM Arbitrage</span>
        </div>

        <div className="p-2 bg-[#141923] border border-[#3b494b]/60">
          <div className="flex justify-between items-center text-[10px] text-[#849495]">
            <span>WESTERN EUROPE</span>
            <span className="text-[#4edea3] font-bold">10% HEAT</span>
          </div>
          <div className="w-full h-1 bg-[#262a33] mt-1.5">
            <div className="h-full bg-[#4edea3]" style={{ width: '10%' }} />
          </div>
          <span className="text-[9px] text-[#849495] mt-1 block">Wasabi UTXO Mixers</span>
        </div>

        <div className="p-2 bg-[#141923] border border-[#3b494b]/60 col-span-2 sm:col-span-1">
          <div className="flex justify-between items-center text-[10px] text-[#849495]">
            <span>NORTH AMERICA</span>
            <span className="text-[#849495] font-bold">6% HEAT</span>
          </div>
          <div className="w-full h-1 bg-[#262a33] mt-1.5">
            <div className="h-full bg-[#849495]" style={{ width: '6%' }} />
          </div>
          <span className="text-[9px] text-[#849495] mt-1 block">Zero-Day Brokerage</span>
        </div>
      </div>
    </div>
  );
};

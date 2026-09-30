import React, { useState } from 'react';
import { TIMELINE_EVENTS } from '../../data/mockData';
import { ScreenId } from '../../types';

interface TimelineScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onSelectActor?: (actorId: string) => void;
}

export const TimelineScreen: React.FC<TimelineScreenProps> = ({
  onNavigate,
  onSelectActor,
}) => {
  const [selectedEntity, setSelectedEntity] = useState<string>('ALL');
  const [searchFilter, setSearchFilter] = useState<string>('');

  const filteredEvents = TIMELINE_EVENTS.filter((ev) => {
    const matchesEntity =
      selectedEntity === 'ALL' || ev.entityType.toUpperCase() === selectedEntity.toUpperCase();
    const matchesSearch =
      ev.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      ev.description.toLowerCase().includes(searchFilter.toLowerCase()) ||
      ev.exhibitRef.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesEntity && matchesSearch;
  });

  return (
    <div className="flex flex-col w-full gap-4 pb-12 font-mono">
      {/* Top Banner Ribbon */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#0a0e16] p-3 border border-[#3b494b]">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-[#262a33] text-[#dbfcff] border border-[#3b494b]">
            <span className="material-symbols-outlined text-[16px] text-[#00f0ff]">
              timeline
            </span>
            <span className="text-[11px] font-bold tracking-wider uppercase">
              CHRONOLOGICAL EVENT STREAM // FORENSIC TIMELINE
            </span>
          </div>
          <span className="text-xs text-[#849495]">
            TOTAL RECONSTRUCTED EVENTS: <span className="text-[#dbfcff] font-bold">{TIMELINE_EVENTS.length}</span>
          </span>
        </div>

        <button
          onClick={() => onNavigate('graph')}
          className="px-3 py-1 bg-[#141923] hover:bg-[#262a33] border border-[#3b494b] text-xs text-[#dbfcff] flex items-center gap-1.5 transition-colors"
        >
          <span className="material-symbols-outlined text-[14px] text-[#00f0ff]">hub</span>
          TOPOLOGY GRAPH
        </button>
      </div>

      {/* Filter Ribbon */}
      <div className="bg-[#0e131d] border border-[#3b494b] p-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[10px] text-[#849495] uppercase">ENTITY FILTER:</span>
          {['ALL', 'ACTOR', 'PERSONA', 'WALLET', 'INFRA'].map((type) => (
            <button
              key={type}
              onClick={() => setSelectedEntity(type)}
              className={`px-2.5 py-1 text-xs transition-colors ${
                selectedEntity === type
                  ? 'bg-[#00f0ff] text-[#00363a] font-bold'
                  : 'bg-[#141923] text-[#849495] hover:text-[#dbfcff] border border-[#3b494b]'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="w-full sm:w-64 relative">
          <input
            type="text"
            placeholder="Search timeline..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="w-full bg-[#141923] border border-[#3b494b] px-3 py-1 text-xs text-[#dbfcff] placeholder-[#849495] focus:outline-hidden focus:border-[#00f0ff]"
          />
        </div>
      </div>

      {/* Timeline Stream */}
      <div className="relative pl-6 space-y-6 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#3b494b]">
        {filteredEvents.map((ev) => (
          <div key={ev.id} className="relative group">
            {/* Timeline node dot */}
            <div className="absolute -left-[19px] top-1.5 w-3 h-3 rounded-full bg-[#0a0e16] border-2 border-[#00f0ff] group-hover:scale-125 transition-transform"></div>

            <div className="bg-[#0e131d] border border-[#3b494b] hover:border-[#00f0ff]/50 p-4 transition-all duration-150 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#3b494b]/40 pb-2">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-[#00f0ff] font-bold">
                    {ev.timeUtc}
                  </span>
                  <span className="px-1.5 py-0.2 bg-[#262a33] text-[#dbfcff] text-[9px] border border-[#3b494b]">
                    {ev.entityType}
                  </span>
                  <span className="text-xs font-bold text-[#dbfcff]">
                    {ev.entityName}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-[10px]">
                  <span className="text-[#849495]">Confidence:</span>
                  <span className="text-[#4edea3] font-bold">{Math.round(ev.confidence * 100)}%</span>
                  <span className="px-1.5 py-0.2 bg-[#4edea3]/10 text-[#4edea3] border border-[#4edea3]/30 text-[9px]">
                    {ev.confidenceBand}
                  </span>
                </div>
              </div>

              <h4 className="text-xs font-bold text-[#dbfcff]">
                {ev.title}
              </h4>

              <p className="text-xs text-[#b9cacb] leading-relaxed">
                {ev.description}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-[#3b494b]/40 text-[10px] text-[#849495]">
                <div className="flex items-center gap-2">
                  <span>Source: <strong className="text-[#dbfcff]">{ev.source}</strong></span>
                  <span>•</span>
                  <span>Reliability: <strong className="text-[#00f0ff]">{ev.sourceReliability}</strong></span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[#849495]">EXHIBIT:</span>
                  <code className="text-[#4edea3] bg-[#141923] px-1.5 py-0.5 border border-[#3b494b]">
                    {ev.exhibitRef}
                  </code>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

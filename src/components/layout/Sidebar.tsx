import React from 'react';
import { ScreenId } from '../../types';

interface SidebarProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentScreen, onNavigate }) => {
  const isNavActive = (path: ScreenId | ScreenId[]) => {
    if (Array.isArray(path)) {
      return path.includes(currentScreen);
    }
    return currentScreen === path;
  };

  const navItemClass = (active: boolean) =>
    `flex items-center gap-3 px-4 py-2 font-mono text-[11px] uppercase tracking-wider transition-colors border-l-2 cursor-pointer select-none ${
      active
        ? 'bg-[#262a33] text-[#dbfcff] border-[#00f0ff] font-bold shadow-inner'
        : 'text-[#b9cacb] hover:bg-[#262a33] hover:text-[#dfe2ee] border-transparent'
    }`;

  return (
    <aside className="fixed left-0 top-14 bottom-0 w-64 bg-[#0a0e16] border-r border-[#3b494b] z-40 flex flex-col justify-between overflow-y-auto select-none">
      <div className="py-3">
        {/* Navigation Section Title */}
        <div className="px-4 mb-3 flex items-center justify-between border-b border-[#3b494b] pb-2">
          <div>
            <span className="font-mono text-[9px] tracking-widest text-[#849495] uppercase font-bold block">
              TACTICAL NAVIGATION
            </span>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3]"></span>
              <span className="font-mono text-[9px] text-[#4edea3] tracking-wider">
                ENCLAVE BRAVO-09 // ONLINE
              </span>
            </div>
          </div>
          <span className="font-mono text-[10px] text-[#849495]">V3.4.1</span>
        </div>

        <nav className="flex flex-col gap-0.5">
          {/* OVERVIEW */}
          <div className="px-4 pt-2 pb-1 font-mono text-[9px] tracking-widest text-[#849495] uppercase font-semibold">
            OVERVIEW
          </div>
          <button
            onClick={() => onNavigate('dashboard')}
            className={navItemClass(isNavActive('dashboard'))}
          >
            <span className="material-symbols-outlined text-[18px]">dashboard</span>
            <span>Dashboard</span>
          </button>

          {/* INVESTIGATE */}
          <div className="px-4 pt-3 pb-1 font-mono text-[9px] tracking-widest text-[#849495] uppercase font-semibold">
            INVESTIGATE
          </div>
          <button
            onClick={() => onNavigate('search')}
            className={navItemClass(isNavActive('search'))}
          >
            <span className="material-symbols-outlined text-[18px]">search_insights</span>
            <span>Search</span>
          </button>
          <button
            onClick={() => onNavigate('timeline')}
            className={navItemClass(isNavActive('timeline'))}
          >
            <span className="material-symbols-outlined text-[18px]">timeline</span>
            <span>Timeline</span>
          </button>
          <button
            onClick={() => onNavigate('graph')}
            className={navItemClass(isNavActive('graph'))}
          >
            <span className="material-symbols-outlined text-[18px]">hub</span>
            <span>Graph</span>
          </button>

          {/* INTELLIGENCE */}
          <div className="px-4 pt-3 pb-1 font-mono text-[9px] tracking-widest text-[#849495] uppercase font-semibold">
            INTELLIGENCE
          </div>
          <button
            onClick={() => onNavigate('actors')}
            className={navItemClass(isNavActive(['actors', 'actor-detail']))}
          >
            <span className="material-symbols-outlined text-[18px]">shield_person</span>
            <span>Actors</span>
          </button>
          <button
            onClick={() => onNavigate('attribution')}
            className={navItemClass(isNavActive(['attribution', 'attribution-candidate']))}
          >
            <span className="material-symbols-outlined text-[18px]">fingerprint</span>
            <span>Attribution</span>
          </button>
          <button
            onClick={() => onNavigate('infrastructure')}
            className={navItemClass(isNavActive('infrastructure'))}
          >
            <span className="material-symbols-outlined text-[18px]">dns</span>
            <span>Infrastructure</span>
          </button>

          {/* CASEWORK */}
          <div className="px-4 pt-3 pb-1 font-mono text-[9px] tracking-widest text-[#849495] uppercase font-semibold">
            CASEWORK
          </div>
          <button
            onClick={() => onNavigate('cases')}
            className={navItemClass(isNavActive(['cases', 'case-detail']))}
          >
            <span className="material-symbols-outlined text-[18px]">folder_supervised</span>
            <span>Cases</span>
          </button>

          {/* ADMIN */}
          <div className="px-4 pt-3 pb-1 font-mono text-[9px] tracking-widest text-[#849495] uppercase font-semibold">
            ADMIN
          </div>
          <button
            onClick={() => onNavigate('admin')}
            className={navItemClass(isNavActive('admin'))}
          >
            <span className="material-symbols-outlined text-[18px]">admin_panel_settings</span>
            <span>Administration</span>
          </button>
        </nav>
      </div>

      {/* Air-gap Hardware Security Anchor */}
      <div className="p-3 border-t border-[#3b494b] bg-[#181c24]">
        <div className="flex items-center justify-between text-[#849495] font-mono text-[11px] mb-1">
          <span>CRYPTO_AUTH</span>
          <span className="text-[#4edea3] font-bold">VERIFIED</span>
        </div>
        <div className="font-mono text-[10px] text-[#b9cacb] truncate font-mono">
          SHA-256: 7f83b165...e2d9
        </div>
        <div className="mt-1 font-mono text-[9px] text-[#849495] tracking-wider uppercase flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff]"></span>
          <span>AIR-GAP ISOLATION: ACTIVE</span>
        </div>
      </div>
    </aside>
  );
};

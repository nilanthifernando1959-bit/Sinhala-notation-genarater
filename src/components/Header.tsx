import React from 'react';

interface HeaderProps {
  onAddSongClick: () => void;
  onOpenChords: () => void;
  onOpenExport: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onAddSongClick, onOpenChords, onOpenExport }) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-stone-950/90 backdrop-blur-md border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a href="/" className="text-lg font-bold tracking-tight text-stone-100 flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 ring-4 ring-amber-500/20" />
          <span>Sinhala Swara & Chord Studio</span>
        </a>

        {/* Zone 2: 4 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-400">
          <a href="#notations" className="hover:text-stone-100 transition-colors">
            ස්වර ප්‍රස්ථාර
          </a>
          <a href="#instruments" className="hover:text-stone-100 transition-colors">
            වාද්‍ය භාණ්ඩ
          </a>
          <button
            type="button"
            onClick={onOpenChords}
            className="hover:text-stone-100 transition-colors cursor-pointer text-left"
          >
            කෝඩ් සටහන්
          </button>
          <button
            type="button"
            onClick={onOpenExport}
            className="hover:text-stone-100 transition-colors cursor-pointer text-left"
          >
            පිටපත් කරගන්න
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onAddSongClick}
            className="px-4 py-2 text-xs font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors whitespace-nowrap cursor-pointer shadow-md shadow-amber-400/20 active:scale-95"
          >
            ගීතයක් එක්කරන්න
          </button>
        </div>
      </div>
    </header>
  );
};

import React, { useState } from 'react';
import { InstrumentType, Song } from '../types/music';
import { PRESET_SONGS } from '../data/presetSongs';
import { Music, Sparkles, Link as LinkIcon, Search, Loader2 } from 'lucide-react';

interface SongInputBarProps {
  selectedInstrument: InstrumentType;
  onSelectInstrument: (inst: InstrumentType) => void;
  onSelectPreset: (song: Song) => void;
  onGenerateSong: (query: string, instrument: InstrumentType) => Promise<void>;
  isLoading: boolean;
  activeSongId: string;
}

const INSTRUMENT_OPTIONS: { id: InstrumentType; name: string; sinhala: string }[] = [
  { id: 'piano', name: 'Piano', sinhala: 'පියානෝව / කීබෝඩ්' },
  { id: 'violin', name: 'Violin', sinhala: 'වයලීනය' },
  { id: 'guitar', name: 'Guitar', sinhala: 'ගිටාරය' },
  { id: 'flute', name: 'Flute', sinhala: 'බටනලාව' },
  { id: 'vocal', name: 'Vocal', sinhala: 'ගායනය / Swaras' },
];

export const SongInputBar: React.FC<SongInputBarProps> = ({
  selectedInstrument,
  onSelectInstrument,
  onSelectPreset,
  onGenerateSong,
  isLoading,
  activeSongId,
}) => {
  const [inputVal, setInputVal] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim() || isLoading) return;
    onGenerateSong(inputVal.trim(), selectedInstrument);
  };

  return (
    <div className="w-full bg-stone-950 rounded-2xl p-5 md:p-6 border border-stone-800 shadow-xl space-y-6">
      {/* Top Section: URL / Query Form */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-stone-100 flex items-center gap-2">
              <LinkIcon className="w-5 h-5 text-amber-400" />
              <span>ගීතයේ URL එක හෝ නම ඇතුළත් කරන්න (Song URL or Title)</span>
            </h2>
          </div>
          <span className="text-xs text-stone-400">
            YouTube / Spotify / SoundCloud හෝ ගීතයේ නම
          </span>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-500">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="e.g. https://www.youtube.com/watch?v=... හෝ 'මාස්ටර් සර්' / 'ගඟ අද්දර'"
              className="w-full pl-10 pr-4 py-3 bg-stone-900 border border-stone-800 rounded-xl text-stone-100 placeholder-stone-500 text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all font-sans"
              disabled={isLoading}
            />
          </div>
          <button
            type="submit"
            disabled={isLoading || !inputVal.trim()}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 disabled:bg-stone-800 disabled:text-stone-600 text-stone-950 font-bold text-sm transition-all cursor-pointer whitespace-nowrap shadow-md shadow-amber-400/20 active:scale-95"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-stone-950" />
                <span>ස්වර සාදමින් පවතී...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-stone-950" />
                <span>ස්වර ප්‍රස්ථාරය සාදන්න</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Instrument Selection Segmented Tabs */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-xs font-semibold text-stone-300 uppercase tracking-wider">
            වාද්‍ය භාණ්ඩය තෝරන්න (Select Instrument)
          </span>
          <span className="text-xs text-amber-400 font-medium">
            නොට්ස් ෂීට් වෙනුවට සෘජු වාද්‍ය සටහන් (Non-sheet visual format)
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {INSTRUMENT_OPTIONS.map((inst) => {
            const isSelected = selectedInstrument === inst.id;
            return (
              <button
                key={inst.id}
                type="button"
                onClick={() => onSelectInstrument(inst.id)}
                className={`flex flex-col items-start p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-amber-500/15 border-amber-400 text-stone-100 ring-1 ring-amber-400 shadow-md shadow-amber-400/10'
                    : 'bg-stone-900/60 border-stone-800 text-stone-400 hover:text-stone-200 hover:border-stone-700'
                }`}
              >
                <span className={`text-xs font-bold ${isSelected ? 'text-amber-300' : 'text-stone-300'}`}>
                  {inst.sinhala}
                </span>
                <span className="text-[11px] font-mono text-stone-500 mt-0.5">
                  {inst.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Preset Songs for Quick Exploration */}
      <div className="pt-2 border-t border-stone-850">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-stone-400">
            ක්ෂණිකව පරීක්ෂා කිරීමට ජනප්‍රිය ගීත (Popular Presets):
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {PRESET_SONGS.map((preset) => {
            const isSelected = activeSongId === preset.id;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => onSelectPreset(preset)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-stone-200 text-stone-950 font-bold shadow'
                    : 'bg-stone-900 hover:bg-stone-850 text-stone-300 border border-stone-800'
                }`}
              >
                <Music className="w-3 h-3 text-amber-500" />
                <span>{preset.titleSinhala}</span>
                <span className="text-stone-400 text-[10px]">({preset.originalKey})</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

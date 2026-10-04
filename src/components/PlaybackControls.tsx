import React from 'react';
import { InstrumentType } from '../types/music';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Timer } from 'lucide-react';

interface PlaybackControlsProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  onRewind: () => void;
  tempo: number;
  onChangeTempo: (newTempo: number) => void;
  instrument: InstrumentType;
  onChangeInstrument: (inst: InstrumentType) => void;
  volume: number;
  onChangeVolume: (vol: number) => void;
  isMuted: boolean;
  onToggleMute: () => void;
  isMetronomeOn: boolean;
  onToggleMetronome: () => void;
  beatInfo: string;
}

export const PlaybackControls: React.FC<PlaybackControlsProps> = ({
  isPlaying,
  onTogglePlay,
  onRewind,
  tempo,
  onChangeTempo,
  instrument,
  onChangeInstrument,
  volume,
  onChangeVolume,
  isMuted,
  onToggleMute,
  isMetronomeOn,
  onToggleMetronome,
  beatInfo,
}) => {
  return (
    <div className="w-full bg-stone-950 rounded-2xl p-4 sm:p-5 border border-stone-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
      {/* Play / Rewind / Beat info */}
      <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
        <button
          type="button"
          onClick={onTogglePlay}
          className={`flex items-center justify-center w-12 h-12 rounded-xl transition-all cursor-pointer shadow-lg active:scale-95 ${
            isPlaying
              ? 'bg-amber-500 hover:bg-amber-400 text-stone-950 ring-4 ring-amber-500/20 shadow-amber-500/30'
              : 'bg-amber-400 hover:bg-amber-300 text-stone-950 shadow-amber-400/20'
          }`}
          title={isPlaying ? 'විරාමය (Pause)' : 'වාදනය (Play)'}
        >
          {isPlaying ? <Pause className="w-6 h-6 fill-stone-950" /> : <Play className="w-6 h-6 fill-stone-950 ml-0.5" />}
        </button>

        <button
          type="button"
          onClick={onRewind}
          className="flex items-center justify-center w-10 h-10 rounded-xl bg-stone-900 hover:bg-stone-850 text-stone-300 border border-stone-800 transition-colors cursor-pointer active:scale-95"
          title="ආරම්භයට (Rewind)"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        <div className="flex flex-col ml-2">
          <span className="text-xs font-bold text-stone-200">
            {isPlaying ? 'වාදනය වෙමින් පවතී...' : 'වාදනය සූදානම්'}
          </span>
          <span className="text-[11px] font-mono text-amber-400">{beatInfo}</span>
        </div>
      </div>

      {/* Tempo BPM Slider & Metronome Click Track Toggle */}
      <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
        <div className="flex items-center gap-3 bg-stone-900/60 px-4 py-2.5 rounded-xl border border-stone-800">
          <span className="text-xs font-semibold text-stone-400 whitespace-nowrap">ලය / Tempo:</span>
          <input
            type="range"
            min="40"
            max="200"
            value={tempo}
            onChange={(e) => onChangeTempo(parseInt(e.target.value, 10))}
            className="w-24 sm:w-32 accent-amber-400 cursor-pointer"
          />
          <div className="flex items-center gap-1">
            <span className="text-sm font-bold font-mono text-amber-400 w-8 text-right tabular-nums">
              {tempo}
            </span>
            <span className="text-[10px] text-stone-500 font-mono">BPM</span>
          </div>
        </div>

        {/* Click-Track / Metronome Toggle Button */}
        <button
          type="button"
          onClick={onToggleMetronome}
          className={`flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap border active:scale-95 ${
            isMetronomeOn
              ? 'bg-amber-400 text-stone-950 border-amber-300 shadow-md shadow-amber-400/20'
              : 'bg-stone-900 hover:bg-stone-850 text-stone-400 border-stone-800 hover:text-stone-200'
          }`}
          title={isMetronomeOn ? 'මෙට්‍රොනෝමය අක්‍රිය කරන්න (Click Track On)' : 'මෙට්‍රොනෝමය සක්‍රිය කරන්න (Click Track Off)'}
        >
          <Timer className={`w-3.5 h-3.5 ${isMetronomeOn ? 'text-stone-950 animate-pulse' : 'text-stone-400'}`} />
          <span>ක්ලික් (Click)</span>
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              isMetronomeOn ? 'bg-stone-950' : 'bg-stone-600'
            }`}
          />
        </button>
      </div>

      {/* Instrument Sound Audio Selector & Volume */}
      <div className="flex items-center gap-4 w-full md:w-auto justify-end">
        {/* Instrument Audio selector */}
        <div className="flex items-center gap-1.5 text-xs text-stone-400">
          <span className="hidden sm:inline">හඬ:</span>
          <select
            value={instrument}
            onChange={(e) => onChangeInstrument(e.target.value as InstrumentType)}
            className="bg-stone-900 border border-stone-800 rounded-lg px-2.5 py-1.5 text-xs text-stone-200 font-medium focus:outline-none focus:border-amber-400 cursor-pointer"
          >
            <option value="piano">පියානෝව (Piano)</option>
            <option value="violin">වයලීනය (Violin)</option>
            <option value="flute">බටනලාව (Flute)</option>
            <option value="guitar">ගිටාරය (Guitar)</option>
          </select>
        </div>

        {/* Volume & Mute */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleMute}
            className="text-stone-400 hover:text-stone-200 cursor-pointer"
            title={isMuted ? 'හඬ සක්‍රිය කරන්න' : 'හඬ අක්‍රිය කරන්න'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-stone-300" />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={(e) => onChangeVolume(parseFloat(e.target.value))}
            className="w-16 sm:w-20 accent-amber-400 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

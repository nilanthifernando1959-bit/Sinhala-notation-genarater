import React from 'react';
import { audioSynth } from '../../utils/audioSynth';
import { CHROMATIC_SCALE } from '../../utils/musicTheory';

interface PianoKeyboardProps {
  activeNote?: string; // e.g. "C4", "G4"
  keyRoot?: string; // root key for Sinhala swara mapping, e.g. "C"
}

// 2 octaves from C4 to B5
const WHITE_NOTES = [
  { note: 'C', octave: 4 },
  { note: 'D', octave: 4 },
  { note: 'E', octave: 4 },
  { note: 'F', octave: 4 },
  { note: 'G', octave: 4 },
  { note: 'A', octave: 4 },
  { note: 'B', octave: 4 },
  { note: 'C', octave: 5 },
  { note: 'D', octave: 5 },
  { note: 'E', octave: 5 },
  { note: 'F', octave: 5 },
  { note: 'G', octave: 5 },
  { note: 'A', octave: 5 },
  { note: 'B', octave: 5 },
];

const BLACK_KEYS_CONFIG: { note: string; octave: number; leftOffsetPercent: number }[] = [
  { note: 'C#', octave: 4, leftOffsetPercent: 4.8 },
  { note: 'D#', octave: 4, leftOffsetPercent: 12.0 },
  { note: 'F#', octave: 4, leftOffsetPercent: 26.2 },
  { note: 'G#', octave: 4, leftOffsetPercent: 33.3 },
  { note: 'A#', octave: 4, leftOffsetPercent: 40.5 },
  { note: 'C#', octave: 5, leftOffsetPercent: 54.8 },
  { note: 'D#', octave: 5, leftOffsetPercent: 62.0 },
  { note: 'F#', octave: 5, leftOffsetPercent: 76.2 },
  { note: 'G#', octave: 5, leftOffsetPercent: 83.3 },
  { note: 'A#', octave: 5, leftOffsetPercent: 90.5 },
];

// Sinhala Swara map relative to root
const SWARA_INTERVALS = ['ස', 'කෝ.රි', 'රි', 'කෝ.ග', 'ග', 'ම', 'තී.ම', 'ප', 'කෝ.ධ', 'ධ', 'කෝ.නි', 'නි'];

function getSwaraForNote(noteName: string, rootKey: string = 'C'): string {
  const rootIndex = CHROMATIC_SCALE.indexOf(rootKey.replace('m', '').replace('7', '')) || 0;
  const noteIndex = CHROMATIC_SCALE.indexOf(noteName);
  if (noteIndex === -1) return '';
  const interval = ((noteIndex - rootIndex) % 12 + 12) % 12;
  return SWARA_INTERVALS[interval] || '';
}

export const PianoKeyboard: React.FC<PianoKeyboardProps> = ({ activeNote, keyRoot = 'C' }) => {
  const handleKeyClick = (fullNote: string) => {
    audioSynth.playNote(fullNote, 'piano', 0.8);
  };

  const cleanActiveNote = activeNote ? activeNote.replace(/b/, '#') : '';

  return (
    <div className="w-full select-none">
      <div className="flex items-center justify-between pb-3 border-b border-stone-800 mb-4 text-xs text-stone-400">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-stone-200">පියානෝ / කීබෝඩ් යතුරු (Piano Keys)</span>
          <span className="text-stone-500">·</span>
          <span>ක්ලික් කර හඬ අසන්න</span>
        </div>
        <div className="text-stone-400">
          මූලික ශ්‍රැතිය: <span className="font-semibold text-amber-400">{keyRoot} = ස</span>
        </div>
      </div>

      <div className="relative w-full h-44 bg-stone-950 rounded-xl p-2 border border-stone-800 shadow-inner overflow-x-auto">
        <div className="relative min-w-[700px] h-full flex">
          {/* White Keys */}
          {WHITE_NOTES.map((k) => {
            const fullNote = `${k.note}${k.octave}`;
            const isActive = cleanActiveNote === fullNote;
            const swara = getSwaraForNote(k.note, keyRoot);

            return (
              <button
                key={fullNote}
                type="button"
                onClick={() => handleKeyClick(fullNote)}
                className={`relative flex-1 h-full rounded-b-md border-r border-stone-300 last:border-r-0 transition-colors flex flex-col justify-end items-center pb-2.5 cursor-pointer active:brightness-95 ${
                  isActive
                    ? 'bg-amber-400 text-stone-900 shadow-lg shadow-amber-400/40 ring-2 ring-amber-300 z-10'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-800'
                }`}
              >
                <span className={`text-base font-bold font-sans ${isActive ? 'text-stone-900' : 'text-amber-800'}`}>
                  {swara}
                </span>
                <span className="text-[11px] font-mono text-stone-500 font-medium">
                  {fullNote}
                </span>
              </button>
            );
          })}

          {/* Black Keys */}
          {BLACK_KEYS_CONFIG.map((k) => {
            const fullNote = `${k.note}${k.octave}`;
            const isActive = cleanActiveNote === fullNote;
            const swara = getSwaraForNote(k.note, keyRoot);

            return (
              <button
                key={fullNote}
                type="button"
                onClick={() => handleKeyClick(fullNote)}
                style={{ left: `${k.leftOffsetPercent}%` }}
                className={`absolute top-0 w-[4.4%] h-[60%] rounded-b-md transition-colors flex flex-col justify-end items-center pb-1.5 cursor-pointer z-20 shadow-md ${
                  isActive
                    ? 'bg-amber-500 text-stone-950 ring-2 ring-amber-300'
                    : 'bg-stone-900 hover:bg-stone-800 text-stone-200 border-x border-b border-stone-950'
                }`}
              >
                <span className="text-xs font-semibold text-amber-300">
                  {swara}
                </span>
                <span className="text-[9px] font-mono text-stone-400">
                  {k.note}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

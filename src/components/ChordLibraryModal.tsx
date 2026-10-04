import React from 'react';
import { Song } from '../types/music';
import { transposeChord, getGuitarChord } from '../utils/musicTheory';
import { audioSynth } from '../utils/audioSynth';
import { X, Volume2 } from 'lucide-react';

interface ChordLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  song: Song;
  semitoneOffset: number;
}

export const ChordLibraryModal: React.FC<ChordLibraryModalProps> = ({
  isOpen,
  onClose,
  song,
  semitoneOffset,
}) => {
  if (!isOpen) return null;

  // Extract unique chords used in the song
  const rawChords = new Set<string>();
  song.sections.forEach((s) => {
    s.measures.forEach((m) => {
      if (m.chord && m.chord !== '-' && m.chord !== 'NC') {
        rawChords.add(m.chord);
      }
    });
  });

  const transposedChords = Array.from(rawChords).map((ch) => transposeChord(ch, semitoneOffset));
  const uniqueTransposed = Array.from(new Set(transposedChords));

  const handlePlayChord = (ch: string) => {
    audioSynth.playChord(ch, 'guitar');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-3xl bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-800 mb-6">
          <div>
            <h3 className="text-lg font-bold text-stone-100">
              ගීතයේ භාවිත වන කෝඩ් සටහන් (Song Chords Library)
            </h3>
            <p className="text-xs text-stone-400 mt-1">
              {song.titleSinhala} ගීතයේ වත්මන් ශ්‍රැතියට අදාළ කෝඩ් {uniqueTransposed.length} ක්
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chords Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {uniqueTransposed.map((chordName) => {
            const chordData = getGuitarChord(chordName);
            return (
              <div
                key={chordName}
                className="bg-stone-950 p-4 rounded-xl border border-stone-800 flex flex-col items-center justify-between space-y-3"
              >
                <div className="w-full flex items-center justify-between">
                  <span className="text-base font-bold font-mono text-amber-400">
                    [ {chordName} ]
                  </span>
                  <button
                    type="button"
                    onClick={() => handlePlayChord(chordName)}
                    className="p-1.5 rounded-md bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-amber-400 transition-colors cursor-pointer"
                    title="කෝඩ් එකේ නාදය අසන්න"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="text-xs text-stone-300 font-medium text-center">
                  {chordData.sinhalaName}
                </div>

                {/* Micro Fret Diagram */}
                <div className="w-32 h-28 bg-stone-900/60 rounded border border-stone-800 p-2 relative">
                  <div className="w-full h-1 bg-amber-500/80 rounded mb-1" />
                  <div className="flex justify-between px-1 text-[9px] font-mono text-stone-400 mb-1">
                    {chordData.frets.map((f, i) => (
                      <span key={i} className={f === -1 ? 'text-rose-400' : f === 0 ? 'text-emerald-400' : ''}>
                        {f === -1 ? 'X' : f === 0 ? 'O' : ''}
                      </span>
                    ))}
                  </div>
                  <div className="relative w-full h-16 border border-stone-700/60 rounded bg-stone-950/60">
                    <div className="absolute top-1/3 w-full h-[1px] bg-stone-700/60" />
                    <div className="absolute top-2/3 w-full h-[1px] bg-stone-700/60" />
                    <div className="w-full h-full flex justify-between px-1.5">
                      {[0, 1, 2, 3, 4, 5].map((s) => (
                        <div key={s} className="h-full w-[1px] bg-stone-600/60 relative">
                          {chordData.frets[s] > 0 && chordData.frets[s] <= 3 && (
                            <div
                              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-amber-400 text-stone-950 font-bold text-[8px] flex items-center justify-center shadow"
                              style={{ top: `${(chordData.frets[s] - 0.5) * 33}%` }}
                            >
                              {chordData.fingers[s] || '•'}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="text-[11px] font-mono text-stone-400">
                  ස්වර: {chordData.notes.join(' - ')}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-stone-800 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold cursor-pointer transition-colors"
          >
            වසන්න (Close)
          </button>
        </div>
      </div>
    </div>
  );
};

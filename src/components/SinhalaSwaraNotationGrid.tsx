import React from 'react';
import { Song, InstrumentType, OctaveType } from '../types/music';
import { transposeChord, transposeSwaraFixed } from '../utils/musicTheory';
import { audioSynth } from '../utils/audioSynth';
import { Volume2 } from 'lucide-react';

interface SinhalaSwaraNotationGridProps {
  song: Song;
  semitoneOffset: number;
  useFixedSwaraMode: boolean;
  selectedInstrument: InstrumentType;
  currentPlayPosition: { sectionIdx: number; measureIdx: number; beatIdx: number } | null;
  onSelectBeat: (beat: {
    swara: string;
    octave: OctaveType;
    westernNote: string;
    chord: string;
    fluteHoles?: string;
    violinString?: 'G' | 'D' | 'A' | 'E';
    violinFinger?: number;
    violinBow?: 'down' | 'up';
  }) => void;
}

export const SinhalaSwaraNotationGrid: React.FC<SinhalaSwaraNotationGridProps> = ({
  song,
  semitoneOffset,
  useFixedSwaraMode,
  selectedInstrument,
  currentPlayPosition,
  onSelectBeat,
}) => {
  const handleNoteClick = (
    westernNote: string,
    swara: string,
    octave: OctaveType,
    chord: string,
    fluteHoles?: string,
    violinString?: 'G' | 'D' | 'A' | 'E',
    violinFinger?: number,
    violinBow?: 'down' | 'up'
  ) => {
    audioSynth.playNote(westernNote, selectedInstrument, 0.7);
    onSelectBeat({
      swara,
      octave,
      westernNote,
      chord,
      fluteHoles,
      violinString,
      violinFinger,
      violinBow,
    });
  };

  const handleChordClick = (chord: string, e: React.MouseEvent) => {
    e.stopPropagation();
    audioSynth.playChord(chord, selectedInstrument === 'guitar' ? 'guitar' : 'piano');
  };

  return (
    <div className="w-full space-y-8">
      {song.sections.map((section, sectionIdx) => (
        <div key={sectionIdx} className="bg-stone-950/80 rounded-2xl p-5 border border-stone-800 shadow-xl">
          {/* Section Title */}
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-stone-800">
            <h3 className="text-base font-bold text-stone-200 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <span>{section.sectionName}</span>
            </h3>
            <span className="text-xs text-stone-400 font-mono">
              {section.measures.length} මාත්‍රා ඛණ්ඩ (Measures)
            </span>
          </div>

          {/* Measures Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {section.measures.map((measure, measureIdx) => {
              const transposedChordName = transposeChord(measure.chord, semitoneOffset);
              const isCurrentMeasure =
                currentPlayPosition?.sectionIdx === sectionIdx &&
                currentPlayPosition?.measureIdx === measureIdx;

              return (
                <div
                  key={measure.id}
                  className={`relative rounded-xl p-3.5 transition-all border ${
                    isCurrentMeasure
                      ? 'bg-amber-950/30 border-amber-500/80 ring-2 ring-amber-400/40 shadow-lg shadow-amber-500/10'
                      : 'bg-stone-900/60 border-stone-800/90 hover:border-stone-700'
                  }`}
                >
                  {/* Measure Header: Chord badge & Play chord button */}
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-stone-800/80">
                    <button
                      type="button"
                      onClick={(e) => handleChordClick(transposedChordName, e)}
                      className="group flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500/15 text-amber-300 border border-amber-500/30 hover:bg-amber-500/25 transition-colors cursor-pointer text-xs font-bold font-mono"
                      title="කෝඩ් එකේ හඬ අසන්න"
                    >
                      <Volume2 className="w-3 h-3 text-amber-400 group-hover:scale-110 transition-transform" />
                      <span>[ {transposedChordName} ]</span>
                    </button>
                    <span className="text-[10px] font-mono text-stone-500">M{measureIdx + 1}</span>
                  </div>

                  {/* Beats Row: Swaras + Lyrics + Instrument tags */}
                  <div className="grid grid-cols-4 gap-1.5">
                    {measure.beats.map((beat, beatIdx) => {
                      const isCurrentBeat =
                        isCurrentMeasure && currentPlayPosition?.beatIdx === beatIdx;

                      // Transposed swara if in fixed mode, else original swara
                      let displaySwara = beat.swara;
                      let displayOctave = beat.octave;

                      if (useFixedSwaraMode && semitoneOffset !== 0) {
                        const transposedObj = transposeSwaraFixed(
                          beat.swara,
                          beat.octave,
                          semitoneOffset
                        );
                        displaySwara = transposedObj.swara;
                        displayOctave = transposedObj.octave;
                      }

                      // Octave visual indicator
                      const isHighOctave = displayOctave === 'thara';
                      const isLowOctave = displayOctave === 'mandra';

                      return (
                        <button
                          key={beatIdx}
                          type="button"
                          onClick={() =>
                            handleNoteClick(
                              beat.westernNote,
                              displaySwara,
                              displayOctave,
                              transposedChordName,
                              beat.fluteHoles,
                              beat.violinString,
                              beat.violinFinger,
                              beat.violinBow
                            )
                          }
                          className={`group flex flex-col items-center justify-between p-1.5 rounded-lg transition-all cursor-pointer select-none min-h-[76px] ${
                            isCurrentBeat
                              ? 'bg-amber-400 text-stone-950 font-bold scale-105 shadow-md shadow-amber-400/40 z-10 ring-2 ring-amber-300'
                              : 'bg-stone-950/70 hover:bg-stone-800 text-stone-200 border border-stone-850'
                          }`}
                        >
                          {/* Swara Display with Octave Dot */}
                          <div className="relative flex flex-col items-center pt-0.5">
                            {/* Thara Saptaka Top Dot */}
                            {isHighOctave && (
                              <span className={`text-[10px] leading-none ${isCurrentBeat ? 'text-stone-900 font-black' : 'text-amber-400'}`}>
                                •
                              </span>
                            )}

                            <span
                              className={`text-lg font-bold font-sans tracking-wide leading-tight ${
                                isCurrentBeat
                                  ? 'text-stone-950'
                                  : displaySwara === '-'
                                  ? 'text-stone-500'
                                  : 'text-amber-300'
                              }`}
                            >
                              {displaySwara}
                            </span>

                            {/* Mandra Saptaka Bottom Dot */}
                            {isLowOctave && (
                              <span className={`text-[10px] leading-none ${isCurrentBeat ? 'text-stone-900 font-black' : 'text-amber-400'}`}>
                                •
                              </span>
                            )}
                          </div>

                          {/* Western Note hint */}
                          <span
                            className={`text-[9px] font-mono leading-none ${
                              isCurrentBeat ? 'text-stone-800 font-semibold' : 'text-stone-500'
                            }`}
                          >
                            {beat.westernNote}
                          </span>

                          {/* Sinhala Lyric Syllable */}
                          <span
                            className={`text-xs font-medium truncate w-full text-center mt-1 pt-1 border-t ${
                              isCurrentBeat
                                ? 'text-stone-900 border-stone-900/30 font-bold'
                                : 'text-stone-300 border-stone-800/80 group-hover:text-amber-200'
                            }`}
                          >
                            {beat.lyric || '·'}
                          </span>

                          {/* Instrument-Specific micro tag */}
                          {selectedInstrument === 'violin' && beat.violinString && (
                            <span className="text-[8px] font-mono text-stone-400 mt-0.5">
                              {beat.violinString}:{beat.violinFinger}
                            </span>
                          )}
                          {selectedInstrument === 'flute' && beat.fluteHoles && (
                            <span className="text-[8px] font-mono text-stone-400 mt-0.5 truncate max-w-full">
                              {beat.fluteHoles}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

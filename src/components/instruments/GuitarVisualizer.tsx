import React from 'react';
import { getGuitarChord, CHROMATIC_SCALE } from '../../utils/musicTheory';
import { audioSynth } from '../../utils/audioSynth';
import { Volume2 } from 'lucide-react';

interface GuitarVisualizerProps {
  currentChord: string;
  activeNote?: string;
  keyRoot?: string;
}

// 6 strings tuning from low E to high E: E2, A2, D3, G3, B3, E4
const STRING_TUNING_MIDIS = [40, 45, 50, 55, 59, 64];
const STRING_NAMES = ['6: E', '5: A', '4: D', '3: G', '2: B', '1: E'];

// Sinhala Swara intervals
const SWARA_INTERVALS = ['ස', 'කෝ.රි', 'රි', 'කෝ.ග', 'ග', 'ම', 'තී.ම', 'ප', 'කෝ.ධ', 'ධ', 'කෝ.නි', 'නි'];

function getSwaraForMidi(midi: number, rootKey: string = 'C'): string {
  const rootIndex = CHROMATIC_SCALE.indexOf(rootKey.replace('m', '').replace('7', '')) || 0;
  const noteIndex = midi % 12;
  const interval = ((noteIndex - rootIndex) % 12 + 12) % 12;
  return SWARA_INTERVALS[interval] || '';
}

export const GuitarVisualizer: React.FC<GuitarVisualizerProps> = ({ currentChord, activeNote, keyRoot = 'C' }) => {
  const chordData = getGuitarChord(currentChord);

  const handleStrum = () => {
    audioSynth.playChord(currentChord, 'guitar');
  };

  return (
    <div className="w-full space-y-6">
      {/* Header with Chord Name and Strum button */}
      <div className="flex items-center justify-between pb-3 border-b border-stone-800 text-xs text-stone-400">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-stone-200">ගිටාර් කෝඩ් සහ ස්පර්ශ පුවරුව (Guitar Chord & Fretboard)</span>
          <span className="text-stone-500">·</span>
          <span className="text-amber-400 font-medium">{chordData.sinhalaName}</span>
        </div>
        <button
          type="button"
          onClick={handleStrum}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/15 text-amber-300 border border-amber-500/30 hover:bg-amber-500/25 transition-colors cursor-pointer text-xs font-medium"
        >
          <Volume2 className="w-3.5 h-3.5" />
          <span>කෝඩ් හඬ අසන්න (Strum)</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chord Box Diagram */}
        <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 flex flex-col items-center">
          <div className="text-sm font-semibold text-stone-200 mb-1">{chordData.name} Chord</div>
          <div className="text-xs text-stone-400 mb-4">{chordData.sinhalaName}</div>

          {/* Diagram Box */}
          <div className="relative w-44 h-52 bg-stone-900/60 rounded-lg p-3 border border-stone-800">
            {/* Nut indicator or base fret */}
            <div className="w-full h-1.5 bg-amber-500/80 rounded mb-2" />

            {/* String status headers (O or X) */}
            <div className="flex justify-between px-1 text-[11px] font-mono text-stone-400 mb-2">
              {chordData.frets.map((fret, i) => (
                <span key={i} className={fret === -1 ? 'text-rose-400 font-bold' : fret === 0 ? 'text-emerald-400 font-bold' : 'text-stone-400'}>
                  {fret === -1 ? 'X' : fret === 0 ? 'O' : ''}
                </span>
              ))}
            </div>

            {/* Fret Grid: 4 Frets */}
            <div className="relative w-full h-36 border border-stone-700/80 rounded bg-stone-950/70">
              {/* 3 Horizontal Fret Wires */}
              <div className="absolute top-1/4 w-full h-[1px] bg-stone-700" />
              <div className="absolute top-2/4 w-full h-[1px] bg-stone-700" />
              <div className="absolute top-3/4 w-full h-[1px] bg-stone-700" />

              {/* 6 Vertical Strings */}
              <div className="w-full h-full flex justify-between px-2.5">
                {[0, 1, 2, 3, 4, 5].map((strIdx) => (
                  <div
                    key={strIdx}
                    className="h-full bg-stone-500/70 relative"
                    style={{ width: `${1 + (5 - strIdx) * 0.3}px` }}
                  >
                    {/* Finger dot if this string is fretted */}
                    {chordData.frets[strIdx] > 0 && chordData.frets[strIdx] <= 4 && (
                      <div
                        className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-amber-400 text-stone-950 font-bold text-[10px] flex items-center justify-center shadow-md ring-2 ring-amber-300"
                        style={{
                          top: `${(chordData.frets[strIdx] - 0.5) * 25}%`,
                        }}
                      >
                        {chordData.fingers[strIdx] > 0 ? chordData.fingers[strIdx] : '•'}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Fret count label */}
            <div className="text-[10px] text-stone-500 text-center mt-2">
              ඇඟිලි අංක: 1=දබරඟිල්ල, 2=මැදඟිල්ල, 3=වෙදඟිල්ල, 4=සුළැඟිල්ල
            </div>
          </div>
        </div>

        {/* Fretboard Guide with Sinhala Swaras */}
        <div className="lg:col-span-2 bg-stone-950 p-4 rounded-xl border border-stone-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-stone-200">ගිටාර් ස්පර්ශ පුවරුවේ සිංහල ස්වර පිහිටීම (Fretboard Swaras)</span>
              <span className="text-xs text-amber-400 font-medium">මූලික ශ්‍රැතිය: {keyRoot}</span>
            </div>
            <p className="text-xs text-stone-400 mb-4">
              ගිටාරයේ තත් 6 දිගේ තෝරාගත් ශ්‍රැතියට අදාළ සිංහල ස්වර (ස, රි, ග, ම, ප, ධ, නි) පිහිටන ස්ථාන.
            </p>
          </div>

          <div className="relative w-full overflow-x-auto pb-2">
            <div className="min-w-[620px] bg-stone-900/90 rounded-lg p-3 border border-stone-800">
              {/* Fret number indicators */}
              <div className="grid grid-cols-13 text-[10px] font-mono text-stone-400 text-center pb-2 border-b border-stone-800">
                <span className="text-stone-500">Open</span>
                {Array.from({ length: 12 }).map((_, f) => (
                  <span key={f} className={f + 1 === 3 || f + 1 === 5 || f + 1 === 7 || f + 1 === 9 || f + 1 === 12 ? 'text-amber-400 font-bold' : ''}>
                    {f + 1}
                  </span>
                ))}
              </div>

              {/* 6 Strings rendered horizontally */}
              <div className="space-y-2 mt-2">
                {STRING_TUNING_MIDIS.map((baseMidi, stringIndex) => (
                  <div key={stringIndex} className="grid grid-cols-13 items-center text-center">
                    {/* Fret 0 (Open) to Fret 12 */}
                    {Array.from({ length: 13 }).map((_, fret) => {
                      const midi = baseMidi + fret;
                      const swara = getSwaraForMidi(midi, keyRoot);
                      const isMainTonic = swara === 'ස' || swara === 'ප';
                      const isNaturalSwara = ['ස', 'රි', 'ග', 'ම', 'ප', 'ධ', 'නි'].includes(swara);

                      return (
                        <div
                          key={fret}
                          className={`h-7 flex items-center justify-center border-r border-stone-800/80 relative text-[11px] ${
                            fret === 0 ? 'bg-stone-950 font-medium' : ''
                          }`}
                        >
                          {/* Fret wire */}
                          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-stone-700/60 pointer-events-none" />

                          {/* Swara token */}
                          {isNaturalSwara && (
                            <span
                              className={`relative z-10 px-1 py-0.5 rounded text-[10px] font-semibold ${
                                isMainTonic
                                  ? 'bg-amber-400 text-stone-950 ring-1 ring-amber-300'
                                  : 'bg-stone-800 text-stone-200 border border-stone-700'
                              }`}
                            >
                              {swara}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>

              {/* String label legend */}
              <div className="flex justify-between items-center text-[10px] text-stone-400 pt-3 border-t border-stone-800/80 mt-2">
                <span>පහළ තත් (ඝන) 6:E, 5:A, 4:D</span>
                <span>ඉහළ තත් (සිහින්) 3:G, 2:B, 1:E</span>
                <span className="text-amber-400">● කහ පැහැයෙන් මූලික ස්වර (ස, ප)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { getFluteHoles } from '../../utils/musicTheory';
import { audioSynth } from '../../utils/audioSynth';
import { OctaveType } from '../../types/music';

interface FluteVisualizerProps {
  activeSwara?: string;
  activeOctave?: OctaveType;
  activeWesternNote?: string;
}

const COMMON_FLUTE_SWARAS = [
  { swara: 'ස', name: 'Sa', note: 'C4', octave: 'madhya' as OctaveType },
  { swara: 'රි', name: 'Ri', note: 'D4', octave: 'madhya' as OctaveType },
  { swara: 'ග', name: 'Ga', note: 'E4', octave: 'madhya' as OctaveType },
  { swara: 'ම', name: 'Ma', note: 'F4', octave: 'madhya' as OctaveType },
  { swara: 'තී.ම', name: 'Teevra Ma', note: 'F#4', octave: 'madhya' as OctaveType },
  { swara: 'ප', name: 'Pa', note: 'G4', octave: 'madhya' as OctaveType },
  { swara: 'ධ', name: 'Dha', note: 'A4', octave: 'madhya' as OctaveType },
  { swara: 'නි', name: 'Ni', note: 'B4', octave: 'madhya' as OctaveType },
  { swara: '˙ස', name: 'High Sa', note: 'C5', octave: 'thara' as OctaveType },
];

export const FluteVisualizer: React.FC<FluteVisualizerProps> = ({
  activeSwara = 'ප',
  activeOctave = 'madhya',
  activeWesternNote = 'G4',
}) => {
  const currentSwaraClean = activeSwara.replace(/˙|\./g, '');
  const holesPattern = getFluteHoles(currentSwaraClean);
  const holes = holesPattern.split('');

  const handleTestSwara = (swaraItem: typeof COMMON_FLUTE_SWARAS[0]) => {
    audioSynth.playNote(swaraItem.note, 'flute', 0.9);
  };

  const getBreathGuide = (octave: OctaveType) => {
    switch (octave) {
      case 'mandra':
        return { label: 'මන්ද්‍ර සප්තකය (පහළ ස්වරය)', desc: 'මෘදු සැහැල්ලු පිඹීම (Soft Warm Breath)' };
      case 'thara':
        return { label: 'තාර සප්තකය (ඉහළ ස්වරය)', desc: 'තීව්‍ර ශක්තිමත් පිඹීම (Firm Overblow)' };
      default:
        return { label: 'මධ්‍ය සප්තකය (සාමාන්‍ය ස්වරය)', desc: 'සමබර සුමට පිඹීම (Medium Steady Breath)' };
    }
  };

  const breath = getBreathGuide(activeOctave);

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-stone-800 text-xs text-stone-400">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-stone-200">බටනලා ඇඟිලි පිහිටුම් සටහන (Bansuri 6-Hole Fingerings)</span>
          <span className="text-stone-500">·</span>
          <span>ස්වර ලිපි ඇඟිලි සටහන්</span>
        </div>
        <div className="text-amber-400 font-medium">
          වත්මන් ස්වරය: <span className="font-bold text-sm text-stone-100">{activeSwara}</span> ({activeWesternNote})
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Visual Flute Graphic */}
        <div className="lg:col-span-2 bg-stone-950 p-6 rounded-xl border border-stone-800 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-semibold text-stone-200">බටනලාවේ සිදුරු විවරයන් (Tone Holes State)</span>
            <span className="text-xs text-stone-400">● = වසා ඇති සිදුර | ○ = විවෘත සිදුර</span>
          </div>

          {/* Bamboo Flute representation */}
          <div className="relative w-full h-32 bg-gradient-to-r from-amber-950 via-amber-900 to-amber-950 rounded-2xl p-4 shadow-2xl border border-amber-800/40 flex items-center justify-between my-2">
            {/* Blow hole (Embouchure) */}
            <div className="flex flex-col items-center">
              <div className="w-9 h-9 rounded-full bg-stone-950 border-2 border-amber-700/80 shadow-inner flex items-center justify-center">
                <div className="w-5 h-5 rounded-full bg-stone-900/90" />
              </div>
              <span className="text-[10px] text-amber-300 font-medium mt-1">පිඹින සිදුර</span>
            </div>

            {/* Subtle bamboo joint lines */}
            <div className="h-full w-[2px] bg-amber-950/80 shadow" />

            {/* 6 Finger Holes */}
            <div className="flex items-center gap-4 sm:gap-6 px-4">
              {holes.map((state, idx) => {
                const isClosed = state === '●';
                const isHalf = state === '◐';

                return (
                  <div key={idx} className="flex flex-col items-center">
                    <div
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center border-2 transition-all shadow-md ${
                        isClosed
                          ? 'bg-amber-400 border-amber-200 ring-2 ring-amber-400/50 shadow-amber-400/20'
                          : isHalf
                          ? 'bg-amber-700 border-amber-300'
                          : 'bg-stone-950 border-amber-800/80 shadow-inner'
                      }`}
                    >
                      {isClosed && <div className="w-3 h-3 rounded-full bg-stone-900" />}
                      {isHalf && <div className="w-3 h-3 rounded-l-full bg-stone-900 mr-auto ml-0.5" />}
                    </div>
                    <span className="text-[10px] text-amber-200/70 font-mono mt-1">සිදුර {idx + 1}</span>
                    <span className="text-[9px] text-stone-400">
                      {idx < 3 ? 'වම් අත' : 'දකුණු අත'}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Flute open end */}
            <div className="w-4 h-16 rounded-r bg-amber-950 border-l border-amber-800/70" />
          </div>

          {/* Breath technique banner */}
          <div className="bg-stone-900/80 p-3 rounded-lg border border-stone-800 flex items-center justify-between text-xs mt-3">
            <div>
              <span className="text-stone-400">පිඹීමේ තාක්ෂණය: </span>
              <span className="text-amber-300 font-medium">{breath.label}</span>
            </div>
            <div className="text-stone-300 italic">{breath.desc}</div>
          </div>
        </div>

        {/* Quick Swara Flute Selector */}
        <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 flex flex-col justify-between">
          <div>
            <div className="text-sm font-semibold text-stone-200 mb-1">බටනලා ස්වර අත්හදා බලන්න</div>
            <div className="text-xs text-stone-400 mb-3">ස්වරයක් තෝරා සිදුරු පිහිටීම බලන්න</div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {COMMON_FLUTE_SWARAS.map((item) => {
              const isSelected = activeSwara === item.swara || currentSwaraClean === item.swara;
              return (
                <button
                  key={item.swara}
                  type="button"
                  onClick={() => handleTestSwara(item)}
                  className={`p-2 rounded-lg border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-amber-500/20 border-amber-400 text-stone-100 ring-1 ring-amber-400'
                      : 'bg-stone-900 border-stone-800 text-stone-300 hover:border-stone-700'
                  }`}
                >
                  <span className="text-base font-bold text-amber-400">{item.swara}</span>
                  <span className="text-[10px] text-stone-400 font-mono">{item.note}</span>
                  <span className="text-[10px] font-mono text-stone-500 mt-1">{getFluteHoles(item.swara)}</span>
                </button>
              );
            })}
          </div>

          <div className="text-[11px] text-stone-500 text-center mt-3 pt-2 border-t border-stone-800">
            සාම්ප්‍රදායික ශ්‍රී ලාංකේය/උතුරු ඉන්දීය බටනලා ක්‍රමය (3 සිදුරු වසා = ප, 6 සිදුරු වසා = ස)
          </div>
        </div>
      </div>
    </div>
  );
};

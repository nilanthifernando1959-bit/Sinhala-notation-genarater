import React from 'react';
import { audioSynth } from '../../utils/audioSynth';
import { getViolinFingering } from '../../utils/musicTheory';

interface ViolinVisualizerProps {
  activeNote?: string; // e.g. "E4", "A4", "D5"
  activeSwara?: string; // e.g. "ස", "රි", "ග"
  bowDirection?: 'down' | 'up';
}

const STRINGS = [
  { id: 'E', name: 'E තත (1 වන - මි)', pitch: 'E5', baseMidi: 76, color: 'text-amber-300' },
  { id: 'A', name: 'A තත (2 වන - ලා)', pitch: 'A4', baseMidi: 69, color: 'text-amber-400' },
  { id: 'D', name: 'D තත (3 වන - රේ)', pitch: 'D4', baseMidi: 62, color: 'text-amber-500' },
  { id: 'G', name: 'G තත (4 වන - සොල්)', pitch: 'G3', baseMidi: 55, color: 'text-amber-600' },
];

export const ViolinVisualizer: React.FC<ViolinVisualizerProps> = ({
  activeNote = 'D4',
  activeSwara = 'ස',
  bowDirection = 'down',
}) => {
  const currentFingering = getViolinFingering(activeNote);

  const handleTestString = (pitch: string) => {
    audioSynth.playNote(pitch, 'violin', 1.0);
  };

  const getFingerName = (finger: number) => {
    switch (finger) {
      case 0:
        return '0 (විවෘත තත / Open String)';
      case 1:
        return '1 වන ඇඟිල්ල (දබරඟිල්ල)';
      case 2:
        return '2 වන ඇඟිල්ල (මැදඟිල්ල)';
      case 3:
        return '3 වන ඇඟිල්ල (වෙදඟිල්ල)';
      case 4:
        return '4 වන ඇඟිල්ල (සුළැඟිල්ල)';
      default:
        return `${finger} වන ඇඟිල්ල`;
    }
  };

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-stone-800 text-xs text-stone-400">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-stone-200">වයලීන ඇඟිලි හා දුනු සටහන (Violin Strings & Bowing)</span>
          <span className="text-stone-500">·</span>
          <span>තත් 4 සහ ඇඟිලි පිහිටුම්</span>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div className="text-stone-300">
            දුන්න දිශාව: <span className="text-amber-400 font-bold">{bowDirection === 'down' ? '⬇ පහළට (Down Bow)' : '⬆ ඉහළට (Up Bow)'}</span>
          </div>
          <div className="text-amber-400 font-medium">
            ස්වරය: <span className="font-bold text-stone-100">{activeSwara}</span> ({activeNote})
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Violin Fingerboard Graphic */}
        <div className="lg:col-span-2 bg-stone-950 p-6 rounded-xl border border-stone-800 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-semibold text-stone-200">වයලීන ස්පර්ශ පුවරුව (Violin Fingerboard)</span>
            <span className="text-xs text-amber-400 font-medium">
              ක්‍රියාකාරී: {currentFingering.string} තතේ {getFingerName(currentFingering.finger)}
            </span>
          </div>

          {/* Wooden / Ebony Fingerboard Graphic */}
          <div className="relative w-full h-44 bg-gradient-to-r from-stone-900 via-stone-950 to-stone-900 rounded-xl p-4 border border-stone-800 shadow-2xl flex flex-col justify-between">
            {/* Nut (පෙරැස්ස) */}
            <div className="absolute left-10 top-0 bottom-0 w-2.5 bg-stone-700/80 rounded-sm shadow" />

            {/* Position markers (1st position, 3rd position) */}
            <div className="absolute left-[30%] top-2 text-[10px] font-mono text-stone-600">1st Pos</div>
            <div className="absolute left-[55%] top-2 text-[10px] font-mono text-stone-600">2nd Pos</div>
            <div className="absolute left-[80%] top-2 text-[10px] font-mono text-stone-600">3rd Pos</div>

            {/* 4 Violin Strings (E, A, D, G) */}
            {STRINGS.map((str, idx) => {
              const isStringActive = currentFingering.string === str.id;
              const fingerPosPercent = 10 + currentFingering.finger * 18;

              return (
                <div key={str.id} className="relative flex items-center h-8 my-0.5">
                  {/* String label on peg box side */}
                  <span className={`w-8 text-xs font-bold font-mono ${str.color} select-none`}>
                    {str.id}
                  </span>

                  {/* The string wire */}
                  <div className="flex-1 h-full flex items-center relative pl-3">
                    <div
                      className={`w-full ${isStringActive ? 'bg-amber-400 shadow-sm shadow-amber-400/50' : 'bg-stone-500/60'}`}
                      style={{ height: `${1 + (3 - idx) * 0.7}px` }}
                    />

                    {/* Finger Touch Indicator if active on this string */}
                    {isStringActive && (
                      <div
                        className="absolute -translate-y-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-amber-400 text-stone-950 font-bold text-xs flex items-center justify-center shadow-lg ring-4 ring-amber-400/30"
                        style={{
                          left: `${fingerPosPercent}%`,
                          top: '50%',
                        }}
                      >
                        {currentFingering.finger}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Fingerboard Legend */}
          <div className="flex justify-between items-center text-[11px] text-stone-400 pt-3 border-t border-stone-800 mt-3">
            <span>ඇඟිලි සලකුණු: 0 = විවෘත, 1 = දබර, 2 = මැද, 3 = වෙද, 4 = සුළැඟිල්ල</span>
            <span className="text-amber-400">● කහ පැහැ රවුමෙන් ඔබ තැබිය යුතු ඇඟිලි පිහිටුම පෙන්වයි</span>
          </div>
        </div>

        {/* 4 Strings Audio Tester */}
        <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 flex flex-col justify-between">
          <div>
            <div className="text-sm font-semibold text-stone-200 mb-1">වයලීන තත් පරීක්ෂාව (Open Strings)</div>
            <div className="text-xs text-stone-400 mb-4">ක්ලික් කර එක් එක් තතේ නාදය අසන්න</div>
          </div>

          <div className="space-y-2">
            {STRINGS.map((str) => (
              <button
                key={str.id}
                type="button"
                onClick={() => handleTestString(str.pitch)}
                className="w-full flex items-center justify-between p-3 rounded-lg bg-stone-900 hover:bg-stone-850 border border-stone-800 hover:border-amber-500/50 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <span className={`w-6 h-6 rounded flex items-center justify-center bg-stone-800 font-bold font-mono text-xs ${str.color}`}>
                    {str.id}
                  </span>
                  <span className="text-xs text-stone-200">{str.name}</span>
                </div>
                <span className="text-xs font-mono text-stone-400">{str.pitch}</span>
              </button>
            ))}
          </div>

          <div className="text-[11px] text-stone-500 text-center mt-3 pt-2 border-t border-stone-800">
            සම්මත වයලීන සුසරකරණය: G3 (196Hz) - D4 (293Hz) - A4 (440Hz) - E5 (659Hz)
          </div>
        </div>
      </div>
    </div>
  );
};

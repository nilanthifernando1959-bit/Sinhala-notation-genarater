import React from 'react';
import { CHROMATIC_SCALE } from '../utils/musicTheory';
import { RefreshCw, ArrowUp, ArrowDown, BookOpen } from 'lucide-react';

interface TransposeControlsProps {
  originalKey: string;
  semitoneOffset: number;
  onSetSemitoneOffset: (offset: number) => void;
  useFixedSwaraMode: boolean;
  onToggleFixedSwaraMode: (val: boolean) => void;
  onOpenChords: () => void;
}

export const TransposeControls: React.FC<TransposeControlsProps> = ({
  originalKey,
  semitoneOffset,
  onSetSemitoneOffset,
  useFixedSwaraMode,
  onToggleFixedSwaraMode,
  onOpenChords,
}) => {
  // Calculate current root key
  const normOriginalKey = originalKey.replace('m', '').replace('7', '');
  const rootIndex = CHROMATIC_SCALE.indexOf(normOriginalKey) >= 0 ? CHROMATIC_SCALE.indexOf(normOriginalKey) : 0;
  const currentKeyIndex = ((rootIndex + semitoneOffset) % 12 + 12) % 12;
  const currentKeyName = CHROMATIC_SCALE[currentKeyIndex];
  const isMinor = originalKey.includes('m') && !originalKey.includes('maj');
  const fullTransposedKey = `${currentKeyName}${isMinor ? 'm' : ''}`;

  const handleSelectKey = (targetKeyName: string) => {
    const targetIndex = CHROMATIC_SCALE.indexOf(targetKeyName);
    if (targetIndex !== -1) {
      let diff = targetIndex - rootIndex;
      if (diff > 6) diff -= 12;
      if (diff < -5) diff += 12;
      onSetSemitoneOffset(diff);
    }
  };

  return (
    <div className="w-full bg-stone-950 rounded-2xl p-5 border border-stone-800 shadow-xl space-y-4">
      {/* Top row: Current Key and Semitone Adjusters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <span className="text-xs text-stone-400 font-medium">මූලික ශ්‍රැතිය (Original Key)</span>
            <span className="text-lg font-bold font-mono text-stone-200">{originalKey}</span>
          </div>

          <div className="text-stone-600 text-xl font-light">→</div>

          <div className="flex flex-col">
            <span className="text-xs text-amber-400 font-medium">වත්මන් ශ්‍රැතිය (Transposed Key)</span>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black font-mono text-amber-400">{fullTransposedKey}</span>
              <span className="text-xs font-mono text-stone-400 bg-stone-900 px-2 py-0.5 rounded border border-stone-800">
                {semitoneOffset >= 0 ? `+${semitoneOffset}` : semitoneOffset} semitones
              </span>
            </div>
          </div>
        </div>

        {/* Step Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onSetSemitoneOffset(semitoneOffset - 1)}
            className="flex items-center gap-1 px-3 py-2 rounded-lg bg-stone-900 hover:bg-stone-850 text-stone-200 border border-stone-800 hover:border-amber-400 transition-colors text-xs font-semibold cursor-pointer active:scale-95"
          >
            <ArrowDown className="w-3.5 h-3.5 text-amber-400" />
            <span>-1 අඩ ස්වරයක් (Pitch Down)</span>
          </button>

          <button
            type="button"
            onClick={() => onSetSemitoneOffset(semitoneOffset + 1)}
            className="flex items-center gap-1 px-3 py-2 rounded-lg bg-stone-900 hover:bg-stone-850 text-stone-200 border border-stone-800 hover:border-amber-400 transition-colors text-xs font-semibold cursor-pointer active:scale-95"
          >
            <ArrowUp className="w-3.5 h-3.5 text-amber-400" />
            <span>+1 අඩ ස්වරයක් (Pitch Up)</span>
          </button>

          {semitoneOffset !== 0 && (
            <button
              type="button"
              onClick={() => onSetSemitoneOffset(0)}
              className="p-2 rounded-lg bg-stone-900 hover:bg-stone-850 text-stone-400 hover:text-stone-200 border border-stone-800 transition-colors cursor-pointer"
              title="නැවත මූලික ශ්‍රැතියට (Reset)"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          )}

          <button
            type="button"
            onClick={onOpenChords}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 transition-colors text-xs font-semibold cursor-pointer whitespace-nowrap ml-auto"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>කෝඩ් පොත (Chords)</span>
          </button>
        </div>
      </div>

      {/* Direct Key Palette */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-stone-400 font-medium">ක්ෂණිකව ශ්‍රැතිය තෝරන්න (Select Target Key):</span>
          <span className="text-[11px] text-stone-500">සියලු කෝඩ් සහ ස්වර ඒ අනුව ස්වයංක්‍රීයව පරිවර්තනය වේ</span>
        </div>
        <div className="grid grid-cols-6 sm:grid-cols-12 gap-1.5">
          {CHROMATIC_SCALE.map((k) => {
            const isSelected = currentKeyName === k;
            return (
              <button
                key={k}
                type="button"
                onClick={() => handleSelectKey(k)}
                className={`py-1.5 text-xs font-mono font-bold rounded-lg border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-amber-400 text-stone-950 border-amber-300 shadow-sm ring-1 ring-amber-300'
                    : 'bg-stone-900 hover:bg-stone-850 text-stone-300 border-stone-800 hover:border-stone-700'
                }`}
              >
                {k}
              </button>
            );
          })}
        </div>
      </div>

      {/* Swara Mode Toggle (Relative vs Absolute Fixed Pitch) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-stone-850 text-xs">
        <div className="text-stone-400">
          <span className="font-semibold text-stone-200">සිංහල ස්වර පරිවර්තන ක්‍රමය (Swara Mapping Mode):</span>{' '}
          {useFixedSwaraMode ? (
            <span className="text-amber-400">නියත ශ්‍රැති ක්‍රමය (Absolute: C=ස, D=රි, E=ග)</span>
          ) : (
            <span className="text-amber-400">සාපේක්ෂ මුඛ්‍ය ස්වර ක්‍රමය (Relative: නව ශ්‍රැතිය = ස, ගායකයින්ට හා බටනලාවට ඉතා සුදුසුයි)</span>
          )}
        </div>

        <div className="flex items-center gap-1 p-1 bg-stone-900 rounded-lg border border-stone-800 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => onToggleFixedSwaraMode(false)}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              !useFixedSwaraMode ? 'bg-amber-400 text-stone-950 font-bold' : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            සාපේක්ෂ (Relative Sa)
          </button>
          <button
            type="button"
            onClick={() => onToggleFixedSwaraMode(true)}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              useFixedSwaraMode ? 'bg-amber-400 text-stone-950 font-bold' : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            නියත (Fixed Pitch)
          </button>
        </div>
      </div>
    </div>
  );
};

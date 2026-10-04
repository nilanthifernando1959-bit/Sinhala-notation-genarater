import React, { useState } from 'react';
import { Song } from '../types/music';
import { transposeChord, transposeSwaraFixed } from '../utils/musicTheory';
import { X, Copy, Check, Printer } from 'lucide-react';

interface PrintExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  song: Song;
  semitoneOffset: number;
  useFixedSwaraMode: boolean;
}

export const PrintExportModal: React.FC<PrintExportModalProps> = ({
  isOpen,
  onClose,
  song,
  semitoneOffset,
  useFixedSwaraMode,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Build formatted text representation
  let textOutput = `=== ${song.titleSinhala} (${song.title}) ===\n`;
  textOutput += `ගායනය: ${song.artist}\n`;
  textOutput += `මුල් ශ්‍රැතිය: ${song.originalKey} | වත්මන් ශ්‍රැතිය: ${transposeChord(song.originalKey, semitoneOffset)}\n`;
  textOutput += `තාලය: ${song.beat} | ලය: ${song.tempo} BPM\n`;
  if (song.ragaOrScale) textOutput += `රාගය / පරිමාණය: ${song.ragaOrScale}\n`;
  textOutput += `=========================================\n\n`;

  song.sections.forEach((section) => {
    textOutput += `[ ${section.sectionName} ]\n`;
    section.measures.forEach((measure, idx) => {
      const chord = transposeChord(measure.chord, semitoneOffset);
      const swaras = measure.beats
        .map((b) => {
          let s = b.swara;
          if (useFixedSwaraMode && semitoneOffset !== 0) {
            s = transposeSwaraFixed(b.swara, b.octave, semitoneOffset).swara;
          }
          if (b.octave === 'thara') s = `˙${s}`;
          if (b.octave === 'mandra') s = `${s}.`;
          return s.padEnd(4, ' ');
        })
        .join(' ');

      const lyrics = measure.beats.map((b) => (b.lyric || '-').padEnd(4, ' ')).join(' ');

      textOutput += `| [${chord}] ${swaras} |\n`;
      textOutput += `|       ${lyrics} |\n`;
      if ((idx + 1) % 2 === 0) textOutput += '\n';
    });
    textOutput += '\n';
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(textOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-800 mb-4">
          <div>
            <h3 className="text-lg font-bold text-stone-100">
              සිංහල ස්වර ලිපිය පිටපත් කරගන්න (Export / Print Swara Lipiya)
            </h3>
            <p className="text-xs text-stone-400 mt-0.5">
              WhatsApp, මුද්‍රණය හෝ සටහන් සඳහා පහසු සම්පූර්ණ ස්වර ප්‍රස්ථාරය
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

        {/* Text Area */}
        <div className="flex-1 overflow-hidden my-2">
          <pre className="w-full h-80 p-4 bg-stone-950 rounded-xl border border-stone-800 text-stone-300 font-mono text-xs overflow-auto leading-relaxed select-all">
            {textOutput}
          </pre>
        </div>

        {/* Actions */}
        <div className="pt-4 border-t border-stone-800 flex items-center justify-between">
          <button
            type="button"
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-750 text-stone-200 text-xs font-semibold cursor-pointer transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>මුද්‍රණය කරන්න (Print)</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-750 text-stone-300 text-xs font-semibold cursor-pointer transition-colors"
            >
              වසන්න
            </button>
            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 text-xs font-bold cursor-pointer transition-colors shadow-md shadow-amber-400/20"
            >
              {copied ? <Check className="w-4 h-4 text-stone-950" /> : <Copy className="w-4 h-4 text-stone-950" />}
              <span>{copied ? 'පිටපත් විය! (Copied)' : 'පිටපත් කරන්න (Copy All)'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

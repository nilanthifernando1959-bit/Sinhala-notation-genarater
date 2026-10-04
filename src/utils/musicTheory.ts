import { ChordDiagramData, OctaveType } from '../types/music';

export const CHROMATIC_SCALE = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
export const CHROMATIC_SCALE_FLATS = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

export const SINHALA_SWARAS = [
  { swara: 'ස', name: 'ෂඩ්ජය (Sa)', semitone: 0, westernOffset: 0 },
  { swara: 'කෝ.රි', name: 'කෝමල රිෂභය (Komala Ri)', semitone: 1, westernOffset: 1 },
  { swara: 'රි', name: 'ශුද්ධ රිෂභය (Shuddha Ri)', semitone: 2, westernOffset: 2 },
  { swara: 'කෝ.ග', name: 'කෝමල ගාන්ධාරය (Komala Ga)', semitone: 3, westernOffset: 3 },
  { swara: 'ග', name: 'ශුද්ධ ගාන්ධාරය (Shuddha Ga)', semitone: 4, westernOffset: 4 },
  { swara: 'ම', name: 'ශුද්ධ මධ්‍යමය (Shuddha Ma)', semitone: 5, westernOffset: 5 },
  { swara: 'තී.ම', name: 'තීව්‍ර මධ්‍යමය (Theevra Ma)', semitone: 6, westernOffset: 6 },
  { swara: 'ප', name: 'පංචමය (Pa)', semitone: 7, westernOffset: 7 },
  { swara: 'කෝ.ධ', name: 'කෝමල ධෛවතය (Komala Dha)', semitone: 8, westernOffset: 8 },
  { swara: 'ධ', name: 'ශුද්ධ ධෛවතය (Shuddha Dha)', semitone: 9, westernOffset: 9 },
  { swara: 'කෝ.නි', name: 'කෝමල නිශාදය (Komala Ni)', semitone: 10, westernOffset: 10 },
  { swara: 'නි', name: 'ශුද්ධ නිශාදය (Shuddha Ni)', semitone: 11, westernOffset: 11 },
];

// Helper to normalize note name
export function normalizeNoteName(note: string): string {
  const map: Record<string, string> = {
    'Db': 'C#', 'Eb': 'D#', 'Gb': 'F#', 'Ab': 'G#', 'Bb': 'A#'
  };
  return map[note] || note;
}

// Convert note to frequency
export function noteToFrequency(noteWithOctave: string): number {
  const match = noteWithOctave.match(/^([A-G][#b]?)([0-9])$/);
  if (!match) return 440;
  const note = normalizeNoteName(match[1]);
  const octave = parseInt(match[2], 10);
  const noteIndex = CHROMATIC_SCALE.indexOf(note);
  if (noteIndex === -1) return 440;
  const midi = (octave + 1) * 12 + noteIndex;
  return 440 * Math.pow(2, (midi - 69) / 12);
}

// Transpose a single Western pitch e.g. "C4" -> "D4" (+2 semitones)
export function transposePitch(noteWithOctave: string, semitones: number): string {
  const match = noteWithOctave.match(/^([A-G][#b]?)([0-9])$/);
  if (!match) return noteWithOctave;
  let note = normalizeNoteName(match[1]);
  let octave = parseInt(match[2], 10);
  let noteIndex = CHROMATIC_SCALE.indexOf(note);
  if (noteIndex === -1) return noteWithOctave;

  let newMidi = (octave + 1) * 12 + noteIndex + semitones;
  let newOctave = Math.floor(newMidi / 12) - 1;
  let newNoteIndex = ((newMidi % 12) + 12) % 12;

  return `${CHROMATIC_SCALE[newNoteIndex]}${newOctave}`;
}

// Transpose a chord symbol e.g. "C", "Am", "G7", "F#m", "Bb"
export function transposeChord(chord: string, semitones: number): string {
  if (!chord || chord === '-' || chord === 'NC') return chord;
  const match = chord.match(/^([A-G][#b]?)(.*)$/);
  if (!match) return chord;

  const root = match[1];
  const suffix = match[2];
  const normRoot = normalizeNoteName(root);
  const index = CHROMATIC_SCALE.indexOf(normRoot);
  if (index === -1) return chord;

  const newIndex = ((index + semitones) % 12 + 12) % 12;
  // Use flats for F, Bb, Eb, Ab keys if preferred
  const transposedRoot = (semitones < 0 || root.includes('b')) 
    ? CHROMATIC_SCALE_FLATS[newIndex] 
    : CHROMATIC_SCALE[newIndex];

  return `${transposedRoot}${suffix}`;
}

// Transpose a Sinhala Swara in fixed-pitch mode
export function transposeSwaraFixed(swara: string, octave: OctaveType, semitones: number): { swara: string; octave: OctaveType } {
  if (swara === '-' || swara === '0' || !swara) {
    return { swara, octave };
  }

  const found = SINHALA_SWARAS.find(s => s.swara === swara);
  if (!found) return { swara, octave };

  let octaveOffset = octave === 'mandra' ? -12 : octave === 'thara' ? 12 : 0;
  let totalSemitone = found.semitone + octaveOffset + semitones;

  let newOctave: OctaveType = 'madhya';
  if (totalSemitone < 0) {
    newOctave = 'mandra';
  } else if (totalSemitone >= 12) {
    newOctave = 'thara';
  }

  let modSemitone = ((totalSemitone % 12) + 12) % 12;
  let newSwaraObj = SINHALA_SWARAS.find(s => s.semitone === modSemitone);

  return {
    swara: newSwaraObj ? newSwaraObj.swara : swara,
    octave: newOctave,
  };
}

// Guitar Chord Library
export const GUITAR_CHORD_LIBRARY: Record<string, ChordDiagramData> = {
  'C': {
    name: 'C',
    sinhalaName: 'සී මේජර් (C Major)',
    frets: [-1, 3, 2, 0, 1, 0],
    fingers: [0, 3, 2, 0, 1, 0],
    notes: ['C4', 'E4', 'G4', 'C5', 'E5'],
  },
  'C#': {
    name: 'C#',
    sinhalaName: 'සී ෂාප් මේජර් (C# Major)',
    frets: [-1, 4, 6, 6, 6, 4],
    fingers: [0, 1, 3, 3, 3, 1],
    barre: 4,
    notes: ['C#4', 'G#4', 'C#5', 'F5'],
  },
  'Db': {
    name: 'Db',
    sinhalaName: 'ඩී ෆ්ලැට් මේජර් (Db Major)',
    frets: [-1, 4, 6, 6, 6, 4],
    fingers: [0, 1, 3, 3, 3, 1],
    barre: 4,
    notes: ['C#4', 'G#4', 'C#5', 'F5'],
  },
  'D': {
    name: 'D',
    sinhalaName: 'ඩී මේජර් (D Major)',
    frets: [-1, -1, 0, 2, 3, 2],
    fingers: [0, 0, 0, 1, 3, 2],
    notes: ['D4', 'A4', 'D5', 'F#5'],
  },
  'Eb': {
    name: 'Eb',
    sinhalaName: 'ඊ ෆ්ලැට් මේජර් (Eb Major)',
    frets: [-1, -1, 1, 3, 4, 3],
    fingers: [0, 0, 1, 3, 4, 2],
    notes: ['Eb4', 'Bb4', 'Eb5', 'G5'],
  },
  'E': {
    name: 'E',
    sinhalaName: 'ඊ මේජර් (E Major)',
    frets: [0, 2, 2, 1, 0, 0],
    fingers: [0, 2, 3, 1, 0, 0],
    notes: ['E3', 'B3', 'E4', 'G#4', 'B4', 'E5'],
  },
  'F': {
    name: 'F',
    sinhalaName: 'එෆ් මේජර් (F Major)',
    frets: [1, 3, 3, 2, 1, 1],
    fingers: [1, 3, 4, 2, 1, 1],
    barre: 1,
    notes: ['F3', 'C4', 'F4', 'A4', 'C5', 'F5'],
  },
  'F#': {
    name: 'F#',
    sinhalaName: 'එෆ් ෂාප් මේජර් (F# Major)',
    frets: [2, 4, 4, 3, 2, 2],
    fingers: [1, 3, 4, 2, 1, 1],
    barre: 2,
    notes: ['F#3', 'C#4', 'F#4', 'A#4', 'C#5', 'F#5'],
  },
  'G': {
    name: 'G',
    sinhalaName: 'ජී මේජර් (G Major)',
    frets: [3, 2, 0, 0, 0, 3],
    fingers: [2, 1, 0, 0, 0, 3],
    notes: ['G3', 'B3', 'D4', 'G4', 'D5', 'G5'],
  },
  'Ab': {
    name: 'Ab',
    sinhalaName: 'ඒ ෆ්ලැට් මේජර් (Ab Major)',
    frets: [4, 6, 6, 5, 4, 4],
    fingers: [1, 3, 4, 2, 1, 1],
    barre: 4,
    notes: ['Ab3', 'Eb4', 'Ab4', 'C5'],
  },
  'A': {
    name: 'A',
    sinhalaName: 'ඒ මේජර් (A Major)',
    frets: [-1, 0, 2, 2, 2, 0],
    fingers: [0, 0, 1, 2, 3, 0],
    notes: ['A3', 'E4', 'A4', 'C#5', 'E5'],
  },
  'Bb': {
    name: 'Bb',
    sinhalaName: 'බී ෆ්ලැට් මේජර් (Bb Major)',
    frets: [-1, 1, 3, 3, 3, 1],
    fingers: [0, 1, 2, 3, 4, 1],
    barre: 1,
    notes: ['Bb3', 'F4', 'Bb4', 'D5', 'F5'],
  },
  'B': {
    name: 'B',
    sinhalaName: 'බී මේජර් (B Major)',
    frets: [-1, 2, 4, 4, 4, 2],
    fingers: [0, 1, 2, 3, 4, 1],
    barre: 2,
    notes: ['B3', 'F#4', 'B4', 'D#5', 'F#5'],
  },
  'Am': {
    name: 'Am',
    sinhalaName: 'ඒ මයිනර් (A Minor)',
    frets: [-1, 0, 2, 2, 1, 0],
    fingers: [0, 0, 2, 3, 1, 0],
    notes: ['A3', 'E4', 'A4', 'C5', 'E5'],
  },
  'Dm': {
    name: 'Dm',
    sinhalaName: 'ඩී මයිනර් (D Minor)',
    frets: [-1, -1, 0, 2, 3, 1],
    fingers: [0, 0, 0, 2, 3, 1],
    notes: ['D4', 'A4', 'D5', 'F5'],
  },
  'Em': {
    name: 'Em',
    sinhalaName: 'ඊ මයිනර් (E Minor)',
    frets: [0, 2, 2, 0, 0, 0],
    fingers: [0, 2, 3, 0, 0, 0],
    notes: ['E3', 'B3', 'E4', 'G4', 'B4', 'E5'],
  },
  'Fm': {
    name: 'Fm',
    sinhalaName: 'එෆ් මයිනර් (F Minor)',
    frets: [1, 3, 3, 1, 1, 1],
    fingers: [1, 3, 4, 1, 1, 1],
    barre: 1,
    notes: ['F3', 'C4', 'F4', 'Ab4', 'C5', 'F5'],
  },
  'Gm': {
    name: 'Gm',
    sinhalaName: 'ජී මයිනර් (G Minor)',
    frets: [3, 5, 5, 3, 3, 3],
    fingers: [1, 3, 4, 1, 1, 1],
    barre: 3,
    notes: ['G3', 'D4', 'G4', 'Bb4', 'D5', 'G5'],
  },
  'Bm': {
    name: 'Bm',
    sinhalaName: 'බී මයිනර් (B Minor)',
    frets: [-1, 2, 4, 4, 3, 2],
    fingers: [0, 1, 3, 4, 2, 1],
    barre: 2,
    notes: ['B3', 'F#4', 'B4', 'D5', 'F#5'],
  },
  'G7': {
    name: 'G7',
    sinhalaName: 'ජී 7 (G Dominant 7th)',
    frets: [3, 2, 0, 0, 0, 1],
    fingers: [3, 2, 0, 0, 0, 1],
    notes: ['G3', 'B3', 'D4', 'F4', 'B4', 'G5'],
  },
  'C7': {
    name: 'C7',
    sinhalaName: 'සී 7 (C Dominant 7th)',
    frets: [-1, 3, 2, 3, 1, 0],
    fingers: [0, 3, 2, 4, 1, 0],
    notes: ['C4', 'E4', 'Bb4', 'C5', 'E5'],
  },
  'D7': {
    name: 'D7',
    sinhalaName: 'ඩී 7 (D Dominant 7th)',
    frets: [-1, -1, 0, 2, 1, 2],
    fingers: [0, 0, 0, 2, 1, 3],
    notes: ['D4', 'A4', 'C5', 'F#5'],
  },
  'E7': {
    name: 'E7',
    sinhalaName: 'ඊ 7 (E Dominant 7th)',
    frets: [0, 2, 0, 1, 0, 0],
    fingers: [0, 2, 0, 1, 0, 0],
    notes: ['E3', 'B3', 'D4', 'G#4', 'B4', 'E5'],
  },
  'A7': {
    name: 'A7',
    sinhalaName: 'ඒ 7 (A Dominant 7th)',
    frets: [-1, 0, 2, 0, 2, 0],
    fingers: [0, 0, 2, 0, 3, 0],
    notes: ['A3', 'E4', 'G4', 'C#5', 'E5'],
  },
};

// Return chord data with fallback
export function getGuitarChord(chordName: string): ChordDiagramData {
  if (GUITAR_CHORD_LIBRARY[chordName]) {
    return GUITAR_CHORD_LIBRARY[chordName];
  }
  // Try normalized root
  const match = chordName.match(/^([A-G][#b]?)(.*)$/);
  if (match) {
    const root = normalizeNoteName(match[1]);
    const suffix = match[2];
    const candidate = `${root}${suffix}`;
    if (GUITAR_CHORD_LIBRARY[candidate]) {
      return GUITAR_CHORD_LIBRARY[candidate];
    }
    // If minor or 7th fallback
    if (suffix.includes('m') && GUITAR_CHORD_LIBRARY[`${root}m`]) {
      return GUITAR_CHORD_LIBRARY[`${root}m`];
    }
    if (GUITAR_CHORD_LIBRARY[root]) {
      return GUITAR_CHORD_LIBRARY[root];
    }
  }

  // Default C Major fallback
  return {
    name: chordName,
    sinhalaName: `${chordName} කෝඩ් එක`,
    frets: [-1, 3, 2, 0, 1, 0],
    fingers: [0, 3, 2, 0, 1, 0],
    notes: ['C4', 'E4', 'G4'],
  };
}

// Flute Bansuri Hole Chart for notes
export function getFluteHoles(swara: string): string {
  // Bansuri convention (6 holes):
  // Pa = ●●●○○○ (3 holes closed)
  // Dha = ●●○○○○ (2 holes closed)
  // Ni = ●○○○○○ (1 hole closed)
  // Sa = ●●●●●● (6 holes closed) or ○○○○○○ (all open higher)
  // Ri = ●●●●●○ (5 holes closed)
  // Ga = ●●●●○○ (4 holes closed)
  // Ma = ●●●●◐○ or ●●●○○○ with partial
  const mapping: Record<string, string> = {
    'ප': '●●●○○○',
    'කෝ.ධ': '●●◐○○○',
    'ධ': '●●○○○○',
    'කෝ.නි': '●◐○○○○',
    'නි': '●○○○○○',
    'ස': '●●●●●●',
    'කෝ.රි': '●●●●●◐',
    'රි': '●●●●●○',
    'කෝ.ග': '●●●●◐○',
    'ග': '●●●●○○',
    'ම': '●●●◐○○',
    'තී.ම': '●●●○○○',
  };
  return mapping[swara] || '●●●●●●';
}

// Violin fingering helper
export function getViolinFingering(westernPitch: string): { string: 'G' | 'D' | 'A' | 'E'; finger: number } {
  const match = westernPitch.match(/^([A-G][#b]?)([0-9])$/);
  if (!match) return { string: 'A', finger: 1 };
  const note = normalizeNoteName(match[1]);
  const octave = parseInt(match[2], 10);
  const midi = (octave + 1) * 12 + CHROMATIC_SCALE.indexOf(note);

  // G3 = 55, D4 = 62, A4 = 69, E5 = 76
  if (midi < 62) {
    // G string
    const diff = midi - 55;
    return { string: 'G', finger: Math.min(4, Math.max(0, Math.floor(diff / 2))) };
  } else if (midi < 69) {
    // D string
    const diff = midi - 62;
    return { string: 'D', finger: Math.min(4, Math.max(0, Math.floor(diff / 2))) };
  } else if (midi < 76) {
    // A string
    const diff = midi - 69;
    return { string: 'A', finger: Math.min(4, Math.max(0, Math.floor(diff / 2))) };
  } else {
    // E string
    const diff = midi - 76;
    return { string: 'E', finger: Math.min(4, Math.max(0, Math.floor(diff / 2))) };
  }
}

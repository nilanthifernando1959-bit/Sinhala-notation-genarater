export type InstrumentType = 'piano' | 'violin' | 'guitar' | 'flute' | 'vocal';

export type OctaveType = 'mandra' | 'madhya' | 'thara';

export interface BeatUnit {
  swara: string; // e.g. "ස", "රි", "ග", "ම", "ප", "ධ", "නි", "-", "0", "කෝ.රි", "තී.ම"
  octave: OctaveType; // 'mandra' (.ස), 'madhya' (ස), 'thara' (˙ස)
  westernNote: string; // e.g. "C4", "D4", "E4"
  lyric: string; // Sinhala syllable or word
  duration?: number; // duration in beats (default 1)
  fluteHoles?: string; // 6-hole fingerings, e.g. "●●●○○○"
  violinString?: 'G' | 'D' | 'A' | 'E';
  violinFinger?: number; // 0, 1, 2, 3, 4
  violinBow?: 'down' | 'up';
}

export interface Measure {
  id: string;
  chord: string; // e.g. "C", "G", "Am", "F"
  beats: BeatUnit[];
}

export interface SongSection {
  sectionName: string; // e.g. "Chorus / පල්ලවිය", "Verse / අන්තරාය"
  measures: Measure[];
}

export interface Song {
  id: string;
  title: string;
  titleSinhala: string;
  artist: string;
  originalKey: string;
  currentKey?: string;
  tempo: number;
  beat: string; // e.g. "4/4 (කහර්වා තාලය)", "6/8 (දද්රා තාලය)"
  ragaOrScale?: string;
  overview?: string;
  sections: SongSection[];
  sourceUrl?: string;
}

export interface ChordDiagramData {
  name: string;
  sinhalaName: string;
  frets: (number | -1)[]; // 6 strings from low E to high E, -1 = muted 'X', 0 = open 'O'
  fingers: (number | 0)[]; // 1=index, 2=middle, 3=ring, 4=pinky, 0=none
  barre?: number; // fret where barre is placed
  baseFret?: number; // starting fret (default 1)
  notes: string[]; // Western notes in the chord e.g. ['C', 'E', 'G']
}

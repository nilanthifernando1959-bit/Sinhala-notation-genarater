import { Song } from '../types/music';

export const PRESET_SONGS: Song[] = [
  {
    id: 'master-sir',
    title: 'Master Sir',
    titleSinhala: 'මාස්ටර් සර්',
    artist: 'Neville Fernando / Nimal Mendis',
    originalKey: 'C',
    tempo: 78,
    beat: '4/4 (කහර්වා තාලය)',
    ragaOrScale: 'බිලාවල් (C Major Scale)',
    overview: 'ශ්‍රී ලාංකේය සංගීතයේ සදාතනික සම්භාව්‍ය නිර්මාණයක් වන "මාස්ටර් සර්" ගීතය වයලීනය, පියානෝව, ගිටාරය සහ බටනලාව සඳහා අතිශය සුගම මනරම් ස්වර සංයෝජනයකින් සමන්විතය.',
    sections: [
      {
        sectionName: 'Chorus / පල්ලවිය',
        measures: [
          {
            id: 'm1',
            chord: 'C',
            beats: [
              { swara: 'ග', octave: 'madhya', westernNote: 'E4', lyric: 'මාස්-', duration: 1, fluteHoles: '●●●●○○', violinString: 'D', violinFinger: 1, violinBow: 'down' },
              { swara: 'ම', octave: 'madhya', westernNote: 'F4', lyric: 'ටර්', duration: 1, fluteHoles: '●●●◐○○', violinString: 'D', violinFinger: 2, violinBow: 'up' },
              { swara: 'ප', octave: 'madhya', westernNote: 'G4', lyric: 'සර්', duration: 1, fluteHoles: '●●●○○○', violinString: 'D', violinFinger: 3, violinBow: 'down' },
              { swara: '-', octave: 'madhya', westernNote: 'G4', lyric: '-', duration: 1, fluteHoles: '●●●○○○', violinString: 'D', violinFinger: 3, violinBow: 'up' },
            ],
          },
          {
            id: 'm2',
            chord: 'G',
            beats: [
              { swara: 'ප', octave: 'madhya', westernNote: 'G4', lyric: 'ම-', duration: 1, fluteHoles: '●●●○○○', violinString: 'D', violinFinger: 3, violinBow: 'down' },
              { swara: 'ධ', octave: 'madhya', westernNote: 'A4', lyric: 'ගේ', duration: 1, fluteHoles: '●●○○○○', violinString: 'A', violinFinger: 0, violinBow: 'up' },
              { swara: 'ප', octave: 'madhya', westernNote: 'G4', lyric: 'හි-', duration: 1, fluteHoles: '●●●○○○', violinString: 'D', violinFinger: 3, violinBow: 'down' },
              { swara: 'ම', octave: 'madhya', westernNote: 'F4', lyric: 'මි-', duration: 1, fluteHoles: '●●●◐○○', violinString: 'D', violinFinger: 2, violinBow: 'up' },
            ],
          },
          {
            id: 'm3',
            chord: 'C',
            beats: [
              { swara: 'ග', octave: 'madhya', westernNote: 'E4', lyric: 'දි-', duration: 1, fluteHoles: '●●●●○○', violinString: 'D', violinFinger: 1, violinBow: 'down' },
              { swara: 'රි', octave: 'madhya', westernNote: 'D4', lyric: 'රි', duration: 1, fluteHoles: '●●●●●○', violinString: 'D', violinFinger: 0, violinBow: 'up' },
              { swara: 'ස', octave: 'madhya', westernNote: 'C4', lyric: 'උ-', duration: 1, fluteHoles: '●●●●●●', violinString: 'G', violinFinger: 3, violinBow: 'down' },
              { swara: '-', octave: 'madhya', westernNote: 'C4', lyric: 'දෑ-', duration: 1, fluteHoles: '●●●●●●', violinString: 'G', violinFinger: 3, violinBow: 'up' },
            ],
          },
          {
            id: 'm4',
            chord: 'G7',
            beats: [
              { swara: 'රි', octave: 'madhya', westernNote: 'D4', lyric: 'ස-', duration: 1, fluteHoles: '●●●●●○', violinString: 'D', violinFinger: 0, violinBow: 'down' },
              { swara: '-', octave: 'madhya', westernNote: 'D4', lyric: 'න', duration: 1, fluteHoles: '●●●●●○', violinString: 'D', violinFinger: 0, violinBow: 'up' },
              { swara: 'ස', octave: 'madhya', westernNote: 'C4', lyric: '-', duration: 1, fluteHoles: '●●●●●●', violinString: 'G', violinFinger: 3, violinBow: 'down' },
              { swara: '-', octave: 'madhya', westernNote: 'C4', lyric: '-', duration: 1, fluteHoles: '●●●●●●', violinString: 'G', violinFinger: 3, violinBow: 'up' },
            ],
          },
        ],
      },
      {
        sectionName: 'Verse / අන්තරාය',
        measures: [
          {
            id: 'm5',
            chord: 'Am',
            beats: [
              { swara: 'ධ', octave: 'madhya', westernNote: 'A4', lyric: 'කඳු-', duration: 1, fluteHoles: '●●○○○○', violinString: 'A', violinFinger: 0, violinBow: 'down' },
              { swara: 'නි', octave: 'madhya', westernNote: 'B4', lyric: 'ළින්', duration: 1, fluteHoles: '●○○○○○', violinString: 'A', violinFinger: 1, violinBow: 'up' },
              { swara: '˙ස', octave: 'thara', westernNote: 'C5', lyric: 'පිරී', duration: 1, fluteHoles: '●●●●●●', violinString: 'A', violinFinger: 2, violinBow: 'down' },
              { swara: '-', octave: 'thara', westernNote: 'C5', lyric: '-', duration: 1, fluteHoles: '●●●●●●', violinString: 'A', violinFinger: 2, violinBow: 'up' },
            ],
          },
          {
            id: 'm6',
            chord: 'F',
            beats: [
              { swara: '˙ස', octave: 'thara', westernNote: 'C5', lyric: 'නෙ-', duration: 1, fluteHoles: '●●●●●●', violinString: 'A', violinFinger: 2, violinBow: 'down' },
              { swara: 'නි', octave: 'madhya', westernNote: 'B4', lyric: 'තින්', duration: 1, fluteHoles: '●○○○○○', violinString: 'A', violinFinger: 1, violinBow: 'up' },
              { swara: 'ධ', octave: 'madhya', westernNote: 'A4', lyric: 'හඬ-', duration: 1, fluteHoles: '●●○○○○', violinString: 'A', violinFinger: 0, violinBow: 'down' },
              { swara: 'ප', octave: 'madhya', westernNote: 'G4', lyric: 'නා', duration: 1, fluteHoles: '●●●○○○', violinString: 'D', violinFinger: 3, violinBow: 'up' },
            ],
          },
          {
            id: 'm7',
            chord: 'G',
            beats: [
              { swara: 'ප', octave: 'madhya', westernNote: 'G4', lyric: 'අ-', duration: 1, fluteHoles: '●●●○○○', violinString: 'D', violinFinger: 3, violinBow: 'down' },
              { swara: 'ම', octave: 'madhya', westernNote: 'F4', lyric: 'හිං-', duration: 1, fluteHoles: '●●●◐○○', violinString: 'D', violinFinger: 2, violinBow: 'up' },
              { swara: 'ග', octave: 'madhya', westernNote: 'E4', lyric: 'සක', duration: 1, fluteHoles: '●●●●○○', violinString: 'D', violinFinger: 1, violinBow: 'down' },
              { swara: 'රි', octave: 'madhya', westernNote: 'D4', lyric: 'මුහු-', duration: 1, fluteHoles: '●●●●●○', violinString: 'D', violinFinger: 0, violinBow: 'up' },
            ],
          },
          {
            id: 'm8',
            chord: 'C',
            beats: [
              { swara: 'ස', octave: 'madhya', westernNote: 'C4', lyric: 'ණා', duration: 1, fluteHoles: '●●●●●●', violinString: 'G', violinFinger: 3, violinBow: 'down' },
              { swara: '-', octave: 'madhya', westernNote: 'C4', lyric: '-', duration: 1, fluteHoles: '●●●●●●', violinString: 'G', violinFinger: 3, violinBow: 'up' },
              { swara: '-', octave: 'madhya', westernNote: 'C4', lyric: '-', duration: 1, fluteHoles: '●●●●●●', violinString: 'G', violinFinger: 3, violinBow: 'down' },
              { swara: '0', octave: 'madhya', westernNote: 'C4', lyric: '(විවේකය)', duration: 1, fluteHoles: '●●●●●●', violinString: 'G', violinFinger: 3, violinBow: 'up' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'ganga-addara',
    title: 'Ganga Addara',
    titleSinhala: 'ගඟ අද්දර මා',
    artist: 'Vijaya Kumaratunga / Clarence Wijewardena',
    originalKey: 'G',
    tempo: 92,
    beat: '4/4 (කහර්වා තාලය)',
    ragaOrScale: 'G Major (කල්‍යාණ)',
    overview: 'ක්ලැරන්ස් විජේවර්ධන ශූරීන්ගේ ගිටාර් රිද්ම රටා සහ බටනලා අත්වැල් ප්‍රමුඛ අමරණීය ගීතයකි.',
    sections: [
      {
        sectionName: 'Chorus / පල්ලවිය',
        measures: [
          {
            id: 'ga_m1',
            chord: 'G',
            beats: [
              { swara: 'ප', octave: 'madhya', westernNote: 'D4', lyric: 'ගඟ', duration: 1, fluteHoles: '●●●○○○', violinString: 'D', violinFinger: 0, violinBow: 'down' },
              { swara: 'ප', octave: 'madhya', westernNote: 'D4', lyric: 'අද්-', duration: 1, fluteHoles: '●●●○○○', violinString: 'D', violinFinger: 0, violinBow: 'up' },
              { swara: 'ධ', octave: 'madhya', westernNote: 'E4', lyric: 'දර', duration: 1, fluteHoles: '●●○○○○', violinString: 'D', violinFinger: 1, violinBow: 'down' },
              { swara: 'ප', octave: 'madhya', westernNote: 'D4', lyric: 'මා', duration: 1, fluteHoles: '●●●○○○', violinString: 'D', violinFinger: 0, violinBow: 'up' },
            ],
          },
          {
            id: 'ga_m2',
            chord: 'Em',
            beats: [
              { swara: 'ග', octave: 'madhya', westernNote: 'B3', lyric: 'සි-', duration: 1, fluteHoles: '●●●●○○', violinString: 'G', violinFinger: 2, violinBow: 'down' },
              { swara: 'රි', octave: 'madhya', westernNote: 'A3', lyric: 'හිල්', duration: 1, fluteHoles: '●●●●●○', violinString: 'G', violinFinger: 1, violinBow: 'up' },
              { swara: 'ස', octave: 'madhya', westernNote: 'G3', lyric: 'පව-', duration: 1, fluteHoles: '●●●●●●', violinString: 'G', violinFinger: 0, violinBow: 'down' },
              { swara: '-', octave: 'madhya', westernNote: 'G3', lyric: 'නේ', duration: 1, fluteHoles: '●●●●●●', violinString: 'G', violinFinger: 0, violinBow: 'up' },
            ],
          },
          {
            id: 'ga_m3',
            chord: 'C',
            beats: [
              { swara: 'ම', octave: 'madhya', westernNote: 'C4', lyric: 'සැ-', duration: 1, fluteHoles: '●●●◐○○', violinString: 'G', violinFinger: 3, violinBow: 'down' },
              { swara: 'ප', octave: 'madhya', westernNote: 'D4', lyric: 'ඟැ-', duration: 1, fluteHoles: '●●●○○○', violinString: 'D', violinFinger: 0, violinBow: 'up' },
              { swara: 'ධ', octave: 'madhya', westernNote: 'E4', lyric: 'වී', duration: 1, fluteHoles: '●●○○○○', violinString: 'D', violinFinger: 1, violinBow: 'down' },
              { swara: '-', octave: 'madhya', westernNote: 'E4', lyric: '-', duration: 1, fluteHoles: '●●○○○○', violinString: 'D', violinFinger: 1, violinBow: 'up' },
            ],
          },
          {
            id: 'ga_m4',
            chord: 'D',
            beats: [
              { swara: 'ප', octave: 'madhya', westernNote: 'D4', lyric: 'හිඳි-', duration: 1, fluteHoles: '●●●○○○', violinString: 'D', violinFinger: 0, violinBow: 'down' },
              { swara: 'ම', octave: 'madhya', westernNote: 'C4', lyric: 'නා', duration: 1, fluteHoles: '●●●◐○○', violinString: 'G', violinFinger: 3, violinBow: 'up' },
              { swara: 'ග', octave: 'madhya', westernNote: 'B3', lyric: 'මො-', duration: 1, fluteHoles: '●●●●○○', violinString: 'G', violinFinger: 2, violinBow: 'down' },
              { swara: 'රි', octave: 'madhya', westernNote: 'A3', lyric: 'හොතේ', duration: 1, fluteHoles: '●●●●●○', violinString: 'G', violinFinger: 1, violinBow: 'up' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'kaluwara-ahasa',
    title: 'Kaluwara Ahasa Pura',
    titleSinhala: 'කළුවර අහස පුරා',
    artist: 'Pandit W. D. Amaradeva',
    originalKey: 'Dm',
    tempo: 72,
    beat: '6/8 (දද්රා තාලය)',
    ragaOrScale: 'භෛරවී (D Minor Scale)',
    overview: 'පණ්ඩිත් අමරදේවයන්ගේ අසහාය වයලීන වාදනය හා ගැඹුරු හඬ මුසු වූ උසස් ශාස්ත්‍රීය සම්ප්‍රදායකින් යුතු අමරණීය නිර්මාණයකි.',
    sections: [
      {
        sectionName: 'Chorus / පල්ලවිය',
        measures: [
          {
            id: 'ka_m1',
            chord: 'Dm',
            beats: [
              { swara: 'ස', octave: 'madhya', westernNote: 'D4', lyric: 'කළු-', duration: 1, fluteHoles: '●●●●●●', violinString: 'D', violinFinger: 0, violinBow: 'down' },
              { swara: 'කෝ.ග', octave: 'madhya', westernNote: 'F4', lyric: 'වර', duration: 1, fluteHoles: '●●●●◐○', violinString: 'D', violinFinger: 2, violinBow: 'up' },
              { swara: 'ම', octave: 'madhya', westernNote: 'G4', lyric: 'අ-', duration: 1, fluteHoles: '●●●◐○○', violinString: 'D', violinFinger: 3, violinBow: 'down' },
              { swara: 'ප', octave: 'madhya', westernNote: 'A4', lyric: 'හස', duration: 1, fluteHoles: '●●●○○○', violinString: 'A', violinFinger: 0, violinBow: 'up' },
            ],
          },
          {
            id: 'ka_m2',
            chord: 'Gm',
            beats: [
              { swara: 'කෝ.ධ', octave: 'madhya', westernNote: 'Bb4', lyric: 'පු-', duration: 1, fluteHoles: '●●◐○○○', violinString: 'A', violinFinger: 1, violinBow: 'down' },
              { swara: 'ප', octave: 'madhya', westernNote: 'A4', lyric: 'රා', duration: 1, fluteHoles: '●●●○○○', violinString: 'A', violinFinger: 0, violinBow: 'up' },
              { swara: 'ම', octave: 'madhya', westernNote: 'G4', lyric: 'සඳක්', duration: 1, fluteHoles: '●●●◐○○', violinString: 'D', violinFinger: 3, violinBow: 'down' },
              { swara: 'කෝ.ග', octave: 'madhya', westernNote: 'F4', lyric: 'නැතී', duration: 1, fluteHoles: '●●●●◐○', violinString: 'D', violinFinger: 2, violinBow: 'up' },
            ],
          },
          {
            id: 'ka_m3',
            chord: 'A7',
            beats: [
              { swara: 'ම', octave: 'madhya', westernNote: 'G4', lyric: 'රැ-', duration: 1, fluteHoles: '●●●◐○○', violinString: 'D', violinFinger: 3, violinBow: 'down' },
              { swara: 'කෝ.ග', octave: 'madhya', westernNote: 'F4', lyric: 'යේ', duration: 1, fluteHoles: '●●●●◐○', violinString: 'D', violinFinger: 2, violinBow: 'up' },
              { swara: 'රි', octave: 'madhya', westernNote: 'E4', lyric: 'තනි-', duration: 1, fluteHoles: '●●●●●○', violinString: 'D', violinFinger: 1, violinBow: 'down' },
              { swara: 'කෝ.රි', octave: 'madhya', westernNote: 'Eb4', lyric: 'වී', duration: 1, fluteHoles: '●●●●●◐', violinString: 'D', violinFinger: 1, violinBow: 'up' },
            ],
          },
          {
            id: 'ka_m4',
            chord: 'Dm',
            beats: [
              { swara: 'ස', octave: 'madhya', westernNote: 'D4', lyric: 'මා', duration: 1, fluteHoles: '●●●●●●', violinString: 'D', violinFinger: 0, violinBow: 'down' },
              { swara: '-', octave: 'madhya', westernNote: 'D4', lyric: '-', duration: 1, fluteHoles: '●●●●●●', violinString: 'D', violinFinger: 0, violinBow: 'up' },
              { swara: '-', octave: 'madhya', westernNote: 'D4', lyric: '-', duration: 1, fluteHoles: '●●●●●●', violinString: 'D', violinFinger: 0, violinBow: 'down' },
              { swara: '0', octave: 'madhya', westernNote: 'D4', lyric: '(විවේකය)', duration: 1, fluteHoles: '●●●●●●', violinString: 'D', violinFinger: 0, violinBow: 'up' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'hanthana-sivane',
    title: 'Hanthana Sivane',
    titleSinhala: 'හන්තාන සිහිනේ',
    artist: 'Pandit W. D. Amaradeva & Umaria Sinhawansa',
    originalKey: 'Am',
    tempo: 80,
    beat: '4/4 (කහර්වා තාලය)',
    ragaOrScale: 'A Natural Minor (භෛරවී)',
    overview: 'නව පරපුරත් ප්‍රවීණ පරපුරත් එකට යා කළ ප්‍රේමණීය යුග ගීතයකි. පියානෝ හා වයලීන වාදනය සඳහා ඉතා සුදුසුය.',
    sections: [
      {
        sectionName: 'Chorus / පල්ලවිය',
        measures: [
          {
            id: 'hs_m1',
            chord: 'Am',
            beats: [
              { swara: 'ස', octave: 'madhya', westernNote: 'A4', lyric: 'හන්-', duration: 1, fluteHoles: '●●●●●●', violinString: 'A', violinFinger: 0, violinBow: 'down' },
              { swara: 'කෝ.ග', octave: 'madhya', westernNote: 'C5', lyric: 'තාන', duration: 1, fluteHoles: '●●●●◐○', violinString: 'A', violinFinger: 2, violinBow: 'up' },
              { swara: 'ම', octave: 'madhya', westernNote: 'D5', lyric: 'සිහි-', duration: 1, fluteHoles: '●●●◐○○', violinString: 'A', violinFinger: 3, violinBow: 'down' },
              { swara: 'ප', octave: 'madhya', westernNote: 'E5', lyric: 'නේ', duration: 1, fluteHoles: '●●●○○○', violinString: 'E', violinFinger: 0, violinBow: 'up' },
            ],
          },
          {
            id: 'hs_m2',
            chord: 'G',
            beats: [
              { swara: 'ප', octave: 'madhya', westernNote: 'E5', lyric: 'සැ-', duration: 1, fluteHoles: '●●●○○○', violinString: 'E', violinFinger: 0, violinBow: 'down' },
              { swara: 'ම', octave: 'madhya', westernNote: 'D5', lyric: 'ඟැ-', duration: 1, fluteHoles: '●●●◐○○', violinString: 'A', violinFinger: 3, violinBow: 'up' },
              { swara: 'කෝ.ග', octave: 'madhya', westernNote: 'C5', lyric: 'වී', duration: 1, fluteHoles: '●●●●◐○', violinString: 'A', violinFinger: 2, violinBow: 'down' },
              { swara: 'රි', octave: 'madhya', westernNote: 'B4', lyric: 'ගියත්', duration: 1, fluteHoles: '●●●●●○', violinString: 'A', violinFinger: 1, violinBow: 'up' },
            ],
          },
          {
            id: 'hs_m3',
            chord: 'F',
            beats: [
              { swara: 'ස', octave: 'madhya', westernNote: 'A4', lyric: 'ඔ-', duration: 1, fluteHoles: '●●●●●●', violinString: 'A', violinFinger: 0, violinBow: 'down' },
              { swara: 'නි.', octave: 'mandra', westernNote: 'G4', lyric: 'බේ', duration: 1, fluteHoles: '●○○○○○', violinString: 'D', violinFinger: 3, violinBow: 'up' },
              { swara: 'ස', octave: 'madhya', westernNote: 'A4', lyric: 'රුව', duration: 1, fluteHoles: '●●●●●●', violinString: 'A', violinFinger: 0, violinBow: 'down' },
              { swara: 'කෝ.ග', octave: 'madhya', westernNote: 'C5', lyric: 'මගේ', duration: 1, fluteHoles: '●●●●◐○', violinString: 'A', violinFinger: 2, violinBow: 'up' },
            ],
          },
          {
            id: 'hs_m4',
            chord: 'E7',
            beats: [
              { swara: 'රි', octave: 'madhya', westernNote: 'B4', lyric: 'නෙතේ', duration: 1, fluteHoles: '●●●●●○', violinString: 'A', violinFinger: 1, violinBow: 'down' },
              { swara: '-', octave: 'madhya', westernNote: 'B4', lyric: '-', duration: 1, fluteHoles: '●●●●●○', violinString: 'A', violinFinger: 1, violinBow: 'up' },
              { swara: 'ස', octave: 'madhya', westernNote: 'A4', lyric: 'ඇඳේ', duration: 1, fluteHoles: '●●●●●●', violinString: 'A', violinFinger: 0, violinBow: 'down' },
              { swara: '-', octave: 'madhya', westernNote: 'A4', lyric: '-', duration: 1, fluteHoles: '●●●●●●', violinString: 'A', violinFinger: 0, violinBow: 'up' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'fur-elise',
    title: 'Für Elise',
    titleSinhala: 'ෆර් එලීස් (බීතෝවන්)',
    artist: 'Ludwig van Beethoven',
    originalKey: 'Am',
    tempo: 120,
    beat: '3/4 (රූපාක් තාලය)',
    ragaOrScale: 'A Minor / පියානෝ හා වයලීන ස්වර',
    overview: 'ලෝක ප්‍රකට සම්භාව්‍ය කෘතියක් සිංහල ස්වර ලිපියෙන් (ස රි ග ම ප ධ නි) සහ ඇඟිලි පිහිටීම් සහිතව.',
    sections: [
      {
        sectionName: 'Theme / ප්‍රධාන ස්වර රටාව',
        measures: [
          {
            id: 'fe_m1',
            chord: 'Am',
            beats: [
              { swara: 'ප', octave: 'madhya', westernNote: 'E5', lyric: 'ටා', duration: 0.5, fluteHoles: '●●●○○○', violinString: 'E', violinFinger: 0, violinBow: 'down' },
              { swara: 'තී.ම', octave: 'madhya', westernNote: 'D#5', lyric: 'රි', duration: 0.5, fluteHoles: '●●●○○○', violinString: 'A', violinFinger: 4, violinBow: 'up' },
              { swara: 'ප', octave: 'madhya', westernNote: 'E5', lyric: 'ටා', duration: 0.5, fluteHoles: '●●●○○○', violinString: 'E', violinFinger: 0, violinBow: 'down' },
              { swara: 'තී.ම', octave: 'madhya', westernNote: 'D#5', lyric: 'රි', duration: 0.5, fluteHoles: '●●●○○○', violinString: 'A', violinFinger: 4, violinBow: 'up' },
            ],
          },
          {
            id: 'fe_m2',
            chord: 'Am',
            beats: [
              { swara: 'ප', octave: 'madhya', westernNote: 'E5', lyric: 'ටා', duration: 0.5, fluteHoles: '●●●○○○', violinString: 'E', violinFinger: 0, violinBow: 'down' },
              { swara: 'රි', octave: 'madhya', westernNote: 'B4', lyric: 'තී', duration: 0.5, fluteHoles: '●●●●●○', violinString: 'A', violinFinger: 1, violinBow: 'up' },
              { swara: 'ම', octave: 'madhya', westernNote: 'D5', lyric: 'නා', duration: 0.5, fluteHoles: '●●●◐○○', violinString: 'A', violinFinger: 3, violinBow: 'down' },
              { swara: 'කෝ.ග', octave: 'madhya', westernNote: 'C5', lyric: 'කී', duration: 0.5, fluteHoles: '●●●●◐○', violinString: 'A', violinFinger: 2, violinBow: 'up' },
            ],
          },
          {
            id: 'fe_m3',
            chord: 'Am',
            beats: [
              { swara: 'ස', octave: 'madhya', westernNote: 'A4', lyric: 'දෝ', duration: 1, fluteHoles: '●●●●●●', violinString: 'A', violinFinger: 0, violinBow: 'down' },
              { swara: '-', octave: 'madhya', westernNote: 'A4', lyric: '-', duration: 1, fluteHoles: '●●●●●●', violinString: 'A', violinFinger: 0, violinBow: 'up' },
              { swara: 'කෝ.ග.', octave: 'mandra', westernNote: 'C4', lyric: 'පා', duration: 0.5, fluteHoles: '●●●●◐○', violinString: 'G', violinFinger: 3, violinBow: 'down' },
              { swara: 'ප.', octave: 'mandra', westernNote: 'E4', lyric: 'රේ', duration: 0.5, fluteHoles: '●●●○○○', violinString: 'D', violinFinger: 1, violinBow: 'up' },
            ],
          },
        ],
      },
    ],
  },
];

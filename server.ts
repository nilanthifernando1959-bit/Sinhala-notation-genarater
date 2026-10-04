import express from 'express';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Initialize Google GenAI
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// API endpoint to generate Sinhala Swara notations and chords for any song URL or title
app.post('/api/generate-notation', async (req, res) => {
  try {
    const { songUrl, songTitle, instrument, targetKey } = req.body;

    if (!songUrl && !songTitle) {
      return res.status(400).json({ error: 'Song URL or title is required' });
    }

    if (!ai) {
      return res.status(503).json({
        error: 'Gemini API key is not configured on the server. Using pre-loaded catalog.',
        fallbackAvailable: true,
      });
    }

    const query = songUrl ? `Song URL/Reference: "${songUrl}". Query: "${songTitle || songUrl}"` : `Song Title: "${songTitle}"`;

    const prompt = `You are a master Sri Lankan musicologist and notation specialist.
Given the following song: ${query}
Preferred instrument: ${instrument || 'all'}
Key: ${targetKey || 'Original Key'}

Generate full Sinhala Swara Notation (ස්වර ලිපිය / Sarali Swara Lipiya) using standard Sri Lankan / North Indian swara syllables:
- Primary swaras: ස, රි, ග, ම, ප, ධ, නි (Sa, Ri, Ga, Ma, Pa, Dha, Ni)
- Altered swaras (if applicable): කෝ.රි (flat 2nd), කෝ.ග (flat 3rd), තී.ම (sharp 4th), කෝ.ධ (flat 6th), කෝ.නි (flat 7th)
- Octave markings: 'mandra' (lower octave, .ස), 'madhya' (middle octave, ස), 'thara' (higher octave, ˙ස)
- Duration prolongations indicated by "-"
- Chords above each measure (e.g. C, G, Am, F, Dm, Em, etc.)
- Sinhala lyrics mapped directly syllable-by-syllable under each swara note.
- Fingerings for instrument:
  - Violin: string ('G', 'D', 'A', 'E'), finger (0 to 4), bow ('down' or 'up')
  - Flute: 6 holes string representation e.g. "●●●○○○"
  - Guitar: chord and fretboard positions
  - Piano: western note e.g. "C4", "D4"

Provide an accurate, musical transcription for both the chorus (පල්ලවිය) and verse (අන්තරාය).`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: `You are an expert Sri Lankan music theorist and transcriber. You return pure JSON conforming to the requested schema. Never output sheet music or musical staves; always output Sinhala swara notation (ස රි ග ම ප ධ නි) with chords, lyrics, and non-sheet-music instrument fingering data.`,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            titleSinhala: { type: Type.STRING },
            artist: { type: Type.STRING },
            originalKey: { type: Type.STRING },
            tempo: { type: Type.INTEGER },
            beat: { type: Type.STRING },
            ragaOrScale: { type: Type.STRING },
            overview: { type: Type.STRING },
            sections: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  sectionName: { type: Type.STRING },
                  measures: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        id: { type: Type.STRING },
                        chord: { type: Type.STRING },
                        beats: {
                          type: Type.ARRAY,
                          items: {
                            type: Type.OBJECT,
                            properties: {
                              swara: { type: Type.STRING },
                              octave: { type: Type.STRING },
                              westernNote: { type: Type.STRING },
                              lyric: { type: Type.STRING },
                              duration: { type: Type.NUMBER },
                              fluteHoles: { type: Type.STRING },
                              violinString: { type: Type.STRING },
                              violinFinger: { type: Type.INTEGER },
                              violinBow: { type: Type.STRING },
                            },
                            required: ['swara', 'octave', 'westernNote', 'lyric'],
                          },
                        },
                      },
                      required: ['id', 'chord', 'beats'],
                    },
                  },
                },
                required: ['sectionName', 'measures'],
              },
            },
          },
          required: ['title', 'titleSinhala', 'artist', 'originalKey', 'tempo', 'beat', 'sections'],
        },
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error('No response generated from model');
    }

    const parsedData = JSON.parse(text);
    return res.json(parsedData);
  } catch (error: any) {
    console.error('Error generating notation:', error);
    return res.status(500).json({
      error: error.message || 'Failed to generate song notation',
    });
  }
});

// Setup Vite in development or static serving in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

startServer();

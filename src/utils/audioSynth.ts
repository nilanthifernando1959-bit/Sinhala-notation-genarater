import { InstrumentType } from '../types/music';
import { noteToFrequency, GUITAR_CHORD_LIBRARY, getGuitarChord } from './musicTheory';

class AudioSynthesizer {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private masterGain: GainNode | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.7, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setVolume(volume: number) {
    if (!this.masterGain || !this.ctx) return;
    this.masterGain.gain.setValueAtTime(Math.max(0, Math.min(1, volume)), this.ctx.currentTime);
  }

  public setMute(muted: boolean) {
    this.isMuted = muted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(muted ? 0 : 0.7, this.ctx.currentTime);
    }
  }

  // Play a single note based on instrument
  public playNote(noteWithOctave: string, instrument: InstrumentType = 'piano', duration: number = 0.6) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const freq = noteToFrequency(noteWithOctave);
    const now = this.ctx.currentTime;

    switch (instrument) {
      case 'piano':
        this.playPianoNote(freq, now, duration);
        break;
      case 'violin':
        this.playViolinNote(freq, now, duration);
        break;
      case 'flute':
        this.playFluteNote(freq, now, duration);
        break;
      case 'guitar':
        this.playGuitarNote(freq, now, duration);
        break;
      default:
        this.playPianoNote(freq, now, duration);
        break;
    }
  }

  // Piano Synthesis (Harmonic bell-like decay)
  private playPianoNote(freq: number, startTime: number, duration: number) {
    if (!this.ctx || !this.masterGain) return;

    const fundamental = this.ctx.createOscillator();
    const overtone = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();

    fundamental.type = 'triangle';
    fundamental.frequency.setValueAtTime(freq, startTime);

    overtone.type = 'sine';
    overtone.frequency.setValueAtTime(freq * 2, startTime);

    noteGain.gain.setValueAtTime(0.001, startTime);
    noteGain.gain.linearRampToValueAtTime(0.5, startTime + 0.015);
    noteGain.gain.exponentialRampToValueAtTime(0.001, startTime + Math.max(duration, 0.5));

    fundamental.connect(noteGain);
    overtone.connect(noteGain);
    noteGain.connect(this.masterGain);

    fundamental.start(startTime);
    overtone.start(startTime);

    fundamental.stop(startTime + duration + 0.1);
    overtone.stop(startTime + duration + 0.1);
  }

  // Violin Synthesis (Rich bowed timbre with gentle vibrato)
  private playViolinNote(freq: number, startTime: number, duration: number) {
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    const vibrato = this.ctx.createOscillator();
    const vibratoGain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();
    const noteGain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, startTime);

    // Vibrato: 5.5 Hz frequency modulation
    vibrato.frequency.setValueAtTime(5.5, startTime);
    vibratoGain.gain.setValueAtTime(freq * 0.015, startTime);
    vibrato.connect(osc.frequency);

    // Resonant violin body filter
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(freq * 1.5, startTime);
    filter.Q.setValueAtTime(2.5, startTime);

    // Bowing envelope: gentle swell and sustain
    noteGain.gain.setValueAtTime(0.001, startTime);
    noteGain.gain.linearRampToValueAtTime(0.4, startTime + 0.08);
    noteGain.gain.setValueAtTime(0.38, startTime + duration * 0.7);
    noteGain.gain.exponentialRampToValueAtTime(0.001, startTime + duration + 0.1);

    osc.connect(filter);
    filter.connect(noteGain);
    noteGain.connect(this.masterGain);

    vibrato.start(startTime);
    osc.start(startTime);

    vibrato.stop(startTime + duration + 0.15);
    osc.stop(startTime + duration + 0.15);
  }

  // Flute / Bansuri Synthesis (Warm airy sine with subtle breath noise)
  private playFluteNote(freq: number, startTime: number, duration: number) {
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const vibrato = this.ctx.createOscillator();
    const vibratoGain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();
    const noteGain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, startTime);

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2, startTime);

    vibrato.frequency.setValueAtTime(5.0, startTime);
    vibratoGain.gain.setValueAtTime(freq * 0.01, startTime);
    vibrato.connect(osc.frequency);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(freq * 3, startTime);

    // Air breath attack
    noteGain.gain.setValueAtTime(0.001, startTime);
    noteGain.gain.linearRampToValueAtTime(0.45, startTime + 0.06);
    noteGain.gain.setValueAtTime(0.4, startTime + duration * 0.8);
    noteGain.gain.exponentialRampToValueAtTime(0.001, startTime + duration + 0.1);

    osc.connect(filter);
    osc2.connect(filter);
    filter.connect(noteGain);
    noteGain.connect(this.masterGain);

    vibrato.start(startTime);
    osc.start(startTime);
    osc2.start(startTime);

    vibrato.stop(startTime + duration + 0.15);
    osc.stop(startTime + duration + 0.15);
    osc2.stop(startTime + duration + 0.15);
  }

  // Guitar Pluck (Plucked string resonance)
  private playGuitarNote(freq: number, startTime: number, duration: number) {
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, startTime);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(freq * 4, startTime);
    filter.frequency.exponentialRampToValueAtTime(freq * 1.2, startTime + 0.3);

    noteGain.gain.setValueAtTime(0.001, startTime);
    noteGain.gain.linearRampToValueAtTime(0.55, startTime + 0.008);
    noteGain.gain.exponentialRampToValueAtTime(0.001, startTime + Math.max(duration * 1.2, 0.8));

    osc.connect(filter);
    filter.connect(noteGain);
    noteGain.connect(this.masterGain);

    osc.start(startTime);
    osc.stop(startTime + duration + 0.4);
  }

  // Metronome Click Track (Crisp, percussive woodblock / rimshot click)
  public playMetronomeClick(isDownbeat: boolean = false) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const clickGain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    // High accent for downbeat (beat 1), distinct lower click for other beats
    const freq = isDownbeat ? 1650 : 1050;
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now);
    // Rapid pitch drop for punchy rimshot/woodblock transient
    osc.frequency.exponentialRampToValueAtTime(freq * 0.4, now + 0.025);

    // Crisp bandpass filter
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(freq, now);
    filter.Q.setValueAtTime(4.0, now);

    // Snappy envelope (instant attack, fast 25-30ms exponential decay)
    const peakVolume = isDownbeat ? 0.75 : 0.45;
    clickGain.gain.setValueAtTime(peakVolume, now);
    clickGain.gain.exponentialRampToValueAtTime(0.0001, now + (isDownbeat ? 0.035 : 0.022));

    osc.connect(filter);
    filter.connect(clickGain);
    clickGain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.04);
  }

  // Play a full chord with realistic strumming stagger
  public playChord(chordName: string, instrument: InstrumentType = 'guitar') {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const chord = getGuitarChord(chordName);
    const notes = chord.notes && chord.notes.length > 0 ? chord.notes : ['C4', 'E4', 'G4'];

    const now = this.ctx.currentTime;
    notes.forEach((note, index) => {
      const delay = index * 0.035; // 35ms stagger for natural strumming
      setTimeout(() => {
        this.playNote(note, instrument, 1.2);
      }, delay * 1000);
    });
  }
}

export const audioSynth = new AudioSynthesizer();

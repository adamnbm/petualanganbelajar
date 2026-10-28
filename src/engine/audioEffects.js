/**
 * Audio Synthesizer via Web Audio API
 * Menghasilkan efek suara ceria, ramah anak, dan responsif tanpa membutuhkan file audio eksternal.
 */

class SoundManager {
  constructor() {
    this.ctx = null;
    this.muted = false;
    // Ambil preferensi mute dari localStorage jika ada
    try {
      const saved = localStorage.getItem("timi_sound_muted");
      if (saved !== null) {
        this.muted = JSON.parse(saved);
      }
    } catch {
      this.muted = false;
    }

    this.currentApplause = null;
    this.applauseFadeTimer = null;

    // Preload audio applause jika di lingkungan browser
    if (typeof window !== "undefined") {
      this.preloadApplause();
    }
  }

  preloadApplause() {
    try {
      this.preloadedAudio = new Audio("/applause.mp3");
      this.preloadedAudio.preload = "auto";
    } catch {
      // ignore
    }
  }

  initContext() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  isMuted() {
    return this.muted;
  }

  toggleMute() {
    this.muted = !this.muted;
    if (this.muted && this.currentApplause) {
      try {
        this.currentApplause.pause();
      } catch {
        // ignore
      }
    }
    try {
      localStorage.setItem("timi_sound_muted", JSON.stringify(this.muted));
    } catch {
      // ignore
    }
    return this.muted;
  }

  playClick() {
    if (this.muted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(400, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(600, this.ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch {
      // Audio context might be restricted before interaction
    }
  }

  /**
   * Memutar efek suara tepuk tangan (applause) saat siswa menjawab benar.
   * Menggunakan audio file public/applause.mp3 dengan fallback ke Web Audio synthesizer.
   */
  playCorrect() {
    this.playApplause();
  }

  playApplause() {
    if (this.muted) return;

    // Bersihkan fade timer sebelumnya jika ada
    if (this.applauseFadeTimer) {
      clearTimeout(this.applauseFadeTimer);
      this.applauseFadeTimer = null;
    }

    // Hentikan tepuk tangan sebelumnya jika masih berbunyi
    if (this.currentApplause) {
      try {
        this.currentApplause.pause();
        this.currentApplause.currentTime = 0;
      } catch {
        // ignore
      }
    }

    try {
      const audio = new Audio("/applause.mp3");
      audio.volume = 0.75;
      this.currentApplause = audio;

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Berikan durasi tepuk tangan yang pas (~3.2 detik) lalu fade out halus
            this.applauseFadeTimer = setTimeout(() => {
              if (this.currentApplause === audio) {
                this._fadeOutAudio(audio, 600);
              }
            }, 3200);
          })
          .catch((err) => {
            console.warn("Audio file play hindered, fallback to synthesizer:", err);
            this.playSynthesizedApplause();
          });
      }
    } catch {
      this.playSynthesizedApplause();
    }
  }

  _fadeOutAudio(audio, durationMs = 500) {
    if (!audio) return;
    const startVolume = audio.volume;
    const steps = 10;
    const stepInterval = durationMs / steps;
    let step = 0;

    const interval = setInterval(() => {
      step++;
      const currentVol = Math.max(0, startVolume * (1 - step / steps));
      audio.volume = currentVol;
      if (step >= steps || audio.paused) {
        clearInterval(interval);
        try {
          audio.pause();
          audio.currentTime = 0;
        } catch {
          // ignore
        }
      }
    }, stepInterval);
  }

  /**
   * Fallback: Sintesis tepuk tangan riuh menggunakan Web Audio API jika file audio dibatasi
   */
  playSynthesizedApplause() {
    if (this.muted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const bufferSize = Math.floor(this.ctx.sampleRate * 1.5);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      // Hasilkan tepukan-tepukan tangan bertubi-tubi
      for (let i = 0; i < 16; i++) {
        const clapTime = now + (i * 0.08) + (Math.random() * 0.04);
        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = this.ctx.createBiquadFilter();
        filter.type = "bandpass";
        filter.frequency.setValueAtTime(900 + Math.random() * 500, clapTime);
        filter.Q.setValueAtTime(2.2, clapTime);

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.16 + Math.random() * 0.08, clapTime);
        gain.gain.exponentialRampToValueAtTime(0.001, clapTime + 0.05);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        noise.start(clapTime);
        noise.stop(clapTime + 0.06);
      }
    } catch {
      // ignore
    }
  }

  playHint() {
    if (this.muted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      // Nada lembut untuk berpikir (E4 -> A4)
      const notes = [329.63, 440.0];
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + idx * 0.1);

        gain.gain.setValueAtTime(0.12, now + idx * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.25);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.1);
        osc.stop(now + idx * 0.1 + 0.25);
      });
    } catch {
      // ignore
    }
  }

  playFanfare() {
    if (this.muted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      // Nada kemenangan arpeggio gembira: C5, E5, G5, C6
      const fanfare = [523.25, 659.25, 783.99, 1046.5];
      fanfare.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now + idx * 0.13);

        const duration = idx === 3 ? 0.6 : 0.25;
        gain.gain.setValueAtTime(0.22, now + idx * 0.13);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.13 + duration);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.13);
        osc.stop(now + idx * 0.13 + duration);
      });
    } catch {
      // ignore
    }
  }
}

export const soundManager = new SoundManager();

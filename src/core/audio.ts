let audioCtx: AudioContext | null = null;
let isAudioEnabled = false;
let humOsc: OscillatorNode | null = null;
let humGain: GainNode | null = null;

export function initAudio(): {
  toggleAudio: () => boolean;
  playTick: () => void;
  updateScrollHum: (velocity: number) => void;
  isEnabled: () => boolean;
} {
  // Check persisted preference
  const saved = localStorage.getItem('signal_audio_enabled');
  if (saved === 'true') {
    // Wait for user gesture before instantiating AudioContext
    window.addEventListener('click', handleFirstGesture, { once: true });
    window.addEventListener('keydown', handleFirstGesture, { once: true });
  }

  function handleFirstGesture() {
    if (!audioCtx) {
      enableAudio();
    }
  }

  function enableAudio() {
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtx = new AudioContextClass();
      
      // Continuous subtle ambient hum
      humOsc = audioCtx.createOscillator();
      humGain = audioCtx.createGain();
      humOsc.type = 'sine';
      humOsc.frequency.setValueAtTime(55, audioCtx.currentTime); // 55Hz low A hum
      humGain.gain.setValueAtTime(0.015, audioCtx.currentTime);
      
      humOsc.connect(humGain);
      humGain.connect(audioCtx.destination);
      humOsc.start();

      isAudioEnabled = true;
      localStorage.setItem('signal_audio_enabled', 'true');
      updateNavAudioButton(true);
    } catch {
      console.warn('Web Audio not supported or blocked');
    }
  }

  function disableAudio() {
    if (audioCtx) {
      if (humOsc) {
        humOsc.stop();
        humOsc.disconnect();
        humOsc = null;
      }
      audioCtx.close();
      audioCtx = null;
    }
    isAudioEnabled = false;
    localStorage.setItem('signal_audio_enabled', 'false');
    updateNavAudioButton(false);
  }

  function toggleAudio(): boolean {
    if (isAudioEnabled) {
      disableAudio();
    } else {
      enableAudio();
    }
    return isAudioEnabled;
  }

  function playTick(): void {
    if (!isAudioEnabled || !audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(800, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(200, audioCtx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.03, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.04);
    } catch {
      // Audio fallback
    }
  }

  function updateScrollHum(velocity: number): void {
    if (!isAudioEnabled || !humOsc || !audioCtx) return;
    const absVel = Math.min(Math.abs(velocity), 100);
    const targetFreq = 55 + absVel * 1.5;
    humOsc.frequency.setTargetAtTime(targetFreq, audioCtx.currentTime, 0.05);
  }

  function updateNavAudioButton(active: boolean) {
    const btn = document.querySelector('.audio-toggle-btn');
    if (btn) {
      if (active) {
        btn.classList.add('sound-on');
        btn.setAttribute('aria-label', 'Sound is ON (Press S to mute)');
        btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>`;
      } else {
        btn.classList.remove('sound-on');
        btn.setAttribute('aria-label', 'Sound is OFF (Press S to unmute)');
        btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5L6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>`;
      }
    }
  }

  // Keyboard shortcut: Press 'S' to toggle sound
  window.addEventListener('keydown', (e) => {
    if (e.key === 's' || e.key === 'S') {
      const activeElement = document.activeElement;
      if (activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA')) {
        return;
      }
      toggleAudio();
    }
  });

  return {
    toggleAudio,
    playTick,
    updateScrollHum,
    isEnabled: () => isAudioEnabled
  };
}

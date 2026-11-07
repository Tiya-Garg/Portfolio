import { checkReducedMotion } from '../core/reducedMotion';

export function initHeroWaveform(canvasId: string): void {
  const canvas = document.getElementById(canvasId) as HTMLCanvasElement | null;
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const isReduced = checkReducedMotion();

  function resize() {
    if (!canvas) return;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  let mouseX = 0.5;
  let mouseY = 0.5;
  let phase1 = 0;
  let phase2 = 0;
  let phase3 = 0;
  let scrollGlitch = 0;
  let isVisible = true;

  // IntersectionObserver to pause loop when offscreen
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      isVisible = e.isIntersecting;
    });
  });
  observer.observe(canvas);

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX / window.innerWidth;
    mouseY = e.clientY / window.innerHeight;
  });

  let lastScrollY = window.scrollY;
  window.addEventListener('scroll', () => {
    const dy = Math.abs(window.scrollY - lastScrollY);
    lastScrollY = window.scrollY;
    scrollGlitch = Math.min(25, dy * 0.4);
  });

  function draw() {
    if (!ctx || !canvas || !isVisible) {
      if (!isReduced) requestAnimationFrame(draw);
      return;
    }

    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    // Dynamic frequency and amplitude from cursor
    const baseFreq = 0.008 + mouseX * 0.018;
    const baseAmp = 30 + (1 - mouseY) * 55;

    // Decay scroll glitch
    scrollGlitch *= 0.92;

    const layers = [
      { color: 'rgba(42, 60, 255, 0.45)', lineWidth: 2.5, phase: phase1, freqMod: 1.0, ampMod: 1.0 },
      { color: 'rgba(255, 91, 58, 0.40)', lineWidth: 2.0, phase: phase2, freqMod: 1.35, ampMod: 0.8 },
      { color: 'rgba(14, 14, 16, 0.18)', lineWidth: 1.5, phase: phase3, freqMod: 0.7, ampMod: 1.2 },
    ];

    layers.forEach((layer) => {
      ctx.beginPath();
      for (let x = 0; x <= w; x += 3) {
        const glitch = (Math.random() - 0.5) * scrollGlitch;
        const y = h / 2 + Math.sin(x * (baseFreq * layer.freqMod) + layer.phase) * (baseAmp * layer.ampMod) + glitch;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = layer.color;
      ctx.lineWidth = layer.lineWidth;
      ctx.stroke();
    });

    phase1 += 0.035;
    phase2 += 0.025;
    phase3 += 0.015;

    if (!isReduced) {
      requestAnimationFrame(draw);
    }
  }

  draw();
}

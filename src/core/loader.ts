import gsap from 'gsap';
import { checkReducedMotion } from './reducedMotion';

export function runLoader(onComplete: () => void): void {
  const isReduced = checkReducedMotion();
  const hasLoadedBefore = sessionStorage.getItem('signal_visited');

  const overlay = document.querySelector('.loader-overlay') as HTMLElement;
  const canvas = document.querySelector('.loader-canvas') as HTMLCanvasElement;
  const counterEl = document.querySelector('.loader-counter') as HTMLElement;
  const statusEl = document.querySelector('.loader-status') as HTMLElement;

  if (!overlay) {
    onComplete();
    return;
  }

  // Fast bypass for repeat sessions or reduced motion
  if (hasLoadedBefore || isReduced) {
    overlay.style.display = 'none';
    onComplete();
    return;
  }

  const ctx = canvas.getContext('2d');
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  let progress = { value: 0 };
  let noiseAmt = 1.0;
  let phase = 0;
  let animId = 0;

  function renderWave() {
    if (!ctx) return;
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    ctx.beginPath();
    for (let x = 0; x < w; x += 2) {
      // Noise component blends out as progress approaches 100
      const noise = (Math.random() - 0.5) * 35 * noiseAmt;
      // Clean sine emerges
      const sine = Math.sin((x * 0.03) + phase) * (25 * (1 - noiseAmt * 0.6));
      const y = h / 2 + sine + noise;

      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }

    ctx.strokeStyle = '#2A3CFF';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    phase += 0.15;
    animId = requestAnimationFrame(renderWave);
  }
  animId = requestAnimationFrame(renderWave);

  const tl = gsap.timeline({
    onComplete: () => {
      cancelAnimationFrame(animId);
      sessionStorage.setItem('signal_visited', 'true');
      gsap.to(overlay, {
        opacity: 0,
        duration: 0.6,
        ease: 'power3.inOut',
        onComplete: () => {
          overlay.style.display = 'none';
          onComplete();
        }
      });
    }
  });

  tl.to(progress, {
    value: 100,
    duration: 1.8,
    ease: 'power2.inOut',
    onUpdate: () => {
      const p = Math.floor(progress.value);
      if (counterEl) counterEl.textContent = `${p}%`;
      noiseAmt = Math.max(0, 1 - progress.value / 85);

      if (statusEl) {
        if (p < 30) statusEl.textContent = 'TUNING FREQUENCY...';
        else if (p < 75) statusEl.textContent = 'ACQUIRING CARRIER...';
        else if (p < 99) statusEl.textContent = 'LOCKING PHASE...';
        else statusEl.textContent = 'SIGNAL LOCKED.';
      }
    }
  });
}

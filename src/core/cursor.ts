import gsap from 'gsap';
import { checkReducedMotion } from './reducedMotion';

export function initCursor(): void {
  // Disable custom cursor on touch/coarse devices or if reduced motion is enabled
  const isTouch = window.matchMedia('(pointer: coarse)').matches;
  const isReduced = checkReducedMotion();

  if (isTouch || isReduced) {
    return;
  }

  // Create cursor elements
  const dot = document.createElement('div');
  dot.className = 'custom-cursor-dot';

  const ring = document.createElement('div');
  ring.className = 'custom-cursor-ring';

  const trailCanvas = document.createElement('canvas');
  trailCanvas.className = 'cursor-trail-canvas';
  trailCanvas.setAttribute('aria-hidden', 'true');

  document.body.appendChild(dot);
  document.body.appendChild(ring);
  document.body.appendChild(trailCanvas);

  const ctx = trailCanvas.getContext('2d');
  let width = (trailCanvas.width = window.innerWidth);
  let height = (trailCanvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = trailCanvas.width = window.innerWidth;
    height = trailCanvas.height = window.innerHeight;
  });

  // GSAP quickTo setters for 60fps tracking
  const dotX = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'power3' });
  const dotY = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'power3' });
  const ringX = gsap.quickTo(ring, 'x', { duration: 0.22, ease: 'power2.out' });
  const ringY = gsap.quickTo(ring, 'y', { duration: 0.22, ease: 'power2.out' });

  let mouseX = -100;
  let mouseY = -100;
  let lastX = -100;
  let lastY = -100;
  let speed = 0;

  // Trail history points
  interface TrailPoint {
    x: number;
    y: number;
    age: number;
    speed: number;
  }
  const trail: TrailPoint[] = [];

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    const dx = mouseX - lastX;
    const dy = mouseY - lastY;
    speed = Math.sqrt(dx * dx + dy * dy);

    lastX = mouseX;
    lastY = mouseY;

    dotX(mouseX);
    dotY(mouseY);
    ringX(mouseX);
    ringY(mouseY);

    if (speed > 8) {
      trail.push({ x: mouseX, y: mouseY, age: 0, speed });
    }
  });

  // Render cursor waveform trail
  function renderTrail() {
    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);

    if (trail.length > 1) {
      ctx.beginPath();
      for (let i = 0; i < trail.length; i++) {
        const pt = trail[i];
        pt.age += 1;

        // Wave oscillation offset perpendicular to path
        const waveOffset = Math.sin(pt.age * 0.4) * Math.min(pt.speed * 0.2, 10);

        if (i === 0) {
          ctx.moveTo(pt.x, pt.y + waveOffset);
        } else {
          ctx.lineTo(pt.x, pt.y + waveOffset);
        }
      }

      ctx.strokeStyle = 'rgba(255, 91, 58, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Prune old points
      while (trail.length > 0 && trail[0].age > 24) {
        trail.shift();
      }
    }

    requestAnimationFrame(renderTrail);
  }
  requestAnimationFrame(renderTrail);

  // Handle data-cursor states
  document.addEventListener('mouseover', (e) => {
    const target = (e.target as HTMLElement).closest('[data-cursor]');
    if (target) {
      const state = target.getAttribute('data-cursor');
      document.body.className = document.body.className.replace(/\bcursor-\S+/g, '').trim();
      if (state) {
        document.body.classList.add(`cursor-${state}`);
        if (state === 'view') ring.textContent = 'OPEN';
        else if (state === 'copy') ring.textContent = 'COPY';
        else ring.textContent = '';
      }
    }
  });

  document.addEventListener('mouseout', (e) => {
    const target = (e.target as HTMLElement).closest('[data-cursor]');
    if (target) {
      document.body.classList.remove('cursor-link', 'cursor-view', 'cursor-drag', 'cursor-text', 'cursor-copy', 'cursor-avatar');
      ring.textContent = '';
    }
  });

  // Magnetic button effect
  const magneticEls = document.querySelectorAll<HTMLElement>('[data-magnetic]');
  magneticEls.forEach((el) => {
    const xTo = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power2.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power2.out' });

    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      const pull = 0.35;
      xTo(relX * pull);
      yTo(relY * pull);
    });

    el.addEventListener('mouseleave', () => {
      xTo(0);
      yTo(0);
    });
  });
}

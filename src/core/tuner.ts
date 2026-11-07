import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initTuner(): void {
  const tunerText = document.getElementById('tuner-label');
  const scrollCanvas = document.getElementById('scroll-progress') as HTMLCanvasElement;
  const ctx = scrollCanvas?.getContext('2d');

  if (scrollCanvas) {
    scrollCanvas.width = 32;
    scrollCanvas.height = window.innerHeight;
    window.addEventListener('resize', () => {
      scrollCanvas.height = window.innerHeight;
    });
  }

  // Channel titles mapping
  const channels = [
    { id: 'hero', ch: 'CH 01 · SIGNAL' },
    { id: 'work', ch: 'CH 02 · WORK' },
    { id: 'about', ch: 'CH 03 · ABOUT' },
    { id: 'research', ch: 'CH 04 · RESEARCH' },
    { id: 'toolkit', ch: 'CH 05 · TOOLKIT' },
    { id: 'contact', ch: 'CH 06 · TRANSMISSION' },
  ];

  let currentCh = 'CH 01 · SIGNAL';

  function triggerGlitch(newCh: string) {
    if (!tunerText || currentCh === newCh) return;
    currentCh = newCh;

    const chars = '0123456789!@#$%^&*<>[]{}';
    let iter = 0;
    const interval = setInterval(() => {
      tunerText.innerText = newCh
        .split('')
        .map((char, index) => {
          if (index < iter) {
            return char;
          }
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join('');

      if (iter >= newCh.length) {
        clearInterval(interval);
        tunerText.innerText = newCh;
      }
      iter += 1 / 2;
    }, 25);
  }

  // Observe sections
  channels.forEach((item) => {
    const el = document.getElementById(item.id);
    if (!el) return;

    ScrollTrigger.create({
      trigger: el,
      start: 'top 50%',
      end: 'bottom 50%',
      onEnter: () => triggerGlitch(item.ch),
      onEnterBack: () => triggerGlitch(item.ch),
    });
  });

  // Render live waveform progress bar
  let wavePhase = 0;
  function renderProgressWave() {
    if (!ctx || !scrollCanvas) return;
    const h = scrollCanvas.height;
    const w = scrollCanvas.width;

    ctx.clearRect(0, 0, w, h);

    const scrollProgress = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight || 1);
    const targetY = scrollProgress * h;

    ctx.beginPath();
    ctx.moveTo(w / 2, 0);

    for (let y = 0; y <= targetY; y += 4) {
      const freq = 0.08;
      const amp = 4 * Math.sin(y * 0.01 + wavePhase);
      const x = w / 2 + Math.sin(y * freq + wavePhase) * amp;
      ctx.lineTo(x, y);
    }

    ctx.strokeStyle = '#FF5B3A';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Pulse head
    ctx.beginPath();
    ctx.arc(w / 2, targetY, 3, 0, Math.PI * 2);
    ctx.fillStyle = '#C8F031';
    ctx.fill();

    wavePhase += 0.05;
    requestAnimationFrame(renderProgressWave);
  }
  requestAnimationFrame(renderProgressWave);
}


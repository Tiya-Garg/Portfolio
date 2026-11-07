import { SITE_CONTENT } from '../content';
import { initHeroWaveform } from '../graphics/waveform';
import { initAvatar } from '../avatar/avatarController';

export function renderHero(): string {
  const c = SITE_CONTENT.hero;

  return `
    <section id="hero" class="hero-section" style="position:relative; width:100vw; min-height:100vh; display:flex; flex-direction:column; justify-content:center; padding:clamp(4rem, 8vw, 6rem) var(--gutter); overflow:hidden; background-color:var(--paper);">
      <!-- Full-bleed interactive 3-channel waveform canvas -->
      <canvas id="hero-waveform" class="hero-waveform-canvas" style="position:absolute; inset:0; width:100%; height:100%; pointer-events:none; z-index:var(--z-bg);"></canvas>

      <div class="site-container" style="position:relative; z-index:var(--z-content); max-width:var(--max-width); margin:0 auto; width:100%;">
        <!-- Kicker & Status -->
        <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:1rem; margin-bottom:1.5rem;">
          <div class="mono-label" style="color:var(--coral); font-weight:bold; letter-spacing:0.12em;">${c.kicker}</div>
          <div class="status-pill" style="display:inline-flex; align-items:center; gap:0.5rem; background:rgba(14,14,16,0.06); padding:0.4rem 0.85rem; border-radius:9999px; font-family:var(--font-mono); font-size:0.75rem;">
            <span style="width:7px; height:7px; border-radius:50%; background:var(--lime); box-shadow:0 0 6px var(--lime);"></span>
            <span>${c.statusPill}</span>
          </div>
        </div>

        <!-- Giant Kinetic Typography TIYA GARG -->
        <div class="hero-title-wrap" style="position:relative; margin-bottom:1.5rem; line-height:0.82; user-select:none;">
          <h1 class="hero-name" style="font-size:clamp(4.8rem, 21vw, 19.5rem); letter-spacing:-0.02em; color:var(--ink); margin:0;">
            <span class="hero-line hero-line-1" style="display:block;">${c.titleLine1}</span>
            <span class="hero-line hero-line-2" style="display:block; color:var(--blue);">${c.titleLine2}</span>
          </h1>

          <!-- Avatar v2 Container (mounted via createAvatar) -->
          <div id="avatar-hero-anchor" class="avatar-hero-container" data-cursor="avatar" role="img" aria-label="Tiya Garg illustrated animated companion"></div>
        </div>

        <!-- Pitch & CTAs -->
        <div style="display:grid; grid-template-columns:repeat(12, 1fr); gap:1.5rem; align-items:flex-end;">
          <p style="grid-column: span 8; font-size:clamp(1.1rem, 1.8vw, 1.4rem); line-height:1.5; color:var(--ink); font-weight:400; max-width:680px;">
            I build <strong style="color:var(--coral);">distributed systems</strong>, real-time backends and AI pipelines — from a Go scheduler that survives node failure to multi-agent market simulations.
          </p>

          <div style="grid-column: span 4; display:flex; flex-direction:column; align-items:flex-start; gap:1.25rem;">
            <!-- Rotating Circular Badge -->
            <a href="#contact" class="rotating-badge-link" data-cursor="link" aria-label="Let's build contact link">
              <svg viewBox="0 0 100 100" width="85" height="85" style="animation: spin 14s linear infinite; transform-origin:center;">
                <path id="badgePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="none" />
                <text font-family="var(--font-mono)" font-size="8.8" font-weight="bold" fill="var(--ink)" letter-spacing="2.2">
                  <textPath href="#badgePath">LET'S BUILD · LET'S BUILD · </textPath>
                </text>
                <circle cx="50" cy="50" r="14" fill="var(--coral)" />
                <path d="M 46 50 L 54 50 M 50 46 L 54 50 L 50 54" stroke="#FFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none" />
              </svg>
            </a>

            <!-- Action Buttons -->
            <div style="display:flex; gap:0.75rem;">
              <a href="#work" data-magnetic class="btn-primary" style="display:inline-flex; align-items:center; background:var(--ink); color:var(--paper); padding:0.8rem 1.5rem; border-radius:4px; font-family:var(--font-mono); font-size:0.85rem; font-weight:bold; letter-spacing:0.04em;">
                ${c.ctaPrimary} ↓
              </a>
              <a href="${SITE_CONTENT.meta.resume}" target="_blank" rel="noopener noreferrer" data-magnetic class="btn-secondary" style="display:inline-flex; align-items:center; background:transparent; border:1px solid var(--ink); color:var(--ink); padding:0.8rem 1.4rem; border-radius:4px; font-family:var(--font-mono); font-size:0.85rem; font-weight:bold;">
                ${c.ctaSecondary}
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>
        @keyframes spin { 100% { transform: rotate(360deg); } }
      </style>
    </section>
  `;
}

export function initHero(): void {
  initHeroWaveform('hero-waveform');
  initAvatar('avatar-hero-anchor');

  // Char splitting & Kinetic wobble
  const title1 = document.querySelector('.hero-line-1');
  const title2 = document.querySelector('.hero-line-2');

  function splitChars(el: Element | null) {
    if (!el) return;
    const text = el.textContent || '';
    el.innerHTML = text
      .split('')
      .map((char) => `<span class="hero-char" style="display:inline-block; transition:transform 0.2s ease;">${char}</span>`)
      .join('');
  }

  splitChars(title1);
  splitChars(title2);

  // Stagger entry
  const chars = document.querySelectorAll<HTMLElement>('.hero-char');
  window.addEventListener('mousemove', (e) => {
    chars.forEach((char) => {
      const rect = char.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dist = Math.hypot(e.clientX - cx, e.clientY - cy);

      if (dist < 140) {
        const factor = (1 - dist / 140) * 12;
        char.style.transform = `translateY(${-factor}px) skewX(${factor * 0.4}deg)`;
      } else {
        char.style.transform = 'translateY(0) skewX(0)';
      }
    });
  });
}

import { SITE_CONTENT } from '../content';
import { initAntennaGraphic } from '../graphics/antenna';

export function renderResearch(): string {
  const c = SITE_CONTENT.research;

  return `
    <section id="research" class="section-wrapper research-section" style="background:var(--blue); color:#FFFFFF; padding-top:7rem; padding-bottom:7rem;">
      <div class="site-container">
        <!-- Section Header -->
        <div class="section-header">
          <div class="section-badge" style="color:var(--lime);">${c.badge}</div>
          <h2 class="section-title" style="color:#FFFFFF; max-width:960px;">
            ${c.title}
          </h2>
          <span class="mono-label" style="color:rgba(255,255,255,0.75);">${c.subtitle}</span>
        </div>

        <div style="display:grid; grid-template-columns:repeat(12, 1fr); gap:clamp(2rem, 5vw, 4rem); align-items:center;">
          <!-- Left: Narrative & Context -->
          <div style="grid-column: span 6;">
            <p style="font-size:1.15rem; line-height:1.65; color:rgba(255,255,255,0.9); margin-bottom:1.5rem;">
              ${c.abstract}
            </p>

            <div style="background:rgba(0,0,0,0.25); border-left:3px solid var(--lime); padding:1rem 1.25rem; border-radius:4px; font-family:var(--font-mono); font-size:0.8rem; line-height:1.5; color:rgba(255,255,255,0.85);">
              <strong>KEY FINDING:</strong> Cutting symmetrical slot perturbations in the radiating patch suppresses higher-order harmonic modes and shifts the resonant impedance dip precisely to 47.0 GHz with minimal back-lobe leakage.
            </div>
          </div>

          <!-- Right: Interactive Antenna & Polar Plot Graphic -->
          <div style="grid-column: span 6; display:flex; justify-content:center;">
            <div id="graphic-antenna" style="width:100%;"></div>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function initResearch(): void {
  initAntennaGraphic('graphic-antenna');
}


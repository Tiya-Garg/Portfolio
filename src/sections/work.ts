import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SITE_CONTENT, Project } from '../content';
import { initDistribuQGraphic } from '../graphics/distribuq';
import { initFreqBridgeGraphic } from '../graphics/freqbridge';
import { initEventGuardGraphic } from '../graphics/eventguard';
import { initLipiVerseGraphic } from '../graphics/lipiverse';
import { initExVeroGraphic, initPanchnamaGraphic, initSecondShiftGraphic } from '../graphics/hackathonGraphics';

gsap.registerPlugin(ScrollTrigger);

export function renderWork(): string {
  const featured = SITE_CONTENT.projects.filter((p) => p.featured);
  const secondary = SITE_CONTENT.projects.filter((p) => !p.featured);

  return `
    <section id="work" class="section-wrapper work-section" style="background:var(--ink); color:var(--paper); padding-top:6rem; padding-bottom:6rem;">
      <div class="site-container">
        <!-- Section Header -->
        <div class="section-header" style="border-bottom:1px solid rgba(255,255,255,0.15); padding-bottom:2rem; margin-bottom:4rem;">
          <div class="section-badge" style="color:var(--coral);">CH 02 · SELECTED WORK</div>
          <div style="display:flex; justify-content:space-between; align-items:flex-end; flex-wrap:wrap; gap:1rem;">
            <h2 class="section-title" style="color:var(--paper); margin:0;">Things I built.</h2>
            <span class="mono-label" style="color:var(--lime);">01 / 07 PROJECTS</span>
          </div>
        </div>

        <!-- Featured Project Scenes (Stacked Cards) -->
        <div class="featured-scenes-wrap" style="display:flex; flex-direction:column; gap:4rem;">
          ${featured.map((p) => renderFeaturedScene(p)).join('')}
        </div>

        <!-- Team Hackathon Projects Rail -->
        <div class="hackathon-rail-header" style="margin-top:6rem; margin-bottom:2rem; border-top:1px dashed rgba(255,255,255,0.2); padding-top:3rem;">
          <div class="section-badge" style="color:var(--lime);">TEAM BUILDS & HACKATHON PODIUMS</div>
          <h3 style="font-family:var(--font-display); font-size:clamp(1.8rem, 3.5vw, 2.8rem); color:var(--paper); margin-top:0.5rem;">
            Consensus & Rapid Hackathon Ships
          </h3>
        </div>

        <div class="hackathon-rail" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(320px, 1fr)); gap:2rem;">
          ${secondary.map((p) => renderSecondaryCard(p)).join('')}
        </div>
      </div>
    </section>
  `;
}

function renderFeaturedScene(p: Project): string {
  return `
    <div id="scene-${p.id}" class="work-scene-card" style="position:relative; background:#18181C; border:1px solid rgba(255,255,255,0.12); border-radius:12px; padding:clamp(1.5rem, 4vw, 3rem); box-shadow:0 16px 40px rgba(0,0,0,0.4);">
      <div style="display:grid; grid-template-columns:repeat(12, 1fr); gap:2.5rem; align-items:center;">
        <!-- Left Column: Specs & Story -->
        <div style="grid-column: span 6;">
          <div style="display:flex; align-items:center; gap:0.75rem; margin-bottom:0.75rem;">
            <span style="font-family:var(--font-display); font-size:2.5rem; color:var(--coral); line-height:1;">${p.number}</span>
            <span style="font-family:var(--font-mono); font-size:0.75rem; background:rgba(255,255,255,0.08); padding:0.25rem 0.6rem; border-radius:3px;">${p.roleType}</span>
            ${p.award ? `<span style="font-family:var(--font-mono); font-size:0.75rem; color:var(--lime);">${p.award}</span>` : ''}
          </div>

          <h3 style="font-size:clamp(2rem, 3.8vw, 3.2rem); margin-bottom:0.75rem; color:var(--paper);">${p.title}</h3>
          
          <p style="font-size:1.05rem; line-height:1.5; color:rgba(237,231,218,0.85); margin-bottom:1.25rem;">
            ${p.description}
          </p>

          ${p.yourRole ? `
            <div style="background:rgba(42,60,255,0.12); border-left:3px solid var(--blue); padding:0.6rem 0.85rem; margin-bottom:1.25rem; font-family:var(--font-mono); font-size:0.78rem; color:#A4B4FF;">
              <strong>YOUR ROLE:</strong> ${p.yourRole}
            </div>
          ` : ''}

          <ul style="list-style:none; display:flex; flex-direction:column; gap:0.6rem; margin-bottom:1.5rem;">
            ${p.bullets.map((b) => `
              <li style="display:flex; align-items:baseline; gap:0.6rem; font-size:0.9rem; color:rgba(237,231,218,0.75);">
                <span style="color:var(--coral);">✦</span>
                <span>${b}</span>
              </li>
            `).join('')}
          </ul>

          <div style="display:flex; flex-wrap:wrap; gap:0.5rem; margin-bottom:1.5rem;">
            ${p.stack.map((s) => `
              <span style="font-family:var(--font-mono); font-size:0.72rem; background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.12); padding:0.25rem 0.55rem; border-radius:3px; color:var(--paper);">
                ${s}
              </span>
            `).join('')}
          </div>

          <div style="display:flex; gap:1rem; align-items:center;">
            ${p.repoUrl ? `
              <a href="${p.repoUrl}" target="_blank" rel="noopener noreferrer" data-cursor="view" style="display:inline-flex; align-items:center; gap:0.4rem; font-family:var(--font-mono); font-size:0.8rem; color:var(--coral); font-weight:bold; text-decoration:underline;">
                View Source Code ↗
              </a>
            ` : ''}
          </div>
        </div>

        <!-- Right Column: Interactive Bespoke Demo Graphic -->
        <div style="grid-column: span 6; display:flex; justify-content:center;">
          <div id="graphic-${p.graphicId}" style="width:100%;"></div>
        </div>
      </div>
    </div>
  `;
}

function renderSecondaryCard(p: Project): string {
  return `
    <div id="scene-${p.id}" style="background:#18181C; border:1px solid rgba(255,255,255,0.1); border-radius:8px; padding:1.75rem; display:flex; flex-direction:column; justify-content:space-between;">
      <div>
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
          <span style="font-family:var(--font-display); font-size:1.8rem; color:var(--lime);">${p.number}</span>
          <span style="font-family:var(--font-mono); font-size:0.65rem; background:rgba(200,240,49,0.15); color:var(--lime); padding:0.2rem 0.5rem; border-radius:3px;">
            ${p.roleType}
          </span>
        </div>

        <h4 style="font-size:1.6rem; margin-bottom:0.4rem; color:var(--paper);">${p.title}</h4>
        
        ${p.award ? `<div style="font-family:var(--font-mono); font-size:0.72rem; color:var(--lime); margin-bottom:0.75rem;">${p.award}</div>` : ''}

        <p style="font-size:0.85rem; line-height:1.45; color:rgba(237,231,218,0.7); margin-bottom:1rem;">
          ${p.description}
        </p>

        <div style="background:rgba(255,255,255,0.04); border-left:2px solid var(--coral); padding:0.5rem 0.7rem; margin-bottom:1rem; font-family:var(--font-mono); font-size:0.7rem; color:rgba(237,231,218,0.85);">
          <strong>YOUR ROLE:</strong> ${p.yourRole}
        </div>

        <div id="graphic-${p.graphicId}" style="margin-bottom:1rem;"></div>
      </div>

      <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid rgba(255,255,255,0.08); padding-top:0.75rem;">
        <span style="font-family:var(--font-mono); font-size:0.7rem; color:rgba(237,231,218,0.4);">${p.stack.slice(0, 3).join(' · ')}</span>
        ${p.repoUrl ? `
          <a href="${p.repoUrl}" target="_blank" rel="noopener noreferrer" style="font-family:var(--font-mono); font-size:0.75rem; color:var(--coral); text-decoration:underline;">
            Repo ↗
          </a>
        ` : ''}
      </div>
    </div>
  `;
}

export function initWork(): void {
  // Mount graphics
  initDistribuQGraphic('graphic-distribuq');
  initFreqBridgeGraphic('graphic-freqbridge');
  initEventGuardGraphic('graphic-eventguard');
  initLipiVerseGraphic('graphic-lipiverse');
  initExVeroGraphic('graphic-exvero');
  initPanchnamaGraphic('graphic-panchnama');
  initSecondShiftGraphic('graphic-secondshift');

  // Stacking scene card scroll entrance
  const cards = document.querySelectorAll('.work-scene-card');
  cards.forEach((card, index) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      },
      y: 60,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      delay: index * 0.1
    });
  });
}


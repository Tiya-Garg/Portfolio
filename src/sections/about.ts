import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SITE_CONTENT } from '../content';

gsap.registerPlugin(ScrollTrigger);

export function renderAbout(): string {
  const c = SITE_CONTENT.about;

  return `
    <section id="about" class="section-wrapper about-section" style="background:var(--paper); color:var(--ink); padding-top:7rem; padding-bottom:7rem;">
      <div class="site-container">
        <!-- Section Header -->
        <div class="section-header">
          <div class="section-badge">CH 03 · ABOUT ME</div>
          <h2 class="section-title" style="max-width:920px;">
            ${c.heading}
          </h2>
        </div>

        <!-- Main Narrative Grid -->
        <div style="display:grid; grid-template-columns:repeat(12, 1fr); gap:clamp(2rem, 5vw, 4rem); align-items:flex-start; margin-bottom:5rem;">
          <!-- Left: Polaroid & Sticky Notes -->
          <div style="grid-column: span 5; display:flex; flex-direction:column; gap:2rem;">
            <!-- Framed Polaroid -->
            <div id="polaroid-frame" data-cursor="link" style="background:#FFF; padding:1rem 1rem 2rem 1rem; border-radius:2px; box-shadow:0 12px 30px rgba(0,0,0,0.12); transform:rotate(-2.5deg); transition:transform 0.3s ease, box-shadow 0.3s ease; position:relative;">
              <!-- Tape strip -->
              <div style="position:absolute; top:-12px; left:40%; transform:translateX(-50%); width:80px; height:24px; background:rgba(255, 230, 160, 0.7); backdrop-filter:blur(2px); border-radius:2px;"></div>
              
              <img src="./assets/profile.png" alt="Tiya Garg speaking at IGDTUW Model United Nations" style="width:100%; height:auto; display:block; border-radius:1px; filter:grayscale(15%) contrast(105%);" />
              
              <div style="font-family:var(--font-hand); font-size:1.35rem; color:#222; text-align:center; margin-top:0.85rem;">
                ${c.polaroidCaption}
              </div>
            </div>

            <!-- Sticky Note Stats -->
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
              ${c.stats.map((s, idx) => `
                <div class="stat-sticky" style="background:#FFFDE8; border:1px dashed rgba(14,14,16,0.3); padding:1rem; border-radius:2px; box-shadow:2px 4px 12px rgba(0,0,0,0.06); transform:rotate(${idx % 2 === 0 ? '-1.5deg' : '1.5deg'});">
                  <div class="stat-value" style="font-family:var(--font-display); font-size:2rem; color:var(--coral); line-height:1;">${s.value}</div>
                  <div style="font-family:var(--font-mono); font-size:0.7rem; color:var(--ink-light); margin-top:0.3rem;">${s.label}</div>
                  ${s.note ? `<div style="font-family:var(--font-mono); font-size:0.65rem; color:#888;">${s.note}</div>` : ''}
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Right: Bio & Journey Line -->
          <div style="grid-column: span 7; display:flex; flex-direction:column; gap:2rem;">
            <p style="font-size:1.18rem; line-height:1.65; color:var(--ink);">
              ${c.bioParagraph1}
            </p>
            <p style="font-size:1.15rem; line-height:1.65; color:var(--ink-light);">
              ${c.bioParagraph2}
            </p>

            <!-- Beyond Code / Leadership -->
            <div style="background:var(--paper-2); padding:1.5rem; border-radius:6px; border-left:4px solid var(--blue); margin-top:1rem;">
              <h4 style="font-family:var(--font-mono); font-size:0.85rem; color:var(--blue); margin-bottom:0.5rem; letter-spacing:0.06em;">BEYOND THE TERMINAL</h4>
              <p style="font-size:0.95rem; line-height:1.5; color:var(--ink-light);">
                ${c.beyondCode}
              </p>
            </div>

            <!-- Animated Journey Timeline SVG -->
            <div class="journey-timeline" style="margin-top:2.5rem;">
              <h4 style="font-family:var(--font-mono); font-size:0.85rem; color:var(--coral); margin-bottom:1.5rem; letter-spacing:0.08em;">MILESTONE TRAJECTORY</h4>
              <div style="display:flex; flex-direction:column; gap:1.25rem; border-left:2px dashed var(--ink); padding-left:1.5rem; margin-left:0.5rem;">
                ${c.milestones.map((m) => `
                  <div class="timeline-node" style="position:relative;">
                    <div style="position:absolute; left:-1.95rem; top:0.25rem; width:10px; height:10px; border-radius:50%; background:var(--coral); border:2px solid var(--paper);"></div>
                    <span style="font-family:var(--font-mono); font-size:0.75rem; color:var(--coral); font-weight:bold;">${m.date} · ${m.category}</span>
                    <h5 style="font-family:var(--font-sans); font-size:1.05rem; font-weight:700; color:var(--ink); margin:0.2rem 0;">${m.title}</h5>
                    <p style="font-size:0.88rem; color:var(--ink-light); line-height:1.45;">${m.description}</p>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function initAbout(): void {
  const polaroid = document.getElementById('polaroid-frame');
  if (polaroid) {
    polaroid.addEventListener('mouseenter', () => {
      polaroid.style.transform = 'rotate(0deg) scale(1.03) translateY(-6px)';
      polaroid.style.boxShadow = '0 20px 40px rgba(0,0,0,0.18)';
    });
    polaroid.addEventListener('mouseleave', () => {
      polaroid.style.transform = 'rotate(-2.5deg) scale(1) translateY(0)';
      polaroid.style.boxShadow = '0 12px 30px rgba(0,0,0,0.12)';
    });
  }

  // Animate timeline nodes on scroll
  gsap.from('.timeline-node', {
    scrollTrigger: {
      trigger: '.journey-timeline',
      start: 'top 80%',
    },
    x: -25,
    opacity: 0,
    stagger: 0.1,
    duration: 0.6,
    ease: 'power3.out'
  });
}

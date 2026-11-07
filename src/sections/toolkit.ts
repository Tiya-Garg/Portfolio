import { SITE_CONTENT } from '../content';
import { initPatchbayGraphic } from '../graphics/patchbay';

export function renderToolkit(): string {
  const c = SITE_CONTENT.toolkit;

  return `
    <section id="toolkit" class="section-wrapper toolkit-section" style="background:var(--paper); color:var(--ink); padding-top:7rem; padding-bottom:7rem;">
      <div class="site-container">
        <!-- Section Header -->
        <div class="section-header">
          <div class="section-badge">${c.badge}</div>
          <h2 class="section-title">${c.title}</h2>
          <p class="mono-label" style="font-size:0.85rem; color:var(--ink-muted); max-width:620px;">
            ${c.subtitle}
          </p>
        </div>

        <!-- Patch Bay Container -->
        <div id="graphic-patchbay" style="width:100%; margin-top:2rem;"></div>
      </div>
    </section>
  `;
}

export function initToolkit(): void {
  initPatchbayGraphic('graphic-patchbay');
}


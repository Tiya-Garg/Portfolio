import { SITE_CONTENT } from '../content';

export function renderContact(): string {
  const c = SITE_CONTENT.contact;

  return `
    <section id="contact" class="section-wrapper contact-section" style="background:var(--blue); color:#FFFFFF; padding-top:8rem; padding-bottom:5rem; position:relative; overflow:hidden;">
      <div class="site-container" style="position:relative; z-index:10;">
        <!-- Section Header -->
        <div class="section-badge" style="color:var(--lime); margin-bottom:1rem;">${c.badge}</div>
        
        <h2 style="font-size:clamp(2.8rem, 6.5vw, 5.8rem); line-height:0.95; max-width:1050px; margin-bottom:2.5rem; color:#FFFFFF;">
          Let's build something that <span class="serif-accent" style="color:var(--lime); font-style:italic;">holds under load.</span>
        </h2>

        <p style="font-size:1.25rem; line-height:1.6; max-width:680px; color:rgba(255,255,255,0.85); margin-bottom:3rem;">
          ${c.subheading}
        </p>

        <!-- Giant Clickable / Copyable Email Link -->
        <div style="margin-bottom:4rem;">
          <button id="email-copy-btn" data-cursor="copy" style="font-family:var(--font-serif); font-style:italic; font-size:clamp(2rem, 5.5vw, 4.2rem); color:var(--paper); text-decoration:underline; text-underline-offset:8px; cursor:pointer; text-align:left; background:none; border:none; padding:0; transition:color 0.2s;">
            ${c.email}
          </button>
          <div id="email-toast" style="opacity:0; font-family:var(--font-mono); font-size:0.8rem; color:var(--lime); margin-top:0.75rem; letter-spacing:0.08em; transition:opacity 0.25s ease;">
            ✓ ${c.toastMessage}
          </div>
        </div>

        <!-- Social & Links Grid -->
        <div style="display:flex; flex-wrap:wrap; gap:2rem; align-items:center; border-top:1px solid rgba(255,255,255,0.2); padding-top:2.5rem; margin-bottom:4rem;">
          ${c.socials.map((s) => `
            <a href="${s.url}" target="_blank" rel="noopener noreferrer" data-magnetic style="font-family:var(--font-mono); font-size:0.9rem; color:#FFFFFF; display:inline-flex; align-items:center; gap:0.4rem; padding:0.5rem 1rem; background:rgba(255,255,255,0.08); border-radius:4px; border:1px solid rgba(255,255,255,0.15);">
              <span>${s.name}</span>
              <span style="color:var(--lime);">↗</span>
            </a>
          `).join('')}
        </div>

        <!-- Footer -->
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem; font-family:var(--font-mono); font-size:0.75rem; color:rgba(255,255,255,0.6);">
          <div>${c.footer}</div>
          <a href="#hero" id="back-to-top" style="color:var(--lime); text-decoration:underline; cursor:pointer;">
            Back to top ↑
          </a>
        </div>
      </div>
    </section>
  `;
}

export function initContact(): void {
  const btn = document.getElementById('email-copy-btn');
  const toast = document.getElementById('email-toast');

  btn?.addEventListener('click', () => {
    navigator.clipboard.writeText(SITE_CONTENT.contact.email).then(() => {
      if (toast) {
        toast.style.opacity = '1';
        setTimeout(() => {
          toast.style.opacity = '0';
        }, 3000);
      }
    });
  });
}

import { SITE_CONTENT, SkillGroup } from '../content';

export function initPatchbayGraphic(containerId: string): void {
  const container = document.getElementById(containerId);
  if (!container) return;

  const groups: SkillGroup[] = SITE_CONTENT.toolkit.groups;

  let jacksHtml = '';
  groups.forEach((group) => {
    jacksHtml += `
      <div class="patch-group" style="margin-bottom:1.5rem;">
        <h4 style="font-family:var(--font-mono); font-size:0.8rem; color:var(--coral); margin-bottom:0.75rem; letter-spacing:0.06em;">${group.category}</h4>
        <div style="display:flex; flex-wrap:wrap; gap:0.6rem;">
          ${group.skills.map((s) => `
            <button class="patch-jack" data-projects="${s.projectIds.join(',')}" style="display:inline-flex; align-items:center; gap:0.5rem; background:rgba(14,14,16,0.06); border:1px solid rgba(14,14,16,0.18); padding:0.4rem 0.8rem; border-radius:4px; font-family:var(--font-mono); font-size:0.8rem; cursor:pointer; transition:all 0.2s;">
              <span class="jack-hole" style="width:8px; height:8px; border-radius:50%; background:#0E0E10; border:1.5px solid #888;"></span>
              <span>${s.name}</span>
            </button>
          `).join('')}
        </div>
      </div>
    `;
  });

  container.innerHTML = `
    <div class="patchbay-widget" style="width:100%; position:relative;">
      <!-- Interactive patch jacks -->
      <div class="jacks-container">
        ${jacksHtml}
      </div>

      <!-- Projects quick-matrix footer -->
      <div style="margin-top:2rem; padding-top:1.5rem; border-top:1px dashed rgba(14,14,16,0.2); display:flex; flex-wrap:wrap; gap:0.75rem; align-items:center;">
        <span class="mono-label" style="margin-right:0.5rem;">Cross-Connect Projects:</span>
        ${SITE_CONTENT.projects.map((p) => `
          <span class="project-pill-tag" data-project-id="${p.id}" style="background:var(--ink); color:var(--paper); font-family:var(--font-mono); font-size:0.75rem; padding:0.3rem 0.65rem; border-radius:3px; cursor:pointer; transition:all 0.2s;">
            ${p.number} · ${p.title}
          </span>
        `).join('')}
      </div>
    </div>
  `;

  const jacks = container.querySelectorAll<HTMLButtonElement>('.patch-jack');
  const projectPills = container.querySelectorAll<HTMLElement>('.project-pill-tag');

  // Hovering a skill highlights connected project pills
  jacks.forEach((jack) => {
    jack.addEventListener('mouseenter', () => {
      const pIds = jack.getAttribute('data-projects')?.split(',').filter(Boolean) || [];
      jack.style.borderColor = 'var(--coral)';
      jack.style.background = 'rgba(255, 91, 58, 0.12)';
      (jack.querySelector('.jack-hole') as HTMLElement).style.background = 'var(--coral)';

      projectPills.forEach((pill) => {
        const id = pill.getAttribute('data-project-id');
        if (id && pIds.includes(id)) {
          pill.style.background = 'var(--coral)';
          pill.style.transform = 'scale(1.08)';
        } else {
          pill.style.opacity = '0.35';
        }
      });
    });

    jack.addEventListener('mouseleave', () => {
      jack.style.borderColor = 'rgba(14,14,16,0.18)';
      jack.style.background = 'rgba(14,14,16,0.06)';
      (jack.querySelector('.jack-hole') as HTMLElement).style.background = '#0E0E10';

      projectPills.forEach((pill) => {
        pill.style.background = 'var(--ink)';
        pill.style.transform = 'scale(1)';
        pill.style.opacity = '1';
      });
    });
  });

  // Hovering a project pill highlights related skill jacks
  projectPills.forEach((pill) => {
    pill.addEventListener('mouseenter', () => {
      const pId = pill.getAttribute('data-project-id');
      if (!pId) return;

      jacks.forEach((jack) => {
        const pIds = jack.getAttribute('data-projects')?.split(',') || [];
        if (pIds.includes(pId)) {
          jack.style.borderColor = 'var(--blue)';
          jack.style.background = 'rgba(42, 60, 255, 0.12)';
          (jack.querySelector('.jack-hole') as HTMLElement).style.background = 'var(--blue)';
        } else {
          jack.style.opacity = '0.3';
        }
      });
    });

    pill.addEventListener('mouseleave', () => {
      jacks.forEach((jack) => {
        jack.style.borderColor = 'rgba(14,14,16,0.18)';
        jack.style.background = 'rgba(14,14,16,0.06)';
        jack.style.opacity = '1';
        (jack.querySelector('.jack-hole') as HTMLElement).style.background = '#0E0E10';
      });
    });
  });
}


import gsap from 'gsap';
import { SITE_CONTENT } from '../content';

export function renderMarquee(): string {
  const items = SITE_CONTENT.marqueeItems;
  const repeated = [...items, ...items, ...items].join(' ');

  return `
    <div class="marquee-track" style="width:100vw; overflow:hidden; background:var(--ink); color:var(--paper); padding:1.25rem 0; border-top:2px solid rgba(255,255,255,0.1); border-bottom:2px solid rgba(255,255,255,0.1); user-select:none; white-space:nowrap;">
      <div id="marquee-inner" style="display:inline-block; font-family:var(--font-display); font-size:clamp(1.4rem, 2.8vw, 2.2rem); letter-spacing:0.04em; will-change:transform;">
        <span>${repeated}</span>
      </div>
    </div>
  `;
}

export function initMarquee(): void {
  const marquee = document.getElementById('marquee-inner');
  if (!marquee) return;

  let xPos = 0;
  let direction = -1;
  let baseSpeed = 1.2;
  let speed = baseSpeed;
  let lastScrollY = window.scrollY;
  let isHovered = false;

  marquee.addEventListener('mouseenter', () => (isHovered = true));
  marquee.addEventListener('mouseleave', () => (isHovered = false));

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    const diff = currentScrollY - lastScrollY;
    lastScrollY = currentScrollY;

    if (diff > 0) {
      direction = -1; // scrolling down moves left
      speed = baseSpeed + Math.min(diff * 0.15, 8);
    } else if (diff < 0) {
      direction = 1; // scrolling up reverses right
      speed = baseSpeed + Math.min(Math.abs(diff) * 0.15, 8);
    }
  });

  gsap.ticker.add(() => {
    if (isHovered) return;

    speed += (baseSpeed - speed) * 0.05; // ease back to base speed
    xPos += speed * direction;

    // Loop marquee smoothly
    const wrapWidth = marquee.offsetWidth / 3;
    if (xPos < -wrapWidth) {
      xPos += wrapWidth;
    } else if (xPos > 0) {
      xPos -= wrapWidth;
    }

    marquee.style.transform = `translateX(${xPos}px)`;
  });
}

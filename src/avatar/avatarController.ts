import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { applyExpression, ExpressionName } from './expressions';
import { SITE_CONTENT } from '../content';
import { checkReducedMotion } from '../core/reducedMotion';

gsap.registerPlugin(ScrollTrigger);

export interface AvatarController {
  lookAt: (x: number, y: number) => void;
  setExpression: (name: ExpressionName) => void;
  react: (type: 'wave' | 'nod' | 'yay' | 'wink') => void;
  dock: () => void;
  undock: () => void;
}

export function initAvatar(containerId: string): AvatarController | null {
  const container = document.getElementById(containerId);
  if (!container) return null;

  const svg = container.querySelector('#tiya-avatar-svg') as SVGSVGElement | null;
  if (!svg) return null;

  const isReduced = checkReducedMotion();

  // Selected layers
  const headGroup = svg.querySelector('#head') as SVGGraphicsElement;
  const hairBack = svg.querySelector('#hair-back') as SVGGraphicsElement;
  const hairFront = svg.querySelector('#hair-front') as SVGGraphicsElement;
  const torsoGroup = svg.querySelector('#torso') as SVGGraphicsElement;
  const pupilL = svg.querySelector('#pupil-L') as SVGGraphicsElement;
  const pupilR = svg.querySelector('#pupil-R') as SVGGraphicsElement;
  const lidTopL = svg.querySelector('#lid-top-L') as SVGGraphicsElement;
  const lidTopR = svg.querySelector('#lid-top-R') as SVGGraphicsElement;
  const strandL = svg.querySelector('#hair-strand-L') as SVGGraphicsElement;
  const strandR = svg.querySelector('#hair-strand-R') as SVGGraphicsElement;
  const handWave = svg.querySelector('#hand-wave') as SVGGraphicsElement;
  const headphones = svg.querySelector('#headphones') as SVGGraphicsElement;

  // Set transform origins
  gsap.set(headGroup, { transformOrigin: '200px 270px' });
  gsap.set(torsoGroup, { transformOrigin: '200px 480px' });
  gsap.set(handWave, { transformOrigin: '300px 390px' });

  // GSAP quickTo setters for 60fps tracking
  const headRotTo = gsap.quickTo(headGroup, 'rotation', { duration: 0.35, ease: 'power2.out' });
  const headXTo = gsap.quickTo(headGroup, 'x', { duration: 0.3, ease: 'power2.out' });
  const headYTo = gsap.quickTo(headGroup, 'y', { duration: 0.3, ease: 'power2.out' });

  // Parallax layers
  const hairBackXTo = gsap.quickTo(hairBack, 'x', { duration: 0.4, ease: 'power2.out' });
  const hairFrontXTo = gsap.quickTo(hairFront, 'x', { duration: 0.25, ease: 'power2.out' });

  // Pupils (faster lead time ~60ms)
  const pupilLXTo = gsap.quickTo(pupilL, 'x', { duration: 0.12, ease: 'power2.out' });
  const pupilLYTo = gsap.quickTo(pupilL, 'y', { duration: 0.12, ease: 'power2.out' });
  const pupilRXTo = gsap.quickTo(pupilR, 'x', { duration: 0.12, ease: 'power2.out' });
  const pupilRYTo = gsap.quickTo(pupilR, 'y', { duration: 0.12, ease: 'power2.out' });

  // Hair sway physics
  let hairSwayAngle = 0;
  let scrollSpeedFactor = 1;

  // Breathing loop (disabled if reduced motion)
  if (!isReduced) {
    gsap.to(torsoGroup, {
      scaleY: 1.018,
      duration: 2.4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  }

  // Blinking loop
  function scheduleBlink() {
    if (isReduced) return;
    const delay = 2.5 + Math.random() * 3.5;
    setTimeout(() => {
      triggerBlink(() => {
        // Occasional double blink
        if (Math.random() > 0.75) {
          setTimeout(triggerBlink, 150);
        }
        scheduleBlink();
      });
    }, delay * 1000);
  }

  function triggerBlink(onDone?: () => void) {
    if (!lidTopL || !lidTopR) return;
    gsap.timeline({ onComplete: onDone })
      .to([lidTopL, lidTopR], { scaleY: 1.4, translateY: 4, duration: 0.08, ease: 'power2.in' })
      .to([lidTopL, lidTopR], { scaleY: 0, translateY: 0, duration: 0.1, ease: 'power2.out' });
  }

  scheduleBlink();

  // lookAt method: receives target viewport coordinates
  function lookAt(x: number, y: number) {
    if (isReduced) return;
    const rect = container?.getBoundingClientRect();
    if (!rect) return;

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height * 0.4;

    const dx = x - centerX;
    const dy = y - centerY;
    const dist = Math.hypot(dx, dy) || 1;

    // Head rotation ±12 deg, translation ±14px
    const angle = Math.max(-12, Math.min(12, (dx / window.innerWidth) * 24));
    const transX = Math.max(-14, Math.min(14, (dx / window.innerWidth) * 28));
    const transY = Math.max(-10, Math.min(10, (dy / window.innerHeight) * 20));

    headRotTo(angle);
    headXTo(transX);
    headYTo(transY);

    // Parallax depth
    hairBackXTo(-transX * 0.5);
    hairFrontXTo(transX * 0.4);

    // Eye pupil limits (elliptical bounds ~5.5px)
    const eyeMaxX = 5.5;
    const eyeMaxY = 3.5;
    const pupilX = Math.max(-eyeMaxX, Math.min(eyeMaxX, (dx / dist) * Math.min(dist * 0.04, eyeMaxX)));
    const pupilY = Math.max(-eyeMaxY, Math.min(eyeMaxY, (dy / dist) * Math.min(dist * 0.04, eyeMaxY)));

    pupilLXTo(pupilX);
    pupilLYTo(pupilY);
    pupilRXTo(pupilX);
    pupilRYTo(pupilY);
  }

  // React animations
  function react(type: 'wave' | 'nod' | 'yay' | 'wink') {
    switch (type) {
      case 'wave':
        applyExpression(svg as SVGSVGElement, 'smile');
        if (handWave) {
          gsap.timeline()
            .to(handWave, { scale: 1, duration: 0.25, ease: 'back.out(1.7)' })
            .to(handWave, { rotation: 15, duration: 0.15, repeat: 3, yoyo: true })
            .to(handWave, { scale: 0, duration: 0.2, ease: 'power2.in' });
        }
        break;

      case 'nod':
        gsap.timeline()
          .to(headGroup, { y: 15, duration: 0.15, ease: 'power1.in' })
          .to(headGroup, { y: 0, duration: 0.2, ease: 'back.out(2)' });
        break;

      case 'yay':
        applyExpression(svg as SVGSVGElement, 'open');
        gsap.timeline()
          .to(headGroup, { y: -16, duration: 0.2, ease: 'power2.out' })
          .to(headGroup, { y: 0, duration: 0.3, ease: 'bounce.out' })
          .add(() => applyExpression(svg as SVGSVGElement, 'smile'), '+=0.5');
        spawnConfetti();
        break;

      case 'wink':
        applyExpression(svg as SVGSVGElement, 'wink');
        setTimeout(() => applyExpression(svg as SVGSVGElement, 'smile'), 1200);
        break;
    }
  }

  function spawnConfetti() {
    if (!container) return;
    for (let i = 0; i < 18; i++) {
      const dot = document.createElement('div');
      dot.className = 'avatar-confetti-particle';
      dot.style.cssText = `
        position: absolute;
        top: 40%;
        left: 50%;
        width: ${4 + Math.random() * 6}px;
        height: ${4 + Math.random() * 6}px;
        border-radius: 50%;
        background-color: ${Math.random() > 0.5 ? '#FF5B3A' : '#2A3CFF'};
        pointer-events: none;
        z-index: 100;
      `;
      container.appendChild(dot);

      const angle = Math.random() * Math.PI * 2;
      const dist = 60 + Math.random() * 80;
      gsap.to(dot, {
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist - 30,
        opacity: 0,
        duration: 0.7 + Math.random() * 0.4,
        ease: 'power3.out',
        onComplete: () => dot.remove()
      });
    }
  }

  // Click & Double-click behaviors
  container.addEventListener('click', () => {
    react('nod');
    react('yay');
  });

  container.addEventListener('dblclick', () => {
    gsap.to(headGroup, { rotation: 360, duration: 0.65, ease: 'back.out(1.5)', onComplete: () => gsap.set(headGroup, { rotation: 0 }) });
  });

  container.addEventListener('mouseenter', () => {
    react('wave');
  });

  // Track global cursor
  window.addEventListener('mousemove', (e) => {
    lastActivityTime = Date.now();
    isIdle = false;
    lookAt(e.clientX, e.clientY);
  });

  // Hair sway ticker with scroll velocity
  let lastScrollY = window.scrollY;
  gsap.ticker.add(() => {
    if (isReduced) return;
    const dy = Math.abs(window.scrollY - lastScrollY);
    lastScrollY = window.scrollY;
    scrollSpeedFactor = Math.min(4, 1 + dy * 0.1);

    hairSwayAngle += 0.05 * scrollSpeedFactor;
    const swayL = Math.sin(hairSwayAngle) * (3 * scrollSpeedFactor);
    const swayR = Math.cos(hairSwayAngle) * (3 * scrollSpeedFactor);

    if (strandL) strandL.style.transform = `rotate(${swayL}deg)`;
    if (strandR) strandR.style.transform = `rotate(${swayR}deg)`;
  });

  // Idle state handling (8s look around, 20s headphones bob)
  let lastActivityTime = Date.now();
  let isIdle = false;
  let headphonesOn = false;

  setInterval(() => {
    if (isReduced) return;
    const elapsed = Date.now() - lastActivityTime;
    if (elapsed > 20000 && !headphonesOn) {
      headphonesOn = true;
      // Headphone bobbing loop
      if (headphones) {
        gsap.to(headphones, { y: -85, duration: 0.5, ease: 'power2.out' });
        gsap.to(headGroup, { y: 6, repeat: -1, yoyo: true, duration: 0.5, ease: 'sine.inOut' });
      }
    } else if (elapsed > 8000 && !isIdle && !headphonesOn) {
      isIdle = true;
      // Look around slowly
      gsap.to(headGroup, {
        rotation: 6,
        duration: 2,
        yoyo: true,
        repeat: 3,
        ease: 'sine.inOut'
      });
    }
  }, 2000);

  // Mobile DeviceOrientation support
  if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', (e) => {
      if (e.gamma !== null && e.beta !== null) {
        const tiltX = Math.max(-12, Math.min(12, e.gamma * 0.4));
        const tiltY = Math.max(-10, Math.min(10, (e.beta - 45) * 0.3));
        headRotTo(tiltX);
        headYTo(tiltY);
      }
    });
  }

  // Section-driven expression triggers
  const sectionExpressions: { id: string; exp: ExpressionName }[] = [
    { id: 'hero', exp: 'smile' },
    { id: 'work', exp: 'focused' },
    { id: 'about', exp: 'smile' },
    { id: 'research', exp: 'curious' },
    { id: 'toolkit', exp: 'smirk' },
    { id: 'contact', exp: 'wink' }
  ];

  sectionExpressions.forEach(({ id, exp }) => {
    const el = document.getElementById(id);
    if (el) {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 40%',
        end: 'bottom 40%',
        onEnter: () => applyExpression(svg, exp),
        onEnterBack: () => applyExpression(svg, exp)
      });
    }
  });

  // Docking mechanism
  const dockedWrapper = document.querySelector('.avatar-docked-wrapper');
  const speechBubble = document.querySelector('.avatar-speech-bubble');
  let quoteIndex = 0;

  function dock() {
    dockedWrapper?.classList.add('is-docked');
  }

  function undock() {
    dockedWrapper?.classList.remove('is-docked');
  }

  // Trigger docking on scrolling past hero
  const heroEl = document.getElementById('hero');
  if (heroEl) {
    ScrollTrigger.create({
      trigger: heroEl,
      start: 'bottom 60%',
      onEnter: dock,
      onLeaveBack: undock
    });
  }

  // Docked avatar speech bubble click handler
  if (dockedWrapper && speechBubble) {
    dockedWrapper.addEventListener('click', () => {
      quoteIndex = (quoteIndex + 1) % SITE_CONTENT.avatarQuotes.length;
      speechBubble.textContent = SITE_CONTENT.avatarQuotes[quoteIndex];
      speechBubble.classList.add('bubble-visible');
      setTimeout(() => {
        speechBubble.classList.remove('bubble-visible');
      }, 3500);
    });
  }

  return {
    lookAt,
    setExpression: (name: ExpressionName) => applyExpression(svg, name),
    react,
    dock,
    undock
  };
}


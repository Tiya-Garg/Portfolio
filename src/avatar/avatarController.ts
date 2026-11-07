import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createAvatar, AvatarV2Instance } from './avatar.v2';
import { SITE_CONTENT } from '../content';

gsap.registerPlugin(ScrollTrigger);

export interface AvatarController {
  lookAt: (x: number, y: number) => void;
  setExpression: (name: string) => void;
  react: (type: 'nod' | 'yay' | 'wink') => void;
  dock: () => void;
  undock: () => void;
}

export function initAvatar(containerId: string): AvatarController | null {
  const container = document.getElementById(containerId);
  if (!container) return null;

  // Initialize dependency-free Avatar v2
  const avatarInstance: AvatarV2Instance = createAvatar(container);

  // Section-driven expression triggers
  const sectionExpressions: { id: string; exp: string }[] = [
    { id: 'hero', exp: 'smile' },
    { id: 'work', exp: 'focus' },
    { id: 'about', exp: 'smile' },
    { id: 'research', exp: 'curious' },
    { id: 'toolkit', exp: 'smirk' },
    { id: 'contact', exp: 'surprise' }
  ];

  sectionExpressions.forEach(({ id, exp }) => {
    const el = document.getElementById(id);
    if (el) {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 40%',
        end: 'bottom 40%',
        onEnter: () => avatarInstance.setExpression(exp),
        onEnterBack: () => avatarInstance.setExpression(exp)
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
      avatarInstance.react('nod');
      setTimeout(() => {
        speechBubble.classList.remove('bubble-visible');
      }, 3500);
    });
  }

  return {
    lookAt: avatarInstance.lookAt,
    setExpression: avatarInstance.setExpression,
    react: avatarInstance.react,
    dock,
    undock
  };
}

import './styles/tokens.css';
import './styles/base.css';
import './styles/layout.css';
import './styles/sections.css';
import './styles/avatar.css';

import { initScroll } from './core/scroll';
import { initCursor } from './core/cursor';
import { initAudio } from './core/audio';
import { initTuner } from './core/tuner';
import { runLoader } from './core/loader';
import { initEasterEggs } from './core/easterEggs';

import { renderHero, initHero } from './sections/hero';
import { renderMarquee, initMarquee } from './sections/marquee';
import { renderWork, initWork } from './sections/work';
import { renderAbout, initAbout } from './sections/about';
import { renderResearch, initResearch } from './sections/research';
import { renderToolkit, initToolkit } from './sections/toolkit';
import { renderContact, initContact } from './sections/contact';
import { createAvatar } from './avatar/avatar.v2';

const app = document.getElementById('app');

if (app) {
  app.innerHTML = `
    <!-- Accessibility Skip Link -->
    <a href="#hero" class="skip-link">Skip to main content</a>

    <!-- Subtle Film Grain Overlay -->
    <div class="film-grain" aria-hidden="true"></div>

    <!-- Oscilloscope Tuning Loader Overlay -->
    <div class="loader-overlay" role="progressbar" aria-label="Tuning signal loader">
      <canvas class="loader-canvas"></canvas>
      <div class="loader-counter">0%</div>
      <div class="loader-status">ACQUIRING CARRIER...</div>
    </div>

    <!-- Floating Top Nav Pill -->
    <header class="site-nav" role="banner">
      <nav aria-label="Main Navigation">
        <ul class="nav-links">
          <li><a href="#hero" class="nav-link active">Signal</a></li>
          <li><a href="#work" class="nav-link">Work</a></li>
          <li><a href="#about" class="nav-link">About</a></li>
          <li><a href="#research" class="nav-link">Research</a></li>
          <li><a href="#toolkit" class="nav-link">Toolkit</a></li>
          <li><a href="#contact" class="nav-link">Contact</a></li>
        </ul>
      </nav>
      <div class="nav-actions">
        <button class="audio-toggle-btn" aria-label="Toggle ambient sound (Press S)" data-cursor="link">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M11 5L6 9H2v6h4l5 4V5z"/>
            <line x1="23" y1="9" x2="17" y2="15"/>
            <line x1="17" y1="9" x2="23" y2="15"/>
          </svg>
        </button>
      </div>
    </header>

    <!-- Fixed Bottom-Left Tuner Indicator -->
    <aside class="tuner-status" aria-live="polite">
      <span class="tuner-led"></span>
      <span id="tuner-label">CH 01 · SIGNAL</span>
    </aside>

    <!-- Fixed Right Edge Waveform Scroll Progress -->
    <canvas id="scroll-progress" class="scroll-progress-canvas" aria-hidden="true"></canvas>

    <!-- Docked Avatar Companion (Bottom-Right) -->
    <div id="avatar-docked-anchor" class="avatar-docked-wrapper" data-cursor="avatar" role="button" aria-label="Tiya companion avatar">
      <div class="avatar-speech-bubble">Ask me about leader election.</div>
      <div id="docked-avatar-inner" style="width:100%; height:100%;"></div>
    </div>

    <!-- Main Content Flow -->
    <main id="main-content">
      ${renderHero()}
      ${renderMarquee()}
      ${renderWork()}
      ${renderAbout()}
      ${renderResearch()}
      ${renderToolkit()}
      ${renderContact()}
    </main>
  `;

  // Mount docked companion avatar instance
  const dockedInner = document.getElementById('docked-avatar-inner');
  if (dockedInner) {
    createAvatar(dockedInner);
  }

  // Boot sequence
  initScroll();
  initCursor();
  const audio = initAudio();
  initTuner();

  // Wire sound button click
  document.querySelector('.audio-toggle-btn')?.addEventListener('click', () => {
    audio.toggleAudio();
  });

  // Mount components after loader completion
  runLoader(() => {
    initHero();
    initMarquee();
    initWork();
    initAbout();
    initResearch();
    initToolkit();
    initContact();
  });

  // Easter eggs
  initEasterEggs(
    () => {
      // Konami triggered
    },
    () => {
      // Raft keyword triggered
    }
  );
}

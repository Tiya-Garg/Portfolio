export function initLipiVerseGraphic(containerId: string): void {
  const container = document.getElementById(containerId);
  if (!container) return;

  const verses = [
    { script: 'Devanagari', text: 'अस्तित्व की हर धड़कन में एक मौन संकेत गूँजता है।', lang: 'Hindi' },
    { script: 'Bengali', text: 'অস্তিত্বের প্রতিটি স্পন্দনে একটি নীরব সংকেত প্রতিধ্বনিত হয়।', lang: 'Bengali' },
    { script: 'Telugu', text: 'అస్తిత్వంలోని ప్రతి స్పందనలోనూ ఒక నిశ్శబ్ద సంకేతం ప్రతిధ్వనిస్తుంది.', lang: 'Telugu' },
    { script: 'Latin/English', text: 'Within every pulse of existence echoes a silent signal.', lang: 'English' }
  ];

  let currentIdx = 0;

  container.innerHTML = `
    <div class="lipiverse-widget" style="display:flex; flex-direction:column; gap:1.25rem; width:100%; max-width:540px; background:#141418; padding:1.5rem; border-radius:8px; border:1px solid rgba(255,255,255,0.1); color:#EDE7DA;">
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <span class="mono-label" style="color:#C8F031;">Multilingual Prompt Orchestration</span>
        <span id="current-lang" style="font-family:var(--font-mono); font-size:0.75rem; color:#FF5B3A;">Script: Hindi</span>
      </div>

      <!-- Verse Card -->
      <div style="min-height:90px; display:flex; align-items:center; justify-content:center; background:#1C1B24; border-radius:6px; padding:1.25rem; text-align:center;">
        <p id="verse-display" style="font-size:1.15rem; line-height:1.6; font-family:var(--font-serif); transition:opacity 0.3s ease;">
          ${verses[0].text}
        </p>
      </div>

      <!-- Drift Meter Comparison -->
      <div style="display:flex; flex-direction:column; gap:0.6rem; font-family:var(--font-mono); font-size:0.75rem;">
        <div style="display:flex; justify-content:space-between;">
          <span>Baseline Zero-Shot Drift:</span>
          <span style="color:#FF5B3A;">42% Semantic Drift</span>
        </div>
        <div style="width:100%; height:6px; background:#2A2A2E; border-radius:3px; overflow:hidden;">
          <div style="width:42%; height:100%; background:#FF5B3A;"></div>
        </div>

        <div style="display:flex; justify-content:space-between; margin-top:0.4rem;">
          <span>Structured Prompt Pipeline:</span>
          <span style="color:#C8F031;">7% Semantic Drift (Preserved Tone)</span>
        </div>
        <div style="width:100%; height:6px; background:#2A2A2E; border-radius:3px; overflow:hidden;">
          <div style="width:7%; height:100%; background:#C8F031;"></div>
        </div>
      </div>

      <button id="btn-morph-verse" style="padding:0.5rem 1rem; background:#2A3CFF; color:#FFF; font-family:var(--font-mono); font-size:0.75rem; border-radius:4px; align-self:center;">
        Morph Script ⟳
      </button>

      <div style="font-family:var(--font-mono); font-size:0.65rem; color:#888; text-align:center;">
        Illustrative original verse demonstration. Tone preserved across 3 Indic language pairs.
      </div>
    </div>
  `;

  const btn = container.querySelector('#btn-morph-verse');
  const verseDisplay = container.querySelector('#verse-display') as HTMLElement;
  const currentLang = container.querySelector('#current-lang') as HTMLElement;

  btn?.addEventListener('click', () => {
    currentIdx = (currentIdx + 1) % verses.length;
    verseDisplay.style.opacity = '0';
    setTimeout(() => {
      verseDisplay.textContent = verses[currentIdx].text;
      currentLang.textContent = `Script: ${verses[currentIdx].lang}`;
      verseDisplay.style.opacity = '1';
    }, 250);
  });
}

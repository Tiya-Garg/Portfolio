export function initExVeroGraphic(containerId: string): void {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <div style="background:#141418; padding:1.25rem; border-radius:8px; border:1px solid rgba(255,255,255,0.1); color:#EDE7DA; display:flex; flex-direction:column; gap:0.75rem;">
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <span class="mono-label" style="color:#C8F031;">Edge Delta Consensus</span>
        <span id="exvero-badge" style="background:#2A3CFF; color:#FFF; font-family:var(--font-mono); font-size:0.65rem; padding:0.2rem 0.5rem; border-radius:3px;">CONFIRMED</span>
      </div>
      <div style="font-family:var(--font-mono); font-size:0.75rem; color:#AAA; background:#1C1B24; padding:0.75rem; border-radius:4px;">
        <div>Peer Node A (Edge): Fact Vector v1 (Score 0.82)</div>
        <div>Peer Node B (Edge): Fact Vector v2 (Score 0.79)</div>
        <div id="consensus-text" style="color:#C8F031; margin-top:0.4rem;">Hub Resolved: Delta merged with 94% consensus.</div>
      </div>
      <button id="btn-dispute" style="padding:0.4rem 0.8rem; background:#2A2A2E; color:#FFF; font-family:var(--font-mono); font-size:0.7rem; border-radius:4px; border:1px solid rgba(255,255,255,0.2); cursor:pointer;">
        Inject Divergent Fact
      </button>
    </div>
  `;

  const btn = container.querySelector('#btn-dispute');
  const badge = container.querySelector('#exvero-badge') as HTMLElement;
  const text = container.querySelector('#consensus-text') as HTMLElement;

  let disputed = false;
  btn?.addEventListener('click', () => {
    disputed = !disputed;
    if (disputed) {
      badge.textContent = 'DISPUTED';
      badge.style.background = '#FF5B3A';
      text.textContent = 'Dispute Triggered: Quarantine applied, factual isolation active.';
      text.style.color = '#FF5B3A';
    } else {
      badge.textContent = 'CONFIRMED';
      badge.style.background = '#2A3CFF';
      text.textContent = 'Hub Resolved: Delta merged with 94% consensus.';
      text.style.color = '#C8F031';
    }
  });
}

export function initPanchnamaGraphic(containerId: string): void {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <div style="background:#141418; padding:1.25rem; border-radius:8px; border:1px solid rgba(255,255,255,0.1); color:#EDE7DA; display:flex; flex-direction:column; gap:0.75rem;">
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <span class="mono-label" style="color:#C8F031;">SHA-256 Ledger Chain</span>
        <span id="panch-status" style="color:#C8F031; font-family:var(--font-mono); font-size:0.65rem;">LEDGER VALID</span>
      </div>
      <div id="hash-chain" style="display:flex; gap:0.5rem; overflow-x:auto; padding:0.5rem 0;">
        <div class="chain-block" style="background:#1C1B24; border:1px solid #C8F031; padding:0.5rem; border-radius:4px; font-family:var(--font-mono); font-size:0.65rem; min-width:80px; text-align:center;">
          <div>B#1</div>
          <div style="color:#888;">a7f2..</div>
        </div>
        <div class="chain-block" style="background:#1C1B24; border:1px solid #C8F031; padding:0.5rem; border-radius:4px; font-family:var(--font-mono); font-size:0.65rem; min-width:80px; text-align:center;">
          <div>B#2</div>
          <div style="color:#888;">4d1e..</div>
        </div>
        <div class="chain-block" id="tamper-target" style="background:#1C1B24; border:1px solid #C8F031; padding:0.5rem; border-radius:4px; font-family:var(--font-mono); font-size:0.65rem; min-width:80px; text-align:center;">
          <div>B#3</div>
          <div style="color:#888;">9c0b..</div>
        </div>
      </div>
      <button id="btn-tamper" style="padding:0.4rem 0.8rem; background:#FF5B3A; color:#FFF; font-family:var(--font-mono); font-size:0.7rem; border-radius:4px; cursor:pointer;">
        Simulate Bit Tamper
      </button>
    </div>
  `;

  const btn = container.querySelector('#btn-tamper');
  const target = container.querySelector('#tamper-target') as HTMLElement;
  const status = container.querySelector('#panch-status') as HTMLElement;

  let tampered = false;
  btn?.addEventListener('click', () => {
    tampered = !tampered;
    if (tampered) {
      target.style.borderColor = '#FF5B3A';
      target.style.background = '#3A1818';
      status.textContent = 'TAMPER DETECTED: HASH MISMATCH';
      status.style.color = '#FF5B3A';
    } else {
      target.style.borderColor = '#C8F031';
      target.style.background = '#1C1B24';
      status.textContent = 'LEDGER VALID';
      status.style.color = '#C8F031';
    }
  });
}

export function initSecondShiftGraphic(containerId: string): void {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <div style="background:#141418; padding:1.25rem; border-radius:8px; border:1px solid rgba(255,255,255,0.1); color:#EDE7DA; display:flex; flex-direction:column; gap:0.75rem;">
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <span class="mono-label" style="color:#C8F031;">Gemini Vector Skill Alignment</span>
        <span style="color:#2A3CFF; font-family:var(--font-mono); font-size:0.65rem;">COSINE MATCH</span>
      </div>
      <div style="display:flex; justify-content:space-between; align-items:center; background:#1C1B24; padding:0.75rem; border-radius:4px; font-family:var(--font-mono); font-size:0.7rem;">
        <div>Candidate Vector: [NLP, Python]</div>
        <div style="color:#C8F031; font-weight:bold;">89% Match</div>
        <div>Target: ML Systems Engineer</div>
      </div>
      <div style="font-family:var(--font-mono); font-size:0.65rem; color:#888; text-align:center;">
        Dynamic skill bridge powered by Sentence-Transformers & Gemini API.
      </div>
    </div>
  `;
}


export function initFreqBridgeGraphic(containerId: string): void {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <div class="freqbridge-widget" style="display:flex; flex-direction:column; gap:1rem; width:100%; max-width:540px; background:#141418; padding:1.25rem; border-radius:8px; border:1px solid rgba(255,255,255,0.1); color:#EDE7DA;">
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <span class="mono-label" style="color:#C8F031;">50Hz (East) ⟷ 60Hz (West) HVDC Bridge</span>
        <span id="hvdc-load" style="font-family:var(--font-mono); font-size:0.75rem; color:#2A3CFF;">HVDC Flow: 820 MW / 1.2 GW</span>
      </div>

      <svg id="freqbridge-svg" viewBox="0 0 500 160" style="width:100%; height:140px; overflow:visible;">
        <!-- 50Hz Wave Left -->
        <path id="wave-50hz" stroke="#2A3CFF" stroke-width="2.5" fill="none" />
        <text x="50" y="25" fill="#2A3CFF" font-family="var(--font-mono)" font-size="11">50.0 Hz Grid</text>

        <!-- Central Converter Unit -->
        <g id="converter-box" transform="translate(210, 30)">
          <rect width="80" height="90" rx="6" fill="#1C1B24" stroke="#C8F031" stroke-width="2" />
          <text x="40" y="35" text-anchor="middle" fill="#FFFFFF" font-family="var(--font-mono)" font-size="9" font-weight="bold">1.2 GW</text>
          <text x="40" y="55" text-anchor="middle" fill="#C8F031" font-family="var(--font-mono)" font-size="9">HVDC</text>
          <text x="40" y="75" text-anchor="middle" fill="#888888" font-family="var(--font-mono)" font-size="8">AUCTION</text>
        </g>

        <!-- 60Hz Wave Right -->
        <path id="wave-60hz" stroke="#FF5B3A" stroke-width="2.5" fill="none" />
        <text x="370" y="25" fill="#FF5B3A" font-family="var(--font-mono)" font-size="11">60.0 Hz Grid</text>
      </svg>

      <!-- Weather & Controls -->
      <div style="display:flex; flex-direction:column; gap:0.5rem; font-family:var(--font-mono); font-size:0.75rem;">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <span>Open-Meteo Cloud Cover / Wind:</span>
          <span id="weather-val" style="color:#C8F031;">Moderate (45%)</span>
        </div>
        <input type="range" id="weather-slider" min="0" max="100" value="45" style="width:100%; accent-color:#C8F031;">
      </div>

      <!-- Recovery Race Metrics -->
      <div style="display:flex; justify-content:space-between; align-items:center; background:#1C1B24; padding:0.6rem; border-radius:4px;">
        <button id="btn-crisis" style="padding:0.4rem 0.8rem; background:#FF5B3A; color:#FFF; font-family:var(--font-mono); font-size:0.75rem; border-radius:4px; font-weight:bold;">Trigger Grid Dip</button>
        <div style="text-align:right; font-family:var(--font-mono); font-size:0.7rem;">
          <div>Multi-Agent: <strong id="agent-time" style="color:#C8F031;">≈12 s</strong></div>
          <div>PID Baseline: <span id="pid-time" style="color:#888;">≈47 s (3.9× slower)</span></div>
        </div>
      </div>

      <div style="font-family:var(--font-mono); font-size:0.65rem; color:#888; text-align:center;">
        Simulation based on FAR AWAY 2026 project testing results.
      </div>
    </div>
  `;

  const wave50 = container.querySelector('#wave-50hz') as SVGPathElement;
  const wave60 = container.querySelector('#wave-60hz') as SVGPathElement;
  const slider = container.querySelector('#weather-slider') as HTMLInputElement;
  const weatherVal = container.querySelector('#weather-val') as HTMLElement;
  const hvdcLoad = container.querySelector('#hvdc-load') as HTMLElement;
  const btnCrisis = container.querySelector('#btn-crisis') as HTMLButtonElement;
  const agentTime = container.querySelector('#agent-time') as HTMLElement;

  let phase = 0;
  let weatherFactor = 0.45;

  function renderGridWaves() {
    let d50 = '';
    let d60 = '';

    // Draw 50Hz (slower frequency, left half 0 to 210)
    for (let x = 0; x <= 210; x += 3) {
      const y = 75 + Math.sin(x * 0.08 + phase) * (20 * weatherFactor + 10);
      d50 += (x === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`);
    }

    // Draw 60Hz (higher frequency, right half 290 to 500)
    for (let x = 290; x <= 500; x += 3) {
      const y = 75 + Math.sin(x * 0.12 + phase * 1.2) * (20 * (1 - weatherFactor) + 10);
      d60 += (x === 290 ? `M ${x} ${y}` : ` L ${x} ${y}`);
    }

    if (wave50) wave50.setAttribute('d', d50);
    if (wave60) wave60.setAttribute('d', d60);

    phase += 0.08;
    requestAnimationFrame(renderGridWaves);
  }
  requestAnimationFrame(renderGridWaves);

  slider.addEventListener('input', (e) => {
    weatherFactor = Number((e.target as HTMLInputElement).value) / 100;
    weatherVal.textContent = `${Math.round(weatherFactor * 100)}%`;
    const mw = Math.round(500 + weatherFactor * 650);
    hvdcLoad.textContent = `HVDC Flow: ${mw} MW / 1.2 GW`;
  });

  btnCrisis.addEventListener('click', () => {
    agentTime.textContent = 'Stabilizing in 12.1s...';
    btnCrisis.disabled = true;
    setTimeout(() => {
      agentTime.textContent = 'Stabilized in 12.3s (≈3.9× faster)';
      btnCrisis.disabled = false;
    }, 1500);
  });
}


export function initEventGuardGraphic(containerId: string): void {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <div class="eventguard-widget" style="display:flex; flex-direction:column; gap:1rem; width:100%; max-width:540px; background:#141418; padding:1.25rem; border-radius:8px; border:1px solid rgba(255,255,255,0.1); color:#EDE7DA;">
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <span class="mono-label" style="color:#C8F031;">Bengaluru Traffic Incident Command</span>
        <span id="knapsack-status" style="font-family:var(--font-mono); font-size:0.75rem; color:#FF5B3A;">PuLP Allocated: 15 / 15 Zones</span>
      </div>

      <svg id="eventguard-map-svg" viewBox="0 0 500 200" style="width:100%; height:160px; background:#0B0B0E; border-radius:4px; overflow:visible;">
        <!-- Stylized Dark Grid Lines -->
        <g stroke="rgba(255,255,255,0.06)" stroke-width="1">
          <line x1="0" y1="50" x2="500" y2="50"/>
          <line x1="0" y1="100" x2="500" y2="100"/>
          <line x1="0" y1="150" x2="500" y2="150"/>
          <line x1="100" y1="0" x2="100" y2="200"/>
          <line x1="200" y1="0" x2="200" y2="200"/>
          <line x1="300" y1="0" x2="300" y2="200"/>
          <line x1="400" y1="0" x2="400" y2="200"/>
        </g>

        <!-- Dynamic Route Perimeter -->
        <path id="shockwave-route" d="M 60 140 L 180 80 L 280 120 L 420 60" fill="none" stroke="#2A3CFF" stroke-width="3" stroke-dasharray="6 4"/>

        <!-- High-Burden Incident Pings -->
        <g id="incident-pings">
          <circle cx="180" cy="80" r="14" fill="rgba(255,91,58,0.25)"/>
          <circle cx="180" cy="80" r="6" fill="#FF5B3A"/>
          <circle cx="280" cy="120" r="18" fill="rgba(255,91,58,0.25)"/>
          <circle cx="280" cy="120" r="8" fill="#FF5B3A"/>
          <circle cx="380" cy="90" r="12" fill="rgba(200,240,49,0.25)"/>
          <circle cx="380" cy="90" r="5" fill="#C8F031"/>
        </g>
      </svg>

      <!-- Budget & Coverage Sliders -->
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem; font-family:var(--font-mono); font-size:0.75rem;">
        <div>
          <label>Budget Constraint:</label>
          <input type="range" id="budget-slider" min="10" max="100" value="75" style="width:100%; accent-color:#FF5B3A;">
        </div>
        <div>
          <label>Coverage Radius:</label>
          <input type="range" id="coverage-slider" min="1" max="15" value="12" style="width:100%; accent-color:#2A3CFF;">
        </div>
      </div>

      <div style="font-family:var(--font-mono); font-size:0.65rem; color:#888; text-align:center;">
        PuLP multi-objective knapsack engine on 4-month incident registry.
      </div>
    </div>
  `;

  const budgetSlider = container.querySelector('#budget-slider') as HTMLInputElement;
  const coverageSlider = container.querySelector('#coverage-slider') as HTMLInputElement;
  const status = container.querySelector('#knapsack-status') as HTMLElement;
  const route = container.querySelector('#shockwave-route') as SVGPathElement;

  function updateKnapsack() {
    const b = budgetSlider.value;
    const c = coverageSlider.value;
    status.textContent = `PuLP Optimal: ${c} / 15 Zones Covered (Budget: ${b}%)`;
    route.setAttribute('stroke-width', `${2 + Number(b) * 0.03}`);
  }

  budgetSlider?.addEventListener('input', updateKnapsack);
  coverageSlider?.addEventListener('input', updateKnapsack);
}

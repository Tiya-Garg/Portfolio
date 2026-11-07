export function initAntennaGraphic(containerId: string): void {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <div class="antenna-widget" style="display:flex; flex-direction:column; gap:1.25rem; width:100%; max-width:640px; background:rgba(255,255,255,0.08); padding:1.5rem; border-radius:12px; border:1px solid rgba(255,255,255,0.2); backdrop-filter:blur(8px); color:#FFFFFF;">
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <span class="mono-label" style="color:#C8F031;">47 GHz V-Band Microstrip Simulation</span>
        <span id="antenna-metrics" style="font-family:var(--font-mono); font-size:0.75rem; color:#FFFFFF;">Return Loss: -28.4 dB · Gain: 7.2 dBi</span>
      </div>

      <div style="display:grid; grid-template-columns: 1fr 1fr; gap:1rem; align-items:center;">
        <!-- Left: Physical Patch Antenna Geometry -->
        <div style="display:flex; flex-direction:column; align-items:center; gap:0.5rem;">
          <span style="font-family:var(--font-mono); font-size:0.7rem; color:#EDE7DA;">Patch Geometry (HFSS Model)</span>
          <svg id="antenna-patch-svg" viewBox="0 0 200 160" style="width:100%; height:140px; background:#1C1B24; border-radius:6px; border:1px solid rgba(255,255,255,0.15);">
            <!-- Ground Plane -->
            <rect x="25" y="20" width="150" height="120" rx="4" fill="#2A2A2E" stroke="#444" stroke-width="1.5" />
            <!-- Copper Patch -->
            <rect x="45" y="35" width="110" height="90" rx="2" fill="#D4AF37" stroke="#AA8012" stroke-width="1.5" />
            <!-- Microstrip Feedline -->
            <rect x="94" y="125" width="12" height="25" fill="#D4AF37" stroke="#AA8012" stroke-width="1.5" />
            <!-- Interactive Optimized Slot -->
            <rect id="antenna-slot" x="70" y="70" width="60" height="14" rx="2" fill="#1C1B24" stroke="#0E0E10" stroke-width="1.5" />
          </svg>
        </div>

        <!-- Right: Polar Radiation Pattern Plot -->
        <div style="display:flex; flex-direction:column; align-items:center; gap:0.5rem;">
          <span style="font-family:var(--font-mono); font-size:0.7rem; color:#EDE7DA;">Polar Radiation Pattern</span>
          <svg id="antenna-polar-svg" viewBox="0 0 200 160" style="width:100%; height:140px; background:#1C1B24; border-radius:6px; border:1px solid rgba(255,255,255,0.15);">
            <!-- Polar Grids -->
            <circle cx="100" cy="80" r="60" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1" />
            <circle cx="100" cy="80" r="40" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1" />
            <circle cx="100" cy="80" r="20" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1" />
            <line x1="100" y1="20" x2="100" y2="140" stroke="rgba(255,255,255,0.1)" />
            <line x1="40" y1="80" x2="160" y2="80" stroke="rgba(255,255,255,0.1)" />

            <!-- Main Radiation Lobe -->
            <path id="radiation-lobe" fill="rgba(200,240,49,0.3)" stroke="#C8F031" stroke-width="2" />
          </svg>
        </div>
      </div>

      <!-- Slot length slider -->
      <div style="display:flex; flex-direction:column; gap:0.4rem; font-family:var(--font-mono); font-size:0.75rem;">
        <div style="display:flex; justify-content:space-between;">
          <span>Slot Length:</span>
          <span id="slot-length-val" style="color:#C8F031;">1.85 mm</span>
        </div>
        <input type="range" id="slot-slider" min="30" max="90" value="60" style="width:100%; accent-color:#C8F031;">
      </div>

      <div style="font-family:var(--font-mono); font-size:0.65rem; color:rgba(255,255,255,0.7); text-align:center;">
        Illustrative visualisation, not direct HFSS simulation output.
      </div>
    </div>
  `;

  const slider = container.querySelector('#slot-slider') as HTMLInputElement;
  const slotEl = container.querySelector('#antenna-slot') as SVGRectElement;
  const slotVal = container.querySelector('#slot-length-val') as HTMLElement;
  const lobe = container.querySelector('#radiation-lobe') as SVGPathElement;
  const metrics = container.querySelector('#antenna-metrics') as HTMLElement;

  function updateLobe(slotWidth: number) {
    // Slot width in SVG units (30 to 90) -> mapped to mm
    const mm = (slotWidth / 32).toFixed(2);
    slotVal.textContent = `${mm} mm`;
    slotEl.setAttribute('width', `${slotWidth}`);
    slotEl.setAttribute('x', `${100 - slotWidth / 2}`);

    // Morph radiation lobe based on tuning
    const lobeRadius = 30 + (slotWidth / 90) * 35;
    const lobeWidth = 20 + (1 - slotWidth / 90) * 25;

    const path = `M 100 80 C ${100 - lobeWidth} ${80 - lobeRadius * 0.4} ${100 - lobeWidth * 0.5} ${80 - lobeRadius} 100 ${80 - lobeRadius} C ${100 + lobeWidth * 0.5} ${80 - lobeRadius} ${100 + lobeWidth} ${80 - lobeRadius * 0.4} 100 80 Z`;
    lobe.setAttribute('d', path);

    const loss = (-24 - (slotWidth / 90) * 6).toFixed(1);
    const gain = (6.4 + (slotWidth / 90) * 1.2).toFixed(1);
    metrics.textContent = `Return Loss: ${loss} dB · Gain: ${gain} dBi`;
  }

  updateLobe(60);

  slider.addEventListener('input', (e) => {
    updateLobe(Number((e.target as HTMLInputElement).value));
  });
}

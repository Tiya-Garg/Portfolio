export function initDistribuQGraphic(containerId: string): void {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <div class="distribuq-widget" style="display:flex; flex-direction:column; gap:1rem; width:100%; max-width:540px; background:#141418; padding:1.25rem; border-radius:8px; border:1px solid rgba(255,255,255,0.1); color:#EDE7DA;">
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <span class="mono-label" style="color:#C8F031;">Raft Cluster Simulation</span>
        <span id="distribuq-status" style="font-family:var(--font-mono); font-size:0.75rem; color:#FF5B3A;">Leader: Node 1 (Term 1)</span>
      </div>
      
      <svg id="distribuq-svg" viewBox="0 0 500 280" style="width:100%; height:200px; overflow:visible;">
        <!-- Ring of 5 Raft Nodes -->
        <g id="raft-links" stroke="rgba(255,255,255,0.15)" stroke-width="1.5" stroke-dasharray="4 4">
          <line x1="160" y1="80" x2="250" y2="40"/>
          <line x1="250" y1="40" x2="340" y2="80"/>
          <line x1="340" y1="80" x2="300" y2="160"/>
          <line x1="300" y1="160" x2="200" y2="160"/>
          <line x1="200" y1="160" x2="160" y2="80"/>
        </g>
        
        <!-- Nodes -->
        <g id="raft-nodes">
          <g id="node-1" transform="translate(250, 40)" class="cluster-node">
            <circle r="18" fill="#FF5B3A" stroke="#FFFFFF" stroke-width="2"/>
            <text text-anchor="middle" dy="4" fill="#FFFFFF" font-family="var(--font-mono)" font-size="10" font-weight="bold">L1</text>
          </g>
          <g id="node-2" transform="translate(340, 80)" class="cluster-node">
            <circle r="16" fill="#2A3CFF" stroke="#FFFFFF" stroke-width="1.5"/>
            <text text-anchor="middle" dy="4" fill="#FFFFFF" font-family="var(--font-mono)" font-size="10">F2</text>
          </g>
          <g id="node-3" transform="translate(300, 160)" class="cluster-node">
            <circle r="16" fill="#2A3CFF" stroke="#FFFFFF" stroke-width="1.5"/>
            <text text-anchor="middle" dy="4" fill="#FFFFFF" font-family="var(--font-mono)" font-size="10">F3</text>
          </g>
          <g id="node-4" transform="translate(200, 160)" class="cluster-node">
            <circle r="16" fill="#2A3CFF" stroke="#FFFFFF" stroke-width="1.5"/>
            <text text-anchor="middle" dy="4" fill="#FFFFFF" font-family="var(--font-mono)" font-size="10">F4</text>
          </g>
          <g id="node-5" transform="translate(160, 80)" class="cluster-node">
            <circle r="16" fill="#2A3CFF" stroke="#FFFFFF" stroke-width="1.5"/>
            <text text-anchor="middle" dy="4" fill="#FFFFFF" font-family="var(--font-mono)" font-size="10">F5</text>
          </g>
        </g>

        <!-- 3 Worker Nodes below -->
        <g id="worker-nodes">
          <g id="worker-1" transform="translate(140, 240)">
            <rect x="-24" y="-12" width="48" height="24" rx="4" fill="#2A2A2E" stroke="#C8F031" stroke-width="1.5"/>
            <text text-anchor="middle" dy="4" fill="#C8F031" font-family="var(--font-mono)" font-size="9">WRK 1</text>
          </g>
          <g id="worker-2" transform="translate(250, 240)">
            <rect x="-24" y="-12" width="48" height="24" rx="4" fill="#2A2A2E" stroke="#C8F031" stroke-width="1.5"/>
            <text text-anchor="middle" dy="4" fill="#C8F031" font-family="var(--font-mono)" font-size="9">WRK 2</text>
          </g>
          <g id="worker-3" transform="translate(360, 240)">
            <rect x="-24" y="-12" width="48" height="24" rx="4" fill="#2A2A2E" stroke="#C8F031" stroke-width="1.5"/>
            <text text-anchor="middle" dy="4" fill="#C8F031" font-family="var(--font-mono)" font-size="9">WRK 3</text>
          </g>
        </g>

        <!-- Flying Task Particle -->
        <circle id="task-dot" r="4" fill="#C8F031" cx="250" cy="40" opacity="0"/>
      </svg>

      <!-- Control panel -->
      <div style="display:flex; flex-wrap:wrap; gap:0.5rem; justify-content:center;">
        <button id="btn-kill-leader" style="padding:0.35rem 0.65rem; background:#FF5B3A; color:#FFF; font-family:var(--font-mono); font-size:0.7rem; border-radius:4px;">Kill Leader</button>
        <button id="btn-kill-worker" style="padding:0.35rem 0.65rem; background:#2A3CFF; color:#FFF; font-family:var(--font-mono); font-size:0.7rem; border-radius:4px;">Kill Worker</button>
        <button id="btn-partition" style="padding:0.35rem 0.65rem; background:#2A2A2E; color:#FFF; font-family:var(--font-mono); font-size:0.7rem; border-radius:4px; border:1px solid rgba(255,255,255,0.2);">Partition Net</button>
        <button id="btn-reset" style="padding:0.35rem 0.65rem; background:transparent; color:#EDE7DA; font-family:var(--font-mono); font-size:0.7rem; border-radius:4px; border:1px solid rgba(255,255,255,0.2);">Reset</button>
      </div>

      <div style="font-family:var(--font-mono); font-size:0.65rem; color:#888; text-align:center;">
        Illustration of the consensus algorithm, not live code.
      </div>
    </div>
  `;

  const statusText = container.querySelector('#distribuq-status') as HTMLElement;
  const node1 = container.querySelector('#node-1 circle') as SVGCircleElement;
  const node2 = container.querySelector('#node-2 circle') as SVGCircleElement;
  const node2Text = container.querySelector('#node-2 text') as SVGTextElement;
  const worker2 = container.querySelector('#worker-2 rect') as SVGRectElement;
  const links = container.querySelector('#raft-links') as SVGElement;
  const taskDot = container.querySelector('#task-dot') as SVGCircleElement;

  // Kill Leader action
  container.querySelector('#btn-kill-leader')?.addEventListener('click', () => {
    node1.setAttribute('fill', '#444');
    statusText.textContent = 'Node 1 failed! Election timeout...';
    setTimeout(() => {
      node2.setAttribute('fill', '#FF5B3A');
      node2Text.textContent = 'L2';
      statusText.textContent = 'Elected Node 2 (Term 2) by majority (4/5)';
    }, 700);
  });

  // Kill Worker action (reassignment)
  container.querySelector('#btn-kill-worker')?.addEventListener('click', () => {
    worker2.setAttribute('stroke', '#FF5B3A');
    worker2.setAttribute('fill', '#3A1818');
    statusText.textContent = 'Worker 2 dead. Re-assigning orphaned tasks to Worker 3...';
  });

  // Partition network
  container.querySelector('#btn-partition')?.addEventListener('click', () => {
    links.setAttribute('stroke', '#FF5B3A');
    statusText.textContent = 'Partition active: [Node 1,2] vs [Node 3,4,5]. Quorum intact on right.';
  });

  // Reset
  container.querySelector('#btn-reset')?.addEventListener('click', () => {
    node1.setAttribute('fill', '#FF5B3A');
    node2.setAttribute('fill', '#2A3CFF');
    node2Text.textContent = 'F2';
    worker2.setAttribute('stroke', '#C8F031');
    worker2.setAttribute('fill', '#2A2A2E');
    links.setAttribute('stroke', 'rgba(255,255,255,0.15)');
    statusText.textContent = 'Leader: Node 1 (Term 1)';
  });
}


export function initEasterEggs(onKonami: () => void, onRaft: () => void): void {
  // Konami Code: Up Up Down Down Left Right Left Right B A
  const konamiSeq = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'b', 'a'
  ];
  let konamiIndex = 0;

  // Typed word 'raft'
  const raftSeq = ['r', 'a', 'f', 't'];
  let raftIndex = 0;

  window.addEventListener('keydown', (e) => {
    // Check Konami
    if (e.key.toLowerCase() === konamiSeq[konamiIndex].toLowerCase()) {
      konamiIndex++;
      if (konamiIndex === konamiSeq.length) {
        konamiIndex = 0;
        triggerKonamiSwap();
        onKonami();
      }
    } else {
      konamiIndex = 0;
    }

    // Check Raft
    if (e.key.toLowerCase() === raftSeq[raftIndex]) {
      raftIndex++;
      if (raftIndex === raftSeq.length) {
        raftIndex = 0;
        showToast('RAFT CONSENSUS: Leader elected with majority quorum (3/5 nodes).');
        onRaft();
      }
    } else {
      raftIndex = 0;
    }
  });

  function triggerKonamiSwap() {
    document.body.style.transition = 'filter 0.5s ease';
    document.body.style.filter = 'invert(1) hue-rotate(180deg)';
    showToast('🎉 KONAMI UNLOCKED: Inverted Signal Matrix (5s)');
    setTimeout(() => {
      document.body.style.filter = 'none';
    }, 5000);
  }

  function showToast(msg: string) {
    const existing = document.querySelector('.signal-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'signal-toast';
    toast.style.cssText = `
      position: fixed;
      top: 5rem;
      left: 50%;
      transform: translateX(-50%);
      background: #0E0E10;
      color: #C8F031;
      border: 1px solid #C8F031;
      padding: 0.75rem 1.5rem;
      font-family: var(--font-mono);
      font-size: 0.8rem;
      border-radius: 4px;
      z-index: 1000;
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
      pointer-events: none;
      animation: fadeInOut 4s forwards;
    `;
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 4000);
  }
}

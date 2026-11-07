export function checkReducedMotion(): boolean {
  const query = window.matchMedia('(prefers-reduced-motion: reduce)');
  return query.matches;
}

export function onReducedMotionChange(callback: (reduced: boolean) => void): void {
  const query = window.matchMedia('(prefers-reduced-motion: reduce)');
  query.addEventListener('change', (e) => {
    callback(e.matches);
  });
}

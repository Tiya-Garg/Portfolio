// Tiya avatar v2 — dependency-free.
export const AVATAR_V2_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 460" role="img" aria-label="Illustrated avatar of Tiya wearing blue headphones and a coral hoodie">
<style>
.ink{stroke:#15141B;stroke-linejoin:round;stroke-linecap:round}
#arcs path{fill:none;stroke:#2A3CFF;stroke-width:5;stroke-linecap:round;opacity:0}
.listening #arcs path{animation:ping 1.1s ease-out infinite}
.listening #arcs path:nth-child(2n){animation-delay:.25s}
.listening #arcs path:nth-child(3n){animation-delay:.5s}
@keyframes ping{0%{opacity:0;transform:scale(.85)}30%{opacity:.9}100%{opacity:0;transform:scale(1.18)}}
#arcs path{transform-box:fill-box;transform-origin:center}
</style>
<defs>
<clipPath id="clipL"><ellipse cx="168" cy="224" rx="17" ry="12"/></clipPath>
<clipPath id="clipR"><ellipse cx="232" cy="224" rx="17" ry="12"/></clipPath>
</defs>

<g id="hair-back"><path class="ink" stroke-width="4" fill="#15141B" d="M112 205C98 112 148 60 200 60S302 112 288 205C296 270 304 330 318 392C322 412 300 418 282 412L118 412C100 418 78 412 82 392C96 330 104 270 112 205Z"/>
<path d="M150 100C132 150 126 230 122 330M250 100C268 150 274 230 278 330" stroke="#2B2935" stroke-width="5" fill="none" stroke-linecap="round" opacity=".8"/></g>

<g id="torso"><path class="ink" stroke-width="4" fill="#FF5B3A" d="M26 462C26 402 66 372 138 360L262 360C334 372 374 402 374 462Z"/>
<path d="M262 360C334 372 374 402 374 462L300 462C300 410 286 380 262 360Z" fill="#D93F1F" opacity=".55"/>
<path class="ink" stroke-width="4" fill="#D93F1F" d="M132 364C136 334 164 322 200 322S264 334 268 364Z"/>
<path class="ink" stroke-width="4" fill="#15141B" d="M166 358C176 376 224 376 234 358L224 410L176 410Z"/>
<path d="M200 380V462" stroke="#fff" stroke-width="3" stroke-dasharray="7 7" stroke-linecap="round"/>
<path d="M180 372C176 392 174 410 172 424M220 372C224 392 226 410 228 424" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round"/>
<circle cx="172" cy="428" r="5.5" fill="#C8F031" stroke="#15141B" stroke-width="3"/><circle cx="228" cy="428" r="5.5" fill="#C8F031" stroke="#15141B" stroke-width="3"/></g>

<g id="neck"><path class="ink" stroke-width="4" fill="#F0B994" d="M171 280L171 346C171 366 229 366 229 346L229 280Z"/>
<path d="M173 284L227 284L227 312C214 324 186 324 173 312Z" fill="#DB9A74"/></g>

<g id="locks"><path class="ink" stroke-width="4" fill="#15141B" d="M106 250C96 300 92 352 96 398C98 420 126 424 132 404C140 360 142 312 140 262Z"/>
<path class="ink" stroke-width="4" fill="#15141B" d="M294 250C304 300 308 352 304 398C302 420 274 424 268 404C260 360 258 312 260 262Z"/></g>

<g id="head">
<path class="ink" stroke-width="4" fill="#F0B994" d="M124 205C124 148 158 116 200 116S276 148 276 205C276 252 246 296 200 300S124 252 124 205Z"/>
<path d="M130 160C150 140 250 140 270 160C262 134 236 118 200 118S138 134 130 160Z" fill="#DB9A74" opacity=".55"/>

<g id="features">
<ellipse cx="148" cy="254" rx="15" ry="8.5" fill="#F0705A" opacity=".38"/><ellipse cx="252" cy="254" rx="15" ry="8.5" fill="#F0705A" opacity=".38"/>
<g id="eye-L"><ellipse cx="168" cy="224" rx="17" ry="12" fill="#fff" stroke="#15141B" stroke-width="3.5"/>
<g clip-path="url(#clipL)"><g id="pupil-L"><circle cx="168" cy="224" r="8" fill="#15141B"/><circle cx="171" cy="220.5" r="2.6" fill="#fff"/></g></g>
<g clip-path="url(#clipL)"><g id="lid-L"><rect x="148" y="208" width="40" height="30" fill="#F0B994"/><path d="M148 238C160 242 176 242 188 238" class="ink" stroke-width="4" fill="none"/></g></g>
<path class="ink" stroke-width="5" fill="none" d="M149 221C155 207 181 207 187 221M149 221L143 216"/></g>
<g id="eye-R"><ellipse cx="232" cy="224" rx="17" ry="12" fill="#fff" stroke="#15141B" stroke-width="3.5"/>
<g clip-path="url(#clipR)"><g id="pupil-R"><circle cx="232" cy="224" r="8" fill="#15141B"/><circle cx="235" cy="220.5" r="2.6" fill="#fff"/></g></g>
<g clip-path="url(#clipR)"><g id="lid-R"><rect x="212" y="208" width="40" height="30" fill="#F0B994"/><path d="M212 238C224 242 240 242 252 238" class="ink" stroke-width="4" fill="none"/></g></g>
<path class="ink" stroke-width="5" fill="none" d="M213 221C219 207 245 207 251 221M251 221L257 216"/></g>
<g id="brow-L"><path class="ink" stroke-width="6" fill="none" d="M146 198C156 188 178 187 190 195"/></g>
<g id="brow-R"><path class="ink" stroke-width="6" fill="none" d="M210 195C222 187 244 188 254 198"/></g>
<path class="ink" stroke-width="3.5" fill="none" d="M201 240C197 250 196 256 203 258"/>
<g id="mouths">
<path id="m-neutral" class="ink" stroke-width="4.5" fill="none" d="M187 276C197 280 207 280 214 276" opacity="0"/>
<path id="m-smile" class="ink" stroke-width="4.5" fill="none" d="M183 272C192 290 210 290 219 272"/>
<g id="m-open" opacity="0"><path class="ink" stroke-width="4.5" fill="#15141B" d="M182 270C188 302 212 302 218 270Z"/><path d="M191 290C196 284 206 284 210 290C205 296 196 296 191 290Z" fill="#FF5B3A"/></g>
<path id="m-smirk" class="ink" stroke-width="4.5" fill="none" d="M187 278C199 284 212 280 220 268" opacity="0"/>
</g></g>

<g id="hair-front">
<path class="ink" stroke-width="4" fill="#15141B" d="M116 208C104 112 148 70 200 70S296 112 284 208C276 168 246 130 200 124C154 130 124 168 116 208Z"/>
<path class="ink" stroke-width="4" fill="#15141B" d="M200 124C164 130 138 160 130 200C126 232 120 262 112 292C108 306 124 308 130 296C142 270 148 242 150 214C156 176 176 146 200 124Z"/>
<path class="ink" stroke-width="4" fill="#15141B" d="M200 124C236 130 262 160 270 200C274 232 280 262 288 292C292 306 276 308 270 296C258 270 252 242 250 214C244 176 224 146 200 124Z"/>
<path d="M190 100C170 106 150 124 142 150M210 100C230 106 250 124 258 150" stroke="#2B2935" stroke-width="5" fill="none" stroke-linecap="round"/></g>

<g id="headphones">
<path d="M122 214C110 64 290 64 278 214" fill="none" stroke="#15141B" stroke-width="17" stroke-linecap="round"/>
<path d="M122 214C110 64 290 64 278 214" fill="none" stroke="#2A3CFF" stroke-width="9" stroke-linecap="round"/>
<g id="cup-L"><rect class="ink" stroke-width="4" x="102" y="192" width="30" height="62" rx="15" fill="#15141B"/><rect x="107" y="197" width="20" height="52" rx="10" fill="none" stroke="#2A3CFF" stroke-width="4"/><circle cx="117" cy="223" r="5" fill="#FF5B3A"/></g>
<g id="cup-R"><rect class="ink" stroke-width="4" x="268" y="192" width="30" height="62" rx="15" fill="#15141B"/><rect x="273" y="197" width="20" height="52" rx="10" fill="none" stroke="#2A3CFF" stroke-width="4"/><circle cx="283" cy="223" r="5" fill="#FF5B3A"/></g>
<g id="arcs"><path d="M88 200C80 214 80 232 88 246"/><path d="M74 190C62 212 62 236 74 258"/><path d="M312 200C320 214 320 232 312 246"/><path d="M326 190C338 212 338 236 326 258"/></g>
</g>
</g>
</svg>
`;

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

export interface ExpressionConfig {
  bly: number;
  bry: number;
  blr: number;
  brr: number;
  mouth: 'smile' | 'neutral' | 'open' | 'smirk';
  squint: number;
}

export const EXPR: Record<string, ExpressionConfig> = {
  smile: { bly: 0, bry: 0, blr: 0, brr: 0, mouth: 'smile', squint: 0 },
  focus: { bly: 3, bry: 3, blr: 5, brr: -5, mouth: 'neutral', squint: 0.12 },
  curious: { bly: -3, bry: -9, blr: -2, brr: -8, mouth: 'smirk', squint: 0 },
  surprise: { bly: -9, bry: -9, blr: -3, brr: 3, mouth: 'open', squint: 0 },
  smirk: { bly: 0, bry: -4, blr: 0, brr: -5, mouth: 'smirk', squint: 0.05 },
  yay: { bly: -6, bry: -6, blr: -3, brr: 3, mouth: 'open', squint: 0.25 }
};

export interface AvatarV2Instance {
  lookAt: (cx: number, cy: number) => void;
  setExpression: (n: string) => void;
  react: (n: 'nod' | 'yay' | 'wink') => void;
  el: SVGSVGElement | null;
  destroy: () => void;
}

export function createAvatar(root: HTMLElement): AvatarV2Instance {
  root.innerHTML = AVATAR_V2_SVG;
  const $ = (id: string) => root.querySelector('#' + id) as SVGGraphicsElement | null;
  const svg = root.querySelector('svg');

  const el = {
    head: $('head'),
    feat: $('features'),
    hairF: $('hair-front'),
    hairB: $('hair-back'),
    locks: $('locks'),
    torso: $('torso'),
    neck: $('neck'),
    pL: $('pupil-L'),
    pR: $('pupil-R'),
    lidL: $('lid-L'),
    lidR: $('lid-R'),
    bL: $('brow-L'),
    bR: $('brow-R'),
    m: {
      neutral: $('m-neutral'),
      smile: $('m-smile'),
      open: $('m-open'),
      smirk: $('m-smirk')
    }
  };

  const reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;

  const s = {
    hx: 0, hy: 0, ex: 0, ey: 0, tx: 0, ty: 0, tex: 0, tey: 0,
    sway: 0, vel: 0, lastY: window.scrollY, bob: 0, bobStart: -1e9, listen: false,
    blink: 0, nextBlink: performance.now() + 2500, winkR: 0, winkUntil: 0, lastInput: performance.now(),
    ex_: { ...EXPR.smile, bly: 0, bry: 0, blr: 0, brr: 0, squint: 0 },
    tgt: EXPR.smile,
    mouth: { neutral: 0, smile: 1, open: 0, smirk: 0 },
    yayUntil: 0,
    base: 'smile'
  };

  function lookAt(cx: number, cy: number) {
    const r = root.getBoundingClientRect();
    const mx = r.left + r.width / 2;
    const my = r.top + r.height * 0.45;
    s.tx = clamp((cx - mx) / (window.innerWidth * 0.5), -1, 1);
    s.ty = clamp((cy - my) / (window.innerHeight * 0.5), -1, 1);
    s.tex = clamp((cx - mx) / 260, -1, 1);
    s.tey = clamp((cy - my) / 260, -1, 1);
    s.lastInput = performance.now();
  }

  const onMove = (e: PointerEvent) => lookAt(e.clientX, e.clientY);
  window.addEventListener('pointermove', onMove, { passive: true });

  const onScroll = () => {
    s.vel = clamp(Math.abs(window.scrollY - s.lastY) / 40, 0, 1.5);
    s.lastY = window.scrollY;
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  root.addEventListener('pointerenter', () => {
    s.listen = true;
    root.classList.add('listening');
  });

  root.addEventListener('pointerleave', () => {
    s.listen = false;
    root.classList.remove('listening');
  });

  root.addEventListener('click', () => react('yay'));
  root.addEventListener('dblclick', () => react('wink'));

  function setExpression(n: string) {
    // Map legacy names to v2 set ('focused' -> 'focus')
    const key = n === 'focused' ? 'focus' : (EXPR[n] ? n : 'smile');
    s.base = key;
    s.tgt = EXPR[key] || EXPR.smile;
  }

  function react(n: 'nod' | 'yay' | 'wink') {
    const t = performance.now();
    if (n === 'nod' || n === 'yay') {
      s.bobStart = t;
    }
    if (n === 'yay') {
      s.yayUntil = t + 1400;
      s.tgt = EXPR.yay;
      root.classList.add('listening');
      setTimeout(() => {
        if (!s.listen) root.classList.remove('listening');
      }, 1400);
    }
    if (n === 'wink') {
      s.winkUntil = t + 800;
      s.tgt = EXPR.smirk;
    }
  }

  let raf = 0;

  function frame(t: number) {
    const idle = t - s.lastInput > 7000;
    if (idle) {
      s.tx = Math.sin(t / 2300) * 0.7;
      s.ty = Math.sin(t / 3100) * 0.25;
      s.tex = Math.sin(t / 1700) * 0.8;
      s.tey = Math.sin(t / 2600) * 0.3;
    }
    if (s.yayUntil && t > s.yayUntil) {
      s.yayUntil = 0;
      s.tgt = EXPR[s.base];
    }
    if (s.winkUntil && t > s.winkUntil) {
      s.winkUntil = 0;
      s.tgt = EXPR[s.base];
    }

    // smoothing at different rates = natural follow-through
    s.hx += (s.tx - s.hx) * 0.07;
    s.hy += (s.ty - s.hy) * 0.07;
    s.ex += (s.tex - s.ex) * 0.2;
    s.ey += (s.tey - s.ey) * 0.2;
    s.vel *= 0.92;
    s.sway += ((Math.sin(t / 900) * (0.6 + s.vel * 3) + (s.tx - s.hx) * 6) - s.sway) * 0.06;

    const k = (t - s.bobStart) / 1000;
    const nod = k < 1.2 ? Math.sin(k * Math.PI * 4) * Math.exp(-k * 2.6) * 7 : 0;
    const groove = s.listen ? Math.sin(t / 270) * 2.2 : 0;
    const breathe = Math.sin(t / 1100) * 0.012;
    const rot = s.hx * 7 + groove * 0.6;
    const ty = s.hy * 4 + nod + groove;

    el.head?.setAttribute('transform', `translate(${s.hx * 6} ${ty}) rotate(${rot} 200 300)`);
    el.feat?.setAttribute('transform', `translate(${s.hx * 3} ${s.hy * 3})`);
    el.hairF?.setAttribute('transform', `translate(${s.sway * 0.6} 0) rotate(${s.sway * 0.5} 200 100)`);
    el.hairB?.setAttribute('transform', `translate(${-s.hx * 1.5} 0) rotate(${s.sway * 0.4} 200 80)`);
    el.locks?.setAttribute('transform', `translate(${-s.hx * 3} ${nod * 0.2}) rotate(${s.sway * 0.9} 200 250)`);
    el.neck?.setAttribute('transform', `rotate(${rot * 0.35} 200 350)`);
    el.torso?.setAttribute('transform', `translate(${-s.hx * 3} 0) translate(0 462) scale(1 ${1 + breathe}) translate(0 -462)`);
    el.pL?.setAttribute('transform', `translate(${s.ex * 5} ${s.ey * 3.5})`);
    el.pR?.setAttribute('transform', `translate(${s.ex * 5} ${s.ey * 3.5})`);

    // expression easing
    const e = s.ex_;
    const g = s.tgt;
    for (const k2 of ['bly', 'bry', 'blr', 'brr', 'squint'] as const) {
      e[k2] += (g[k2] - e[k2]) * 0.14;
    }

    for (const n in s.mouth) {
      const key = n as keyof typeof s.mouth;
      s.mouth[key] += ((g.mouth === key ? 1 : 0) - s.mouth[key]) * 0.2;
      el.m[key]?.setAttribute('opacity', s.mouth[key].toFixed(3));
    }

    el.bL?.setAttribute('transform', `translate(0 ${e.bly}) rotate(${e.blr} 168 192)`);
    el.bR?.setAttribute('transform', `translate(0 ${e.bry}) rotate(${e.brr} 232 192)`);

    // blink / squint / wink (lid is 30 tall, scaleY 0..1 from top edge y=208)
    if (t > s.nextBlink) {
      s.blink = 1;
      s.nextBlink = t + 2500 + Math.random() * 3500;
      if (Math.random() < 0.2) s.nextBlink = t + 260;
    }
    s.blink = Math.max(0, s.blink - 0.14);
    const b = Math.max(s.blink > 0 ? Math.sin(s.blink * Math.PI) : 0, e.squint);
    const wink = s.winkUntil ? 1 : 0;
    s.winkR += (wink - s.winkR) * 0.35;
    const lidL = clamp(b, 0, 1);
    const lidR = clamp(Math.max(b, s.winkR), 0, 1);
    el.lidL?.setAttribute('transform', `translate(0 208) scale(1 ${lidL}) translate(0 -208)`);
    el.lidR?.setAttribute('transform', `translate(0 208) scale(1 ${lidR}) translate(0 -208)`);

    if (!reduce) raf = requestAnimationFrame(frame);
  }

  raf = requestAnimationFrame(frame);
  if (reduce) {
    frame(performance.now());
  }

  return {
    lookAt,
    setExpression,
    react,
    el: svg,
    destroy() {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('scroll', onScroll);
    }
  };
}

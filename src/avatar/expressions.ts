export type ExpressionName = 'smile' | 'neutral' | 'open' | 'smirk' | 'o' | 'focused' | 'curious' | 'wink';

export function applyExpression(svg: SVGSVGElement, expression: ExpressionName): void {
  const mouths = {
    smile: svg.querySelector('#mouth-smile') as SVGElement | null,
    neutral: svg.querySelector('#mouth-neutral') as SVGElement | null,
    open: svg.querySelector('#mouth-open') as SVGElement | null,
    smirk: svg.querySelector('#mouth-smirk') as SVGElement | null,
    o: svg.querySelector('#mouth-o') as SVGElement | null,
  };

  const browL = svg.querySelector('#brow-L') as SVGElement | null;
  const browR = svg.querySelector('#brow-R') as SVGElement | null;
  const lidTopR = svg.querySelector('#lid-top-R') as SVGElement | null;

  // Reset mouths
  Object.values(mouths).forEach((el) => {
    if (el) el.style.display = 'none';
  });

  // Reset brows
  if (browL) {
    browL.style.transform = 'translateY(0) rotate(0deg)';
  }
  if (browR) {
    browR.style.transform = 'translateY(0) rotate(0deg)';
  }

  // Reset wink
  if (lidTopR) {
    lidTopR.style.transform = 'scaleY(0)';
  }

  switch (expression) {
    case 'smile':
      if (mouths.smile) mouths.smile.style.display = 'block';
      break;

    case 'neutral':
      if (mouths.neutral) mouths.neutral.style.display = 'block';
      break;

    case 'open':
      if (mouths.open) mouths.open.style.display = 'block';
      break;

    case 'smirk':
      if (mouths.smirk) mouths.smirk.style.display = 'block';
      break;

    case 'o':
      if (mouths.o) mouths.o.style.display = 'block';
      break;

    case 'focused':
      if (mouths.neutral) mouths.neutral.style.display = 'block';
      if (browL) browL.style.transform = 'translateY(3px) rotate(4deg)';
      if (browR) browR.style.transform = 'translateY(3px) rotate(-4deg)';
      break;

    case 'curious':
      if (mouths.smirk) mouths.smirk.style.display = 'block';
      if (browL) browL.style.transform = 'translateY(-4px) rotate(-5deg)';
      if (browR) browR.style.transform = 'translateY(2px)';
      break;

    case 'wink':
      if (mouths.smile) mouths.smile.style.display = 'block';
      if (lidTopR) lidTopR.style.transform = 'scaleY(1.3) translateY(4px)';
      break;
  }
}

export function renderAvatarSvg(): string {
  return `
  <svg id="tiya-avatar-svg" class="avatar-svg-root" viewBox="0 0 400 480" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="avatar-shadow" x="-10%" y="-10%" width="130%" height="130%">
        <feDropShadow dx="0" dy="8" stdDeviation="6" flood-opacity="0.12"/>
      </filter>
      <!-- Gradient for jacket/hoodie -->
      <linearGradient id="hoodie-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FF5B3A" />
        <stop offset="100%" stop-color="#E03F1E" />
      </linearGradient>
      <linearGradient id="skin-grad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#FCD5B5" />
        <stop offset="100%" stop-color="#F3BE95" />
      </linearGradient>
    </defs>

    <!-- 1. BACK HAIR -->
    <g id="hair-back">
      <path d="M125 150 C100 230 90 320 100 420 C140 435 260 435 300 420 C310 320 300 230 275 150 Z" fill="#1C1824" stroke="#0E0E10" stroke-width="4" stroke-linejoin="round"/>
      <!-- Extra back strands -->
      <path d="M95 280 C85 340 92 400 110 440 C100 370 102 310 112 260 Z" fill="#15121C" />
      <path d="M305 280 C315 340 308 400 290 440 C300 370 298 310 288 260 Z" fill="#15121C" />
    </g>

    <!-- 2. TORSO & HOODIE -->
    <g id="torso">
      <!-- Shoulders/Jacket -->
      <path d="M100 410 C125 350 160 335 200 335 C240 335 275 350 300 410 L330 480 L70 480 Z" fill="url(#hoodie-grad)" stroke="#0E0E10" stroke-width="4" stroke-linejoin="round"/>
      <!-- Inner collar / zip line -->
      <path d="M185 340 L195 440 L205 440 L215 340" fill="#0E0E10" />
      <path d="M200 340 L200 470" stroke="#FFEAE5" stroke-width="2" stroke-dasharray="4 4" />
      <!-- Drawstrings -->
      <path d="M175 350 Q170 395 165 410" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" fill="none" />
      <circle cx="165" cy="412" r="3.5" fill="#C8F031" />
      <path d="M225 350 Q230 395 235 410" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" fill="none" />
      <circle cx="235" cy="412" r="3.5" fill="#C8F031" />
    </g>

    <!-- 3. NECK -->
    <g id="neck">
      <path d="M178 260 L178 340 C188 346 212 346 222 340 L222 260 Z" fill="url(#skin-grad)" stroke="#0E0E10" stroke-width="3.5" />
      <!-- Neck shadow beneath chin -->
      <path d="M178 262 C190 282 210 282 222 262 Z" fill="#E2A67B" />
    </g>

    <!-- 4. HEAD GROUP (will receive translation & rotation parallax) -->
    <g id="head">
      <!-- Ears -->
      <g id="ears">
        <path d="M128 200 C116 200 116 226 128 230 Z" fill="#F3BE95" stroke="#0E0E10" stroke-width="3.5" />
        <path d="M272 200 C284 200 284 226 272 230 Z" fill="#F3BE95" stroke="#0E0E10" stroke-width="3.5" />
        <!-- Small silver ear studs -->
        <circle cx="123" cy="220" r="2.5" fill="#C8F031" />
        <circle cx="277" cy="220" r="2.5" fill="#C8F031" />
      </g>

      <!-- Face Base Shape -->
      <path id="face-base" d="M130 180 C130 130 160 110 200 110 C240 110 270 130 270 180 C270 236 245 280 200 280 C155 280 130 236 130 180 Z" fill="url(#skin-grad)" stroke="#0E0E10" stroke-width="4" stroke-linejoin="round" />

      <!-- Cheeks (Blush) -->
      <g id="cheeks">
        <ellipse cx="152" cy="226" rx="10" ry="5.5" fill="#FF8370" opacity="0.45" />
        <ellipse cx="248" cy="226" rx="10" ry="5.5" fill="#FF8370" opacity="0.45" />
      </g>

      <!-- 5. BROWS -->
      <g id="brows">
        <path id="brow-L" d="M148 182 Q164 175 178 180" stroke="#0E0E10" stroke-width="3.5" stroke-linecap="round" fill="none" />
        <path id="brow-R" d="M222 180 Q236 175 252 182" stroke="#0E0E10" stroke-width="3.5" stroke-linecap="round" fill="none" />
      </g>

      <!-- 6. EYES (with pupils for lookAt quickTo) -->
      <g id="eyes">
        <!-- Left Eye -->
        <g id="eye-L" transform="translate(162, 202)">
          <!-- Sclera -->
          <ellipse cx="0" cy="0" rx="13" ry="8.5" fill="#FFFFFF" stroke="#0E0E10" stroke-width="3" />
          <!-- Pupil & Iris -->
          <g id="pupil-L">
            <circle cx="0" cy="0" r="5.5" fill="#1A1822" />
            <circle cx="1.5" cy="-1.5" r="2" fill="#FFFFFF" />
          </g>
          <!-- Eyelid top for blinking scaleY -->
          <path id="lid-top-L" d="M-14 -1 C-10 -11 10 -11 14 -1 L14 -12 L-14 -12 Z" fill="#F3BE95" />
          <!-- Eyelash upper line -->
          <path d="M-14 0 Q0 -9 14 0" stroke="#0E0E10" stroke-width="3.2" fill="none" stroke-linecap="round" />
        </g>

        <!-- Right Eye -->
        <g id="eye-R" transform="translate(238, 202)">
          <!-- Sclera -->
          <ellipse cx="0" cy="0" rx="13" ry="8.5" fill="#FFFFFF" stroke="#0E0E10" stroke-width="3" />
          <!-- Pupil & Iris -->
          <g id="pupil-R">
            <circle cx="0" cy="0" r="5.5" fill="#1A1822" />
            <circle cx="1.5" cy="-1.5" r="2" fill="#FFFFFF" />
          </g>
          <!-- Eyelid top for blinking scaleY -->
          <path id="lid-top-R" d="M-14 -1 C-10 -11 10 -11 14 -1 L14 -12 L-14 -12 Z" fill="#F3BE95" />
          <!-- Eyelash upper line -->
          <path d="M-14 0 Q0 -9 14 0" stroke="#0E0E10" stroke-width="3.2" fill="none" stroke-linecap="round" />
        </g>
      </g>

      <!-- 7. NOSE -->
      <g id="nose">
        <path d="M198 214 Q202 226 198 229 C195 230 205 230 205 228" stroke="#0E0E10" stroke-width="2.8" stroke-linecap="round" fill="none" />
      </g>

      <!-- 8. MOUTHS (Switchable via display/opacity) -->
      <g id="mouths" transform="translate(200, 252)">
        <!-- Neutral -->
        <path id="mouth-neutral" d="M-12 -2 Q0 2 12 -2" stroke="#0E0E10" stroke-width="3.2" stroke-linecap="round" fill="none" style="display: none;" />
        <!-- Smile (default) -->
        <path id="mouth-smile" d="M-14 -4 Q0 10 14 -4 Q0 4 -14 -4 Z" fill="#C23636" stroke="#0E0E10" stroke-width="3" stroke-linejoin="round" />
        <!-- Open / Yay -->
        <path id="mouth-open" d="M-15 -6 Q0 18 15 -6 Z" fill="#901E1E" stroke="#0E0E10" stroke-width="3" style="display: none;">
          <path d="M-8 4 Q0 11 8 4" fill="#FF8370" />
        </path>
        <!-- Smirk -->
        <path id="mouth-smirk" d="M-10 2 Q0 2 14 -4" stroke="#0E0E10" stroke-width="3.2" stroke-linecap="round" fill="none" style="display: none;" />
        <!-- Surprised / O -->
        <ellipse id="mouth-o" cx="0" cy="0" rx="6" ry="9" fill="#0E0E10" style="display: none;" />
      </g>

      <!-- 9. FRONT HAIR & BANGS -->
      <g id="hair-front">
        <!-- Sleek forehead bangs -->
        <path d="M130 170 C145 130 180 125 200 135 C225 125 260 130 270 170 C270 150 250 120 200 120 C150 120 130 150 130 170 Z" fill="#1C1824" stroke="#0E0E10" stroke-width="3" />
        <!-- Left front strand (animated sway) -->
        <path id="hair-strand-L" d="M132 170 Q122 240 130 300 Q138 240 140 180 Z" fill="#1C1824" stroke="#0E0E10" stroke-width="2.5" />
        <!-- Right front strand (animated sway) -->
        <path id="hair-strand-R" d="M268 170 Q278 240 270 300 Q262 240 260 180 Z" fill="#1C1824" stroke="#0E0E10" stroke-width="2.5" />
      </g>
    </g>

    <!-- 10. HEADPHONES (Around neck by default, bobbing or on head) -->
    <g id="headphones" transform="translate(0, 0)">
      <!-- Band around neck -->
      <path id="hp-band" d="M150 320 C150 365 250 365 250 320" stroke="#2A3CFF" stroke-width="12" stroke-linecap="round" fill="none" />
      <path d="M150 320 C150 365 250 365 250 320" stroke="#0E0E10" stroke-width="14" stroke-linecap="round" fill="none" opacity="0.3" />
      <!-- Left Cup -->
      <rect id="hp-cup-L" x="136" y="300" width="22" height="34" rx="10" fill="#0E0E10" stroke="#2A3CFF" stroke-width="3" />
      <!-- Right Cup -->
      <rect id="hp-cup-R" x="242" y="300" width="22" height="34" rx="10" fill="#0E0E10" stroke="#2A3CFF" stroke-width="3" />
    </g>

    <!-- 11. HAND WAVE ARM (Hidden by default, triggered on hover/wave) -->
    <g id="hand-wave" transform="translate(300, 390) scale(0)" style="transform-origin: 300px 390px;">
      <path d="M0 0 Q30 -40 50 -80" stroke="#FF5B3A" stroke-width="24" stroke-linecap="round" fill="none" />
      <!-- Hand palm + fingers -->
      <g transform="translate(52, -84)">
        <ellipse cx="0" cy="0" rx="12" ry="14" fill="#FCD5B5" stroke="#0E0E10" stroke-width="3" />
        <!-- Waving fingers -->
        <line x1="-8" y1="-8" x2="-10" y2="-18" stroke="#0E0E10" stroke-width="3" stroke-linecap="round" />
        <line x1="-3" y1="-10" x2="-4" y2="-22" stroke="#0E0E10" stroke-width="3" stroke-linecap="round" />
        <line x1="3" y1="-10" x2="4" y2="-21" stroke="#0E0E10" stroke-width="3" stroke-linecap="round" />
        <line x1="8" y1="-8" x2="11" y2="-17" stroke="#0E0E10" stroke-width="3" stroke-linecap="round" />
      </g>
    </g>
  </svg>
  `;
}


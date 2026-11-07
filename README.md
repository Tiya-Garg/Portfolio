# Tiya Garg — Portfolio v2 ("Signal")

> Award-level creative developer portfolio for **Tiya Garg**, 3rd-year ECE (AI) undergraduate at IGDTUW, seeking **Summer 2027 SWE and AI/ML internships**.

Live URL: [https://tiya-garg.github.io/Portfolio/](https://tiya-garg.github.io/Portfolio/)

---

## 📻 Creative Concept: "SIGNAL"
The portfolio treats Tiya's communication systems engineering background as a living physical and digital frequency signal:
- **Channels (CH 01 – CH 06):** Analog tuner UI in the bottom-left corner with real-time text scramble/glitch effect.
- **Waveform Motif:** Dynamic multi-channel hero canvas reacting to cursor frequency and scroll noise, vertical right-edge oscilloscope scroll bar.
- **Living Illustrated Companion ("Tiya-bot"):** Multi-layered SVG character whose head, eyes, and hair track the cursor in real time with breathing, blinking, reactions (wave, nod, yay, wink), idle behaviors (putting on headphones), section-driven facial expressions, and a scroll-scrubbed docking companion widget with speech bubble quips.

---

## 🛠 Tech Stack
- **Bundler:** Vite + Vanilla TypeScript (strict mode)
- **Animation & Physics:** GSAP 3 (ScrollTrigger, ticker synchronization)
- **Smooth Inertia Scroll:** Lenis (synced with ScrollTrigger via shared ticker)
- **Graphics:** Inline layered SVG + 2D Canvas (no Three.js, zero CDNs, all local)
- **Typography:** Anton (Display), Instrument Serif (Accent), Instrument Sans (Body), JetBrains Mono (Labels), Caveat (Handwritten notes)

---

## 🚀 How to Run Locally

```bash
# Clone the repository
git clone https://github.com/Tiya-Garg/Portfolio.git
cd Portfolio

# Install dependencies
npm install

# Start local dev server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

---

## 📝 How to Edit Content
All site copy, project bullets, awards, milestones, skills, and links are decoupled from layout code in:
```
/src/content.ts
```
To update any text or add new projects, simply edit `SITE_CONTENT` in that file and run `npm run build`.

---

## 🚢 Deployment to GitHub Pages
The project includes a fully automated GitHub Actions CI/CD workflow at `.github/workflows/deploy.yml`.
Pushes to `main` or manual trigger via `workflow_dispatch` will automatically build the site and deploy the `dist/` directory to GitHub Pages.


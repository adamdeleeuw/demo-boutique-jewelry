# Elegant Jewelry Boutique  
*A one-page, sales-ready boutique template—designed and shipped in a weekend to showcase rapid full-stack delivery.*

[![Live Demo](https://img.shields.io/badge/live-demo-brightgreen)](https://adamdeleeuw.github.io/demo-boutique-jewelry/)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

> **Disclaimer:** The booking form submission does not work from the live demo link above. For privacy and security, email bookings only work when running locally with your own `.env` variables set.

---

## 1. Why I Built It
Most small retailers still rely on generic site builders that load slowly and bury products in clutter.  
I wanted to prototype a **“starter boutique” package** that loads fast, immerses visitors in product imagery, and captures booking or inquiry requests—no WordPress or heavy frameworks required.

## 2. Thought Process & Design
- **User goals:** Browse collections → feel brand quality → inquire or book in &lt; 60 s  
- **Design priorities:** Mobile-first hero, immersive image gallery, 0-to-action scroll hints  
- **AI leverage:** Copilot scaffolded sections via prompt chains; I hand-authored the CSS grid, animation timing, and back-end email logic.

## 3. Tech Stack & Architecture
| Layer | Details |
|-------|---------|
| **Front End** | HTML5 + CSS3 (custom properties, grid, flex) + Vanilla JS (ES6) |
| **Back End** | Node.js 18 | Express 4 | Nodemailer (SMTP) |
| **Infra** | Static demo on GitHub Pages; local dev server at `localhost:3000` |
| **CI/Dev** | npm scripts, `nodemon`, `dotenv` for secrets |

## 4. Core Features
| Feature | Impact |
|---------|--------|
| **Responsive hero + CTA** | 100 Lighthouse performance on desktop |
| **Interactive gallery** | Full-screen lightbox for high-res product shots |
| **Scroll-triggered reveals** | Subtle animations that boost engagement |
| **Validated booking form** | Instant feedback; e-mails arrive in &lt; 400 ms locally |
| **Hamburger nav** | One-hand usability on phones |

## 5. Quick Start (Local)
```bash
git clone https://github.com/adamdeleeuw/demo-boutique-jewelry.git
cd demo-boutique-jewelry
npm install
cp .env.example .env       # add your SMTP creds
npm run dev                # http://localhost:3000
```

## 6. Future Improvements 📈

Prioritized by Lighthouse and field data.

- **Image optimisation**
    - Convert hero & gallery assets to WebP/AVIF (Est savings of 435 KiB + faster LCP/FCP)
    - Resize oversize images; add explicit width/height
- **Inline + preload critical CSS** to remove render-blocking
- **Lazy-load** off-screen images in the gallery
- **Minify & bundle CSS / JS** (current unminified savings ≈ 2 KiB)
- **Long-lived cache headers** for static assets
- **Deploy back-end to Render / Railway** so live demo accepts inquiries
- **Add Stripe checkout** for direct purchases
- **Cypress e2e tests** for booking & gallery flows
- **Cloudinary CDN** for automatic WebP + on-the-fly transforms

## 7. What I Learned 🧠

- Diagnosed CLS/LCP issues caused by unoptimised hero imagery
- Built a modular lightbox without external libraries
- Refined AI prompt loops to speed scaffold → polish iterations

## 8. License

Released under the MIT License—free for learning, adaptation, and remixing.

## About Me

I’m Adam de Leeuw, a second-year Computer Engineering student at UBC. I build product-quality demos and production apps fast by blending low-overhead tech with AI tooling, then document the process for teammates and clients.

[Connect with me on LinkedIn](https://www.linkedin.com/in/adamjdl/)

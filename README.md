# magic3numbers

> **Your Cosmic Identity. Your Three Sacred Numbers.**  
> A premium, modern, minimal, and immersive editorial-style platform synthesizing **Sidereal Vedic Astrology (Jyotish)**, **Tropical Western Natal Geometry**, and **Pythagorean Numerology** into one deterministic, reproducible personal blueprint.

---

## ✦ System Architecture & Tech Stack

The platform is designed to be hosted seamlessly across **Vercel** (Frontend) and **Railway** (Backend API & Database):

```
magic3numbers/
├── frontend/             # Next.js 15 (App Router), React 19, TypeScript 5, Tailwind CSS
│                         # Fluid clamp() typography, Poppins font, mobile-to-4K responsive
│                         # Dual-engine (client-side zero-latency + Railway REST fallback)
└── backend/              # Laravel 11 / 12 (PHP 8.3), RESTful JSON API v1
                          # Lahiri Ephemeris, Whole Sign D1 Kundali, Pythagorean reducers
                          # Automated Feature & Unit test suites, Nixpacks/Railway ready
```

### 1. Frontend (Vercel)
- **Framework:** Next.js 15+ (App Router) with React 19
- **Language:** TypeScript 5 (Strict type contracts across all models)
- **Styling:** Tailwind CSS with custom editorial design tokens
- **Typography:** Google Fonts: Poppins (Hero 800, Section 700, Body 400, CTA 600) with fluid `clamp()` sizing
- **Motion & Animations:** 
  - Celestial animated loading screen with sacred triad geometry & rotating rings
  - Staggered reveals, floating decorative objects (`cubic-bezier(.2,.8,.15,1)`)
  - Adaptive navigation color system switching over light/dark sections
  - North Indian Diamond D1 Chart SVG with interactive house inspector
- **Screen Responsiveness:** Mobile (360px) &rarr; Tablet (768px) &rarr; Desktop (1280px) &rarr; 4K Ultra-HD (2560px & 3840px)

### 2. Backend (Railway)
- **Framework:** Laravel 11 (PHP 8.3)
- **Architecture:** Clean service layer (`VedicAstrologyService`, `WesternAstrologyService`, `NumerologyService`, `SynthesisService`)
- **API Spec:** RESTful JSON endpoints (`/api/v1/calculate`, `/api/v1/health`)
- **Testing:** Automated PHPUnit / Pest feature tests covering calculations and edge cases (e.g. angle normalization)
- **Deploy Config:** `railway.json`, `Procfile`, and `nixpacks.toml` configured for one-click deployment

---

## ✦ The Three Methodological Pillars

### Pillar 1: Vedic Astrology (Sidereal Jyotish)
- **Zodiac:** Sidereal with Chitrapaksha (**Lahiri**) Ayanamsa
- **House System:** Whole Sign House Matrix (D1 / Rashi Chart)
- **Core Identifiers:** Lagna (Ascendant), Moon Sign (Rashi), Nakshatra (27 Asterisms) &amp; Pada (108 Quarters)
- **Planets:** Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu (North Node), Ketu (South Node)

### Pillar 2: Western Astrology (Tropical Natal)
- **Zodiac:** Tropical Solar Solstices
- **Houses:** Placidus / Equal Quadrants
- **Placements:** Sun, Moon, Rising (Ascendant), Mercury, Venus, Mars, Jupiter, Saturn
- **Aspects Engine:** Conjunction (0°), Opposition (180°), Trine (120°), Square (90°), Sextile (60°) with precise orb tracking (&le; 8°)

### Pillar 3: Pythagorean Numerology & Planetary Vibrations
- **Core Numbers:**
  - **Life Path Number:** Full date of birth reduction
  - **Birthday Number:** Day of birth vibration
  - **Expression / Destiny Number:** Full birth name letter analysis
  - **Soul Urge Number:** Vowel analysis
  - **Personality Number:** Consonant analysis
  - **Personal Year:** Current cycle vibration
- **Master Numbers:** Strictly preserved (11, 22, 33) without improper reduction
- **Planetary Mappings (1–9):**
  - `1`: Sun (Surya) &bull; `2`: Moon (Chandra) &bull; `3`: Jupiter (Guru)
  - `4`: Rahu (North Node) &bull; `5`: Mercury (Budha) &bull; `6`: Venus (Shukra)
  - `7`: Ketu (South Node) &bull; `8`: Saturn (Shani) &bull; `9`: Mars (Mangala)

---

## ✦ UI/UX Color System

| Token | Hex Code | Usage |
| :--- | :--- | :--- |
| **Primary Text** | `#0D0B1A` | Headings, bold editorial numbers |
| **Secondary Text** | `#4A4568` | Body text, captions, secondary details |
| **Main Background** | `#E7E3FB` | Hero section, dashboard background |
| **Light Background** | `#E4E0FA` | Profile creation form background |
| **Accent** | `#5B3BD1` | Buttons, active tabs, glowing accents |
| **Dark Section** | `#3A1F8C` | Nighttime storytelling sections, 3 pillars |
| **Highlight** | `#CFC6F6` | Underlines, badges, border contrasts |
| **White** | `#FFFFFF` | Glassmorphic cards and inner panels |

---

## ✦ Local Development Guide

### Prerequisites
- **Node.js** v20+ / v22+
- **PHP** 8.2+ / 8.3+
- **Composer** 2+
- **Git**

### 1. Run Frontend (Next.js)
```bash
cd frontend
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application with live reload.

### 2. Run Backend (Laravel API)
```bash
cd backend
composer install
php artisan key:generate
php artisan migrate
php artisan test
php artisan serve --port=8000
```
API endpoints will be live at `http://localhost:8000/api/v1/health`.

---

## ✦ Deployment Guide

### Deploying Frontend to Vercel
1. Push your repository to GitHub.
2. In the [Vercel Dashboard](https://vercel.com/), click **Add New Project** &rarr; Select your `magic3numbers` repository.
3. Configure the **Root Directory** as `frontend`.
4. (Optional) In **Environment Variables**, add:
   ```env
   NEXT_PUBLIC_API_URL=https://your-backend-railway-url.up.railway.app
   ```
5. Click **Deploy**. Vercel will build the Next.js static and serverless assets automatically.

### Deploying Backend to Railway
1. In the [Railway Dashboard](https://railway.app/), click **New Project** &rarr; **Deploy from GitHub repo**.
2. Select your `magic3numbers` repository.
3. In **Settings** &rarr; **Root Directory**, set to `/backend`.
4. In **Variables**, add:
   ```env
   APP_ENV=production
   APP_DEBUG=false
   APP_KEY=base64:... (generate via php artisan key:generate)
   APP_URL=https://${{RAILWAY_STATIC_URL}}
   ```
5. Railway will automatically detect `nixpacks.toml` / `railway.json` and start the service.

---

## ✦ Step-by-Step GitHub Push Guide

To push your completed project to your GitHub repository:

```bash
# 1. Initialize and stage all files
git add .

# 2. Commit the changes
git commit -m "feat: complete magic3numbers platform (Next.js 15, Laravel 11, Vedic & Western engines)"

# 3. Rename branch to main (if not already main)
git branch -M main

# 4. Add your GitHub remote repository URL (replace with your repo URL)
git remote add origin https://github.com/<your-username>/magic3numbers.git

# 5. Push to GitHub
git push -u origin main
```

---

## ✦ Legal & Compliance Boundary
*`magic3numbers` is an astronomical, astrological, and numerological calculation platform designed strictly for personal reflection, cultural study, and creative self-discovery. The system does not provide lottery predictions, betting recommendations, wagering assistance, or draw tracking. All planetary numbers and cycles reflect documented traditional correspondences rather than predictive financial claims.*

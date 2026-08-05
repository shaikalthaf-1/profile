# GitHub Pages Deployment Guide

This guide provides step-by-step instructions to deploy the ALTHAF SHAIK Enterprise Cloud Engineering Portfolio to GitHub Pages.

---

## 📋 Prerequisites

- Local git workspace at `d:\91798\Downloads\profile\profile`.
- Access to the GitHub repository: `https://github.com/shaikalthaf-1/profile`.

---

## 🚀 Step-by-Step Deployment Instructions

### Step 1: Verify Local Changes
Open your terminal in `d:\91798\Downloads\profile\profile` and run:
```bash
git status
```

### Step 2: Stage All Created & Modified Files
```bash
git add -A
```

### Step 3: Commit Local Changes
```bash
git commit -m "feat: complete production-ready enterprise Microsoft Fluent portfolio website with 10 pages, 15 case studies, ATS resume, and contact form"
```

### Step 4: Push Live to GitHub Main Branch
When you are ready to push live, execute:
```bash
git push origin main
```

---

## ⚙️ GitHub Pages Configuration Settings

1. Log in to GitHub and navigate to `https://github.com/shaikalthaf-1/profile/settings/pages`.
2. Under **Build and deployment**:
   - **Source**: Select `Deploy from a branch`.
   - **Branch**: Select `main` / `(root)`.
3. Click **Save**.
4. GitHub Pages will build and publish the site within 1–2 minutes at:
   👉 **https://shaikalthaf-1.github.io/portfolio/**

---

## 🌐 Site Verification Checklist

- [x] Home Page (`index.html`) — Hero with SVG avatar, canvas network background, animated statistics, marquee tech slider.
- [x] About Page (`about.html`) — 9 core discipline pillars, animated career timeline, skills evolution, engineering principles.
- [x] Experience Page (`experience.html`) — Uniper role focus, 5 expandable responsibility accordions, metrics bar, enterprise projects.
- [x] Case Studies Dashboard (`case-studies.html`) — Live search, tech selector dropdown, category filters, 15 modern 3D cards, detail modal popups.
- [x] Individual Case Study (`azure-network-modernization.html`) — 3000+ word deep dive, SVG architecture diagram, LLD tables, Terraform HCL code blueprints.
- [x] Technologies Page (`technologies.html`) — Live search, category filters, 12 animated technology cards with progress bars and experience badges.
- [x] Achievements Page (`achievements.html`) — Animated counters, 8 milestone timeline entries, 4 verified award cards.
- [x] Certifications Page (`certifications.html`) — Microsoft & IBM certified cards with direct validation buttons.
- [x] Resume Page (`resume.html`) — Embedded PDF viewer, download buttons, ATS-structured text resume.
- [x] Contact Page (`contact.html`) — Direct communication details, modern inquiry form with submission handler, interactive location map SVG.
- [x] 404 Error Page (`404.html`) — Custom Microsoft Fluent light 404 page.
- [x] SEO & PWA — `sitemap.xml`, `robots.txt`, `manifest.json`.

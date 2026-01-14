# 🦁 Kittaby (كتابي)
### The Interactive Arabic Alphabet Journey for Kids

**Kittaby** is a high-performance, accessible, and visually immersive e-learning platform designed to help children learn the Arabic alphabet through play.  
It combines **3D animal mascots**, **native Arabic audio**, and **modern web technologies** to create a joyful and effective learning experience.

---

## 🚀 Vision

To build the most engaging digital gateway for children to learn the Arabic language.  
By blending **soft-toy inspired 3D visuals** with the speed and reliability of modern web architecture, **Kittaby** transforms learning into an intuitive, playful adventure.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 15+](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/) — strict mode
- **State Management:** Signals (granular, reactive, and ultra-performant)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Rendering & Performance:**
  - Server Components by default
  - Optimized asset loading
- **Architecture Principles:**
  - Functional programming
  - Immutable state
  - Service-oriented design

---

## ✨ Core Features

- **Alphabet Grid**  
  Interactive grid with all 28 Arabic letters.

- **3D Mascot Library**  
  One friendly, high-quality 3D animal mascot per letter.

- **Bilingual Learning Context**  
  - Arabic letter & word  
  - English translation  
  - Phonetic guidance

- **Native Audio Engine**  
  Crystal-clear Arabic pronunciation for:
  - Letters
  - Animal names

- **Accessibility-First Design**  
  - WCAG 2.1 AA compliant  
  - Full keyboard navigation  
  - Screen-reader friendly ARIA labels  
  - Tested with AXE

---

## 📂 Project Architecture

```text
src/
├── app/                # Next.js App Router (layouts, pages, routes)
├── components/         # Standalone, reusable components
│   ├── ui/             # Base UI primitives (Button, Card, Modal)
│   └── alphabet/       # Alphabet feature components
├── constants/          # Static data (alphabetData.ts)
├── services/           # Application services (Audio, Analytics)
├── store/              # Signal-based state management
├── types/              # Global TypeScript types & interfaces
└── public/
    ├── static/         # Optimized 3D assets (WebP)
    └── audio/          # Native pronunciation files (MP3)

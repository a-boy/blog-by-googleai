# Minimal Mistakes Blog

A modern, high-performance personal blog and portfolio application inspired by Michael Rose's famous [Minimal Mistakes](https://mmistakes.github.io/minimal-mistakes/) Jekyll theme, styled with a refined **Geometric Balance** design system and built using React, Vite, Tailwind CSS, and TypeScript.

![Minimal Mistakes Blog](https://raw.githubusercontent.com/mmistakes/minimal-mistakes/master/docs/assets/images/mm-teaser.png)

---

## 🌟 Key Features

- **Geometric Balance Aesthetic**: Clean monochrome & neutral layout with high-contrast typography, sharp borders, bold uppercase accents, and spacious visual rhythm.
- **Author Sidebar & Bio**: Prominent profile widget with online availability indicator, geo-location badges, social links, follower stats, and categories/tags filters.
- **Markdown & Article Reader**: Full GFM (GitHub Flavored Markdown) post rendering with code syntax blocks, responsive image framing, reading progress indicator, and custom font sizing.
- **Interactive Table of Contents**: Dynamic sticky TOC sidebar automatically generated from article headings (`H1`-`H4`).
- **Web Share API & Toast Notifications**: Built-in native web sharing with automatic clipboard fallback and temporary toast notification feedback.
- **Instant Search (Cmd / Ctrl + K)**: Fast post title, tag, category, and excerpt modal search.
- **Dark Mode & Skins**: Seamless toggle between Light (Geometric Clean) and Dark modes.
- **Content Management & Post Editor**: Modal editor to create new posts with tag selection, category dropdown, and custom markdown content.
- **Views & Navigation**: Quick-Start guide, Archives, Projects portfolio view, Tag/Category views, and Bookmarked posts list.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 6](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.react.dev/)
- **Animations**: [Motion](https://motion.dev/)
- **Markdown**: `react-markdown` with `remark-gfm`

---

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- `npm`, `pnpm`, or `bun`

### Installation & Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/minimal-mistakes-blog.git
   cd minimal-mistakes-blog
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

4. **Build for production**:
   ```bash
   npm run build
   ```

5. **Run TypeScript linter**:
   ```bash
   npm run lint
   ```

---

## 📦 GitHub Actions CI/CD (Auto Build & Deploy)

This repository includes a GitHub Actions workflow located at `.github/workflows/deploy.yml`.

### Setting up GitHub Pages Deployment:

1. Push your repository to GitHub.
2. Go to repository **Settings** -> **Pages**.
3. Under **Build and deployment** -> **Source**, select **GitHub Actions**.
4. Every push to the `main` or `master` branch will automatically trigger type-checking, building, and deployment to GitHub Pages!

---

## 📄 License

MIT License © 2024 Michael Rose / Minimal Mistakes Blog.

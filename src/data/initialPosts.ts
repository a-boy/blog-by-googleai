import { Post } from '../types';

export const initialPosts: Post[] = [
  {
    id: 'mastering-minimalist-blog-design',
    slug: 'mastering-minimalist-blog-design',
    title: 'Mastering Minimalist Blog Design: Lessons from Minimal Mistakes',
    subtitle: 'Exploring the architecture of clean typography, two-column layouts, and content-first web experiences.',
    excerpt: 'How stripping away visual noise elevates technical writing, improves reading comprehension, and creates timeless personal sites.',
    date: '2026-07-15',
    lastUpdated: '2026-07-20',
    readTime: '5 min read',
    category: 'Web Design',
    tags: ['Minimalism', 'Typography', 'UI Design', 'CSS Architecture'],
    featured: true,
    coverImage: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=1200',
    author: {
      name: 'Michael Rose',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
      role: 'UI Designer & Web Developer'
    },
    views: 1420,
    notices: [
      {
        type: 'info',
        title: 'Theme Philosophy',
        content: 'Minimal Mistakes was built on the premise that content should always take center stage. Every line of CSS serves legibility first.'
      }
    ],
    comments: [
      {
        id: 'c1',
        author: 'Sarah Jenkins',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100',
        date: '2026-07-16',
        content: 'I have been using Minimal Mistakes for over 5 years now on my developer site. The two-column sticky sidebar is iconic!',
        likes: 12
      },
      {
        id: 'c2',
        author: 'David Vance',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100',
        date: '2026-07-18',
        content: 'The typography scales and notice callouts make technical documentation a pleasure to read.',
        likes: 7
      }
    ],
    content: `
# Mastering Minimalist Blog Design

When designing personal websites and technical blogs, developers often fall into the trap of over-decorating. Bright neon gradients, heavy card borders, and intrusive popups draw attention away from what truly matters: **your thoughts and writing**.

> "Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away."  
> — *Antoine de Saint-Exupéry*

## The Principles of Content-First Layouts

Minimal Mistakes established a signature visual pattern that hundreds of thousands of developer sites follow today:

1. **Sticky Left Author Sidebar**: Provides an persistent author identity, social proof, and contextual bio without cluttering the main reading canvas.
2. **Fluid Content Column**: Optimized text width (65–75 characters per line) to maximize reading comfort.
3. **Table of Contents Right Bar**: Provides immediate structural orientation for long-form articles.

---

### Notice Callout Blocks

Minimal Mistakes introduced standardized notice callout blocks to highlight key takeaways, warnings, or tips in technical essays:

{: .notice--info}
**Pro Tip:** Use callout blocks sparingly. When everything is highlighted, nothing stands out.

{: .notice--success}
**Success:** Following a modular CSS architecture ensures skin swappability with zero markup changes.

{: .notice--warning}
**Warning:** Be cautious of loading too many web font weights. Stick to 2 weights maximum for fast initial rendering.

---

## Code Example: Pure CSS Theme Switcher

Here is a clean implementation of skin switching using CSS custom properties:

\`\`\`css
/* Minimal Mistakes CSS Variables Spectrum */
:root {
  --bg-primary: #f3f4f6;
  --text-main: #22252a;
  --accent-color: #0d9488;
  --sidebar-bg: #ffffff;
  --border-subtle: #e5e7eb;
}

[data-skin="dark"] {
  --bg-primary: #0f172a;
  --text-main: #f8fafc;
  --accent-color: #38bdf8;
  --sidebar-bg: #1e293b;
  --border-subtle: #334155;
}
\`\`\`

## Typography Scale Comparison

| Element | Font Size | Line Height | Purpose |
| :--- | :--- | :--- | :--- |
| **H1 Title** | 2.25rem (36px) | 1.25 | Primary Article Header |
| **H2 Section** | 1.5rem (24px) | 1.35 | Major Topic Division |
| **H3 Subhead** | 1.25rem (20px) | 1.4 | Specific Subsection |
| **Body Text** | 1.0rem (16px) | 1.7 | Long-form reading comfort |

## Conclusion

By prioritizing clean layout hierarchy, robust contrast ratios, and thoughtful whitespace, your blog becomes an inviting environment for readers. Focus on publishing great ideas, and let the design frame your content naturally.
`
  },
  {
    id: 'guide-to-markdown-notices-and-syntax-styling',
    slug: 'guide-to-markdown-notices-and-syntax-styling',
    title: 'A Guide to Markdown Callout Notices & Syntax Styling',
    subtitle: 'How to structure documentation with custom alerts, blockquotes, and code highlighting.',
    excerpt: 'Learn how to use notices, custom callouts, syntax highlighting, and responsive tables to create world-class developer docs.',
    date: '2026-07-10',
    readTime: '4 min read',
    category: 'Jekyll & Tools',
    tags: ['Markdown', 'Jekyll', 'Documentation', 'CSS'],
    featured: false,
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200',
    author: {
      name: 'Michael Rose',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
      role: 'UI Designer & Web Developer'
    },
    views: 890,
    notices: [
      {
        type: 'warning',
        title: 'Compatibility Note',
        content: 'Kramdown syntax extensions like {: .notice--info} require Jekyll or custom React Markdown processors.'
      }
    ],
    comments: [],
    content: `
# A Guide to Markdown Callout Notices & Syntax Styling

Technical writing requires rich expressive tools. Beyond basic paragraphs, developers need clear visual indicators for alerts, code samples, and step-by-step guides.

## Why Use Callout Notices?

Notice blocks allow you to break long walls of text with visually distinct cards that catch the reader's eye without interrupting reading flow.

### Notice Types Available in Minimal Mistakes

{: .notice--info}
**Info Box:** Useful for background context, additional resources, or fun trivia.

{: .notice--success}
**Success Box:** Ideal for indicating completed steps, successful tests, or recommended best practices.

{: .notice--warning}
**Warning Box:** Warns readers about common pitfalls, deprecated features, or breaking API changes.

{: .notice--danger}
**Danger Box:** High-urgency alert for security vulnerabilities, destructive actions, or critical setup errors.

---

## Code Block Customization

Good code blocks feature clean syntax highlighting, line numbers, and a quick "Copy to Clipboard" button:

\`\`\`typescript
interface ConfigOptions {
  theme: 'default' | 'dark' | 'aqua';
  enableTOC: boolean;
  showReadTime: boolean;
}

function initializeBlog(options: ConfigOptions): void {
  console.log('Initializing Minimal Mistakes with theme ' + options.theme);
}
\`\`\`

## Markdown Table Example

| Feature | Support | Performance |
| :--- | :---: | ---: |
| Dark Mode | Built-in | 100% Instant |
| Table of Contents | Auto-generated | Zero Overhead |
| Search Filter | Client-side | < 5ms Query |

Try adding your own articles using the **+ Write Post** button at the top right!
`
  },
  {
    id: 'building-high-performance-static-web-apps-2026',
    slug: 'building-high-performance-static-web-apps-2026',
    title: 'Building High-Performance Web Applications in 2026',
    subtitle: 'Combining Vite, React 19, and Tailwind for lighting-fast static and dynamic web experiences.',
    excerpt: 'An overview of modern frontend stack choices that balance ultra-fast load times with interactive rich user experiences.',
    date: '2026-06-28',
    readTime: '6 min read',
    category: 'Web Dev',
    tags: ['React', 'Vite', 'Performance', 'Frontend'],
    featured: false,
    coverImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=1200',
    author: {
      name: 'Michael Rose',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
      role: 'UI Designer & Web Developer'
    },
    views: 2150,
    comments: [],
    content: `
# Building High-Performance Web Applications in 2026

Modern web performance is no longer just about minimizing JavaScript payload size. It spans layout shift reduction, instant micro-interactions, responsive typography scaling, and offline resilience.

## Key Architecture Pillars

- **Zero Layout Shifts**: Define exact image dimensions and preserve container ratios.
- **Client-Side Instant Search**: Index article headings and excerpts locally for instant zero-latency searching.
- **Accessible Color Schemes**: Maintain WCAG AA contrast compliance across light, dark, and themed color skins.

\`\`\`bash
# Fast setup command
npm create vite@latest my-blog -- --template react-ts
\`\`\`

{: .notice--success}
**Performance Score:** Optimized minimalist architectures score 100/100 on Google Lighthouse out of the box!
`
  },
  {
    id: 'designing-content-first-typography-for-the-web',
    slug: 'designing-content-first-typography-for-the-web',
    title: 'Designing Content-First Typography for the Web',
    subtitle: 'Font pairings, tracking, vertical rhythm, and line heights for maximum legibility.',
    excerpt: 'Explore how optical spacing and font pairing elevate user engagement and reduce visual fatigue during long reads.',
    date: '2026-06-12',
    readTime: '3 min read',
    category: 'Design',
    tags: ['Typography', 'UI Design', 'CSS'],
    featured: false,
    coverImage: 'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?auto=format&fit=crop&q=80&w=1200',
    author: {
      name: 'Michael Rose',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
      role: 'UI Designer & Web Developer'
    },
    views: 1100,
    comments: [],
    content: `
# Designing Content-First Typography for the Web

Typography is the backbone of web communication. Over 90% of information on the web is delivered through written text.

## Golden Rules for Readable Web Text

1. **Line Length (Measure)**: Aim for 50-75 characters per line (approx. 'max-w-2xl' or '65ch').
2. **Line Height (Leading)**: Use 1.5 - 1.7 for body text to allow the eye to easily track from one line to the next.
3. **Contrast**: High contrast dark gray ('#22252a') on warm off-white ('#f9fafb') is gentler on the eyes than pure '#000' on '#fff'.

{: .notice--primary}
**Design Tip:** Pair a high-character geometric or serif font for headlines with a clean sans-serif for body copy.
`
  }
];

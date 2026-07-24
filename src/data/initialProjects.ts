import { Project } from '../types';

export const initialProjects: Project[] = [
  {
    id: 'minimal-mistakes',
    title: 'Minimal Mistakes',
    description: 'A flexible two-column Jekyll theme perfect for building personal sites, blogs, and documentation portfolios.',
    stars: 12450,
    forks: 21300,
    language: 'HTML / Ruby',
    tags: ['Jekyll', 'Theme', 'Blog', 'Responsive', 'GitHub Pages'],
    githubUrl: 'https://github.com/mmistakes/minimal-mistakes',
    demoUrl: 'https://mmistakes.github.io/minimal-mistakes/',
    featured: true,
    category: 'Themes'
  },
  {
    id: 'so-simple',
    title: 'So Simple Theme',
    description: 'A simple, clean, and content-first Jekyll theme created for writers and open-source documentation.',
    stars: 1820,
    forks: 1450,
    language: 'HTML / SCSS',
    tags: ['Jekyll', 'Minimalist', 'Typography'],
    githubUrl: 'https://github.com/mmistakes/so-simple-theme',
    demoUrl: 'https://mmistakes.github.io/so-simple-theme/',
    featured: true,
    category: 'Themes'
  },
  {
    id: 'skinny-bones',
    title: 'Skinny Bones Jekyll Starter',
    description: 'A bare-bones starter template with SCSS modular structures, responsive navigation, and performance optimization.',
    stars: 940,
    forks: 620,
    language: 'SCSS',
    tags: ['Starter', 'Jekyll', 'SCSS'],
    githubUrl: 'https://github.com/mmistakes/skinny-bones-jekyll',
    featured: false,
    category: 'Starters'
  },
  {
    id: 'paper-theme',
    title: 'Paper Reader Theme',
    description: 'A clean editorial blog theme focusing on long-form typography, progress indicators, and distraction-free reading.',
    stars: 760,
    forks: 310,
    language: 'TypeScript / React',
    tags: ['React', 'Typography', 'Blog'],
    githubUrl: 'https://github.com/mmistakes/paper-theme',
    featured: true,
    category: 'Web Apps'
  }
];

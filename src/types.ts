export type SkinTheme = 'default' | 'dark' | 'aqua' | 'dirt' | 'contrast';

export interface PostNotice {
  type: 'info' | 'warning' | 'danger' | 'success' | 'primary';
  title?: string;
  content: string;
}

export interface PostComment {
  id: string;
  author: string;
  avatar: string;
  date: string;
  content: string;
  likes: number;
}

export interface Post {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  excerpt: string;
  content: string;
  date: string;
  lastUpdated?: string;
  readTime: string;
  category: string;
  tags: string[];
  featured?: boolean;
  coverImage?: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  notices?: PostNotice[];
  views: number;
  comments: PostComment[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  tags: string[];
  githubUrl: string;
  demoUrl?: string;
  featured?: boolean;
  category: string;
}

export interface AuthorProfile {
  name: string;
  handle: string;
  avatar: string;
  role: string;
  bio: string;
  location: string;
  email: string;
  website: string;
  github: string;
  twitter: string;
  linkedin: string;
  stats: {
    postsCount: number;
    projectsCount: number;
    totalStars: string;
  };
}

export type ViewMode = 'home' | 'post-detail' | 'categories' | 'tags' | 'archive' | 'projects' | 'about';

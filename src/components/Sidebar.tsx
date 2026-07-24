import React, { useState } from 'react';
import { MapPin, Mail, Globe, Github, Twitter, Linkedin, Rss, UserPlus, Check, Sparkles, Folder, Tag } from 'lucide-react';
import { AuthorProfile } from '../types';

interface SidebarProps {
  profile: AuthorProfile;
  categories: { name: string; count: number }[];
  tags: { name: string; count: number }[];
  selectedCategory?: string;
  selectedTag?: string;
  onSelectCategory: (cat: string | undefined) => void;
  onSelectTag: (tag: string | undefined) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  profile,
  categories,
  tags,
  selectedCategory,
  selectedTag,
  onSelectCategory,
  onSelectTag,
}) => {
  const [following, setFollowing] = useState(false);

  return (
    <aside className="w-full lg:w-72 shrink-0 space-y-6">
      
      {/* Author Profile Card */}
      <div className="bg-var-card border border-var-border p-6 flex flex-col items-center shadow-2xs">
        
        {/* Avatar & Online Badge */}
        <div className="flex flex-col items-center text-center w-full">
          <div className="relative mb-5 group">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border border-gray-200 p-1 bg-gray-50 dark:bg-zinc-800 transition-transform group-hover:scale-105"
            />
            <span
              className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-blue-500 border-2 border-white dark:border-zinc-900 rounded-full"
              title="Available for projects & writing"
            />
          </div>

          <h2 className="text-lg font-bold text-var-heading tracking-tight mb-1">
            {profile.name}
          </h2>
          <p className="text-xs font-medium text-var-muted italic mb-4">
            {profile.role}. Author of Minimal Mistakes Jekyll theme.
          </p>

          <p className="text-xs text-var-text leading-relaxed mb-5 border-b border-var-border pb-4 w-full">
            {profile.bio}
          </p>

          {/* Geo Links List with Colored Dot Markers */}
          <div className="space-y-2 text-xs w-full text-left mb-6">
            <div className="flex items-center gap-3 p-2 hover:bg-var-hover rounded cursor-pointer transition-colors">
              <div className="w-2 h-2 bg-blue-500 rounded-full shrink-0" />
              <span className="text-var-text font-medium">{profile.location}</span>
            </div>
            <a
              href={profile.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-2 hover:bg-var-hover rounded cursor-pointer transition-colors"
            >
              <div className="w-2 h-2 bg-gray-300 dark:bg-zinc-600 rounded-full shrink-0" />
              <span className="text-var-text truncate font-medium">{profile.website.replace('https://', '')}</span>
            </a>
            <div className="flex items-center gap-3 p-2 hover:bg-var-hover rounded cursor-pointer transition-colors">
              <div className="w-2 h-2 bg-gray-300 dark:bg-zinc-600 rounded-full shrink-0" />
              <span className="text-var-text font-medium">Twitter / GitHub</span>
            </div>
          </div>

          {/* Follow Button */}
          <button
            onClick={() => setFollowing(!following)}
            className={`w-full py-2.5 px-4 bg-black dark:bg-white text-white dark:text-black text-xs font-bold uppercase tracking-widest rounded transition-all cursor-pointer hover:opacity-90 shadow-2xs ${
              following ? 'bg-emerald-600 text-white dark:bg-emerald-600' : ''
            }`}
          >
            {following ? 'Following' : 'Follow'}
          </button>
        </div>

        {/* Location & Social Links */}
        <div className="mt-5 w-full space-y-2 text-xs text-var-text border-t border-var-border pt-4">
          <div className="flex items-center justify-center gap-3 pt-1">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded hover:bg-var-hover hover:text-black dark:hover:text-white text-var-muted transition-colors"
              title="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={profile.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded hover:bg-var-hover hover:text-black dark:hover:text-white text-var-muted transition-colors"
              title="Twitter"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded hover:bg-var-hover hover:text-black dark:hover:text-white text-var-muted transition-colors"
              title="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="#rss"
              onClick={(e) => { e.preventDefault(); alert('RSS Feed: https://mmistakes.github.io/feed.xml'); }}
              className="p-1.5 rounded hover:bg-var-hover hover:text-black dark:hover:text-white text-var-muted transition-colors"
              title="RSS Feed"
            >
              <Rss className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Profile Statistics Bar */}
        <div className="mt-4 pt-3 border-t border-var-border grid grid-cols-3 text-center w-full">
          <div>
            <span className="block text-sm font-bold text-var-heading">{profile.stats.postsCount}</span>
            <span className="text-[9px] uppercase tracking-widest text-var-muted font-bold">Posts</span>
          </div>
          <div>
            <span className="block text-sm font-bold text-var-heading">{profile.stats.projectsCount}</span>
            <span className="text-[9px] uppercase tracking-widest text-var-muted font-bold">Projects</span>
          </div>
          <div>
            <span className="block text-sm font-bold text-var-heading">{profile.stats.totalStars}</span>
            <span className="text-[9px] uppercase tracking-widest text-var-muted font-bold">Stars</span>
          </div>
        </div>
      </div>

      {/* Categories Widget */}
      <div className="bg-var-card border border-var-border p-5 shadow-2xs">
        <h3 className="text-xs font-bold uppercase tracking-widest text-var-muted mb-3 pb-2 border-b border-var-border flex items-center justify-between">
          <span>Categories</span>
          <Folder className="w-3.5 h-3.5 text-blue-600" />
        </h3>
        <div className="space-y-1">
          <button
            onClick={() => onSelectCategory(undefined)}
            className={`w-full text-left px-2.5 py-1.5 text-xs font-medium uppercase tracking-wider flex items-center justify-between transition-colors cursor-pointer ${
              selectedCategory === undefined
                ? 'bg-black text-white dark:bg-white dark:text-black font-bold'
                : 'text-var-text hover:bg-var-hover'
            }`}
          >
            <span>All Categories</span>
          </button>
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => onSelectCategory(selectedCategory === cat.name ? undefined : cat.name)}
              className={`w-full text-left px-2.5 py-1.5 text-xs font-medium flex items-center justify-between transition-colors cursor-pointer ${
                selectedCategory === cat.name
                  ? 'bg-black text-white dark:bg-white dark:text-black font-bold'
                  : 'text-var-text hover:bg-var-hover'
              }`}
            >
              <span>{cat.name}</span>
              <span className={`px-1.5 py-0.5 text-[10px] font-mono ${
                selectedCategory === cat.name ? 'bg-zinc-800 text-white dark:bg-gray-200 dark:text-black' : 'bg-var-badge text-var-muted'
              }`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Popular Tags Widget */}
      <div className="bg-var-card border border-var-border p-5 shadow-2xs">
        <h3 className="text-xs font-bold uppercase tracking-widest text-var-muted mb-3 pb-2 border-b border-var-border flex items-center justify-between">
          <span>Popular Tags</span>
          <Tag className="w-3.5 h-3.5 text-blue-600" />
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {tags.map((t) => (
            <button
              key={t.name}
              onClick={() => onSelectTag(selectedTag === t.name ? undefined : t.name)}
              className={`px-2 py-1 text-xs font-mono transition-colors cursor-pointer ${
                selectedTag === t.name
                  ? 'bg-black text-white font-bold'
                  : 'bg-var-badge text-var-text hover:bg-var-hover hover:text-black border border-var-border'
              }`}
            >
              #{t.name}
              <span className="ml-1 opacity-70 text-[10px]">({t.count})</span>
            </button>
          ))}
        </div>
      </div>

    </aside>
  );
};

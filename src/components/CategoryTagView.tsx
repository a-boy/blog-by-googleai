import React, { useState } from 'react';
import { Layers, Tag, BookOpen } from 'lucide-react';
import { Post } from '../types';
import { PostCard } from './PostCard';

interface CategoryTagViewProps {
  posts: Post[];
  initialCategory?: string;
  initialTag?: string;
  onSelectPost: (post: Post) => void;
  bookmarks: string[];
  onToggleBookmark: (id: string) => void;
}

export const CategoryTagView: React.FC<CategoryTagViewProps> = ({
  posts,
  initialCategory,
  initialTag,
  onSelectPost,
  bookmarks,
  onToggleBookmark,
}) => {
  const [selectedCat, setSelectedCat] = useState<string | undefined>(initialCategory);
  const [selectedTag, setSelectedTag] = useState<string | undefined>(initialTag);

  // Calculate Categories
  const categoryCounts: Record<string, number> = {};
  posts.forEach((p) => {
    categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
  });

  // Calculate Tags
  const tagCounts: Record<string, number> = {};
  posts.forEach((p) => {
    p.tags.forEach((t) => {
      tagCounts[t] = (tagCounts[t] || 0) + 1;
    });
  });

  // Filter posts
  const filteredPosts = posts.filter((p) => {
    if (selectedCat && p.category !== selectedCat) return false;
    if (selectedTag && !p.tags.includes(selectedTag)) return false;
    return true;
  });

  return (
    <div className="space-y-8">
      
      {/* Header Banner */}
      <div className="bg-var-card border border-var-border rounded-xl p-6 shadow-2xs">
        <h1 className="text-2xl font-serif font-bold text-var-heading mb-2 flex items-center gap-2">
          <Layers className="w-6 h-6 text-var-accent" />
          <span>Categories & Tags Index</span>
        </h1>
        <p className="text-xs sm:text-sm text-var-muted leading-relaxed">
          Browse articles by category topics or specific technology tags.
        </p>

        {/* Active Filter Badges */}
        {(selectedCat || selectedTag) && (
          <div className="mt-4 pt-3 border-t border-var-border flex items-center gap-2 flex-wrap text-xs">
            <span className="text-var-muted font-medium">Active Filters:</span>
            {selectedCat && (
              <span className="px-2.5 py-1 rounded bg-var-accent text-white font-semibold flex items-center gap-1">
                Category: {selectedCat}
                <button onClick={() => setSelectedCat(undefined)} className="ml-1 hover:text-red-200 cursor-pointer">×</button>
              </span>
            )}
            {selectedTag && (
              <span className="px-2.5 py-1 rounded bg-var-accent text-white font-semibold flex items-center gap-1 font-mono">
                #{selectedTag}
                <button onClick={() => setSelectedTag(undefined)} className="ml-1 hover:text-red-200 cursor-pointer">×</button>
              </span>
            )}
            <button
              onClick={() => { setSelectedCat(undefined); setSelectedTag(undefined); }}
              className="text-var-accent hover:underline ml-2 text-xs font-semibold cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Categories Grid */}
      <div className="bg-var-card border border-var-border rounded-xl p-6 shadow-2xs">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-var-muted mb-4 flex items-center gap-1.5">
          <Layers className="w-4 h-4 text-var-accent" />
          <span>Categories</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {Object.entries(categoryCounts).map(([cat, count]) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(selectedCat === cat ? undefined : cat)}
              className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                selectedCat === cat
                  ? 'bg-var-accent-light border-var-accent text-var-accent font-semibold shadow-2xs'
                  : 'bg-var-badge border-var-border text-var-heading hover:border-var-accent/50'
              }`}
            >
              <span className="block text-sm font-bold truncate">{cat}</span>
              <span className="text-[11px] font-mono text-var-muted">{count} articles</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tags Cloud */}
      <div className="bg-var-card border border-var-border rounded-xl p-6 shadow-2xs">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-var-muted mb-4 flex items-center gap-1.5">
          <Tag className="w-4 h-4 text-var-accent" />
          <span>Tag Cloud</span>
        </h2>
        <div className="flex flex-wrap gap-2">
          {Object.entries(tagCounts).map(([tag, count]) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(selectedTag === tag ? undefined : tag)}
              className={`px-3 py-1.5 rounded-md text-xs font-mono transition-all cursor-pointer ${
                selectedTag === tag
                  ? 'bg-var-accent text-white font-bold shadow-2xs'
                  : 'bg-var-badge text-var-text border border-var-border hover:border-var-accent hover:text-var-accent'
              }`}
            >
              #{tag} <span className="opacity-70 text-[10px]">({count})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Filtered Articles Feed */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-var-heading flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-var-accent" />
          <span>Matching Articles ({filteredPosts.length})</span>
        </h3>

        {filteredPosts.length === 0 ? (
          <div className="p-12 text-center text-var-muted bg-var-card rounded-xl border border-var-border text-xs">
            No posts match the selected criteria.
          </div>
        ) : (
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onSelectPost={onSelectPost}
                isBookmarked={bookmarks.includes(post.id)}
                onToggleBookmark={onToggleBookmark}
              />
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Calendar, Clock, ArrowRight, Tag } from 'lucide-react';
import { Post } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  posts: Post[];
  onSelectPost: (post: Post) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  posts,
  onSelectPost,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Keyboard shortcut listener (Cmd+K / Esc)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredPosts = query.trim() === ''
    ? posts.slice(0, 4) // Show top recent posts when empty
    : posts.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)) ||
          p.content.toLowerCase().includes(q)
        );
      });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="fixed inset-0"
        onClick={onClose}
      />

      <div className="relative w-full max-w-2xl bg-var-card border border-var-border rounded-xl shadow-2xl overflow-hidden z-10 animate-in zoom-in-95 duration-150">
        
        {/* Input Bar */}
        <div className="flex items-center px-4 py-3 border-b border-var-border bg-var-input-bg">
          <Search className="w-5 h-5 text-var-accent shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search articles, tags, topics... (e.g., 'Minimalism', 'React', 'CSS')"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm sm:text-base text-var-heading placeholder-var-muted outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-var-muted hover:text-var-heading mr-2 cursor-pointer"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 rounded text-var-muted hover:text-var-heading hover:bg-var-hover cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-3">
          <div className="text-[10px] font-bold uppercase tracking-wider text-var-muted px-2">
            {query.trim() === '' ? 'Recent Articles' : `Found ${filteredPosts.length} results`}
          </div>

          {filteredPosts.length === 0 ? (
            <div className="py-12 text-center text-var-muted text-xs">
              No matching articles found for "{query}".
            </div>
          ) : (
            filteredPosts.map((post) => (
              <div
                key={post.id}
                onClick={() => {
                  onSelectPost(post);
                  onClose();
                }}
                className="p-3 rounded-lg border border-var-border bg-var-card hover:bg-var-hover hover:border-var-accent transition-all cursor-pointer group flex items-start justify-between gap-4"
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2 text-[10px] font-mono text-var-muted">
                    <span className="px-1.5 py-0.5 rounded bg-var-accent-light text-var-accent font-semibold uppercase">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-var-accent" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-var-accent" />
                      {post.readTime}
                    </span>
                  </div>

                  <h4 className="font-serif font-bold text-sm text-var-heading group-hover:text-var-accent transition-colors truncate">
                    {post.title}
                  </h4>

                  <p className="text-xs text-var-muted line-clamp-1">
                    {post.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-1 pt-1">
                    {post.tags.map((t) => (
                      <span key={t} className="text-[10px] font-mono text-var-muted flex items-center gap-0.5">
                        <Tag className="w-2.5 h-2.5 text-var-accent" />
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                <ArrowRight className="w-4 h-4 text-var-accent opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all shrink-0 mt-2" />
              </div>
            ))
          )}
        </div>

        {/* Footer Hint */}
        <div className="px-4 py-2 border-t border-var-border bg-var-badge text-[11px] text-var-muted flex items-center justify-between font-mono">
          <span>Tip: Press ESC to close search</span>
          <span>Minimal Mistakes Engine</span>
        </div>
      </div>
    </div>
  );
};

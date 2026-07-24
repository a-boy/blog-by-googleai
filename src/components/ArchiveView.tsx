import React from 'react';
import { Archive, Calendar, ArrowRight } from 'lucide-react';
import { Post } from '../types';

interface ArchiveViewProps {
  posts: Post[];
  onSelectPost: (post: Post) => void;
}

export const ArchiveView: React.FC<ArchiveViewProps> = ({ posts, onSelectPost }) => {
  // Group posts by Year
  const groupedByYear: Record<string, Post[]> = {};

  posts.forEach((post) => {
    const year = post.date.substring(0, 4);
    if (!groupedByYear[year]) {
      groupedByYear[year] = [];
    }
    groupedByYear[year].push(post);
  });

  const sortedYears = Object.keys(groupedByYear).sort((a, b) => Number(b) - Number(a));

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="bg-var-card border border-var-border rounded-xl p-6 shadow-2xs">
        <h1 className="text-2xl font-serif font-bold text-var-heading mb-2 flex items-center gap-2">
          <Archive className="w-6 h-6 text-var-accent" />
          <span>Post Archives</span>
        </h1>
        <p className="text-xs sm:text-sm text-var-muted leading-relaxed">
          Chronological index of all published essays, technical guides, and release notes.
        </p>
      </div>

      {/* Timeline by Year */}
      <div className="space-y-10">
        {sortedYears.map((year) => (
          <div key={year} className="bg-var-card border border-var-border rounded-xl p-6 shadow-2xs">
            <div className="flex items-center gap-3 mb-6 pb-3 border-b border-var-border">
              <span className="text-2xl font-serif font-bold text-var-accent">{year}</span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-var-badge text-var-muted">
                {groupedByYear[year].length} articles
              </span>
            </div>

            <div className="space-y-3 pl-2 sm:pl-4 border-l-2 border-var-border">
              {groupedByYear[year].map((post) => (
                <div
                  key={post.id}
                  onClick={() => onSelectPost(post)}
                  className="p-3 rounded-lg hover:bg-var-hover transition-colors cursor-pointer group flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-var-accent shrink-0 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.date.substring(5)}
                    </span>
                    <h3 className="font-serif font-bold text-sm sm:text-base text-var-heading group-hover:text-var-accent transition-colors">
                      {post.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-var-muted self-end sm:self-auto">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-var-badge">
                      {post.category}
                    </span>
                    <ArrowRight className="w-4 h-4 text-var-accent opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

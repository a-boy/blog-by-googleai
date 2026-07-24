import React from 'react';
import { Calendar, Clock, Eye, Bookmark, ArrowRight, MessageSquare } from 'lucide-react';
import { Post } from '../types';

interface PostCardProps {
  post: Post;
  viewType?: 'list' | 'grid';
  onSelectPost: (post: Post) => void;
  isBookmarked: boolean;
  onToggleBookmark: (postId: string) => void;
}

export const PostCard: React.FC<PostCardProps> = ({
  post,
  viewType = 'list',
  onSelectPost,
  isBookmarked,
  onToggleBookmark,
}) => {
  return (
    <article
      className={`bg-var-card border border-var-border hover:border-black dark:hover:border-white transition-all duration-200 group flex shadow-2xs ${
        viewType === 'grid' ? 'flex-col h-full' : 'flex-col sm:flex-row'
      }`}
    >
      {/* Cover Image (if available) */}
      {post.coverImage && (
        <div
          onClick={() => onSelectPost(post)}
          className={`relative overflow-hidden bg-var-hover cursor-pointer shrink-0 ${
            viewType === 'grid' ? 'w-full h-48' : 'w-full sm:w-56 h-48 sm:h-auto'
          }`}
        >
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {post.featured && (
            <span className="absolute top-3 left-3 bg-black text-white px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-widest">
              Featured
            </span>
          )}
        </div>
      )}

      {/* Card Body Content */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata Bar */}
          <div className="flex items-center justify-between text-xs text-var-muted mb-2 gap-2 flex-wrap">
            <div className="flex items-center gap-3">
              <span className="text-xs text-blue-600 dark:text-blue-400 font-bold uppercase tracking-widest block">
                {post.category}
              </span>
              <span className="flex items-center gap-1 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                <Calendar className="w-3 h-3" />
                {post.date}
              </span>
              <span className="flex items-center gap-1 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                <Clock className="w-3 h-3" />
                {post.readTime}
              </span>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleBookmark(post.id);
              }}
              className={`p-1.5 transition-colors cursor-pointer ${
                isBookmarked
                  ? 'text-black dark:text-white bg-gray-100 dark:bg-zinc-800'
                  : 'text-gray-400 hover:text-black dark:hover:text-white'
              }`}
              title={isBookmarked ? 'Remove bookmark' : 'Bookmark post'}
            >
              <Bookmark className="w-4 h-4 fill-current" />
            </button>
          </div>

          {/* Title */}
          <h2
            onClick={() => onSelectPost(post)}
            className="text-lg sm:text-xl font-bold font-serif text-var-heading group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors cursor-pointer leading-tight mb-2"
          >
            {post.title}
          </h2>

          {/* Subtitle / Excerpt */}
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 line-clamp-2 leading-relaxed mb-4 font-sans">
            {post.excerpt}
          </p>
        </div>

        {/* Footer info: tags & read button */}
        <div>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 bg-var-badge text-var-muted border border-var-border"
              >
                #{tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-var-border text-xs text-var-muted">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-5 h-5 rounded-full object-cover border border-gray-200"
                />
                <span className="text-var-text font-medium text-xs">{post.author.name}</span>
              </div>
              <span className="flex items-center gap-1 font-mono text-[11px]">
                <Eye className="w-3 h-3" />
                {post.views}
              </span>
              <span className="flex items-center gap-1 font-mono text-[11px]">
                <MessageSquare className="w-3 h-3" />
                {post.comments.length}
              </span>
            </div>

            <button
              onClick={() => onSelectPost(post)}
              className="text-xs font-bold uppercase tracking-widest text-black dark:text-white hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform cursor-pointer"
            >
              <span>Read</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

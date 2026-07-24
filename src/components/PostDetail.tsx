import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Eye,
  Share2,
  Bookmark,
  Check,
  Copy,
  MessageSquare,
  ThumbsUp,
  Send,
  ZoomIn,
  ZoomOut,
  ChevronRight,
  BookOpen
} from 'lucide-react';
import { Post, PostComment } from '../types';
import { TableOfContents } from './TableOfContents';
import { NoticeBox } from './NoticeBox';

interface PostDetailProps {
  post: Post;
  allPosts: Post[];
  onBack: () => void;
  onSelectPost: (post: Post) => void;
  isBookmarked: boolean;
  onToggleBookmark: (postId: string) => void;
  onAddComment: (postId: string, comment: Omit<PostComment, 'id' | 'date' | 'likes'>) => void;
  onLikeComment: (postId: string, commentId: string) => void;
}

export const PostDetail: React.FC<PostDetailProps> = ({
  post,
  allPosts,
  onBack,
  onSelectPost,
  isBookmarked,
  onToggleBookmark,
  onAddComment,
  onLikeComment,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);
  const [fontSize, setFontSize] = useState<number>(16); // 16px base font size
  const [scrollProgress, setScrollProgress] = useState(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);

  // New Comment state
  const [newCommentAuthor, setNewCommentAuthor] = useState('');
  const [newCommentText, setNewCommentText] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100');

  const avatarOptions = [
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100',
    'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=100',
    'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&q=80&w=100',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100',
  ];

  // Scroll Progress Listener
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleShare = async () => {
    const shareData = {
      title: post.title,
      text: post.excerpt || post.subtitle || post.title,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        setToastMessage('Post shared successfully!');
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
        return;
      } catch (err: any) {
        if (err.name === 'AbortError') return;
      }
    }

    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setToastMessage('Link copied to clipboard!');
      setShowToast(true);
      setTimeout(() => {
        setCopiedLink(false);
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setToastMessage('Failed to copy link');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentAuthor.trim() || !newCommentText.trim()) return;

    onAddComment(post.id, {
      author: newCommentAuthor.trim(),
      avatar: selectedAvatar,
      content: newCommentText.trim(),
    });

    setNewCommentText('');
  };

  // Find next/prev post
  const currentIndex = allPosts.findIndex((p) => p.id === post.id);
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  return (
    <div className="relative pb-16">
      
      {/* Top Reading Progress Bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-var-accent z-50 transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Navigation Breadcrumb & Tools Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-var-border text-xs text-var-muted">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 font-semibold text-var-accent hover:underline cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Posts</span>
        </button>

        {/* Breadcrumb path */}
        <div className="hidden sm:flex items-center gap-1.5 text-var-muted">
          <span>Home</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-var-accent font-medium">{post.category}</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="truncate max-w-xs">{post.title}</span>
        </div>

        {/* Controls: Font size & Share */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-var-badge px-2 py-1 rounded border border-var-border">
            <button
              onClick={() => setFontSize(Math.max(14, fontSize - 1))}
              className="p-1 hover:text-var-accent cursor-pointer"
              title="Decrease font size"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="font-mono text-[11px] px-1">{fontSize}px</span>
            <button
              onClick={() => setFontSize(Math.min(22, fontSize + 1))}
              className="p-1 hover:text-var-accent cursor-pointer"
              title="Increase font size"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={() => onToggleBookmark(post.id)}
            className={`p-1.5 rounded border border-var-border transition-colors cursor-pointer ${
              isBookmarked
                ? 'bg-var-accent text-white border-var-accent'
                : 'bg-var-card text-var-muted hover:text-var-accent'
            }`}
            title="Bookmark this post"
          >
            <Bookmark className="w-4 h-4 fill-current" />
          </button>

          <button
            onClick={handleShare}
            className="p-1.5 px-2.5 rounded bg-var-card border border-var-border text-var-muted hover:text-black dark:hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer text-xs font-bold uppercase tracking-wider"
            title="Share this post"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5 text-blue-600" />}
            <span className="hidden sm:inline">Share</span>
          </button>
        </div>
      </div>

      {/* Main Layout: Reader Body + Table of Contents Sidebar */}
      <div className="flex flex-col xl:flex-row gap-8 items-start">
        
        {/* Article Body Container */}
        <div className="flex-1 min-w-0 w-full bg-var-card border border-var-border rounded-xl p-6 sm:p-10 shadow-2xs">
          
          {/* Article Header */}
          <header className="mb-8 border-b border-var-border pb-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-var-accent-light text-var-accent uppercase tracking-wider">
                {post.category}
              </span>
              {post.featured && (
                <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-amber-500 text-white uppercase tracking-wider">
                  Featured
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-4xl font-bold font-serif text-var-heading tracking-tight leading-tight mb-4">
              {post.title}
            </h1>

            {post.subtitle && (
              <p className="text-base sm:text-lg text-var-muted font-medium leading-relaxed mb-6">
                {post.subtitle}
              </p>
            )}

            {/* Author & Meta bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-var-border text-xs text-var-muted">
              <div className="flex items-center gap-3">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-var-accent"
                />
                <div>
                  <span className="block font-bold text-var-heading text-sm">{post.author.name}</span>
                  <span className="text-var-muted">{post.author.role}</span>
                </div>
              </div>

              <div className="flex items-center gap-4 font-mono text-[11px] flex-wrap">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-var-accent" />
                  {post.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-var-accent" />
                  {post.readTime}
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5 text-var-accent" />
                  {post.views} views
                </span>
              </div>
            </div>
          </header>

          {/* Cover Header Image */}
          {post.coverImage && (
            <div className="mb-8 rounded-lg overflow-hidden border border-var-border">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-auto max-h-96 object-cover"
              />
            </div>
          )}

          {/* Notice Callouts Top */}
          {post.notices && post.notices.length > 0 && (
            <div className="mb-8 space-y-4">
              {post.notices.map((notice, idx) => (
                <NoticeBox key={idx} notice={notice} />
              ))}
            </div>
          )}

          {/* Article Markdown Content Area */}
          <div
            className="prose dark:prose-invert max-w-none transition-all leading-relaxed text-var-text"
            style={{ fontSize: `${fontSize}px` }}
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ children }) => {
                  const text = String(children);
                  const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
                  return (
                    <h1 id={id} className="text-2xl sm:text-3xl font-bold font-serif text-var-heading mt-8 mb-4 border-b border-var-border pb-2">
                      {children}
                    </h1>
                  );
                },
                h2: ({ children }) => {
                  const text = String(children);
                  const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
                  return (
                    <h2 id={id} className="text-xl sm:text-2xl font-bold font-serif text-var-heading mt-8 mb-3 border-b border-var-border/60 pb-1">
                      {children}
                    </h2>
                  );
                },
                h3: ({ children }) => {
                  const text = String(children);
                  const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
                  return (
                    <h3 id={id} className="text-lg font-bold font-serif text-var-heading mt-6 mb-2">
                      {children}
                    </h3>
                  );
                },
                p: ({ children }) => {
                  const content = String(children);
                  
                  // Handle Minimal Mistakes style Kramdown notice blocks: {: .notice--info}
                  if (content.startsWith('{: .notice--')) {
                    const match = content.match(/^\{:\s*\.notice--(\w+)\}\s*([\s\S]*)/);
                    if (match) {
                      const noticeType = match[1] as any;
                      const noticeBody = match[2];
                      return (
                        <NoticeBox
                          notice={{
                            type: ['info', 'warning', 'danger', 'success', 'primary'].includes(noticeType) ? noticeType : 'info',
                            content: noticeBody
                          }}
                        />
                      );
                    }
                  }

                  return <p className="mb-4 leading-relaxed text-var-text">{children}</p>;
                },
                blockquote: ({ children }) => (
                  <blockquote className="my-6 pl-4 border-l-4 border-var-accent italic bg-var-accent-light/50 p-3 rounded-r-md text-var-text">
                    {children}
                  </blockquote>
                ),
                table: ({ children }) => (
                  <div className="my-6 overflow-x-auto border border-var-border rounded-lg">
                    <table className="w-full text-left border-collapse text-xs sm:text-sm">
                      {children}
                    </table>
                  </div>
                ),
                thead: ({ children }) => (
                  <thead className="bg-var-badge text-var-heading font-semibold border-b border-var-border">
                    {children}
                  </thead>
                ),
                th: ({ children }) => <th className="p-3 font-semibold">{children}</th>,
                td: ({ children }) => <td className="p-3 border-t border-var-border">{children}</td>,
                code: ({ className, children, ...props }) => {
                  const match = /language-(\w+)/.exec(className || '');
                  const codeString = String(children).replace(/\n$/, '');
                  const isInline = !match && !String(children).includes('\n');

                  if (isInline) {
                    return (
                      <code className="px-1.5 py-0.5 rounded bg-var-badge font-mono text-[0.85em] text-var-accent border border-var-border" {...props}>
                        {children}
                      </code>
                    );
                  }

                  const codeId = Math.random().toString(36).substring(7);
                  const isCopied = copiedCodeId === codeId;

                  return (
                    <div className="relative my-6 rounded-lg overflow-hidden border border-var-border bg-slate-900 text-slate-100 font-mono text-xs sm:text-sm shadow-md">
                      <div className="flex items-center justify-between px-4 py-2 bg-slate-950 border-b border-slate-800 text-slate-400 text-xs">
                        <span className="uppercase font-semibold tracking-wider">{match ? match[1] : 'code'}</span>
                        <button
                          onClick={() => handleCopyCode(codeString, codeId)}
                          className="flex items-center gap-1 px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer text-xs"
                        >
                          {isCopied ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="text-emerald-400">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                      <pre className="p-4 overflow-x-auto leading-relaxed">
                        <code>{children}</code>
                      </pre>
                    </div>
                  );
                }
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>

          {/* Tags & Share Footer */}
          <div className="mt-8 pt-6 border-t border-var-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-var-muted uppercase tracking-wider mr-1">Tags:</span>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-mono uppercase tracking-wider px-2.5 py-1 bg-var-badge text-var-text border border-var-border"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <button
              onClick={handleShare}
              className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black text-xs font-bold uppercase tracking-widest rounded hover:opacity-90 transition-all flex items-center gap-2 cursor-pointer shadow-2xs shrink-0"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share Article</span>
            </button>
          </div>

          {/* Bottom Author Bio Card */}
          <div className="mt-10 p-5 rounded-xl bg-var-hover border border-var-border flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-var-accent shrink-0"
            />
            <div className="space-y-1">
              <h3 className="font-bold font-serif text-var-heading text-base">
                Written by {post.author.name}
              </h3>
              <p className="text-xs text-var-muted font-medium">{post.author.role}</p>
              <p className="text-xs text-var-text leading-relaxed pt-1">
                Designer, developer, writer. Passionate about web performance, clean minimal interfaces, and developer documentation.
              </p>
            </div>
          </div>

          {/* Next / Previous Article Links */}
          <div className="mt-10 pt-6 border-t border-var-border grid grid-cols-1 sm:grid-cols-2 gap-4">
            {prevPost ? (
              <button
                onClick={() => onSelectPost(prevPost)}
                className="p-4 rounded-lg bg-var-badge border border-var-border hover:border-var-accent text-left transition-colors cursor-pointer group"
              >
                <span className="block text-[10px] uppercase font-bold text-var-muted mb-1">← Previous Article</span>
                <span className="font-serif font-bold text-sm text-var-heading group-hover:text-var-accent line-clamp-1">
                  {prevPost.title}
                </span>
              </button>
            ) : <div />}

            {nextPost ? (
              <button
                onClick={() => onSelectPost(nextPost)}
                className="p-4 rounded-lg bg-var-badge border border-var-border hover:border-var-accent text-right transition-colors cursor-pointer group"
              >
                <span className="block text-[10px] uppercase font-bold text-var-muted mb-1">Next Article →</span>
                <span className="font-serif font-bold text-sm text-var-heading group-hover:text-var-accent line-clamp-1">
                  {nextPost.title}
                </span>
              </button>
            ) : <div />}
          </div>

          {/* Comments Section */}
          <section className="mt-12 pt-8 border-t border-var-border">
            <h3 className="text-xl font-serif font-bold text-var-heading mb-6 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-var-accent" />
              <span>Comments ({post.comments.length})</span>
            </h3>

            {/* Comments List */}
            <div className="space-y-4 mb-8">
              {post.comments.length === 0 ? (
                <p className="text-xs text-var-muted italic">No comments yet. Be the first to start the discussion!</p>
              ) : (
                post.comments.map((comment) => (
                  <div key={comment.id} className="p-4 rounded-lg bg-var-card border border-var-border shadow-2xs">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <img
                          src={comment.avatar}
                          alt={comment.author}
                          className="w-6 h-6 rounded-full object-cover"
                        />
                        <span className="font-bold text-xs text-var-heading">{comment.author}</span>
                        <span className="text-[10px] text-var-muted font-mono">{comment.date}</span>
                      </div>

                      <button
                        onClick={() => onLikeComment(post.id, comment.id)}
                        className="flex items-center gap-1 text-xs text-var-muted hover:text-var-accent transition-colors cursor-pointer"
                      >
                        <ThumbsUp className="w-3.5 h-3.5" />
                        <span className="font-mono text-[11px]">{comment.likes}</span>
                      </button>
                    </div>

                    <p className="text-xs text-var-text leading-relaxed">{comment.content}</p>
                  </div>
                ))
              )}
            </div>

            {/* Add Comment Form */}
            <form onSubmit={handleCommentSubmit} className="p-4 rounded-xl bg-var-hover border border-var-border space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-var-heading">Leave a Comment</h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Your Name / Handle"
                  value={newCommentAuthor}
                  onChange={(e) => setNewCommentAuthor(e.target.value)}
                  required
                  className="px-3 py-2 rounded-md text-xs bg-var-card border border-var-border focus:border-var-accent text-var-heading outline-none"
                />

                {/* Avatar Choice */}
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-var-muted">Avatar:</span>
                  <div className="flex gap-1.5">
                    {avatarOptions.map((img) => (
                      <img
                        key={img}
                        src={img}
                        alt="Avatar choice"
                        onClick={() => setSelectedAvatar(img)}
                        className={`w-6 h-6 rounded-full object-cover cursor-pointer border-2 ${
                          selectedAvatar === img ? 'border-var-accent scale-110' : 'border-transparent opacity-60'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <textarea
                rows={3}
                placeholder="Write your thoughts..."
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-md text-xs bg-var-card border border-var-border focus:border-var-accent text-var-heading outline-none resize-y"
              />

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-md text-xs font-semibold bg-var-accent text-white hover:opacity-90 transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Post Comment</span>
                </button>
              </div>
            </form>
          </section>

        </div>

        {/* Table of Contents Sticky Sidebar */}
        <TableOfContents content={post.content} />
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 bg-black dark:bg-white text-white dark:text-black text-xs font-bold uppercase tracking-wider rounded shadow-xl border border-neutral-800 dark:border-neutral-200 transition-all">
          <Check className="w-4 h-4 text-emerald-400 dark:text-emerald-600 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

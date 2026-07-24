import React, { useState } from 'react';
import { X, Eye, Edit3, Plus, Sparkles, Send, Image, Bookmark, AlertTriangle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Post } from '../types';
import { NoticeBox } from './NoticeBox';

interface PostEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSavePost: (post: Post) => void;
  authorName: string;
  authorAvatar: string;
  authorRole: string;
}

export const PostEditorModal: React.FC<PostEditorModalProps> = ({
  isOpen,
  onClose,
  onSavePost,
  authorName,
  authorAvatar,
  authorRole,
}) => {
  const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write');

  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [category, setCategory] = useState('Web Dev');
  const [tagsInput, setTagsInput] = useState('React, Minimalism, CSS');
  const [coverImage, setCoverImage] = useState('');
  const [content, setContent] = useState(`
# My New Article

Write your long-form article using clean Markdown.

## Features Included

- **Typography**: Clean heading hierarchy.
- **Code Highlights**:
\`\`\`typescript
const greeting: string = "Hello, Minimal Mistakes!";
console.log(greeting);
\`\`\`

{: .notice--info}
**Pro Tip:** You can insert Minimal Mistakes notice callouts like this!
`);

  if (!isOpen) return null;

  const insertNoticeSnippet = (type: string) => {
    const snippet = `\n{: .notice--${type}}\n**${type.toUpperCase()} Notice:** Add your notice description here.\n`;
    setContent((prev) => prev + snippet);
  };

  const insertCodeSnippet = () => {
    const snippet = `\n\`\`\`typescript\n// Write your code snippet here\nconst result = true;\n\`\`\`\n`;
    setContent((prev) => prev + snippet);
  };

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const tagsArr = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const wordCount = content.split(/\s+/).length;
    const readMinutes = Math.max(1, Math.ceil(wordCount / 200));

    const newPost: Post = {
      id: title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-') || `post-${Date.now()}`,
      slug: title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-'),
      title: title.trim(),
      subtitle: subtitle.trim() || undefined,
      excerpt: excerpt.trim() || (content.slice(0, 150) + '...'),
      content: content.trim(),
      date: new Date().toISOString().split('T')[0],
      readTime: `${readMinutes} min read`,
      category: category.trim() || 'General',
      tags: tagsArr.length > 0 ? tagsArr : ['Article'],
      coverImage: coverImage.trim() || undefined,
      author: {
        name: authorName,
        avatar: authorAvatar,
        role: authorRole,
      },
      views: 1,
      comments: [],
    };

    onSavePost(newPost);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-4xl bg-var-card border border-var-border rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-var-border bg-var-badge">
          <div className="flex items-center gap-2">
            <Edit3 className="w-5 h-5 text-var-accent" />
            <h2 className="text-base font-serif font-bold text-var-heading">
              Create New Article (Markdown Draft)
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {/* Write vs Preview Tabs */}
            <div className="flex items-center p-0.5 bg-var-card rounded-md border border-var-border">
              <button
                onClick={() => setActiveTab('write')}
                className={`px-3 py-1 text-xs font-semibold rounded flex items-center gap-1 transition-colors cursor-pointer ${
                  activeTab === 'write' ? 'bg-var-accent text-white shadow-2xs' : 'text-var-muted hover:text-var-heading'
                }`}
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Write</span>
              </button>
              <button
                onClick={() => setActiveTab('preview')}
                className={`px-3 py-1 text-xs font-semibold rounded flex items-center gap-1 transition-colors cursor-pointer ${
                  activeTab === 'preview' ? 'bg-var-accent text-white shadow-2xs' : 'text-var-muted hover:text-var-heading'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Preview</span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1 rounded text-var-muted hover:text-var-heading hover:bg-var-hover cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          
          {activeTab === 'write' ? (
            <form id="post-form" onSubmit={handlePublish} className="space-y-4">
              
              {/* Title & Subtitle */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-var-heading mb-1">Article Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Modern CSS Layout Strategies"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-md text-xs bg-var-input-bg border border-var-border focus:border-var-accent text-var-heading outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-var-heading mb-1">Subtitle (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. Exploring Container Queries and Grid"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-md text-xs bg-var-input-bg border border-var-border focus:border-var-accent text-var-heading outline-none"
                  />
                </div>
              </div>

              {/* Category, Tags, Cover Image */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-var-heading mb-1">Category</label>
                  <input
                    type="text"
                    placeholder="Web Dev, Design, Jekyll..."
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-md text-xs bg-var-input-bg border border-var-border focus:border-var-accent text-var-heading outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-var-heading mb-1">Tags (Comma separated)</label>
                  <input
                    type="text"
                    placeholder="CSS, React, Minimalist"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    className="w-full px-3 py-2 rounded-md text-xs bg-var-input-bg border border-var-border focus:border-var-accent text-var-heading outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-var-heading mb-1">Cover Image URL (Optional)</label>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    className="w-full px-3 py-2 rounded-md text-xs bg-var-input-bg border border-var-border focus:border-var-accent text-var-heading outline-none"
                  />
                </div>
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-xs font-semibold text-var-heading mb-1">Short Excerpt / Summary</label>
                <input
                  type="text"
                  placeholder="Brief summary of the article..."
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  className="w-full px-3 py-2 rounded-md text-xs bg-var-input-bg border border-var-border focus:border-var-accent text-var-heading outline-none"
                />
              </div>

              {/* Markdown Helper Toolbar */}
              <div className="flex flex-wrap items-center gap-2 pt-2 pb-1 border-t border-var-border text-xs">
                <span className="text-[11px] font-semibold text-var-muted uppercase tracking-wider">Insert Snippets:</span>
                <button
                  type="button"
                  onClick={() => insertNoticeSnippet('info')}
                  className="px-2 py-1 rounded bg-sky-100 text-sky-800 dark:bg-sky-900/50 dark:text-sky-300 font-semibold cursor-pointer"
                >
                  + Info Notice
                </button>
                <button
                  type="button"
                  onClick={() => insertNoticeSnippet('warning')}
                  className="px-2 py-1 rounded bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300 font-semibold cursor-pointer"
                >
                  + Warning Notice
                </button>
                <button
                  type="button"
                  onClick={() => insertNoticeSnippet('success')}
                  className="px-2 py-1 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300 font-semibold cursor-pointer"
                >
                  + Success Notice
                </button>
                <button
                  type="button"
                  onClick={insertCodeSnippet}
                  className="px-2 py-1 rounded bg-var-badge border border-var-border font-mono text-var-heading cursor-pointer"
                >
                  + Code Block
                </button>
              </div>

              {/* Markdown Content Editor */}
              <div>
                <label className="block text-xs font-semibold text-var-heading mb-1">Markdown Body *</label>
                <textarea
                  rows={12}
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full p-3 rounded-md font-mono text-xs bg-var-input-bg border border-var-border focus:border-var-accent text-var-heading outline-none leading-relaxed resize-y"
                />
              </div>

            </form>
          ) : (
            /* Live Markdown Preview */
            <div className="prose dark:prose-invert max-w-none text-var-text space-y-4">
              <div className="p-4 rounded-lg bg-var-badge border border-var-border text-xs mb-4">
                <h2 className="text-xl font-serif font-bold text-var-heading">{title || 'Untitled Article'}</h2>
                <p className="text-var-muted">{subtitle}</p>
                <div className="mt-2 text-[11px] font-mono text-var-accent">Category: {category} | Tags: {tagsInput}</div>
              </div>

              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {content}
              </ReactMarkdown>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-var-border bg-var-badge flex items-center justify-between">
          <span className="text-[11px] text-var-muted font-mono">
            {content.split(/\s+/).length} words
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 rounded-md text-xs font-medium text-var-text hover:bg-var-hover cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="post-form"
              className="px-5 py-1.5 rounded-md text-xs font-semibold bg-var-accent text-white hover:opacity-90 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Publish Post</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

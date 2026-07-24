/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Search,
  LayoutGrid,
  List,
  SlidersHorizontal,
  PlusCircle,
  ArrowUp,
  Heart,
  Github,
  Rss,
  Bookmark,
  Sparkles
} from 'lucide-react';
import { Post, ViewMode, SkinTheme, PostComment } from './types';
import { initialPosts } from './data/initialPosts';
import { authorProfile } from './data/authorProfile';
import { initialProjects } from './data/initialProjects';

import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { PostCard } from './components/PostCard';
import { PostDetail } from './components/PostDetail';
import { CategoryTagView } from './components/CategoryTagView';
import { ArchiveView } from './components/ArchiveView';
import { ProjectsView } from './components/ProjectsView';
import { AboutView } from './components/AboutView';
import { SearchModal } from './components/SearchModal';
import { PostEditorModal } from './components/PostEditorModal';

export default function App() {
  // Persistence state
  const [posts, setPosts] = useState<Post[]>(() => {
    const saved = localStorage.getItem('mm_posts');
    return saved ? JSON.parse(saved) : initialPosts;
  });

  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    const saved = localStorage.getItem('mm_bookmarks');
    return saved ? JSON.parse(saved) : ['mastering-minimalist-blog-design'];
  });

  const [currentSkin, setCurrentSkin] = useState<SkinTheme>(() => {
    const saved = localStorage.getItem('mm_skin') as SkinTheme;
    return saved || 'default';
  });

  // Views & Selection state
  const [currentView, setCurrentView] = useState<ViewMode>('home');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  const [selectedTag, setSelectedTag] = useState<string | undefined>(undefined);
  const [onlyBookmarks, setOnlyBookmarks] = useState<boolean>(false);

  // Controls state
  const [cardLayout, setCardLayout] = useState<'list' | 'grid'>('list');
  const [sortBy, setSortBy] = useState<'date' | 'views' | 'comments'>('date');

  // Modals state
  const [searchOpen, setSearchOpen] = useState(false);
  const [writeModalOpen, setWriteModalOpen] = useState(false);

  // Apply Skin Theme to DOM body
  useEffect(() => {
    document.documentElement.setAttribute('data-skin', currentSkin);
    localStorage.setItem('mm_skin', currentSkin);
  }, [currentSkin]);

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem('mm_posts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('mm_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  // Bookmark Toggle Handler
  const handleToggleBookmark = (postId: string) => {
    setBookmarks((prev) =>
      prev.includes(postId) ? prev.filter((id) => id !== postId) : [...prev, postId]
    );
  };

  // Add Comment Handler
  const handleAddComment = (postId: string, commentData: Omit<PostComment, 'id' | 'date' | 'likes'>) => {
    const newComment: PostComment = {
      ...commentData,
      id: `c-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      likes: 0,
    };

    setPosts((prevPosts) =>
      prevPosts.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            comments: [newComment, ...p.comments],
          };
        }
        return p;
      })
    );

    if (selectedPost && selectedPost.id === postId) {
      setSelectedPost((prev) => prev ? { ...prev, comments: [newComment, ...prev.comments] } : null);
    }
  };

  // Like Comment Handler
  const handleLikeComment = (postId: string, commentId: string) => {
    setPosts((prevPosts) =>
      prevPosts.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            comments: p.comments.map((c) =>
              c.id === commentId ? { ...c, likes: c.likes + 1 } : c
            ),
          };
        }
        return p;
      })
    );

    if (selectedPost && selectedPost.id === postId) {
      setSelectedPost((prev) =>
        prev
          ? {
              ...prev,
              comments: prev.comments.map((c) =>
                c.id === commentId ? { ...c, likes: c.likes + 1 } : c
              ),
            }
          : null
      );
    }
  };

  // Add New Post Handler
  const handleSaveNewPost = (newPost: Post) => {
    setPosts((prev) => [newPost, ...prev]);
    setSelectedPost(newPost);
    setCurrentView('post-detail');
  };

  // Post Selection Handler
  const handleSelectPost = (post: Post) => {
    // Increment view count
    setPosts((prev) =>
      prev.map((p) => (p.id === post.id ? { ...p, views: p.views + 1 } : p))
    );
    setSelectedPost({ ...post, views: post.views + 1 });
    setCurrentView('post-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Navigation Handler
  const handleNavigate = (view: ViewMode) => {
    setCurrentView(view);
    if (view !== 'post-detail') {
      setSelectedPost(null);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Calculate Categories & Tags summary for Sidebar
  const categoriesList = Array.from(new Set(posts.map((p) => p.category))).map((cat) => ({
    name: cat,
    count: posts.filter((p) => p.category === cat).length,
  }));

  const allTagsMap: Record<string, number> = {};
  posts.forEach((p) => {
    p.tags.forEach((t) => {
      allTagsMap[t] = (allTagsMap[t] || 0) + 1;
    });
  });
  const tagsList = Object.entries(allTagsMap).map(([name, count]) => ({ name, count }));

  // Filter & Sort Posts for Feed
  const filteredPosts = posts
    .filter((p) => {
      if (selectedCategory && p.category !== selectedCategory) return false;
      if (selectedTag && !p.tags.includes(selectedTag)) return false;
      if (onlyBookmarks && !bookmarks.includes(p.id)) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'views') return b.views - a.views;
      if (sortBy === 'comments') return b.comments.length - a.comments.length;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

  return (
    <div className="min-h-screen bg-var-canvas text-var-text transition-colors flex flex-col font-sans">
      
      {/* Sticky Navigation Header */}
      <Header
        currentView={currentView}
        onNavigate={handleNavigate}
        currentSkin={currentSkin}
        onSelectSkin={setCurrentSkin}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenWriteModal={() => setWriteModalOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Post Detail Full View */}
        {currentView === 'post-detail' && selectedPost ? (
          <PostDetail
            post={selectedPost}
            allPosts={posts}
            onBack={() => handleNavigate('home')}
            onSelectPost={handleSelectPost}
            isBookmarked={bookmarks.includes(selectedPost.id)}
            onToggleBookmark={handleToggleBookmark}
            onAddComment={handleAddComment}
            onLikeComment={handleLikeComment}
          />
        ) : (
          /* Two-Column Responsive Layout for Home / Categories / Archive / Projects / About */
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            
            {/* Left Sidebar Profile (Minimal Mistakes Iconic Sidebar) */}
            <Sidebar
              profile={authorProfile}
              categories={categoriesList}
              tags={tagsList}
              selectedCategory={selectedCategory}
              selectedTag={selectedTag}
              onSelectCategory={setSelectedCategory}
              onSelectTag={setSelectedTag}
            />

            {/* Right Main Content Area */}
            <section className="flex-1 min-w-0 w-full space-y-6">
              
              {/* Home View Articles Stream */}
              {currentView === 'home' && (
                <div className="space-y-8">
                  
                  {/* Featured Post Block (if no filters applied) */}
                  {!selectedCategory && !selectedTag && !onlyBookmarks && (
                    <section>
                      <div className="mb-4 text-xs font-bold uppercase tracking-widest text-var-muted border-b border-var-border pb-2">
                        Featured Post
                      </div>
                      {posts.find((p) => p.featured) && (
                        <div
                          onClick={() => handleSelectPost(posts.find((p) => p.featured)!)}
                          className="bg-var-card border border-var-border p-6 sm:p-8 shadow-2xs hover:border-black dark:hover:border-white transition-colors cursor-pointer group"
                        >
                          <span className="text-xs text-blue-600 dark:text-blue-400 font-bold uppercase tracking-widest mb-2 block">
                            {posts.find((p) => p.featured)!.category}
                          </span>
                          <h1 className="text-2xl sm:text-4xl font-serif font-bold text-var-heading mb-4 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {posts.find((p) => p.featured)!.title}
                          </h1>
                          <p className="text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mb-6 text-sm sm:text-base font-sans">
                            {posts.find((p) => p.featured)!.excerpt}
                          </p>
                          <div className="flex items-center gap-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                            <span>{posts.find((p) => p.featured)!.date}</span>
                            <span>•</span>
                            <span>{posts.find((p) => p.featured)!.readTime}</span>
                          </div>
                        </div>
                      )}
                    </section>
                  )}

                  {/* Active Filter Banner */}
                  {(selectedCategory || selectedTag || onlyBookmarks) && (
                    <div className="p-4 bg-var-card border border-var-border flex items-center justify-between gap-2 text-xs">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-var-muted font-medium uppercase tracking-wider">Active Feed Filter:</span>
                        {selectedCategory && (
                          <span className="px-2.5 py-0.5 bg-black text-white dark:bg-white dark:text-black font-bold uppercase tracking-wider">
                            Category: {selectedCategory}
                          </span>
                        )}
                        {selectedTag && (
                          <span className="px-2.5 py-0.5 bg-black text-white dark:bg-white dark:text-black font-bold font-mono uppercase tracking-wider">
                            #{selectedTag}
                          </span>
                        )}
                        {onlyBookmarks && (
                          <span className="px-2.5 py-0.5 bg-amber-500 text-white font-bold uppercase tracking-wider flex items-center gap-1">
                            <Bookmark className="w-3 h-3 fill-current" />
                            Bookmarked Posts ({bookmarks.length})
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => {
                          setSelectedCategory(undefined);
                          setSelectedTag(undefined);
                          setOnlyBookmarks(false);
                        }}
                        className="text-black dark:text-white hover:underline font-bold uppercase tracking-widest cursor-pointer shrink-0 text-[11px]"
                      >
                        Clear All
                      </button>
                    </div>
                  )}

                  <section>
                    {/* Section Header */}
                    <div className="mb-4 text-xs font-bold uppercase tracking-widest text-var-muted border-b border-var-border pb-2 flex items-center justify-between">
                      <span>Recent Log Entries</span>
                      <span className="text-[10px] text-gray-400">{filteredPosts.length} Entries</span>
                    </div>

                    {/* Filter & View Controls Bar */}
                    <div className="bg-var-card border border-var-border p-4 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-var-muted">
                        <Sparkles className="w-4 h-4 text-blue-600" />
                        <span>Showing {filteredPosts.length} Articles</span>
                      </div>

                      <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                        
                        {/* Bookmarks Toggle */}
                        <button
                          onClick={() => setOnlyBookmarks(!onlyBookmarks)}
                          className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 border transition-all cursor-pointer ${
                            onlyBookmarks
                              ? 'bg-amber-500 text-white border-amber-500 shadow-2xs'
                              : 'bg-var-badge border-var-border text-var-muted hover:text-var-heading'
                          }`}
                          title="Show bookmarked posts"
                        >
                          <Bookmark className="w-3.5 h-3.5 fill-current" />
                          <span className="hidden sm:inline">Saved</span>
                          <span className="font-mono text-[10px]">({bookmarks.length})</span>
                        </button>

                        {/* Sort Selector */}
                        <div className="flex items-center gap-1.5 text-xs text-var-muted font-bold uppercase tracking-wider">
                          <SlidersHorizontal className="w-3.5 h-3.5 text-blue-600" />
                          <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as any)}
                            className="bg-var-badge border border-var-border px-2 py-1 text-xs text-var-heading font-medium uppercase outline-none cursor-pointer"
                          >
                            <option value="date">Latest First</option>
                            <option value="views">Most Viewed</option>
                            <option value="comments">Most Discussed</option>
                          </select>
                        </div>

                        {/* List / Grid Toggle */}
                        <div className="flex items-center p-0.5 bg-var-badge border border-var-border">
                          <button
                            onClick={() => setCardLayout('list')}
                            className={`p-1.5 transition-colors cursor-pointer ${
                              cardLayout === 'list'
                                ? 'bg-black text-white dark:bg-white dark:text-black shadow-2xs'
                                : 'text-var-muted hover:text-var-heading'
                            }`}
                            title="List View"
                          >
                            <List className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setCardLayout('grid')}
                            className={`p-1.5 transition-colors cursor-pointer ${
                              cardLayout === 'grid'
                                ? 'bg-black text-white dark:bg-white dark:text-black shadow-2xs'
                                : 'text-var-muted hover:text-var-heading'
                            }`}
                            title="Grid View"
                          >
                            <LayoutGrid className="w-4 h-4" />
                          </button>
                        </div>

                      </div>
                    </div>

                    {/* Articles Feed List / Grid */}
                    {filteredPosts.length === 0 ? (
                      <div className="bg-var-card border border-var-border p-12 text-center text-var-muted text-xs space-y-3">
                        <p className="text-sm font-semibold text-var-heading">No articles found matching your criteria.</p>
                        <button
                          onClick={() => {
                            setSelectedCategory(undefined);
                            setSelectedTag(undefined);
                            setOnlyBookmarks(false);
                          }}
                          className="px-4 py-2 bg-black text-white text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-all cursor-pointer"
                        >
                          Reset All Filters
                        </button>
                      </div>
                    ) : (
                      <div
                        className={
                          cardLayout === 'grid'
                            ? 'grid grid-cols-1 md:grid-cols-2 gap-6'
                            : 'space-y-6'
                        }
                      >
                        {filteredPosts.map((post) => (
                          <PostCard
                            key={post.id}
                            post={post}
                            viewType={cardLayout}
                            onSelectPost={handleSelectPost}
                            isBookmarked={bookmarks.includes(post.id)}
                            onToggleBookmark={handleToggleBookmark}
                          />
                        ))}
                      </div>
                    )}
                  </section>

                </div>
              )}

              {/* Categories & Tags Index View */}
              {currentView === 'categories' && (
                <CategoryTagView
                  posts={posts}
                  initialCategory={selectedCategory}
                  initialTag={selectedTag}
                  onSelectPost={handleSelectPost}
                  bookmarks={bookmarks}
                  onToggleBookmark={handleToggleBookmark}
                />
              )}

              {/* Tags Only Shortcut */}
              {currentView === 'tags' && (
                <CategoryTagView
                  posts={posts}
                  initialTag={selectedTag}
                  onSelectPost={handleSelectPost}
                  bookmarks={bookmarks}
                  onToggleBookmark={handleToggleBookmark}
                />
              )}

              {/* Archive Timeline View */}
              {currentView === 'archive' && (
                <ArchiveView posts={posts} onSelectPost={handleSelectPost} />
              )}

              {/* Projects Showcase View */}
              {currentView === 'projects' && (
                <ProjectsView projects={initialProjects} />
              )}

              {/* About View */}
              {currentView === 'about' && (
                <AboutView profile={authorProfile} />
              )}

            </section>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="mt-16 bg-var-card border-t border-var-border py-6 text-[11px] text-var-muted transition-colors uppercase tracking-wider font-medium">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div>
            © 2024 Michael Rose • Powered by Jekyll & Minimal Mistakes
          </div>

          <div className="flex items-center gap-6">
            <span className="hover:text-black dark:hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="hover:text-black dark:hover:text-white cursor-pointer">Terms of Service</span>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="px-2.5 py-1 bg-var-badge hover:bg-black hover:text-white text-var-heading flex items-center gap-1.5 border border-var-border cursor-pointer transition-colors"
              title="Back to top"
            >
              <ArrowUp className="w-3 h-3" />
              <span>Top</span>
            </button>
          </div>

        </div>
      </footer>

      {/* Search Modal */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        posts={posts}
        onSelectPost={handleSelectPost}
      />

      {/* Post Editor Modal */}
      <PostEditorModal
        isOpen={writeModalOpen}
        onClose={() => setWriteModalOpen(false)}
        onSavePost={handleSaveNewPost}
        authorName={authorProfile.name}
        authorAvatar={authorProfile.avatar}
        authorRole={authorProfile.role}
      />

    </div>
  );
}

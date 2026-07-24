import React, { useState } from 'react';
import { Search, Palette, Menu, X, PlusCircle, BookOpen, Layers, Tag, Archive, FolderGit2, User } from 'lucide-react';
import { ViewMode, SkinTheme } from '../types';

interface HeaderProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
  currentSkin: SkinTheme;
  onSelectSkin: (skin: SkinTheme) => void;
  onOpenSearch: () => void;
  onOpenWriteModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  currentSkin,
  onSelectSkin,
  onOpenSearch,
  onOpenWriteModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [skinDropdownOpen, setSkinDropdownOpen] = useState(false);

  const skins: { id: SkinTheme; name: string; color: string }[] = [
    { id: 'default', name: 'Default Light', color: 'bg-teal-600' },
    { id: 'dark', name: 'Dark Midnight', color: 'bg-slate-900' },
    { id: 'aqua', name: 'Aqua Ocean', color: 'bg-cyan-600' },
    { id: 'dirt', name: 'Dirt Terracotta', color: 'bg-amber-800' },
    { id: 'contrast', name: 'High Contrast', color: 'bg-black' },
  ];

  const navItems: { view: ViewMode; label: string; icon: React.ReactNode }[] = [
    { view: 'home', label: 'Posts', icon: <BookOpen className="w-4 h-4" /> },
    { view: 'categories', label: 'Categories', icon: <Layers className="w-4 h-4" /> },
    { view: 'tags', label: 'Tags', icon: <Tag className="w-4 h-4" /> },
    { view: 'archive', label: 'Archive', icon: <Archive className="w-4 h-4" /> },
    { view: 'projects', label: 'Projects', icon: <FolderGit2 className="w-4 h-4" /> },
    { view: 'about', label: 'About', icon: <User className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-var-header border-b border-var-border backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Site Title */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('home')}
              className="text-left font-bold text-xl tracking-tight uppercase text-var-heading hover:text-var-accent transition-colors flex items-center gap-2 group cursor-pointer"
            >
              <span className="w-8 h-8 bg-black text-white font-sans font-bold text-xs uppercase flex items-center justify-center tracking-wider group-hover:scale-105 transition-transform">
                MR
              </span>
              <div className="flex flex-col">
                <span className="leading-none text-base sm:text-lg font-bold tracking-tight uppercase font-sans">Michael Rose</span>
                <span className="text-[9px] uppercase tracking-widest font-sans font-medium text-var-muted">Minimal Mistakes</span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-4 text-xs font-medium uppercase tracking-widest">
            {navItems.map((item) => {
              const isActive = currentView === item.view || (currentView === 'post-detail' && item.view === 'home');
              return (
                <button
                  key={item.view}
                  onClick={() => onNavigate(item.view)}
                  className={`py-1.5 px-2 transition-all flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'text-black dark:text-white font-bold border-b-2 border-black dark:border-white'
                      : 'text-gray-500 hover:text-black dark:hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Search Button */}
            <button
              onClick={onOpenSearch}
              className="p-2 sm:px-3 sm:py-1.5 rounded text-xs bg-var-input-bg text-var-muted hover:text-var-heading border border-var-border hover:border-black flex items-center gap-2 transition-all cursor-pointer uppercase tracking-wider font-medium"
              title="Search posts (Cmd + K)"
            >
              <Search className="w-3.5 h-3.5 text-var-accent" />
              <span className="hidden lg:inline text-xs">Search</span>
              <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[9px] font-mono font-semibold bg-var-badge text-var-muted rounded border border-var-border">
                ⌘K
              </kbd>
            </button>

            {/* Write New Post */}
            <button
              onClick={onOpenWriteModal}
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 bg-black text-white text-xs font-bold uppercase tracking-widest rounded hover:bg-neutral-800 transition-all cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Write</span>
            </button>

            {/* Theme / Skin Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setSkinDropdownOpen(!skinDropdownOpen)}
                className="p-2 rounded-md text-var-text hover:bg-var-hover border border-var-border flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Change Color Theme Skin"
              >
                <Palette className="w-4 h-4 text-var-accent" />
                <span className="hidden xl:inline text-xs font-medium uppercase tracking-wider">
                  Skin
                </span>
              </button>

              {skinDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setSkinDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-48 rounded-lg bg-var-card border border-var-border shadow-xl z-20 py-1.5 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-3 py-1.5 text-[11px] font-semibold text-var-muted uppercase tracking-wider border-b border-var-border">
                      Minimal Mistakes Skins
                    </div>
                    {skins.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => {
                          onSelectSkin(s.id);
                          setSkinDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-xs font-medium flex items-center gap-2 transition-colors cursor-pointer ${
                          currentSkin === s.id
                            ? 'bg-var-accent-light text-var-accent font-semibold'
                            : 'text-var-text hover:bg-var-hover'
                        }`}
                      >
                        <span className={`w-3 h-3 rounded-full ${s.color} shrink-0`} />
                        <span>{s.name}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-var-text hover:bg-var-hover border border-var-border transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Collapsible Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-var-border bg-var-card px-4 pt-2 pb-4 space-y-2 animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => {
              const isActive = currentView === item.view || (currentView === 'post-detail' && item.view === 'home');
              return (
                <button
                  key={item.view}
                  onClick={() => {
                    onNavigate(item.view);
                    setMobileMenuOpen(false);
                  }}
                  className={`px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-colors ${
                    isActive
                      ? 'bg-var-accent-light text-var-accent font-semibold'
                      : 'text-var-text hover:bg-var-hover'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => {
              onOpenWriteModal();
              setMobileMenuOpen(false);
            }}
            className="w-full mt-2 flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-semibold bg-var-accent text-white"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Write New Blog Post</span>
          </button>
        </div>
      )}
    </header>
  );
};

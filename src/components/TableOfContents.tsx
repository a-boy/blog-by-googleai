import React, { useEffect, useState } from 'react';
import { ListTree } from 'lucide-react';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ content }) => {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Parse Markdown headings from content
    const lines = content.split('\n');
    const parsedHeadings: TOCItem[] = [];

    lines.forEach((line) => {
      const match = line.match(/^(#{1,3})\s+(.+)$/);
      if (match) {
        const level = match[1].length;
        const text = match[2].trim().replace(/\*|_|`/g, ''); // strip markdown formatting
        const id = text
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-');

        parsedHeadings.push({ id, text, level });
      }
    });

    setHeadings(parsedHeadings);
  }, [content]);

  useEffect(() => {
    if (headings.length === 0) return;

    const handleScroll = () => {
      const headingElements = headings
        .map((h) => document.getElementById(h.id))
        .filter(Boolean) as HTMLElement[];

      const scrollPosition = window.scrollY + 100;

      for (let i = headingElements.length - 1; i >= 0; i--) {
        const elem = headingElements[i];
        if (elem && elem.offsetTop <= scrollPosition) {
          setActiveId(elem.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [headings]);

  if (headings.length === 0) return null;

  const scrollToHeading = (id: string) => {
    const elem = document.getElementById(id);
    if (elem) {
      const yOffset = -80;
      const y = elem.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveId(id);
    }
  };

  return (
    <div className="bg-var-card border border-var-border rounded-xl p-4 shadow-2xs sticky top-24 hidden xl:block w-64 shrink-0 transition-colors">
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-var-border text-xs font-semibold uppercase tracking-wider text-var-muted">
        <ListTree className="w-4 h-4 text-var-accent" />
        <span>Table of Contents</span>
      </div>

      <nav className="space-y-1 max-h-[calc(100vh-200px)] overflow-y-auto pr-1 text-xs">
        {headings.map((h) => {
          const isActive = activeId === h.id;
          const indent = h.level === 1 ? 'pl-0 font-semibold' : h.level === 2 ? 'pl-3' : 'pl-6 text-[11px]';

          return (
            <button
              key={h.id}
              onClick={() => scrollToHeading(h.id)}
              className={`w-full text-left py-1 rounded transition-colors block truncate cursor-pointer ${indent} ${
                isActive
                  ? 'text-var-accent font-semibold bg-var-accent-light'
                  : 'text-var-muted hover:text-var-heading hover:bg-var-hover'
              }`}
            >
              {h.text}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

import React from 'react';
import { FolderGit2, Star, GitFork, ExternalLink, Github } from 'lucide-react';
import { Project } from '../types';

interface ProjectsViewProps {
  projects: Project[];
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({ projects }) => {
  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="bg-var-card border border-var-border rounded-xl p-6 shadow-2xs">
        <h1 className="text-2xl font-serif font-bold text-var-heading mb-2 flex items-center gap-2">
          <FolderGit2 className="w-6 h-6 text-var-accent" />
          <span>Open Source Projects & Themes</span>
        </h1>
        <p className="text-xs sm:text-sm text-var-muted leading-relaxed">
          Free and open-source Jekyll themes, React starters, and frontend tools crafted for the web community.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-var-card border border-var-border rounded-xl p-6 shadow-2xs hover:border-var-accent/50 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-var-accent-light text-var-accent">
                  {project.category}
                </span>

                <div className="flex items-center gap-3 text-xs font-mono text-var-muted">
                  <span className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    {project.stars.toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <GitFork className="w-3.5 h-3.5" />
                    {project.forks.toLocaleString()}
                  </span>
                </div>
              </div>

              <h3 className="text-lg font-serif font-bold text-var-heading group-hover:text-var-accent transition-colors mb-2">
                {project.title}
              </h3>

              <p className="text-xs sm:text-sm text-var-text leading-relaxed mb-4">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-6">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-mono px-2 py-0.5 rounded bg-var-badge text-var-muted border border-var-border"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-var-border text-xs font-semibold">
              <span className="text-var-muted font-mono text-[11px]">{project.language}</span>

              <div className="flex items-center gap-3">
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-var-accent hover:underline flex items-center gap-1"
                  >
                    <span>Live Demo</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded bg-var-badge hover:bg-var-hover text-var-heading flex items-center gap-1 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

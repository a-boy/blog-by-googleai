import React, { useState } from 'react';
import { User, Terminal, Code2, Send, CheckCircle2, Sparkles, MapPin, Mail, Globe } from 'lucide-react';
import { AuthorProfile } from '../types';

interface AboutViewProps {
  profile: AuthorProfile;
}

export const AboutView: React.FC<AboutViewProps> = ({ profile }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setFormSubmitted(true);
  };

  const skills = [
    'React & Next.js',
    'TypeScript',
    'Jekyll & Ruby',
    'Tailwind CSS & SCSS',
    'UI / UX Architecture',
    'Web Accessibility (WCAG)',
    'Markdown Systems',
    'Performance Optimization'
  ];

  const timeline = [
    {
      year: '2022 - Present',
      role: 'Principal UI Designer & Open Source Creator',
      company: 'Self-Employed / Minimal Mistakes',
      description: 'Maintaining Minimal Mistakes Jekyll theme used by 100k+ developer sites. Writing about web standards and frontend design.'
    },
    {
      year: '2018 - 2022',
      role: 'Lead Frontend Engineer',
      company: 'Creative Tech Studio',
      description: 'Designed content-first documentation platforms, web apps, and design tokens libraries.'
    },
    {
      year: '2014 - 2018',
      role: 'Web Designer & Developer',
      company: 'Digital Agency',
      description: 'Built custom responsive WordPress & Jekyll sites for clients worldwide.'
    }
  ];

  return (
    <div className="space-y-8">
      
      {/* Header Banner */}
      <div className="bg-var-card border border-var-border rounded-xl p-6 sm:p-8 shadow-2xs flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <img
          src={profile.avatar}
          alt={profile.name}
          className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-var-accent shadow-md shrink-0"
        />
        <div className="space-y-2 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <span className="px-2.5 py-0.5 rounded-md text-xs font-bold uppercase tracking-wider bg-var-accent-light text-var-accent">
              About Me
            </span>
            <span className="text-xs font-mono text-var-muted">@{profile.handle}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-var-heading">
            {profile.name}
          </h1>
          <p className="text-sm font-semibold text-var-accent">{profile.role}</p>
          <p className="text-xs sm:text-sm text-var-text leading-relaxed max-w-2xl">
            {profile.bio}
          </p>
        </div>
      </div>

      {/* Skills & Expertise */}
      <div className="bg-var-card border border-var-border rounded-xl p-6 shadow-2xs">
        <h2 className="text-base font-serif font-bold text-var-heading mb-4 flex items-center gap-2">
          <Code2 className="w-5 h-5 text-var-accent" />
          <span>Technical Skills & Focus Areas</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {skills.map((skill) => (
            <div key={skill} className="p-3 rounded-lg bg-var-badge border border-var-border text-xs font-medium text-var-heading flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-var-accent shrink-0" />
              <span>{skill}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-var-card border border-var-border rounded-xl p-6 shadow-2xs">
        <h2 className="text-base font-serif font-bold text-var-heading mb-6 flex items-center gap-2">
          <Terminal className="w-5 h-5 text-var-accent" />
          <span>Experience & Background</span>
        </h2>
        <div className="space-y-6 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-var-border">
          {timeline.map((item, idx) => (
            <div key={idx} className="relative pl-8">
              <div className="absolute left-1.5 top-1.5 w-3 h-3 rounded-full bg-var-accent border-2 border-var-card" />
              <div className="flex items-center gap-2 text-xs font-mono text-var-accent font-semibold mb-1">
                <span>{item.year}</span>
                <span>•</span>
                <span>{item.company}</span>
              </div>
              <h3 className="font-serif font-bold text-sm text-var-heading mb-1">{item.role}</h3>
              <p className="text-xs text-var-muted leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Form */}
      <div className="bg-var-card border border-var-border rounded-xl p-6 shadow-2xs">
        <h2 className="text-base font-serif font-bold text-var-heading mb-2 flex items-center gap-2">
          <Mail className="w-5 h-5 text-var-accent" />
          <span>Get in Touch</span>
        </h2>
        <p className="text-xs text-var-muted mb-6">
          Have a question about Minimal Mistakes, need help with theme customization, or want to collaborate? Send a message below.
        </p>

        {formSubmitted ? (
          <div className="p-6 rounded-lg bg-emerald-50 border border-emerald-300 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-100 text-xs flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
            <div>
              <h4 className="font-bold text-sm mb-1">Message Sent Successfully!</h4>
              <p>Thank you for reaching out. I usually reply within 24–48 hours.</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-var-heading mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Rivera"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-md text-xs bg-var-input-bg border border-var-border focus:border-var-accent text-var-heading outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-var-heading mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. alex@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-md text-xs bg-var-input-bg border border-var-border focus:border-var-accent text-var-heading outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-var-heading mb-1">Message</label>
              <textarea
                rows={4}
                required
                placeholder="Write your inquiry or project details..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3 py-2 rounded-md text-xs bg-var-input-bg border border-var-border focus:border-var-accent text-var-heading outline-none resize-y"
              />
            </div>

            <button
              type="submit"
              className="px-5 py-2 rounded-md text-xs font-semibold bg-var-accent text-white hover:opacity-90 transition-all flex items-center gap-2 cursor-pointer shadow-2xs"
            >
              <Send className="w-4 h-4" />
              <span>Send Message</span>
            </button>
          </form>
        )}
      </div>

    </div>
  );
};

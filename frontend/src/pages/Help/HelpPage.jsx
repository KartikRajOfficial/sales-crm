import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, LifeBuoy, Check, ChevronRight, Info, TriangleAlert, CircleCheckBig } from 'lucide-react';
import { helpSections } from './helpContent';
import PageHeader from '../../components/ui/PageHeader';
import { HelpCircle } from 'lucide-react';

/* ─── Block renderers ─── */

const noteTones = {
  info: { icon: Info, ring: 'border-cyan-500/20 bg-cyan-500/[0.06]', text: 'text-cyan-300' },
  warn: { icon: TriangleAlert, ring: 'border-amber-500/20 bg-amber-500/[0.06]', text: 'text-amber-300' },
  success: { icon: CircleCheckBig, ring: 'border-emerald-500/20 bg-emerald-500/[0.06]', text: 'text-emerald-300' },
};

const Block = ({ block }) => {
  switch (block.type) {
    case 'text':
      return (
        <div>
          {block.title && <h4 className="text-sm font-semibold text-white mb-2">{block.title}</h4>}
          <p className="text-sm text-gray-400 leading-relaxed">{block.body}</p>
        </div>
      );

    case 'steps':
      return (
        <div>
          {block.title && <h4 className="text-sm font-semibold text-white mb-3">{block.title}</h4>}
          <ol className="space-y-2.5">
            {block.steps.map((step, i) => (
              <li key={i} className="flex gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-violet-500/15 text-violet-300 text-xs font-bold shrink-0 tabular-nums">
                  {i + 1}
                </span>
                <span className="text-sm text-gray-400 leading-relaxed pt-0.5">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      );

    case 'fields':
      return (
        <div>
          {block.title && <h4 className="text-sm font-semibold text-white mb-3">{block.title}</h4>}
          <div className="space-y-2">
            {block.fields.map((f, i) => (
              <div key={i} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                <div className="flex items-center gap-2 sm:w-44 shrink-0">
                  <span className="text-sm font-medium text-gray-200">{f.name}</span>
                  {f.required && <span className="text-[10px] font-semibold uppercase tracking-wide text-violet-300 bg-violet-500/15 px-1.5 py-0.5 rounded">Req</span>}
                </div>
                <span className="text-sm text-gray-500 leading-relaxed">{f.desc}</span>
              </div>
            ))}
          </div>
        </div>
      );

    case 'note': {
      const tone = noteTones[block.tone] || noteTones.info;
      const Icon = tone.icon;
      return (
        <div className={`flex gap-3 p-3.5 rounded-xl border ${tone.ring}`}>
          <Icon className={`w-4.5 h-4.5 shrink-0 mt-0.5 ${tone.text}`} />
          <p className="text-sm text-gray-300 leading-relaxed">{block.body}</p>
        </div>
      );
    }

    case 'faq':
      return (
        <div className="space-y-3">
          {block.items.map((item, i) => (
            <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
              <div className="flex gap-2.5 items-start">
                <ChevronRight className="w-4 h-4 text-violet-400 shrink-0 mt-1" />
                <div>
                  <p className="text-sm font-medium text-white">{item.q}</p>
                  <p className="text-sm text-gray-500 leading-relaxed mt-1.5">{item.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      );

    default:
      return null;
  }
};

/* ─── Page ─── */

const HelpPage = () => {
  const [query, setQuery] = useState('');
  const [activeId, setActiveId] = useState(helpSections[0].id);

  const q = query.trim().toLowerCase();

  // Filter sections by title / summary / keywords / rendered text.
  const filtered = useMemo(() => {
    if (!q) return helpSections;
    return helpSections.filter((s) => {
      const haystack = [
        s.title,
        s.summary,
        s.keywords || '',
        ...s.blocks.flatMap((b) => [
          b.title || '',
          b.body || '',
          ...(b.steps || []),
          ...(b.fields || []).flatMap((f) => [f.name, f.desc]),
          ...(b.items || []).flatMap((it) => [it.q, it.a]),
        ]),
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [q]);

  const scrollToSection = (id) => {
    setActiveId(id);
    const el = document.getElementById(`help-${id}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div>
      <PageHeader icon={HelpCircle} title="Help & Guide" subtitle="Everything you need to get the most out of SalesCRM" />

      {/* Hero + search */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-gradient-to-br from-violet-600/[0.14] via-[#12121c]/60 to-cyan-600/[0.08] p-6 sm:p-8 mb-6"
      >
        <div className="absolute -top-12 -right-8 w-48 h-48 rounded-full bg-violet-500/15 blur-3xl pointer-events-none" />
        <div className="relative max-w-2xl">
          <div className="flex items-center gap-2 text-violet-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <LifeBuoy size={14} /> Support Center
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-display tracking-tight">How can we help?</h2>
          <p className="text-gray-400 mt-2">Search the guide or browse a topic to learn how each part of the CRM works.</p>
          <div className="relative mt-5">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search help — e.g. 'delete', 'stage', 'session'…"
              className="w-full bg-[#0a0a12]/70 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder:text-gray-500 focus:border-violet-500/70 focus:ring-2 focus:ring-violet-500/20 outline-none transition-all"
            />
          </div>
        </div>
      </motion.div>

      <div className="flex gap-8">
        {/* Sticky category nav (desktop) */}
        <aside className="hidden lg:block w-56 shrink-0">
          <div className="sticky top-4 space-y-1">
            <p className="px-3 pb-2 text-[10px] font-semibold text-gray-600 uppercase tracking-wider">Topics</p>
            {helpSections.map((s) => {
              const Icon = s.icon;
              const isActive = activeId === s.id;
              const dimmed = q && !filtered.some((f) => f.id === s.id);
              return (
                <button
                  key={s.id}
                  onClick={() => scrollToSection(s.id)}
                  className={`flex items-center gap-2.5 w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    isActive ? 'bg-violet-500/10 text-violet-300' : 'text-gray-400 hover:text-white hover:bg-white/[0.05]'
                  } ${dimmed ? 'opacity-40' : ''}`}
                >
                  <Icon size={16} className="shrink-0" />
                  <span className="truncate">{s.title}</span>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Sections */}
        <div className="flex-1 min-w-0 space-y-5">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center rounded-2xl border border-white/[0.07] bg-[#12121c]/60">
              <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/10 mb-4">
                <Search className="w-6 h-6 text-gray-500" />
              </div>
              <h3 className="text-base font-semibold text-gray-200">No results for “{query}”</h3>
              <p className="text-sm text-gray-500 mt-1.5 max-w-sm">Try a different term, or clear the search to browse every topic.</p>
              <button onClick={() => setQuery('')} className="mt-4 text-sm text-violet-400 hover:text-violet-300 font-medium">
                Clear search
              </button>
            </div>
          ) : (
            filtered.map((section) => {
              const Icon = section.icon;
              return (
                <motion.section
                  key={section.id}
                  id={`help-${section.id}`}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  onViewportEnter={() => setActiveId(section.id)}
                  className="scroll-mt-4 rounded-2xl border border-white/[0.07] bg-[#12121c]/60 overflow-hidden"
                >
                  <div className="h-px w-full accent-hairline" />
                  <div className="p-6">
                    <div className="flex items-center gap-3.5 mb-2">
                      <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-violet-500/20 to-indigo-500/10 border border-white/10 text-violet-300 shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white font-display">{section.title}</h3>
                        <p className="text-sm text-gray-500">{section.summary}</p>
                      </div>
                    </div>
                    <div className="mt-5 space-y-5">
                      {section.blocks.map((block, i) => (
                        <Block key={i} block={block} />
                      ))}
                    </div>
                  </div>
                </motion.section>
              );
            })
          )}

          {/* Footer CTA */}
          <div className="flex items-center gap-3 p-5 rounded-2xl border border-white/[0.07] bg-white/[0.02]">
            <Check className="w-5 h-5 text-emerald-400 shrink-0" />
            <p className="text-sm text-gray-400">
              That's the full tour. As you add leads, customers and deals, the Dashboard and charts fill in automatically.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;

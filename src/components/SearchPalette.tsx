import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Search, CornerDownLeft, X } from 'lucide-react'
import { TOPICS, DOMAINS, GLOSSARY, CHEATSHEETS } from '../data'

interface Hit {
  kind: 'Topic' | 'Domain' | 'Glossary' | 'Cheat sheet'
  title: string
  sub: string
  to: string
  score: number
}

export default function SearchPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState('')
  const [active, setActive] = useState(0)
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      setQ('')
      setActive(0)
      setTimeout(() => inputRef.current?.focus(), 30)
    }
  }, [open])

  const hits = useMemo<Hit[]>(() => {
    const term = q.trim().toLowerCase()
    if (!term) {
      return TOPICS.slice(0, 8).map((t) => ({
        kind: 'Topic' as const,
        title: t.title,
        sub: DOMAINS[t.domain - 1].title,
        to: `/topic/${t.slug}`,
        score: 0,
      }))
    }
    const out: Hit[] = []
    const rank = (hay: string, weight: number) => {
      const i = hay.toLowerCase().indexOf(term)
      return i < 0 ? 0 : weight - i * 0.01
    }
    TOPICS.forEach((t) => {
      const s =
        rank(t.title, 100) +
        rank(t.tagline, 40) +
        rank(t.keywords.join(' '), 55) +
        rank(t.objective, 20)
      if (s > 0) out.push({ kind: 'Topic', title: t.title, sub: `Domain ${t.domain} · ${t.tagline}`, to: `/topic/${t.slug}`, score: s })
    })
    DOMAINS.forEach((d) => {
      const s = rank(d.title, 90) + rank(d.blurb, 30)
      if (s > 0) out.push({ kind: 'Domain', title: d.title, sub: `Exam weight ${d.weight}`, to: `/domain/${d.slug}`, score: s })
    })
    GLOSSARY.forEach((g) => {
      const s = rank(g.term, 85) + rank(g.acronym ?? '', 60) + rank(g.definition, 18)
      if (s > 0) out.push({ kind: 'Glossary', title: g.term, sub: g.definition, to: `/glossary?q=${encodeURIComponent(g.term)}`, score: s })
    })
    CHEATSHEETS.forEach((c) => {
      const s = rank(c.title, 70) + rank(c.blurb, 25)
      if (s > 0) out.push({ kind: 'Cheat sheet', title: c.title, sub: c.blurb, to: `/cheat-sheets#${c.slug}`, score: s })
    })
    return out.sort((a, b) => b.score - a.score).slice(0, 12)
  }, [q])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setActive((a) => Math.min(a + 1, hits.length - 1))
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setActive((a) => Math.max(a - 1, 0))
      }
      if (e.key === 'Enter' && hits[active]) {
        navigate(hits[active].to)
        onClose()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, hits, active, navigate, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[12vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-[#02060d]/80 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            initial={{ y: -14, scale: 0.98 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: -10, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            className="card relative w-full max-w-2xl overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Search CyberSec Academy"
          >
            <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3.5">
              <Search className="h-4 w-4 shrink-0 text-cyber-300" />
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => {
                  setQ(e.target.value)
                  setActive(0)
                }}
                placeholder="Search topics, domains, glossary, cheat sheets…"
                className="w-full bg-transparent text-sm outline-none placeholder:text-[color:var(--text-dim)]"
              />
              <button onClick={onClose} className="chip hover:bg-white/10" aria-label="Close search">
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
            <ul className="max-h-[52vh] overflow-y-auto py-2">
              {hits.length === 0 && <li className="px-5 py-8 text-center text-sm muted">No matches. Try another term.</li>}
              {hits.map((h, i) => (
                <li key={h.to + h.title}>
                  <button
                    onMouseEnter={() => setActive(i)}
                    onClick={() => {
                      navigate(h.to)
                      onClose()
                    }}
                    className={`flex w-full items-start gap-3 px-5 py-2.5 text-left transition ${
                      i === active ? 'bg-cyber-400/12' : 'hover:bg-white/5'
                    }`}
                  >
                    <span className="chip mt-0.5 shrink-0 !text-[9.5px] uppercase tracking-wider text-cyber-300">{h.kind}</span>
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-semibold">{h.title}</span>
                      <span className="block truncate text-xs muted">{h.sub}</span>
                    </span>
                    {i === active && <CornerDownLeft className="ml-auto mt-1 h-3.5 w-3.5 shrink-0 text-cyber-300" />}
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-4 border-t border-white/10 px-5 py-2.5 text-[11px] muted">
              <span><kbd className="kbd">↑</kbd> <kbd className="kbd">↓</kbd> navigate</span>
              <span><kbd className="kbd">↵</kbd> open</span>
              <span><kbd className="kbd">esc</kbd> close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

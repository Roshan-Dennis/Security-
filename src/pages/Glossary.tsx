import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search } from 'lucide-react'
import { Section } from '../components/UI'
import { GLOSSARY, DOMAINS } from '../data'

export default function Glossary() {
  const [params] = useSearchParams()
  const [q, setQ] = useState(params.get('q') ?? '')
  const [domain, setDomain] = useState<number | 'all'>('all')

  const entries = useMemo(() => {
    const term = q.trim().toLowerCase()
    return GLOSSARY.filter((g) => {
      if (domain !== 'all' && g.domain !== domain) return false
      if (!term) return true
      return (
        g.term.toLowerCase().includes(term) ||
        (g.acronym ?? '').toLowerCase().includes(term) ||
        g.definition.toLowerCase().includes(term)
      )
    }).sort((a, b) => a.term.localeCompare(b.term))
  }, [q, domain])

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
      <Section
        eyebrow="Reference"
        title="Glossary"
        intro="The acronyms and terms that appear across the SY0-701 objectives, each defined in a single sentence you can actually use in an exam."
      >
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex flex-1 items-center gap-3 rounded-xl border border-white/12 bg-white/[0.03] px-4 py-2.5">
            <Search className="h-4 w-4 shrink-0 text-cyber-300" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Filter terms, acronyms or definitions…"
              className="w-full bg-transparent text-sm outline-none placeholder:text-[color:var(--text-dim)]"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setDomain('all')}
              className={`chip transition ${domain === 'all' ? 'border-cyber-300/60 bg-cyber-400/15 text-cyber-200' : 'hover:bg-white/10'}`}
            >
              All
            </button>
            {DOMAINS.map((d) => (
              <button
                key={d.id}
                onClick={() => setDomain(d.id)}
                className={`chip transition ${domain === d.id ? 'bg-white/10' : 'hover:bg-white/10'}`}
                style={domain === d.id ? { color: d.accent, borderColor: `${d.accent}55` } : undefined}
              >
                D{d.id}
              </button>
            ))}
          </div>
        </div>

        <p className="mb-4 font-mono text-[11px] muted">{entries.length} terms</p>

        <div className="grid gap-3 md:grid-cols-2">
          {entries.map((g) => {
            const accent = DOMAINS[g.domain - 1].accent
            return (
              <div key={g.term} className="card p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-[15px] font-semibold">{g.term}</h3>
                  <span className="chip font-mono !text-[10px]" style={{ color: accent, borderColor: `${accent}44` }}>
                    D{g.domain}
                  </span>
                </div>
                {g.acronym && <p className="mt-1 font-mono text-[11px] text-cyber-300">{g.acronym}</p>}
                <p className="mt-2.5 text-[13.5px] leading-relaxed muted">{g.definition}</p>
              </div>
            )
          })}
        </div>

        {entries.length === 0 && (
          <p className="card p-10 text-center text-sm muted">No terms match that filter.</p>
        )}
      </Section>
    </div>
  )
}

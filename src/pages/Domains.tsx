import { Link, useParams, Navigate } from 'react-router-dom'
import { ArrowRight, Clock, CircleCheck, Bookmark } from 'lucide-react'
import { Reveal, Section, ProgressRing } from '../components/UI'
import { getIcon } from '../components/iconMap'
import { DOMAINS, TOPICS, domainBySlug, topicsByDomain } from '../data'
import { useStore } from '../lib/store'
import { toneOf, DIFFICULTY_TONE } from '../lib/tone'

export function DomainsIndex() {
  const { completed } = useStore()
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <Section
        eyebrow="Curriculum"
        title="Security+ SY0-701 domains"
        intro="Work through them in order for a structured path, or jump to whichever area you are weakest in. Exam weightings are shown for each domain."
      >
        <div className="space-y-4">
          {DOMAINS.map((d, i) => {
            const topics = topicsByDomain(d.id)
            const done = topics.filter((t) => completed.includes(t.slug)).length
            const pct = topics.length ? Math.round((done / topics.length) * 100) : 0
            const Icon = getIcon(d.icon)
            return (
              <Reveal key={d.slug} delay={i * 0.05}>
                <Link to={`/domain/${d.slug}`} className="card card-hover group flex flex-col gap-5 p-6 sm:flex-row sm:items-center">
                  <span
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl"
                    style={{ background: `${d.accent}1c`, boxShadow: `0 0 30px -10px ${d.accent}` }}
                  >
                    <Icon className="h-6 w-6" style={{ color: d.accent }} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <h2 className="font-display text-lg font-semibold">
                        <span className="muted">Domain {d.id}</span> · {d.title}
                      </h2>
                      <span className="chip font-mono" style={{ color: d.accent }}>{d.weight} of exam</span>
                    </div>
                    <p className="mt-2 max-w-3xl text-[13.5px] leading-relaxed muted">{d.blurb}</p>
                    <p className="mt-3 font-mono text-[11px] muted">
                      {topics.length} topics · {done} completed · approx {topics.reduce((n, t) => n + t.minutes, 0)} min
                    </p>
                  </div>
                  <div className="flex items-center gap-4 sm:flex-col">
                    <div className="relative">
                      <ProgressRing value={pct} size={68} stroke={6} />
                      <span className="absolute inset-0 flex items-center justify-center font-mono text-[12px] font-semibold">
                        {pct}%
                      </span>
                    </div>
                    <span className="flex items-center gap-1 text-[12px] font-semibold text-cyber-200 transition group-hover:gap-2">
                      Open <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </Section>
    </div>
  )
}

export function DomainPage() {
  const { slug = '' } = useParams()
  const domain = domainBySlug(slug)
  const { completed, isBookmarked } = useStore()
  if (!domain) return <Navigate to="/domains" replace />
  const topics = topicsByDomain(domain.id)
  const Icon = getIcon(domain.icon)
  const done = topics.filter((t) => completed.includes(t.slug)).length

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <nav className="mb-6 flex items-center gap-2 font-mono text-[11px] muted">
        <Link to="/domains" className="hover:text-cyber-200">Domains</Link>
        <span>/</span>
        <span className="text-[color:var(--text)]">Domain {domain.id}</span>
      </nav>

      <header className="card relative overflow-hidden p-7">
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full blur-3xl"
          style={{ background: `${domain.accent}22` }}
        />
        <div className="flex flex-wrap items-start gap-5">
          <span
            className="flex h-14 w-14 items-center justify-center rounded-2xl"
            style={{ background: `${domain.accent}1c`, boxShadow: `0 0 30px -10px ${domain.accent}` }}
          >
            <Icon className="h-6 w-6" style={{ color: domain.accent }} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em]" style={{ color: domain.accent }}>
              Domain {domain.id} · {domain.weight} of the exam
            </p>
            <h1 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">{domain.title}</h1>
            <p className="mt-3 max-w-3xl text-[15px] leading-relaxed muted">{domain.blurb}</p>
            <p className="mt-4 font-mono text-[11.5px] muted">
              {topics.length} topics · {done} completed · {topics.reduce((n, t) => n + t.quiz.length, 0)} practice questions
            </p>
          </div>
        </div>
      </header>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {topics.map((t, i) => {
          const diff = toneOf(DIFFICULTY_TONE[t.difficulty])
          const isDone = completed.includes(t.slug)
          return (
            <Reveal key={t.slug} delay={i * 0.04}>
              <Link to={`/topic/${t.slug}`} className="card card-hover group flex h-full flex-col p-5">
                <div className="flex items-start justify-between gap-3">
                  <span className="chip font-mono !text-[10px]" style={{ color: diff.stroke, borderColor: `${diff.stroke}44` }}>
                    {t.difficulty}
                  </span>
                  <span className="flex items-center gap-2">
                    {isBookmarked(t.slug) && <Bookmark className="h-3.5 w-3.5 fill-cyber-300 text-cyber-300" />}
                    {isDone && <CircleCheck className="h-4 w-4 text-neon-green" />}
                  </span>
                </div>
                <h3 className="mt-3 font-display text-[15.5px] font-semibold leading-snug">{t.title}</h3>
                <p className="mt-2 flex-1 text-[13px] leading-relaxed muted">{t.tagline}</p>
                <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3.5">
                  <span className="flex items-center gap-1.5 font-mono text-[10.5px] muted">
                    <Clock className="h-3 w-3" /> {t.minutes} min · {t.quiz.length} questions
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 text-cyber-200 transition group-hover:translate-x-1" />
                </div>
              </Link>
            </Reveal>
          )
        })}
      </div>

      <DomainNav id={domain.id} />
    </div>
  )
}

function DomainNav({ id }: { id: number }) {
  const prev = DOMAINS.find((d) => d.id === id - 1)
  const next = DOMAINS.find((d) => d.id === id + 1)
  return (
    <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-6">
      {prev ? (
        <Link to={`/domain/${prev.slug}`} className="btn-ghost">
          <ArrowRight className="h-4 w-4 rotate-180" /> Domain {prev.id}: {prev.short}
        </Link>
      ) : (
        <span />
      )}
      {next && (
        <Link to={`/domain/${next.slug}`} className="btn-ghost">
          Domain {next.id}: {next.short} <ArrowRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  )
}

export const ALL_TOPICS = TOPICS

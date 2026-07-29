import { Link } from 'react-router-dom'
import { Bookmark, CircleCheck, RotateCcw, Trophy, ArrowRight } from 'lucide-react'
import { Section, ProgressRing, Stat } from '../components/UI'
import { getIcon } from '../components/iconMap'
import { DOMAINS, TOPICS, TOTAL_TOPICS, topicBySlug, topicsByDomain } from '../data'
import { useStore } from '../lib/store'

export default function ProgressPage() {
  const { completed, bookmarks, quizScores, reset, toggleBookmark } = useStore()
  const pct = Math.round((completed.length / TOTAL_TOPICS) * 100)
  const quizEntries = Object.entries(quizScores)
  const quizTotal = quizEntries.reduce((n, [, v]) => n + v.total, 0)
  const quizScore = quizEntries.reduce((n, [, v]) => n + v.score, 0)
  const quizPct = quizTotal ? Math.round((quizScore / quizTotal) * 100) : 0

  const nextUp = TOPICS.find((t) => !completed.includes(t.slug))

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
      <Section
        eyebrow="Your study"
        title="Progress & bookmarks"
        intro="Everything here is stored locally in your own browser — nothing is uploaded anywhere and there is no account to create."
      >
        <div className="card flex flex-col items-center gap-8 p-7 sm:flex-row">
          <div className="relative shrink-0">
            <ProgressRing value={pct} size={132} stroke={11} />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-display text-2xl font-bold">{pct}%</span>
              <span className="font-mono text-[10px] uppercase tracking-wider muted">complete</span>
            </div>
          </div>
          <div className="flex-1">
            <p className="font-display text-lg font-semibold">
              {completed.length} of {TOTAL_TOPICS} topics completed
            </p>
            <p className="mt-1.5 text-[13.5px] muted">
              {pct === 100
                ? 'Full coverage of every topic. Revisit the cheat sheets and retake the quizzes to test retention.'
                : pct >= 50
                  ? 'Solid progress. Keep the streak going — the operations domain carries the heaviest exam weighting.'
                  : 'Getting started. Working through Domain 1 first gives you the vocabulary everything else uses.'}
            </p>
            {nextUp && (
              <Link to={`/topic/${nextUp.slug}`} className="btn-primary mt-5">
                Continue with {nextUp.title} <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <Stat value={String(completed.length)} label="Topics completed" />
          <Stat value={String(bookmarks.length)} label="Bookmarked" />
          <Stat value={String(quizEntries.length)} label="Quizzes attempted" />
          <Stat value={`${quizPct}%`} label="Best-score average" />
        </div>

        <h3 className="mt-12 font-display text-lg font-semibold">Domain coverage</h3>
        <div className="mt-4 space-y-3">
          {DOMAINS.map((d) => {
            const topics = topicsByDomain(d.id)
            const done = topics.filter((t) => completed.includes(t.slug)).length
            const p = Math.round((done / topics.length) * 100)
            const Icon = getIcon(d.icon)
            return (
              <Link key={d.slug} to={`/domain/${d.slug}`} className="card card-hover flex items-center gap-4 p-4">
                <Icon className="h-5 w-5 shrink-0" style={{ color: d.accent }} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="truncate text-[14px] font-semibold">{d.title}</span>
                    <span className="shrink-0 font-mono text-[11px] muted">{done}/{topics.length}</span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full rounded-full transition-all" style={{ width: `${p}%`, background: d.accent }} />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        <h3 className="mt-12 flex items-center gap-2 font-display text-lg font-semibold">
          <Bookmark className="h-4.5 w-4.5 text-cyber-300" /> Bookmarks
        </h3>
        {bookmarks.length === 0 ? (
          <p className="card mt-4 p-8 text-center text-sm muted">
            No bookmarks yet. Use the bookmark button on any topic to save it here.
          </p>
        ) : (
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {bookmarks.map((slug) => {
              const t = topicBySlug(slug)
              if (!t) return null
              return (
                <div key={slug} className="card flex items-center gap-3 p-4">
                  <Link to={`/topic/${slug}`} className="min-w-0 flex-1">
                    <span className="block truncate text-[14px] font-semibold">{t.title}</span>
                    <span className="block truncate text-[12px] muted">{t.tagline}</span>
                  </Link>
                  <button onClick={() => toggleBookmark(slug)} className="chip hover:bg-white/10" aria-label="Remove bookmark">
                    Remove
                  </button>
                </div>
              )
            })}
          </div>
        )}

        <h3 className="mt-12 flex items-center gap-2 font-display text-lg font-semibold">
          <Trophy className="h-4.5 w-4.5 text-neon-amber" /> Quiz results
        </h3>
        {quizEntries.length === 0 ? (
          <p className="card mt-4 p-8 text-center text-sm muted">
            No quizzes taken yet. Every topic ends with exam-style questions.
          </p>
        ) : (
          <div className="card mt-4 divide-y divide-white/6">
            {quizEntries.map(([slug, r]) => {
              const t = topicBySlug(slug)
              const p = Math.round((r.score / r.total) * 100)
              return (
                <Link key={slug} to={`/topic/${slug}#quiz`} className="flex items-center gap-4 px-5 py-3 transition hover:bg-white/[0.03]">
                  <CircleCheck className={`h-4 w-4 shrink-0 ${p >= 80 ? 'text-neon-green' : p >= 50 ? 'text-neon-amber' : 'text-neon-red'}`} />
                  <span className="min-w-0 flex-1 truncate text-[13.5px]">{t?.title ?? slug}</span>
                  <span className="shrink-0 font-mono text-[12px] muted">
                    {r.score}/{r.total} · {p}%
                  </span>
                </Link>
              )
            })}
          </div>
        )}

        <div className="mt-12 border-t border-white/10 pt-6">
          <button
            onClick={() => {
              if (confirm('Reset all progress, bookmarks and quiz scores? This cannot be undone.')) reset()
            }}
            className="btn-ghost text-neon-red"
          >
            <RotateCcw className="h-4 w-4" /> Reset all study data
          </button>
        </div>
      </Section>
    </div>
  )
}

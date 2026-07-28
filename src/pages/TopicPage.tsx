import { useMemo } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight, Bookmark, BookmarkCheck, CircleCheck, Clock, ExternalLink, Lightbulb,
  Quote, ShieldCheck, Target, Wrench, BookOpen, Layers, Crosshair, ListChecks,
} from 'lucide-react'
import Diagram from '../components/Diagram'
import Quiz from '../components/Quiz'
import Scene3D from '../components/Scene3D'
import { Reveal } from '../components/UI'
import { TOPICS, topicBySlug, domainById } from '../data'
import { useStore } from '../lib/store'
import { toneOf, DIFFICULTY_TONE } from '../lib/tone'

const SOURCE_COLOURS: Record<string, string> = {
  NIST: '#4fdcff',
  MITRE: '#ff5b6e',
  OWASP: '#3ddc97',
  CISA: '#ffb547',
  Microsoft: '#a78bfa',
  AWS: '#ffb547',
  Google: '#4fdcff',
  IETF: '#7f93ad',
}

export default function TopicPage() {
  const { slug = '' } = useParams()
  const topic = topicBySlug(slug)
  const { isComplete, toggleComplete, isBookmarked, toggleBookmark } = useStore()

  const { prev, next } = useMemo(() => {
    const i = TOPICS.findIndex((t) => t.slug === slug)
    return { prev: i > 0 ? TOPICS[i - 1] : null, next: i >= 0 && i < TOPICS.length - 1 ? TOPICS[i + 1] : null }
  }, [slug])

  if (!topic) return <Navigate to="/domains" replace />

  const domain = domainById(topic.domain)
  const diff = toneOf(DIFFICULTY_TONE[topic.difficulty])
  const done = isComplete(topic.slug)
  const saved = isBookmarked(topic.slug)

  return (
    <article className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <nav className="mb-6 flex flex-wrap items-center gap-2 font-mono text-[11px] muted">
        <Link to="/domains" className="hover:text-cyber-200">Domains</Link>
        <span>/</span>
        <Link to={`/domain/${domain.slug}`} className="hover:text-cyber-200">{domain.short}</Link>
        <span>/</span>
        <span className="text-[color:var(--text)]">{topic.title}</span>
      </nav>

      {/* ------------------------------------------------------------- header */}
      <header className="card relative overflow-hidden">
        {topic.visual && (
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[42%] opacity-70 md:block">
            <Scene3D variant={topic.visual} className="h-full w-full" density={0.7} />
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(90deg, var(--bg) 2%, transparent 60%)' }}
            />
          </div>
        )}
        <div className="relative p-7 md:max-w-[62%]">
          <div className="flex flex-wrap items-center gap-2">
            <span className="chip font-mono !text-[10px]" style={{ color: domain.accent, borderColor: `${domain.accent}44` }}>
              Domain {topic.domain}
            </span>
            <span className="chip font-mono !text-[10px]" style={{ color: diff.stroke, borderColor: `${diff.stroke}44` }}>
              {topic.difficulty}
            </span>
            <span className="chip font-mono !text-[10px] muted">
              <Clock className="h-3 w-3" /> {topic.minutes} min
            </span>
          </div>

          <h1 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight sm:text-[2.6rem]">
            {topic.title}
          </h1>
          <p className="mt-3 text-[15.5px] leading-relaxed muted">{topic.tagline}</p>
          <p className="mt-4 font-mono text-[10.5px] uppercase tracking-wider muted">
            Objective {topic.objective}
          </p>

          <div className="mt-6 flex flex-wrap gap-2.5">
            <button onClick={() => toggleComplete(topic.slug)} className={done ? 'btn-primary' : 'btn-ghost'}>
              <CircleCheck className="h-4 w-4" /> {done ? 'Completed' : 'Mark as complete'}
            </button>
            <button onClick={() => toggleBookmark(topic.slug)} className="btn-ghost">
              {saved ? <BookmarkCheck className="h-4 w-4 text-cyber-300" /> : <Bookmark className="h-4 w-4" />}
              {saved ? 'Bookmarked' : 'Bookmark'}
            </button>
          </div>
        </div>
      </header>

      {/* ------------------------------------------------------ jump navigation */}
      <div className="sticky top-[68px] z-30 -mx-4 mt-6 overflow-x-auto border-y border-white/10 bg-[color:var(--bg)]/85 px-4 py-2.5 backdrop-blur-xl sm:mx-0 sm:rounded-xl sm:border">
        <div className="flex min-w-max items-center gap-1">
          {[
            ['explanation', 'Explanation'],
            ['diagram', 'Diagram'],
            ['real-world', 'Real world'],
            ['attack', 'Attack scenario'],
            ['tools', 'Tools'],
            ['research', 'Research'],
            ['quiz', 'Quiz'],
          ].map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              className="rounded-lg px-3 py-1.5 text-[12px] font-medium muted transition hover:bg-white/8 hover:text-[color:var(--text)]"
            >
              {label}
            </a>
          ))}
        </div>
      </div>

      <div className="mt-10 space-y-14">
        {/* ------------------------------------------------------ 1. explanation */}
        <TopicSection id="explanation" n={1} icon={BookOpen} title="Simple explanation" accent={domain.accent}>
          <div className="grid gap-4 md:grid-cols-2">
            <Card title="What it is">{topic.simple.what}</Card>
            <Card title="Why it exists">{topic.simple.why}</Card>
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <ListCard title="How it works" items={topic.simple.how} tone="#4fdcff" />
            <ListCard title="Where it is used" items={topic.simple.where} tone="#3ddc97" />
          </div>
        </TopicSection>

        {/* ---------------------------------------------------------- 2. diagram */}
        <TopicSection id="diagram" n={2} icon={Layers} title="Interactive diagram" accent={domain.accent}>
          <Diagram spec={topic.diagram} />
          {topic.visual && (
            <div className="mt-4 card overflow-hidden md:hidden">
              <div className="h-56">
                <Scene3D variant={topic.visual} className="h-full w-full" density={0.6} />
              </div>
              <p className="border-t border-white/10 px-4 py-2.5 text-[11px] muted">
                Real-time 3D visualisation — drag your pointer across it.
              </p>
            </div>
          )}
        </TopicSection>

        {/* ------------------------------------------------------- 3. real world */}
        <TopicSection id="real-world" n={3} icon={Quote} title="Real-world example" accent={domain.accent}>
          <div className="card p-6">
            <h3 className="font-display text-[17px] font-semibold">{topic.realWorld.title}</h3>
            <p className="mt-3 text-[14.5px] leading-relaxed muted">{topic.realWorld.body}</p>
            {topic.realWorld.takeaway && (
              <p className="mt-5 flex gap-3 rounded-xl border border-neon-green/25 bg-neon-green/[0.07] p-4 text-[13.5px] leading-relaxed">
                <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-neon-green" />
                <span><span className="font-semibold text-neon-green">Takeaway — </span>{topic.realWorld.takeaway}</span>
              </p>
            )}
          </div>
        </TopicSection>

        {/* ----------------------------------------------------------- 4. attack */}
        <TopicSection id="attack" n={4} icon={Crosshair} title="Attack scenario" accent="#ff5b6e">
          <div className="card overflow-hidden">
            <div className="border-b border-white/10 p-6">
              <h3 className="font-display text-[17px] font-semibold text-neon-red">{topic.attack.title}</h3>
              <p className="mt-2.5 text-[14px] leading-relaxed muted">{topic.attack.intro}</p>
            </div>

            <ol className="relative p-6">
              <span className="absolute bottom-8 left-[38px] top-9 w-px bg-gradient-to-b from-neon-red/60 via-neon-red/25 to-transparent" />
              {topic.attack.steps.map((s, i) => (
                <motion.li
                  key={s.label}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="relative flex gap-4 pb-6 last:pb-0"
                >
                  <span className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-neon-red/50 bg-[color:var(--bg)] font-mono text-[11px] font-semibold text-neon-red">
                    {i + 1}
                  </span>
                  <span className="min-w-0 pt-0.5">
                    <span className="block text-[14px] font-semibold">{s.label}</span>
                    <span className="mt-1 block text-[13.5px] leading-relaxed muted">{s.detail}</span>
                  </span>
                </motion.li>
              ))}
            </ol>

            <div className="border-t border-white/10 bg-neon-green/[0.04] p-6">
              <h4 className="flex items-center gap-2 font-display text-[14px] font-semibold text-neon-green">
                <ShieldCheck className="h-4 w-4" /> Mitigations that break this chain
              </h4>
              <ul className="mt-3.5 space-y-2.5">
                {topic.attack.mitigations.map((m) => (
                  <li key={m} className="flex gap-2.5 text-[13.5px] leading-relaxed muted">
                    <CircleCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-neon-green" />
                    {m}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </TopicSection>

        {/* ------------------------------------------------------------ 5. tools */}
        <TopicSection id="tools" n={5} icon={Wrench} title="Security tools" accent={domain.accent}>
          <div className="grid gap-4 sm:grid-cols-2">
            {topic.tools.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.05}>
                <div className="card h-full p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-[15px] font-semibold">{t.name}</h3>
                    {t.category && <span className="chip !text-[10px] text-cyber-300">{t.category}</span>}
                  </div>
                  <p className="mt-2.5 text-[13px] leading-relaxed muted">
                    <span className="font-semibold text-[color:var(--text)]">What it does — </span>
                    {t.what}
                  </p>
                  <p className="mt-2 text-[13px] leading-relaxed muted">
                    <span className="font-semibold text-[color:var(--text)]">Why professionals use it — </span>
                    {t.why}
                  </p>
                  {t.url && (
                    <a
                      href={t.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="mt-3.5 inline-flex items-center gap-1.5 text-[12px] font-semibold text-cyber-200 hover:underline"
                    >
                      Official site <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </TopicSection>

        {/* --------------------------------------------------------- 6. research */}
        <TopicSection id="research" n={6} icon={Target} title="Deep dive research" accent={domain.accent}>
          <div className="card divide-y divide-white/8">
            {topic.links.map((l) => (
              <a
                key={l.url}
                href={l.url}
                target="_blank"
                rel="noreferrer noopener"
                className="group flex items-center gap-4 px-5 py-4 transition hover:bg-white/[0.04]"
              >
                <span
                  className="shrink-0 rounded-md px-2 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider"
                  style={{
                    color: SOURCE_COLOURS[l.source] ?? '#7f93ad',
                    background: `${SOURCE_COLOURS[l.source] ?? '#7f93ad'}18`,
                  }}
                >
                  {l.source}
                </span>
                <span className="min-w-0 flex-1 text-[13.5px] font-medium">{l.label}</span>
                <ExternalLink className="h-3.5 w-3.5 shrink-0 muted transition group-hover:text-cyber-200" />
              </a>
            ))}
          </div>
        </TopicSection>

        {/* ------------------------------------------------------------- 7. quiz */}
        <TopicSection id="quiz" n={7} icon={ListChecks} title="Check your understanding" accent={domain.accent}>
          <Quiz questions={topic.quiz} slug={topic.slug} />
          {topic.examTip && (
            <div className="mt-4 card border-l-2 border-l-neon-amber p-5">
              <h4 className="flex items-center gap-2 font-display text-[13.5px] font-semibold text-neon-amber">
                <Lightbulb className="h-4 w-4" /> Exam tip
              </h4>
              <p className="mt-2 text-[13.5px] leading-relaxed muted">{topic.examTip}</p>
            </div>
          )}
        </TopicSection>
      </div>

      {/* ------------------------------------------------------------ next/prev */}
      <div className="mt-14 grid gap-3 border-t border-white/10 pt-8 sm:grid-cols-2">
        {prev ? (
          <Link to={`/topic/${prev.slug}`} className="card card-hover group p-5">
            <span className="font-mono text-[10.5px] uppercase tracking-wider muted">Previous</span>
            <span className="mt-1.5 flex items-center gap-2 font-display text-[15px] font-semibold">
              <ArrowRight className="h-4 w-4 rotate-180 transition group-hover:-translate-x-1" />
              {prev.title}
            </span>
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link to={`/topic/${next.slug}`} className="card card-hover group p-5 sm:text-right">
            <span className="font-mono text-[10.5px] uppercase tracking-wider muted">Next</span>
            <span className="mt-1.5 flex items-center gap-2 font-display text-[15px] font-semibold sm:justify-end">
              {next.title}
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </span>
          </Link>
        )}
      </div>
    </article>
  )
}

function TopicSection({
  id, n, icon: Icon, title, accent, children,
}: {
  id: string
  n: number
  icon: typeof BookOpen
  title: string
  accent: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-32">
      <header className="mb-5 flex items-center gap-3">
        <span
          className="flex h-9 w-9 items-center justify-center rounded-xl"
          style={{ background: `${accent}1c`, boxShadow: `0 0 22px -8px ${accent}` }}
        >
          <Icon className="h-4.5 w-4.5" style={{ color: accent }} />
        </span>
        <div>
          <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] muted">Section {n}</p>
          <h2 className="font-display text-xl font-bold tracking-tight sm:text-2xl">{title}</h2>
        </div>
      </header>
      {children}
    </section>
  )
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="card h-full p-5">
      <h3 className="font-display text-[13px] font-semibold uppercase tracking-wider text-cyber-300">{title}</h3>
      <p className="mt-2.5 text-[14px] leading-relaxed muted">{children}</p>
    </div>
  )
}

function ListCard({ title, items, tone }: { title: string; items: string[]; tone: string }) {
  return (
    <div className="card h-full p-5">
      <h3 className="font-display text-[13px] font-semibold uppercase tracking-wider" style={{ color: tone }}>
        {title}
      </h3>
      <ul className="mt-3 space-y-2.5">
        {items.map((it) => (
          <li key={it} className="flex gap-2.5 text-[13.5px] leading-relaxed muted">
            <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: tone }} />
            {it}
          </li>
        ))}
      </ul>
    </div>
  )
}

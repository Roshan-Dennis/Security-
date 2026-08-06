import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Clock, Flag, ArrowRight, CircleCheck, CircleX, Trophy, RotateCcw, ListChecks,
  TriangleAlert, BookOpen, Target, Play,
} from 'lucide-react'
import { Section, ProgressRing } from '../components/UI'
import {
  EXAM_MODES, domainModes, buildExam, isCorrect, isMultiSelect, EXAM_BANK_SIZE, DOMAINS,
} from '../data'
import type { ExamMode } from '../data'
import type { ExamQuestion } from '../types'
import { useStore } from '../lib/store'

type Answers = Record<string, number[]>
type Stage = 'setup' | 'running' | 'results'

export default function Exam() {
  const { recordExam, examAttempts } = useStore()
  const [stage, setStage] = useState<Stage>('setup')
  const [mode, setMode] = useState<ExamMode | null>(null)
  const [paper, setPaper] = useState<ExamQuestion[]>([])
  const [answers, setAnswers] = useState<Answers>({})
  const [flagged, setFlagged] = useState<Set<string>>(new Set())
  const [index, setIndex] = useState(0)
  const [remaining, setRemaining] = useState(0)
  const startedAt = useRef(0)

  const finish = useCallback(() => {
    setStage((s) => {
      if (s !== 'running') return s
      const byDomain: Record<number, { correct: number; total: number }> = {}
      let score = 0
      paper.forEach((q) => {
        byDomain[q.domain] ??= { correct: 0, total: 0 }
        byDomain[q.domain].total++
        if (isCorrect(q, answers[q.id] ?? [])) {
          score++
          byDomain[q.domain].correct++
        }
      })
      recordExam({
        id: `${Date.now()}`,
        mode: mode?.title ?? 'Exam',
        score,
        total: paper.length,
        seconds: Math.round((Date.now() - startedAt.current) / 1000),
        at: Date.now(),
        byDomain,
      })
      return 'results'
    })
  }, [paper, answers, mode, recordExam])

  useEffect(() => {
    if (stage !== 'running') return
    const t = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          clearInterval(t)
          finish()
          return 0
        }
        return r - 1
      })
    }, 1000)
    return () => clearInterval(t)
  }, [stage, finish])

  const start = (m: ExamMode) => {
    const p = buildExam(m)
    setMode(m)
    setPaper(p)
    setAnswers({})
    setFlagged(new Set())
    setIndex(0)
    setRemaining(m.minutes * 60)
    startedAt.current = Date.now()
    setStage('running')
  }

  const restart = () => {
    setStage('setup')
    setMode(null)
    setPaper([])
  }

  if (stage === 'setup') return <Setup onStart={start} attempts={examAttempts.length} />
  if (stage === 'running')
    return (
      <Runner
        paper={paper}
        answers={answers}
        setAnswers={setAnswers}
        flagged={flagged}
        setFlagged={setFlagged}
        index={index}
        setIndex={setIndex}
        remaining={remaining}
        onFinish={finish}
        mode={mode!}
      />
    )
  return <Results paper={paper} answers={answers} mode={mode!} onRestart={restart} />
}

/* -------------------------------------------------------------------------- setup */

function Setup({ onStart, attempts }: { onStart: (m: ExamMode) => void; attempts: number }) {
  const drills = useMemo(() => domainModes(), [])
  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
      <Section
        eyebrow="Exam simulator"
        title="Timed practice exam"
        intro={`A bank of ${EXAM_BANK_SIZE} exam-difficulty questions. Full and half papers are sampled to the official SY0-701 domain weightings, so the practice paper reflects where the marks actually are. No feedback until you finish — just like the real thing.`}
      >
        <div className="grid gap-4 md:grid-cols-3">
          {EXAM_MODES.map((m) => (
            <button key={m.key} onClick={() => onStart(m)} className="card card-hover group p-6 text-left">
              <div className="flex items-start justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyber-400/12 shadow-[0_0_24px_-8px_#4fdcff]">
                  <Target className="h-5 w-5 text-cyber-300" />
                </span>
                <span className="chip font-mono !text-[10px] text-cyber-300">{m.minutes} min</span>
              </div>
              <h3 className="mt-4 font-display text-[16px] font-semibold">{m.title}</h3>
              <p className="mt-2 text-[13px] leading-relaxed muted">{m.blurb}</p>
              <span className="mt-4 flex items-center gap-1.5 text-[12px] font-semibold text-cyber-200 transition group-hover:gap-2.5">
                <Play className="h-3.5 w-3.5" /> Start {m.count} questions
              </span>
            </button>
          ))}
        </div>

        <h3 className="mt-12 font-display text-lg font-semibold">Single-domain drills</h3>
        <p className="mt-1.5 text-[13.5px] muted">
          Every question from one domain, in random order. Use these after a full paper to attack your weakest area.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {drills.map((m, i) => {
            const d = DOMAINS[i]
            return (
              <button key={m.key} onClick={() => onStart(m)} className="card card-hover flex items-center gap-3 p-4 text-left">
                <span className="h-9 w-1 shrink-0 rounded-full" style={{ background: d.accent }} />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[14px] font-semibold">
                    Domain {d.id} · {d.short}
                  </span>
                  <span className="block font-mono text-[11px] muted">
                    {m.count} questions · {m.minutes} min · {d.weight} of exam
                  </span>
                </span>
                <ArrowRight className="h-4 w-4 shrink-0 text-cyber-200" />
              </button>
            )
          })}
        </div>

        <div className="mt-10 card border-l-2 border-l-neon-amber p-5">
          <h4 className="flex items-center gap-2 font-display text-[13.5px] font-semibold text-neon-amber">
            <TriangleAlert className="h-4 w-4" /> How to use this properly
          </h4>
          <ul className="mt-2.5 space-y-1.5 text-[13.5px] leading-relaxed muted">
            <li>Sit a full paper cold, without notes, before you study — the domain breakdown tells you where to spend your time.</li>
            <li>Review every question you got wrong <em>and</em> every one you guessed correctly.</li>
            <li>Repeat the paper a week later. Improvement you cannot reproduce after a delay is recognition, not knowledge.</li>
            <li>Some questions ask you to select two. The engine will not let you submit the wrong number of answers by accident — read carefully.</li>
          </ul>
        </div>

        {attempts > 0 && (
          <p className="mt-6 text-[13px] muted">
            You have completed {attempts} previous {attempts === 1 ? 'attempt' : 'attempts'} —{' '}
            <Link to="/progress" className="font-semibold text-cyber-200 hover:underline">
              see your history
            </Link>
            .
          </p>
        )}
      </Section>
    </div>
  )
}

/* ------------------------------------------------------------------------ runner */

function Runner({
  paper, answers, setAnswers, flagged, setFlagged, index, setIndex, remaining, onFinish, mode,
}: {
  paper: ExamQuestion[]
  answers: Answers
  setAnswers: (fn: (a: Answers) => Answers) => void
  flagged: Set<string>
  setFlagged: (fn: (s: Set<string>) => Set<string>) => void
  index: number
  setIndex: (n: number) => void
  remaining: number
  onFinish: () => void
  mode: ExamMode
}) {
  const q = paper[index]
  const multi = isMultiSelect(q)
  const need = Array.isArray(q.answer) ? q.answer.length : 1
  const given = answers[q.id] ?? []
  const answeredCount = Object.values(answers).filter((a) => a.length > 0).length
  const low = remaining < 300

  const toggle = (i: number) => {
    setAnswers((a) => {
      const cur = a[q.id] ?? []
      if (!multi) return { ...a, [q.id]: [i] }
      if (cur.includes(i)) return { ...a, [q.id]: cur.filter((x) => x !== i) }
      if (cur.length >= need) return { ...a, [q.id]: [...cur.slice(1), i] }
      return { ...a, [q.id]: [...cur, i] }
    })
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      {/* status bar */}
      <div className="card sticky top-[76px] z-30 mb-6 flex flex-wrap items-center gap-4 px-5 py-3.5">
        <span className="font-mono text-[11px] uppercase tracking-wider muted">{mode.title}</span>
        <span className="font-mono text-[12px]">
          Q{index + 1} <span className="muted">/ {paper.length}</span>
        </span>
        <span className="hidden font-mono text-[11px] muted sm:inline">{answeredCount} answered</span>
        <span
          className={`ml-auto flex items-center gap-2 rounded-lg px-3 py-1.5 font-mono text-[13px] font-semibold ${
            low ? 'bg-neon-red/15 text-neon-red' : 'bg-white/5 text-cyber-200'
          }`}
        >
          <Clock className="h-3.5 w-3.5" />
          {String(Math.floor(remaining / 60)).padStart(2, '0')}:{String(remaining % 60).padStart(2, '0')}
        </span>
        <button
          onClick={() => {
            if (confirm(`Submit with ${paper.length - answeredCount} unanswered?`)) onFinish()
          }}
          className="btn-primary !px-4 !py-2 !text-[12px]"
        >
          Submit
        </button>
      </div>

      {/* question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={q.id}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -12 }}
          transition={{ duration: 0.18 }}
          className="card p-6"
        >
          <div className="flex flex-wrap items-center gap-2">
            <span className="chip font-mono !text-[10px]" style={{ color: DOMAINS[q.domain - 1].accent }}>
              Domain {q.domain}
            </span>
            <span className="chip font-mono !text-[10px] muted">Objective {q.objective}</span>
            {multi && <span className="chip font-mono !text-[10px] text-neon-amber">Select {need}</span>}
            <button
              onClick={() =>
                setFlagged((s) => {
                  const n = new Set(s)
                  n.has(q.id) ? n.delete(q.id) : n.add(q.id)
                  return n
                })
              }
              className={`chip ml-auto transition ${flagged.has(q.id) ? 'border-neon-amber/60 text-neon-amber' : 'hover:bg-white/10'}`}
            >
              <Flag className="h-3.5 w-3.5" /> {flagged.has(q.id) ? 'Flagged' : 'Flag'}
            </button>
          </div>

          <p className="mt-5 text-[16px] font-medium leading-relaxed">{q.q}</p>

          <div className="mt-5 space-y-2.5">
            {q.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => toggle(i)}
                className={`flex w-full items-start gap-3 rounded-xl border px-4 py-3 text-left text-[14px] transition ${
                  given.includes(i)
                    ? 'border-cyber-300/70 bg-cyber-400/12'
                    : 'border-white/12 bg-white/[0.03] hover:border-cyber-300/40 hover:bg-white/[0.06]'
                }`}
              >
                <span
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border font-mono text-[10px] ${
                    multi ? 'rounded' : 'rounded-full'
                  } ${given.includes(i) ? 'border-cyber-300 bg-cyber-300 text-[#04121c]' : 'border-white/25'}`}
                >
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="flex-1">{opt}</span>
              </button>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between gap-3">
            <button
              onClick={() => setIndex(Math.max(0, index - 1))}
              disabled={index === 0}
              className="btn-ghost !py-2 disabled:opacity-40"
            >
              <ArrowRight className="h-4 w-4 rotate-180" /> Previous
            </button>
            <button
              onClick={() => (index + 1 < paper.length ? setIndex(index + 1) : onFinish())}
              className="btn-primary !py-2"
            >
              {index + 1 < paper.length ? 'Next' : 'Finish'} <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* navigator */}
      <div className="card mt-5 p-5">
        <h3 className="font-mono text-[11px] uppercase tracking-wider muted">Question navigator</h3>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {paper.map((item, i) => {
            const done = (answers[item.id] ?? []).length > 0
            const flag = flagged.has(item.id)
            return (
              <button
                key={item.id}
                onClick={() => setIndex(i)}
                aria-label={`Go to question ${i + 1}`}
                className={`h-8 w-8 rounded-lg border font-mono text-[11px] transition ${
                  i === index
                    ? 'border-cyber-300 bg-cyber-400/25 text-cyber-100'
                    : flag
                      ? 'border-neon-amber/60 bg-neon-amber/12 text-neon-amber'
                      : done
                        ? 'border-neon-green/40 bg-neon-green/10 text-neon-green'
                        : 'border-white/12 bg-white/[0.03] muted hover:bg-white/[0.08]'
                }`}
              >
                {i + 1}
              </button>
            )
          })}
        </div>
        <div className="mt-3 flex flex-wrap gap-4 text-[11px] muted">
          <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded bg-neon-green/50" /> answered</span>
          <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded bg-neon-amber/60" /> flagged</span>
          <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded bg-white/15" /> unanswered</span>
        </div>
      </div>
    </div>
  )
}

/* ----------------------------------------------------------------------- results */

function Results({
  paper, answers, mode, onRestart,
}: { paper: ExamQuestion[]; answers: Answers; mode: ExamMode; onRestart: () => void }) {
  const [filter, setFilter] = useState<'all' | 'wrong'>('wrong')

  const { score, byDomain } = useMemo(() => {
    const bd: Record<number, { correct: number; total: number }> = {}
    let s = 0
    paper.forEach((q) => {
      bd[q.domain] ??= { correct: 0, total: 0 }
      bd[q.domain].total++
      if (isCorrect(q, answers[q.id] ?? [])) {
        s++
        bd[q.domain].correct++
      }
    })
    return { score: s, byDomain: bd }
  }, [paper, answers])

  const pct = Math.round((score / paper.length) * 100)
  const shown = paper.filter((q) => (filter === 'all' ? true : !isCorrect(q, answers[q.id] ?? [])))

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="card flex flex-col items-center gap-8 p-8 sm:flex-row">
        <div className="relative shrink-0">
          <ProgressRing value={pct} size={140} stroke={11} />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-display text-3xl font-bold">{pct}%</span>
            <span className="font-mono text-[10px] uppercase tracking-wider muted">
              {score} / {paper.length}
            </span>
          </div>
        </div>
        <div className="flex-1">
          <Trophy className={`h-7 w-7 ${pct >= 80 ? 'text-neon-green' : pct >= 65 ? 'text-neon-amber' : 'text-neon-red'}`} />
          <h1 className="mt-3 font-display text-2xl font-bold">{mode.title} complete</h1>
          <p className="mt-2 text-[14px] leading-relaxed muted">
            {pct >= 85
              ? 'Comfortably above a typical pass mark. Repeat this paper in a week to confirm it is knowledge rather than recall.'
              : pct >= 70
                ? 'Around the pass threshold. Work through the domain breakdown below and drill your weakest area before retaking.'
                : pct >= 50
                  ? 'More study needed. Use the review below, revisit the linked topics, then run a single-domain drill on your weakest area.'
                  : 'Treat this as a diagnostic rather than a setback. Work through the linked topics for every question you missed, then return.'}
          </p>
          <div className="mt-5 flex flex-wrap gap-2.5">
            <button onClick={onRestart} className="btn-primary">
              <RotateCcw className="h-4 w-4" /> Take another paper
            </button>
            <Link to="/progress" className="btn-ghost">
              <ListChecks className="h-4 w-4" /> View history
            </Link>
          </div>
        </div>
      </div>

      <h2 className="mt-10 font-display text-lg font-semibold">Domain breakdown</h2>
      <div className="mt-4 space-y-3">
        {DOMAINS.map((d) => {
          const r = byDomain[d.id]
          if (!r) return null
          const p = Math.round((r.correct / r.total) * 100)
          return (
            <div key={d.id} className="card p-4">
              <div className="flex items-baseline justify-between gap-3">
                <span className="truncate text-[14px] font-semibold">
                  Domain {d.id} · {d.title}
                </span>
                <span className="shrink-0 font-mono text-[12px] muted">
                  {r.correct}/{r.total} · {p}%
                </span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${p}%`, background: p >= 70 ? '#3ddc97' : p >= 50 ? '#ffb547' : '#ff5b6e' }}
                />
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-3">
        <h2 className="font-display text-lg font-semibold">Review</h2>
        <div className="ml-auto flex gap-2">
          <button
            onClick={() => setFilter('wrong')}
            className={`chip transition ${filter === 'wrong' ? 'border-neon-red/60 text-neon-red' : 'hover:bg-white/10'}`}
          >
            Incorrect only ({paper.length - score})
          </button>
          <button
            onClick={() => setFilter('all')}
            className={`chip transition ${filter === 'all' ? 'border-cyber-300/60 text-cyber-200' : 'hover:bg-white/10'}`}
          >
            All ({paper.length})
          </button>
        </div>
      </div>

      {shown.length === 0 && (
        <p className="card mt-4 p-10 text-center text-sm muted">
          Nothing incorrect on this paper. Switch to All to review every question.
        </p>
      )}

      <div className="mt-4 space-y-4">
        {shown.map((q, n) => {
          const given = answers[q.id] ?? []
          const right = isCorrect(q, given)
          const expected = Array.isArray(q.answer) ? q.answer : [q.answer]
          return (
            <div key={q.id} className="card p-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-[11px] muted">#{n + 1}</span>
                <span className="chip font-mono !text-[10px]" style={{ color: DOMAINS[q.domain - 1].accent }}>
                  D{q.domain}
                </span>
                <span className="chip font-mono !text-[10px] muted">{q.difficulty}</span>
                {right ? (
                  <span className="chip !text-[10px] text-neon-green"><CircleCheck className="h-3 w-3" /> Correct</span>
                ) : (
                  <span className="chip !text-[10px] text-neon-red"><CircleX className="h-3 w-3" /> Incorrect</span>
                )}
              </div>
              <p className="mt-3 text-[14.5px] font-medium leading-relaxed">{q.q}</p>
              <ul className="mt-3 space-y-1.5">
                {q.options.map((o, i) => {
                  const isExpected = expected.includes(i)
                  const wasGiven = given.includes(i)
                  return (
                    <li
                      key={i}
                      className={`flex gap-2.5 rounded-lg px-3 py-2 text-[13px] ${
                        isExpected
                          ? 'bg-neon-green/10 text-[color:var(--text)]'
                          : wasGiven
                            ? 'bg-neon-red/10 text-[color:var(--text)]'
                            : 'muted'
                      }`}
                    >
                      <span className="font-mono text-[11px]">{String.fromCharCode(65 + i)}</span>
                      <span className="flex-1">{o}</span>
                      {isExpected && <CircleCheck className="h-3.5 w-3.5 shrink-0 text-neon-green" />}
                      {wasGiven && !isExpected && <CircleX className="h-3.5 w-3.5 shrink-0 text-neon-red" />}
                    </li>
                  )
                })}
              </ul>
              <p className="mt-3 rounded-lg border border-cyber-300/20 bg-cyber-400/[0.06] p-3.5 text-[13.5px] leading-relaxed muted">
                {q.explain}
              </p>
              {q.topic && (
                <Link
                  to={`/topic/${q.topic}`}
                  className="mt-3 inline-flex items-center gap-1.5 text-[12px] font-semibold text-cyber-200 hover:underline"
                >
                  <BookOpen className="h-3.5 w-3.5" /> Revise this topic
                </Link>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

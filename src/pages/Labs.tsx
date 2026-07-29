import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FlaskConical, CircleCheck, CircleX, TriangleAlert, RotateCcw, ShieldCheck, Trophy } from 'lucide-react'
import { Section } from '../components/UI'
import { LABS } from '../data'
import type { LabScenario } from '../types'

type Verdict = LabScenario['correct']

const VERDICTS: { key: Verdict; label: string; tone: string; border: string; icon: typeof CircleCheck }[] = [
  { key: 'safe', label: 'Safe', tone: 'text-neon-green', border: 'hover:border-neon-green/70 hover:bg-neon-green/10', icon: CircleCheck },
  { key: 'suspicious', label: 'Suspicious', tone: 'text-neon-amber', border: 'hover:border-neon-amber/70 hover:bg-neon-amber/10', icon: TriangleAlert },
  { key: 'malicious', label: 'Malicious', tone: 'text-neon-red', border: 'hover:border-neon-red/70 hover:bg-neon-red/10', icon: CircleX },
]

const KIND_LABEL: Record<LabScenario['kind'], string> = {
  phish: 'Email triage',
  log: 'Log analysis',
  triage: 'Alert triage',
}

export default function Labs() {
  const [filter, setFilter] = useState<'all' | LabScenario['kind']>('all')
  const [answers, setAnswers] = useState<Record<string, Verdict>>({})

  const scenarios = useMemo(() => (filter === 'all' ? LABS : LABS.filter((l) => l.kind === filter)), [filter])
  const answered = Object.keys(answers).length
  const correct = LABS.filter((l) => answers[l.id] === l.correct).length

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
      <Section
        eyebrow="Hands-on"
        title="Cybersecurity Lab Simulator"
        intro="Eight realistic artefacts drawn from the kind of thing that lands in a SOC queue. Read the evidence, commit to a verdict, then compare your reasoning against the analyst breakdown."
      >
        <div className="mb-6 flex flex-wrap items-center gap-2">
          {(['all', 'phish', 'log', 'triage'] as const).map((k) => (
            <button
              key={k}
              onClick={() => setFilter(k)}
              className={`chip transition ${filter === k ? 'border-cyber-300/60 bg-cyber-400/15 text-cyber-200' : 'hover:bg-white/10'}`}
            >
              {k === 'all' ? 'All scenarios' : KIND_LABEL[k]}
            </button>
          ))}
          {answered > 0 && (
            <span className="ml-auto flex items-center gap-2 chip text-neon-green">
              <Trophy className="h-3.5 w-3.5" /> {correct}/{answered} correct
            </span>
          )}
          {answered > 0 && (
            <button onClick={() => setAnswers({})} className="chip hover:bg-white/10">
              <RotateCcw className="h-3.5 w-3.5" /> Reset
            </button>
          )}
        </div>

        <div className="space-y-5">
          {scenarios.map((s) => (
            <LabCard
              key={s.id}
              scenario={s}
              picked={answers[s.id]}
              onPick={(v) => setAnswers((a) => (a[s.id] ? a : { ...a, [s.id]: v }))}
            />
          ))}
        </div>
      </Section>
    </div>
  )
}

function LabCard({
  scenario, picked, onPick,
}: { scenario: LabScenario; picked?: Verdict; onPick: (v: Verdict) => void }) {
  const revealed = Boolean(picked)
  const right = picked === scenario.correct

  return (
    <div className="card overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-3.5">
        <div className="flex items-center gap-2.5">
          <FlaskConical className="h-4 w-4 text-neon-green" />
          <h3 className="font-display text-[15px] font-semibold">{scenario.title}</h3>
        </div>
        <span className="chip font-mono !text-[10px] text-cyber-300">{KIND_LABEL[scenario.kind]}</span>
      </div>

      <div className="p-5">
        <p className="text-[13.5px] muted">{scenario.prompt}</p>

        <div className="mt-4 overflow-hidden rounded-xl border border-white/10 bg-[#040a14]/60">
          <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-neon-red/70" />
            <span className="h-2 w-2 rounded-full bg-neon-amber/70" />
            <span className="h-2 w-2 rounded-full bg-neon-green/70" />
            <span className="ml-2 font-mono text-[10px] muted">artefact</span>
          </div>
          <dl className="divide-y divide-white/6">
            {scenario.artifact.map((a) => (
              <div key={a.label} className="flex flex-col gap-0.5 px-4 py-2.5 sm:flex-row sm:gap-4">
                <dt className="w-40 shrink-0 font-mono text-[11px] uppercase tracking-wider muted">{a.label}</dt>
                <dd className="break-all font-mono text-[12px] text-[color:var(--text)]">{a.value}</dd>
              </div>
            ))}
          </dl>
          {scenario.body && (
            <p className="border-t border-white/10 px-4 py-3.5 text-[13px] leading-relaxed muted">{scenario.body}</p>
          )}
        </div>

        <div className="mt-5 grid gap-2.5 sm:grid-cols-3">
          {VERDICTS.map((v) => {
            const isPick = picked === v.key
            const isAnswer = scenario.correct === v.key
            return (
              <button
                key={v.key}
                disabled={revealed}
                onClick={() => onPick(v.key)}
                className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                  !revealed
                    ? `border-white/12 bg-white/[0.03] ${v.border}`
                    : isAnswer
                      ? 'border-neon-green/60 bg-neon-green/12'
                      : isPick
                        ? 'border-neon-red/60 bg-neon-red/12'
                        : 'border-white/8 opacity-45'
                }`}
              >
                <v.icon className={`h-4 w-4 ${revealed && isAnswer ? 'text-neon-green' : v.tone}`} />
                {v.label}
              </button>
            )
          })}
        </div>

        <AnimatePresence>
          {revealed && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="overflow-hidden"
            >
              <div className={`mt-5 rounded-xl border p-4 ${right ? 'border-neon-green/30 bg-neon-green/[0.07]' : 'border-neon-amber/30 bg-neon-amber/[0.07]'}`}>
                <p className={`flex items-center gap-2 font-display text-[13px] font-semibold ${right ? 'text-neon-green' : 'text-neon-amber'}`}>
                  <ShieldCheck className="h-4 w-4" />
                  {right ? 'Correct verdict' : `The correct verdict is ${scenario.correct}`}
                </p>
                <p className="mt-2.5 text-[13.5px] leading-relaxed muted">{scenario.explain}</p>
                {scenario.redFlags.length > 0 && (
                  <>
                    <p className="mt-4 font-mono text-[10.5px] uppercase tracking-wider muted">Red flags</p>
                    <ul className="mt-2 space-y-1.5">
                      {scenario.redFlags.map((f) => (
                        <li key={f} className="flex gap-2 text-[13px] muted">
                          <TriangleAlert className="mt-0.5 h-3.5 w-3.5 shrink-0 text-neon-red" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

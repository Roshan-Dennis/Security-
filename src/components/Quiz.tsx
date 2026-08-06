import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CircleCheck, CircleX, RotateCcw, Trophy, Lightbulb } from 'lucide-react'
import type { QuizQuestion } from '../types'
import { useStore } from '../lib/store'
import { shuffleOptions } from '../lib/shuffle'

export default function Quiz({ questions: source, slug }: { questions: QuizQuestion[]; slug: string }) {
  const { recordQuiz, quizScores } = useStore()
  // options are shuffled per visit so answer position carries no information
  const questions = useMemo(() => source.map(shuffleOptions), [source])
  const [index, setIndex] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)

  const q = questions[index]
  const best = quizScores[slug]

  const choose = (i: number) => {
    if (picked !== null) return
    setPicked(i)
    if (i === q.answer) setScore((s) => s + 1)
  }

  const next = () => {
    if (index + 1 >= questions.length) {
      const finalScore = score
      recordQuiz(slug, finalScore, questions.length)
      setDone(true)
    } else {
      setIndex((i) => i + 1)
      setPicked(null)
    }
  }

  const restart = () => {
    setIndex(0)
    setPicked(null)
    setScore(0)
    setDone(false)
  }

  if (done) {
    const pct = Math.round((score / questions.length) * 100)
    const tone = pct >= 80 ? 'text-neon-green' : pct >= 50 ? 'text-neon-amber' : 'text-neon-red'
    return (
      <div className="card p-8 text-center">
        <Trophy className={`mx-auto h-10 w-10 ${tone}`} />
        <p className="mt-4 font-display text-3xl font-bold">
          {score} <span className="muted">/ {questions.length}</span>
        </p>
        <p className={`mt-1 font-mono text-sm ${tone}`}>{pct}% correct</p>
        <p className="mx-auto mt-4 max-w-md text-sm muted">
          {pct >= 80
            ? 'Strong result. Move on, then return to this topic in a few days to check retention.'
            : pct >= 50
              ? 'A reasonable start. Re-read the explanation and attack scenario above, then try again.'
              : 'Worth another pass. Work through the simple explanation and the diagram before retrying.'}
        </p>
        <button onClick={restart} className="btn-ghost mx-auto mt-6">
          <RotateCcw className="h-4 w-4" /> Retake quiz
        </button>
      </div>
    )
  }

  return (
    <div className="card overflow-hidden">
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-3.5">
        <span className="font-mono text-[11px] uppercase tracking-wider muted">
          Question {index + 1} of {questions.length}
        </span>
        <div className="flex items-center gap-3">
          {best && (
            <span className="chip !text-[10px] text-neon-green">
              Best {best.score}/{best.total}
            </span>
          )}
          <div className="h-1.5 w-28 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-cyber-300 to-neon-green"
              animate={{ width: `${((index + (picked !== null ? 1 : 0)) / questions.length) * 100}%` }}
              transition={{ type: 'spring', stiffness: 180, damping: 24 }}
            />
          </div>
        </div>
      </div>

      <div className="p-5 sm:p-6">
        <p className="text-[15px] font-medium leading-relaxed">{q.q}</p>

        <div className="mt-5 space-y-2.5">
          {q.options.map((opt, i) => {
            const isAnswer = i === q.answer
            const isPicked = i === picked
            const revealed = picked !== null
            return (
              <button
                key={i}
                onClick={() => choose(i)}
                disabled={revealed}
                className={`flex w-full items-start gap-3 rounded-xl border px-4 py-3 text-left text-sm transition ${
                  !revealed
                    ? 'border-white/12 bg-white/[0.03] hover:border-cyber-300/60 hover:bg-cyber-400/10'
                    : isAnswer
                      ? 'border-neon-green/60 bg-neon-green/10'
                      : isPicked
                        ? 'border-neon-red/60 bg-neon-red/10'
                        : 'border-white/8 bg-white/[0.02] opacity-55'
                }`}
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-white/20 font-mono text-[10px]">
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="flex-1">{opt}</span>
                {revealed && isAnswer && <CircleCheck className="h-4 w-4 shrink-0 text-neon-green" />}
                {revealed && isPicked && !isAnswer && <CircleX className="h-4 w-4 shrink-0 text-neon-red" />}
              </button>
            )
          })}
        </div>

        <AnimatePresence>
          {picked !== null && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-5 rounded-xl border border-cyber-300/25 bg-cyber-400/[0.07] p-4">
                <p className="flex items-center gap-2 font-display text-[13px] font-semibold text-cyber-200">
                  <Lightbulb className="h-4 w-4" />
                  {picked === q.answer ? 'Correct' : 'Not quite'}
                </p>
                <p className="mt-2 text-[13.5px] leading-relaxed muted">{q.explain}</p>
              </div>
              <button onClick={next} className="btn-primary mt-5 w-full sm:w-auto">
                {index + 1 >= questions.length ? 'See result' : 'Next question'}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

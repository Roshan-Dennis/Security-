import type { ExamAttempt } from '../types'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

type Theme = 'dark' | 'light'

interface QuizResult {
  score: number
  total: number
  at: number
}

interface StoreShape {
  examAttempts: ExamAttempt[]
  recordExam: (attempt: ExamAttempt) => void
  theme: Theme
  toggleTheme: () => void
  completed: string[]
  toggleComplete: (slug: string) => void
  isComplete: (slug: string) => boolean
  bookmarks: string[]
  toggleBookmark: (slug: string) => void
  isBookmarked: (slug: string) => boolean
  quizScores: Record<string, QuizResult>
  recordQuiz: (slug: string, score: number, total: number) => void
  reset: () => void
}

const KEY = 'cybersec-academy.v1'

interface Persisted {
  theme: Theme
  completed: string[]
  bookmarks: string[]
  quizScores: Record<string, QuizResult>
  examAttempts: ExamAttempt[]
}

const DEFAULTS: Persisted = { theme: 'dark', completed: [], bookmarks: [], quizScores: {}, examAttempts: [] }

function load(): Persisted {
  if (typeof window === 'undefined') return DEFAULTS
  try {
    const raw = window.localStorage.getItem(KEY)
    if (!raw) return DEFAULTS
    return { ...DEFAULTS, ...(JSON.parse(raw) as Partial<Persisted>) }
  } catch {
    return DEFAULTS
  }
}

const StoreContext = createContext<StoreShape | null>(null)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<Persisted>(load)

  useEffect(() => {
    try {
      window.localStorage.setItem(KEY, JSON.stringify(state))
    } catch {
      /* storage unavailable — the app still works, just without persistence */
    }
  }, [state])

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('light', state.theme === 'light')
    root.classList.toggle('dark', state.theme === 'dark')
  }, [state.theme])

  const toggleTheme = useCallback(
    () => setState((s) => ({ ...s, theme: s.theme === 'dark' ? 'light' : 'dark' })),
    [],
  )

  const toggleComplete = useCallback(
    (slug: string) =>
      setState((s) => ({
        ...s,
        completed: s.completed.includes(slug)
          ? s.completed.filter((x) => x !== slug)
          : [...s.completed, slug],
      })),
    [],
  )

  const toggleBookmark = useCallback(
    (slug: string) =>
      setState((s) => ({
        ...s,
        bookmarks: s.bookmarks.includes(slug)
          ? s.bookmarks.filter((x) => x !== slug)
          : [...s.bookmarks, slug],
      })),
    [],
  )

  const recordQuiz = useCallback(
    (slug: string, score: number, total: number) =>
      setState((s) => {
        const prev = s.quizScores[slug]
        if (prev && prev.score >= score) return s
        return { ...s, quizScores: { ...s.quizScores, [slug]: { score, total, at: Date.now() } } }
      }),
    [],
  )

  const recordExam = useCallback(
    (attempt: ExamAttempt) =>
      setState((s) => ({ ...s, examAttempts: [attempt, ...s.examAttempts].slice(0, 25) })),
    [],
  )

  const reset = useCallback(() => setState((s) => ({ ...DEFAULTS, theme: s.theme })), [])

  const value = useMemo<StoreShape>(
    () => ({
      theme: state.theme,
      toggleTheme,
      completed: state.completed,
      toggleComplete,
      isComplete: (slug) => state.completed.includes(slug),
      bookmarks: state.bookmarks,
      toggleBookmark,
      isBookmarked: (slug) => state.bookmarks.includes(slug),
      quizScores: state.quizScores,
      recordQuiz,
      examAttempts: state.examAttempts,
      recordExam,
      reset,
    }),
    [state, toggleTheme, toggleComplete, toggleBookmark, recordQuiz, recordExam, reset],
  )

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used inside StoreProvider')
  return ctx
}

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  return reduced
}

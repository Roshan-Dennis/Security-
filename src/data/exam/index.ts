import type { ExamQuestion } from '../../types'
import { shuffleOptions } from '../../lib/shuffle'
import { EXAM_D1 } from './d1'
import { EXAM_D2 } from './d2'
import { EXAM_D3 } from './d3'
import { EXAM_D4 } from './d4'
import { EXAM_D5 } from './d5'

export const EXAM_BANK: ExamQuestion[] = [...EXAM_D1, ...EXAM_D2, ...EXAM_D3, ...EXAM_D4, ...EXAM_D5]

export { EXAM_BANK_SIZE } from './size'

/** Official SY0-701 domain weightings, used to build representative papers. */
export const DOMAIN_WEIGHTS: Record<number, number> = { 1: 0.12, 2: 0.22, 3: 0.18, 4: 0.28, 5: 0.2 }

export interface ExamMode {
  key: string
  title: string
  blurb: string
  count: number
  minutes: number
  /** restrict to a single domain */
  domain?: number
}

export const EXAM_MODES: ExamMode[] = [
  {
    key: 'full',
    title: 'Full mock exam',
    blurb: '90 questions in 90 minutes, weighted to the real domain percentages. Closest thing to sitting the paper.',
    count: 90,
    minutes: 90,
  },
  {
    key: 'half',
    title: 'Half paper',
    blurb: '45 questions in 45 minutes. Same weighting, half the commitment — good for a lunchtime session.',
    count: 45,
    minutes: 45,
  },
  {
    key: 'quickfire',
    title: 'Quickfire 20',
    blurb: '20 questions in 20 minutes. A fast temperature check across all five domains.',
    count: 20,
    minutes: 20,
  },
]

export const domainModes = (): ExamMode[] =>
  [1, 2, 3, 4, 5].map((d) => ({
    key: `domain-${d}`,
    title: `Domain ${d} drill`,
    blurb: 'Every question from this domain only, untimed pressure removed but the clock still runs.',
    count: EXAM_BANK.filter((q) => q.domain === d).length,
    minutes: Math.max(15, Math.round(EXAM_BANK.filter((q) => q.domain === d).length * 1.0)),
    domain: d,
  }))

function shuffle<T>(input: T[]): T[] {
  const a = [...input]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/**
 * Builds a paper for the requested mode.
 * Full and half papers sample each domain in proportion to its official exam weighting,
 * so the practice paper reflects where the marks actually are.
 */
export function buildExam(mode: ExamMode): ExamQuestion[] {
  if (mode.domain) {
    return shuffle(EXAM_BANK.filter((q) => q.domain === mode.domain)).map(shuffleOptions)
  }
  const picked: ExamQuestion[] = []
  for (const d of [1, 2, 3, 4, 5]) {
    const want = Math.round(mode.count * DOMAIN_WEIGHTS[d])
    picked.push(...shuffle(EXAM_BANK.filter((q) => q.domain === d)).slice(0, want))
  }
  // rounding can leave the paper a question short or long
  const pool = shuffle(EXAM_BANK.filter((q) => !picked.includes(q)))
  while (picked.length < mode.count && pool.length) picked.push(pool.pop()!)
  return shuffle(picked).slice(0, mode.count).map(shuffleOptions)
}

export const isCorrect = (q: ExamQuestion, given: number[]): boolean => {
  const expected = Array.isArray(q.answer) ? q.answer : [q.answer]
  if (given.length !== expected.length) return false
  return expected.every((e) => given.includes(e))
}

export const isMultiSelect = (q: ExamQuestion): boolean => Array.isArray(q.answer)

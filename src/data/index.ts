import type { Topic } from '../types'
import { DOMAIN1 } from './topics/domain1'
import { DOMAIN2 } from './topics/domain2'
import { DOMAIN3 } from './topics/domain3'
import { DOMAIN4 } from './topics/domain4'
import { DOMAIN5 } from './topics/domain5'
import { EXAM_BANK_SIZE } from './exam/size'

export const TOPICS: Topic[] = [...DOMAIN1, ...DOMAIN2, ...DOMAIN3, ...DOMAIN4, ...DOMAIN5]

export const topicsByDomain = (id: number) => TOPICS.filter((t) => t.domain === id)
export const topicBySlug = (slug: string) => TOPICS.find((t) => t.slug === slug)

export const TOTAL_TOPICS = TOPICS.length
/** questions attached to individual topics, shown at the end of each lesson */
export const TOTAL_TOPIC_QUESTIONS = TOPICS.reduce((n, t) => n + t.quiz.length, 0)
/** every practice question on the platform: per-topic quizzes plus the exam bank */
export const TOTAL_QUESTIONS = TOTAL_TOPIC_QUESTIONS + EXAM_BANK_SIZE
export const TOTAL_TOOLS = new Set(TOPICS.flatMap((t) => t.tools.map((x) => x.name))).size
export const TOTAL_LINKS = TOPICS.reduce((n, t) => n + t.links.length, 0)
export const TOTAL_DIAGRAMS = TOPICS.length

export * from './domains'
export * from './glossary'
export * from './cheatsheets'
export * from './labs'
export * from './exam'

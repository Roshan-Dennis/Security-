import type { Tone } from '../types'

export interface ToneStyle {
  stroke: string
  fill: string
  text: string
  glow: string
  label: string
}

export const TONES: Record<Tone, ToneStyle> = {
  neutral: { stroke: '#7f93ad', fill: 'rgba(127,147,173,0.10)', text: '#c9d7e8', glow: 'rgba(127,147,173,0.35)', label: 'Neutral' },
  primary: { stroke: '#4fdcff', fill: 'rgba(79,220,255,0.12)', text: '#c7f4ff', glow: 'rgba(79,220,255,0.45)', label: 'Primary' },
  safe: { stroke: '#3ddc97', fill: 'rgba(61,220,151,0.12)', text: '#c5f7e2', glow: 'rgba(61,220,151,0.45)', label: 'Protected' },
  warn: { stroke: '#ffb547', fill: 'rgba(255,181,71,0.12)', text: '#ffe4bd', glow: 'rgba(255,181,71,0.42)', label: 'Caution' },
  danger: { stroke: '#ff5b6e', fill: 'rgba(255,91,110,0.13)', text: '#ffd2d8', glow: 'rgba(255,91,110,0.45)', label: 'Hostile' },
  violet: { stroke: '#a78bfa', fill: 'rgba(167,139,250,0.13)', text: '#e2d9ff', glow: 'rgba(167,139,250,0.45)', label: 'Control' },
}

export const toneOf = (t?: Tone): ToneStyle => TONES[t ?? 'neutral']

export const DIFFICULTY_TONE: Record<string, Tone> = {
  Beginner: 'safe',
  Intermediate: 'warn',
  Advanced: 'danger',
}

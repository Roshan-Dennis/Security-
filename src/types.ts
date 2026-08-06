export type Tone = 'neutral' | 'primary' | 'safe' | 'warn' | 'danger' | 'violet';

export interface DiagramNode {
  id: string;
  label: string;
  sub?: string;
  tone?: Tone;
  /** lucide icon name rendered by the diagram engine */
  icon?: string;
}

export interface DiagramEdge {
  from: string;
  to: string;
  label?: string;
  tone?: Tone;
  /** animate a packet travelling along this edge */
  animated?: boolean;
}

export interface DiagramSpec {
  title: string;
  caption?: string;
  /** left-to-right columns; each column is a vertical stack of nodes */
  columns: DiagramNode[][];
  edges: DiagramEdge[];
  legend?: { tone: Tone; label: string }[];
}

export interface AttackStep {
  label: string;
  detail: string;
}

export interface SecurityTool {
  name: string;
  what: string;
  why: string;
  url?: string;
  category?: string;
}

export interface ResearchLink {
  label: string;
  url: string;
  source: string;
}

export interface QuizQuestion {
  q: string;
  options: string[];
  answer: number;
  explain: string;
}

export type VisualKey =
  | 'globe'
  | 'lock'
  | 'firewall'
  | 'malware'
  | 'cloud'
  | 'shield'
  | 'network'
  | 'radar';

export interface Topic {
  slug: string;
  title: string;
  domain: number;
  objective: string;
  tagline: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  minutes: number;
  keywords: string[];
  simple: {
    what: string;
    why: string;
    how: string[];
    where: string[];
  };
  diagram: DiagramSpec;
  visual?: VisualKey;
  realWorld: { title: string; body: string; takeaway?: string };
  attack: { title: string; intro: string; steps: AttackStep[]; mitigations: string[] };
  tools: SecurityTool[];
  links: ResearchLink[];
  quiz: QuizQuestion[];
  examTip?: string;
}

export interface Domain {
  id: number;
  slug: string;
  title: string;
  short: string;
  weight: string;
  blurb: string;
  accent: string;
  icon: string;
}

export interface GlossaryEntry {
  term: string;
  definition: string;
  domain: number;
  acronym?: string;
}

export interface CheatSheet {
  slug: string;
  title: string;
  blurb: string;
  sections: { heading: string; rows: [string, string][] }[];
}

export interface LabScenarioOption {
  label: string;
  verdict: 'safe' | 'suspicious' | 'malicious';
}

export interface LabScenario {
  id: string;
  kind: 'phish' | 'log' | 'triage';
  title: string;
  prompt: string;
  artifact: { label: string; value: string }[];
  body?: string;
  correct: 'safe' | 'suspicious' | 'malicious';
  explain: string;
  redFlags: string[];
}

export interface ExamQuestion {
  id: string
  domain: number
  objective: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  q: string
  options: string[]
  /** a single index, or an array of indices for select-all-that-apply items */
  answer: number | number[]
  explain: string
  /** slug of the topic to revise if this question is missed */
  topic?: string
}

export interface ExamAttempt {
  id: string
  mode: string
  score: number
  total: number
  seconds: number
  at: number
  byDomain: Record<number, { correct: number; total: number }>
}

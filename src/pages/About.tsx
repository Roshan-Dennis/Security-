import { Link } from 'react-router-dom'
import { ArrowRight, ShieldCheck, Code2, BookOpen, Cpu } from 'lucide-react'
import Scene3D from '../components/Scene3D'
import { Section, Stat } from '../components/UI'
import { Logo } from '../components/Brand'
import { TOTAL_TOPICS, TOTAL_QUESTIONS, TOTAL_TOOLS, TOTAL_LINKS } from '../data'

const STACK = [
  { name: 'React 18 + TypeScript', note: 'Strictly typed content model — every topic conforms to one interface, so the UI can never drift from the data.' },
  { name: 'Vite', note: 'Fast dev server and an optimised static build that deploys anywhere, including GitHub Pages.' },
  { name: 'Tailwind CSS', note: 'Design tokens for the dark command-centre theme, glassmorphism surfaces and a full light mode.' },
  { name: 'Three.js', note: 'Real-time WebGL scenes — globe, lock, firewall, malware spread, radar sweep, cloud infrastructure and shield.' },
  { name: 'Framer Motion', note: 'Scroll reveals, page transitions and diagram choreography, all respecting prefers-reduced-motion.' },
  { name: 'Custom diagram engine', note: 'A data-driven SVG renderer: every topic declares nodes and edges, and the engine lays out, animates and steps through them.' },
]

export default function About() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
      <section className="card relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 opacity-60 md:block">
          <Scene3D variant="shield" className="h-full w-full" density={0.7} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, var(--bg) 4%, transparent 65%)' }} />
        </div>
        <div className="relative p-8 md:max-w-[58%]">
          <div className="flex items-center gap-3">
            <Logo size={36} />
            <span className="font-display text-xl font-bold">
              CyberSec<span className="text-cyber-300"> Academy</span>
            </span>
          </div>
          <h1 className="mt-6 font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            Created by <span className="text-gradient">Roshan Dennis</span>
          </h1>
          <p className="mt-3 font-mono text-[12px] uppercase tracking-[0.16em] text-cyber-300">
            Cybersecurity Research &amp; Learning Platform
          </p>
          <p className="mt-5 text-[15px] leading-relaxed muted">
            CyberSec Academy exists because most Security+ material sits at one of two extremes: flashcards that teach you
            to recognise an answer without understanding it, or thousand-page references nobody finishes. This platform
            takes the middle path — explain the concept plainly, show it as a diagram you can interact with, then show how
            it fails in the real world and which controls actually break the chain.
          </p>
          <div className="mt-7 flex flex-wrap gap-2.5">
            <Link to="/domains" className="btn-primary">
              Explore the curriculum <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat value={String(TOTAL_TOPICS)} label="Interactive topics" />
        <Stat value={String(TOTAL_QUESTIONS)} label="Exam-style questions" />
        <Stat value={`${TOTAL_TOOLS}+`} label="Tools explained" />
        <Stat value={`${TOTAL_LINKS}+`} label="Primary sources" />
      </div>

      <div className="mt-14">
        <Section
          eyebrow="Method"
          title="How every topic is built"
          intro="A consistent seven-part structure means you always know where to look, whether you are learning something for the first time or revising it for the fifth."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { icon: BookOpen, t: '1. Simple explanation', d: 'What it is, why it exists, how it works and where it is used — written for someone who has never seen the term before.' },
              { icon: Cpu, t: '2. Interactive diagram', d: 'A stepped flow you can hover and walk through, with animated traffic showing what moves where.' },
              { icon: ShieldCheck, t: '3. Real-world example', d: 'A grounded case study explaining why this matters commercially, not just academically.' },
              { icon: Code2, t: '4. Attack scenario', d: 'How adversaries actually exploit the gap, step by step, followed by the mitigations that stop them.' },
              { icon: Cpu, t: '5. Security tools', d: 'The tools practitioners genuinely use, what each does and why it earns its place in the stack.' },
              { icon: BookOpen, t: '6. Deep dive research', d: 'Direct links to NIST, MITRE, OWASP, CISA, IETF and the major cloud providers.' },
            ].map((s) => (
              <div key={s.t} className="card p-5">
                <s.icon className="h-5 w-5 text-cyber-300" />
                <h3 className="mt-3 font-display text-[14.5px] font-semibold">{s.t}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed muted">{s.d}</p>
              </div>
            ))}
          </div>
        </Section>
      </div>

      <div className="mt-14">
        <Section eyebrow="Engineering" title="Built with" intro="A deliberately modern, fully static front end — no backend, no tracking, no account required.">
          <div className="card divide-y divide-white/8">
            {STACK.map((s) => (
              <div key={s.name} className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:gap-6">
                <span className="w-56 shrink-0 font-display text-[14px] font-semibold">{s.name}</span>
                <span className="text-[13px] leading-relaxed muted">{s.note}</span>
              </div>
            ))}
          </div>
        </Section>
      </div>

      <div className="mt-14 card p-7">
        <h2 className="font-display text-lg font-semibold">A note on scope and accuracy</h2>
        <p className="mt-3 text-[13.5px] leading-relaxed muted">
          This platform is an independent educational project. It is not affiliated with, endorsed by, or sponsored by
          CompTIA, and CompTIA and Security+ are trademarks of CompTIA, Inc. Exam objectives change — always cross-check
          against the current official objectives document before sitting the exam. Where a topic describes attacker
          tradecraft, it does so at the conceptual level required to defend against it: the tools listed are industry
          standard and should only ever be used against systems you are explicitly authorised to test.
        </p>
        <p className="mt-4 text-[13.5px] leading-relaxed muted">
          Content is written from primary sources — NIST Special Publications, MITRE ATT&amp;CK, OWASP guidance, CISA
          advisories and vendor documentation — and every topic links directly to them so you can verify and go deeper.
        </p>
      </div>
    </div>
  )
}

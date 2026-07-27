import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight, Layers, ShieldCheck, FlaskConical, BookOpen, Target, Radar,
  Sparkles, Search, Bookmark, Download, Cpu, Network,
} from 'lucide-react'
import Scene3D from '../components/Scene3D'
import Diagram from '../components/Diagram'
import { Reveal, Stat, Section } from '../components/UI'
import { getIcon } from '../components/iconMap'
import {
  DOMAINS, TOPICS, TOTAL_TOPICS, TOTAL_QUESTIONS, TOTAL_TOOLS, TOTAL_LINKS, topicBySlug,
} from '../data'
import { useStore } from '../lib/store'

const FEATURES = [
  { icon: Layers, title: 'Animated flow diagrams', body: 'Every topic ships a stepped, interactive diagram — hover to isolate a path, step through stage by stage, watch packets move.' },
  { icon: Cpu, title: 'Real-time 3D scenes', body: 'Three.js visuals for globes, locks, firewalls, malware spread, radar sweeps and cloud infrastructure, tuned for performance.' },
  { icon: Target, title: 'Attack walkthroughs', body: 'Each concept is paired with how it actually fails in the field, step by step, followed by the mitigations that break the chain.' },
  { icon: FlaskConical, title: 'Hands-on lab simulator', body: 'Triage phishing emails, authentication log bursts and EDR alerts. Choose safe, suspicious or malicious and see the analysis.' },
  { icon: BookOpen, title: 'Exam-style practice', body: 'Scenario-based multiple choice with a full explanation after every answer — including why the distractors are wrong.' },
  { icon: Radar, title: 'Curated primary sources', body: 'Deep-dive links straight to NIST, MITRE ATT&CK, OWASP, CISA, IETF RFCs and major cloud provider documentation.' },
]

export default function Home() {
  const { completed } = useStore()
  const showcase = topicBySlug('firewalls') ?? TOPICS[0]

  return (
    <>
      {/* ---------------------------------------------------------------- Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-cyber-400/10 blur-[120px]" />
        </div>

        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-16 pt-10 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6 lg:px-8 lg:pb-24 lg:pt-16">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-cyber-300/30 bg-cyber-400/10 px-3.5 py-1.5"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon-green opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-neon-green" />
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-cyber-200">
                CompTIA Security+ SY0-701 · All five domains
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08 }}
              className="mt-6 font-display text-[2.6rem] font-bold leading-[1.06] tracking-tight sm:text-6xl"
            >
              Master Cybersecurity with{' '}
              <span className="text-gradient">CompTIA Security+</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.16 }}
              className="mt-5 max-w-xl text-[16.5px] leading-relaxed muted"
            >
              Learn security concepts through interactive diagrams, real-world scenarios, and hands-on explanations.
              Built for complete beginners, detailed enough for practitioners revising before the exam.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.24 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Link to="/topic/cia-triad" className="btn-primary">
                Start Learning <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/domains" className="btn-ghost">
                <Layers className="h-4 w-4" /> Explore Security+ Domains
              </Link>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-7 text-[13px] muted"
            >
              A cybersecurity research and learning platform created by{' '}
              <Link to="/about" className="font-semibold text-cyber-200 underline-offset-4 hover:underline">
                Roshan Dennis
              </Link>
              {completed.length > 0 && (
                <>
                  {' '}· you have completed{' '}
                  <span className="font-semibold text-neon-green">
                    {completed.length}/{TOTAL_TOPICS}
                  </span>{' '}
                  topics
                </>
              )}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.15 }}
            className="relative"
          >
            <div className="relative aspect-square w-full overflow-hidden rounded-[28px]">
              <Scene3D variant="globe" className="h-full w-full" />
              <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-inset ring-white/10" />
            </div>

            <div className="pointer-events-none absolute -left-2 top-8 hidden xl:block">
              <FloatingChip icon={ShieldCheck} label="Zero Trust verified" tone="text-neon-green" />
            </div>
            <div className="pointer-events-none absolute -right-2 bottom-16 hidden xl:block">
              <FloatingChip icon={Network} label="Threat detected · contained" tone="text-neon-red" />
            </div>
          </motion.div>
        </div>

        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-3 px-4 pb-6 sm:px-6 lg:grid-cols-4 lg:px-8">
          <Stat value={String(TOTAL_TOPICS)} label="Interactive topics" />
          <Stat value={String(TOTAL_QUESTIONS)} label="Exam-style questions" />
          <Stat value={`${TOTAL_TOOLS}+`} label="Security tools covered" />
          <Stat value={`${TOTAL_LINKS}+`} label="Primary source links" />
        </div>
      </section>

      {/* ------------------------------------------------------------- Domains */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <Section
          eyebrow="Exam blueprint"
          title="Five domains, one continuous curriculum"
          intro="The SY0-701 objectives, restructured into topics that build on each other. Percentages are the official exam weightings."
        >
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {DOMAINS.map((d, i) => {
              const Icon = getIcon(d.icon)
              const count = TOPICS.filter((t) => t.domain === d.id).length
              const done = TOPICS.filter((t) => t.domain === d.id && completed.includes(t.slug)).length
              return (
                <Reveal key={d.slug} delay={i * 0.06}>
                  <Link to={`/domain/${d.slug}`} className="card card-hover group flex h-full flex-col p-6">
                    <div className="flex items-start justify-between">
                      <span
                        className="flex h-11 w-11 items-center justify-center rounded-xl"
                        style={{ background: `${d.accent}1f`, boxShadow: `0 0 24px -8px ${d.accent}` }}
                      >
                        <Icon className="h-5 w-5" style={{ color: d.accent }} />
                      </span>
                      <span className="chip font-mono" style={{ color: d.accent }}>
                        {d.weight}
                      </span>
                    </div>
                    <h3 className="mt-4 font-display text-[17px] font-semibold leading-snug">
                      <span className="muted">{d.id}.</span> {d.title}
                    </h3>
                    <p className="mt-2.5 flex-1 text-[13.5px] leading-relaxed muted">{d.blurb}</p>
                    <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                      <span className="font-mono text-[11px] muted">
                        {count} topics · {done} done
                      </span>
                      <span className="flex items-center gap-1 text-[12px] font-semibold text-cyber-200 transition group-hover:gap-2">
                        Open <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              )
            })}

            <Reveal delay={0.3}>
              <Link
                to="/labs"
                className="card card-hover group flex h-full flex-col justify-between overflow-hidden p-6"
              >
                <div>
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-neon-green/12 shadow-[0_0_24px_-8px_#3ddc97]">
                    <FlaskConical className="h-5 w-5 text-neon-green" />
                  </span>
                  <h3 className="mt-4 font-display text-[17px] font-semibold">Cybersecurity Lab Simulator</h3>
                  <p className="mt-2.5 text-[13.5px] leading-relaxed muted">
                    Put it into practice. Triage real-looking phishing emails, log bursts and EDR alerts, then read the
                    analyst breakdown of every red flag.
                  </p>
                </div>
                <span className="mt-5 flex items-center gap-1 text-[12px] font-semibold text-neon-green transition group-hover:gap-2">
                  Enter the lab <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            </Reveal>
          </div>
        </Section>
      </div>

      {/* ------------------------------------------------------------ Features */}
      <div className="border-y border-white/10 bg-[color:var(--bg-soft)]/30">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <Section
            eyebrow="What makes it different"
            title="Not a documentation site — a training platform"
            intro="Every topic follows the same six-part structure so you always know where to find what you need."
          >
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {FEATURES.map((f, i) => (
                <Reveal key={f.title} delay={i * 0.05}>
                  <div className="card h-full p-6">
                    <f.icon className="h-5 w-5 text-cyber-300" />
                    <h3 className="mt-3.5 font-display text-[15px] font-semibold">{f.title}</h3>
                    <p className="mt-2 text-[13.5px] leading-relaxed muted">{f.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Section>
        </div>
      </div>

      {/* ------------------------------------------------------------ Showcase */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <Section
          eyebrow="Live example"
          title="Every concept becomes a diagram you can step through"
          intro="This is the actual diagram from the Firewalls topic — hover a node to isolate its connections, or step through the stages one at a time."
        >
          <Reveal>
            <Diagram spec={showcase.diagram} />
          </Reveal>
          <div className="mt-5">
            <Link to={`/topic/${showcase.slug}`} className="btn-ghost">
              Open the full {showcase.title} topic <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Section>
      </div>

      {/* --------------------------------------------------------- Utility row */}
      <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <UtilityCard to="/glossary" icon={Search} title="Glossary" body="Every acronym Security+ throws at you, defined in one line and filterable by domain." />
          <UtilityCard to="/cheat-sheets" icon={Sparkles} title="Cheat Sheets" body="Ports, crypto, risk formulas, control matrix, attack cues and the IR runbook." />
          <UtilityCard to="/progress" icon={Bookmark} title="Progress & Bookmarks" body="Track completed topics, quiz bests and saved pages — stored locally in your browser." />
          <UtilityCard to="/resources" icon={Download} title="Resources" body="Export your study plan and jump to the primary sources professionals actually cite." />
        </div>
      </div>
    </>
  )
}

function FloatingChip({ icon: Icon, label, tone }: { icon: typeof ShieldCheck; label: string; tone: string }) {
  return (
    <div className="card animate-float px-3.5 py-2.5">
      <span className="flex items-center gap-2 text-[11.5px] font-medium">
        <Icon className={`h-3.5 w-3.5 ${tone}`} />
        {label}
      </span>
    </div>
  )
}

function UtilityCard({
  to, icon: Icon, title, body,
}: { to: string; icon: typeof Search; title: string; body: string }) {
  return (
    <Link to={to} className="card card-hover group p-5">
      <Icon className="h-4.5 w-4.5 text-cyber-300" />
      <h3 className="mt-3 font-display text-[14.5px] font-semibold">{title}</h3>
      <p className="mt-1.5 text-[12.5px] leading-relaxed muted">{body}</p>
      <span className="mt-3 flex items-center gap-1 text-[11.5px] font-semibold text-cyber-200 transition group-hover:gap-2">
        Open <ArrowRight className="h-3 w-3" />
      </span>
    </Link>
  )
}

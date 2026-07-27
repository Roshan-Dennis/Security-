import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

export function Section({
  eyebrow,
  title,
  intro,
  children,
  id,
}: {
  eyebrow?: string
  title: string
  intro?: string
  children: ReactNode
  id?: string
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <header className="mb-5">
        {eyebrow && (
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-cyber-300">{eyebrow}</p>
        )}
        <h2 className="section-title mt-1.5">{title}</h2>
        {intro && <p className="mt-2 max-w-3xl text-[14.5px] leading-relaxed muted">{intro}</p>}
      </header>
      {children}
    </section>
  )
}

export function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="card px-5 py-4">
      <p className="font-display text-2xl font-bold text-gradient sm:text-3xl">{value}</p>
      <p className="mt-1 text-[11.5px] uppercase tracking-wider muted">{label}</p>
    </div>
  )
}

export function ProgressRing({ value, size = 96, stroke = 8 }: { value: number; size?: number; stroke?: number }) {
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  return (
    <svg width={size} height={size} className="-rotate-90">
      <defs>
        <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#4fdcff" />
          <stop offset="100%" stopColor="#3ddc97" />
        </linearGradient>
      </defs>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth={stroke} />
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="url(#ringGrad)"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={c}
        initial={{ strokeDashoffset: c }}
        animate={{ strokeDashoffset: c - (c * value) / 100 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      />
    </svg>
  )
}

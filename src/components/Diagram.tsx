import { useId, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Pause, Play, RotateCcw, ChevronRight } from 'lucide-react'
import type { DiagramSpec, DiagramNode } from '../types'
import { toneOf } from '../lib/tone'
import { getIcon } from './iconMap'

const NODE_W = 208
const NODE_H = 74
const COL_GAP = 88
const ROW_GAP = 26
const PAD_X = 18
const PAD_Y = 34
/** clearance required between an edge label and any node box */
const LABEL_PAD = 8

interface Placed extends DiagramNode {
  x: number
  y: number
  col: number
}

/**
 * Data-driven diagram engine.
 * Every topic ships a DiagramSpec (columns + edges) and this component lays it out,
 * draws bezier connectors and animates packets travelling along the flow.
 */
export default function Diagram({ spec }: { spec: DiagramSpec }) {
  const uid = useId().replace(/[:]/g, '')
  const [playing, setPlaying] = useState(true)
  const [step, setStep] = useState<number | null>(null)
  const [hover, setHover] = useState<string | null>(null)

  const { nodes, byId, width, height } = useMemo(() => {
    const map = new Map<string, Placed>()
    const placed: Placed[] = []
    const maxRows = Math.max(...spec.columns.map((c) => c.length))
    const h = PAD_Y * 2 + maxRows * NODE_H + (maxRows - 1) * ROW_GAP
    spec.columns.forEach((col, ci) => {
      const colH = col.length * NODE_H + (col.length - 1) * ROW_GAP
      const startY = (h - colH) / 2
      col.forEach((n, ri) => {
        const p: Placed = {
          ...n,
          col: ci,
          x: PAD_X + ci * (NODE_W + COL_GAP),
          y: startY + ri * (NODE_H + ROW_GAP),
        }
        placed.push(p)
        map.set(n.id, p)
      })
    })
    return {
      nodes: placed,
      byId: map,
      width: PAD_X * 2 + spec.columns.length * NODE_W + (spec.columns.length - 1) * COL_GAP,
      height: h,
    }
  }, [spec])

  const boxes = useMemo(() => [...byId.values()], [byId])

  const edges = useMemo(
    () =>
      spec.edges
        .map((e, i) => {
          const a = byId.get(e.from)
          const b = byId.get(e.to)
          if (!a || !b) return null
          const forward = b.col > a.col
          const sx = forward ? a.x + NODE_W : a.x + NODE_W / 2
          const sy = forward ? a.y + NODE_H / 2 : a.y + NODE_H
          const tx = forward ? b.x : b.x + NODE_W / 2
          const ty = forward ? b.y + NODE_H / 2 : b.y
          const dx = Math.max(40, Math.abs(tx - sx) * 0.55)
          const c1 = forward ? { x: sx + dx, y: sy } : { x: sx, y: sy + 60 }
          const c2 = forward ? { x: tx - dx, y: ty } : { x: tx, y: ty + 60 }
          const d = `M ${sx} ${sy} C ${c1.x} ${c1.y}, ${c2.x} ${c2.y}, ${tx} ${ty}`

          // Place the label on the curve itself rather than at the arithmetic midpoint
          // of the endpoints. The midpoint of a bezier between offset rows frequently
          // lands inside the target node, which is how "match" ended up printed over
          // the State Table subtitle. Walk a few positions along the curve and take the
          // first that clears every node box.
          const p0 = { x: sx, y: sy }
          const p3 = { x: tx, y: ty }
          const at = (t: number) => {
            const u = 1 - t
            return {
              x: u * u * u * p0.x + 3 * u * u * t * c1.x + 3 * u * t * t * c2.x + t * t * t * p3.x,
              y: u * u * u * p0.y + 3 * u * u * t * c1.y + 3 * u * t * t * c2.y + t * t * t * p3.y,
            }
          }
          const clearsNodes = (pt: { x: number; y: number }) =>
            !boxes.some(
              (n) =>
                pt.x > n.x - LABEL_PAD &&
                pt.x < n.x + NODE_W + LABEL_PAD &&
                pt.y > n.y - LABEL_PAD &&
                pt.y < n.y + NODE_H + LABEL_PAD,
            )
          // try successive positions along the curve, and at each one a few vertical
          // offsets, taking the first that clears every node box
          const positions: Array<{ x: number; y: number }> = []
          for (const t of [0.5, 0.4, 0.6, 0.3, 0.7, 0.25, 0.75]) {
            const p = at(t)
            for (const dy of [-9, -28, 20, -46, 38]) positions.push({ x: p.x, y: p.y + dy })
          }
          const mid = positions.find(clearsNodes) ?? { x: at(0.5).x, y: Math.min(a.y, b.y) - 14 }
          return { ...e, id: `${uid}-e${i}`, d, mid, a, b }
        })
        .filter(Boolean) as Array<
        (typeof spec.edges)[number] & {
          id: string
          d: string
          mid: { x: number; y: number }
          a: Placed
          b: Placed
        }
      >,
    [spec.edges, byId, uid, boxes],
  )

  const dimmed = (id: string) => {
    if (step !== null) return byId.get(id)!.col > step
    if (!hover) return false
    return !(hover === id || edges.some((e) => (e.from === hover && e.to === id) || (e.to === hover && e.from === id)))
  }

  const edgeDimmed = (from: string, to: string) => {
    if (step !== null) return Math.max(byId.get(from)!.col, byId.get(to)!.col) > step
    if (!hover) return false
    return from !== hover && to !== hover
  }

  const maxStep = spec.columns.length - 1

  return (
    <figure className="card overflow-hidden">
      <figcaption className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-4">
        <div>
          <h3 className="font-display text-base font-semibold">{spec.title}</h3>
          {spec.caption && <p className="mt-1 max-w-2xl text-[13px] leading-relaxed muted">{spec.caption}</p>}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setStep((s) => (s === null ? 0 : s >= maxStep ? null : s + 1))}
            className="chip hover:bg-white/10"
            aria-label="Step through the diagram"
          >
            <ChevronRight className="h-3.5 w-3.5" />
            {step === null ? 'Step through' : step >= maxStep ? 'Show all' : `Stage ${step + 1}/${maxStep + 1}`}
          </button>
          {step !== null && (
            <button type="button" onClick={() => setStep(null)} className="chip hover:bg-white/10" aria-label="Reset steps">
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          )}
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            className="chip hover:bg-white/10"
            aria-label={playing ? 'Pause animation' : 'Play animation'}
          >
            {playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
            {playing ? 'Pause' : 'Play'}
          </button>
        </div>
      </figcaption>

      <div className="overflow-x-auto px-2 py-3">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          style={{ minWidth: Math.min(width, 1180) }}
          className="w-full"
          role="img"
          aria-label={spec.title}
        >
          <defs>
            <marker id={`${uid}-arrow`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
            </marker>
          </defs>

          {edges.map((e) => {
            const t = toneOf(e.tone)
            const off = edgeDimmed(e.from, e.to)
            return (
              <g key={e.id} style={{ color: t.stroke, opacity: off ? 0.12 : 1, transition: 'opacity .3s' }}>
                <path id={e.id} d={e.d} fill="none" stroke={t.stroke} strokeWidth={1.7} strokeOpacity={0.65} markerEnd={`url(#${uid}-arrow)`} />
                {e.animated && playing && !off && (
                  <>
                    <circle r={4.2} fill={t.stroke} opacity={0.95}>
                      <animateMotion dur="2.6s" repeatCount="indefinite" rotate="auto">
                        <mpath href={`#${e.id}`} />
                      </animateMotion>
                    </circle>
                    <circle r={9} fill={t.stroke} opacity={0.16}>
                      <animateMotion dur="2.6s" repeatCount="indefinite">
                        <mpath href={`#${e.id}`} />
                      </animateMotion>
                    </circle>
                  </>
                )}
                {e.label && (
                  <text
                    x={e.mid.x}
                    y={e.mid.y}
                    textAnchor="middle"
                    fontSize={10.5}
                    fill={t.stroke}
                    stroke="var(--bg)"
                    strokeWidth={3.5}
                    strokeLinejoin="round"
                    paintOrder="stroke"
                    opacity={0.95}
                    style={{ fontFamily: 'JetBrains Mono, ui-monospace, monospace' }}
                  >
                    {e.label}
                  </text>
                )}
              </g>
            )
          })}

          {nodes.map((n, i) => {
            const t = toneOf(n.tone)
            const Icon = getIcon(n.icon)
            const off = dimmed(n.id)
            return (
              <motion.g
                key={n.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: off ? 0.16 : 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.045, 0.5), duration: 0.4 }}
                onMouseEnter={() => setHover(n.id)}
                onMouseLeave={() => setHover(null)}
                style={{ cursor: 'pointer' }}
              >
                <rect
                  x={n.x}
                  y={n.y}
                  width={NODE_W}
                  height={NODE_H}
                  rx={14}
                  fill={t.fill}
                  stroke={t.stroke}
                  strokeWidth={hover === n.id ? 2.1 : 1.3}
                  strokeOpacity={0.85}
                />
                <rect x={n.x} y={n.y} width={4} height={NODE_H} rx={2} fill={t.stroke} opacity={0.9} />
                <g transform={`translate(${n.x + 16}, ${n.y + (n.sub ? 16 : 27)})`} style={{ color: t.stroke }}>
                  <Icon width={17} height={17} stroke={t.stroke} strokeWidth={1.9} />
                </g>
                <text
                  x={n.x + 42}
                  y={n.y + (n.sub ? 27 : 40)}
                  fontSize={12.6}
                  fontWeight={600}
                  fill={t.text}
                  style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                >
                  {truncate(n.label, 26)}
                </text>
                {n.sub && (
                  <text
                    x={n.x + 16}
                    y={n.y + 50}
                    fontSize={10.4}
                    fill={t.text}
                    opacity={0.66}
                    style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                  >
                    {truncate(n.sub, 37)}
                  </text>
                )}
              </motion.g>
            )
          })}
        </svg>
      </div>

      {spec.legend && spec.legend.length > 0 && (
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/10 px-5 py-3">
          {spec.legend.map((l) => {
            const t = toneOf(l.tone)
            return (
              <span key={l.label} className="flex items-center gap-2 text-[11px] muted">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: t.stroke, boxShadow: `0 0 10px ${t.glow}` }} />
                {l.label}
              </span>
            )
          })}
        </div>
      )}
    </figure>
  )
}

function truncate(s: string, n: number) {
  return s.length > n ? s.slice(0, n - 1) + '…' : s
}

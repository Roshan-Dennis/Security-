// Verify no edge label lands inside a node box, across all 48 diagrams.
import { execFileSync } from 'node:child_process'
execFileSync('npx',['esbuild','src/data/index.ts','--bundle','--platform=node','--format=cjs','--outfile=/tmp/dz.cjs','--log-level=error','--loader:.css=empty'])
const { TOPICS } = await import('/tmp/dz.cjs')

const NODE_W = 208, NODE_H = 74, COL_GAP = 88, ROW_GAP = 26, PAD_X = 18, PAD_Y = 34, LABEL_PAD = 8

function layout(spec) {
  const map = new Map(); const maxRows = Math.max(...spec.columns.map(c => c.length))
  const h = PAD_Y * 2 + maxRows * NODE_H + (maxRows - 1) * ROW_GAP
  spec.columns.forEach((col, ci) => {
    const colH = col.length * NODE_H + (col.length - 1) * ROW_GAP
    const startY = (h - colH) / 2
    col.forEach((n, ri) => map.set(n.id, { ...n, col: ci, x: PAD_X + ci * (NODE_W + COL_GAP), y: startY + ri * (NODE_H + ROW_GAP) }))
  })
  return map
}

let labels = 0, collisions = 0, lifted = 0
const bad = []
for (const t of TOPICS) {
  const map = layout(t.diagram); const boxes = [...map.values()]
  for (const e of t.diagram.edges) {
    if (!e.label) continue
    labels++
    const a = map.get(e.from), b = map.get(e.to)
    const forward = b.col > a.col
    const sx = forward ? a.x + NODE_W : a.x + NODE_W / 2
    const sy = forward ? a.y + NODE_H / 2 : a.y + NODE_H
    const tx = forward ? b.x : b.x + NODE_W / 2
    const ty = forward ? b.y + NODE_H / 2 : b.y
    const dx = Math.max(40, Math.abs(tx - sx) * 0.55)
    const c1 = forward ? { x: sx + dx, y: sy } : { x: sx, y: sy + 60 }
    const c2 = forward ? { x: tx - dx, y: ty } : { x: tx, y: ty + 60 }
    const p0 = { x: sx, y: sy }, p3 = { x: tx, y: ty }
    const at = (u) => { const v = 1 - u; return {
      x: v*v*v*p0.x + 3*v*v*u*c1.x + 3*v*u*u*c2.x + u*u*u*p3.x,
      y: v*v*v*p0.y + 3*v*v*u*c1.y + 3*v*u*u*c2.y + u*u*u*p3.y } }
    const clears = (pt) => !boxes.some(n => pt.x > n.x-LABEL_PAD && pt.x < n.x+NODE_W+LABEL_PAD && pt.y > n.y-LABEL_PAD && pt.y < n.y+NODE_H+LABEL_PAD)
    const positions = []
    for (const u of [0.5,0.4,0.6,0.3,0.7,0.25,0.75]) { const p = at(u); for (const dy of [-9,-28,20,-46,38]) positions.push({x:p.x,y:p.y+dy}) }
    let mid = positions.find(clears)
    if (!mid) { mid = { x: at(0.5).x, y: Math.min(a.y, b.y) - 14 }; lifted++ }
    if (!clears(mid)) { collisions++; bad.push(`${t.slug}: "${e.label}" (${e.from}->${e.to})`) }
  }
}
console.log(`edge labels checked : ${labels}`)
console.log(`landing inside a node: ${collisions}`)
console.log(`lifted above the row : ${lifted}`)
bad.slice(0, 10).forEach(b => console.log('   ' + b))
if (collisions > 0) { console.log('\nFAIL - edge labels overlap node boxes'); process.exit(1) }
console.log('\nPASS - no edge label overlaps a node box')

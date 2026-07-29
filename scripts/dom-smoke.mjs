/* Client smoke test: executes the real browser bundle inside jsdom, mounts the app,
   navigates the hash router and fails on any uncaught error or console error. */
import { JSDOM, VirtualConsole } from 'jsdom'
import { execFileSync } from 'node:child_process'
import { readFileSync, rmSync } from 'node:fs'

const OUT = '.dom-smoke-bundle.js'
execFileSync('npx', ['esbuild', 'src/main.tsx', '--bundle', '--format=iife', `--outfile=${OUT}`,
  '--jsx=automatic', '--loader:.css=empty', '--define:process.env.NODE_ENV="development"'], { stdio: 'inherit' })
const code = readFileSync(OUT, 'utf8')

const problems = []
const vc = new VirtualConsole()
vc.on('jsdomError', (e) => {
  const m = String(e?.message ?? e)
  if (m.includes('Not implemented') || m.includes('WebGL') || m.includes('getContext')) return
  problems.push('jsdomError: ' + m)
})
vc.on('error', (...a) => {
  const m = a.map(String).join(' ')
  if (m.includes('useLayoutEffect') || m.includes('WebGL') || m.includes('getContext')) return
  problems.push('console.error: ' + m.slice(0, 300))
})

const dom = new JSDOM('<!doctype html><html><body><div id="root"></div></body></html>', {
  runScripts: 'outside-only',
  pretendToBeVisual: true,
  url: 'http://localhost/#/',
  virtualConsole: vc,
})
const { window } = dom
window.matchMedia = () => ({ matches: false, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {} })
window.ResizeObserver = class { observe() {} unobserve() {} disconnect() {} }
window.IntersectionObserver = class { observe() {} unobserve() {} disconnect() {} takeRecords() { return [] } }
window.scrollTo = () => {}
window.HTMLCanvasElement.prototype.getContext = () => null

window.eval(code)

const wait = (ms) => new Promise((r) => setTimeout(r, ms))
const routes = ['#/', '#/domains', '#/domain/security-operations', '#/topic/firewalls', '#/topic/cia-triad',
  '#/labs', '#/glossary', '#/cheat-sheets', '#/progress', '#/resources', '#/about', '#/nope']

await wait(400)
const results = []
for (const r of routes) {
  window.location.hash = r
  window.dispatchEvent(new window.HashChangeEvent('hashchange'))
  await wait(260)
  const text = window.document.getElementById('root')?.textContent ?? ''
  results.push([r, text.length])
  if (text.length < 400) problems.push(`route ${r} rendered only ${text.length} chars`)
}

rmSync(OUT, { force: true })
console.log('\nClient render (chars of text per route):')
results.forEach(([r, n]) => console.log(`  ${r.padEnd(34)} ${n}`))
if (problems.length) {
  console.log('\nFAIL — client runtime problems:')
  problems.slice(0, 12).forEach((p) => console.log('  ' + p))
  process.exit(1)
}
console.log('\nPASS — all routes mounted in a real DOM with no runtime errors\n')

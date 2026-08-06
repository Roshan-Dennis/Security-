/* Smoke test: server-renders every route and asserts key content appears.
   Run with: npm run smoke */
import { renderToString } from 'react-dom/server'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { StoreProvider } from '../src/lib/store'
import Layout from '../src/components/Layout'
import Home from '../src/pages/Home'
import { DomainsIndex, DomainPage } from '../src/pages/Domains'
import TopicPage from '../src/pages/TopicPage'
import Labs from '../src/pages/Labs'
import Exam from '../src/pages/Exam'
import Glossary from '../src/pages/Glossary'
import CheatSheets from '../src/pages/CheatSheets'
import ProgressPage from '../src/pages/Progress'
import Resources from '../src/pages/Resources'
import About from '../src/pages/About'
import NotFound from '../src/pages/NotFound'
import { TOPICS, DOMAINS, GLOSSARY, CHEATSHEETS, LABS, EXAM_BANK, EXAM_BANK_SIZE, EXAM_MODES, buildExam, isCorrect, domainModes } from '../src/data'
import { shuffleOptions } from '../src/lib/shuffle'

function render(path: string) {
  return renderToString(
    <StoreProvider>
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="domains" element={<DomainsIndex />} />
            <Route path="domain/:slug" element={<DomainPage />} />
            <Route path="topic/:slug" element={<TopicPage />} />
            <Route path="labs" element={<Labs />} />
            <Route path="exam" element={<Exam />} />
            <Route path="glossary" element={<Glossary />} />
            <Route path="cheat-sheets" element={<CheatSheets />} />
            <Route path="progress" element={<ProgressPage />} />
            <Route path="resources" element={<Resources />} />
            <Route path="about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </MemoryRouter>
    </StoreProvider>,
  )
}

const origError = console.error
console.error = (...a: unknown[]) => {
  const first = String(a[0] ?? '')
  if (first.includes('useLayoutEffect') || first.includes('not wrapped in act')) return
  origError(...a)
}

let failures = 0
const check = (name: string, ok: boolean, detail = '') => {
  if (!ok) {
    failures++
    console.log('  FAIL  ' + name + (detail ? ' — ' + detail : ''))
  }
}

const routes: [string, string[]][] = [
  ['/', ['Master Cybersecurity', 'Roshan Dennis', 'Start Learning', 'Explore Security+ Domains']],
  ['/domains', ['Security+ SY0-701 domains']],
  ['/labs', ['Cybersecurity Lab Simulator']],
  ['/exam', ['Timed practice exam', 'Full mock exam', 'Single-domain drills']],
  ['/glossary', ['Glossary']],
  ['/cheat-sheets', ['Cheat sheets', 'Ports & Protocols']],
  ['/progress', ['Progress & bookmarks']],
  ['/resources', ['Downloads & primary sources']],
  ['/about', ['Created by', 'Roshan Dennis', 'Cybersecurity Research']],
  ['/does-not-exist', ['404']],
]

console.log('\nRoutes')
for (const [path, needles] of routes) {
  let html = ''
  try {
    html = render(path)
  } catch (e) {
    check(path, false, String(e))
    continue
  }
  check(path + ' renders', html.length > 500, `only ${html.length} chars`)
  needles.forEach((n) => check(`${path} contains "${n}"`, html.includes(escapeHtml(n))))
}

console.log('Domains')
for (const d of DOMAINS) {
  const html = render('/domain/' + d.slug)
  check(d.slug, html.includes(escapeHtml(d.title)))
}

console.log(`Topics (${TOPICS.length})`)
for (const t of TOPICS) {
  let html = ''
  try {
    html = render('/topic/' + t.slug)
  } catch (e) {
    check(t.slug, false, String(e))
    continue
  }
  check(t.slug + ' title', html.includes(escapeHtml(t.title)))
  check(t.slug + ' diagram', html.includes(escapeHtml(t.diagram.title)))
  check(t.slug + ' attack', html.includes(escapeHtml(t.attack.title)))
  check(t.slug + ' quiz', html.includes('Question ') && html.includes('of'))
}

console.log('Data integrity')
const slugs = new Set<string>()
for (const t of TOPICS) {
  check('unique slug ' + t.slug, !slugs.has(t.slug))
  slugs.add(t.slug)
  check(t.slug + ' has quiz', t.quiz.length >= 2)
  check(t.slug + ' has tools', t.tools.length >= 2)
  check(t.slug + ' has links', t.links.length >= 3)
  check(t.slug + ' has mitigations', t.attack.mitigations.length >= 3)
  check(t.slug + ' domain valid', t.domain >= 1 && t.domain <= 5)
  t.quiz.forEach((q, i) =>
    check(`${t.slug} q${i} answer index`, q.answer >= 0 && q.answer < q.options.length),
  )
  const ids = new Set(t.diagram.columns.flat().map((n) => n.id))
  t.diagram.edges.forEach((e) => {
    check(`${t.slug} edge from ${e.from}`, ids.has(e.from))
    check(`${t.slug} edge to ${e.to}`, ids.has(e.to))
  })
  t.links.forEach((l) => check(`${t.slug} link https`, l.url.startsWith('https://') || l.url.startsWith('http://')))
}
LABS.forEach((l) => check('lab ' + l.id, ['safe', 'suspicious', 'malicious'].includes(l.correct)))

console.log(`Exam bank (${EXAM_BANK.length})`)
check('bank size is 300', EXAM_BANK.length === 300, String(EXAM_BANK.length))
check(
  'EXAM_BANK_SIZE constant matches the real bank length',
  EXAM_BANK_SIZE === EXAM_BANK.length,
  `constant ${EXAM_BANK_SIZE} vs actual ${EXAM_BANK.length}`,
)
const examIds = new Set<string>()
const topicSlugs = new Set(TOPICS.map((t) => t.slug))
const byDomainCount: Record<number, number> = {}
for (const q of EXAM_BANK) {
  check('unique exam id ' + q.id, !examIds.has(q.id))
  examIds.add(q.id)
  byDomainCount[q.domain] = (byDomainCount[q.domain] ?? 0) + 1
  check(q.id + ' domain valid', q.domain >= 1 && q.domain <= 5)
  check(q.id + ' has four options', q.options.length === 4)
  check(q.id + ' has explanation', q.explain.length > 40)
  const ans = Array.isArray(q.answer) ? q.answer : [q.answer]
  check(q.id + ' answer count', ans.length >= 1 && ans.length < q.options.length)
  ans.forEach((a) => check(q.id + ' answer index in range', a >= 0 && a < q.options.length))
  check(q.id + ' answers unique', new Set(ans).size === ans.length)
  if (q.topic) check(q.id + ' topic slug exists: ' + q.topic, topicSlugs.has(q.topic))
}
check('domain 1 count', byDomainCount[1] === 36, String(byDomainCount[1]))
check('domain 2 count', byDomainCount[2] === 66, String(byDomainCount[2]))
check('domain 3 count', byDomainCount[3] === 54, String(byDomainCount[3]))
check('domain 4 count', byDomainCount[4] === 84, String(byDomainCount[4]))
check('domain 5 count', byDomainCount[5] === 60, String(byDomainCount[5]))

for (const mode of [...EXAM_MODES, ...domainModes()]) {
  const paper = buildExam(mode)
  check('paper size for ' + mode.key, paper.length === mode.count, `${paper.length} vs ${mode.count}`)
  check('paper unique for ' + mode.key, new Set(paper.map((q) => q.id)).size === paper.length)
  if (!mode.domain) {
    ;[1, 2, 3, 4, 5].forEach((d) =>
      check(`paper ${mode.key} covers domain ${d}`, paper.some((q) => q.domain === d)),
    )
  }
}
// distractor balance — a correct answer that is visibly longer than every
// alternative is guessable regardless of shuffling (audit finding: 68.5% longest)
console.log('Distractor balance')
const singles = EXAM_BANK.filter((q) => !Array.isArray(q.answer))
let ratioBreaches = 0
let visiblyLongest = 0
for (const q of singles) {
  const correctLen = q.options[q.answer as number].length
  const others = q.options.filter((_, i) => i !== q.answer).map((o) => o.length)
  const avgOther = others.reduce((a, b) => a + b, 0) / others.length
  if (correctLen / avgOther >= 2.5) {
    ratioBreaches++
    check(`${q.id} distractor length ratio under 2.5x`, false, (correctLen / avgOther).toFixed(1) + 'x')
  }
  const maxOther = Math.max(...others)
  if (correctLen > maxOther && (correctLen - maxOther) / maxOther > 0.15) visiblyLongest++
}
check('no question exceeds a 2.5x length ratio', ratioBreaches === 0, `${ratioBreaches} questions`)
const longestRate = visiblyLongest / singles.length
check(
  'picking the visibly longest option is no better than chance',
  longestRate < 0.32,
  `${(longestRate * 100).toFixed(1)}% (target under 32%, chance is 25%)`,
)

// option shuffling must preserve which option text is correct, and must not
// leave the correct answer clustered in one position (audit finding: 81% at B)
console.log('Option shuffling')
let shuffleMismatch = 0
const shufflePos = [0, 0, 0, 0]
let shuffleN = 0
for (let round = 0; round < 30; round++) {
  for (const paper of [buildExam(EXAM_MODES[0]), buildExam(EXAM_MODES[2])]) {
    for (const q of paper) {
      const orig = EXAM_BANK.find((o) => o.id === q.id)!
      const shown = (Array.isArray(q.answer) ? q.answer : [q.answer]).map((i) => q.options[i]).sort().join('|')
      const truth = (Array.isArray(orig.answer) ? orig.answer : [orig.answer]).map((i) => orig.options[i]).sort().join('|')
      if (shown !== truth) shuffleMismatch++
      if (!Array.isArray(q.answer)) {
        shufflePos[q.answer]++
        shuffleN++
      }
    }
  }
}
check('shuffling preserves the correct option', shuffleMismatch === 0, `${shuffleMismatch} mismatches`)
const expectedPos = shuffleN / 4
const chi = shufflePos.reduce((acc, n) => acc + (n - expectedPos) ** 2 / expectedPos, 0)
check('answer positions are uniform (chi-square < 12)', chi < 12, `chi-square ${chi.toFixed(2)}`)
const roundTrip = shuffleOptions(EXAM_BANK[0])
check('shuffleOptions keeps option count', roundTrip.options.length === EXAM_BANK[0].options.length)

// grading logic
const sample = EXAM_BANK.find((q) => Array.isArray(q.answer))!
check('multi-select grades correctly', isCorrect(sample, [...(sample.answer as number[])]))
check('multi-select rejects partial', !isCorrect(sample, [(sample.answer as number[])[0]]))
const single = EXAM_BANK.find((q) => !Array.isArray(q.answer))!
check('single grades correctly', isCorrect(single, [single.answer as number]))
check('single rejects wrong', !isCorrect(single, [((single.answer as number) + 1) % single.options.length]))
check('glossary size', GLOSSARY.length >= 50)
check('cheatsheets', CHEATSHEETS.length >= 5)

function escapeHtml(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

console.log(
  `\n${failures === 0 ? 'PASS' : 'FAIL'} — ${TOPICS.length} topics, ${DOMAINS.length} domains, ${EXAM_BANK.length} exam questions, ${LABS.length} labs, ${GLOSSARY.length} glossary terms, ${failures} failures\n`,
)
process.exit(failures === 0 ? 0 : 1)

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
import Glossary from '../src/pages/Glossary'
import CheatSheets from '../src/pages/CheatSheets'
import ProgressPage from '../src/pages/Progress'
import Resources from '../src/pages/Resources'
import About from '../src/pages/About'
import NotFound from '../src/pages/NotFound'
import { TOPICS, DOMAINS, GLOSSARY, CHEATSHEETS, LABS } from '../src/data'

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
check('glossary size', GLOSSARY.length >= 50)
check('cheatsheets', CHEATSHEETS.length >= 5)

function escapeHtml(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

console.log(
  `\n${failures === 0 ? 'PASS' : 'FAIL'} — ${TOPICS.length} topics, ${DOMAINS.length} domains, ${LABS.length} labs, ${GLOSSARY.length} glossary terms, ${failures} failures\n`,
)
process.exit(failures === 0 ? 0 : 1)

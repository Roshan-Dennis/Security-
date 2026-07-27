import { Suspense, lazy, useEffect } from 'react'
import { HashRouter, Route, Routes, useLocation } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import { StoreProvider } from './lib/store'

const DomainsIndex = lazy(() => import('./pages/Domains').then((m) => ({ default: m.DomainsIndex })))
const DomainPage = lazy(() => import('./pages/Domains').then((m) => ({ default: m.DomainPage })))
const TopicPage = lazy(() => import('./pages/TopicPage'))
const Labs = lazy(() => import('./pages/Labs'))
const Glossary = lazy(() => import('./pages/Glossary'))
const CheatSheets = lazy(() => import('./pages/CheatSheets'))
const ProgressPage = lazy(() => import('./pages/Progress'))
const Resources = lazy(() => import('./pages/Resources'))
const About = lazy(() => import('./pages/About'))
const NotFound = lazy(() => import('./pages/NotFound'))

function HashAnchorScroll() {
  const { hash, pathname } = useLocation()
  useEffect(() => {
    if (!hash) return
    const id = hash.slice(1)
    const t = setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 120)
    return () => clearTimeout(t)
  }, [hash, pathname])
  return null
}

function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-9 w-9 animate-spin rounded-full border-2 border-white/15 border-t-cyber-300" />
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] muted">Loading module…</p>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <StoreProvider>
      <HashRouter>
        <HashAnchorScroll />
        <Suspense fallback={<Loading />}>
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
        </Suspense>
      </HashRouter>
    </StoreProvider>
  )
}

import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, Search, Sun, Moon, Github, Linkedin, Command } from 'lucide-react'
import { BrandMark, Logo } from './Brand'
import SearchPalette from './SearchPalette'
import { DOMAINS, TOTAL_TOPICS, TOTAL_QUESTIONS } from '../data'
import { useStore } from '../lib/store'

const NAV = [
  { to: '/domains', label: 'Domains' },
  { to: '/labs', label: 'Labs' },
  { to: '/glossary', label: 'Glossary' },
  { to: '/cheat-sheets', label: 'Cheat Sheets' },
  { to: '/resources', label: 'Resources' },
  { to: '/progress', label: 'Progress' },
  { to: '/about', label: 'About' },
]

export default function Layout() {
  const [menu, setMenu] = useState(false)
  const [search, setSearch] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { theme, toggleTheme } = useStore()
  const { pathname } = useLocation()

  useEffect(() => {
    setMenu(false)
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setSearch(true)
      }
      if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        e.preventDefault()
        setSearch(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-cyber-400 focus:px-4 focus:py-2 focus:text-[#04121c]">
        Skip to content
      </a>

      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? 'border-b border-white/10 bg-[color:var(--bg)]/80 backdrop-blur-xl' : ''
        }`}
      >
        <div className="mx-auto flex h-[68px] max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
          <BrandMark />

          <nav className="ml-6 hidden items-center gap-1 lg:flex">
            {NAV.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2 text-[13px] font-medium transition ${
                    isActive ? 'bg-white/10 text-cyber-200' : 'muted hover:bg-white/5 hover:text-[color:var(--text)]'
                  }`
                }
              >
                {n.label}
              </NavLink>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={() => setSearch(true)}
              className="hidden items-center gap-2 rounded-xl border border-white/12 bg-white/[0.04] px-3 py-2 text-[12px] muted transition hover:bg-white/[0.08] sm:flex"
              aria-label="Open search"
            >
              <Search className="h-3.5 w-3.5" />
              <span>Search</span>
              <span className="ml-2 flex items-center gap-0.5 rounded border border-white/15 px-1.5 py-0.5 font-mono text-[9.5px]">
                <Command className="h-2.5 w-2.5" />K
              </span>
            </button>
            <button onClick={() => setSearch(true)} className="chip sm:hidden" aria-label="Open search">
              <Search className="h-4 w-4" />
            </button>
            <button onClick={toggleTheme} className="chip hover:bg-white/10" aria-label="Toggle colour theme">
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button onClick={() => setMenu((m) => !m)} className="chip lg:hidden" aria-label="Toggle navigation menu">
              {menu ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menu && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-white/10 bg-[color:var(--bg-soft)]/95 backdrop-blur-xl lg:hidden"
            >
              <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
                {NAV.map((n) => (
                  <NavLink
                    key={n.to}
                    to={n.to}
                    className={({ isActive }) =>
                      `block rounded-lg px-3 py-2.5 text-sm font-medium ${isActive ? 'bg-white/10 text-cyber-200' : 'muted'}`
                    }
                  >
                    {n.label}
                  </NavLink>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <main id="main" className="flex-1">
        <Outlet />
      </main>

      <Footer />
      <SearchPalette open={search} onClose={() => setSearch(false)} />
    </div>
  )
}

function Footer() {
  return (
    <footer className="mt-24 border-t border-white/10 bg-[color:var(--bg-soft)]/40">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <Logo size={30} />
              <span className="font-display text-lg font-bold">
                CyberSec<span className="text-cyber-300"> Academy</span>
              </span>
            </div>
            <p className="mt-4 max-w-md text-sm leading-relaxed muted">
              An independent, interactive learning platform for CompTIA Security+ (SY0-701). Every topic pairs a
              plain-language explanation with an animated diagram, a real-world case, an attack walkthrough, the tools
              professionals actually use, and exam-style practice.
            </p>
            <p className="mt-5 text-sm">
              <span className="text-gradient font-display font-semibold">
                Created by Roshan Dennis — Cybersecurity Research &amp; Learning Platform
              </span>
            </p>
            <div className="mt-4 flex items-center gap-2">
              <a
                href="https://github.com/"
                target="_blank"
                rel="noreferrer noopener"
                className="chip hover:bg-white/10"
                aria-label="GitHub"
              >
                <Github className="h-3.5 w-3.5" /> GitHub
              </a>
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer noopener"
                className="chip hover:bg-white/10"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-3.5 w-3.5" /> LinkedIn
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display text-[13px] font-semibold uppercase tracking-wider text-cyber-300">Exam Domains</h4>
            <ul className="mt-4 space-y-2.5">
              {DOMAINS.map((d) => (
                <li key={d.slug}>
                  <Link to={`/domain/${d.slug}`} className="text-[13px] muted transition hover:text-cyber-200">
                    {d.id}. {d.short} <span className="opacity-60">({d.weight})</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-[13px] font-semibold uppercase tracking-wider text-cyber-300">Platform</h4>
            <ul className="mt-4 space-y-2.5">
              {NAV.map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className="text-[13px] muted transition hover:text-cyber-200">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-[12px] muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            {TOTAL_TOPICS} interactive topics · {TOTAL_QUESTIONS} exam-style questions · built with React, TypeScript,
            Three.js and Framer Motion.
          </p>
          <p>
            © {new Date().getFullYear()} Roshan Dennis. Educational use. CompTIA and Security+ are trademarks of CompTIA,
            Inc. — this platform is independent and not affiliated with or endorsed by CompTIA.
          </p>
        </div>
      </div>
    </footer>
  )
}

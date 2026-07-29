import { Link } from 'react-router-dom'
import { ArrowRight, ShieldAlert } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-28 text-center">
      <ShieldAlert className="h-12 w-12 text-neon-amber" />
      <h1 className="mt-6 font-display text-4xl font-bold">404 — access denied</h1>
      <p className="mt-3 text-[15px] muted">
        No rule matched this request, so the implicit deny took over. That page does not exist.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link to="/" className="btn-primary">
          Return to base <ArrowRight className="h-4 w-4" />
        </Link>
        <Link to="/domains" className="btn-ghost">
          Browse the domains
        </Link>
      </div>
    </div>
  )
}

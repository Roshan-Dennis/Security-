import { Link } from 'react-router-dom'

export function Logo({ size = 34 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="brandGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7ee9ff" />
          <stop offset="55%" stopColor="#4fdcff" />
          <stop offset="100%" stopColor="#3ddc97" />
        </linearGradient>
      </defs>
      <path
        d="M16 2 4 7v9c0 7.2 5 12.6 12 14 7-1.4 12-6.8 12-14V7L16 2Z"
        fill="rgba(8,20,38,0.85)"
        stroke="url(#brandGrad)"
        strokeWidth="1.8"
      />
      <path d="m10.5 16 4 4 7.5-8" stroke="url(#brandGrad)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="group flex items-center gap-2.5" aria-label="CyberSec Academy home">
      <span className="relative">
        <Logo />
        <span className="absolute inset-0 -z-10 rounded-full bg-cyber-400/25 blur-lg transition group-hover:bg-cyber-400/45" />
      </span>
      <span className="leading-none">
        <span className="block font-display text-[15px] font-bold tracking-tight">
          CyberSec<span className="text-cyber-300"> Academy</span>
        </span>
        {!compact && (
          <span className="mt-0.5 block font-mono text-[9.5px] uppercase tracking-[0.18em] muted">
            Security+ SY0-701
          </span>
        )}
      </span>
    </Link>
  )
}

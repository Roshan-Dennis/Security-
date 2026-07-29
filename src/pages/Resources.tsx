import { useMemo } from 'react'
import { Download, ExternalLink, FileText } from 'lucide-react'
import { Section } from '../components/UI'
import { TOPICS, DOMAINS, GLOSSARY, CHEATSHEETS } from '../data'

const AUTHORITIES = [
  { name: 'NIST Computer Security Resource Center', url: 'https://csrc.nist.gov/', note: 'Special Publications, FIPS standards and the Cybersecurity Framework — the backbone of most Security+ content.', tag: 'NIST' },
  { name: 'MITRE ATT&CK', url: 'https://attack.mitre.org/', note: 'The adversary behaviour knowledge base used for detection engineering and threat intelligence.', tag: 'MITRE' },
  { name: 'MITRE D3FEND', url: 'https://d3fend.mitre.org/', note: 'Defensive countermeasures mapped against offensive techniques.', tag: 'MITRE' },
  { name: 'OWASP', url: 'https://owasp.org/', note: 'Top 10, Cheat Sheet Series, ASVS and testing guides for application security.', tag: 'OWASP' },
  { name: 'CISA', url: 'https://www.cisa.gov/', note: 'Advisories, the Known Exploited Vulnerabilities catalogue, StopRansomware and free assessment services.', tag: 'CISA' },
  { name: 'NIST National Vulnerability Database', url: 'https://nvd.nist.gov/', note: 'Authoritative CVE data with CVSS scoring and product mapping.', tag: 'NIST' },
  { name: 'Microsoft Security documentation', url: 'https://learn.microsoft.com/security/', note: 'Entra ID, Defender, zero trust guidance and Windows hardening references.', tag: 'Microsoft' },
  { name: 'AWS Security documentation', url: 'https://docs.aws.amazon.com/security/', note: 'Shared responsibility model, IAM, KMS and the Well-Architected security pillar.', tag: 'AWS' },
  { name: 'Google Cloud security', url: 'https://cloud.google.com/security', note: 'BeyondCorp zero trust research and cloud security architecture guidance.', tag: 'Google' },
  { name: 'CIS Benchmarks & Controls', url: 'https://www.cisecurity.org/', note: 'Consensus hardening baselines and a prioritised control implementation order.', tag: 'CIS' },
  { name: 'SANS Reading Room', url: 'https://www.sans.org/white-papers/', note: 'Practitioner white papers across incident response, forensics and detection.', tag: 'SANS' },
  { name: 'IETF RFC Editor', url: 'https://www.rfc-editor.org/', note: 'The primary specifications for TLS, DNS, RADIUS, OAuth, DMARC and more.', tag: 'IETF' },
  { name: 'CompTIA Security+ exam objectives', url: 'https://www.comptia.org/certifications/security', note: 'The official SY0-701 objectives document — always check against the current version.', tag: 'CompTIA' },
]

export default function Resources() {
  const studyPlan = useMemo(() => buildStudyPlan(), [])

  const download = (filename: string, content: string, type = 'text/markdown') => {
    const blob = new Blob([content], { type })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
      <Section
        eyebrow="Take it with you"
        title="Downloads & primary sources"
        intro="Export the curriculum as a study plan you can print or drop into your notes app, and jump straight to the authoritative sources this platform is built on."
      >
        <div className="grid gap-4 sm:grid-cols-3">
          <button onClick={() => download('security-plus-study-plan.md', studyPlan)} className="card card-hover p-5 text-left">
            <Download className="h-5 w-5 text-cyber-300" />
            <h3 className="mt-3 font-display text-[15px] font-semibold">Full study plan</h3>
            <p className="mt-1.5 text-[12.5px] leading-relaxed muted">
              All {TOPICS.length} topics grouped by domain with objectives, timings and key terms. Markdown.
            </p>
          </button>

          <button onClick={() => download('security-plus-glossary.md', buildGlossary())} className="card card-hover p-5 text-left">
            <FileText className="h-5 w-5 text-neon-green" />
            <h3 className="mt-3 font-display text-[15px] font-semibold">Glossary export</h3>
            <p className="mt-1.5 text-[12.5px] leading-relaxed muted">
              {GLOSSARY.length} terms and acronyms with one-line definitions. Markdown.
            </p>
          </button>

          <button onClick={() => download('security-plus-cheat-sheets.md', buildCheats())} className="card card-hover p-5 text-left">
            <FileText className="h-5 w-5 text-neon-violet" />
            <h3 className="mt-3 font-display text-[15px] font-semibold">Cheat sheet bundle</h3>
            <p className="mt-1.5 text-[12.5px] leading-relaxed muted">
              Ports, cryptography, risk formulas, controls matrix, attack cues and the IR runbook.
            </p>
          </button>
        </div>

        <h3 className="mt-12 font-display text-lg font-semibold">Authoritative sources</h3>
        <p className="mt-1.5 text-[13.5px] muted">
          Every research link on this platform points at one of these. Bookmark them — practitioners cite primary sources,
          not blog summaries.
        </p>

        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {AUTHORITIES.map((a) => (
            <a
              key={a.url}
              href={a.url}
              target="_blank"
              rel="noreferrer noopener"
              className="card card-hover group flex gap-4 p-5"
            >
              <span className="shrink-0 self-start rounded-md bg-cyber-400/12 px-2 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-cyber-300">
                {a.tag}
              </span>
              <span className="min-w-0">
                <span className="flex items-center gap-1.5 font-display text-[14.5px] font-semibold">
                  {a.name}
                  <ExternalLink className="h-3 w-3 muted transition group-hover:text-cyber-200" />
                </span>
                <span className="mt-1.5 block text-[12.5px] leading-relaxed muted">{a.note}</span>
              </span>
            </a>
          ))}
        </div>
      </Section>
    </div>
  )
}

function buildStudyPlan() {
  const lines: string[] = [
    '# CompTIA Security+ SY0-701 — Study Plan',
    '',
    '_Generated by CyberSec Academy — created by Roshan Dennis._',
    '',
    `Total topics: ${TOPICS.length} · estimated reading time: ${TOPICS.reduce((n, t) => n + t.minutes, 0)} minutes · practice questions: ${TOPICS.reduce((n, t) => n + t.quiz.length, 0)}`,
    '',
  ]
  DOMAINS.forEach((d) => {
    lines.push(`## Domain ${d.id}: ${d.title} (${d.weight})`, '', d.blurb, '')
    TOPICS.filter((t) => t.domain === d.id).forEach((t, i) => {
      lines.push(
        `### ${d.id}.${i + 1} ${t.title}`,
        '',
        `- **Objective:** ${t.objective}`,
        `- **Level:** ${t.difficulty} · ${t.minutes} min · ${t.quiz.length} questions`,
        `- **Summary:** ${t.tagline}`,
        `- **Key terms:** ${t.keywords.join(', ')}`,
        t.examTip ? `- **Exam tip:** ${t.examTip}` : '',
        '',
      )
    })
  })
  return lines.filter((l) => l !== undefined).join('\n')
}

function buildGlossary() {
  const lines = ['# Security+ Glossary', '', '_CyberSec Academy — created by Roshan Dennis._', '']
  GLOSSARY.slice()
    .sort((a, b) => a.term.localeCompare(b.term))
    .forEach((g) => {
      lines.push(`**${g.term}**${g.acronym ? ` (${g.acronym})` : ''} — ${g.definition} _(Domain ${g.domain})_`, '')
    })
  return lines.join('\n')
}

function buildCheats() {
  const lines = ['# Security+ Cheat Sheets', '', '_CyberSec Academy — created by Roshan Dennis._', '']
  CHEATSHEETS.forEach((c) => {
    lines.push(`## ${c.title}`, '', c.blurb, '')
    c.sections.forEach((s) => {
      lines.push(`### ${s.heading}`, '', '| | |', '| --- | --- |')
      s.rows.forEach(([k, v]) => lines.push(`| ${k} | ${v} |`))
      lines.push('')
    })
  })
  return lines.join('\n')
}

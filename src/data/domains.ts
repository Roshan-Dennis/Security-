import type { Domain } from '../types'

export const DOMAINS: Domain[] = [
  {
    id: 1,
    slug: 'general-security-concepts',
    title: 'General Security Concepts',
    short: 'Concepts',
    weight: '12%',
    blurb:
      'The vocabulary and mental models everything else is built on: the CIA triad, AAA, control categories, cryptography, PKI, zero trust and change management.',
    accent: '#4fdcff',
    icon: 'ShieldCheck',
  },
  {
    id: 2,
    slug: 'threats-vulnerabilities-mitigations',
    title: 'Threats, Vulnerabilities & Mitigations',
    short: 'Threats',
    weight: '22%',
    blurb:
      'Who attacks you, how they get in, and what you do about it — threat actors, malware, social engineering, application attacks, CVE/CVSS and MITRE ATT&CK.',
    accent: '#ff5b6e',
    icon: 'Bug',
  },
  {
    id: 3,
    slug: 'security-architecture',
    title: 'Security Architecture',
    short: 'Architecture',
    weight: '18%',
    blurb:
      'Designing systems that are hard to break: network segmentation, cloud and container security, ICS/OT, data protection, resilience and zero trust architecture.',
    accent: '#a78bfa',
    icon: 'Network',
  },
  {
    id: 4,
    slug: 'security-operations',
    title: 'Security Operations',
    short: 'Operations',
    weight: '28%',
    blurb:
      'The day job of a defender: SOC monitoring, SIEM and log analysis, EDR/XDR, IDS/IPS, hardening, vulnerability management, incident response and forensics.',
    accent: '#3ddc97',
    icon: 'Radar',
  },
  {
    id: 5,
    slug: 'security-program-management',
    title: 'Security Program Management & Oversight',
    short: 'Governance',
    weight: '20%',
    blurb:
      'Running security as a business function: risk management, governance, policy, third-party risk, compliance, audits, awareness training and continuity planning.',
    accent: '#ffb547',
    icon: 'ScrollText',
  },
]

export const domainBySlug = (slug: string) => DOMAINS.find((d) => d.slug === slug)
export const domainById = (id: number) => DOMAINS.find((d) => d.id === id)!

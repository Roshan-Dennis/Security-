import type { Topic } from '../../types'

export const DOMAIN4: Topic[] = [
  {
    slug: 'incident-response',
    title: 'Incident Response',
    domain: 4,
    objective: '4.8 Explain appropriate incident response activities',
    tagline: 'Preparation, detection, containment, eradication, recovery, lessons learned.',
    difficulty: 'Intermediate',
    minutes: 13,
    keywords: ['incident response', 'nist 800-61', 'containment', 'eradication', 'recovery', 'lessons learned', 'playbook', 'tabletop', 'csirt'],
    simple: {
      what:
        "Incident response is the structured process for handling a security event from first detection to final lessons learned. NIST SP 800-61 describes four phases: preparation; detection and analysis; containment, eradication and recovery; and post-incident activity. Many organisations teach it as six steps by splitting the middle phase.",
      why:
        "Under pressure, people improvise badly. A rehearsed process ensures evidence is preserved, the right people are informed, containment does not destroy the information you need, and the same incident does not recur next quarter.",
      how: [
        "Preparation is the phase that actually determines the outcome: playbooks, tooling, logging, contact lists, retainers and training.",
        "Detection and analysis: validate the alert, determine scope, classify severity, and start a timeline immediately.",
        "Containment can be short-term (isolate the host now) or long-term (rebuild into a clean segment). Isolate rather than power off, so volatile memory survives.",
        "Eradication removes the root cause — the vulnerability, the persistence, the compromised credential. Recovery restores service and monitors closely for recurrence.",
        "Post-incident review is blameless and produces owned, dated actions. An incident with no follow-through is an incident you will have again.",
      ],
      where: [
        "Regulated breaches carry statutory notification deadlines — GDPR requires notifying the supervisory authority within 72 hours of becoming aware.",
        "Cyber insurance policies typically require prompt notification and use of approved responders.",
        "Tabletop exercises validate the plan; simulations validate the team.",
      ],
    },
    diagram: {
      title: 'The incident response lifecycle',
      caption:
        'It is a loop, not a line. Everything learned at the end feeds directly back into preparation.',
      columns: [
        [{ id: 'prep', label: 'Preparation', sub: 'plans, tools, logging, training', tone: 'violet', icon: 'ClipboardList' }],
        [{ id: 'det', label: 'Detection & Analysis', sub: 'validate, scope, classify', tone: 'primary', icon: 'Search' }],
        [{ id: 'cont', label: 'Containment', sub: 'isolate, preserve evidence', tone: 'warn', icon: 'ShieldAlert' }],
        [{ id: 'erad', label: 'Eradication', sub: 'remove root cause and persistence', tone: 'danger', icon: 'Trash2' }],
        [{ id: 'rec', label: 'Recovery', sub: 'restore, verify, monitor', tone: 'safe', icon: 'RefreshCw' }],
        [{ id: 'lesson', label: 'Lessons Learned', sub: 'blameless review, owned actions', tone: 'violet', icon: 'BookOpen' }],
      ],
      edges: [
        { from: 'prep', to: 'det', tone: 'primary', animated: true },
        { from: 'det', to: 'cont', tone: 'warn', animated: true },
        { from: 'cont', to: 'erad', tone: 'danger', animated: true },
        { from: 'erad', to: 'rec', tone: 'safe', animated: true },
        { from: 'rec', to: 'lesson', tone: 'violet', animated: true },
        { from: 'lesson', to: 'prep', label: 'feeds back', tone: 'violet', animated: true },
      ],
      legend: [
        { tone: 'warn', label: 'Limit the damage' },
        { tone: 'safe', label: 'Restore service' },
      ],
    },
    visual: 'radar',
    realWorld: {
      title: 'The containment decision that destroyed the evidence',
      body:
        "An analyst spots a suspicious process on a server and immediately powers the machine off. It feels decisive. It also destroys the running processes, network connections, injected code and encryption keys held only in memory — the exact artefacts needed to understand what happened and whether other systems are affected. The correct move is network isolation: cut connectivity while leaving the machine running, capture volatile memory, then take a disk image. Sequence matters, and it comes from the order of volatility: registers and cache first, then memory, then network state, then disk, then backups. This is why playbooks exist — so that decision is made calmly in advance, not at 2 a.m.",
      takeaway: 'Isolate, do not power off. Capture volatile evidence before it disappears.',
    },
    attack: {
      title: 'Premature eradication and the attacker who came straight back',
      intro:
        'Cleaning up too early — before you understand full scope — is one of the most common and most costly response mistakes.',
      steps: [
        { label: 'Partial detection', detail: 'One compromised host is found and rebuilt. The team declares the incident closed.' },
        { label: 'Unscoped persistence', detail: 'The attacker still holds three other footholds, a rogue service account and a scheduled task on a server nobody examined.' },
        { label: 'Tipped off', detail: 'The visible cleanup tells the attacker they have been noticed, so they change tooling and go quieter.' },
        { label: 'Return', detail: 'Within days they resume operations from the untouched footholds, now harder to detect.' },
        { label: 'Escalation', detail: 'Aware that time is limited, they accelerate to data theft and encryption.' },
      ],
      mitigations: [
        'Scope fully before eradicating; hunt for additional footholds across the estate first.',
        'Plan a coordinated, simultaneous eradication rather than a piecemeal one.',
        'Reset credentials comprehensively, including service accounts, tokens and OAuth grants.',
        'Retain heightened monitoring for weeks after recovery, watching for the attacker returning.',
      ],
    },
    tools: [
      { name: 'TheHive + Cortex', what: 'Open source incident case management and observable analysis.', why: 'Structures investigations and preserves the timeline.', url: 'https://strangebee.com/', category: 'Case management' },
      { name: 'Velociraptor', what: 'Endpoint visibility and digital forensics at scale.', why: 'Hunt for indicators and collect artefacts across thousands of hosts.', url: 'https://docs.velociraptor.app/', category: 'DFIR' },
      { name: 'KAPE', what: 'Targeted forensic artefact collection.', why: 'Rapid triage collection without imaging entire disks.', url: 'https://www.kroll.com/kape', category: 'DFIR' },
      { name: 'CISA Incident Response Playbooks', what: 'Standardised federal response procedures.', why: 'A free, credible template to adapt for your own organisation.', url: 'https://www.cisa.gov/resources-tools/resources/federal-government-cybersecurity-incident-and-vulnerability-response-playbooks', category: 'Process' },
    ],
    links: [
      { label: 'NIST SP 800-61 Rev.2 — Computer Security Incident Handling Guide', url: 'https://csrc.nist.gov/pubs/sp/800/61/r2/final', source: 'NIST' },
      { label: 'SANS Incident Handlers Handbook', url: 'https://www.sans.org/white-papers/33901/', source: 'SANS' },
      { label: 'CISA — Incident Response Resources', url: 'https://www.cisa.gov/topics/cybersecurity-best-practices', source: 'CISA' },
    ],
    quiz: [
      {
        q: 'A server is suspected of being compromised. What is the recommended immediate containment action?',
        options: [
          'Power the server off immediately',
          'Isolate it from the network while leaving it running, then capture volatile memory',
          'Reinstall the operating system',
          'Delete the suspicious files',
        ],
        answer: 1,
        explain:
          'Powering off destroys memory-resident evidence including running processes, network connections and encryption keys. Network isolation stops the damage while preserving that evidence.',
      },
      {
        q: 'Which incident response phase has the greatest influence on how well an organisation handles an incident?',
        options: ['Detection', 'Preparation', 'Eradication', 'Recovery'],
        answer: 1,
        explain:
          'Preparation determines whether the logs exist, the playbooks exist, the contacts are current and the team has practised. Everything else depends on it.',
      },
      {
        q: 'What is the purpose of a blameless post-incident review?',
        options: [
          'To identify who to discipline',
          'To surface honest information about what happened and produce systemic improvements',
          'To satisfy the insurance company only',
          'To close the ticket faster',
        ],
        answer: 1,
        explain:
          'Blame suppresses information. A blameless review gets the truth, which is the only basis for fixing the process and system weaknesses that allowed the incident.',
      },
    ],
    examTip:
      'Memorise the NIST phases in order and the artefacts of each: preparation, detection and analysis, containment/eradication/recovery, post-incident activity. Also know tabletop exercise (discussion), simulation (executed), and the order of volatility for evidence collection.',
  },
  {
    slug: 'siem-log-analysis',
    title: 'SIEM & Log Analysis',
    domain: 4,
    objective: '4.9 Use data sources to support an investigation',
    tagline: 'Collect, normalise, correlate, alert — and the discipline of not drowning in noise.',
    difficulty: 'Intermediate',
    minutes: 12,
    keywords: ['siem', 'log', 'correlation', 'normalisation', 'aggregation', 'syslog', 'ntp', 'retention', 'alert fatigue', 'detection rule'],
    simple: {
      what:
        "A security information and event management platform collects logs from across the estate, normalises them into a common schema, correlates events across sources, and raises alerts when patterns match detection rules. It is also the search engine investigators use to reconstruct what happened.",
      why:
        "Individually, a failed login, a new service and an outbound connection are unremarkable. Correlated across sources within a short window, they describe an intrusion. No human can do that across millions of daily events without tooling.",
      how: [
        "Sources: endpoints, servers, firewalls, proxies, identity providers, cloud audit logs, applications and DNS.",
        "Accurate time synchronisation via NTP is essential — without it, correlation and timelines are meaningless.",
        "Normalisation maps different vendor formats to common fields so one rule works across sources.",
        "Detection engineering writes and tunes rules; Sigma provides a vendor-neutral rule format.",
        "Retention is a trade-off between cost and investigative reach. Intrusions are frequently discovered months after they began.",
      ],
      where: [
        "The SIEM is the analytical core of every SOC, feeding triage, hunting and reporting.",
        "Compliance frameworks mandate log collection, protection and minimum retention periods.",
        "Cloud-native alternatives ingest platform audit logs directly at large scale.",
      ],
    },
    diagram: {
      title: 'SIEM pipeline from raw log to actioned alert',
      caption:
        'Most of the value — and most of the work — lives in normalisation, correlation and tuning, not in collection.',
      columns: [
        [
          { id: 'ep', label: 'Endpoints', sub: 'EDR, Sysmon', tone: 'neutral', icon: 'Laptop' },
          { id: 'net', label: 'Network', sub: 'firewall, proxy, DNS', tone: 'neutral', icon: 'Network' },
          { id: 'idp', label: 'Identity', sub: 'sign-in and audit logs', tone: 'neutral', icon: 'Fingerprint' },
          { id: 'cloud', label: 'Cloud', sub: 'API audit trails', tone: 'neutral', icon: 'Cloud' },
        ],
        [{ id: 'collect', label: 'Collection', sub: 'agents, syslog, API', tone: 'primary', icon: 'Download' }],
        [{ id: 'norm', label: 'Normalise & Enrich', sub: 'common schema, asset and threat context', tone: 'violet', icon: 'Shuffle' }],
        [{ id: 'corr', label: 'Correlation Rules', sub: 'multi-source detection logic', tone: 'warn', icon: 'GitMerge' }],
        [
          { id: 'alert', label: 'Alert', sub: 'triaged by analysts', tone: 'danger', icon: 'Bell' },
          { id: 'hunt', label: 'Hunting & Investigation', sub: 'search across history', tone: 'safe', icon: 'Search' },
        ],
      ],
      edges: [
        { from: 'ep', to: 'collect', tone: 'neutral', animated: true },
        { from: 'net', to: 'collect', tone: 'neutral' },
        { from: 'idp', to: 'collect', tone: 'neutral', animated: true },
        { from: 'cloud', to: 'collect', tone: 'neutral' },
        { from: 'collect', to: 'norm', tone: 'primary', animated: true },
        { from: 'norm', to: 'corr', tone: 'violet', animated: true },
        { from: 'corr', to: 'alert', tone: 'danger', animated: true },
        { from: 'norm', to: 'hunt', label: 'searchable history', tone: 'safe' },
      ],
      legend: [
        { tone: 'danger', label: 'Automated detection' },
        { tone: 'safe', label: 'Human-led analysis' },
      ],
    },
    realWorld: {
      title: 'Alert fatigue is a security vulnerability',
      body:
        "A SOC receiving thousands of alerts a day, most of them false positives, will eventually miss the real one — not through incompetence but through arithmetic. Analysts learn which alerts are usually noise and start closing them at a glance. The fix is unglamorous: ruthlessly tune or remove rules with poor precision, enrich alerts with asset criticality and user context so priority is obvious, automate the repetitive triage steps, and measure precision per rule as a first-class metric. A SOC with two hundred high-quality alerts a day is dramatically more effective than one with five thousand.",
      takeaway: 'Fewer, better alerts beat more alerts. Tuning is detection engineering, not laziness.',
    },
    attack: {
      title: 'Anti-forensics — attacking the logs themselves',
      intro:
        'Sophisticated intruders treat your logging as a target, because removing the record removes the investigation.',
      steps: [
        { label: 'Identify logging', detail: 'The attacker enumerates agents, forwarders and SIEM connectivity on compromised hosts.' },
        { label: 'Local clearing', detail: 'Windows event logs are cleared or specific entries removed to hide the intrusion.' },
        { label: 'Disable collection', detail: 'Forwarding agents are stopped or their configuration is altered to drop the relevant sources.' },
        { label: 'Timestomp', detail: 'File timestamps are altered so malicious artefacts blend into the original system build date.' },
        { label: 'Cloud blind spot', detail: 'Audit logging is disabled in a rarely used region where nobody is watching.' },
      ],
      mitigations: [
        'Forward logs off-host in real time so local clearing cannot erase the copy.',
        'Alert specifically on log clearing (Windows event 1102) and agent service stops — these are high-fidelity signals.',
        'Write logs to append-only or immutable storage in a separate security account.',
        'Monitor for logging configuration changes across all regions and subscriptions.',
      ],
    },
    tools: [
      { name: 'Elastic Security / OpenSearch', what: 'Open source search and SIEM stack.', why: 'Build a full ingestion, detection and dashboarding lab for free.', url: 'https://www.elastic.co/security', category: 'SIEM' },
      { name: 'Splunk', what: 'Market-leading commercial SIEM and analytics platform.', why: 'Free tier available for learning search language and correlation.', url: 'https://www.splunk.com/', category: 'SIEM' },
      { name: 'Wazuh', what: 'Open source XDR and SIEM with agent-based collection.', why: 'Excellent home lab platform combining host monitoring and log analysis.', url: 'https://wazuh.com/', category: 'SIEM' },
      { name: 'Sysmon', what: 'Deep Windows event logging from Sysinternals.', why: 'Transforms Windows telemetry quality; process creation and network events with full command lines.', url: 'https://learn.microsoft.com/sysinternals/downloads/sysmon', category: 'Telemetry' },
    ],
    links: [
      { label: 'NIST SP 800-92 — Guide to Computer Security Log Management', url: 'https://csrc.nist.gov/pubs/sp/800/92/final', source: 'NIST' },
      { label: 'Sigma detection rules', url: 'https://github.com/SigmaHQ/sigma', source: 'SigmaHQ' },
      { label: 'MITRE ATT&CK — Indicator Removal (T1070)', url: 'https://attack.mitre.org/techniques/T1070/', source: 'MITRE' },
    ],
    quiz: [
      {
        q: 'Why is accurate time synchronisation critical for a SIEM?',
        options: [
          'It reduces storage requirements',
          'Without consistent timestamps, events from different sources cannot be reliably correlated or sequenced',
          'It encrypts the logs',
          'It improves compression ratios',
        ],
        answer: 1,
        explain: 'Correlation and timeline reconstruction depend entirely on comparable timestamps. NTP is a prerequisite for meaningful analysis.',
      },
      {
        q: 'A Windows security log shows event ID 1102 (audit log cleared) on a server at 03:00. How should this be treated?',
        options: [
          'Routine maintenance',
          'A high-fidelity indicator of possible anti-forensic activity requiring investigation',
          'A disk space warning',
          'A failed backup',
        ],
        answer: 1,
        explain: 'Legitimate administrators rarely clear security logs. It is a well-known anti-forensic technique and should always be investigated.',
      },
      {
        q: 'What is the main risk of an untuned SIEM producing thousands of low-quality alerts daily?',
        options: [
          'Increased licensing cost only',
          'Alert fatigue causing genuine incidents to be missed',
          'Slower network performance',
          'Loss of encryption',
        ],
        answer: 1,
        explain: 'Human attention is finite. Poor alert precision statistically guarantees that real detections will eventually be dismissed.',
      },
    ],
    examTip:
      'Expect log-source questions: which log answers which question. Firewall logs for connections, endpoint logs for process activity, identity logs for authentication, DNS logs for resolution and tunnelling, and packet captures for full content.',
  },
  {
    slug: 'soc-monitoring',
    title: 'SOC Operations & Continuous Monitoring',
    domain: 4,
    objective: '4.4 Explain security alerting and monitoring concepts and tools',
    tagline: 'People, process and technology arranged around one question: is something wrong right now?',
    difficulty: 'Intermediate',
    minutes: 11,
    keywords: ['soc', 'monitoring', 'triage', 'tier 1', 'threat hunting', 'mttd', 'mttr', 'escalation', 'runbook', 'metrics'],
    simple: {
      what:
        "A security operations centre is the function responsible for continuous monitoring, detection, triage and response. It is usually structured in tiers: tier 1 triages alerts, tier 2 investigates deeply, tier 3 hunts proactively and engineers detections, with an incident manager coordinating major events.",
      why:
        "Detection tooling produces signals; a SOC produces decisions. Without the human process, alerts accumulate unread and dwell time grows.",
      how: [
        "Triage: is it real, how bad is it, who or what is affected, and does it need to escalate now?",
        "Runbooks define consistent steps per alert type so quality does not depend on which analyst is on shift.",
        "Threat hunting is hypothesis-driven searching for activity that no rule has caught yet.",
        "Key metrics: mean time to detect, mean time to respond, alert precision, coverage against ATT&CK, and percentage of incidents found internally rather than reported by third parties.",
      ],
      where: [
        "In-house SOC, managed security service provider, or a hybrid where a provider covers out-of-hours.",
        "Follow-the-sun models across regions provide 24/7 cover without permanent night shifts.",
        "Purple teaming continuously validates that detections work.",
      ],
    },
    diagram: {
      title: 'SOC alert flow and escalation path',
      caption:
        'Every arrow that automation can absorb frees human attention for the decisions only humans can make.',
      columns: [
        [{ id: 'sig', label: 'Telemetry & Alerts', sub: 'SIEM, EDR, NDR, cloud', tone: 'neutral', icon: 'Antenna' }],
        [{ id: 't1', label: 'Tier 1 Triage', sub: 'validate, enrich, classify', tone: 'primary', icon: 'UserCheck' }],
        [
          { id: 'fp', label: 'False Positive', sub: 'close and tune the rule', tone: 'safe', icon: 'CircleCheck' },
          { id: 't2', label: 'Tier 2 Investigation', sub: 'scope, timeline, impact', tone: 'warn', icon: 'Search' },
        ],
        [
          { id: 'ir', label: 'Incident Response', sub: 'contain, eradicate, recover', tone: 'danger', icon: 'ShieldAlert' },
          { id: 't3', label: 'Tier 3 Hunt & Engineering', sub: 'new detections, purple team', tone: 'violet', icon: 'BrainCircuit' },
        ],
        [{ id: 'improve', label: 'Continuous Improvement', sub: 'metrics, tuning, coverage', tone: 'safe', icon: 'TrendingUp' }],
      ],
      edges: [
        { from: 'sig', to: 't1', tone: 'neutral', animated: true },
        { from: 't1', to: 'fp', label: 'not malicious', tone: 'safe' },
        { from: 't1', to: 't2', label: 'suspicious', tone: 'warn', animated: true },
        { from: 't2', to: 'ir', label: 'confirmed', tone: 'danger', animated: true },
        { from: 't2', to: 't3', label: 'novel technique', tone: 'violet' },
        { from: 'fp', to: 'improve', tone: 'safe' },
        { from: 't3', to: 'improve', tone: 'safe', animated: true },
      ],
      legend: [
        { tone: 'danger', label: 'Confirmed incident' },
        { tone: 'safe', label: 'Feedback loop' },
      ],
    },
    realWorld: {
      title: 'The alert that was seen and dismissed',
      body:
        "In several of the largest breaches on record, the detection technology worked. An alert fired, days or weeks before the damage was done. It was triaged, judged low priority, and closed — because it lacked context. The analyst could not see that the affected host held payment processing software, that the account involved had been created three days earlier, or that a similar alert had fired on a neighbouring system. Detection is necessary but not sufficient; the alert must arrive with enough context for a correct decision in the ninety seconds an analyst will realistically give it. Asset criticality, identity context and prior related alerts are not nice-to-haves — they are the difference between seeing and understanding.",
      takeaway: 'Enrich alerts with business context. An alert without context is a coin flip.',
    },
    attack: {
      title: 'Operating in the SOC blind spots',
      intro:
        'Adversaries research defensive operations as carefully as defenders research adversaries.',
      steps: [
        { label: 'Timing', detail: 'Major actions are scheduled for weekends, public holidays and shift changes.' },
        { label: 'Volume management', detail: 'Activity is kept below alerting thresholds — slow scanning, small transfers, few authentications.' },
        { label: 'Trusted tooling', detail: 'Remote management software already deployed in the environment is used, so it appears on an allow-list.' },
        { label: 'Trusted destinations', detail: 'Exfiltration goes to a major cloud provider that the organisation cannot afford to block.' },
        { label: 'Noise generation', detail: 'A minor, noisy event is triggered elsewhere to occupy the analysts on shift.' },
      ],
      mitigations: [
        'Ensure genuine coverage outside business hours, whether in-house or through a managed provider.',
        'Baseline normal behaviour per user and per asset so low-and-slow deviations still stand out.',
        'Inventory and monitor remote management tooling; alert on any instance not on the approved list.',
        'Hunt proactively rather than relying solely on rules firing.',
      ],
    },
    tools: [
      { name: 'Wazuh / Security Onion', what: 'Free full-stack monitoring platforms.', why: 'The best way to build a realistic SOC lab at home.', url: 'https://securityonionsolutions.com/', category: 'Platform' },
      { name: 'TheHive', what: 'Collaborative incident and alert management.', why: 'Gives structure to triage and case handling.', url: 'https://strangebee.com/', category: 'Case management' },
      { name: 'MITRE ATT&CK Navigator', what: 'Detection coverage visualisation.', why: 'Turns coverage gaps into a prioritised engineering backlog.', url: 'https://mitre-attack.github.io/attack-navigator/', category: 'Coverage' },
      { name: 'Grafana', what: 'Dashboarding and metrics visualisation.', why: 'Track MTTD, MTTR and alert precision over time.', url: 'https://grafana.com/', category: 'Metrics' },
    ],
    links: [
      { label: 'NIST SP 800-137 — Information Security Continuous Monitoring', url: 'https://csrc.nist.gov/pubs/sp/800/137/final', source: 'NIST' },
      { label: 'MITRE — 11 Strategies of a World-Class SOC', url: 'https://www.mitre.org/news-insights/publication/11-strategies-world-class-cybersecurity-operations-center', source: 'MITRE' },
      { label: 'SANS SOC Survey', url: 'https://www.sans.org/', source: 'SANS' },
    ],
    quiz: [
      {
        q: 'Which metric measures how long it takes an organisation to discover that an incident has occurred?',
        options: ['MTTR', 'MTTD', 'MTBF', 'RPO'],
        answer: 1,
        explain: 'Mean time to detect measures detection speed. MTTR measures response or repair time; MTBF measures reliability; RPO is acceptable data loss.',
      },
      {
        q: 'What best describes threat hunting?',
        options: [
          'Responding to alerts as they arrive',
          'Proactive, hypothesis-driven searching for malicious activity that existing detections have not caught',
          'Running vulnerability scans',
          'Reviewing firewall change requests',
        ],
        answer: 1,
        explain: 'Hunting assumes compromise and searches for evidence, which also generates new detection rules when something is found.',
      },
      {
        q: 'A SOC finds that 95 percent of its alerts are false positives. What is the most appropriate response?',
        options: [
          'Hire more tier 1 analysts',
          'Tune or retire low-precision rules and enrich alerts with asset and identity context',
          'Disable the SIEM',
          'Increase log retention',
        ],
        answer: 1,
        explain: 'Adding analysts scales the noise. Improving alert precision and context addresses the root cause.',
      },
    ],
    examTip:
      'Know the monitoring vocabulary: log aggregation, alerting, scanning, reporting, archiving, and alert tuning. Understand the difference between SIEM (analysis), SOAR (automated response) and EDR/XDR (endpoint telemetry and containment).',
  },
{
    slug: 'firewalls',
    title: 'Firewalls & Network Filtering',
    domain: 4,
    objective: '4.5 Modify enterprise capabilities to enhance security',
    tagline: 'From packet filters to next-generation inspection — the rulebook that decides what crosses.',
    difficulty: 'Beginner',
    minutes: 11,
    keywords: ['firewall', 'stateful', 'stateless', 'ngfw', 'waf', 'acl', 'proxy', 'implicit deny', 'rule order', 'nat'],
    simple: {
      what:
        "A firewall enforces a policy about which traffic may pass between networks. A stateless packet filter examines each packet in isolation against an access control list. A stateful firewall tracks connections so replies to permitted outbound traffic are automatically allowed. A next-generation firewall adds application awareness, user identity and intrusion prevention. A web application firewall inspects HTTP specifically, protecting against injection and similar attacks.",
      why:
        "The firewall is where the abstract idea of a trust boundary becomes a concrete, enforceable rule. It is also where most organisations accumulate years of undocumented exceptions.",
      how: [
        "Rules are evaluated top to bottom and the first match wins, so rule order is functionally part of the policy.",
        "The final rule should always be implicit deny — anything not explicitly permitted is dropped.",
        "Rules should be specific in source, destination, port and protocol; any-to-any rules are the classic audit finding.",
        "Egress filtering is as important as ingress. Most command and control traffic leaves through unrestricted outbound access.",
        "A WAF operates at layer 7 and understands HTTP; a traditional firewall does not and cannot block SQL injection.",
      ],
      where: [
        "Perimeter, internal zone boundaries, host-based firewalls on every endpoint, and cloud security groups.",
        "Web application firewalls in front of internet-facing applications, often at a CDN.",
        "Unified threat management appliances bundle firewall, IPS, antivirus and filtering for smaller organisations.",
      ],
    },
    diagram: {
      title: 'Firewall rule evaluation — first match wins',
      caption:
        'Rule order is policy. A permissive rule placed above a restrictive one silently disables it.',
      columns: [
        [{ id: 'pkt', label: 'Incoming Packet', sub: 'src, dst, port, protocol', tone: 'neutral', icon: 'Package' }],
        [
          { id: 'r1', label: 'Rule 1', sub: 'permit 443 to web server', tone: 'safe', icon: 'CircleCheck' },
          { id: 'r2', label: 'Rule 2', sub: 'deny 3389 from internet', tone: 'danger', icon: 'CircleX' },
          { id: 'r3', label: 'Rule 3', sub: 'permit 22 from admin subnet', tone: 'safe', icon: 'CircleCheck' },
        ],
        [{ id: 'state', label: 'State Table', sub: 'established connections allowed back', tone: 'primary', icon: 'Table' }],
        [
          { id: 'allow', label: 'Forwarded', tone: 'safe', icon: 'ArrowRight' },
          { id: 'deny', label: 'Implicit Deny', sub: 'no rule matched — dropped and logged', tone: 'danger', icon: 'ShieldX' },
        ],
      ],
      edges: [
        { from: 'pkt', to: 'r1', label: 'evaluate in order', tone: 'neutral', animated: true },
        { from: 'r1', to: 'r2', label: 'no match', tone: 'neutral' },
        { from: 'r2', to: 'r3', label: 'no match', tone: 'neutral' },
        { from: 'r1', to: 'allow', label: 'match', tone: 'safe', animated: true },
        { from: 'r2', to: 'deny', label: 'match', tone: 'danger' },
        { from: 'r3', to: 'state', tone: 'primary' },
        { from: 'state', to: 'allow', tone: 'safe' },
        { from: 'r3', to: 'deny', label: 'fall through', tone: 'danger', animated: true },
      ],
      legend: [
        { tone: 'safe', label: 'Permitted' },
        { tone: 'danger', label: 'Blocked' },
      ],
    },
    visual: 'firewall',
    realWorld: {
      title: 'Egress filtering, the control almost nobody implements',
      body:
        "Most organisations carefully restrict what enters the network and allow essentially anything to leave. Every command and control channel, every data exfiltration path and every malware download depends on that outbound freedom. Restricting egress to only what is needed — forcing web traffic through an inspecting proxy, allowing DNS only from designated resolvers, denying direct outbound connections from servers entirely — breaks a large proportion of intrusion tooling by default. It is unpopular because it requires knowing what your applications actually need, which is precisely the inventory work that also improves everything else.",
      takeaway: 'Ingress filtering stops the attack starting. Egress filtering stops it succeeding.',
    },
    attack: {
      title: 'Tunnelling out through an allowed protocol',
      intro:
        'When only a few protocols are permitted outbound, attackers simply use those.',
      steps: [
        { label: 'Survey', detail: 'The implant tests which outbound protocols and ports actually reach the internet.' },
        { label: 'Choose the gap', detail: 'DNS is almost always permitted, and often uninspected.' },
        { label: 'Encode', detail: 'Data is encoded into subdomain labels and exfiltrated through DNS queries to an attacker-controlled zone.' },
        { label: 'Blend', detail: 'Alternatively C2 is fronted through a legitimate CDN or SaaS domain the organisation cannot block.' },
        { label: 'Persist', detail: 'Because the protocol and destination are both permitted, no firewall rule is violated at any point.' },
      ],
      mitigations: [
        'Force all internal DNS through controlled resolvers and log every query.',
        'Alert on abnormal DNS volume, unusually long subdomains and high entropy in query names.',
        'Use TLS inspection where legally and technically appropriate, plus URL and category filtering.',
        'Deny direct outbound access from server networks; require an explicit proxy.',
      ],
    },
    tools: [
      { name: 'pfSense / OPNsense', what: 'Full-featured open source firewalls.', why: 'Practise rule ordering, NAT, VPN and logging on real software.', url: 'https://opnsense.org/', category: 'Firewall' },
      { name: 'iptables / nftables / ufw', what: 'Linux host-based firewalling.', why: 'Host firewalls are the last line of defence when segmentation fails.', category: 'Host firewall' },
      { name: 'ModSecurity + OWASP Core Rule Set', what: 'Open source web application firewall.', why: 'Layer 7 protection for web applications, including virtual patching.', url: 'https://coreruleset.org/', category: 'WAF' },
      { name: 'Nmap / hping3', what: 'Firewall rule verification and crafted packet testing.', why: 'Confirm the policy actually behaves as documented.', url: 'https://nmap.org/', category: 'Validation' },
    ],
    links: [
      { label: 'NIST SP 800-41 Rev.1 — Guidelines on Firewalls and Firewall Policy', url: 'https://csrc.nist.gov/pubs/sp/800/41/r1/final', source: 'NIST' },
      { label: 'OWASP — Web Application Firewall guidance', url: 'https://owasp.org/www-community/Web_Application_Firewall', source: 'OWASP' },
      { label: 'MITRE ATT&CK — Exfiltration Over Alternative Protocol (T1048)', url: 'https://attack.mitre.org/techniques/T1048/', source: 'MITRE' },
    ],
    quiz: [
      {
        q: 'What is the difference between a stateless and a stateful firewall?',
        options: [
          'Stateless firewalls are faster but cannot filter by port',
          'Stateful firewalls track connection state so return traffic for permitted sessions is automatically allowed',
          'Stateful firewalls only work at layer 7',
          'There is no functional difference',
        ],
        answer: 1,
        explain:
          'A stateful firewall maintains a connection table. A stateless filter evaluates each packet independently, requiring explicit rules for return traffic.',
      },
      {
        q: 'An application is being attacked with SQL injection. Which device is designed to inspect and block this?',
        options: ['Stateless packet filter', 'Web application firewall', 'Network switch', 'DHCP server'],
        answer: 1,
        explain: 'A WAF understands HTTP semantics and can inspect parameters and payloads. A traditional firewall only sees a permitted connection on port 443.',
      },
      {
        q: 'Why does rule order matter in a firewall policy?',
        options: [
          'Rules are evaluated randomly',
          'The first matching rule is applied, so a broad permissive rule placed early can override later restrictive rules',
          'Only the last rule is used',
          'Order affects logging only',
        ],
        answer: 1,
        explain: 'First-match-wins evaluation means a misplaced any/any rule can silently negate everything beneath it.',
      },
    ],
    examTip:
      'Know the layers: packet filter (layer 3/4), stateful (connection aware), proxy (application layer, terminates the session), NGFW (application and user aware with IPS), WAF (HTTP specific), UTM (bundled appliance). Implicit deny is always the final rule.',
  },
  {
    slug: 'ids-ips-ndr',
    title: 'IDS, IPS & Network Detection',
    domain: 4,
    objective: '4.5 Modify enterprise capabilities to enhance security',
    tagline: 'Watching the wire — signature, anomaly and behaviour based detection.',
    difficulty: 'Intermediate',
    minutes: 10,
    keywords: ['ids', 'ips', 'nids', 'hids', 'signature', 'anomaly', 'heuristic', 'false positive', 'tap', 'span', 'inline', 'ndr'],
    simple: {
      what:
        "An intrusion detection system observes traffic and alerts on suspicious activity. An intrusion prevention system sits inline and can block it. Both can be network-based (monitoring a segment) or host-based (monitoring a single system). Detection methods include signature matching, anomaly detection against a baseline, and heuristic or behavioural analysis.",
      why:
        "Firewalls decide whether a connection is allowed. IDS and IPS look at what is inside the allowed connection. That is where exploitation attempts, malware traffic and command and control live.",
      how: [
        "Signature-based detection is precise for known threats and blind to novel ones. Anomaly-based detection can find the unknown but produces more false positives.",
        "Deployment: IDS out of band using a TAP or SPAN port sees everything and blocks nothing. IPS inline can block but becomes a potential point of failure and latency.",
        "Tuning matters enormously — a false positive on an IPS is an outage, not just noise.",
        "Encryption limits payload visibility, so modern network detection leans on metadata, certificate details and behavioural patterns.",
      ],
      where: [
        "At internet boundaries, between internal zones, and increasingly inside cloud virtual networks.",
        "Host-based systems monitor file integrity, local logs and process behaviour on critical servers.",
        "Network detection and response platforms add analytics and retrospective search over network metadata.",
      ],
    },
    diagram: {
      title: 'IDS out-of-band versus IPS inline',
      caption:
        'The IDS cannot break your network. The IPS can, which is exactly why it can also stop the attack.',
      columns: [
        [{ id: 'traffic', label: 'Network Traffic', tone: 'neutral', icon: 'Network' }],
        [
          { id: 'tap', label: 'TAP / SPAN Port', sub: 'copy of traffic', tone: 'primary', icon: 'Copy' },
          { id: 'inline', label: 'Inline Path', sub: 'traffic passes through', tone: 'warn', icon: 'ArrowRightLeft' },
        ],
        [
          { id: 'ids', label: 'IDS', sub: 'detect and alert only', tone: 'primary', icon: 'Eye' },
          { id: 'ips', label: 'IPS', sub: 'detect and block', tone: 'danger', icon: 'ShieldX' },
        ],
        [
          { id: 'alert', label: 'Alert to SIEM', sub: 'analyst investigates', tone: 'safe', icon: 'Bell' },
          { id: 'drop', label: 'Packet Dropped', sub: 'attack stopped in real time', tone: 'safe', icon: 'Ban' },
          { id: 'risk', label: 'False Positive Risk', sub: 'legitimate traffic blocked', tone: 'danger', icon: 'TriangleAlert' },
        ],
      ],
      edges: [
        { from: 'traffic', to: 'tap', tone: 'primary', animated: true },
        { from: 'traffic', to: 'inline', tone: 'warn', animated: true },
        { from: 'tap', to: 'ids', tone: 'primary' },
        { from: 'inline', to: 'ips', tone: 'danger' },
        { from: 'ids', to: 'alert', tone: 'safe', animated: true },
        { from: 'ips', to: 'drop', tone: 'safe', animated: true },
        { from: 'ips', to: 'risk', tone: 'danger' },
      ],
      legend: [
        { tone: 'primary', label: 'Passive monitoring' },
        { tone: 'danger', label: 'Active blocking' },
      ],
    },
    realWorld: {
      title: 'Detection in an encrypted world',
      body:
        "The overwhelming majority of network traffic is now encrypted, which is excellent for privacy and awkward for inspection. Rather than decrypting everything — expensive, legally sensitive and increasingly defeated by pinning — mature teams pivot to metadata. Who talked to whom, how often, for how long, with what certificate, using what TLS fingerprint, with what packet size distribution. A beacon that phones home every sixty seconds with a small, consistent payload is obvious in metadata even when the content is unreadable. This is why network detection and response tools emphasise connection analytics over payload signatures.",
      takeaway: 'You do not need to read the traffic to recognise the behaviour.',
    },
    attack: {
      title: 'Evading signature-based detection',
      intro:
        'Signature evasion is a well-developed craft, and it is why signatures alone are never sufficient.',
      steps: [
        { label: 'Encode', detail: 'The payload is encoded or encrypted so byte-level signatures no longer match.' },
        { label: 'Fragment', detail: 'Traffic is split across packets so the pattern never appears in a single inspected unit.' },
        { label: 'Obfuscate', detail: 'Polymorphic loaders change their appearance with every build.' },
        { label: 'Slow down', detail: 'Scanning and beaconing are throttled with random jitter to defeat rate-based rules.' },
        { label: 'Hide in TLS', detail: 'C2 is wrapped in TLS to a reputable domain, so payload inspection is impossible.' },
      ],
      mitigations: [
        'Combine signature, anomaly and behavioural detection rather than relying on one.',
        'Baseline normal network behaviour per host so beaconing regularity stands out.',
        'Use JA3/JA4-style TLS fingerprinting to identify tooling without decryption.',
        'Correlate network detections with endpoint telemetry — the same activity looks different from each vantage point.',
      ],
    },
    tools: [
      { name: 'Snort', what: 'The original open source IDS/IPS.', why: 'Learning to read and write Snort rules teaches how detection actually works.', url: 'https://www.snort.org/', category: 'IDS/IPS' },
      { name: 'Suricata', what: 'High-performance multi-threaded IDS/IPS/NSM.', why: 'Modern successor with protocol parsing, file extraction and TLS logging.', url: 'https://suricata.io/', category: 'IDS/IPS' },
      { name: 'Zeek', what: 'Network security monitoring producing rich structured logs.', why: 'Best-in-class metadata for hunting, complementing alert-based tools.', url: 'https://zeek.org/', category: 'NSM' },
      { name: 'OSSEC / Wazuh', what: 'Host-based intrusion detection with file integrity monitoring.', why: 'Detects local changes that network sensors cannot see.', url: 'https://wazuh.com/', category: 'HIDS' },
    ],
    links: [
      { label: 'NIST SP 800-94 — Guide to Intrusion Detection and Prevention Systems', url: 'https://csrc.nist.gov/pubs/sp/800/94/final', source: 'NIST' },
      { label: 'Suricata documentation', url: 'https://docs.suricata.io/', source: 'OISF' },
      { label: 'Zeek documentation', url: 'https://docs.zeek.org/', source: 'Zeek' },
    ],
    quiz: [
      {
        q: 'What is the fundamental difference between an IDS and an IPS?',
        options: [
          'An IDS works at layer 2 and an IPS at layer 3',
          'An IDS detects and alerts passively; an IPS sits inline and can block traffic',
          'An IDS is host-based and an IPS is network-based',
          'An IPS cannot use signatures',
        ],
        answer: 1,
        explain:
          'Placement and capability differ: the IDS observes a copy of traffic, the IPS is in the path and can drop packets — with the corresponding risk of blocking legitimate traffic.',
      },
      {
        q: 'Which detection method is most likely to identify a previously unknown attack technique?',
        options: ['Signature-based', 'Anomaly-based', 'Blocklist-based', 'Hash matching'],
        answer: 1,
        explain: 'Anomaly detection compares against a learned baseline, so novel behaviour stands out even without a prior signature — at the cost of more false positives.',
      },
      {
        q: 'An IPS begins blocking legitimate business traffic after a rule update. What is this called and what is the operational impact?',
        options: [
          'False negative; attacks are missed',
          'False positive; a self-inflicted availability incident',
          'True positive; correct behaviour',
          'Baseline drift; no impact',
        ],
        answer: 1,
        explain: 'A false positive on an inline device becomes an outage. This is why IPS rules are usually run in detect mode first and tuned before enforcement.',
      },
    ],
    examTip:
      'Remember the matrix: network vs host based, signature vs anomaly vs heuristic, inline (IPS, can block) vs out-of-band (IDS, alert only). False positive = benign flagged as malicious. False negative = attack missed.',
  },
  {
    slug: 'edr-xdr',
    title: 'EDR, XDR & Endpoint Security',
    domain: 4,
    objective: '4.5 Modify enterprise capabilities to enhance security',
    tagline: 'The endpoint sees what the network cannot — behaviour, lineage and containment.',
    difficulty: 'Intermediate',
    minutes: 10,
    keywords: ['edr', 'xdr', 'mdr', 'antivirus', 'behavioural detection', 'isolation', 'telemetry', 'process tree', 'endpoint'],
    simple: {
      what:
        "Endpoint detection and response deploys an agent that continuously records what happens on a device — processes, file writes, registry changes, network connections — and analyses it for malicious behaviour. It can isolate a host remotely, kill processes and support investigation. Extended detection and response correlates endpoint telemetry with email, identity, network and cloud signals in one platform. Managed detection and response adds a human team running it for you.",
      why:
        "Traditional antivirus matched known file signatures, which fails against fileless attacks, living-off-the-land techniques and unique per-victim builds. Behaviour is far harder for an attacker to change than a file hash.",
      how: [
        "EDR records process lineage: which process spawned which. A document opening a script interpreter which spawns a network utility is obviously wrong regardless of file names.",
        "Remote isolation cuts a compromised device off the network while leaving the agent connected for investigation — the ideal containment action.",
        "Telemetry feeds the SIEM and the hunting workflow; the historical record allows retrospective search when new intelligence arrives.",
        "Tamper protection is essential, because disabling security tooling is a standard early attacker objective.",
      ],
      where: [
        "Every workstation and server in a modern estate; increasingly containers and cloud workloads too.",
        "MDR is common where 24/7 in-house staffing is not viable.",
      ],
    },
    diagram: {
      title: 'EDR behavioural detection through process lineage',
      caption:
        'No individual component here is malware. The chain of relationships is what makes it obviously malicious.',
      columns: [
        [{ id: 'doc', label: 'Document Opened', sub: 'winword.exe', tone: 'neutral', icon: 'FileText' }],
        [{ id: 'ps', label: 'Script Interpreter', sub: 'powershell.exe spawned', tone: 'warn', icon: 'TerminalSquare' }],
        [{ id: 'enc', label: 'Encoded Command', sub: 'base64, hidden window', tone: 'danger', icon: 'Code2' }],
        [
          { id: 'net', label: 'Outbound Connection', sub: 'newly registered domain', tone: 'danger', icon: 'Globe' },
          { id: 'pers', label: 'Persistence Created', sub: 'run key / scheduled task', tone: 'danger', icon: 'Anchor' },
        ],
        [
          { id: 'detect', label: 'Behavioural Detection', sub: 'lineage + context', tone: 'safe', icon: 'Radar' },
          { id: 'iso', label: 'Host Isolated', sub: 'automated containment', tone: 'safe', icon: 'ShieldCheck' },
        ],
      ],
      edges: [
        { from: 'doc', to: 'ps', label: 'spawns', tone: 'warn', animated: true },
        { from: 'ps', to: 'enc', tone: 'danger', animated: true },
        { from: 'enc', to: 'net', tone: 'danger', animated: true },
        { from: 'enc', to: 'pers', tone: 'danger' },
        { from: 'net', to: 'detect', tone: 'safe' },
        { from: 'pers', to: 'detect', tone: 'safe', animated: true },
        { from: 'detect', to: 'iso', tone: 'safe', animated: true },
      ],
      legend: [
        { tone: 'danger', label: 'Malicious behaviour' },
        { tone: 'safe', label: 'Detection and response' },
      ],
    },
    realWorld: {
      title: 'Bring your own vulnerable driver',
      body:
        "Because EDR agents run with kernel-level visibility, attackers who want to blind them go to the kernel too. A legitimately signed but vulnerable driver is installed — signed, so it passes driver signature enforcement — and the flaw in it is exploited to terminate or blind security processes from a level above them. The countermeasures are specific: maintain a vulnerable driver blocklist, enable hypervisor-protected code integrity, require Secure Boot, alert on any new kernel driver installation, and monitor for security agent heartbeat loss centrally. That last one is important — if the agent stops reporting, that silence is itself the alert.",
      takeaway: 'Monitor your monitoring. Agent silence should page someone.',
    },
    attack: {
      title: 'Disabling security tooling before the payload',
      intro:
        'Defense evasion is a full ATT&CK tactic, and impairing defences is one of its most common techniques.',
      steps: [
        { label: 'Recon', detail: 'The attacker enumerates installed security products and their services.' },
        { label: 'Elevate', detail: 'Local administrator or SYSTEM privileges are obtained.' },
        { label: 'Impair', detail: 'Services are stopped, exclusions are added, or tamper protection is attacked directly.' },
        { label: 'Blind', detail: 'Cloud reporting is blocked at the firewall so the console shows the host as merely offline.' },
        { label: 'Execute', detail: 'The main payload runs with no telemetry being recorded or reported.' },
      ],
      mitigations: [
        'Enable tamper protection and require a separate management credential to modify agent settings.',
        'Alert centrally on agents that stop reporting, and treat unexplained silence as an incident.',
        'Restrict local administrator rights so elevation is not routine.',
        'Monitor for the addition of antivirus exclusions and for new kernel driver loads.',
      ],
    },
    tools: [
      { name: 'Microsoft Defender for Endpoint', what: 'Enterprise EDR built into Windows.', why: 'Widely deployed and well documented; excellent for learning behavioural detection concepts.', url: 'https://learn.microsoft.com/defender-endpoint/', category: 'EDR' },
      { name: 'Wazuh / OSQuery', what: 'Open source endpoint visibility and querying.', why: 'Query your fleet like a database; great for labs and hunting practice.', url: 'https://osquery.io/', category: 'Telemetry' },
      { name: 'Sysmon + Sigma rules', what: 'Deep Windows telemetry with portable detection rules.', why: 'Builds EDR-like visibility from free components.', url: 'https://learn.microsoft.com/sysinternals/downloads/sysmon', category: 'Telemetry' },
      { name: 'Velociraptor', what: 'Endpoint hunting and forensic collection at scale.', why: 'Excellent for incident response across many hosts.', url: 'https://docs.velociraptor.app/', category: 'DFIR' },
    ],
    links: [
      { label: 'MITRE ATT&CK — Impair Defenses (T1562)', url: 'https://attack.mitre.org/techniques/T1562/', source: 'MITRE' },
      { label: 'Microsoft — Vulnerable driver blocklist', url: 'https://learn.microsoft.com/windows/security/application-security/application-control/windows-defender-application-control/design/microsoft-recommended-driver-block-rules', source: 'Microsoft' },
      { label: 'NIST SP 800-83 — Malware Incident Handling', url: 'https://csrc.nist.gov/pubs/sp/800/83/r1/final', source: 'NIST' },
    ],
    quiz: [
      {
        q: 'Why is EDR more effective than traditional signature-based antivirus against fileless attacks?',
        options: [
          'It scans files more frequently',
          'It records and analyses behaviour and process relationships rather than relying on matching known file content',
          'It uses a larger signature database',
          'It runs only in the cloud',
        ],
        answer: 1,
        explain: 'Fileless techniques write nothing to disk to scan. Behavioural telemetry — what ran, spawned by what, doing what — still reveals them.',
      },
      {
        q: 'What does XDR add compared with EDR?',
        options: [
          'Faster file scanning',
          'Correlation of telemetry across endpoint, identity, email, network and cloud in a single platform',
          'Hardware encryption',
          'Automatic patching',
        ],
        answer: 1,
        explain: 'Extended detection and response widens the data set so a single incident is visible across all the places it touches.',
      },
      {
        q: 'An EDR agent stops reporting to the console on a critical server. How should this be treated?',
        options: [
          'Ignore it — the host is probably offline',
          'Investigate promptly; agent silence can indicate deliberate impairment of defences',
          'Reinstall the agent without investigation',
          'Disable alerting for that host',
        ],
        answer: 1,
        explain: 'Disabling or blinding security tooling is a recognised attacker technique. Unexplained loss of telemetry is a security event, not a maintenance issue.',
      },
    ],
    examTip:
      'Distinguish the tiers: antivirus (signature, file-based), EDR (behaviour, endpoint response), XDR (cross-domain correlation), MDR (outsourced operation). Isolation, not shutdown, is the preferred containment action.',
  },
  {
    slug: 'digital-forensics',
    title: 'Digital Forensics',
    domain: 4,
    objective: '4.8 Explain appropriate incident response activities',
    tagline: 'Evidence that survives scrutiny — acquisition, integrity and chain of custody.',
    difficulty: 'Intermediate',
    minutes: 11,
    keywords: ['forensics', 'chain of custody', 'order of volatility', 'imaging', 'write blocker', 'hashing', 'legal hold', 'e-discovery', 'timeline', 'memory'],
    simple: {
      what:
        "Digital forensics is the disciplined acquisition, preservation, analysis and presentation of digital evidence. The technical goal is to answer what happened. The procedural goal is to do it in a way that remains credible if it is later challenged in court or in a regulatory process.",
      why:
        "Evidence collected carelessly is worthless. If you cannot prove the image was not altered, or account for who held it and when, an otherwise clear finding becomes inadmissible or unpersuasive.",
      how: [
        "Order of volatility: collect the most perishable first — CPU registers and cache, then RAM, then network state, then disk, then archived media.",
        "Acquisition uses a write blocker so the source is never modified, and the image is hashed immediately. Re-hashing later proves integrity.",
        "Chain of custody documents every person who handled the evidence, when, and for what purpose, from seizure to presentation.",
        "Legal hold suspends normal data destruction as soon as litigation or investigation is anticipated.",
        "Analysis builds a timeline from file system metadata, event logs, memory artefacts and network records.",
      ],
      where: [
        "Internal investigations, criminal proceedings, regulatory enquiries and insurance claims.",
        "Incident response, where the forensic answer determines the scope of the breach and the disclosure obligations.",
        "Cloud forensics relies on snapshots and provider audit logs rather than physical media.",
      ],
    },
    diagram: {
      title: 'Forensic acquisition and integrity chain',
      caption:
        'Hash at acquisition, hash again before analysis, hash at presentation. Matching digests are the proof of integrity.',
      columns: [
        [{ id: 'scene', label: 'Identify & Preserve', sub: 'legal hold, isolate', tone: 'violet', icon: 'ShieldAlert' }],
        [{ id: 'vol', label: 'Order of Volatility', sub: 'RAM before disk', tone: 'warn', icon: 'Timer' }],
        [{ id: 'acq', label: 'Acquire', sub: 'write blocker, bit-for-bit image', tone: 'primary', icon: 'HardDriveDownload' }],
        [{ id: 'hash', label: 'Hash & Verify', sub: 'SHA-256 of source and image', tone: 'safe', icon: 'Hash' }],
        [{ id: 'coc', label: 'Chain of Custody', sub: 'who, what, when, why', tone: 'violet', icon: 'ClipboardSignature' }],
        [{ id: 'analysis', label: 'Analyse the Copy', sub: 'timeline, artefacts, reporting', tone: 'safe', icon: 'Search' }],
      ],
      edges: [
        { from: 'scene', to: 'vol', tone: 'violet', animated: true },
        { from: 'vol', to: 'acq', tone: 'warn', animated: true },
        { from: 'acq', to: 'hash', tone: 'primary', animated: true },
        { from: 'hash', to: 'coc', tone: 'safe', animated: true },
        { from: 'coc', to: 'analysis', tone: 'safe', animated: true },
      ],
      legend: [
        { tone: 'safe', label: 'Integrity preserved' },
        { tone: 'violet', label: 'Procedural requirement' },
      ],
    },
    realWorld: {
      title: 'What lives only in memory',
      body:
        "Memory holds things that exist nowhere else: decryption keys for an encrypted volume, the contents of a fileless implant, network connections in progress, injected code, clipboard contents and credentials in plaintext. All of it vanishes the instant power is lost. This is why the first responder action for a suspected compromise is network isolation followed by a memory capture, not a shutdown. Memory analysis frameworks can then reconstruct process lists, loaded modules, network sockets and injected regions from that single capture — often answering in minutes what disk analysis could not answer at all.",
      takeaway: 'RAM is the highest-value, shortest-lived evidence you will ever collect.',
    },
    attack: {
      title: 'Anti-forensic techniques',
      intro:
        'Attackers actively work to make investigation harder. Knowing the techniques tells you what to look for.',
      steps: [
        { label: 'Log manipulation', detail: 'Event logs are cleared or selectively edited to remove the intrusion.' },
        { label: 'Timestomping', detail: 'File timestamps are set to match surrounding system files so nothing stands out in a timeline.' },
        { label: 'Secure deletion', detail: 'Tools overwrite files and slack space so recovery is impossible.' },
        { label: 'Encryption and packing', detail: 'Payloads are encrypted at rest so static analysis yields nothing.' },
        { label: 'Living off the land', detail: 'Only signed native binaries are used, leaving no unusual artefacts to find.' },
      ],
      mitigations: [
        'Centralise logs off-host immediately so local tampering does not remove the record.',
        'Use file integrity monitoring on critical directories to detect timestamp and content changes.',
        'Capture memory early — packed and encrypted payloads are unpacked in memory to run.',
        'Correlate multiple independent sources; anti-forensics rarely covers every one of them.',
      ],
    },
    tools: [
      { name: 'Autopsy / The Sleuth Kit', what: 'Open source disk forensics platform.', why: 'Full file system analysis, deleted file recovery and timeline generation.', url: 'https://www.autopsy.com/', category: 'Disk forensics' },
      { name: 'Volatility 3', what: 'Memory forensics framework.', why: 'Extract processes, connections, injected code and credentials from a RAM capture.', url: 'https://volatilityfoundation.org/', category: 'Memory forensics' },
      { name: 'FTK Imager', what: 'Forensic imaging and preview tool.', why: 'Free, widely accepted way to create verified images.', url: 'https://www.exterro.com/digital-forensics-software/ftk-imager', category: 'Acquisition' },
      { name: 'Wireshark / NetworkMiner', what: 'Network forensic analysis.', why: 'Reconstruct sessions and extract transferred files from captures.', url: 'https://www.wireshark.org/', category: 'Network forensics' },
    ],
    links: [
      { label: 'NIST SP 800-86 — Guide to Integrating Forensic Techniques into Incident Response', url: 'https://csrc.nist.gov/pubs/sp/800/86/final', source: 'NIST' },
      { label: 'RFC 3227 — Guidelines for Evidence Collection and Archiving', url: 'https://www.rfc-editor.org/rfc/rfc3227', source: 'IETF' },
      { label: 'SWGDE Best Practices', url: 'https://www.swgde.org/documents', source: 'SWGDE' },
    ],
    quiz: [
      {
        q: 'According to the order of volatility, which should be collected first?',
        options: ['Hard disk image', 'Contents of RAM', 'Archived backup tapes', 'Printed documents'],
        answer: 1,
        explain:
          'Volatile data disappears when power is lost. Registers and cache come first in theory, but in practice memory capture is the first realistic collection step.',
      },
      {
        q: 'What is the purpose of chain of custody documentation?',
        options: [
          'To encrypt the evidence',
          'To record every person who handled the evidence and when, so its integrity and handling can be demonstrated',
          'To compress evidence files',
          'To determine the attacker identity',
        ],
        answer: 1,
        explain: 'Chain of custody establishes that evidence was not tampered with or substituted, which is essential for admissibility and credibility.',
      },
      {
        q: 'Why is a write blocker used during forensic acquisition?',
        options: [
          'To speed up copying',
          'To prevent any modification of the original media during imaging',
          'To encrypt the resulting image',
          'To compress the image',
        ],
        answer: 1,
        explain: 'Any write to the source alters the evidence. A write blocker enforces read-only access at the hardware or driver level.',
      },
    ],
    examTip:
      'Key terms: legal hold, chain of custody, acquisition, reporting, preservation, e-discovery, order of volatility, and hashing for integrity. Always analyse a verified copy, never the original.',
  },
  {
    slug: 'hardening-baselines',
    title: 'Hardening, Baselines & Patch Management',
    domain: 4,
    objective: '4.1 Apply common security techniques to computing resources',
    tagline: 'Reducing attack surface systematically rather than one setting at a time.',
    difficulty: 'Beginner',
    minutes: 10,
    keywords: ['hardening', 'baseline', 'cis benchmark', 'patch management', 'least functionality', 'default credentials', 'group policy', 'configuration drift', 'mdm'],
    simple: {
      what:
        "Hardening reduces the attack surface of a system by removing what is not needed and securely configuring what remains. A security baseline is the documented, approved configuration for a platform, and it is applied consistently and monitored for drift.",
      why:
        "Default configurations are optimised for compatibility and ease of setup, not security. Almost every environment contains unnecessary services, default credentials and permissive settings that nobody deliberately chose.",
      how: [
        "Least functionality: disable unused services, remove unnecessary software, close unused ports, and remove default accounts.",
        "Change every default credential — this remains one of the most exploited weaknesses in the world, especially on network devices and IoT.",
        "Apply consensus baselines such as CIS Benchmarks or DISA STIGs, then enforce them with group policy, configuration management or MDM.",
        "Patch management: inventory, test, deploy on a defined schedule, with an emergency path for actively exploited flaws.",
        "Monitor for configuration drift — systems diverge from baseline over time through troubleshooting and one-off changes.",
      ],
      where: [
        "Golden images for servers, workstations, containers and cloud instances.",
        "Mobile device management enforcing encryption, screen lock and application policy.",
        "Compliance evidence: auditors ask for the baseline, the deviation list and the drift monitoring.",
      ],
    },
    diagram: {
      title: 'From default build to enforced, monitored baseline',
      caption:
        'Hardening is not a one-off project. Without drift detection, every environment slowly returns to default.',
      columns: [
        [{ id: 'default', label: 'Default Install', sub: 'maximum compatibility', tone: 'danger', icon: 'PackageOpen' }],
        [
          { id: 'remove', label: 'Least Functionality', sub: 'remove services and software', tone: 'primary', icon: 'Minus' },
          { id: 'creds', label: 'Change Defaults', sub: 'accounts and passwords', tone: 'primary', icon: 'KeyRound' },
          { id: 'config', label: 'Apply Benchmark', sub: 'CIS / STIG settings', tone: 'primary', icon: 'ListChecks' },
        ],
        [{ id: 'image', label: 'Golden Image', sub: 'approved baseline', tone: 'safe', icon: 'ImageDown' }],
        [{ id: 'enforce', label: 'Enforce', sub: 'GPO, Ansible, MDM, IaC', tone: 'violet', icon: 'Settings2' }],
        [
          { id: 'drift', label: 'Drift Detected', sub: 'remediate automatically', tone: 'warn', icon: 'GitCompare' },
          { id: 'patch', label: 'Patch Cycle', sub: 'routine plus emergency path', tone: 'safe', icon: 'Wrench' },
        ],
      ],
      edges: [
        { from: 'default', to: 'remove', tone: 'primary', animated: true },
        { from: 'default', to: 'creds', tone: 'primary' },
        { from: 'default', to: 'config', tone: 'primary' },
        { from: 'remove', to: 'image', tone: 'safe' },
        { from: 'config', to: 'image', tone: 'safe', animated: true },
        { from: 'image', to: 'enforce', tone: 'violet', animated: true },
        { from: 'enforce', to: 'drift', tone: 'warn', animated: true },
        { from: 'enforce', to: 'patch', tone: 'safe' },
      ],
      legend: [
        { tone: 'danger', label: 'Insecure default' },
        { tone: 'safe', label: 'Controlled state' },
      ],
    },
    realWorld: {
      title: 'Default credentials are still the world most reliable exploit',
      body:
        "Search engines for internet-connected devices index hundreds of thousands of cameras, routers, industrial controllers and management interfaces still using the manufacturer default password. Entire botnets have been built on nothing more sophisticated than trying a list of sixty common default credential pairs. No exploit, no malware development, no zero-day. The defence costs nothing and is in every hardening guide ever written, yet it persists because devices are installed by people whose job is to make them work, not to secure them. Procurement and commissioning checklists are the practical fix.",
      takeaway: 'Changing defaults is the cheapest security control that exists. Verify it in commissioning.',
    },
    attack: {
      title: 'Exploiting configuration drift',
      intro:
        'The baseline was correct on build day. The attack targets what changed afterwards.',
      steps: [
        { label: 'Troubleshooting change', detail: 'An engineer disables a security setting to resolve an application issue and never re-enables it.' },
        { label: 'No detection', detail: 'Without drift monitoring, the deviation is invisible and undocumented.' },
        { label: 'Discovery', detail: 'An attacker scanning internally finds the one host in a hundred that permits legacy authentication.' },
        { label: 'Exploit', detail: 'That host becomes the entry point, bypassing controls enforced everywhere else.' },
        { label: 'Spread', detail: 'The weakened host provides credentials and a launch point into the rest of the estate.' },
      ],
      mitigations: [
        'Continuously scan configuration against the baseline and auto-remediate deviations.',
        'Require exceptions to be documented, approved, time-bounded and reviewed.',
        'Use immutable infrastructure where possible — replace rather than modify.',
        'Include drift findings in vulnerability management reporting so they are actually prioritised.',
      ],
    },
    tools: [
      { name: 'CIS Benchmarks / CIS-CAT', what: 'Consensus hardening baselines and an assessment tool.', why: 'The most widely accepted baselines, covering practically every platform.', url: 'https://www.cisecurity.org/cis-benchmarks', category: 'Baseline' },
      { name: 'DISA STIGs', what: 'US Department of Defense security technical implementation guides.', why: 'The most stringent publicly available baselines.', url: 'https://public.cyber.mil/stigs/', category: 'Baseline' },
      { name: 'Ansible / Puppet / Group Policy', what: 'Configuration management and enforcement.', why: 'Applies and continuously re-applies the baseline at scale.', url: 'https://www.ansible.com/', category: 'Enforcement' },
      { name: 'OpenSCAP', what: 'Automated compliance scanning against SCAP content.', why: 'Machine-readable evidence that the baseline is actually in place.', url: 'https://www.open-scap.org/', category: 'Assessment' },
    ],
    links: [
      { label: 'NIST SP 800-70 — National Checklist Program', url: 'https://csrc.nist.gov/pubs/sp/800/70/r4/final', source: 'NIST' },
      { label: 'NIST SP 800-40 — Guide to Enterprise Patch Management Planning', url: 'https://csrc.nist.gov/pubs/sp/800/40/r4/final', source: 'NIST' },
      { label: 'CIS Benchmarks', url: 'https://www.cisecurity.org/cis-benchmarks', source: 'CIS' },
    ],
    quiz: [
      {
        q: 'What does the principle of least functionality mean in the context of hardening?',
        options: [
          'Give users the minimum permissions they need',
          'Configure systems to provide only the services, ports and software required for their purpose',
          'Use the smallest possible hardware',
          'Limit network bandwidth',
        ],
        answer: 1,
        explain:
          'Least functionality is about the system, removing unnecessary capability. Least privilege is the related principle applied to accounts and permissions.',
      },
      {
        q: 'Systems that were built to a secure baseline gradually diverge from it over time. What is this called?',
        options: ['Configuration drift', 'VM sprawl', 'Technical debt', 'Shadow IT'],
        answer: 0,
        explain: 'Configuration drift is deviation from the approved baseline, usually through undocumented one-off changes. Continuous scanning detects it.',
      },
      {
        q: 'Which is the most appropriate approach to patching an actively exploited critical vulnerability on an internet-facing system?',
        options: [
          'Wait for the next quarterly maintenance window',
          'Use the emergency change path to patch immediately, then hunt for signs of prior compromise',
          'Apply the patch without testing to all systems simultaneously',
          'Document it as accepted risk',
        ],
        answer: 1,
        explain:
          'Active exploitation justifies an emergency change. Patching alone is not sufficient — an already compromised system stays compromised after the patch.',
      },
    ],
    examTip:
      'Hardening targets you should recognise: workstations, servers, mobile, switches and routers, cloud infrastructure, ICS/SCADA, embedded and IoT, and RTOS. Techniques: encryption, endpoint protection, host firewall, HIPS, disabling ports and protocols, changing defaults, and removing unnecessary software.',
  },
  {
    slug: 'email-security',
    title: 'Email Security — SPF, DKIM & DMARC',
    domain: 4,
    objective: '4.5 Modify enterprise capabilities to enhance security',
    tagline: 'Three DNS records that decide whether anyone can send mail as you.',
    difficulty: 'Intermediate',
    minutes: 9,
    keywords: ['spf', 'dkim', 'dmarc', 'email', 'spoofing', 'gateway', 'sandboxing', 'bec', 'dns', 'mta-sts'],
    simple: {
      what:
        "SMTP was designed with no authentication, so anyone can claim to be anyone. Three DNS-published mechanisms fix this. SPF lists which servers may send mail for your domain. DKIM cryptographically signs outgoing messages so recipients can verify integrity and origin. DMARC ties the two together, tells recipients what to do when checks fail, and provides reporting.",
      why:
        "Without DMARC enforcement, an attacker can send mail that appears to come from your exact domain to your own employees, your customers and your suppliers. It is one of the highest-impact, lowest-cost controls available.",
      how: [
        "SPF: a TXT record listing authorised sending IPs and services. It validates the envelope sender, not the visible From header.",
        "DKIM: the sending server signs headers and body with a private key; the public key is published in DNS for verification.",
        "DMARC: a policy record specifying none (monitor), quarantine or reject, plus addresses to receive aggregate reports. It also requires alignment between the visible From domain and the SPF or DKIM domain.",
        "Deploy in stages: publish p=none, read the reports, identify every legitimate sender, then move to quarantine and finally reject.",
        "Complementary: MTA-STS and DANE enforce TLS for mail transport; a secure email gateway adds sandboxing, link rewriting and content inspection.",
      ],
      where: [
        "Every domain you own, including parked and unused domains, which should publish a reject policy so they cannot be abused.",
        "Third-party senders — marketing platforms, ticketing systems, payroll — all need authorising or they will break.",
      ],
    },
    diagram: {
      title: 'How a receiving mail server evaluates SPF, DKIM and DMARC',
      caption:
        'DMARC is the decision maker. Without it, SPF and DKIM failures often have no consequence at all.',
      columns: [
        [{ id: 'send', label: 'Inbound Message', sub: 'claims to be from your domain', tone: 'neutral', icon: 'Mail' }],
        [
          { id: 'spf', label: 'SPF Check', sub: 'is the sending IP authorised?', tone: 'primary', icon: 'ServerCog' },
          { id: 'dkim', label: 'DKIM Check', sub: 'is the signature valid?', tone: 'primary', icon: 'FileBadge' },
        ],
        [{ id: 'align', label: 'DMARC Alignment', sub: 'does the From domain match?', tone: 'violet', icon: 'GitCompare' }],
        [
          { id: 'pass', label: 'Deliver', sub: 'authenticated', tone: 'safe', icon: 'Inbox' },
          { id: 'quar', label: 'Quarantine', sub: 'to junk folder', tone: 'warn', icon: 'FolderX' },
          { id: 'rej', label: 'Reject', sub: 'refused at the gateway', tone: 'danger', icon: 'ShieldX' },
        ],
        [{ id: 'rua', label: 'Aggregate Reports', sub: 'visibility into all senders', tone: 'safe', icon: 'BarChart3' }],
      ],
      edges: [
        { from: 'send', to: 'spf', tone: 'primary', animated: true },
        { from: 'send', to: 'dkim', tone: 'primary', animated: true },
        { from: 'spf', to: 'align', tone: 'violet' },
        { from: 'dkim', to: 'align', tone: 'violet', animated: true },
        { from: 'align', to: 'pass', label: 'pass', tone: 'safe', animated: true },
        { from: 'align', to: 'quar', label: 'fail, p=quarantine', tone: 'warn' },
        { from: 'align', to: 'rej', label: 'fail, p=reject', tone: 'danger' },
        { from: 'align', to: 'rua', label: 'reporting', tone: 'safe' },
      ],
      legend: [
        { tone: 'safe', label: 'Authenticated' },
        { tone: 'danger', label: 'Spoofing blocked' },
      ],
    },
    realWorld: {
      title: 'The parked domain used to phish your own staff',
      body:
        "Organisations publish DMARC on their primary domain and forget the twelve other domains they registered for brand protection, old products or regional variants. None of those send mail, so none of them have records — which makes them perfect for spoofing, and they still look convincingly related to the brand. The fix takes minutes: publish an SPF record permitting nothing, a wildcard DKIM record with no key, and a DMARC policy of reject on every domain you own that does not send mail. It is one of the highest ratio of security value to effort actions available to any organisation.",
      takeaway: 'Every domain you own needs email authentication records, including the ones that never send mail.',
    },
    attack: {
      title: 'Lookalike domain phishing when DMARC blocks exact spoofing',
      intro:
        'Enforcement pushes attackers off your domain — so they register one that looks almost identical.',
      steps: [
        { label: 'Register', detail: 'A domain differing by one character, a hyphen or a different top-level domain is registered.' },
        { label: 'Authenticate it', detail: 'The attacker publishes valid SPF, DKIM and DMARC for their own domain, so it passes every check.' },
        { label: 'Display name spoof', detail: 'The friendly From name is set to a real executive, which is all most mobile clients display.' },
        { label: 'Warm up', detail: 'A short benign conversation establishes rapport and trust before any request is made.' },
        { label: 'Act', detail: 'A payment redirection or credential request is made against that established context.' },
      ],
      mitigations: [
        'Monitor newly registered lookalike domains and pursue takedowns.',
        'Apply external sender warning banners, and highlight first-time senders.',
        'Detect display name impersonation of executives at the gateway.',
        'Enforce out-of-band verification for payment and bank detail changes.',
      ],
    },
    tools: [
      { name: 'DMARC analysers', what: 'Aggregate report parsing and visualisation.', why: 'Turns raw XML reports into an actionable sender inventory.', url: 'https://dmarc.org/resources/deployment-tools/', category: 'Email security' },
      { name: 'MXToolbox', what: 'DNS and mail configuration checks.', why: 'Quick verification of SPF, DKIM, DMARC and blacklist status.', url: 'https://mxtoolbox.com/', category: 'Diagnostics' },
      { name: 'Secure email gateways', what: 'Sandboxing, link rewriting and impersonation detection.', why: 'Adds content-level defence on top of authentication.', category: 'Email security' },
      { name: 'urlscan.io / VirusTotal', what: 'Safe inspection of suspicious links and attachments.', why: 'Core tools of phishing triage.', url: 'https://urlscan.io/', category: 'Analysis' },
    ],
    links: [
      { label: 'RFC 7489 — DMARC', url: 'https://www.rfc-editor.org/rfc/rfc7489', source: 'IETF' },
      { label: 'NIST SP 800-177 — Trustworthy Email', url: 'https://csrc.nist.gov/pubs/sp/800/177/r1/final', source: 'NIST' },
      { label: 'CISA — Email authentication guidance', url: 'https://www.cisa.gov/resources-tools/resources/binding-operational-directive-18-01', source: 'CISA' },
    ],
    quiz: [
      {
        q: 'Which mechanism cryptographically signs an email so the recipient can verify it was not altered in transit?',
        options: ['SPF', 'DKIM', 'DMARC', 'MTA-STS'],
        answer: 1,
        explain: 'DKIM applies a digital signature over headers and body using a private key, with the public key published in DNS.',
      },
      {
        q: 'An organisation has SPF and DKIM configured but no DMARC record. What is the main consequence?',
        options: [
          'Email cannot be delivered at all',
          'There is no published policy telling receivers what to do when checks fail, and no aggregate reporting',
          'DKIM signatures become invalid',
          'All mail is automatically rejected',
        ],
        answer: 1,
        explain: 'Without DMARC there is no enforcement instruction and no alignment requirement, so spoofed mail frequently still gets delivered.',
      },
      {
        q: 'What is the recommended first DMARC policy when deploying for the first time?',
        options: ['p=reject immediately', 'p=none to monitor and identify legitimate senders', 'No policy at all', 'p=quarantine with no reporting'],
        answer: 1,
        explain:
          'Starting at p=none with reporting enabled reveals every legitimate sender so they can be authorised before enforcement breaks business email.',
      },
    ],
    examTip:
      'One line each: SPF authorises sending servers, DKIM signs the message, DMARC sets policy and alignment and provides reporting. Know the policy values none, quarantine and reject.',
  },
  {
    slug: 'automation-soar',
    title: 'Automation, Orchestration & SOAR',
    domain: 4,
    objective: '4.7 Explain the importance of automation and orchestration',
    tagline: 'Making the repetitive parts of security fast, consistent and unattended.',
    difficulty: 'Intermediate',
    minutes: 9,
    keywords: ['soar', 'automation', 'orchestration', 'playbook', 'api', 'scripting', 'provisioning', 'guardrails', 'iac', 'ticketing'],
    simple: {
      what:
        "Security orchestration, automation and response connects your tools through APIs and executes predefined playbooks. Automation performs a single task without a human; orchestration coordinates many tasks across many systems into a coherent workflow.",
      why:
        "Analyst time is the scarcest resource in security. Enrichment, ticket creation, containment and user notification are repetitive, well-defined and error-prone when done by hand at 3 a.m. — which is precisely what machines are for.",
      how: [
        "Common automations: enrich an alert with threat intelligence and asset context, isolate a host, disable an account, block an indicator, open a ticket, notify the user.",
        "User provisioning and deprovisioning automation ensures joiners, movers and leavers are handled consistently and immediately.",
        "Guardrails as code prevent misconfiguration from ever being deployed rather than detecting it afterwards.",
        "Benefits: efficiency, consistency, faster reaction, workforce multiplication, better employee retention. Costs: complexity, ongoing maintenance, single points of failure, and technical debt if playbooks are not owned.",
      ],
      where: [
        "SOC triage pipelines, identity lifecycle management, cloud compliance remediation and vulnerability ticket routing.",
        "CI/CD pipelines enforcing security gates automatically on every change.",
      ],
    },
    diagram: {
      title: 'An automated phishing triage playbook',
      caption:
        'The human decision point remains, but everything around it is automated. Analyst time goes to judgement, not clicking.',
      columns: [
        [{ id: 'report', label: 'User Reports Email', sub: 'report button in client', tone: 'neutral', icon: 'Mail' }],
        [{ id: 'enrich', label: 'Automated Enrichment', sub: 'detonate URL, check hash, sender reputation', tone: 'primary', icon: 'Sparkles' }],
        [{ id: 'score', label: 'Risk Scoring', sub: 'combine signals', tone: 'violet', icon: 'Gauge' }],
        [
          { id: 'auto', label: 'Auto-Remediate', sub: 'purge from all mailboxes, block sender', tone: 'safe', icon: 'Zap' },
          { id: 'human', label: 'Analyst Review', sub: 'ambiguous cases only', tone: 'warn', icon: 'UserCheck' },
        ],
        [{ id: 'close', label: 'Notify & Close', sub: 'user informed, metrics recorded', tone: 'safe', icon: 'CircleCheck' }],
      ],
      edges: [
        { from: 'report', to: 'enrich', tone: 'primary', animated: true },
        { from: 'enrich', to: 'score', tone: 'violet', animated: true },
        { from: 'score', to: 'auto', label: 'high confidence', tone: 'safe', animated: true },
        { from: 'score', to: 'human', label: 'uncertain', tone: 'warn' },
        { from: 'auto', to: 'close', tone: 'safe' },
        { from: 'human', to: 'close', tone: 'safe' },
      ],
      legend: [
        { tone: 'safe', label: 'Automated path' },
        { tone: 'warn', label: 'Human judgement' },
      ],
    },
    realWorld: {
      title: 'Automating the boring 80 percent',
      body:
        "A phishing report that takes an analyst fifteen minutes manually — check the sender, detonate the link, search for other recipients, purge the message, block the indicator, reply to the reporter — takes a playbook about forty seconds. Multiply by a hundred reports a week and the SOC recovers most of a full-time role, and the response is identical every time regardless of who is on shift. The trap is over-automation: a playbook that automatically disables accounts on a noisy rule becomes a denial of service against your own staff. Start with enrichment, which is safe, then automate containment only where confidence is genuinely high.",
      takeaway: 'Automate enrichment first, containment second, and always keep a human in the loop for irreversible actions.',
    },
    attack: {
      title: 'Abusing automation as an attack path',
      intro:
        'Automation platforms hold powerful credentials across many systems, which makes them an extremely attractive target.',
      steps: [
        { label: 'Target the orchestrator', detail: 'The attacker identifies the SOAR or configuration management platform, which holds API keys for everything.' },
        { label: 'Harvest credentials', detail: 'Stored integration secrets grant access across the estate in a single step.' },
        { label: 'Modify a playbook', detail: 'A playbook is altered to add exclusions, suppress specific alerts, or grant access silently.' },
        { label: 'Blend in', detail: 'The actions are performed by the automation account, which legitimately does unusual things all day.' },
        { label: 'Persist', detail: 'A scheduled playbook re-creates the attacker access whenever it is removed.' },
      ],
      mitigations: [
        'Treat automation platforms as tier-zero: MFA, restricted network access, and dedicated administrators.',
        'Store secrets in a vault with short-lived, scoped credentials rather than static keys.',
        'Version control playbooks and require peer review for changes.',
        'Audit and alert on playbook modification and on automation account activity outside expected patterns.',
      ],
    },
    tools: [
      { name: 'Shuffle / n8n', what: 'Open source security orchestration platforms.', why: 'Build real playbooks without commercial licensing.', url: 'https://shuffler.io/', category: 'SOAR' },
      { name: 'Cortex / TheHive', what: 'Automated observable analysis with case management.', why: 'Automates enrichment across dozens of analysers.', url: 'https://strangebee.com/', category: 'SOAR' },
      { name: 'Ansible', what: 'Agentless automation and configuration management.', why: 'Automates hardening, patching and response actions at scale.', url: 'https://www.ansible.com/', category: 'Automation' },
      { name: 'Terraform / OPA', what: 'Infrastructure as code with policy enforcement.', why: 'Guardrails that prevent insecure infrastructure from being created at all.', url: 'https://www.openpolicyagent.org/', category: 'Guardrails' },
    ],
    links: [
      { label: 'NIST SP 800-53 — Automation-related controls', url: 'https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final', source: 'NIST' },
      { label: 'CISA — Secure by Design', url: 'https://www.cisa.gov/securebydesign', source: 'CISA' },
      { label: 'OWASP — CI/CD Security', url: 'https://owasp.org/www-project-top-10-ci-cd-security-risks/', source: 'OWASP' },
    ],
    quiz: [
      {
        q: 'What is the difference between automation and orchestration?',
        options: [
          'They are the same thing',
          'Automation executes a single task without human intervention; orchestration coordinates multiple automated tasks across systems into a workflow',
          'Orchestration only applies to networks',
          'Automation requires a SIEM',
        ],
        answer: 1,
        explain: 'Automation is the individual action. Orchestration is the conductor arranging many actions across different tools into an end-to-end process.',
      },
      {
        q: 'Which is a genuine risk of heavy security automation?',
        options: [
          'It always increases analyst headcount',
          'A poorly tuned playbook can take disruptive action at scale, and complex playbooks become unmaintained technical debt',
          'It prevents logging',
          'It removes the need for detection rules',
        ],
        answer: 1,
        explain:
          'Automation multiplies both correct and incorrect decisions. Playbooks need owners, testing and review exactly like production code.',
      },
      {
        q: 'Which automation use case most directly reduces the risk of former employees retaining access?',
        options: ['Automated malware sandboxing', 'Automated user provisioning and deprovisioning', 'Automated backup verification', 'Automated firewall log archiving'],
        answer: 1,
        explain: 'Automated lifecycle management ensures access is removed everywhere the moment employment ends, rather than depending on a manual checklist.',
      },
    ],
    examTip:
      'Know the benefits (efficiency, baseline enforcement, standard configurations, scaling securely, employee retention, faster reaction, workforce multiplier) and the considerations (complexity, cost, single point of failure, technical debt, ongoing supportability).',
  },
]

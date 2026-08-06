import type { Topic } from '../../types'

export const DOMAIN2: Topic[] = [
  {
    slug: 'threat-actors',
    title: 'Threat Actors & Motivations',
    domain: 2,
    objective: '2.1 Compare and contrast common threat actors and motivations',
    tagline: 'Know your adversary: capability, resources, intent.',
    difficulty: 'Beginner',
    minutes: 9,
    keywords: ['threat actor', 'nation state', 'apt', 'hacktivist', 'insider threat', 'script kiddie', 'organised crime', 'shadow it'],
    simple: {
      what:
        "A threat actor is any entity capable of causing harm to your systems. They differ along three axes: capability (skill and tooling), resources (money, time, people) and intent (what they want). Categories include nation-state actors, organised crime, hacktivists, insider threats, unskilled attackers and shadow IT.",
      why:
        "You cannot defend against everyone equally. Understanding which actors realistically target your sector tells you which techniques to prioritise detecting. A regional charity and a defence contractor face genuinely different adversaries.",
      how: [
        "Nation-state / APT: highest resources, long dwell time, motivated by espionage, disruption or strategic advantage. Will develop zero-days.",
        "Organised crime: profit-driven, industrialised, runs ransomware-as-a-service with affiliates and negotiators.",
        "Hacktivist: ideological, favours defacement, leaks and DDoS for publicity.",
        "Insider threat: already inside, already trusted, may be malicious, negligent or coerced. Hardest to detect.",
        "Unskilled attacker (script kiddie): uses existing tools, opportunistic, but volume makes them a real risk to unpatched systems.",
        "Shadow IT: not adversarial at all — employees using unsanctioned services create unmanaged risk.",
      ],
      where: [
        "Threat modelling and risk assessments start by naming plausible actors.",
        "Cyber threat intelligence teams track named groups and map them to MITRE ATT&CK techniques.",
        "Sector ISACs share actor targeting information between peer organisations.",
      ],
    },
    diagram: {
      title: 'Threat actor landscape mapped to capability and motivation',
      caption:
        'Resources determine how long they can persist; motivation determines what they do once inside.',
      columns: [
        [
          { id: 'nation', label: 'Nation-State / APT', sub: 'espionage, disruption', tone: 'danger', icon: 'Landmark' },
          { id: 'crime', label: 'Organised Crime', sub: 'financial gain', tone: 'danger', icon: 'Banknote' },
          { id: 'hack', label: 'Hacktivist', sub: 'ideology, publicity', tone: 'warn', icon: 'Megaphone' },
          { id: 'insider', label: 'Insider', sub: 'revenge, profit, negligence', tone: 'warn', icon: 'UserMinus' },
          { id: 'kiddie', label: 'Unskilled Attacker', sub: 'opportunity, notoriety', tone: 'neutral', icon: 'MousePointerClick' },
        ],
        [
          { id: 'vector', label: 'Attack Vectors', sub: 'phishing, exposure, supply chain', tone: 'violet', icon: 'Crosshair' },
        ],
        [
          { id: 'org', label: 'Your Organisation', sub: 'people, data, systems', tone: 'primary', icon: 'Building2' },
        ],
        [
          { id: 'impact', label: 'Impact', sub: 'data loss, downtime, fines, brand', tone: 'danger', icon: 'TrendingDown' },
        ],
      ],
      edges: [
        { from: 'nation', to: 'vector', tone: 'danger', animated: true },
        { from: 'crime', to: 'vector', tone: 'danger', animated: true },
        { from: 'hack', to: 'vector', tone: 'warn' },
        { from: 'insider', to: 'org', label: 'already inside', tone: 'warn', animated: true },
        { from: 'kiddie', to: 'vector', tone: 'neutral' },
        { from: 'vector', to: 'org', tone: 'violet', animated: true },
        { from: 'org', to: 'impact', tone: 'danger' },
      ],
      legend: [
        { tone: 'danger', label: 'High capability' },
        { tone: 'warn', label: 'Moderate capability' },
      ],
    },
    realWorld: {
      title: 'Ransomware became a business, not a hobby',
      body:
        "Modern extortion crews operate like software companies. A core group develops the encryptor and runs the leak site; affiliates buy access to the platform and take a percentage; initial access brokers sell footholds they obtained separately; negotiators handle the victim conversation in fluent business English. This specialisation is why the volume is so high — you do not need to be a skilled developer to run a campaign, you just need to rent the tooling. Defensively it means the same techniques appear across wildly different victims, which is exactly what makes behaviour-based detection effective.",
      takeaway: 'Attacker specialisation means common techniques. Detect the technique, not the group.',
    },
    attack: {
      title: 'The insider who was leaving anyway',
      intro:
        'Insider incidents cluster around resignation and termination, and they rarely involve any hacking at all.',
      steps: [
        { label: 'Trigger', detail: 'An employee accepts a role at a competitor and gives notice, or is passed over for promotion.' },
        { label: 'Collection', detail: 'Over several weeks they download customer lists, pricing models and design documents they already have legitimate access to.' },
        { label: 'Exfiltration', detail: 'Files leave via personal cloud storage, a USB drive, or forwarded email to a personal address.' },
        { label: 'Departure', detail: 'Accounts are disabled on the last day, but the data left weeks earlier.' },
        { label: 'Discovery', detail: 'Detected months later when a competitor launches a suspiciously similar product.' },
      ],
      mitigations: [
        'Data loss prevention on email, cloud upload and removable media, tuned for sensitive document classes.',
        'User and entity behaviour analytics to flag abnormal bulk access relative to a persons baseline.',
        'Trigger heightened monitoring on notice of resignation as part of the offboarding process.',
        'Least privilege and access recertification so employees do not accumulate access they no longer need.',
      ],
    },
    tools: [
      { name: 'MITRE ATT&CK Groups', what: 'Public catalogue of tracked adversary groups and their techniques.', why: 'Lets you pivot from an actor to the specific detections you need.', url: 'https://attack.mitre.org/groups/', category: 'Threat intel' },
      { name: 'MISP', what: 'Open source threat intelligence sharing platform.', why: 'How ISACs and CERTs exchange indicators and actor profiles.', url: 'https://www.misp-project.org/', category: 'Threat intel' },
      { name: 'Microsoft Purview Insider Risk', what: 'Insider risk analytics across mail, files and endpoints.', why: 'A representative example of behaviour-based insider detection.', url: 'https://learn.microsoft.com/purview/insider-risk-management', category: 'Insider threat' },
    ],
    links: [
      { label: 'MITRE ATT&CK — Groups', url: 'https://attack.mitre.org/groups/', source: 'MITRE' },
      { label: 'CISA — Insider Threat Mitigation', url: 'https://www.cisa.gov/topics/physical-security/insider-threat-mitigation', source: 'CISA' },
      { label: 'Verizon Data Breach Investigations Report', url: 'https://www.verizon.com/business/resources/reports/dbir/', source: 'Verizon' },
    ],
    quiz: [
      {
        q: 'Which threat actor characteristic most distinguishes a nation-state actor from organised crime?',
        options: [
          'Nation-state actors always use malware',
          'Nation-state actors have far greater resources and are willing to maintain access for years without monetising it',
          'Organised crime never targets large enterprises',
          'Nation-state actors only attack government systems',
        ],
        answer: 1,
        explain:
          'Funding, patience and tolerance for long dwell time define APT activity. Criminal groups need a return on investment quickly.',
      },
      {
        q: 'An employee uses a personal file-sharing account to move work documents because the approved tool is slow. What is this?',
        options: ['Hacktivism', 'Shadow IT', 'Advanced persistent threat', 'Supply chain attack'],
        answer: 1,
        explain: 'Shadow IT is unsanctioned technology adopted by employees. There is no malicious intent, but the data is now outside all monitoring and controls.',
      },
      {
        q: 'Which factor makes insider threats particularly difficult to detect?',
        options: [
          'Insiders use zero-day exploits',
          'Their activity often uses legitimate access and resembles normal work',
          'Insiders always work at night',
          'Insiders bypass all logging',
        ],
        answer: 1,
        explain: 'Because the access is authorised, only deviation from behavioural baselines distinguishes malicious from routine activity.',
      },
    ],
    examTip:
      'Compare actors on: internal vs external, level of sophistication, resources and funding, and motivation (data exfiltration, espionage, service disruption, blackmail, financial gain, philosophical or political belief, ethical, revenge, disruption, war).',
  },
  {
    slug: 'malware-types',
    title: 'Malware Taxonomy',
    domain: 2,
    objective: '2.4 Analyze indicators of malicious activity',
    tagline: 'Virus, worm, trojan, RAT, rootkit, logic bomb — classified by how they spread and what they do.',
    difficulty: 'Beginner',
    minutes: 12,
    keywords: ['malware', 'virus', 'worm', 'trojan', 'rootkit', 'rat', 'keylogger', 'spyware', 'logic bomb', 'fileless', 'bloatware'],
    simple: {
      what:
        "Malware is any software written to cause harm. The classic categories describe propagation and payload. A virus needs a host file and a user to run it. A worm spreads itself across a network with no user action. A trojan pretends to be something useful. A rootkit hides at a deep level of the operating system. A RAT gives remote control. Spyware and keyloggers steal information. A logic bomb waits for a condition before triggering.",
      why:
        "The category tells you how to respond. A worm means containment and network segmentation now. A trojan means user awareness and application control. A rootkit means you probably cannot trust the machine at all and must rebuild it.",
      how: [
        "Virus: attaches to a file or document, executes when the host runs, then infects further files.",
        "Worm: self-propagating, exploits network services, can traverse an estate in minutes.",
        "Trojan: relies on deception. RATs are trojans that provide interactive remote control.",
        "Rootkit and bootkit: subvert the OS or boot process so tools running on the host report false results. UEFI Secure Boot and measured boot defend this layer.",
        "Fileless malware lives in memory and abuses legitimate binaries such as PowerShell and WMI — nothing to scan on disk.",
        "Potentially unwanted programs and bloatware are not strictly malicious but expand the attack surface.",
      ],
      where: [
        "Endpoint detection and response is the primary defence, backed by application allow-listing.",
        "Sandboxes detonate suspicious attachments before they reach users.",
        "Threat hunting looks for behaviour — unusual parent-child process chains, not file names.",
      ],
    },
    diagram: {
      title: 'Malware classification by propagation and payload',
      caption:
        'Propagation determines containment strategy. Payload determines impact and recovery.',
      columns: [
        [
          { id: 'user', label: 'Requires User Action', sub: 'virus, trojan', tone: 'warn', icon: 'MousePointerClick' },
          { id: 'auto', label: 'Self-Propagating', sub: 'worm', tone: 'danger', icon: 'Waypoints' },
          { id: 'stealth', label: 'Stealth / Persistence', sub: 'rootkit, bootkit, fileless', tone: 'violet', icon: 'Ghost' },
        ],
        [{ id: 'exec', label: 'Execution on Host', sub: 'payload runs', tone: 'primary', icon: 'Terminal' }],
        [
          { id: 'steal', label: 'Steal', sub: 'spyware, keylogger, infostealer', tone: 'danger', icon: 'Eye' },
          { id: 'control', label: 'Control', sub: 'RAT, botnet agent, C2 beacon', tone: 'danger', icon: 'Joystick' },
          { id: 'destroy', label: 'Destroy / Extort', sub: 'ransomware, wiper, logic bomb', tone: 'danger', icon: 'Bomb' },
        ],
        [{ id: 'detect', label: 'Detection Surface', sub: 'EDR telemetry, network C2, anomalies', tone: 'safe', icon: 'Radar' }],
      ],
      edges: [
        { from: 'user', to: 'exec', tone: 'warn', animated: true },
        { from: 'auto', to: 'exec', tone: 'danger', animated: true },
        { from: 'stealth', to: 'exec', tone: 'violet', animated: true },
        { from: 'exec', to: 'steal', tone: 'danger' },
        { from: 'exec', to: 'control', tone: 'danger' },
        { from: 'exec', to: 'destroy', tone: 'danger' },
        { from: 'control', to: 'detect', label: 'beacon pattern', tone: 'safe' },
        { from: 'steal', to: 'detect', label: 'anomalous access', tone: 'safe' },
      ],
      legend: [
        { tone: 'danger', label: 'Malicious behaviour' },
        { tone: 'safe', label: 'Defender visibility' },
      ],
    },
    visual: 'malware',
    realWorld: {
      title: 'A worm that crossed the world in a morning',
      body:
        "Self-propagating malware that exploits a widely deployed network service does not need anyone to click anything. Historic outbreaks have spread through hundreds of thousands of hosts within hours, taking down hospitals, logistics networks and manufacturing lines as collateral damage. What stopped the spread in practice was not antivirus — it was network segmentation, blocking the vulnerable protocol at internal boundaries, and emergency patching. That is why the standard hardening advice to disable legacy SMBv1 and restrict east-west traffic exists: it removes the highway a worm needs.",
      takeaway: 'Against worms, segmentation and patching matter more than signatures.',
    },
    attack: {
      title: 'A fileless intrusion that never writes malware to disk',
      intro:
        'Living-off-the-land techniques abuse trusted, signed system binaries so traditional file scanning finds nothing.',
      steps: [
        { label: 'Delivery', detail: 'A macro-enabled document or a malicious shortcut launches a script interpreter with an encoded command line.' },
        { label: 'In-memory payload', detail: 'The script downloads shellcode directly into memory. No executable is ever written to the filesystem.' },
        { label: 'Persistence', detail: 'A WMI event subscription or scheduled task re-launches the loader at boot — again, no malicious file.' },
        { label: 'Credential theft', detail: 'Signed system utilities are abused to dump process memory containing credentials.' },
        { label: 'Command and control', detail: 'Beacons blend into normal HTTPS traffic to a reputable cloud hosting provider.' },
      ],
      mitigations: [
        'Enable script block logging and command line auditing so encoded commands are visible.',
        'Use EDR that detects behaviour and process lineage rather than only file signatures.',
        'Apply application control (WDAC, AppLocker) and constrained language mode for scripting.',
        'Restrict and monitor WMI persistence and unusual scheduled task creation.',
      ],
    },
    tools: [
      { name: 'VirusTotal', what: 'Aggregates dozens of antivirus engines and sandbox reports.', why: 'Fast triage of a suspicious file hash, URL or IP.', url: 'https://www.virustotal.com/', category: 'Analysis' },
      { name: 'Any.run / Cuckoo Sandbox', what: 'Interactive and automated malware sandboxes.', why: 'Observe behaviour safely — dropped files, registry changes, network callbacks.', url: 'https://any.run/', category: 'Sandbox' },
      { name: 'Sysinternals Suite', what: 'Process Explorer, Procmon, Autoruns from Microsoft.', why: 'The classic toolkit for spotting persistence and suspicious process trees on Windows.', url: 'https://learn.microsoft.com/sysinternals/', category: 'Host analysis' },
      { name: 'YARA', what: 'Pattern matching for malware families.', why: 'Write rules that hunt for malware traits across an estate.', url: 'https://virustotal.github.io/yara/', category: 'Hunting' },
    ],
    links: [
      { label: 'MITRE ATT&CK — Execution tactic', url: 'https://attack.mitre.org/tactics/TA0002/', source: 'MITRE' },
      { label: 'NIST SP 800-83 — Malware Incident Prevention and Handling', url: 'https://csrc.nist.gov/pubs/sp/800/83/r1/final', source: 'NIST' },
      { label: 'Microsoft — Fileless threats', url: 'https://learn.microsoft.com/defender-endpoint/malware/fileless-threats', source: 'Microsoft' },
    ],
    quiz: [
      {
        q: 'Malicious code spreads across an internal network overnight without any user opening a file. Which malware type is this?',
        options: ['Virus', 'Worm', 'Trojan', 'Logic bomb'],
        answer: 1,
        explain: 'Self-propagation without user interaction is the defining characteristic of a worm. A virus needs a host file and a user to execute it.',
      },
      {
        q: 'Which malware type is specifically designed to conceal its presence by subverting the operating system itself?',
        options: ['Spyware', 'Rootkit', 'Adware', 'Keylogger'],
        answer: 1,
        explain: 'Rootkits operate at kernel or firmware level so that tools running on the host return falsified results. Rebuilding is usually the only trustworthy remediation.',
      },
      {
        q: 'A finance system deletes records the day after a specific employee identifier is removed from payroll. What is this?',
        options: ['Worm', 'Logic bomb', 'Rootkit', 'Ransomware'],
        answer: 1,
        explain: 'A logic bomb is dormant code that triggers on a condition — a date, an event, or the absence of a record.',
      },
    ],
    examTip:
      'Anchor on the distinguishing trait: virus needs a host and a user, worm self-replicates over the network, trojan disguises itself, rootkit hides, RAT controls, keylogger records keystrokes, logic bomb waits for a trigger.',
  },
  {
    slug: 'ransomware',
    title: 'Ransomware & Extortion',
    domain: 2,
    objective: '2.4 Analyze indicators of malicious activity',
    tagline: 'Encryption as a weapon, and why backups alone no longer save you.',
    difficulty: 'Intermediate',
    minutes: 11,
    keywords: ['ransomware', 'double extortion', 'encryption', 'backup', 'immutable', 'leak site', 'raas', 'recovery'],
    simple: {
      what:
        "Ransomware encrypts your data and demands payment for the decryption key. Modern operations add double extortion — data is stolen before encryption, so refusing to pay means publication. Some go further with triple extortion: contacting your customers or launching DDoS to increase pressure.",
      why:
        "It is the most financially damaging category of attack for most organisations, and it is the one where preparation makes the biggest difference. The difference between a two-day recovery and a six-week disaster is decisions made long before the incident.",
      how: [
        "Entry is usually unremarkable: phishing, exposed RDP or VPN, an unpatched edge appliance, or purchased access from a broker.",
        "The operator spends days or weeks moving laterally, escalating privileges and mapping the environment.",
        "Backups, shadow copies and recovery points are destroyed first — this is the step that decides your fate.",
        "Data is exfiltrated for leverage, then the encryptor is deployed estate-wide, often via a management tool or group policy.",
      ],
      where: [
        "Hospitals, local government, manufacturing and logistics — sectors where downtime is intolerable and pressure to pay is highest.",
        "Managed service providers, because compromising one provider reaches all their customers at once.",
      ],
    },
    diagram: {
      title: 'Ransomware attack chain and the defensive break points',
      caption:
        'You do not have to stop the first step. Every link is an opportunity — and destroying backups is the loudest one.',
      columns: [
        [{ id: 'entry', label: 'Initial Access', sub: 'phish, exposed RDP, broker', tone: 'danger', icon: 'DoorOpen' }],
        [{ id: 'recon', label: 'Discovery & Escalation', sub: 'days to weeks of dwell', tone: 'danger', icon: 'Search' }],
        [{ id: 'exfil', label: 'Data Exfiltration', sub: 'leverage for extortion', tone: 'danger', icon: 'Upload' }],
        [{ id: 'kill', label: 'Destroy Backups', sub: 'shadow copies, backup server', tone: 'danger', icon: 'Trash2' }],
        [{ id: 'enc', label: 'Mass Encryption', sub: 'deployed via GPO / RMM', tone: 'danger', icon: 'Lock' }],
        [
          { id: 'immut', label: 'Immutable Backups', sub: 'offline / WORM copy survives', tone: 'safe', icon: 'ShieldCheck' },
          { id: 'restore', label: 'Recover', sub: 'rebuild, restore, verify', tone: 'safe', icon: 'RefreshCw' },
        ],
      ],
      edges: [
        { from: 'entry', to: 'recon', tone: 'danger', animated: true },
        { from: 'recon', to: 'exfil', tone: 'danger', animated: true },
        { from: 'exfil', to: 'kill', tone: 'danger', animated: true },
        { from: 'kill', to: 'enc', tone: 'danger', animated: true },
        { from: 'kill', to: 'immut', label: 'cannot reach offline copy', tone: 'safe' },
        { from: 'immut', to: 'restore', tone: 'safe', animated: true },
      ],
      legend: [
        { tone: 'danger', label: 'Attacker action' },
        { tone: 'safe', label: 'Defensive outcome' },
      ],
    },
    realWorld: {
      title: 'Why paying does not end the incident',
      body:
        "Organisations that pay still face a long recovery: decryptors supplied by criminals are often slow and buggy, some files never come back, and the environment is still compromised — the attacker still holds the credentials and the persistence they used to get in. Meanwhile the stolen data is already copied, so the confidentiality breach and its regulatory notification obligations remain regardless of payment. Insurers and regulators increasingly expect a documented decision process, and in some jurisdictions payment to sanctioned entities is itself illegal. The only reliable answer is tested recovery capability.",
      takeaway: 'Recovery capability, not payment capability, is the control that matters.',
    },
    attack: {
      title: 'Human-operated ransomware, end to end',
      intro:
        'Modern ransomware is hands-on-keyboard. That is a problem — but it also means weeks of detectable activity before the payload runs.',
      steps: [
        { label: 'Access', detail: 'Valid VPN credentials without MFA, bought from an initial access broker for a few hundred dollars.' },
        { label: 'Recon', detail: 'Domain enumeration and share mapping using built-in tools to stay quiet.' },
        { label: 'Escalate', detail: 'Credential dumping from a server, then reuse to reach a domain administrator account.' },
        { label: 'Stage', detail: 'Data compressed and uploaded to cloud storage over several nights to avoid volume alerts.' },
        { label: 'Neutralise', detail: 'Security tooling disabled, volume shadow copies deleted, backup jobs and repositories destroyed.' },
        { label: 'Detonate', detail: 'Encryptor pushed to every host through the management console during a weekend.' },
      ],
      mitigations: [
        'MFA on every remote access path — this alone removes the most common entry point.',
        'Immutable or air-gapped backups, tested by real restores, with backup infrastructure on separate credentials.',
        'Alert on shadow copy deletion, backup job modification and security tool tampering — these are high-fidelity signals.',
        'Segment the network and restrict administrative protocols to jump hosts.',
        'Maintain and rehearse an incident response plan including legal, communications and insurer contacts.',
      ],
    },
    tools: [
      { name: 'Veeam / Rubrik / immutable object storage', what: 'Backup platforms supporting immutability and air gap.', why: 'Backups the attacker cannot delete are the single most valuable ransomware control.', category: 'Recovery' },
      { name: 'No More Ransom', what: 'Free decryptor repository from law enforcement and industry.', why: 'Some families have recoverable keys — always check before considering payment.', url: 'https://www.nomoreransom.org/', category: 'Recovery' },
      { name: 'CISA Ransomware Readiness Assessment', what: 'Self-assessment tool for ransomware preparedness.', why: 'Produces a prioritised gap list mapped to practical actions.', url: 'https://www.cisa.gov/stopransomware/cyber-hygiene-services', category: 'Assessment' },
    ],
    links: [
      { label: 'CISA — StopRansomware Guide', url: 'https://www.cisa.gov/stopransomware/ransomware-guide', source: 'CISA' },
      { label: 'NIST IR 8374 — Ransomware Risk Management Profile', url: 'https://csrc.nist.gov/pubs/ir/8374/final', source: 'NIST' },
      { label: 'MITRE ATT&CK — Data Encrypted for Impact (T1486)', url: 'https://attack.mitre.org/techniques/T1486/', source: 'MITRE' },
    ],
    quiz: [
      {
        q: 'Why does an organisation with good backups still suffer a serious breach from double-extortion ransomware?',
        options: [
          'Backups slow down the encryption',
          'The data was stolen before encryption, so confidentiality is already lost and disclosure obligations still apply',
          'Backups cannot restore encrypted files',
          'Double extortion disables backup software',
        ],
        answer: 1,
        explain:
          'Restoring from backup solves availability. It does nothing about the copy the attacker already holds, which is the entire point of double extortion.',
      },
      {
        q: 'Which backup property most directly defeats ransomware that deletes recovery points?',
        options: ['Compression', 'Deduplication', 'Immutability / air gap', 'Incremental scheduling'],
        answer: 2,
        explain: 'An immutable or offline copy cannot be modified or deleted by a compromised account, so a clean restore point survives.',
      },
      {
        q: 'A SOC analyst sees vssadmin delete shadows executed on multiple servers within minutes. What should this be treated as?',
        options: [
          'Routine disk maintenance',
          'A high-confidence ransomware precursor requiring immediate containment',
          'A backup software update',
          'A false positive from the EDR',
        ],
        answer: 1,
        explain:
          'Bulk shadow copy deletion is a well-known pre-encryption step. It is one of the highest-fidelity ransomware indicators available.',
      },
    ],
    examTip:
      'Recovery objectives matter here: RTO (how fast you must be back), RPO (how much data you can afford to lose), MTTR and MTBF. Expect questions that connect ransomware to business continuity planning.',
  },
{
    slug: 'social-engineering-phishing',
    title: 'Social Engineering & Phishing',
    domain: 2,
    objective: '2.2 Explain common threat vectors and attack surfaces',
    tagline: 'The attack that targets the human operating system.',
    difficulty: 'Beginner',
    minutes: 11,
    keywords: ['phishing', 'spear phishing', 'whaling', 'vishing', 'smishing', 'pretexting', 'bec', 'watering hole', 'typosquatting', 'impersonation'],
    simple: {
      what:
        "Social engineering manipulates people into taking an action that harms security — clicking, approving, paying, or revealing. Phishing is social engineering by email; spear phishing targets a specific person; whaling targets executives; vishing uses voice calls; smishing uses SMS; pretexting invents a scenario to justify the request.",
      why:
        "It remains the most common initial access vector because it bypasses technical controls entirely. There is no patch for a person who genuinely believes their manager is asking them to do something urgent.",
      how: [
        "Attackers exploit predictable principles of influence: authority, urgency, scarcity, social proof, familiarity, fear and consensus.",
        "Business email compromise skips malware entirely — a convincing email requesting a payment redirect can cost millions with no technical indicator at all.",
        "Typosquatting and lookalike domains make the sender and the link appear legitimate at a glance.",
        "Watering hole attacks compromise a site the target group already trusts, so no lure is needed.",
      ],
      where: [
        "Finance and payroll teams are the highest-value targets for BEC and invoice fraud.",
        "Help desks are targeted for MFA resets — a growing technique behind several major breaches.",
        "Physical social engineering: tailgating through a door, or dropping USB devices in a car park.",
      ],
    },
    diagram: {
      title: 'Phishing to account takeover, and where controls interrupt it',
      caption: 'Six stages, five places to break the chain. You do not need to win at stage one.',
      columns: [
        [{ id: 'recon', label: 'Reconnaissance', sub: 'LinkedIn, breach data, org chart', tone: 'warn', icon: 'Search' }],
        [{ id: 'lure', label: 'Lure Delivered', sub: 'urgent email from the CFO', tone: 'danger', icon: 'Mail' }],
        [{ id: 'gate1', label: 'Email Security', sub: 'SPF/DKIM/DMARC, sandboxing', tone: 'safe', icon: 'ShieldCheck' }],
        [{ id: 'click', label: 'User Clicks', sub: 'lookalike login page', tone: 'danger', icon: 'MousePointerClick' }],
        [{ id: 'creds', label: 'Credentials Captured', sub: 'plus real-time OTP relay', tone: 'danger', icon: 'KeyRound' }],
        [
          { id: 'mfa', label: 'FIDO2 Blocks Reuse', sub: 'origin binding', tone: 'safe', icon: 'Fingerprint' },
          { id: 'ato', label: 'Account Takeover', sub: 'mail rules, payment fraud', tone: 'danger', icon: 'UserX' },
        ],
      ],
      edges: [
        { from: 'recon', to: 'lure', tone: 'warn', animated: true },
        { from: 'lure', to: 'gate1', label: 'inspected', tone: 'safe', animated: true },
        { from: 'gate1', to: 'click', label: 'if it gets through', tone: 'danger', animated: true },
        { from: 'click', to: 'creds', tone: 'danger', animated: true },
        { from: 'creds', to: 'mfa', label: 'phishing-resistant MFA', tone: 'safe' },
        { from: 'creds', to: 'ato', label: 'weak or no MFA', tone: 'danger' },
      ],
      legend: [
        { tone: 'danger', label: 'Attack path' },
        { tone: 'safe', label: 'Control interrupts' },
      ],
    },
    realWorld: {
      title: 'Business email compromise: the quiet multi-million dollar fraud',
      body:
        "A finance clerk receives an email that appears to come from a known supplier, referencing a real open invoice, explaining that bank details have changed. The email thread looks genuine because the attacker had already compromised the supplier mailbox and has been reading the conversation for weeks. There is no malware, no malicious link, nothing for a scanner to flag. The payment goes out and is layered through mule accounts within hours. BEC consistently causes higher aggregate losses than ransomware, and the only reliable control is a process one: out-of-band verification of any bank detail change, using a phone number you already had on file.",
      takeaway: 'Some of the most expensive attacks contain no technical indicator whatsoever. Process controls carry the load.',
    },
    attack: {
      title: 'Help desk social engineering for an MFA reset',
      intro:
        'Attackers increasingly bypass technology by convincing a human to hand over the keys — and help desks are optimised to be helpful.',
      steps: [
        { label: 'Target selection', detail: 'A staff member with useful access is identified from public profiles and a leaked directory.' },
        { label: 'Pretext build', detail: 'The attacker gathers employee ID, manager name and start date from breach data and public sources.' },
        { label: 'The call', detail: 'Posing as the employee travelling abroad with a broken phone, they create urgency and mild sympathy.' },
        { label: 'Reset', detail: 'The agent, following a policy written for convenience, registers a new MFA device.' },
        { label: 'Access', detail: 'The attacker signs in with full legitimate credentials and MFA. Every control reports success.' },
      ],
      mitigations: [
        'Require identity proofing for MFA resets — video verification, manager approval, or an in-person check.',
        'Alert security operations on every MFA method change, especially outside business hours.',
        'Train help desk staff specifically on pretexting and give them explicit permission to say no and escalate.',
        'Use number matching and restrict registration of new authenticators to trusted networks or managed devices.',
      ],
    },
    tools: [
      { name: 'GoPhish', what: 'Open source phishing simulation framework.', why: 'Run authorised awareness campaigns and measure real click and report rates.', url: 'https://getgophish.com/', category: 'Awareness' },
      { name: 'Social-Engineer Toolkit (SET)', what: 'Framework for authorised social engineering testing.', why: 'Demonstrates how quickly a convincing credential harvester can be built.', url: 'https://github.com/trustedsec/social-engineer-toolkit', category: 'Offensive testing' },
      { name: 'DMARC / SPF / DKIM analysers', what: 'Email authentication configuration checkers.', why: 'Prevent attackers spoofing your own domain to your own staff.', url: 'https://dmarc.org/', category: 'Email security' },
      { name: 'urlscan.io', what: 'Sandboxed URL inspection and screenshotting.', why: 'Safely see what a suspicious link actually serves.', url: 'https://urlscan.io/', category: 'Analysis' },
    ],
    links: [
      { label: 'CISA — Avoiding Social Engineering and Phishing Attacks', url: 'https://www.cisa.gov/news-events/news/avoiding-social-engineering-and-phishing-attacks', source: 'CISA' },
      { label: 'FBI IC3 — Business Email Compromise', url: 'https://www.ic3.gov/', source: 'FBI IC3' },
      { label: 'MITRE ATT&CK — Phishing (T1566)', url: 'https://attack.mitre.org/techniques/T1566/', source: 'MITRE' },
      { label: 'NIST — Phishing resources', url: 'https://www.nist.gov/itl/applied-cybersecurity/nice/resources/online-learning-content', source: 'NIST' },
    ],
    quiz: [
      {
        q: 'An email appears to come from the CEO asking an accounts clerk to urgently process a wire transfer to a new supplier. There is no attachment or link. What is this?',
        options: ['Spear phishing / business email compromise', 'Watering hole attack', 'Smishing', 'Typosquatting'],
        answer: 0,
        explain:
          'It is a targeted email impersonating a trusted authority to trigger a financial action — spear phishing in the form of business email compromise. No malicious payload is needed.',
      },
      {
        q: 'Which control most reliably prevents invoice redirection fraud?',
        options: [
          'Antivirus on the mail server',
          'Out-of-band verification of bank detail changes using previously known contact details',
          'Longer password policy',
          'Blocking all external email',
        ],
        answer: 1,
        explain: 'BEC contains no malware, so technical scanning cannot catch it. A verification process using a channel the attacker does not control is the effective control.',
      },
      {
        q: 'Attackers compromise an industry news site that many employees of a target company read daily. What is this technique called?',
        options: ['Whaling', 'Watering hole attack', 'Vishing', 'Pharming'],
        answer: 1,
        explain: 'A watering hole attack compromises a site the intended victims already trust and visit, so no lure needs to be sent to them.',
      },
    ],
    examTip:
      'Memorise the channel words: phishing = email, vishing = voice, smishing = SMS, whaling = executives, pharming = DNS redirection to a fake site, pretexting = invented scenario, tailgating = physical entry, shoulder surfing = observing, dumpster diving = discarded information.',
  },
  {
    slug: 'password-attacks',
    title: 'Password Attacks',
    domain: 2,
    objective: '2.4 Analyze indicators of malicious activity',
    tagline: 'Brute force, spraying, stuffing, rainbow tables — and why lockouts help attackers too.',
    difficulty: 'Beginner',
    minutes: 9,
    keywords: ['brute force', 'password spraying', 'credential stuffing', 'dictionary attack', 'rainbow table', 'pass the hash', 'kerberoasting'],
    simple: {
      what:
        "Password attacks try to obtain or guess a credential. Brute force tries every combination. Dictionary attacks use likely words and mutations. Password spraying tries one common password against many accounts to avoid lockout. Credential stuffing replays username and password pairs from other breaches. Pass-the-hash reuses a stolen hash without ever cracking it.",
      why:
        "Passwords are still the primary authentication method for most systems, and humans choose predictable ones. Understanding which attack is happening tells you which control to reach for.",
      how: [
        "Online attacks hit a live service and are limited by rate limiting, lockout and monitoring.",
        "Offline attacks run against a stolen hash database with no such limits — only the cost of the hash function protects you.",
        "Spraying deliberately stays under lockout thresholds, which is why lockout policy alone is not detection.",
        "Kerberoasting requests service tickets from Active Directory and cracks them offline, targeting service accounts with weak passwords.",
      ],
      where: [
        "Exposed VPN, RDP, webmail and cloud identity portals are the primary online targets.",
        "Active Directory environments are targeted with pass-the-hash, pass-the-ticket and Kerberoasting.",
      ],
    },
    diagram: {
      title: 'Online versus offline password attack paths',
      caption:
        'Once the hash database leaves your network, none of your rate limits apply. Only the KDF cost and MFA still protect you.',
      columns: [
        [{ id: 'atk', label: 'Attacker', tone: 'danger', icon: 'UserX' }],
        [
          { id: 'online', label: 'Online Attack', sub: 'against a live login', tone: 'warn', icon: 'Globe' },
          { id: 'offline', label: 'Offline Attack', sub: 'against a stolen hash dump', tone: 'danger', icon: 'HardDrive' },
        ],
        [
          { id: 'limits', label: 'Rate Limit / Lockout / MFA', sub: 'defender advantage', tone: 'safe', icon: 'ShieldCheck' },
          { id: 'gpu', label: 'GPU Cracking Rig', sub: 'billions of guesses per second', tone: 'danger', icon: 'Cpu' },
        ],
        [
          { id: 'spray', label: 'Password Spraying', sub: 'one password, many accounts', tone: 'warn', icon: 'SprayCan' },
          { id: 'crack', label: 'Recovered Passwords', sub: 'if fast hash or no salt', tone: 'danger', icon: 'KeyRound' },
        ],
        [{ id: 'ato', label: 'Account Takeover', tone: 'danger', icon: 'DoorOpen' }],
      ],
      edges: [
        { from: 'atk', to: 'online', tone: 'warn', animated: true },
        { from: 'atk', to: 'offline', tone: 'danger', animated: true },
        { from: 'online', to: 'limits', tone: 'safe' },
        { from: 'online', to: 'spray', label: 'evades lockout', tone: 'warn', animated: true },
        { from: 'offline', to: 'gpu', tone: 'danger', animated: true },
        { from: 'gpu', to: 'crack', tone: 'danger' },
        { from: 'spray', to: 'ato', tone: 'danger' },
        { from: 'crack', to: 'ato', tone: 'danger' },
      ],
      legend: [
        { tone: 'safe', label: 'Defender control' },
        { tone: 'danger', label: 'Attacker capability' },
      ],
    },
    realWorld: {
      title: 'Why password spraying beats brute force in the real world',
      body:
        "A brute force attack against one account triggers lockout after five attempts and generates an obvious alert. So attackers invert it: take a list of ten thousand valid usernames — easy to derive from a predictable email format — and try one seasonal password such as the current month and year against every one of them, then wait an hour and try the next. Each account sees a single failure, well under any lockout threshold, and to a naive log review it looks like ordinary user error. Detection requires correlating failures horizontally across accounts, not vertically per account. Most SIEM deployments do not do this by default, which is precisely why the technique still works.",
      takeaway: 'Detect the pattern across the tenant, not the failures on one account.',
    },
    attack: {
      title: 'Pass-the-hash lateral movement',
      intro:
        'In Windows environments the attacker often does not need the password at all — the hash itself is a valid authenticator.',
      steps: [
        { label: 'Local admin on one host', detail: 'The attacker obtains administrative rights on a single workstation.' },
        { label: 'Dump credentials', detail: 'Hashes and Kerberos tickets for any account that logged into that machine are extracted from memory.' },
        { label: 'Reuse the hash', detail: 'NTLM authentication accepts the hash directly — no cracking required.' },
        { label: 'Spread', detail: 'Any other machine where that account is a local administrator is now accessible.' },
        { label: 'Escalate', detail: 'Eventually a domain administrator hash is captured from a server they logged into.' },
      ],
      mitigations: [
        'Tiered administration: never log privileged accounts into lower-trust workstations.',
        'Enable Credential Guard and LSA protection; disable NTLM where possible.',
        'Use unique local administrator passwords per host (LAPS).',
        'Alert on lateral authentication patterns and abnormal admin logons.',
      ],
    },
    tools: [
      { name: 'Hashcat', what: 'GPU password recovery.', why: 'Authorised auditing of your own hash dumps to measure real password strength.', url: 'https://hashcat.net/hashcat/', category: 'Offensive testing' },
      { name: 'Hydra / Medusa', what: 'Online login brute-forcers.', why: 'Used in penetration tests to demonstrate exposure of internet-facing services.', url: 'https://github.com/vanhauser-thc/thc-hydra', category: 'Offensive testing' },
      { name: 'Have I Been Pwned', what: 'Breach and password exposure database with an API.', why: 'Screen new passwords against known-breached corpora at registration time.', url: 'https://haveibeenpwned.com/', category: 'Defensive' },
      { name: 'Microsoft LAPS', what: 'Randomises and rotates local administrator passwords.', why: 'Breaks the most common pass-the-hash lateral movement path.', url: 'https://learn.microsoft.com/windows-server/identity/laps/laps-overview', category: 'Hardening' },
    ],
    links: [
      { label: 'NIST SP 800-63B — Password guidance', url: 'https://pages.nist.gov/800-63-3/sp800-63b.html', source: 'NIST' },
      { label: 'MITRE ATT&CK — Brute Force (T1110)', url: 'https://attack.mitre.org/techniques/T1110/', source: 'MITRE' },
      { label: 'Microsoft — Mitigating Pass-the-Hash', url: 'https://www.microsoft.com/en-us/download/details.aspx?id=36036', source: 'Microsoft' },
    ],
    quiz: [
      {
        q: 'Authentication logs show a single failed login for hundreds of different accounts from one IP within ten minutes. What is happening?',
        options: ['Brute force attack', 'Password spraying', 'Credential stuffing', 'Rainbow table attack'],
        answer: 1,
        explain:
          'One password tried across many accounts is spraying. It is designed to stay below lockout thresholds, which is why per-account detection misses it.',
      },
      {
        q: 'Which control specifically defeats rainbow table attacks?',
        options: ['Account lockout', 'Unique per-user salt', 'Longer session timeouts', 'TLS encryption'],
        answer: 1,
        explain: 'Salting means precomputed digest tables are useless because every user hash is computed over different input.',
      },
      {
        q: 'Why is NIST SP 800-63B against forced periodic password rotation for user accounts?',
        options: [
          'Rotation is technically difficult',
          'Forced rotation drives predictable minor variations and weakens rather than strengthens passwords',
          'It conflicts with MFA',
          'It increases help desk automation',
        ],
        answer: 1,
        explain:
          'Evidence shows users respond to forced rotation with predictable patterns. NIST recommends rotating only on evidence of compromise, combined with length and breach screening.',
      },
    ],
    examTip:
      'Distinguish by shape of the log data: many passwords against one account = brute force; one password against many accounts = spraying; known valid pairs from other breaches = stuffing; no login attempts at all because the hash is reused = pass-the-hash.',
  },
  {
    slug: 'network-attacks',
    title: 'Network Attacks',
    domain: 2,
    objective: '2.4 Analyze indicators of malicious activity',
    tagline: 'DDoS, on-path, DNS poisoning, ARP spoofing, VLAN hopping and rogue devices.',
    difficulty: 'Intermediate',
    minutes: 12,
    keywords: ['ddos', 'dns poisoning', 'arp spoofing', 'on-path', 'mitm', 'replay', 'vlan hopping', 'rogue ap', 'evil twin', 'amplification'],
    simple: {
      what:
        "Network attacks target the infrastructure that moves data rather than the endpoints themselves. They fall into three families: denial of service (make it unavailable), interception (get in the middle of a conversation) and spoofing (pretend to be a legitimate network entity).",
      why:
        "Networks were largely designed for a trusted environment. ARP, DNS and DHCP have no authentication by default, and that legacy trust is what most of these attacks exploit.",
      how: [
        "Volumetric DDoS overwhelms bandwidth, often amplified through open DNS, NTP or memcached servers that reply with far more data than the request.",
        "ARP spoofing sends forged replies on a local segment so traffic flows through the attacker — the classic on-path position.",
        "DNS poisoning or hijacking sends victims to attacker infrastructure while the address bar still looks correct.",
        "Evil twin access points imitate a legitimate SSID; VLAN hopping abuses trunking or double tagging to reach segments that should be isolated.",
        "Replay attacks capture valid traffic and resend it; nonces, timestamps and sequence numbers defeat them.",
      ],
      where: [
        "Public Wi-Fi is the natural habitat of evil twins and on-path attacks.",
        "Internet-facing services need upstream DDoS scrubbing because on-premises capacity is finite.",
        "Campus networks need dynamic ARP inspection, DHCP snooping and port security.",
      ],
    },
    diagram: {
      title: 'On-path (man-in-the-middle) attack via ARP spoofing',
      caption:
        'Both victim and gateway update their ARP caches with the attacker MAC address. Traffic flows through the attacker with nothing visibly wrong.',
      columns: [
        [{ id: 'victim', label: 'Victim Host', sub: '10.0.0.20', tone: 'primary', icon: 'Laptop' }],
        [{ id: 'attacker', label: 'Attacker', sub: 'forged ARP replies', tone: 'danger', icon: 'UserX' }],
        [{ id: 'gw', label: 'Gateway', sub: '10.0.0.1', tone: 'neutral', icon: 'Router' }],
        [
          { id: 'read', label: 'Traffic Read / Modified', sub: 'credentials, session tokens', tone: 'danger', icon: 'Eye' },
          { id: 'tls', label: 'TLS + HSTS', sub: 'content stays protected', tone: 'safe', icon: 'Lock' },
          { id: 'dai', label: 'Dynamic ARP Inspection', sub: 'drops forged replies', tone: 'safe', icon: 'ShieldCheck' },
        ],
      ],
      edges: [
        { from: 'victim', to: 'attacker', label: 'thinks this is the gateway', tone: 'danger', animated: true },
        { from: 'attacker', to: 'gw', label: 'relays onward', tone: 'danger', animated: true },
        { from: 'attacker', to: 'read', tone: 'danger' },
        { from: 'read', to: 'tls', label: 'mitigated by', tone: 'safe' },
        { from: 'attacker', to: 'dai', label: 'blocked by', tone: 'safe' },
      ],
      legend: [
        { tone: 'danger', label: 'Attack path' },
        { tone: 'safe', label: 'Mitigation' },
      ],
    },
    visual: 'network',
    realWorld: {
      title: 'DNS hijacking at the registrar, not the server',
      body:
        "Some of the most effective attacks never touch the target network. By compromising the account at a domain registrar or DNS provider, an attacker repoints the domain to their own servers, obtains a genuine TLS certificate through automated domain validation — because they now legitimately control the domain — and intercepts everything, complete with a valid padlock. Customers see nothing wrong. Defence lives at the registrar: registry lock, MFA on the registrar account, DNSSEC, CAA records restricting which CAs may issue for your domain, and monitoring certificate transparency logs for certificates you did not request.",
      takeaway: 'Your DNS registrar account is a tier-zero asset. Treat it like a domain controller.',
    },
    attack: {
      title: 'Evil twin access point on a conference network',
      intro:
        'Wireless clients trust SSID names. That is the entire vulnerability.',
      steps: [
        { label: 'Recon', detail: 'The attacker observes the legitimate SSID and the security mode in use.' },
        { label: 'Clone', detail: 'A rogue access point broadcasts the same SSID with a stronger signal from closer range.' },
        { label: 'Deauth or wait', detail: 'Clients are disconnected or simply roam to the stronger signal automatically.' },
        { label: 'Captive portal', detail: 'A convincing login page harvests corporate credentials.' },
        { label: 'Intercept', detail: 'All unencrypted traffic is readable; attempts are made to strip TLS on sites without HSTS.' },
      ],
      mitigations: [
        'Use WPA3-Enterprise with certificate-based EAP-TLS so clients validate the server, not just the SSID.',
        'Deploy wireless intrusion detection to spot rogue and duplicate SSIDs.',
        'Enforce always-on VPN and HSTS so intercepted traffic remains encrypted.',
        'Train users never to enter corporate credentials into a Wi-Fi portal.',
      ],
    },
    tools: [
      { name: 'Wireshark', what: 'Deep packet capture and protocol analysis.', why: 'See ARP storms, DNS anomalies and plaintext credentials for yourself.', url: 'https://www.wireshark.org/', category: 'Analysis' },
      { name: 'Nmap', what: 'Network discovery and port scanning.', why: 'Establishes what is actually exposed, which is the starting point for any network assessment.', url: 'https://nmap.org/', category: 'Discovery' },
      { name: 'Ettercap / Bettercap', what: 'On-path attack frameworks.', why: 'Demonstrate ARP spoofing in a lab so the defence makes sense.', url: 'https://www.bettercap.org/', category: 'Offensive testing' },
      { name: 'Cloudflare / Akamai DDoS protection', what: 'Upstream scrubbing and anycast absorption.', why: 'Volumetric attacks must be stopped before they reach your link.', url: 'https://www.cloudflare.com/ddos/', category: 'Availability' },
    ],
    links: [
      { label: 'CISA — Understanding Denial-of-Service Attacks', url: 'https://www.cisa.gov/news-events/news/understanding-denial-service-attacks', source: 'CISA' },
      { label: 'MITRE ATT&CK — Adversary-in-the-Middle (T1557)', url: 'https://attack.mitre.org/techniques/T1557/', source: 'MITRE' },
      { label: 'NIST SP 800-81 — Secure DNS Deployment Guide', url: 'https://csrc.nist.gov/pubs/sp/800/81/r2/final', source: 'NIST' },
    ],
    quiz: [
      {
        q: 'An attacker sends forged ARP replies so that a victim host associates the gateway IP address with the attacker MAC address. What is the result?',
        options: [
          'The victim loses network connectivity entirely',
          'The attacker gains an on-path position and can read or modify traffic',
          'The gateway is denied service',
          'DNS records are permanently changed',
        ],
        answer: 1,
        explain: 'ARP spoofing places the attacker in the traffic path. Dynamic ARP Inspection with DHCP snooping is the standard switch-level mitigation.',
      },
      {
        q: 'Which attack uses third-party servers to multiply the volume of traffic directed at a victim?',
        options: ['Amplification DDoS', 'SYN flood', 'Replay attack', 'VLAN hopping'],
        answer: 0,
        explain:
          'Amplification abuses protocols where a small request produces a large reply, with the source address spoofed to the victim. DNS, NTP and memcached are common vehicles.',
      },
      {
        q: 'Which control best protects against a replay attack?',
        options: ['Longer encryption keys', 'Nonces, timestamps or sequence numbers in the protocol', 'Port security', 'Increased bandwidth'],
        answer: 1,
        explain: 'Replay protection requires the receiver to recognise that a valid-looking message has already been seen, which needs a one-time or time-bound value.',
      },
    ],
    examTip:
      'Group them mentally: availability attacks (DDoS, amplification, SYN flood), interception attacks (on-path, evil twin, SSL stripping) and spoofing attacks (ARP, DNS, MAC, DHCP). The mitigation usually adds authentication to a protocol that never had it.',
  },
{
    slug: 'application-attacks',
    title: 'Application Attacks',
    domain: 2,
    objective: '2.3 Explain various types of vulnerabilities',
    tagline: 'Injection, XSS, CSRF, buffer overflow and race conditions — where code meets untrusted input.',
    difficulty: 'Intermediate',
    minutes: 13,
    keywords: ['sql injection', 'xss', 'csrf', 'buffer overflow', 'race condition', 'toctou', 'directory traversal', 'ssrf', 'deserialization', 'owasp'],
    simple: {
      what:
        "Application attacks exploit flaws in how software handles input, state or memory. SQL injection makes the database execute attacker-supplied commands. Cross-site scripting makes the victim browser execute attacker JavaScript. Buffer overflow writes past the end of an allocation and corrupts memory. Race conditions exploit the gap between checking a condition and using the result.",
      why:
        "Applications are the largest attack surface most organisations expose to the internet, and almost every one of these flaws comes down to the same root cause: data supplied by an untrusted party was treated as trusted code, structure or state.",
      how: [
        "SQL injection: prevented by parameterised queries and prepared statements — never by string escaping or blocklists.",
        "XSS: stored, reflected or DOM-based. Prevented by contextual output encoding plus a strict Content Security Policy.",
        "CSRF: the browser sends cookies automatically, so a hostile page can trigger authenticated actions. Prevented with anti-CSRF tokens and SameSite cookies.",
        "Buffer overflow: possible in memory-unsafe languages. Mitigated by ASLR, DEP/NX, stack canaries and increasingly by memory-safe languages.",
        "SSRF makes the server issue requests on the attacker behalf, often to internal metadata endpoints — a leading cause of cloud credential theft.",
      ],
      where: [
        "The OWASP Top 10 is the standard reference for web application risk categories.",
        "Secure software development lifecycle: threat modelling, SAST, DAST, dependency scanning and code review.",
        "Web application firewalls provide virtual patching while the real fix is developed.",
      ],
    },
    diagram: {
      title: 'SQL injection — and why parameterisation stops it',
      caption:
        'The vulnerability is not the quote character. It is that user data and query structure are concatenated into one string.',
      columns: [
        [{ id: 'input', label: 'User Input', sub: "' OR 1=1 --", tone: 'danger', icon: 'Keyboard' }],
        [
          { id: 'concat', label: 'String Concatenation', sub: 'data becomes code', tone: 'danger', icon: 'Link' },
          { id: 'param', label: 'Parameterised Query', sub: 'data stays data', tone: 'safe', icon: 'ShieldCheck' },
        ],
        [
          { id: 'dbbad', label: 'Database Executes', sub: 'authentication bypassed', tone: 'danger', icon: 'Database' },
          { id: 'dbok', label: 'Database Executes', sub: 'literal value, no match', tone: 'safe', icon: 'Database' },
        ],
        [
          { id: 'dump', label: 'Data Exfiltration', sub: 'entire table returned', tone: 'danger', icon: 'Download' },
          { id: 'deny', label: 'Login Rejected', tone: 'safe', icon: 'CircleX' },
        ],
      ],
      edges: [
        { from: 'input', to: 'concat', label: 'vulnerable code', tone: 'danger', animated: true },
        { from: 'input', to: 'param', label: 'secure code', tone: 'safe', animated: true },
        { from: 'concat', to: 'dbbad', tone: 'danger', animated: true },
        { from: 'param', to: 'dbok', tone: 'safe', animated: true },
        { from: 'dbbad', to: 'dump', tone: 'danger' },
        { from: 'dbok', to: 'deny', tone: 'safe' },
      ],
      legend: [
        { tone: 'danger', label: 'Vulnerable path' },
        { tone: 'safe', label: 'Secure path' },
      ],
    },
    realWorld: {
      title: 'SSRF and the cloud metadata service',
      body:
        "A web application feature that fetches a user-supplied URL — an image preview, a webhook tester, a PDF renderer — becomes catastrophic in cloud environments. The attacker supplies the link-local metadata address instead of a normal URL. The server, which is trusted by the metadata service, fetches temporary IAM credentials and returns them in the response. The attacker now holds valid cloud credentials for the instance role. This exact pattern has produced some of the largest cloud breaches on record. The fixes are layered: enforce IMDSv2 which requires a session token, apply strict egress rules from application servers, validate and allow-list destinations, and never grant an instance role more permission than it truly needs.",
      takeaway: 'In the cloud, an application flaw becomes an identity compromise. Scope instance roles tightly.',
    },
    attack: {
      title: 'Stored cross-site scripting to session takeover',
      intro:
        'Stored XSS is the most dangerous variant because the payload executes for every user who views the affected content.',
      steps: [
        { label: 'Injection', detail: 'The attacker posts a comment containing a script tag. The application stores it without encoding.' },
        { label: 'Execution', detail: 'Every subsequent visitor renders the comment, and the browser executes the script in the site origin.' },
        { label: 'Theft', detail: 'The script reads accessible session data or performs authenticated requests on the victim behalf.' },
        { label: 'Escalation', detail: 'When an administrator views the page, the script creates a new admin account through the application API.' },
        { label: 'Persistence', detail: 'The payload remains in the database, re-firing for every viewer until it is found and removed.' },
      ],
      mitigations: [
        'Contextual output encoding at render time — HTML, attribute, JavaScript and URL contexts each need different encoding.',
        'A strict Content Security Policy that forbids inline script execution.',
        'HttpOnly and Secure cookie flags with SameSite so session cookies are not readable by script.',
        'Input validation as defence in depth, plus a WAF for virtual patching while code is fixed.',
      ],
    },
    tools: [
      { name: 'Burp Suite', what: 'Intercepting proxy and web vulnerability scanner.', why: 'The de facto standard tool for manual web application testing.', url: 'https://portswigger.net/burp', category: 'Testing' },
      { name: 'OWASP ZAP', what: 'Free and open source web application scanner.', why: 'Fully featured alternative to Burp, easy to integrate into CI pipelines.', url: 'https://www.zaproxy.org/', category: 'Testing' },
      { name: 'sqlmap', what: 'Automated SQL injection detection and exploitation.', why: 'Demonstrates on authorised targets exactly how much a single injection point yields.', url: 'https://sqlmap.org/', category: 'Offensive testing' },
      { name: 'Semgrep / SonarQube', what: 'Static application security testing.', why: 'Catches injection and unsafe patterns in code review before deployment.', url: 'https://semgrep.dev/', category: 'SAST' },
    ],
    links: [
      { label: 'OWASP Top 10', url: 'https://owasp.org/www-project-top-ten/', source: 'OWASP' },
      { label: 'OWASP Cheat Sheet Series', url: 'https://cheatsheetseries.owasp.org/', source: 'OWASP' },
      { label: 'MITRE CWE Top 25 Most Dangerous Software Weaknesses', url: 'https://cwe.mitre.org/top25/', source: 'MITRE' },
      { label: 'AWS — Instance Metadata Service v2', url: 'https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/configuring-instance-metadata-service.html', source: 'AWS' },
    ],
    quiz: [
      {
        q: 'Which single technique most reliably prevents SQL injection?',
        options: [
          'Escaping single quotes in user input',
          'Using parameterised queries / prepared statements',
          'Blocking the word SELECT at the web application firewall',
          'Encrypting the database at rest',
        ],
        answer: 1,
        explain:
          'Parameterisation separates query structure from data at the driver level, so user input can never alter the statement regardless of its content. Escaping and blocklists are consistently bypassed.',
      },
      {
        q: 'A victim visits a malicious page which silently submits a form to a banking site where the victim is already logged in. What is this?',
        options: ['Cross-site scripting', 'Cross-site request forgery', 'SQL injection', 'Directory traversal'],
        answer: 1,
        explain:
          'CSRF abuses the browser automatically attaching credentials to requests. Anti-CSRF tokens and SameSite cookie attributes are the standard defences.',
      },
      {
        q: 'A file upload feature checks that a file is safe and then processes it a moment later, allowing an attacker to swap the file in between. What class of vulnerability is this?',
        options: ['Buffer overflow', 'Time-of-check to time-of-use race condition', 'Improper error handling', 'Insecure deserialization'],
        answer: 1,
        explain: 'TOCTOU race conditions exploit the window between validating a resource and acting on it. Atomic operations and locking are the mitigations.',
      },
    ],
    examTip:
      'Know the OWASP names and the one-line fix for each: injection = parameterise, XSS = encode output plus CSP, CSRF = tokens plus SameSite, traversal = canonicalise paths, overflow = memory safety plus ASLR/DEP, SSRF = allow-list plus egress control.',
  },
  {
    slug: 'vulnerability-management',
    title: 'Vulnerability Management, CVE & CVSS',
    domain: 2,
    objective: '4.3 Explain various activities associated with vulnerability management',
    tagline: 'Finding weaknesses at scale, and deciding which ones actually matter.',
    difficulty: 'Intermediate',
    minutes: 12,
    keywords: ['cve', 'cvss', 'cpe', 'kev', 'epss', 'scanning', 'false positive', 'remediation', 'patch management', 'sla'],
    simple: {
      what:
        "Vulnerability management is the continuous cycle of discovering, prioritising, remediating and verifying weaknesses across your estate. CVE gives every publicly known vulnerability a unique identifier. CVSS scores its technical severity from 0 to 10. EPSS estimates the probability it will be exploited. The CISA KEV catalogue lists vulnerabilities known to be exploited right now.",
      why:
        "A mid-sized organisation can easily have hundreds of thousands of open findings. You will never fix them all, so the entire discipline is about ranking — and CVSS alone is a poor ranking because it ignores whether anyone is actually exploiting the flaw and whether the asset matters to you.",
      how: [
        "Discover: authenticated and unauthenticated scanning, agent-based assessment, cloud posture management and software composition analysis for dependencies.",
        "Prioritise: combine CVSS severity, EPSS exploit probability, KEV status, asset criticality and real exposure. A critical CVSS on an isolated lab box outranks nothing.",
        "Remediate: patch, reconfigure, compensate, or formally accept the risk with an owner and a review date.",
        "Verify: rescan to confirm, and track mean time to remediate against your SLA.",
      ],
      where: [
        "Regulated environments have mandated remediation SLAs — PCI DSS, for example, requires critical patches within a defined window.",
        "US federal agencies operate under a binding directive requiring KEV entries to be remediated by set deadlines.",
        "DevSecOps pipelines fail builds on vulnerable dependencies before code ever ships.",
      ],
    },
    diagram: {
      title: 'The vulnerability management lifecycle with risk-based prioritisation',
      caption:
        'The prioritisation step is what separates a mature programme from an endless, demoralising ticket queue.',
      columns: [
        [{ id: 'inv', label: 'Asset Inventory', sub: 'you cannot scan what you do not know', tone: 'neutral', icon: 'Boxes' }],
        [{ id: 'scan', label: 'Discover', sub: 'scanners, agents, SCA, pen test', tone: 'primary', icon: 'ScanLine' }],
        [
          { id: 'cvss', label: 'CVSS Severity', sub: 'how bad if exploited', tone: 'warn', icon: 'Gauge' },
          { id: 'epss', label: 'EPSS + KEV', sub: 'how likely / already exploited', tone: 'danger', icon: 'Flame' },
          { id: 'asset', label: 'Asset Criticality', sub: 'business context and exposure', tone: 'violet', icon: 'Building2' },
        ],
        [{ id: 'prio', label: 'Risk-Based Priority', sub: 'a ranked, finite worklist', tone: 'primary', icon: 'ListOrdered' }],
        [
          { id: 'patch', label: 'Remediate', sub: 'patch or reconfigure', tone: 'safe', icon: 'Wrench' },
          { id: 'comp', label: 'Compensate', sub: 'segment, virtual patch, monitor', tone: 'warn', icon: 'Replace' },
          { id: 'accept', label: 'Accept', sub: 'documented, owned, time-boxed', tone: 'neutral', icon: 'FileSignature' },
        ],
        [{ id: 'verify', label: 'Verify & Report', sub: 'rescan, measure MTTR', tone: 'safe', icon: 'CircleCheck' }],
      ],
      edges: [
        { from: 'inv', to: 'scan', tone: 'neutral', animated: true },
        { from: 'scan', to: 'cvss', tone: 'warn' },
        { from: 'scan', to: 'epss', tone: 'danger' },
        { from: 'scan', to: 'asset', tone: 'violet' },
        { from: 'cvss', to: 'prio', tone: 'primary' },
        { from: 'epss', to: 'prio', tone: 'primary', animated: true },
        { from: 'asset', to: 'prio', tone: 'primary' },
        { from: 'prio', to: 'patch', tone: 'safe', animated: true },
        { from: 'prio', to: 'comp', tone: 'warn' },
        { from: 'prio', to: 'accept', tone: 'neutral' },
        { from: 'patch', to: 'verify', tone: 'safe' },
      ],
      legend: [
        { tone: 'danger', label: 'Exploitation signal' },
        { tone: 'safe', label: 'Risk reduced' },
      ],
    },
    realWorld: {
      title: 'Why CVSS 9.8 does not mean fix it first',
      body:
        "Only a small minority of published CVEs are ever exploited in the wild, yet CVSS labels a large share of them as critical or high. Teams that sort purely by CVSS burn out chasing theoretical risk while a medium-severity flaw in an internet-facing appliance — one that is being actively exploited and sits in the CISA KEV catalogue — waits in the queue. Effective programmes prioritise KEV first, then high EPSS, then CVSS, always filtered by whether the asset is actually exposed and actually matters. The number of things you must fix this week drops from thousands to dozens, which is the difference between a programme that works and one that exists on paper.",
      takeaway: 'Severity is not risk. Risk = severity x exploitability x exposure x asset value.',
    },
    attack: {
      title: 'Mass exploitation of an internet-facing appliance',
      intro:
        'When a pre-authentication flaw drops in an edge device, the window between disclosure and mass scanning is often measured in hours.',
      steps: [
        { label: 'Disclosure', detail: 'A vulnerability in a widely deployed VPN or file transfer appliance is published with a CVE.' },
        { label: 'Weaponisation', detail: 'A proof of concept appears publicly within days, sometimes hours.' },
        { label: 'Internet-wide scan', detail: 'Attackers enumerate every exposed instance using search engines for internet-connected devices.' },
        { label: 'Exploit and implant', detail: 'A web shell is planted. Because the appliance sits at the perimeter, it has reach into the internal network.' },
        { label: 'Persist through patching', detail: 'Organisations that patch without hunting for the implant remain compromised — the door was already propped open.' },
      ],
      mitigations: [
        'Maintain an accurate inventory of internet-facing assets and subscribe to vendor advisories.',
        'Have an emergency patching path that bypasses normal change windows for KEV entries.',
        'After patching a perimeter device, hunt for indicators of prior compromise — do not assume the patch is remediation.',
        'Reduce exposure: put administrative interfaces behind ZTNA rather than on the public internet.',
      ],
    },
    tools: [
      { name: 'Nessus / OpenVAS', what: 'Network vulnerability scanners.', why: 'The workhorse of authenticated and unauthenticated vulnerability discovery.', url: 'https://www.greenbone.net/en/community-edition/', category: 'Scanning' },
      { name: 'CISA KEV Catalog', what: 'Authoritative list of vulnerabilities exploited in the wild.', why: 'The single most useful prioritisation input available, and it is free.', url: 'https://www.cisa.gov/known-exploited-vulnerabilities-catalog', category: 'Prioritisation' },
      { name: 'EPSS', what: 'Exploit Prediction Scoring System from FIRST.', why: 'Probability that a CVE will be exploited in the next 30 days.', url: 'https://www.first.org/epss/', category: 'Prioritisation' },
      { name: 'Trivy / Grype', what: 'Container and dependency vulnerability scanners.', why: 'Software composition analysis for images and SBOMs in CI/CD.', url: 'https://github.com/aquasecurity/trivy', category: 'DevSecOps' },
    ],
    links: [
      { label: 'CVE Program', url: 'https://www.cve.org/', source: 'MITRE' },
      { label: 'NIST National Vulnerability Database', url: 'https://nvd.nist.gov/', source: 'NIST' },
      { label: 'FIRST — CVSS v4.0 specification', url: 'https://www.first.org/cvss/', source: 'FIRST' },
      { label: 'CISA Known Exploited Vulnerabilities Catalog', url: 'https://www.cisa.gov/known-exploited-vulnerabilities-catalog', source: 'CISA' },
    ],
    quiz: [
      {
        q: 'A scanner reports a critical vulnerability on a service that is not actually running. What is this called and what should happen?',
        options: [
          'False negative; increase scan frequency',
          'False positive; validate, document and tune the scanner',
          'True positive; patch immediately',
          'Zero-day; escalate to the vendor',
        ],
        answer: 1,
        explain:
          'A false positive is a finding that is not real. Validating and tuning matters because unchecked false positives destroy trust in the whole programme.',
      },
      {
        q: 'Which prioritisation input tells you a vulnerability is being actively exploited right now?',
        options: ['CVSS base score', 'CPE identifier', 'CISA KEV catalogue', 'CWE classification'],
        answer: 2,
        explain:
          'The Known Exploited Vulnerabilities catalogue lists flaws with confirmed in-the-wild exploitation. CVSS measures theoretical severity, CPE identifies products, CWE classifies weakness types.',
      },
      {
        q: 'Why does an authenticated (credentialed) scan generally give better results than an unauthenticated one?',
        options: [
          'It runs faster',
          'It can read installed package versions and configuration, greatly reducing false positives and finding local issues',
          'It does not require an asset inventory',
          'It automatically patches findings',
        ],
        answer: 1,
        explain:
          'Credentialed scans inspect the system from the inside rather than inferring from banners, so they detect far more and guess far less.',
      },
    ],
    examTip:
      'Learn the acronym set: CVE (identifier), CVSS (severity 0-10), CWE (weakness class), CPE (product naming), KEV (exploited in the wild), EPSS (exploit probability), SBOM (software bill of materials).',
  },
  {
    slug: 'penetration-testing',
    title: 'Penetration Testing & Security Assessment',
    domain: 2,
    objective: '5.5 Explain types and purposes of audits and assessments',
    tagline: 'Authorised adversary simulation — scope, rules of engagement, and the difference from a scan.',
    difficulty: 'Intermediate',
    minutes: 11,
    keywords: ['penetration testing', 'red team', 'blue team', 'purple team', 'black box', 'white box', 'rules of engagement', 'bug bounty', 'osint'],
    simple: {
      what:
        "A penetration test is an authorised, scoped simulation of an attack to find exploitable weaknesses and demonstrate real impact. Unlike a vulnerability scan, which lists potential issues, a pen test proves what an attacker could actually achieve by chaining them together.",
      why:
        "Scanners report symptoms. A pen test tells you that these three medium findings combine into full domain compromise — which is the argument that actually secures remediation budget.",
      how: [
        "Knowledge levels: unknown environment (black box) simulates an outsider, known environment (white box) provides full documentation for depth, partially known (grey box) balances both.",
        "Phases: reconnaissance (passive and active), scanning and enumeration, exploitation, privilege escalation, lateral movement, persistence, and reporting.",
        "Red team simulates the adversary, blue team defends, purple team runs both together so detections are improved in real time.",
        "Rules of engagement define scope, timing, permitted techniques, escalation contacts and explicit written authorisation — without which the activity is a crime.",
      ],
      where: [
        "Annual or post-major-change testing is required by PCI DSS and expected by most enterprise customers.",
        "Bug bounty programmes provide continuous crowdsourced testing under a published safe-harbour policy.",
        "Adversary emulation exercises replay a specific threat actor playbook mapped to MITRE ATT&CK.",
      ],
    },
    diagram: {
      title: 'Penetration test phases and deliverables',
      caption:
        'The report is the product. An exploit nobody can act on has delivered no value.',
      columns: [
        [{ id: 'scope', label: 'Scope & Authorisation', sub: 'rules of engagement, signed', tone: 'violet', icon: 'FileSignature' }],
        [{ id: 'recon', label: 'Reconnaissance', sub: 'OSINT, passive then active', tone: 'neutral', icon: 'Search' }],
        [{ id: 'enum', label: 'Scanning & Enumeration', sub: 'services, versions, users', tone: 'primary', icon: 'ScanLine' }],
        [{ id: 'exp', label: 'Exploitation', sub: 'gain a foothold', tone: 'danger', icon: 'Crosshair' }],
        [{ id: 'post', label: 'Post-Exploitation', sub: 'escalate, pivot, persist', tone: 'danger', icon: 'Waypoints' }],
        [{ id: 'rep', label: 'Report & Retest', sub: 'risk-rated, reproducible, actionable', tone: 'safe', icon: 'FileText' }],
      ],
      edges: [
        { from: 'scope', to: 'recon', tone: 'violet', animated: true },
        { from: 'recon', to: 'enum', tone: 'neutral', animated: true },
        { from: 'enum', to: 'exp', tone: 'primary', animated: true },
        { from: 'exp', to: 'post', tone: 'danger', animated: true },
        { from: 'post', to: 'rep', tone: 'safe', animated: true },
      ],
      legend: [
        { tone: 'danger', label: 'Simulated attacker activity' },
        { tone: 'safe', label: 'Value delivered to the client' },
      ],
    },
    realWorld: {
      title: 'Three mediums that equal one critical',
      body:
        "A scanner report lists: an outdated printer firmware, a file share readable by all domain users, and a service account with a weak password. Individually each is rated medium and each sits in a backlog for months. A penetration tester chains them: the printer stores LDAP credentials in its web interface, those credentials read the open share, the share contains a script with the service account password, and the service account is a local administrator everywhere. Three mediums become domain administrator in under an hour. That narrative — not the CVSS scores — is what changes organisational behaviour.",
      takeaway: 'Attack chains are the real risk. Scanners see findings; testers see paths.',
    },
    attack: {
      title: 'The reconnaissance phase most defenders never see',
      intro:
        'Passive OSINT produces no traffic against the target, so it generates no alerts at all — yet it shapes the entire engagement.',
      steps: [
        { label: 'Corporate footprint', detail: 'Domains, subdomains, IP ranges, certificate transparency entries and cloud storage buckets are enumerated.' },
        { label: 'People', detail: 'Employee names, roles and email format are derived from professional networking sites and document metadata.' },
        { label: 'Technology', detail: 'Job adverts reveal the exact security stack, ERP system and cloud provider in use.' },
        { label: 'Leaked material', detail: 'Public code repositories and paste sites are searched for credentials and internal hostnames.' },
        { label: 'Target selection', detail: 'The weakest realistic entry point is chosen — usually a forgotten subdomain or a person in a high-access, low-training role.' },
      ],
      mitigations: [
        'Run OSINT against yourself regularly and remove what should not be public.',
        'Scan repositories for committed secrets and rotate anything exposed.',
        'Review job adverts and public documents for unnecessary technical detail.',
        'Monitor certificate transparency and DNS for shadow IT and forgotten subdomains.',
      ],
    },
    tools: [
      { name: 'Metasploit Framework', what: 'Exploitation and post-exploitation framework.', why: 'The standard platform for validating exploitability in authorised tests.', url: 'https://www.metasploit.com/', category: 'Exploitation' },
      { name: 'Nmap', what: 'Port scanning, service and OS fingerprinting, NSE scripting.', why: 'The starting point of practically every engagement.', url: 'https://nmap.org/', category: 'Enumeration' },
      { name: 'Kali Linux / Parrot OS', what: 'Security testing distributions.', why: 'Preloaded toolsets for building a safe practice lab.', url: 'https://www.kali.org/', category: 'Platform' },
      { name: 'Shodan / Censys', what: 'Search engines for internet-connected devices.', why: 'Shows your external attack surface the way an attacker sees it.', url: 'https://www.shodan.io/', category: 'Recon' },
    ],
    links: [
      { label: 'NIST SP 800-115 — Technical Guide to Information Security Testing', url: 'https://csrc.nist.gov/pubs/sp/800/115/final', source: 'NIST' },
      { label: 'Penetration Testing Execution Standard', url: 'http://www.pentest-standard.org/', source: 'PTES' },
      { label: 'MITRE ATT&CK — Reconnaissance tactic', url: 'https://attack.mitre.org/tactics/TA0043/', source: 'MITRE' },
      { label: 'OWASP Web Security Testing Guide', url: 'https://owasp.org/www-project-web-security-testing-guide/', source: 'OWASP' },
    ],
    quiz: [
      {
        q: 'What most fundamentally distinguishes a penetration test from a vulnerability scan?',
        options: [
          'Pen tests are automated, scans are manual',
          'Pen tests exploit findings to demonstrate real business impact and chain weaknesses together',
          'Scans require written authorisation, pen tests do not',
          'Scans always find more issues',
        ],
        answer: 1,
        explain:
          'Scanning identifies potential weaknesses. Testing proves exploitability and shows the attack path an adversary would actually take.',
      },
      {
        q: 'A tester is given no prior information about the target environment. What is this engagement type called?',
        options: ['Known environment (white box)', 'Partially known environment (grey box)', 'Unknown environment (black box)', 'Purple team'],
        answer: 2,
        explain: 'Unknown environment testing simulates an external attacker with no insider knowledge, at the cost of spending much of the budget on reconnaissance.',
      },
      {
        q: 'Why are rules of engagement essential before testing begins?',
        options: [
          'They speed up the scan',
          'They define scope, timing, permitted techniques and provide the legal authorisation that separates testing from crime',
          'They guarantee no systems will crash',
          'They are required to purchase tooling',
        ],
        answer: 1,
        explain:
          'Without documented authorisation, the same activity is unauthorised access. Rules of engagement also protect production systems and define escalation.',
      },
    ],
    examTip:
      'Know the terminology: unknown / partially known / known environment (replacing black, grey and white box), red vs blue vs purple team, active vs passive reconnaissance, and the requirement for written authorisation and defined rules of engagement.',
  },
  {
    slug: 'threat-intelligence-ioc',
    title: 'Threat Intelligence & Indicators of Compromise',
    domain: 2,
    objective: '2.4 Analyze indicators of malicious activity',
    tagline: 'From hashes to behaviour — and why the Pyramid of Pain matters.',
    difficulty: 'Intermediate',
    minutes: 10,
    keywords: ['threat intelligence', 'ioc', 'ttp', 'pyramid of pain', 'osint', 'stix', 'taxii', 'isac', 'dark web', 'feed'],
    simple: {
      what:
        "Threat intelligence is information about adversaries that has been collected, analysed and made actionable. An indicator of compromise is a specific observable artefact — a file hash, an IP address, a domain, a registry key — that suggests an intrusion. Tactics, techniques and procedures describe how the adversary behaves, which is far more durable than any indicator.",
      why:
        "Intelligence lets you defend against attacks you have not yet suffered. But indicators expire quickly: an attacker changes a hash in seconds and an IP address in minutes, while changing their tradecraft costs them real effort.",
      how: [
        "The Pyramid of Pain ranks indicators by how much it hurts the adversary when you detect them: hashes are trivial to change, IPs and domains are easy, network and host artefacts are annoying, tools are challenging, and TTPs are genuinely hard.",
        "Sources: open source intelligence, commercial feeds, government advisories, ISAC sharing, internal incident data and dark web monitoring.",
        "STIX describes intelligence in a structured format; TAXII is the protocol used to exchange it between platforms.",
        "Good intelligence answers a question you actually have. A feed of a million IP addresses with no context is noise, not intelligence.",
      ],
      where: [
        "SOC detection engineering converts intelligence into detection rules and hunting hypotheses.",
        "Sector ISACs share targeted intelligence between peer organisations under trust agreements.",
        "Vulnerability prioritisation, brand protection and fraud teams all consume threat intelligence.",
      ],
    },
    diagram: {
      title: 'The Pyramid of Pain — detection value versus adversary cost',
      caption:
        'Detecting a hash inconveniences an attacker for seconds. Detecting behaviour forces them to rebuild their playbook.',
      columns: [
        [
          { id: 'hash', label: 'Hash Values', sub: 'trivial to change', tone: 'neutral', icon: 'Hash' },
          { id: 'ip', label: 'IP Addresses', sub: 'easy to change', tone: 'neutral', icon: 'Globe' },
          { id: 'dom', label: 'Domain Names', sub: 'simple to change', tone: 'warn', icon: 'Link' },
          { id: 'art', label: 'Network / Host Artifacts', sub: 'annoying to change', tone: 'warn', icon: 'FileSearch' },
          { id: 'tool', label: 'Tools', sub: 'challenging to change', tone: 'danger', icon: 'Wrench' },
          { id: 'ttp', label: 'TTPs', sub: 'genuinely hard to change', tone: 'danger', icon: 'BrainCircuit' },
        ],
        [{ id: 'det', label: 'Detection Engineering', sub: 'rules, analytics, hunts', tone: 'primary', icon: 'Code2' }],
        [{ id: 'out', label: 'Durable Detection', sub: 'survives infrastructure rotation', tone: 'safe', icon: 'ShieldCheck' }],
      ],
      edges: [
        { from: 'hash', to: 'det', tone: 'neutral' },
        { from: 'ip', to: 'det', tone: 'neutral' },
        { from: 'dom', to: 'det', tone: 'warn' },
        { from: 'art', to: 'det', tone: 'warn' },
        { from: 'tool', to: 'det', tone: 'danger' },
        { from: 'ttp', to: 'det', label: 'highest value', tone: 'danger', animated: true },
        { from: 'det', to: 'out', tone: 'safe', animated: true },
      ],
      legend: [
        { tone: 'neutral', label: 'Low adversary cost' },
        { tone: 'danger', label: 'High adversary cost' },
      ],
    },
    visual: 'radar',
    realWorld: {
      title: 'The IOC that was obsolete before the ticket closed',
      body:
        "A SOC receives an advisory listing forty malicious IP addresses. They are blocked at the firewall, the ticket is closed, and everyone feels productive. Meanwhile the adversary rotated their infrastructure that morning — the blocked addresses were already abandoned. The same advisory also described the behaviour: a specific scheduled task name, a distinctive PowerShell encoding pattern, and beaconing at a fixed interval with jitter. Building detections on those behavioural elements catches the same actor on entirely new infrastructure next month. Block the indicators by all means, but invest the analyst time in the behaviour.",
      takeaway: 'Indicators are perishable. Behaviour is durable. Spend your effort accordingly.',
    },
    attack: {
      title: 'Infrastructure rotation to defeat indicator-based defence',
      intro:
        'Adversaries assume their indicators will be published. Their operational model is built around cheap, disposable infrastructure.',
      steps: [
        { label: 'Disposable infrastructure', detail: 'Domains are registered in bulk and command and control servers are spun up in cloud providers per campaign.' },
        { label: 'Domain generation', detail: 'Algorithmically generated domains mean the malware finds its controller without any hard-coded address.' },
        { label: 'Legitimate hosting', detail: 'C2 is fronted through reputable CDNs and SaaS platforms, so reputation blocking would cause business breakage.' },
        { label: 'Payload mutation', detail: 'Every build is recompiled and packed, producing a unique hash for every single victim.' },
        { label: 'Living off the land', detail: 'Where possible only signed native binaries are used, leaving no attacker tooling to fingerprint.' },
      ],
      mitigations: [
        'Write detections on behaviour: process lineage, beacon periodicity, unusual parent-child relationships.',
        'Monitor for newly registered domains and DGA-like patterns rather than specific names.',
        'Use TLS metadata and JA3-style fingerprinting to identify tooling despite changing infrastructure.',
        'Map detection coverage to MITRE ATT&CK and close the gaps that matter for your sector.',
      ],
    },
    tools: [
      { name: 'MISP', what: 'Open source threat intelligence platform.', why: 'Store, correlate and share indicators using STIX and TAXII.', url: 'https://www.misp-project.org/', category: 'Platform' },
      { name: 'OpenCTI', what: 'Knowledge management for cyber threat intelligence.', why: 'Links actors, campaigns, techniques and indicators into a queryable graph.', url: 'https://www.opencti.io/', category: 'Platform' },
      { name: 'AlienVault OTX', what: 'Community threat intelligence exchange.', why: 'Free pulses of indicators with context, good for learning the workflow.', url: 'https://otx.alienvault.com/', category: 'Feed' },
      { name: 'Sigma', what: 'Generic signature format for SIEM detection rules.', why: 'Write a rule once and convert it to any SIEM query language.', url: 'https://github.com/SigmaHQ/sigma', category: 'Detection' },
    ],
    links: [
      { label: 'MITRE ATT&CK', url: 'https://attack.mitre.org/', source: 'MITRE' },
      { label: 'NIST SP 800-150 — Guide to Cyber Threat Information Sharing', url: 'https://csrc.nist.gov/pubs/sp/800/150/final', source: 'NIST' },
      { label: 'OASIS STIX/TAXII', url: 'https://oasis-open.github.io/cti-documentation/', source: 'OASIS' },
      { label: 'CISA — Automated Indicator Sharing', url: 'https://www.cisa.gov/topics/cyber-threats-and-advisories/information-sharing', source: 'CISA' },
    ],
    quiz: [
      {
        q: 'According to the Pyramid of Pain, which indicator type causes the most difficulty for an adversary when detected?',
        options: ['File hashes', 'IP addresses', 'Domain names', 'Tactics, techniques and procedures'],
        answer: 3,
        explain:
          'TTPs describe how the adversary operates. Changing them requires retraining and retooling, unlike rotating infrastructure which is trivial.',
      },
      {
        q: 'What are STIX and TAXII used for?',
        options: [
          'Encrypting threat data at rest',
          'A structured language for describing threat intelligence and a protocol for exchanging it',
          'Scanning for vulnerabilities',
          'Scoring vulnerability severity',
        ],
        answer: 1,
        explain: 'STIX is the data format, TAXII is the transport. Together they enable machine-to-machine intelligence sharing.',
      },
      {
        q: 'Which is the best example of an indicator of compromise?',
        options: [
          'A published CVE identifier',
          'An unusual outbound connection to a newly registered domain every 60 seconds from a workstation',
          'A company policy document',
          'A firewall vendor name',
        ],
        answer: 1,
        explain:
          'An IOC is an observable artefact suggesting compromise. Regular beaconing to a newly registered domain is a classic command and control indicator.',
      },
    ],
    examTip:
      'Be able to recognise indicators of malicious activity in scenario questions: account lockouts, impossible travel, resource consumption spikes, blocked content, out-of-cycle logging, missing logs, and published intelligence about your sector.',
  },
  {
    slug: 'mitre-attack',
    title: 'The MITRE ATT&CK Framework',
    domain: 2,
    objective: '2.4 Analyze indicators of malicious activity',
    tagline: 'A shared language for adversary behaviour — tactics, techniques and procedures.',
    difficulty: 'Intermediate',
    minutes: 10,
    keywords: ['mitre', 'attack', 'tactics', 'techniques', 'kill chain', 'navigator', 'detection coverage', 'atomic red team', 'd3fend'],
    simple: {
      what:
        "MITRE ATT&CK is a free, globally used knowledge base of real adversary behaviour. It is organised as a matrix: columns are tactics (the adversary goal, such as Initial Access or Exfiltration) and cells are techniques (how they achieve it). Each technique has an identifier such as T1566 for Phishing, plus documented detection and mitigation guidance.",
      why:
        "Before ATT&CK, every vendor and team described attacks differently. ATT&CK gives everyone the same vocabulary, which makes detection coverage measurable — you can literally colour in a matrix and see your blind spots.",
      how: [
        "Fourteen enterprise tactics run roughly left to right: Reconnaissance, Resource Development, Initial Access, Execution, Persistence, Privilege Escalation, Defense Evasion, Credential Access, Discovery, Lateral Movement, Collection, Command and Control, Exfiltration, Impact.",
        "The ATT&CK Navigator lets you overlay your detection coverage, a specific threat group, or a red team result onto the matrix.",
        "Separate matrices exist for Enterprise, Mobile and ICS environments.",
        "The Cyber Kill Chain is a related but coarser model with seven linear stages; ATT&CK is non-linear and far more granular.",
      ],
      where: [
        "Detection engineering: every rule is tagged with the technique it covers.",
        "Purple team exercises: emulate a specific technique, then verify whether it was detected.",
        "Vendor evaluations: MITRE Engenuity publishes independent ATT&CK evaluations of security products.",
      ],
    },
    diagram: {
      title: 'ATT&CK tactics as an attack progresses',
      caption:
        'Real intrusions loop and revisit tactics. The value is in naming each behaviour consistently, not in the order.',
      columns: [
        [
          { id: 'recon', label: 'Reconnaissance', sub: 'TA0043', tone: 'neutral', icon: 'Search' },
          { id: 'ia', label: 'Initial Access', sub: 'TA0001', tone: 'danger', icon: 'DoorOpen' },
        ],
        [
          { id: 'exec', label: 'Execution', sub: 'TA0002', tone: 'danger', icon: 'Terminal' },
          { id: 'pers', label: 'Persistence', sub: 'TA0003', tone: 'danger', icon: 'Anchor' },
          { id: 'priv', label: 'Privilege Escalation', sub: 'TA0004', tone: 'danger', icon: 'TrendingUp' },
        ],
        [
          { id: 'evade', label: 'Defense Evasion', sub: 'TA0005', tone: 'violet', icon: 'Ghost' },
          { id: 'cred', label: 'Credential Access', sub: 'TA0006', tone: 'violet', icon: 'KeyRound' },
          { id: 'disc', label: 'Discovery', sub: 'TA0007', tone: 'violet', icon: 'Map' },
        ],
        [
          { id: 'lat', label: 'Lateral Movement', sub: 'TA0008', tone: 'warn', icon: 'Waypoints' },
          { id: 'coll', label: 'Collection', sub: 'TA0009', tone: 'warn', icon: 'FolderInput' },
          { id: 'c2', label: 'Command & Control', sub: 'TA0011', tone: 'warn', icon: 'Antenna' },
        ],
        [
          { id: 'exfil', label: 'Exfiltration', sub: 'TA0010', tone: 'danger', icon: 'Upload' },
          { id: 'impact', label: 'Impact', sub: 'TA0040', tone: 'danger', icon: 'Bomb' },
        ],
      ],
      edges: [
        { from: 'recon', to: 'ia', tone: 'neutral', animated: true },
        { from: 'ia', to: 'exec', tone: 'danger', animated: true },
        { from: 'exec', to: 'pers', tone: 'danger' },
        { from: 'exec', to: 'priv', tone: 'danger' },
        { from: 'priv', to: 'cred', tone: 'violet', animated: true },
        { from: 'cred', to: 'disc', tone: 'violet' },
        { from: 'disc', to: 'lat', tone: 'warn', animated: true },
        { from: 'lat', to: 'coll', tone: 'warn' },
        { from: 'coll', to: 'exfil', tone: 'danger', animated: true },
        { from: 'c2', to: 'impact', tone: 'danger' },
      ],
      legend: [
        { tone: 'danger', label: 'High-impact tactic' },
        { tone: 'violet', label: 'Internal operations' },
      ],
    },
    realWorld: {
      title: 'Colouring in the matrix to find the blind spot',
      body:
        "A SOC exports every detection rule it owns and tags each with the ATT&CK technique it covers, then renders the result in the Navigator. Credential Access and Execution light up bright green — that is where vendors focus and where the rules came from. Defense Evasion and Command and Control are almost entirely blank. That picture, produced in an afternoon, redirects an entire year of detection engineering with more precision than any product roadmap. Pairing it with Atomic Red Team, which safely simulates individual techniques, turns the assumption of coverage into a verified fact.",
      takeaway: 'Coverage you have not tested is coverage you do not have.',
    },
    attack: {
      title: 'An intrusion narrated in ATT&CK terms',
      intro:
        'Notice how each step maps to a named technique — this is exactly how threat reports are written.',
      steps: [
        { label: 'T1566.001 Spearphishing Attachment', detail: 'A macro-enabled document reaches a finance user and is opened.' },
        { label: 'T1059.001 PowerShell', detail: 'The macro launches an encoded PowerShell command to stage a loader in memory.' },
        { label: 'T1547 Boot or Logon Autostart', detail: 'A registry run key is created to survive reboot.' },
        { label: 'T1003 OS Credential Dumping', detail: 'Credentials are extracted from process memory on the host.' },
        { label: 'T1021.002 SMB / Admin Shares', detail: 'Those credentials are reused to move laterally to a file server.' },
        { label: 'T1486 Data Encrypted for Impact', detail: 'The ransomware payload is deployed across the estate.' },
      ],
      mitigations: [
        'Map each technique to a detection and a preventive control; track which have neither.',
        'Use Atomic Red Team to safely execute each technique and confirm the alert actually fires.',
        'Prioritise techniques used by threat groups known to target your sector.',
        'Reference MITRE D3FEND for the defensive countermeasure counterpart of each technique.',
      ],
    },
    tools: [
      { name: 'ATT&CK Navigator', what: 'Web tool for annotating and visualising the matrix.', why: 'Turn coverage, gaps and red team results into a shareable picture.', url: 'https://mitre-attack.github.io/attack-navigator/', category: 'Analysis' },
      { name: 'Atomic Red Team', what: 'Library of small, safe technique tests.', why: 'Verify empirically that your detections fire for a given technique.', url: 'https://github.com/redcanaryco/atomic-red-team', category: 'Validation' },
      { name: 'Caldera', what: 'MITRE automated adversary emulation platform.', why: 'Runs full technique chains against a lab environment.', url: 'https://caldera.mitre.org/', category: 'Emulation' },
      { name: 'MITRE D3FEND', what: 'Knowledge graph of defensive countermeasures.', why: 'Maps each offensive technique to concrete defensive techniques.', url: 'https://d3fend.mitre.org/', category: 'Defense' },
    ],
    links: [
      { label: 'MITRE ATT&CK Enterprise Matrix', url: 'https://attack.mitre.org/matrices/enterprise/', source: 'MITRE' },
      { label: 'MITRE D3FEND', url: 'https://d3fend.mitre.org/', source: 'MITRE' },
      { label: 'MITRE Engenuity ATT&CK Evaluations', url: 'https://attackevals.mitre-engenuity.org/', source: 'MITRE' },
      { label: 'Lockheed Martin Cyber Kill Chain', url: 'https://www.lockheedmartin.com/en-us/capabilities/cyber/cyber-kill-chain.html', source: 'Lockheed Martin' },
    ],
    quiz: [
      {
        q: 'In MITRE ATT&CK, what does a tactic represent?',
        options: [
          'A specific piece of malware',
          'The adversary tactical goal, such as gaining initial access or escalating privileges',
          'A vulnerability identifier',
          'A defensive control',
        ],
        answer: 1,
        explain: 'Tactics are the why — the adversary objective. Techniques are the how, and sub-techniques are the specific variation.',
      },
      {
        q: 'How does the Cyber Kill Chain differ from MITRE ATT&CK?',
        options: [
          'The Kill Chain has more techniques',
          'The Kill Chain is a linear seven-stage model; ATT&CK is a non-linear, far more granular behaviour matrix',
          'ATT&CK only covers cloud environments',
          'They are identical',
        ],
        answer: 1,
        explain:
          'The Kill Chain is a high-level sequential narrative. ATT&CK catalogues hundreds of specific behaviours that can occur in any order and repeatedly.',
      },
      {
        q: 'A team wants to verify that its SIEM actually detects credential dumping. What is the most appropriate approach?',
        options: [
          'Read the vendor documentation',
          'Run a controlled Atomic Red Team test for the technique and confirm the alert fires',
          'Deploy real malware in production',
          'Increase log retention',
        ],
        answer: 1,
        explain:
          'Safe, atomic technique simulation is the standard way to validate detection coverage without introducing real risk.',
      },
    ],
    examTip:
      'Security+ expects awareness of ATT&CK, the Cyber Kill Chain and the Diamond Model of Intrusion Analysis (adversary, capability, infrastructure, victim). Know what each is for rather than memorising every technique.',
  },
]

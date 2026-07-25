import type { CheatSheet } from '../types'

export const CHEATSHEETS: CheatSheet[] = [
  {
    slug: 'ports-protocols',
    title: 'Ports & Protocols',
    blurb: 'The port numbers Security+ expects you to recall instantly, paired with their secure alternatives.',
    sections: [
      {
        heading: 'Core services',
        rows: [
          ['20 / 21 TCP', 'FTP — file transfer, plaintext. Replace with SFTP or FTPS'],
          ['22 TCP', 'SSH / SCP / SFTP — encrypted shell and transfer'],
          ['23 TCP', 'Telnet — plaintext remote shell. Disable everywhere'],
          ['25 TCP', 'SMTP — mail transfer between servers'],
          ['53 TCP/UDP', 'DNS — name resolution. UDP for queries, TCP for zone transfers'],
          ['67 / 68 UDP', 'DHCP server / client'],
          ['69 UDP', 'TFTP — trivial FTP, no authentication'],
          ['80 TCP', 'HTTP — plaintext web'],
          ['88 TCP/UDP', 'Kerberos — domain authentication'],
          ['110 TCP', 'POP3 — mail retrieval, plaintext'],
          ['123 UDP', 'NTP — time synchronisation, critical for log correlation'],
        ],
      },
      {
        heading: 'Directory, file and management',
        rows: [
          ['135 / 137-139 TCP', 'RPC and NetBIOS — legacy Windows networking'],
          ['143 TCP', 'IMAP — mail access, plaintext'],
          ['161 / 162 UDP', 'SNMP / SNMP trap — use v3 only'],
          ['389 TCP/UDP', 'LDAP — directory access, plaintext'],
          ['445 TCP', 'SMB — Windows file sharing. Never expose to the internet'],
          ['636 TCP', 'LDAPS — LDAP over TLS'],
          ['3389 TCP', 'RDP — remote desktop. Put behind VPN or ZTNA'],
        ],
      },
      {
        heading: 'Encrypted equivalents',
        rows: [
          ['443 TCP', 'HTTPS — HTTP over TLS'],
          ['465 / 587 TCP', 'SMTPS / SMTP submission with STARTTLS'],
          ['990 TCP', 'FTPS — FTP over TLS'],
          ['993 TCP', 'IMAPS — IMAP over TLS'],
          ['995 TCP', 'POP3S — POP3 over TLS'],
          ['1433 / 3306 / 5432', 'MSSQL / MySQL / PostgreSQL — never expose publicly'],
          ['500 / 4500 UDP', 'IKE / IPsec NAT-T — VPN key exchange'],
        ],
      },
    ],
  },
  {
    slug: 'crypto-quick-reference',
    title: 'Cryptography Quick Reference',
    blurb: 'Which algorithm does what, and which key you use for which purpose.',
    sections: [
      {
        heading: 'Algorithm families',
        rows: [
          ['Symmetric', 'AES-128/192/256, ChaCha20, 3DES (legacy). One shared key. Fast, for bulk data'],
          ['Asymmetric', 'RSA, ECC/ECDSA, Diffie-Hellman, ECDHE. Key pair. Slow, solves key distribution'],
          ['Hashing', 'SHA-256, SHA-3, BLAKE2. One-way, no key, fixed length. MD5 and SHA-1 are broken'],
          ['Password KDF', 'Argon2id, scrypt, bcrypt, PBKDF2. Deliberately slow, always salted'],
          ['MAC', 'HMAC-SHA256. Integrity plus authenticity using a shared secret key'],
          ['AEAD', 'AES-GCM, ChaCha20-Poly1305. Encryption and integrity in one operation'],
        ],
      },
      {
        heading: 'Which key do I use?',
        rows: [
          ['Confidentiality to a recipient', 'Encrypt with the RECIPIENT public key; they decrypt with their private key'],
          ['Non-repudiation / signing', 'Sign with YOUR private key; anyone verifies with your public key'],
          ['Both', 'Sign then encrypt — signature proves origin, encryption protects content'],
          ['Session establishment', 'ECDHE for ephemeral key agreement giving perfect forward secrecy'],
        ],
      },
      {
        heading: 'Concepts to recognise',
        rows: [
          ['Salt', 'Unique random value per password; defeats rainbow tables'],
          ['Pepper', 'Secret value stored separately from the database, applied to all hashes'],
          ['Nonce / IV', 'Number used once; prevents identical plaintext producing identical ciphertext'],
          ['Key stretching', 'Repeated hashing to increase the cost of each guess'],
          ['Key escrow', 'Third party holds a copy of keys for recovery or legal access'],
          ['Perfect forward secrecy', 'Past sessions stay safe even if the long-term key is later stolen'],
          ['Steganography', 'Hiding data inside other data; obscurity, not encryption'],
          ['Blockchain', 'Append-only distributed ledger secured by hashing and signatures'],
        ],
      },
    ],
  },
  {
    slug: 'risk-formulas',
    title: 'Risk & Recovery Formulas',
    blurb: 'The calculations and metrics that appear in exam questions, with worked meanings.',
    sections: [
      {
        heading: 'Quantitative risk',
        rows: [
          ['SLE', 'Single Loss Expectancy = Asset Value x Exposure Factor'],
          ['ARO', 'Annualised Rate of Occurrence = expected occurrences per year'],
          ['ALE', 'Annualised Loss Expectancy = SLE x ARO'],
          ['Control justification', 'If annual control cost < ALE reduction, the control is financially justified'],
          ['Inherent risk', 'Risk before any controls are applied'],
          ['Residual risk', 'Risk remaining after controls — must be formally accepted by an owner'],
        ],
      },
      {
        heading: 'Recovery metrics',
        rows: [
          ['RTO', 'Recovery Time Objective — how fast the service must be restored'],
          ['RPO', 'Recovery Point Objective — how much data loss is acceptable'],
          ['MTD', 'Maximum Tolerable Downtime — beyond this the business is critically harmed'],
          ['MTBF', 'Mean Time Between Failures — reliability of repairable systems'],
          ['MTTF', 'Mean Time To Failure — for non-repairable components'],
          ['MTTR', 'Mean Time To Repair or Respond'],
        ],
      },
      {
        heading: 'Risk treatment',
        rows: [
          ['Mitigate', 'Apply controls to reduce likelihood or impact'],
          ['Transfer', 'Insurance or contractual shifting of financial consequence'],
          ['Avoid', 'Stop performing the risky activity entirely'],
          ['Accept', 'Documented, owned, time-bounded acceptance with review date'],
        ],
      },
    ],
  },
  {
    slug: 'attack-identification',
    title: 'Attack Identification Cues',
    blurb: 'Scenario keywords in exam questions and the attack they almost always indicate.',
    sections: [
      {
        heading: 'Authentication attacks',
        rows: [
          ['One password, many accounts', 'Password spraying'],
          ['Many passwords, one account', 'Brute force'],
          ['Valid pairs from other breaches', 'Credential stuffing'],
          ['Precomputed digest tables', 'Rainbow table (defeated by salting)'],
          ['Hash reused without cracking', 'Pass-the-hash'],
          ['Repeated push prompts at night', 'MFA fatigue / push bombing'],
        ],
      },
      {
        heading: 'Network attacks',
        rows: [
          ['Forged ARP replies, traffic redirected', 'ARP spoofing leading to on-path attack'],
          ['Small request, huge reply to a victim', 'Amplification DDoS'],
          ['Duplicate SSID with stronger signal', 'Evil twin'],
          ['Valid traffic captured and resent', 'Replay attack'],
          ['Traffic reaching another VLAN', 'VLAN hopping / double tagging'],
          ['Users sent to a fake site with correct URL', 'DNS poisoning or pharming'],
        ],
      },
      {
        heading: 'Application attacks',
        rows: [
          ["Input containing ' OR 1=1 --", 'SQL injection — fix with parameterised queries'],
          ['Script executes in other users browsers', 'Stored XSS — fix with output encoding and CSP'],
          ['Authenticated action triggered from another site', 'CSRF — fix with tokens and SameSite'],
          ['Server fetches an internal URL for the attacker', 'SSRF'],
          ['Path such as ../../etc/passwd', 'Directory traversal'],
          ['Gap between check and use', 'TOCTOU race condition'],
        ],
      },
      {
        heading: 'Social engineering',
        rows: [
          ['Email', 'Phishing (targeted = spear phishing, executive = whaling)'],
          ['Voice call', 'Vishing'],
          ['SMS', 'Smishing'],
          ['Invented scenario to justify a request', 'Pretexting'],
          ['Compromised site the victims already trust', 'Watering hole'],
          ['Following someone through a secure door', 'Tailgating / piggybacking'],
        ],
      },
    ],
  },
  {
    slug: 'controls-matrix',
    title: 'Security Controls Matrix',
    blurb: 'Every control has a category and a type. Exam questions test both at once.',
    sections: [
      {
        heading: 'Categories — who implements it',
        rows: [
          ['Technical', 'Firewall, encryption, IDS, antivirus, MFA, ACLs'],
          ['Managerial', 'Risk assessments, security policy, personnel screening, planning'],
          ['Operational', 'Awareness training, incident response process, guards, change management'],
          ['Physical', 'Locks, fences, bollards, mantraps, badges, lighting, CCTV'],
        ],
      },
      {
        heading: 'Types — what it does',
        rows: [
          ['Preventive', 'Stops the event: firewall rule, locked door, least privilege'],
          ['Deterrent', 'Discourages the attempt: warning signs, visible cameras, legal penalties'],
          ['Detective', 'Identifies it happened: IDS, log review, SIEM alert, audit'],
          ['Corrective', 'Repairs the damage: restore from backup, patch, quarantine'],
          ['Compensating', 'Alternative when the primary control is not feasible'],
          ['Directive', 'Instructs behaviour: acceptable use policy, procedures, signage'],
        ],
      },
    ],
  },
  {
    slug: 'incident-response-runbook',
    title: 'Incident Response Runbook',
    blurb: 'The order of operations, the evidence rules and the questions to answer at each phase.',
    sections: [
      {
        heading: 'NIST SP 800-61 phases',
        rows: [
          ['1. Preparation', 'Playbooks, tooling, logging, contacts, retainers, training, tabletop exercises'],
          ['2. Detection & Analysis', 'Validate, scope, classify severity, start the timeline immediately'],
          ['3. Containment', 'Isolate (do not power off), preserve evidence, short-term then long-term'],
          ['4. Eradication', 'Remove root cause, persistence and compromised credentials — all at once'],
          ['5. Recovery', 'Restore from clean backups, verify integrity, monitor intensively'],
          ['6. Lessons Learned', 'Blameless review within two weeks, owned and dated actions'],
        ],
      },
      {
        heading: 'Order of volatility (collect first to last)',
        rows: [
          ['1', 'CPU registers and cache'],
          ['2', 'RAM — running processes, connections, injected code, keys'],
          ['3', 'Network state and active sessions'],
          ['4', 'Running processes and temporary files'],
          ['5', 'Disk — hash before and after imaging'],
          ['6', 'Remote logging and monitoring data'],
          ['7', 'Physical configuration and archival media'],
        ],
      },
      {
        heading: 'Evidence rules',
        rows: [
          ['Write blocker', 'Never modify the source media'],
          ['Hash immediately', 'SHA-256 at acquisition, re-verify before analysis'],
          ['Chain of custody', 'Who, what, when, why — every transfer recorded'],
          ['Legal hold', 'Suspend routine deletion as soon as an investigation is anticipated'],
          ['Analyse the copy', 'The original is preserved and never worked on directly'],
        ],
      },
    ],
  },
]

export const cheatsheetBySlug = (slug: string) => CHEATSHEETS.find((c) => c.slug === slug)

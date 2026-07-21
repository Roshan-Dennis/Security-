import type { Topic } from '../../types'

export const DOMAIN1: Topic[] = [
  {
    slug: 'cia-triad',
    title: 'The CIA Triad',
    domain: 1,
    objective: '1.2 Summarize fundamental security concepts',
    tagline: 'Confidentiality, Integrity, Availability — the three questions behind every security decision.',
    difficulty: 'Beginner',
    minutes: 8,
    keywords: ['cia', 'confidentiality', 'integrity', 'availability', 'triad', 'dad'],
    simple: {
      what:
        "The CIA triad is the three-part goal of all information security. Confidentiality means only the right people can see the data. Integrity means the data has not been changed without authorisation. Availability means the data and systems are there when you need them.",
      why:
        "Security is not one thing — it is a balance. A hard drive encased in concrete is perfectly confidential and perfectly useless. The triad gives you a checklist so you never protect one property by accidentally destroying another.",
      how: [
        "Confidentiality is enforced with encryption, access control, data classification and least privilege.",
        "Integrity is enforced with hashing, digital signatures, checksums, version control and change management.",
        "Availability is enforced with redundancy, load balancing, backups, failover clustering and DDoS protection.",
        "Every control you deploy should map back to at least one leg of the triad — if it maps to none, ask why you are buying it.",
      ],
      where: [
        "A hospital records system: confidentiality (patient privacy), integrity (correct dosage in the chart), availability (the chart loads during an emergency).",
        "Online banking: TLS for confidentiality, transaction signing for integrity, multi-region failover for availability.",
        "Risk assessments and audits are scored against the triad; so are most Security+ exam questions.",
      ],
    },
    diagram: {
      title: 'CIA triad and its opposite — the DAD triad',
      caption:
        'Each protective goal has a matching attack. Attackers do not break in randomly; they attack one leg of the triad at a time.',
      columns: [
        [
          { id: 'asset', label: 'Protected Asset', sub: 'data, systems, services', tone: 'primary', icon: 'Database' },
        ],
        [
          { id: 'c', label: 'Confidentiality', sub: 'only authorised eyes', tone: 'safe', icon: 'EyeOff' },
          { id: 'i', label: 'Integrity', sub: 'unaltered and trustworthy', tone: 'safe', icon: 'FileCheck' },
          { id: 'a', label: 'Availability', sub: 'accessible when needed', tone: 'safe', icon: 'Activity' },
        ],
        [
          { id: 'd1', label: 'Disclosure', sub: 'data breach, sniffing', tone: 'danger', icon: 'Eye' },
          { id: 'd2', label: 'Alteration', sub: 'tampering, defacement', tone: 'danger', icon: 'FilePen' },
          { id: 'd3', label: 'Denial', sub: 'DDoS, ransomware, outage', tone: 'danger', icon: 'PowerOff' },
        ],
      ],
      edges: [
        { from: 'asset', to: 'c', tone: 'safe', animated: true },
        { from: 'asset', to: 'i', tone: 'safe', animated: true },
        { from: 'asset', to: 'a', tone: 'safe', animated: true },
        { from: 'c', to: 'd1', label: 'attacked by', tone: 'danger' },
        { from: 'i', to: 'd2', label: 'attacked by', tone: 'danger' },
        { from: 'a', to: 'd3', label: 'attacked by', tone: 'danger' },
      ],
      legend: [
        { tone: 'safe', label: 'Protective goal' },
        { tone: 'danger', label: 'Corresponding attack' },
      ],
    },
    visual: 'shield',
    realWorld: {
      title: 'A ransomware attack is a triad attack, not just an availability attack',
      body:
        "Modern ransomware crews use double extortion. First they quietly copy your data out of the network — that is a confidentiality failure. Then they encrypt your servers so nothing works — that is an availability failure. Along the way they modify or delete backups and logs — that is an integrity failure. This is why a company can pay the ransom, get its files back, and still be in serious trouble: the confidentiality loss is permanent and unfixable.",
      takeaway:
        "When you analyse an incident, name which legs of the triad were broken. It tells you what you must recover and what you must disclose.",
    },
    attack: {
      title: 'Following the triad through a breach',
      intro:
        'The same intrusion damages different triad properties at each stage. Mapping them helps you scope the incident correctly.',
      steps: [
        { label: 'Initial access', detail: 'Attacker phishes an employee and steals a session token. No triad damage yet — but the door is open.' },
        { label: 'Data staging', detail: 'Sensitive files are archived and compressed on an internal host. Confidentiality is now at risk.' },
        { label: 'Exfiltration', detail: 'The archive is uploaded to attacker infrastructure. Confidentiality is broken and cannot be undone.' },
        { label: 'Log tampering', detail: 'Event logs are cleared and backup jobs are disabled. Integrity of your evidence is broken.' },
        { label: 'Encryption payload', detail: 'Ransomware executes across the estate. Availability collapses.' },
      ],
      mitigations: [
        'Data loss prevention and egress filtering to catch large outbound transfers.',
        'Immutable, offline or write-once backups so ransomware cannot destroy recovery points.',
        'Forward logs to a SIEM in real time so tampering on the host does not erase the evidence.',
        'Classify data so you know exactly what confidentiality loss means for each system.',
      ],
    },
    tools: [
      { name: 'VeraCrypt', what: 'Open source full disk and container encryption.', why: 'Demonstrates confidentiality controls on data at rest without any licensing cost.', url: 'https://www.veracrypt.fr/', category: 'Confidentiality' },
      { name: 'sha256sum / CertUtil', what: 'Command line hashing utilities on Linux and Windows.', why: 'The fastest way to prove integrity — compare a file hash against the vendor published value.', category: 'Integrity' },
      { name: 'HAProxy / NGINX', what: 'Load balancers and reverse proxies.', why: 'Deliver availability through health checks, failover and rate limiting.', url: 'https://www.haproxy.org/', category: 'Availability' },
    ],
    links: [
      { label: 'NIST SP 800-12 Rev.1 — An Introduction to Information Security', url: 'https://csrc.nist.gov/pubs/sp/800/12/r1/final', source: 'NIST' },
      { label: 'NIST FIPS 199 — Standards for Security Categorization', url: 'https://csrc.nist.gov/pubs/fips/199/final', source: 'NIST' },
      { label: 'CISA — Stop Ransomware', url: 'https://www.cisa.gov/stopransomware', source: 'CISA' },
    ],
    quiz: [
      {
        q: 'A web application returns account balances that are three days out of date because a replication job silently failed. Which element of the CIA triad has been compromised?',
        options: ['Confidentiality', 'Integrity', 'Availability', 'Non-repudiation'],
        answer: 1,
        explain:
          'The data is reachable and nobody unauthorised has seen it, but it no longer reflects reality. Data that is accessible yet wrong is an integrity failure.',
      },
      {
        q: 'Which control set most directly supports availability?',
        options: ['Full disk encryption and DLP', 'Digital signatures and file hashing', 'Clustering, load balancing and off-site backups', 'Role-based access control and least privilege'],
        answer: 2,
        explain:
          'Redundancy technologies keep the service reachable during failure. Encryption serves confidentiality; signatures and hashes serve integrity; RBAC serves confidentiality.',
      },
      {
        q: 'The DAD triad describes the attacker view of the CIA triad. Which pairing is correct?',
        options: ['Disclosure attacks integrity', 'Alteration attacks availability', 'Denial attacks availability', 'Disclosure attacks availability'],
        answer: 2,
        explain: 'Disclosure attacks confidentiality, Alteration attacks integrity, and Denial attacks availability.',
      },
    ],
    examTip:
      'When a question describes a symptom, translate it into a triad word first. Cannot reach the site = availability. Wrong or altered data = integrity. Someone saw it who should not = confidentiality.',
  },
  {
    slug: 'aaa-framework',
    title: 'AAA — Authentication, Authorization, Accounting',
    domain: 1,
    objective: '1.2 Summarize fundamental security concepts',
    tagline: 'Who are you, what may you do, and what did you actually do?',
    difficulty: 'Beginner',
    minutes: 9,
    keywords: ['aaa', 'authentication', 'authorization', 'accounting', 'radius', 'tacacs', '802.1x', 'identification'],
    simple: {
      what:
        "AAA is the three-step lifecycle of every access request. Identification is the claim (I am rdennis). Authentication is the proof (here is my password and my token code). Authorization decides what that identity may do. Accounting records what was done so it can be reviewed later.",
      why:
        "Without authentication anyone can claim to be the CEO. Without authorization every authenticated user becomes an administrator. Without accounting you can never answer the question that matters most after an incident: who did this, and when?",
      how: [
        "Identification: the user presents a username, certificate subject, or device identifier.",
        "Authentication: the system validates one or more factors — something you know, have, are, do, or somewhere you are.",
        "Authorization: a policy engine evaluates group membership, role, attributes or explicit rules and returns permit or deny.",
        "Accounting: the decision and the session activity are logged, timestamped and shipped to a tamper-resistant store.",
      ],
      where: [
        "Corporate Wi-Fi using 802.1X with RADIUS as the AAA server and Active Directory as the identity store.",
        "Network device administration using TACACS+, which separates authentication from authorisation so operators get per-command control.",
        "Cloud consoles: IAM authenticates the principal, evaluates policy for authorization, and writes every API call to CloudTrail for accounting.",
      ],
    },
    diagram: {
      title: 'AAA flow with a RADIUS server (802.1X network access)',
      caption:
        'The switch or access point is only a messenger — it never holds the credentials. That separation is the whole point of centralised AAA.',
      columns: [
        [{ id: 'sup', label: 'Supplicant', sub: 'user device requesting access', tone: 'primary', icon: 'Laptop' }],
        [{ id: 'auth', label: 'Authenticator', sub: 'switch / wireless AP', tone: 'neutral', icon: 'Router' }],
        [{ id: 'aaa', label: 'AAA Server', sub: 'RADIUS or TACACS+', tone: 'violet', icon: 'Server' }],
        [
          { id: 'idp', label: 'Identity Store', sub: 'Active Directory / LDAP', tone: 'neutral', icon: 'Users' },
          { id: 'policy', label: 'Authorization Policy', sub: 'VLAN, role, ACL', tone: 'safe', icon: 'ListChecks' },
          { id: 'log', label: 'Accounting Log', sub: 'session start, stop, bytes', tone: 'warn', icon: 'ScrollText' },
        ],
      ],
      edges: [
        { from: 'sup', to: 'auth', label: 'EAPOL identity', tone: 'primary', animated: true },
        { from: 'auth', to: 'aaa', label: 'Access-Request', tone: 'primary', animated: true },
        { from: 'aaa', to: 'idp', label: 'verify credential', tone: 'neutral' },
        { from: 'aaa', to: 'policy', label: 'Access-Accept + attributes', tone: 'safe' },
        { from: 'aaa', to: 'log', label: 'Accounting-Request', tone: 'warn' },
      ],
      legend: [
        { tone: 'primary', label: 'Authentication' },
        { tone: 'safe', label: 'Authorization' },
        { tone: 'warn', label: 'Accounting' },
      ],
    },
    realWorld: {
      title: 'Why a guest device lands on a different VLAN than a corporate laptop',
      body:
        "When a domain-joined laptop connects to the office Wi-Fi it presents a machine certificate over EAP-TLS. The access point forwards the request to the RADIUS server, which validates the certificate against the internal CA, then returns an Access-Accept carrying a VLAN attribute for the corporate network. A personal phone fails certificate validation, falls back to a captive portal, and receives the guest VLAN with an internet-only ACL. Same physical network, same access point, two completely different authorisation outcomes — decided centrally in one policy, not configured on every switch port.",
      takeaway: 'Centralised AAA is what makes consistent access policy possible at scale.',
    },
    attack: {
      title: 'Credential stuffing against a service with weak accounting',
      intro:
        'Attackers rarely break authentication cryptography. They abuse the fact that authentication is repeated millions of times and nobody is watching the counter.',
      steps: [
        { label: 'Collect', detail: 'Attacker buys a combo list of several million username and password pairs leaked from unrelated breaches.' },
        { label: 'Distribute', detail: 'Requests are spread across thousands of residential proxy IPs so no single source trips a rate limit.' },
        { label: 'Stuff', detail: 'Automated login attempts run at low volume per IP. Because users reuse passwords, a small percentage succeed.' },
        { label: 'Pivot', detail: 'Valid sessions are used immediately. Authorization is never questioned because authentication technically succeeded.' },
        { label: 'Hide', detail: 'With no accounting alerts on impossible travel or anomalous login volume, the activity blends into normal traffic.' },
      ],
      mitigations: [
        'Enforce phishing-resistant MFA so a stolen password alone is not enough.',
        'Monitor authentication telemetry for impossible travel, spikes in failure rate and new device fingerprints.',
        'Use conditional access to require step-up authentication for sensitive actions.',
        'Check credentials against known-breached password lists at registration and reset time.',
      ],
    },
    tools: [
      { name: 'FreeRADIUS', what: 'The most widely deployed open source RADIUS server.', why: 'Lets you build a full 802.1X lab and watch Access-Request and Accounting packets in the clear.', url: 'https://www.freeradius.org/', category: 'AAA server' },
      { name: 'Microsoft Entra ID / Active Directory', what: 'Enterprise identity provider and directory.', why: 'The identity store behind most corporate AAA, including conditional access policy.', url: 'https://learn.microsoft.com/entra/', category: 'Identity' },
      { name: 'AWS CloudTrail', what: 'Records every API call made in an AWS account.', why: 'The textbook example of accounting — immutable, timestamped, attributable.', url: 'https://docs.aws.amazon.com/cloudtrail/', category: 'Accounting' },
    ],
    links: [
      { label: 'NIST SP 800-63B — Digital Identity Guidelines: Authentication', url: 'https://pages.nist.gov/800-63-3/sp800-63b.html', source: 'NIST' },
      { label: 'RFC 2865 — Remote Authentication Dial In User Service (RADIUS)', url: 'https://www.rfc-editor.org/rfc/rfc2865', source: 'IETF' },
      { label: 'OWASP — Credential Stuffing Prevention Cheat Sheet', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Credential_Stuffing_Prevention_Cheat_Sheet.html', source: 'OWASP' },
    ],
    quiz: [
      {
        q: 'A network engineer needs per-command authorisation on routers, with authentication handled separately. Which protocol is the best fit?',
        options: ['RADIUS', 'TACACS+', 'Kerberos', 'SAML'],
        answer: 1,
        explain:
          'TACACS+ separates authentication, authorization and accounting into independent functions and encrypts the whole payload, which is why it dominates device administration. RADIUS combines authentication and authorization in one exchange.',
      },
      {
        q: 'Which AAA element answers the question "what did this account actually do last Tuesday?"',
        options: ['Authentication', 'Authorization', 'Accounting', 'Identification'],
        answer: 2,
        explain: 'Accounting is the record of session and activity data, and it is the basis of auditing and non-repudiation.',
      },
      {
        q: 'A user successfully signs in but receives an access denied message when opening a payroll report. Which stage failed?',
        options: ['Identification', 'Authentication', 'Authorization', 'Accounting'],
        answer: 2,
        explain: 'The identity was proven, so authentication succeeded. The policy evaluation that grants or refuses the specific resource is authorization.',
      },
    ],
    examTip:
      'Watch the verbs. Prove = authentication. Permit or deny a resource = authorization. Record = accounting. RADIUS for network access, TACACS+ for device administration.',
  },
  {
    slug: 'authentication-factors-mfa',
    title: 'Authentication Factors & MFA',
    domain: 1,
    objective: '4.6 Implement and maintain identity and access management',
    tagline: 'Something you know, have, are, do — and why two of the same kind is not multifactor.',
    difficulty: 'Beginner',
    minutes: 10,
    keywords: ['mfa', '2fa', 'totp', 'fido2', 'passkey', 'biometrics', 'factors', 'push fatigue'],
    simple: {
      what:
        "An authentication factor is a category of evidence that you are who you claim to be. There are five recognised categories: something you know (password, PIN), something you have (token, phone, smart card), something you are (fingerprint, face, iris), something you do (typing rhythm, gait), and somewhere you are (geolocation, network). Multifactor authentication means combining evidence from two or more different categories.",
      why:
        "Passwords are stolen in bulk — through phishing, breaches, keyloggers and reuse. A second factor from a different category means the attacker has to compromise two independent things, usually in two independent ways, at the same time.",
      how: [
        "A password plus an SMS code is MFA, but SMS is vulnerable to SIM swapping and interception, so NIST discourages it for high-value accounts.",
        "TOTP apps generate a 6-digit code from a shared secret and the current time. Better than SMS, still phishable in real time.",
        "FIDO2 and passkeys use public key cryptography bound to the site origin. The private key never leaves the authenticator and it refuses to sign for a lookalike domain — this is what phishing-resistant means.",
        "A password plus a security question is NOT multifactor. Both are something you know.",
      ],
      where: [
        "Every cloud administrator account should use hardware-backed MFA — this is the single highest-value control most organisations can deploy.",
        "Smart card plus PIN is standard for government and defence (PIV/CAC cards).",
        "Risk-based or adaptive authentication triggers step-up MFA only when the context looks unusual.",
      ],
    },
    diagram: {
      title: 'Why FIDO2 resists phishing when TOTP does not',
      caption:
        'The attacker relays a TOTP code in real time. With FIDO2 the browser refuses to sign because the origin does not match the stored credential.',
      columns: [
        [{ id: 'user', label: 'User', sub: 'clicks a phishing link', tone: 'primary', icon: 'User' }],
        [{ id: 'proxy', label: 'Attacker Proxy', sub: 'evilginx-style relay', tone: 'danger', icon: 'Shuffle' }],
        [
          { id: 'totp', label: 'TOTP Path', sub: 'code is just a number', tone: 'warn', icon: 'Timer' },
          { id: 'fido', label: 'FIDO2 Path', sub: 'signature bound to origin', tone: 'safe', icon: 'KeyRound' },
        ],
        [
          { id: 'pwn', label: 'Session Stolen', sub: 'relay succeeds', tone: 'danger', icon: 'ShieldOff' },
          { id: 'block', label: 'Signature Refused', sub: 'origin mismatch', tone: 'safe', icon: 'ShieldCheck' },
        ],
      ],
      edges: [
        { from: 'user', to: 'proxy', label: 'credentials', tone: 'danger', animated: true },
        { from: 'proxy', to: 'totp', tone: 'warn', animated: true },
        { from: 'proxy', to: 'fido', tone: 'safe', animated: true },
        { from: 'totp', to: 'pwn', label: 'code replayed in seconds', tone: 'danger' },
        { from: 'fido', to: 'block', label: 'domain does not match', tone: 'safe' },
      ],
      legend: [
        { tone: 'danger', label: 'Attacker controlled' },
        { tone: 'warn', label: 'Phishable factor' },
        { tone: 'safe', label: 'Phishing-resistant factor' },
      ],
    },
    visual: 'lock',
    realWorld: {
      title: 'MFA fatigue: the attack that beat a global rideshare company',
      body:
        "An attacker who already had a valid password triggered push notifications repeatedly, over and over, late at night. Eventually the exhausted employee approved one just to stop the buzzing. The attacker then contacted the employee on a messaging app claiming to be IT support and confirmed the approval. Number matching — where the user must type a number displayed on the login screen into the app — was introduced across the industry specifically to kill this attack, because it requires the user to actually see the legitimate login screen.",
      takeaway:
        'Push-approval MFA is only as strong as the tired human approving it. Number matching and phishing-resistant factors remove the human judgement.',
    },
    attack: {
      title: 'Adversary-in-the-middle phishing against OTP',
      intro:
        'Modern phishing kits do not just harvest passwords — they proxy the entire authentication flow live, harvesting the resulting session cookie.',
      steps: [
        { label: 'Lure', detail: 'Victim receives a message with a link to a domain that closely resembles the real login page.' },
        { label: 'Relay', detail: 'The phishing site is a reverse proxy. Every keystroke is passed through to the genuine site in real time.' },
        { label: 'Harvest OTP', detail: 'The genuine site prompts for the TOTP code. The victim types it into the proxy, which relays it within seconds.' },
        { label: 'Steal session', detail: 'The genuine site issues a session cookie to the proxy. MFA is now bypassed entirely for the life of that session.' },
        { label: 'Persist', detail: 'The attacker registers their own MFA method or an OAuth application so they retain access after the cookie expires.' },
      ],
      mitigations: [
        'Deploy FIDO2 security keys or passkeys — origin binding makes the relay fail.',
        'Shorten session lifetimes and bind tokens to device or client certificate where possible.',
        'Alert on new MFA method registration and new OAuth consent grants.',
        'Use conditional access to require a compliant, managed device for sensitive applications.',
      ],
    },
    tools: [
      { name: 'YubiKey / FIDO2 security keys', what: 'Hardware authenticators implementing WebAuthn and FIDO2.', why: 'The reference implementation of phishing-resistant MFA.', url: 'https://fidoalliance.org/fido2/', category: 'Authenticator' },
      { name: 'Google Authenticator / Aegis', what: 'TOTP code generators.', why: 'Free upgrade over SMS, and the easiest way to demonstrate time-based one-time passwords.', category: 'Authenticator' },
      { name: 'Hydra', what: 'Network login brute-force tool.', why: 'Used in authorised testing to prove how quickly single-factor authentication falls.', url: 'https://github.com/vanhauser-thc/thc-hydra', category: 'Offensive testing' },
    ],
    links: [
      { label: 'NIST SP 800-63B — Authentication and Lifecycle Management', url: 'https://pages.nist.gov/800-63-3/sp800-63b.html', source: 'NIST' },
      { label: 'FIDO Alliance — What is FIDO2?', url: 'https://fidoalliance.org/fido2/', source: 'FIDO Alliance' },
      { label: 'CISA — Implementing Phishing-Resistant MFA', url: 'https://www.cisa.gov/sites/default/files/publications/fact-sheet-implementing-phishing-resistant-mfa-508c.pdf', source: 'CISA' },
      { label: 'OWASP — Authentication Cheat Sheet', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html', source: 'OWASP' },
    ],
    quiz: [
      {
        q: 'A system requires a password and the answer to a security question. Why is this not multifactor authentication?',
        options: [
          'Security questions are not stored securely',
          'Both are something you know, so only one factor category is used',
          'Multifactor requires at least three factors',
          'It is multifactor, because two separate prompts are shown',
        ],
        answer: 1,
        explain:
          'Multifactor requires factors from different categories. Two knowledge-based secrets are multi-step, not multifactor.',
      },
      {
        q: 'Which authentication method is considered phishing-resistant?',
        options: ['SMS one-time passcode', 'TOTP authenticator app', 'FIDO2 security key using WebAuthn', 'Push notification approval'],
        answer: 2,
        explain:
          'FIDO2 credentials are cryptographically bound to the origin (the exact domain), so the authenticator will not produce a valid signature for a lookalike phishing site.',
      },
      {
        q: 'A user receives dozens of unexpected MFA push prompts at 2 a.m. What is happening and what control best prevents it?',
        options: [
          'Password spraying; enforce account lockout',
          'MFA fatigue / push bombing; enable number matching or move to FIDO2',
          'SIM swap; move to SMS OTP',
          'Session hijacking; rotate TLS certificates',
        ],
        answer: 1,
        explain:
          'The attacker already holds the password and is spamming approvals hoping for one accidental accept. Number matching forces the user to read a value from the real login screen.',
      },
    ],
    examTip:
      'Remember the five categories: know, have, are, do, where. If a question offers two items from the same category, it is not MFA. If the question says phishing-resistant, the answer is FIDO2, WebAuthn, passkeys or smart card certificates.',
  },
  {
    slug: 'authorization-access-control-models',
    title: 'Authorization & Access Control Models',
    domain: 1,
    objective: '4.6 Implement and maintain identity and access management',
    tagline: 'RBAC, ABAC, MAC, DAC and rule-based — how systems decide who gets in.',
    difficulty: 'Intermediate',
    minutes: 10,
    keywords: ['rbac', 'abac', 'mac', 'dac', 'least privilege', 'access control', 'permissions', 'separation of duties'],
    simple: {
      what:
        "Once you know who someone is, an access control model decides what they may do. Discretionary access control (DAC) lets the data owner set permissions. Mandatory access control (MAC) enforces system-wide labels that users cannot override. Role-based access control (RBAC) grants permissions to roles and assigns people to roles. Attribute-based access control (ABAC) evaluates a policy over attributes of the user, the resource, the action and the environment. Rule-based access control applies conditions such as time of day.",
      why:
        "Without a model, permissions get granted one at a time by whoever is asking. Within two years nobody knows who can see payroll. A model makes access reviewable, repeatable and revocable.",
      how: [
        "DAC: NTFS and POSIX file permissions. Flexible, but privilege creeps because owners keep sharing.",
        "MAC: SELinux, and classification systems where a Secret document is unreadable to a Confidential clearance regardless of what anyone wants.",
        "RBAC: 'Finance Analyst' role carries a fixed permission set. Joiners and leavers become a role assignment, not thirty ticket requests.",
        "ABAC: permit if user.department == resource.owner_department AND device.compliant == true AND time is within business hours. Far more expressive, far harder to audit.",
      ],
      where: [
        "Cloud IAM policies are effectively ABAC — conditions on tags, source IP, MFA state and time.",
        "Hospitals use RBAC for job function plus break-glass emergency access with heavy accounting.",
        "Zero trust architectures depend on ABAC because the decision must consider device posture and risk score at request time.",
      ],
    },
    diagram: {
      title: 'A policy decision point evaluating an access request',
      caption:
        'The XACML pattern: enforcement and decision are separated so policy can change without redeploying the application.',
      columns: [
        [{ id: 'sub', label: 'Subject', sub: 'authenticated user or service', tone: 'primary', icon: 'User' }],
        [{ id: 'pep', label: 'Policy Enforcement Point', sub: 'gateway / app / OS', tone: 'neutral', icon: 'DoorClosed' }],
        [{ id: 'pdp', label: 'Policy Decision Point', sub: 'evaluates the rules', tone: 'violet', icon: 'Scale' }],
        [
          { id: 'attrs', label: 'Attributes', sub: 'role, dept, device posture, time', tone: 'neutral', icon: 'Tags' },
          { id: 'permit', label: 'Permit', sub: 'with least privilege scope', tone: 'safe', icon: 'CircleCheck' },
          { id: 'deny', label: 'Deny', sub: 'logged and alerted', tone: 'danger', icon: 'CircleX' },
        ],
      ],
      edges: [
        { from: 'sub', to: 'pep', label: 'access request', tone: 'primary', animated: true },
        { from: 'pep', to: 'pdp', label: 'authorisation query', tone: 'violet', animated: true },
        { from: 'pdp', to: 'attrs', label: 'fetch context', tone: 'neutral' },
        { from: 'pdp', to: 'permit', tone: 'safe' },
        { from: 'pdp', to: 'deny', tone: 'danger' },
      ],
      legend: [
        { tone: 'safe', label: 'Allowed' },
        { tone: 'danger', label: 'Blocked' },
      ],
    },
    realWorld: {
      title: 'Privilege creep and the eleven-year employee',
      body:
        "An analyst joins in finance, moves to procurement, then to internal audit. Each move adds access, and nothing is ever removed because removing access breaks things and nobody wants that ticket. Eleven years later that one account can raise a purchase order, approve it, and audit the result — a complete failure of separation of duties. This is the single most common finding in access audits, and it is why user access reviews and role-based provisioning exist. The fix is recertification: periodically force managers to reconfirm every entitlement, and default to removal.",
      takeaway: 'Access must expire by default. Permanent entitlement is how insider fraud becomes possible.',
    },
    attack: {
      title: 'Privilege escalation through an over-permissive cloud role',
      intro:
        'Attackers rarely need a kernel exploit in the cloud. They look for an identity that can grant itself more power.',
      steps: [
        { label: 'Foothold', detail: 'Attacker compromises a low-privilege application role through a leaked access key in a public repository.' },
        { label: 'Enumerate', detail: 'They list attached policies and discover the role holds iam:PassRole and iam:CreatePolicyVersion.' },
        { label: 'Escalate', detail: 'A new policy version granting full administrator rights is created and set as default — a legitimate API call, no exploit involved.' },
        { label: 'Persist', detail: 'A new IAM user with its own access keys is created outside the normal provisioning process.' },
        { label: 'Act', detail: 'Storage buckets are read, snapshots are copied to an external account, logging is disabled in one region.' },
      ],
      mitigations: [
        'Apply least privilege with permission boundaries and service control policies.',
        'Never leave wildcard actions on IAM write APIs in application roles.',
        'Alert on IAM policy changes, new principals and logging configuration changes.',
        'Use short-lived credentials from a workload identity provider rather than static access keys.',
      ],
    },
    tools: [
      { name: 'Open Policy Agent (OPA)', what: 'General purpose policy engine using the Rego language.', why: 'The standard way to implement ABAC as code for Kubernetes, APIs and microservices.', url: 'https://www.openpolicyagent.org/', category: 'Policy engine' },
      { name: 'BloodHound', what: 'Graphs attack paths through Active Directory permissions.', why: 'Shows visually how a chain of small permissions becomes domain administrator.', url: 'https://github.com/SpecterOps/BloodHound', category: 'Assessment' },
      { name: 'ScoutSuite / Prowler', what: 'Multi-cloud security posture auditing.', why: 'Finds over-permissive roles and public resources across AWS, Azure and GCP.', url: 'https://github.com/prowler-cloud/prowler', category: 'Cloud audit' },
    ],
    links: [
      { label: 'NIST SP 800-162 — Guide to Attribute Based Access Control', url: 'https://csrc.nist.gov/pubs/sp/800/162/upd2/final', source: 'NIST' },
      { label: 'NIST — Role Based Access Control project', url: 'https://csrc.nist.gov/projects/role-based-access-control', source: 'NIST' },
      { label: 'OWASP — Authorization Cheat Sheet', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html', source: 'OWASP' },
    ],
    quiz: [
      {
        q: 'A defence system labels every document Top Secret, Secret or Confidential, and the operating system refuses access below clearance even if the file owner tries to share it. Which model is this?',
        options: ['Discretionary access control', 'Mandatory access control', 'Role-based access control', 'Rule-based access control'],
        answer: 1,
        explain: 'MAC enforces labels centrally and the owner has no discretion to override them.',
      },
      {
        q: 'Which model best supports a policy such as "permit if the user is in Sales, the device is compliant, and the request is from a corporate network during business hours"?',
        options: ['DAC', 'RBAC', 'ABAC', 'MAC'],
        answer: 2,
        explain: 'Only attribute-based access control evaluates multiple attributes of subject, resource and environment together.',
      },
      {
        q: 'Which practice most directly prevents one employee from both creating and approving a payment?',
        options: ['Least privilege', 'Separation of duties', 'Job rotation', 'Mandatory vacation'],
        answer: 1,
        explain:
          'Separation of duties splits a sensitive process across two people. Job rotation and mandatory vacation are detective controls that surface fraud that is already happening.',
      },
    ],
    examTip:
      'DAC = owner decides. MAC = labels and clearances, no override. RBAC = job function. ABAC = attributes and conditions. Rule-based = if/then conditions such as time or IP.',
  },
{
    slug: 'non-repudiation',
    title: 'Non-repudiation',
    domain: 1,
    objective: '1.2 Summarize fundamental security concepts',
    tagline: 'Proof strong enough that the sender cannot credibly deny it.',
    difficulty: 'Beginner',
    minutes: 7,
    keywords: ['non-repudiation', 'digital signature', 'audit trail', 'accountability', 'attribution'],
    simple: {
      what:
        "Non-repudiation means someone cannot later deny having performed an action. It is built from two ingredients: strong authentication that binds an action to a unique identity, and a tamper-evident record of that action.",
      why:
        "Contracts, financial transfers, medical orders and code releases all depend on being able to prove who did what. Without non-repudiation, every dispute becomes one person's word against another's.",
      how: [
        "Digital signatures: the signer's private key produces a signature only they could create, and anyone with the public key can verify it.",
        "Audit logs written to append-only or write-once storage, with time synchronisation so the timeline is defensible.",
        "Video, biometrics and witnessed sign-off provide non-repudiation in physical processes.",
        "Shared accounts destroy non-repudiation completely — if five people know the admin password, nobody did it.",
      ],
      where: [
        "Signed software releases so users can prove a binary came from the vendor and not from an attacker.",
        "Signed email using S/MIME or PGP in legal and financial correspondence.",
        "Blockchain and distributed ledgers, where signed transactions in an append-only chain are the entire trust model.",
      ],
    },
    diagram: {
      title: 'Digital signature providing non-repudiation',
      caption:
        'Only the private key can create the signature; only the matching public key verifies it. That asymmetry is what makes denial implausible.',
      columns: [
        [{ id: 'doc', label: 'Document', sub: 'contract, transaction, binary', tone: 'neutral', icon: 'FileText' }],
        [{ id: 'hash', label: 'Hash', sub: 'SHA-256 digest', tone: 'primary', icon: 'Hash' }],
        [{ id: 'sign', label: 'Sign with Private Key', sub: 'held only by the sender', tone: 'violet', icon: 'PenTool' }],
        [{ id: 'send', label: 'Document + Signature', sub: 'transmitted together', tone: 'neutral', icon: 'Send' }],
        [
          { id: 'verify', label: 'Verify with Public Key', sub: 'anyone can check', tone: 'safe', icon: 'BadgeCheck' },
          { id: 'fail', label: 'Verification Fails', sub: 'altered or forged', tone: 'danger', icon: 'ShieldAlert' },
        ],
      ],
      edges: [
        { from: 'doc', to: 'hash', tone: 'primary', animated: true },
        { from: 'hash', to: 'sign', tone: 'violet', animated: true },
        { from: 'sign', to: 'send', tone: 'neutral', animated: true },
        { from: 'send', to: 'verify', label: 'hashes match', tone: 'safe' },
        { from: 'send', to: 'fail', label: 'hashes differ', tone: 'danger' },
      ],
      legend: [
        { tone: 'safe', label: 'Authentic and unaltered' },
        { tone: 'danger', label: 'Rejected' },
      ],
    },
    realWorld: {
      title: 'Code signing and the supply chain',
      body:
        "Operating systems refuse to install drivers that are not signed by a trusted publisher, and app stores reject unsigned builds. The signature proves both integrity (the binary was not modified in transit) and non-repudiation (this vendor, and only this vendor, produced it). It is also why stolen code-signing certificates are prized by attackers — malware signed with a legitimate certificate inherits the vendor's reputation and sails past defences. Several major intrusions have hinged on exactly that.",
      takeaway: 'The value of a signature is entirely dependent on the private key staying private. Protect signing keys in an HSM.',
    },
    attack: {
      title: 'Repudiation enabled by a shared administrator account',
      intro:
        'The attack here is organisational rather than technical: a control gap that makes attribution impossible after the fact.',
      steps: [
        { label: 'Shared credential', detail: 'Eight engineers use one root account because individual accounts were never provisioned.' },
        { label: 'Destructive change', detail: 'A production database is dropped at 03:14. The log shows the action, but the actor is only "root".' },
        { label: 'Investigation stalls', detail: 'Source IP resolves to the shared VPN pool. No session recording exists. Nobody claims responsibility.' },
        { label: 'No consequence', detail: 'Because attribution is impossible, no corrective action can be taken and the same risk remains.' },
      ],
      mitigations: [
        'Ban shared accounts; use named accounts with just-in-time privilege elevation.',
        'Deploy a privileged access management system that brokers, records and attributes every admin session.',
        'Synchronise clocks with NTP so timestamps across systems can be correlated.',
        'Ship logs off-host immediately to storage the account holder cannot modify.',
      ],
    },
    tools: [
      { name: 'GnuPG', what: 'Open implementation of the OpenPGP standard for signing and encrypting.', why: 'The simplest way to practise creating and verifying detached signatures.', url: 'https://gnupg.org/', category: 'Signing' },
      { name: 'Sigstore / Cosign', what: 'Keyless signing for containers and software artefacts.', why: 'Modern supply chain non-repudiation with a public transparency log.', url: 'https://www.sigstore.dev/', category: 'Supply chain' },
      { name: 'CyberArk / HashiCorp Vault', what: 'Privileged access management and secrets brokering.', why: 'Turns shared admin credentials into attributable, recorded sessions.', url: 'https://www.vaultproject.io/', category: 'PAM' },
    ],
    links: [
      { label: 'NIST FIPS 186-5 — Digital Signature Standard', url: 'https://csrc.nist.gov/pubs/fips/186-5/final', source: 'NIST' },
      { label: 'CISA — Securing the Software Supply Chain', url: 'https://www.cisa.gov/resources-tools/resources/securing-software-supply-chain-series', source: 'CISA' },
      { label: 'Sigstore documentation', url: 'https://docs.sigstore.dev/', source: 'Sigstore' },
    ],
    quiz: [
      {
        q: 'Which combination provides non-repudiation for an email message?',
        options: [
          'Encrypting the message with the recipient public key',
          'Signing the message with the sender private key',
          'Sending the message over TLS',
          'Hashing the message with SHA-256',
        ],
        answer: 1,
        explain:
          'Only the sender holds the private key, so only the sender could have produced a signature that verifies with their public key. Encryption gives confidentiality; hashing alone gives integrity but no identity.',
      },
      {
        q: 'Why do shared administrator accounts break non-repudiation?',
        options: [
          'Shared accounts cannot be logged',
          'Actions cannot be attributed to a single individual',
          'Shared accounts always use weak passwords',
          'Shared accounts bypass authorisation',
        ],
        answer: 1,
        explain: 'Non-repudiation requires a unique binding between an action and one identity. A shared credential destroys that binding.',
      },
    ],
    examTip:
      'If the question mentions proving who did something, or preventing denial, the answer almost always involves digital signatures or a tamper-evident audit trail.',
  },
  {
    slug: 'encryption-fundamentals',
    title: 'Encryption Fundamentals',
    domain: 1,
    objective: '1.4 Explain the importance of using appropriate cryptographic solutions',
    tagline: 'Symmetric for speed, asymmetric for key exchange — and why real systems use both.',
    difficulty: 'Beginner',
    minutes: 12,
    keywords: ['encryption', 'aes', 'rsa', 'symmetric', 'asymmetric', 'cipher', 'key exchange', 'ecc', 'plaintext', 'ciphertext'],
    simple: {
      what:
        "Encryption transforms readable plaintext into unreadable ciphertext using an algorithm and a key. Only someone with the correct key can reverse it. Symmetric encryption uses the same key to encrypt and decrypt. Asymmetric encryption uses a mathematically linked key pair — encrypt with one, decrypt with the other.",
      why:
        "Networks are shared and storage gets lost. Encryption means that intercepting the data or stealing the disk yields nothing useful without the key. It converts a data-protection problem into a much smaller key-protection problem.",
      how: [
        "Symmetric (AES-256, ChaCha20): extremely fast, ideal for bulk data. Problem — both parties must already share the key secretly.",
        "Asymmetric (RSA, ECC): solves key distribution because the public key can be published freely. Problem — it is orders of magnitude slower.",
        "Hybrid cryptography: use asymmetric to agree on a random symmetric session key, then use symmetric for the actual data. This is exactly what TLS does.",
        "Modern protocols use ephemeral key exchange (ECDHE) so a session key is discarded after use — giving perfect forward secrecy, where stealing the server key later cannot decrypt past traffic.",
      ],
      where: [
        "HTTPS/TLS on every website; ECDHE for key agreement plus AES-GCM for the record layer.",
        "Full disk encryption: BitLocker, FileVault and LUKS protect data at rest on laptops.",
        "Messaging: Signal Protocol combines Diffie-Hellman ratcheting with symmetric ciphers for end-to-end encryption.",
      ],
    },
    diagram: {
      title: 'Hybrid encryption — how TLS actually works',
      caption:
        'Asymmetric cryptography is used once, to agree a key. Everything after that is fast symmetric encryption.',
      columns: [
        [{ id: 'pt', label: 'Plaintext', sub: 'the real message', tone: 'neutral', icon: 'FileText' }],
        [
          { id: 'kex', label: 'Key Exchange', sub: 'ECDHE using public keys', tone: 'violet', icon: 'KeyRound' },
        ],
        [{ id: 'sess', label: 'Session Key', sub: 'random symmetric key, per session', tone: 'primary', icon: 'Key' }],
        [{ id: 'enc', label: 'Symmetric Cipher', sub: 'AES-256-GCM', tone: 'primary', icon: 'Lock' }],
        [{ id: 'ct', label: 'Ciphertext', sub: 'safe to send over the internet', tone: 'safe', icon: 'ShieldCheck' }],
        [{ id: 'dec', label: 'Decrypt', sub: 'same session key at the far end', tone: 'safe', icon: 'LockOpen' }],
      ],
      edges: [
        { from: 'pt', to: 'enc', label: 'input', tone: 'neutral', animated: true },
        { from: 'kex', to: 'sess', label: 'derives', tone: 'violet', animated: true },
        { from: 'sess', to: 'enc', label: 'keys the cipher', tone: 'primary' },
        { from: 'enc', to: 'ct', tone: 'safe', animated: true },
        { from: 'ct', to: 'dec', label: 'over the wire', tone: 'safe', animated: true },
      ],
      legend: [
        { tone: 'violet', label: 'Asymmetric (slow, solves distribution)' },
        { tone: 'primary', label: 'Symmetric (fast, bulk data)' },
      ],
    },
    visual: 'lock',
    realWorld: {
      title: 'How a bank protects a card payment end to end',
      body:
        "When you tap your card, the terminal and the acquirer establish a TLS session using ECDHE for key agreement and AES-GCM for the data. The card itself performs asymmetric cryptography to prove it is genuine and not a clone. The primary account number is then tokenised so the merchant never stores the real number, and whatever is stored is encrypted at rest with keys held in a hardware security module. Four different cryptographic protections, each covering a different point where the data could be intercepted — in transit, at the terminal, in the merchant database, and in the card itself.",
      takeaway: 'Encryption in transit and encryption at rest solve different problems. You need both.',
    },
    attack: {
      title: 'Downgrade and harvest-now-decrypt-later',
      intro:
        'Attackers who cannot break the cipher attack the negotiation, the implementation, or simply wait for better computers.',
      steps: [
        { label: 'Intercept', detail: 'An on-path attacker sits between client and server, typically on hostile Wi-Fi or a compromised router.' },
        { label: 'Downgrade', detail: 'The handshake is manipulated to negotiate an obsolete protocol version or a weak export-grade cipher suite.' },
        { label: 'Break the weak link', detail: 'The deliberately weakened key is factored or brute-forced within practical time.' },
        { label: 'Harvest', detail: 'If downgrade fails, the attacker simply records the encrypted traffic and stores it, betting on future cryptanalysis or quantum computing.' },
        { label: 'Decrypt later', detail: 'Without forward secrecy, a future compromise of the server private key would unlock every recorded session.' },
      ],
      mitigations: [
        'Disable SSL 3.0, TLS 1.0 and TLS 1.1; require TLS 1.2 minimum and prefer TLS 1.3.',
        'Use only AEAD cipher suites and ephemeral key exchange (ECDHE) so past sessions stay protected.',
        'Enable HSTS so browsers refuse to fall back to plaintext HTTP.',
        'Plan a migration path to post-quantum algorithms for long-lived secrets.',
      ],
    },
    tools: [
      { name: 'OpenSSL', what: 'Swiss army knife for TLS and cryptographic operations.', why: 'Inspect certificates, test cipher suites and encrypt files from the command line.', url: 'https://www.openssl.org/', category: 'Crypto toolkit' },
      { name: 'Qualys SSL Labs', what: 'Free external TLS configuration grader.', why: 'Gives a letter grade and lists every weak protocol and cipher on a public endpoint.', url: 'https://www.ssllabs.com/ssltest/', category: 'Assessment' },
      { name: 'testssl.sh', what: 'Command line TLS scanner.', why: 'Works against internal hosts that SSL Labs cannot reach.', url: 'https://testssl.sh/', category: 'Assessment' },
    ],
    links: [
      { label: 'NIST SP 800-175B — Guideline for Using Cryptographic Standards', url: 'https://csrc.nist.gov/pubs/sp/800/175/b/r1/final', source: 'NIST' },
      { label: 'NIST Post-Quantum Cryptography project', url: 'https://csrc.nist.gov/projects/post-quantum-cryptography', source: 'NIST' },
      { label: 'OWASP — Transport Layer Security Cheat Sheet', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Transport_Layer_Security_Cheat_Sheet.html', source: 'OWASP' },
      { label: 'Cloudflare — A detailed look at TLS 1.3', url: 'https://blog.cloudflare.com/rfc-8446-aka-tls-1-3/', source: 'Cloudflare' },
    ],
    quiz: [
      {
        q: 'Why do real systems combine asymmetric and symmetric encryption instead of using only one?',
        options: [
          'Symmetric encryption is insecure on its own',
          'Asymmetric solves key distribution but is too slow for bulk data',
          'Asymmetric encryption cannot protect confidentiality',
          'Regulations require two algorithms',
        ],
        answer: 1,
        explain:
          'Asymmetric cryptography lets two strangers agree on a key over an open network, but it is far too slow for a video stream. So it is used once to establish a fast symmetric session key.',
      },
      {
        q: 'What security property does ephemeral Diffie-Hellman (ECDHE) provide?',
        options: ['Non-repudiation', 'Perfect forward secrecy', 'Data integrity', 'Faster handshakes'],
        answer: 1,
        explain:
          'Because the session key is generated per session and never stored, later compromise of the server long-term private key does not reveal previously recorded sessions.',
      },
      {
        q: 'An organisation encrypts backup tapes with AES-256. Which risk remains largely unaddressed?',
        options: [
          'Someone stealing a tape from the courier van',
          'An administrator with legitimate access copying data before it is encrypted',
          'A tape being read on a different tape drive',
          'Tapes being intercepted in transit',
        ],
        answer: 1,
        explain:
          'Encryption at rest protects against loss of the physical media. It does nothing about an authorised insider who can access the plaintext, which is why DLP and monitoring are also required.',
      },
    ],
    examTip:
      'Symmetric = one shared key, fast, AES/ChaCha20/3DES. Asymmetric = key pair, slow, RSA/ECC/Diffie-Hellman. Confidentiality uses the recipient public key; non-repudiation uses the sender private key.',
  },
  {
    slug: 'hashing-integrity',
    title: 'Hashing & Data Integrity',
    domain: 1,
    objective: '1.4 Explain the importance of using appropriate cryptographic solutions',
    tagline: 'One-way fingerprints — and why salt matters more than the algorithm.',
    difficulty: 'Beginner',
    minutes: 9,
    keywords: ['hash', 'sha-256', 'md5', 'collision', 'salt', 'bcrypt', 'argon2', 'hmac', 'rainbow table', 'integrity'],
    simple: {
      what:
        "A hash function takes input of any size and produces a fixed-length output called a digest. It is one-way — you cannot reverse a digest back into the original — and deterministic, so the same input always produces the same digest. Change one bit of input and the digest changes completely.",
      why:
        "Hashing lets you verify that data has not changed without needing to store or transmit the data itself. It also lets systems verify passwords without ever storing them.",
      how: [
        "Integrity checking: publish the SHA-256 digest of a download; users hash their copy and compare.",
        "Password storage: never store the password. Store a salted hash produced by a deliberately slow algorithm such as bcrypt, scrypt or Argon2id.",
        "Salt is a unique random value added per password. It defeats rainbow tables and ensures two users with the same password get different digests.",
        "HMAC combines a hash with a secret key so an attacker who can modify the message cannot recompute a valid tag.",
      ],
      where: [
        "Software vendors publish SHA-256 checksums for installers and ISOs.",
        "Digital forensics: an evidence image is hashed at acquisition, and the hash is re-verified to prove nothing changed in custody.",
        "Git identifies every commit by a hash, which is why the history is tamper-evident.",
      ],
    },
    diagram: {
      title: 'Password verification with salt and a slow hash',
      caption:
        'The password is never stored. Only the salt and the digest are, and the salt is different for every single user.',
      columns: [
        [{ id: 'pw', label: 'Password', sub: 'entered by user', tone: 'neutral', icon: 'KeySquare' }],
        [{ id: 'salt', label: 'Unique Salt', sub: 'random per user, stored openly', tone: 'warn', icon: 'Sparkles' }],
        [{ id: 'kdf', label: 'Slow KDF', sub: 'Argon2id / bcrypt, high work factor', tone: 'violet', icon: 'Cpu' }],
        [{ id: 'digest', label: 'Stored Digest', sub: 'in the user database', tone: 'primary', icon: 'Database' }],
        [
          { id: 'match', label: 'Match', sub: 'authentication succeeds', tone: 'safe', icon: 'CircleCheck' },
          { id: 'nomatch', label: 'No Match', sub: 'authentication fails', tone: 'danger', icon: 'CircleX' },
        ],
      ],
      edges: [
        { from: 'pw', to: 'kdf', tone: 'neutral', animated: true },
        { from: 'salt', to: 'kdf', label: 'mixed in', tone: 'warn', animated: true },
        { from: 'kdf', to: 'digest', label: 'compare', tone: 'primary', animated: true },
        { from: 'digest', to: 'match', tone: 'safe' },
        { from: 'digest', to: 'nomatch', tone: 'danger' },
      ],
      legend: [
        { tone: 'safe', label: 'Accepted' },
        { tone: 'danger', label: 'Rejected' },
      ],
    },
    realWorld: {
      title: 'Why one breached password database is catastrophic and another is a shrug',
      body:
        "Two companies both lose their user table. Company A stored unsalted MD5 digests; commodity GPU rigs crack tens of billions of MD5 hashes per second, so essentially every password in that table is recovered within hours, and because people reuse passwords the damage spreads to unrelated services. Company B used Argon2id with a per-user salt and a tuned memory cost; each guess costs real memory and milliseconds, so even a modest password takes an infeasible amount of compute, and the salts mean the attacker must attack each user separately. Same breach, entirely different outcome — determined by one implementation decision made years earlier.",
      takeaway: 'For passwords, slow and salted beats fast and clever. Never use plain SHA-256 for password storage.',
    },
    attack: {
      title: 'Offline cracking of a stolen password database',
      intro:
        'Once the hashes are stolen, the attacker is offline — no rate limits, no lockouts, no alerts. Only the cost per guess protects you.',
      steps: [
        { label: 'Dump', detail: 'A SQL injection flaw exposes the users table containing usernames and password digests.' },
        { label: 'Identify', detail: 'Digest length and format reveal the algorithm — 32 hex characters means MD5, 60 characters starting with $2b$ means bcrypt.' },
        { label: 'Wordlist attack', detail: 'A dictionary of previously breached passwords plus mangling rules covers the majority of human-chosen passwords.' },
        { label: 'Rainbow tables', detail: 'If no salt is present, precomputed tables reverse common digests almost instantly.' },
        { label: 'Reuse', detail: 'Recovered plaintext passwords are replayed against email, banking and cloud services in a credential stuffing campaign.' },
      ],
      mitigations: [
        'Use Argon2id, scrypt or bcrypt with a tuned work factor, plus a unique random salt per user.',
        'Consider a server-side secret pepper stored outside the database.',
        'Enforce MFA so a cracked password alone is insufficient.',
        'Screen new passwords against known-breached corpora and monitor for credential stuffing patterns.',
      ],
    },
    tools: [
      { name: 'Hashcat', what: 'GPU-accelerated password recovery supporting hundreds of hash types.', why: 'The industry standard for authorised password audits — proves empirically how weak your policy is.', url: 'https://hashcat.net/hashcat/', category: 'Offensive testing' },
      { name: 'John the Ripper', what: 'Long-established password cracking framework.', why: 'Excellent at identifying hash formats and running rule-based attacks.', url: 'https://www.openwall.com/john/', category: 'Offensive testing' },
      { name: 'sha256sum / Get-FileHash', what: 'Built-in hashing utilities on Linux and Windows.', why: 'Verify downloads and forensic images without installing anything.', category: 'Integrity' },
    ],
    links: [
      { label: 'NIST FIPS 180-4 — Secure Hash Standard', url: 'https://csrc.nist.gov/pubs/fips/180-4/upd1/final', source: 'NIST' },
      { label: 'OWASP — Password Storage Cheat Sheet', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html', source: 'OWASP' },
      { label: 'NIST SP 800-63B — Memorized Secret Verifiers', url: 'https://pages.nist.gov/800-63-3/sp800-63b.html#memsecret', source: 'NIST' },
    ],
    quiz: [
      {
        q: 'What is the primary purpose of adding a unique salt to each password before hashing?',
        options: [
          'It makes the hash function run faster',
          'It prevents precomputed rainbow table attacks and identical passwords producing identical digests',
          'It allows the password to be recovered later',
          'It converts the hash into an encryption operation',
        ],
        answer: 1,
        explain:
          'A unique salt means the attacker cannot reuse any precomputation across users, and two users with the same password no longer share a digest.',
      },
      {
        q: 'Which algorithm should NOT be used for new integrity or signature applications because practical collisions exist?',
        options: ['SHA-256', 'SHA-3', 'MD5', 'BLAKE2'],
        answer: 2,
        explain: 'MD5 (and SHA-1) have practical collision attacks. They may still appear for non-security checksums, but never for security decisions.',
      },
      {
        q: 'A forensic analyst images a hard drive and records the SHA-256 hash immediately. Why?',
        options: [
          'To compress the image',
          'To encrypt the evidence',
          'To prove later that the image has not been altered',
          'To speed up analysis',
        ],
        answer: 2,
        explain: 'Re-hashing the image at any point and matching the original digest demonstrates integrity of evidence throughout the chain of custody.',
      },
    ],
    examTip:
      'Hashing = integrity, one-way, no key. Encryption = confidentiality, reversible, needs a key. HMAC = integrity plus authenticity, uses a shared secret key.',
  },
{
    slug: 'pki-certificates',
    title: 'PKI, Certificates & Trust',
    domain: 1,
    objective: '1.4 Explain the importance of using appropriate cryptographic solutions',
    tagline: 'How your browser decides to trust a server it has never met.',
    difficulty: 'Intermediate',
    minutes: 12,
    keywords: ['pki', 'certificate', 'ca', 'csr', 'x.509', 'root of trust', 'crl', 'ocsp', 'chain of trust', 'self-signed'],
    simple: {
      what:
        "Public key infrastructure is the system of certificate authorities, certificates, policies and revocation mechanisms that lets you trust a public key really belongs to a specific identity. An X.509 certificate is a signed statement from a certificate authority saying: this public key belongs to this name, and it is valid until this date.",
      why:
        "Asymmetric cryptography only helps if you have the right public key. Without PKI, an attacker could hand you their public key while claiming to be your bank, and every cryptographic guarantee would still be mathematically perfect and completely worthless.",
      how: [
        "Generate a key pair, then create a certificate signing request (CSR) containing the public key and the identity details.",
        "A certificate authority validates the identity (domain control, organisation documents) and signs the certificate with its own private key.",
        "Clients ship with a root store of trusted CA certificates. Verification walks the chain: leaf, intermediate, root — each signature checked, plus expiry, name match and revocation status.",
        "Revocation is handled by certificate revocation lists (CRL) or OCSP; OCSP stapling lets the server present a fresh signed status so the client does not have to ask the CA.",
      ],
      where: [
        "Every HTTPS website, plus internal PKI for VPNs, 802.1X, code signing, S/MIME email and mutual TLS between microservices.",
        "Smart cards and PIV credentials embed certificates for strong authentication.",
        "Certificate transparency logs publicly record every certificate issued for a domain so misissuance is detectable.",
      ],
    },
    diagram: {
      title: 'Certificate chain of trust and validation',
      caption:
        'Trust flows down from a root the client already has. Every link is a signature, and a single broken link invalidates the whole chain.',
      columns: [
        [{ id: 'root', label: 'Root CA', sub: 'offline, in the browser trust store', tone: 'violet', icon: 'Landmark' }],
        [{ id: 'inter', label: 'Intermediate CA', sub: 'signs day-to-day certificates', tone: 'primary', icon: 'Building2' }],
        [{ id: 'leaf', label: 'Server Certificate', sub: 'CN/SAN = example.com', tone: 'primary', icon: 'FileBadge' }],
        [{ id: 'client', label: 'Client Validation', sub: 'chain, expiry, name, revocation', tone: 'neutral', icon: 'SearchCheck' }],
        [
          { id: 'trust', label: 'Padlock Shown', sub: 'session established', tone: 'safe', icon: 'Lock' },
          { id: 'warn', label: 'Warning Page', sub: 'expired, wrong name or untrusted', tone: 'danger', icon: 'TriangleAlert' },
        ],
      ],
      edges: [
        { from: 'root', to: 'inter', label: 'signs', tone: 'violet', animated: true },
        { from: 'inter', to: 'leaf', label: 'signs', tone: 'primary', animated: true },
        { from: 'leaf', to: 'client', label: 'presented in handshake', tone: 'neutral', animated: true },
        { from: 'client', to: 'trust', label: 'all checks pass', tone: 'safe' },
        { from: 'client', to: 'warn', label: 'any check fails', tone: 'danger' },
      ],
      legend: [
        { tone: 'safe', label: 'Valid chain' },
        { tone: 'danger', label: 'Validation failure' },
      ],
    },
    realWorld: {
      title: 'The expired certificate outage',
      body:
        "Certificate expiry has taken down payment networks, mobile operators and national services — not through any attack, but because a renewal was missed. Expiry is a security feature: it limits the damage window if a key is quietly stolen. The operational answer is not longer certificates but shorter ones plus automation. ACME and Let's Encrypt made ninety-day certificates normal precisely because a certificate you renew every sixty days automatically is one you can never forget to renew. Track expiry in monitoring the same way you track disk space.",
      takeaway: 'Certificate lifecycle management is an availability control as much as a confidentiality one.',
    },
    attack: {
      title: 'On-path interception using a rogue certificate authority',
      intro:
        'If an attacker can get a CA certificate into the trust store, they can silently decrypt everything — this is also exactly how corporate TLS inspection works.',
      steps: [
        { label: 'Install trust', detail: 'Malware or a malicious MDM profile adds an attacker-controlled root CA to the device trust store.' },
        { label: 'Intercept', detail: 'Traffic is redirected through a proxy via ARP spoofing, rogue Wi-Fi or DNS manipulation.' },
        { label: 'Forge', detail: 'The proxy mints a certificate for the requested domain on the fly and signs it with the rogue root.' },
        { label: 'Decrypt', detail: 'The browser sees a valid chain and shows a padlock. The attacker reads and modifies plaintext at will.' },
        { label: 'Re-encrypt', detail: 'Traffic is forwarded to the genuine server so nothing appears broken to the user.' },
      ],
      mitigations: [
        'Monitor and lock down the device trust store; alert on new root CA installation.',
        'Use certificate pinning or mutual TLS for high-value mobile and machine-to-machine connections.',
        'Watch certificate transparency logs for unexpected certificates issued for your domains.',
        'Enforce HSTS and deploy DNSSEC and DoH to reduce redirection opportunities.',
      ],
    },
    tools: [
      { name: 'OpenSSL', what: 'Create CSRs, inspect certificates, build a lab CA.', why: 'openssl s_client -connect host:443 shows the entire presented chain.', url: 'https://www.openssl.org/', category: 'Crypto toolkit' },
      { name: 'Certbot / ACME clients', what: 'Automated certificate issuance and renewal.', why: 'Eliminates the single most common cause of TLS outages.', url: 'https://certbot.eff.org/', category: 'Automation' },
      { name: 'crt.sh', what: 'Searchable certificate transparency log.', why: 'Find every certificate ever issued for your domain, including ones you did not request.', url: 'https://crt.sh/', category: 'Monitoring' },
    ],
    links: [
      { label: 'NIST SP 1800-16 — Securing Web Transactions: TLS Certificate Management', url: 'https://csrc.nist.gov/pubs/sp/1800/16/final', source: 'NIST' },
      { label: 'RFC 5280 — X.509 Certificate and CRL Profile', url: 'https://www.rfc-editor.org/rfc/rfc5280', source: 'IETF' },
      { label: 'Certificate Transparency', url: 'https://certificate.transparency.dev/', source: 'Google' },
    ],
    quiz: [
      {
        q: 'A browser shows a certificate warning stating the name does not match. What has most likely happened?',
        options: [
          'The certificate has expired',
          'The certificate was revoked',
          'The domain being visited is not listed in the certificate subject alternative name field',
          'The private key was compromised',
        ],
        answer: 2,
        explain: 'Name mismatch means the SAN entries do not cover the hostname requested — common with shared hosting, IP-address access or interception.',
      },
      {
        q: 'What does OCSP stapling improve compared with standard OCSP?',
        options: [
          'It encrypts the certificate',
          'The server presents a recent signed revocation status, so the client does not contact the CA — improving privacy and speed',
          'It extends the certificate lifetime',
          'It replaces the need for a certificate authority',
        ],
        answer: 1,
        explain: 'Stapling removes a round trip to the CA and stops the CA from learning which clients visit which sites.',
      },
      {
        q: 'Why is the root CA private key normally kept offline in an HSM?',
        options: [
          'To reduce licensing costs',
          'Because compromise of the root would invalidate trust in every certificate beneath it',
          'Because roots expire quickly',
          'To comply with DNS requirements',
        ],
        answer: 1,
        explain:
          'The root is the anchor of trust and cannot be easily replaced, so it is kept offline and only used to sign intermediates.',
      },
    ],
    examTip:
      'Know the objects: CSR (request), CA (issuer), CRL and OCSP (revocation), SAN (names covered), wildcard (*.example.com), self-signed (no external trust), pinning (hard-code the expected certificate).',
  },
  {
    slug: 'zero-trust',
    title: 'Zero Trust',
    domain: 1,
    objective: '1.2 Summarize fundamental security concepts',
    tagline: 'Never trust, always verify — the death of the trusted internal network.',
    difficulty: 'Intermediate',
    minutes: 11,
    keywords: ['zero trust', 'ztna', 'microsegmentation', 'control plane', 'data plane', 'policy engine', 'implicit trust', 'beyondcorp'],
    simple: {
      what:
        "Zero trust is a design philosophy that removes implicit trust based on network location. Being inside the corporate LAN grants you nothing. Every request is authenticated, authorised and encrypted based on identity, device health and context, and it is re-evaluated continuously rather than once at login.",
      why:
        "The old castle-and-moat model assumed the inside was safe. Cloud, remote work and contractors dissolved the perimeter, and every major breach shows the same pattern: one foothold inside, then unrestricted lateral movement. Zero trust makes the foothold far less valuable.",
      how: [
        "NIST SP 800-207 splits the architecture into a control plane (policy engine, policy administrator) and a data plane (policy enforcement points sitting in front of every resource).",
        "The policy engine evaluates identity, device compliance, sensitivity of the resource, behaviour and risk score to reach a decision.",
        "Microsegmentation shrinks the blast radius so a compromised host cannot reach anything it does not explicitly need.",
        "Access is granted per session and per resource, with the smallest scope and the shortest lifetime that still gets the work done.",
      ],
      where: [
        "Zero trust network access (ZTNA) replacing traditional VPN for remote workforces.",
        "Service mesh mutual TLS between microservices, where every service proves its identity to every other service.",
        "US federal agencies operate under an executive mandate to adopt zero trust architecture.",
      ],
    },
    diagram: {
      title: 'NIST zero trust architecture — control plane and data plane',
      caption:
        'The subject never talks directly to the resource. Every request passes an enforcement point that asks the policy engine first.',
      columns: [
        [{ id: 'subj', label: 'Subject', sub: 'user + device', tone: 'primary', icon: 'UserCheck' }],
        [{ id: 'pep', label: 'Policy Enforcement Point', sub: 'data plane proxy', tone: 'neutral', icon: 'DoorClosed' }],
        [
          { id: 'pe', label: 'Policy Engine', sub: 'grants or denies', tone: 'violet', icon: 'BrainCircuit' },
          { id: 'pa', label: 'Policy Administrator', sub: 'establishes the session', tone: 'violet', icon: 'Settings2' },
        ],
        [
          { id: 'sig1', label: 'Identity & MFA', tone: 'neutral', icon: 'Fingerprint' },
          { id: 'sig2', label: 'Device Posture', sub: 'patched, encrypted, EDR healthy', tone: 'neutral', icon: 'Laptop' },
          { id: 'sig3', label: 'Threat Intel & Risk', tone: 'warn', icon: 'Radar' },
        ],
        [{ id: 'res', label: 'Resource', sub: 'app, data, workload', tone: 'safe', icon: 'Database' }],
      ],
      edges: [
        { from: 'subj', to: 'pep', label: 'request', tone: 'primary', animated: true },
        { from: 'pep', to: 'pe', label: 'evaluate', tone: 'violet', animated: true },
        { from: 'pe', to: 'sig1', tone: 'neutral' },
        { from: 'pe', to: 'sig2', tone: 'neutral' },
        { from: 'pe', to: 'sig3', tone: 'warn' },
        { from: 'pa', to: 'res', label: 'per-session access', tone: 'safe', animated: true },
      ],
      legend: [
        { tone: 'violet', label: 'Control plane' },
        { tone: 'safe', label: 'Data plane resource' },
      ],
    },
    visual: 'network',
    realWorld: {
      title: 'Replacing the VPN',
      body:
        "A traditional VPN authenticates you once and then places your laptop on the corporate network, where it can reach the file server, the finance app and the domain controller — whether or not you need any of them. If that laptop is compromised, the attacker inherits the same reach. ZTNA inverts this: the user authenticates to a broker, and the broker creates an outbound connection to only the specific application requested, re-checking device posture each time. Internal applications stop being reachable by IP address at all, which also removes them from internet scanning. Users usually notice only that the experience is faster.",
      takeaway: 'Zero trust is a strategy delivered through many controls — not a product you buy.',
    },
    attack: {
      title: 'Lateral movement in a flat network',
      intro:
        'This is what zero trust is designed to stop. In a flat network, one compromised laptop is equivalent to compromising everything.',
      steps: [
        { label: 'Initial access', detail: 'A user opens a malicious attachment; a remote access implant starts on the workstation.' },
        { label: 'Discovery', detail: 'The implant enumerates Active Directory, shares and services. Everything answers, because everything is reachable.' },
        { label: 'Credential access', detail: 'Cached credentials and Kerberos tickets are harvested from memory.' },
        { label: 'Lateral movement', detail: 'Those credentials are reused over SMB and WinRM to reach servers holding sensitive data.' },
        { label: 'Domain dominance', detail: 'A path to a domain administrator account is found and the entire estate falls.' },
      ],
      mitigations: [
        'Microsegment the network so workstations cannot talk to each other or to server management ports.',
        'Enforce device posture checks and phishing-resistant MFA on every internal application.',
        'Use tiered administration so domain admin credentials never touch a workstation.',
        'Continuously re-evaluate sessions instead of trusting a single successful login.',
      ],
    },
    tools: [
      { name: 'Cloudflare Access / Zscaler Private Access', what: 'Commercial ZTNA brokers.', why: 'Reference implementations of identity-aware proxies replacing VPN.', url: 'https://developers.cloudflare.com/cloudflare-one/', category: 'ZTNA' },
      { name: 'Istio / Linkerd', what: 'Service meshes providing automatic mutual TLS.', why: 'Bring workload identity and per-service authorisation to Kubernetes.', url: 'https://istio.io/', category: 'Workload identity' },
      { name: 'Tailscale / WireGuard', what: 'Modern identity-based mesh networking.', why: 'A practical lab for building least-privilege connectivity without a flat network.', url: 'https://www.wireguard.com/', category: 'Networking' },
    ],
    links: [
      { label: 'NIST SP 800-207 — Zero Trust Architecture', url: 'https://csrc.nist.gov/pubs/sp/800/207/final', source: 'NIST' },
      { label: 'CISA — Zero Trust Maturity Model', url: 'https://www.cisa.gov/zero-trust-maturity-model', source: 'CISA' },
      { label: 'Google BeyondCorp research', url: 'https://cloud.google.com/beyondcorp', source: 'Google' },
      { label: 'Microsoft — Zero Trust deployment guidance', url: 'https://learn.microsoft.com/security/zero-trust/', source: 'Microsoft' },
    ],
    quiz: [
      {
        q: 'Which statement best captures the core principle of zero trust?',
        options: [
          'Encrypt all internal traffic',
          'Trust is never granted based on network location; every request is verified',
          'Block all inbound internet traffic',
          'Require a VPN for all remote access',
        ],
        answer: 1,
        explain: 'Zero trust removes implicit trust from network position. Encryption and VPNs may be part of the implementation but are not the principle.',
      },
      {
        q: 'In NIST SP 800-207, which component makes the grant or deny decision?',
        options: ['Policy Enforcement Point', 'Policy Engine', 'Policy Administrator', 'Identity Provider'],
        answer: 1,
        explain:
          'The Policy Engine decides, the Policy Administrator establishes or tears down the session, and the Policy Enforcement Point sits in the data path and applies the outcome.',
      },
      {
        q: 'Which control most directly limits lateral movement after a workstation is compromised?',
        options: ['Longer password requirements', 'Microsegmentation', 'Full disk encryption', 'Annual security awareness training'],
        answer: 1,
        explain: 'Microsegmentation restricts which systems can communicate at all, shrinking the blast radius of any single compromise.',
      },
    ],
    examTip:
      'Memorise the SP 800-207 vocabulary: control plane = policy engine + policy administrator; data plane = policy enforcement point. Adaptive identity, threat scope reduction, policy-driven access control.',
  },
  {
    slug: 'security-controls',
    title: 'Security Control Categories & Types',
    domain: 1,
    objective: '1.1 Compare and contrast various types of security controls',
    tagline: 'Technical, managerial, operational, physical — and preventive through compensating.',
    difficulty: 'Beginner',
    minutes: 9,
    keywords: ['controls', 'preventive', 'detective', 'corrective', 'deterrent', 'compensating', 'directive', 'technical', 'managerial', 'operational', 'physical'],
    simple: {
      what:
        "Security controls are classified two ways at once. The category says who or what implements it: technical (technology), managerial (policy and planning), operational (people and process), physical (real-world barriers). The type says what it does: preventive, deterrent, detective, corrective, compensating or directive.",
      why:
        "Every control has both a category and a type, and exam questions test both. More practically, the matrix exposes gaps — if you only ever buy preventive technical controls, you will detect nothing and recover badly.",
      how: [
        "Preventive stops it happening: firewall rule, locked door, access control list.",
        "Deterrent discourages the attempt: warning banner, visible cameras, sentencing policy.",
        "Detective identifies it after the fact: IDS alert, log review, security guard patrol.",
        "Corrective fixes the damage: restore from backup, patch deployment, quarantine.",
        "Compensating is an alternative when the primary control is not feasible: extra monitoring around a legacy system that cannot be patched.",
        "Directive tells people what to do: acceptable use policy, signage, standard operating procedure.",
      ],
      where: [
        "Audit frameworks such as ISO 27001 Annex A and NIST SP 800-53 are structured as control catalogues.",
        "Risk treatment plans record which control mitigates which risk and who owns it.",
        "Compensating controls are how organisations pass PCI DSS assessments when a requirement cannot be met literally.",
      ],
    },
    diagram: {
      title: 'The control matrix — category against type',
      caption:
        'A mature programme has coverage across the grid, not five products in one box.',
      columns: [
        [
          { id: 'tech', label: 'Technical', sub: 'implemented by technology', tone: 'primary', icon: 'Cpu' },
          { id: 'mgmt', label: 'Managerial', sub: 'policy, risk assessment', tone: 'violet', icon: 'ClipboardList' },
          { id: 'ops', label: 'Operational', sub: 'people and process', tone: 'warn', icon: 'Users' },
          { id: 'phys', label: 'Physical', sub: 'locks, fences, guards', tone: 'neutral', icon: 'DoorClosed' },
        ],
        [
          { id: 'prev', label: 'Preventive', sub: 'stop it happening', tone: 'safe', icon: 'ShieldCheck' },
          { id: 'det', label: 'Detective', sub: 'notice it happened', tone: 'warn', icon: 'Search' },
          { id: 'corr', label: 'Corrective', sub: 'repair the damage', tone: 'primary', icon: 'Wrench' },
          { id: 'deter', label: 'Deterrent', sub: 'discourage the attempt', tone: 'violet', icon: 'Megaphone' },
          { id: 'comp', label: 'Compensating', sub: 'alternative control', tone: 'neutral', icon: 'Replace' },
          { id: 'dir', label: 'Directive', sub: 'instruct the behaviour', tone: 'neutral', icon: 'BookOpen' },
        ],
      ],
      edges: [
        { from: 'tech', to: 'prev', label: 'firewall', tone: 'safe' },
        { from: 'tech', to: 'det', label: 'IDS', tone: 'warn' },
        { from: 'ops', to: 'corr', label: 'IR runbook', tone: 'primary' },
        { from: 'phys', to: 'deter', label: 'visible camera', tone: 'violet' },
        { from: 'mgmt', to: 'dir', label: 'AUP', tone: 'neutral' },
        { from: 'mgmt', to: 'comp', label: 'risk acceptance + monitoring', tone: 'neutral' },
      ],
    },
    realWorld: {
      title: 'The unpatchable medical device',
      body:
        "A hospital runs an MRI console on an operating system that reached end of life years ago. The manufacturer will not certify a patched build, and replacing the scanner costs millions. Patching — the preferred preventive technical control — is unavailable. The compensating control set is: place the device on an isolated VLAN with a deny-by-default firewall policy, allow only the exact protocol the modality needs, add network detection tuned for that segment, disable USB ports physically, and document formal risk acceptance signed by the business owner with an annual review. The residual risk is not zero, but it is understood, bounded and accountable.",
      takeaway: 'A compensating control is not an excuse — it is a documented, approved alternative with equivalent intent.',
    },
    attack: {
      title: 'What happens when only preventive controls exist',
      intro:
        'Prevention eventually fails. An organisation with no detective or corrective capability discovers breaches from a third party months later.',
      steps: [
        { label: 'Bypass', detail: 'A zero-day in the edge appliance defeats the preventive control on day one.' },
        { label: 'Silence', detail: 'No log aggregation and no alerting exist, so nothing observes the intruder.' },
        { label: 'Dwell', detail: 'The attacker operates for months. Industry median dwell time for undetected intrusions is measured in weeks to months.' },
        { label: 'External notification', detail: 'Law enforcement or a customer reports the leaked data. The organisation learns of its breach from outside.' },
        { label: 'Failed recovery', detail: 'Backups were never tested; restore takes weeks and loses data.' },
      ],
      mitigations: [
        'Balance the portfolio: prevention, detection, response and recovery all need investment.',
        'Centralise logging and define detections for the techniques most relevant to your environment.',
        'Test backups by performing real restores on a schedule.',
        'Run tabletop exercises so the corrective controls have been rehearsed before they are needed.',
      ],
    },
    tools: [
      { name: 'NIST SP 800-53 control catalogue', what: 'Comprehensive catalogue of security and privacy controls.', why: 'The reference list most other frameworks map back to.', url: 'https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final', category: 'Framework' },
      { name: 'CIS Controls v8', what: 'Prioritised set of 18 defensive actions.', why: 'A practical implementation order for organisations starting from nothing.', url: 'https://www.cisecurity.org/controls', category: 'Framework' },
      { name: 'OpenSCAP', what: 'Automated configuration compliance scanning.', why: 'Proves technical controls are actually in place rather than merely documented.', url: 'https://www.open-scap.org/', category: 'Compliance' },
    ],
    links: [
      { label: 'NIST SP 800-53 Rev. 5', url: 'https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final', source: 'NIST' },
      { label: 'CIS Critical Security Controls', url: 'https://www.cisecurity.org/controls', source: 'CIS' },
      { label: 'NIST Cybersecurity Framework 2.0', url: 'https://www.nist.gov/cyberframework', source: 'NIST' },
    ],
    quiz: [
      {
        q: 'A company installs bollards outside its data centre entrance. How is this control classified?',
        options: ['Technical preventive', 'Physical preventive', 'Operational detective', 'Managerial deterrent'],
        answer: 1,
        explain: 'Bollards are a physical barrier that stops a vehicle reaching the building — physical category, preventive type.',
      },
      {
        q: 'A legacy application cannot support MFA. The organisation restricts it to a jump host, logs every session and reviews access weekly. What type of control is this?',
        options: ['Preventive', 'Deterrent', 'Compensating', 'Directive'],
        answer: 2,
        explain: 'A compensating control is deployed when the primary control cannot be implemented, providing a comparable level of protection.',
      },
      {
        q: 'Which is an example of a managerial control?',
        options: ['Intrusion detection system', 'Annual risk assessment', 'Mantrap at reception', 'Antivirus software'],
        answer: 1,
        explain: 'Managerial (administrative) controls are about planning, policy and oversight — risk assessments, security policy, personnel screening.',
      },
    ],
    examTip:
      'Two questions, always: who implements it (technical / managerial / operational / physical) and what does it do (preventive / deterrent / detective / corrective / compensating / directive). A camera is detective; a sign saying you are being recorded is deterrent.',
  },
  {
    slug: 'change-management',
    title: 'Change Management & Governance Basics',
    domain: 1,
    objective: '1.3 Explain the importance of change management processes',
    tagline: 'Most outages are self-inflicted. Change control is a security control.',
    difficulty: 'Beginner',
    minutes: 8,
    keywords: ['change management', 'cab', 'maintenance window', 'rollback', 'backout plan', 'impact analysis', 'version control', 'sop'],
    simple: {
      what:
        "Change management is the formal process for proposing, assessing, approving, implementing and documenting changes to systems. It covers who requested the change, what the impact will be, when it will happen, how it will be tested and how it will be undone if it goes wrong.",
      why:
        "Unmanaged change is both an availability risk and a security risk. Undocumented firewall rules become permanent holes. An unreviewed configuration push takes down the service. And if you cannot tell approved change from unapproved change, you cannot spot an attacker making changes.",
      how: [
        "A change request records the owner, the business justification and the scope.",
        "Impact analysis identifies affected systems, dependencies and downtime.",
        "A change advisory board (CAB) approves standard, normal and emergency changes according to risk.",
        "Every change needs a tested backout plan and a defined maintenance window, and every change ends with updated documentation and diagrams.",
      ],
      where: [
        "ITIL-aligned service management in enterprises; CAB meetings weekly with an emergency path.",
        "Infrastructure as code, where the pull request is the change request and version control is the audit trail.",
        "PCI DSS and ISO 27001 both require documented change control, and auditors will sample tickets.",
      ],
    },
    diagram: {
      title: 'The change management lifecycle',
      caption:
        'The two steps organisations skip are testing the backout plan and updating documentation — and both are the ones that hurt later.',
      columns: [
        [{ id: 'req', label: 'Change Request', sub: 'owner + justification', tone: 'neutral', icon: 'FilePlus' }],
        [{ id: 'ia', label: 'Impact Analysis', sub: 'dependencies, downtime, risk', tone: 'warn', icon: 'GitBranch' }],
        [{ id: 'cab', label: 'Approval / CAB', sub: 'standard, normal, emergency', tone: 'violet', icon: 'Users' }],
        [{ id: 'test', label: 'Test + Backout Plan', sub: 'proven rollback path', tone: 'primary', icon: 'FlaskConical' }],
        [{ id: 'impl', label: 'Implement', sub: 'inside the maintenance window', tone: 'primary', icon: 'Play' }],
        [
          { id: 'ok', label: 'Verify + Document', sub: 'diagrams and CMDB updated', tone: 'safe', icon: 'CircleCheck' },
          { id: 'roll', label: 'Roll Back', sub: 'restore known-good state', tone: 'danger', icon: 'Undo2' },
        ],
      ],
      edges: [
        { from: 'req', to: 'ia', tone: 'neutral', animated: true },
        { from: 'ia', to: 'cab', tone: 'warn', animated: true },
        { from: 'cab', to: 'test', tone: 'violet', animated: true },
        { from: 'test', to: 'impl', tone: 'primary', animated: true },
        { from: 'impl', to: 'ok', label: 'success', tone: 'safe' },
        { from: 'impl', to: 'roll', label: 'failure', tone: 'danger' },
      ],
      legend: [
        { tone: 'safe', label: 'Change accepted' },
        { tone: 'danger', label: 'Backout executed' },
      ],
    },
    realWorld: {
      title: 'The firewall rule nobody could explain',
      body:
        "During a penetration test, an any/any rule is discovered permitting inbound access to a management VLAN. Nobody knows who added it. There is no ticket, no expiry, no owner. It was probably added at 2 a.m. during an outage three years ago and never removed. This is how most real environments accumulate risk — not through sophisticated attacks but through undocumented emergency changes that were never reviewed. Mature teams give every emergency change a mandatory retrospective ticket within 24 hours and an automatic expiry on temporary rules.",
      takeaway: 'Emergency changes are legitimate. Emergency changes that are never reviewed afterwards are not.',
    },
    attack: {
      title: 'An attacker hiding inside normal change noise',
      intro:
        'If your environment changes constantly and nobody tracks it, malicious change is indistinguishable from ordinary work.',
      steps: [
        { label: 'Access', detail: 'An attacker compromises an operations account with firewall management rights.' },
        { label: 'Blend in', detail: 'They add a rule during a scheduled maintenance window when many changes are expected.' },
        { label: 'Persist', detail: 'The rule permits outbound traffic to their command and control server on a common port.' },
        { label: 'Evade', detail: 'Because unapproved and approved changes look identical, nobody queries it during review.' },
        { label: 'Return', detail: 'The rule remains for months, providing reliable re-entry even after the original account is disabled.' },
      ],
      mitigations: [
        'Reconcile actual device configuration against the approved change record automatically.',
        'Alert on any configuration change that has no matching approved ticket.',
        'Version control all infrastructure configuration and require peer review.',
        'Apply automatic expiry to temporary rules and firewall exceptions.',
      ],
    },
    tools: [
      { name: 'Git', what: 'Distributed version control.', why: 'Turns every infrastructure change into a reviewable, attributable, revertible commit.', url: 'https://git-scm.com/', category: 'Version control' },
      { name: 'Terraform / Ansible', what: 'Infrastructure and configuration as code.', why: 'Makes environments reproducible and drift detectable.', url: 'https://www.terraform.io/', category: 'Automation' },
      { name: 'ServiceNow / Jira Service Management', what: 'IT service management platforms.', why: 'Where change requests, approvals and CAB records live in most enterprises.', category: 'ITSM' },
    ],
    links: [
      { label: 'NIST SP 800-128 — Security-Focused Configuration Management', url: 'https://csrc.nist.gov/pubs/sp/800/128/upd1/final', source: 'NIST' },
      { label: 'CISA — Secure by Design', url: 'https://www.cisa.gov/securebydesign', source: 'CISA' },
      { label: 'ISO/IEC 27001 overview', url: 'https://www.iso.org/standard/27001', source: 'ISO' },
    ],
    quiz: [
      {
        q: 'Which element of a change request most directly protects availability if the change fails?',
        options: ['Business justification', 'Backout plan', 'Impact analysis', 'Stakeholder list'],
        answer: 1,
        explain: 'A tested backout plan is what allows the team to return to a known-good state quickly when a change goes wrong.',
      },
      {
        q: 'Why is updating network diagrams and the configuration management database part of change management?',
        options: [
          'It is required for licensing',
          'Accurate documentation is essential for troubleshooting, audits and incident response',
          'It shortens the maintenance window',
          'It replaces the need for approval',
        ],
        answer: 1,
        explain:
          'Incident responders and auditors both rely on documentation reflecting reality. Stale diagrams slow down every future investigation.',
      },
    ],
    examTip:
      'Exam favourites: approval process, ownership, stakeholders, impact analysis, test results, backout plan, maintenance window, standard operating procedure, allow lists and deny lists, downtime, restarts, dependencies, documentation and version control.',
  },
]

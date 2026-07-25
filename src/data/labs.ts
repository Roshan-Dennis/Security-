import type { LabScenario } from '../types'

export const LABS: LabScenario[] = [
  {
    id: 'phish-1',
    kind: 'phish',
    title: 'Urgent invoice from a known supplier',
    prompt: 'Triage this message. Is it safe, suspicious or malicious?',
    artifact: [
      { label: 'From', value: 'accounts@nortnbridge-supplies.com' },
      { label: 'Display name', value: 'Northbridge Supplies Accounts' },
      { label: 'Subject', value: 'RE: Invoice INV-88213 — updated bank details' },
      { label: 'Reply-To', value: 'nb.accounts.finance@gmail.com' },
      { label: 'SPF / DKIM / DMARC', value: 'pass / pass / pass (for the sending domain)' },
    ],
    body:
      'Hi, following our audit our banking has moved. Please update our details before releasing payment for INV-88213. New sort code and account number attached. Apologies for the short notice — the payment run closes today.',
    correct: 'malicious',
    explain:
      'The sender domain is a lookalike — nortnbridge rather than northbridge — and the attacker has correctly configured SPF, DKIM and DMARC for their own domain, so authentication passing proves nothing about legitimacy. The free-mail Reply-To, the bank detail change and the deadline pressure are the classic business email compromise pattern. Verify by calling a number you already hold, never one supplied in the message.',
    redFlags: [
      'Lookalike domain with transposed characters',
      'Reply-To on a free mail provider, different from the From address',
      'Request to change bank details',
      'Artificial urgency tied to a payment deadline',
      'Email authentication passing for the attacker own domain, not yours',
    ],
  },
  {
    id: 'phish-2',
    kind: 'phish',
    title: 'IT service desk password expiry notice',
    prompt: 'Your colleague forwards this and asks whether they should click. What is your verdict?',
    artifact: [
      { label: 'From', value: 'no-reply@microsoft-account-security.net' },
      { label: 'Subject', value: 'Action required: your password expires in 2 hours' },
      { label: 'Link text', value: 'https://login.microsoftonline.com/verify' },
      { label: 'Actual link target', value: 'https://ms-verify.account-check[.]ru/o365/login' },
      { label: 'Attachments', value: 'None' },
    ],
    body:
      'Your organisation password will expire in 2 hours. To avoid losing access to email and files, verify your account now. Failure to act will result in account suspension.',
    correct: 'malicious',
    explain:
      'The visible link text and the real destination differ completely — always inspect the actual target. The sending domain merely contains the word microsoft rather than being a Microsoft domain, and the two-hour deadline plus threat of suspension is manufactured urgency. Genuine password expiry notices come from your own identity provider and never require a link at all.',
    redFlags: [
      'Displayed link does not match the real destination',
      'Sender domain only resembles a trusted brand',
      'Very short deadline with a threatened consequence',
      'Requests credential entry via an emailed link',
    ],
  },
  {
    id: 'phish-3',
    kind: 'phish',
    title: 'Internal announcement about parking',
    prompt: 'Routine internal mail. Assess it.',
    artifact: [
      { label: 'From', value: 'facilities@yourcompany.com' },
      { label: 'Subject', value: 'Car park resurfacing — 14 to 18 August' },
      { label: 'Link target', value: 'https://intranet.yourcompany.com/facilities/parking' },
      { label: 'SPF / DKIM / DMARC', value: 'pass / pass / pass (aligned with your domain)' },
      { label: 'Attachments', value: 'None' },
    ],
    body:
      'The east car park will be resurfaced from 14 August. Please use the west entrance during this period. Full details and the temporary map are on the intranet page linked below.',
    correct: 'safe',
    explain:
      'Everything aligns: the sender is your own authenticated domain with DMARC alignment, the link points to your internal intranet, there is no credential request, no attachment, no urgency and no financial action. Not everything unusual is an attack — over-reporting benign mail is fine, but recognising normal traffic is part of good triage.',
    redFlags: [],
  },
  {
    id: 'phish-4',
    kind: 'phish',
    title: 'Shared document from an unknown colleague',
    prompt: 'A file share notification arrives. Safe, suspicious or malicious?',
    artifact: [
      { label: 'From', value: 'sharepoint@yourcompany.com' },
      { label: 'Shared by', value: 'j.wilson@yourcompany.com (no such user in the directory)' },
      { label: 'Subject', value: 'Q3 Bonus Allocation — shared with you' },
      { label: 'Link target', value: 'https://yourcompany.sharepoint.com/:x:/s/hr/EbQ...' },
      { label: 'SPF / DKIM / DMARC', value: 'pass / pass / pass' },
    ],
    body: 'J. Wilson shared "Q3 Bonus Allocation.xlsx" with you. Open to view the document.',
    correct: 'suspicious',
    explain:
      'The notification is genuine — it really did come from your tenant, and the link really does go to your SharePoint. But the sharing account does not exist in the directory, and the subject is engineered bait. This is the internal phishing pattern: a compromised or newly created account inside your own tenant sharing a malicious document, so every authentication check passes. Report it and let the SOC verify the account, rather than opening it.',
    redFlags: [
      'Sharing user not present in the corporate directory',
      'Subject line engineered to guarantee a click',
      'Legitimate infrastructure abused from inside the tenant',
    ],
  },
  {
    id: 'log-1',
    kind: 'log',
    title: 'Authentication log burst',
    prompt: 'Review this authentication summary. How would you classify the activity?',
    artifact: [
      { label: 'Window', value: '02:14 – 02:23 UTC' },
      { label: 'Source IP', value: '198.51.100.44 (hosting provider, no prior history)' },
      { label: 'Distinct accounts', value: '412' },
      { label: 'Failures per account', value: '1' },
      { label: 'Successes', value: '3' },
      { label: 'Lockouts triggered', value: '0' },
    ],
    correct: 'malicious',
    explain:
      'One failed attempt across hundreds of distinct accounts from a single new source is textbook password spraying — deliberately staying under the lockout threshold so per-account detection never fires. The three successes are now compromised accounts requiring immediate password reset, session revocation and investigation of what those sessions did next.',
    redFlags: [
      'Very high account count with exactly one attempt each',
      'Single unfamiliar source IP from hosting infrastructure',
      'Activity outside business hours',
      'Deliberately below the account lockout threshold',
    ],
  },
  {
    id: 'log-2',
    kind: 'log',
    title: 'Outbound DNS pattern from a workstation',
    prompt: 'Network telemetry from a single finance workstation. Your assessment?',
    artifact: [
      { label: 'Host', value: 'FIN-WS-0142' },
      { label: 'Query volume', value: '9,800 DNS queries in 40 minutes' },
      { label: 'Pattern', value: 'Subdomains of 52 characters, apparently random, all under one parent domain' },
      { label: 'Parent domain age', value: 'Registered 6 days ago' },
      { label: 'Other traffic', value: 'Minimal HTTP/HTTPS activity in the same window' },
    ],
    correct: 'malicious',
    explain:
      'High-volume queries with long, high-entropy subdomain labels to a newly registered domain is DNS tunnelling — data encoded into query names to exfiltrate through a protocol almost every network permits. Isolate the host, capture memory, and block the parent domain at the resolver. Then check whether DNS egress is restricted to approved resolvers at all.',
    redFlags: [
      'Abnormally high DNS query volume from one host',
      'Long, random-looking subdomain labels',
      'Newly registered parent domain',
      'DNS activity disproportionate to normal web browsing',
    ],
  },
  {
    id: 'triage-1',
    kind: 'triage',
    title: 'Shadow copy deletion on multiple servers',
    prompt: 'An EDR alert fires across the server estate. How do you classify it?',
    artifact: [
      { label: 'Alert', value: 'vssadmin.exe delete shadows /all /quiet' },
      { label: 'Affected hosts', value: '7 servers within 4 minutes' },
      { label: 'Executing account', value: 'svc_backup (service account, no interactive login history)' },
      { label: 'Preceding activity', value: 'Security agent service stopped on 3 of the 7 hosts' },
      { label: 'Time', value: 'Saturday 03:41 local' },
    ],
    correct: 'malicious',
    explain:
      'Bulk shadow copy deletion combined with security tooling being stopped is one of the highest-fidelity pre-encryption ransomware indicators that exists. This is not a triage-later alert. Isolate the affected hosts immediately, protect and verify backup infrastructure, disable the service account, and invoke the incident response plan — you are likely minutes from mass encryption.',
    redFlags: [
      'Shadow copy deletion across multiple hosts simultaneously',
      'Security agent tampering immediately beforehand',
      'Service account performing destructive actions',
      'Weekend, out-of-hours timing',
    ],
  },
  {
    id: 'triage-2',
    kind: 'triage',
    title: 'New OAuth application consent',
    prompt: 'An identity platform alert. Classify the risk.',
    artifact: [
      { label: 'Event', value: 'User consented to third-party application' },
      { label: 'Application', value: 'PDF Viewer Pro (unverified publisher, registered 2 days ago)' },
      { label: 'Scopes granted', value: 'Mail.Read, Files.Read.All, offline_access' },
      { label: 'Consenting user', value: 'Member of Finance Managers group' },
      { label: 'Sign-in origin', value: 'Corporate network, MFA satisfied' },
    ],
    correct: 'malicious',
    explain:
      'This is an illicit consent grant. The user genuinely authenticated with MFA on the real provider — nothing was phished — but they granted a hostile application persistent read access to mail and all files, plus offline_access which yields a refresh token that survives password resets. Revoke the grant and the refresh tokens, remove the application, and restrict user consent to verified publishers and low-impact scopes.',
    redFlags: [
      'Unverified publisher with a very recently registered application',
      'Broad read scopes across mail and all files',
      'offline_access granting persistence beyond password change',
      'High-value user in a finance role',
    ],
  },
]

export const labsByKind = (kind: LabScenario['kind']) => LABS.filter((l) => l.kind === kind)

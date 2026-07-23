import type { Topic } from '../../types'

export const DOMAIN3: Topic[] = [
  {
    slug: 'network-security-architecture',
    title: 'Network Security Architecture',
    domain: 3,
    objective: '3.1 Compare and contrast security implications of different architecture models',
    tagline: 'Segmentation, screened subnets and defence in depth — designing for containment.',
    difficulty: 'Intermediate',
    minutes: 12,
    keywords: ['segmentation', 'dmz', 'screened subnet', 'vlan', 'defence in depth', 'jump box', 'east-west', 'north-south', 'sase'],
    simple: {
      what:
        "Network security architecture is how you divide a network into zones and control what may cross between them. A screened subnet (historically called a DMZ) holds internet-facing services between two filtering layers. Internal segmentation separates user, server, management and operational technology zones. Microsegmentation takes it down to individual workloads.",
      why:
        "Prevention eventually fails. Architecture decides what happens next. In a flat network one compromised laptop reaches everything; in a well-segmented network it reaches almost nothing, and the attempt to reach further generates an alert.",
      how: [
        "North-south traffic crosses the perimeter; east-west traffic moves laterally inside. Most organisations inspect the first and ignore the second, which is exactly backwards for containment.",
        "Place internet-facing services in a screened subnet so a compromise there does not grant internal access.",
        "Administrative access flows through hardened jump hosts or a privileged access workstation, never directly from user devices.",
        "Defence in depth layers independent controls so no single failure is fatal, and defaults are deny.",
      ],
      where: [
        "PCI DSS scope reduction is achieved almost entirely through segmentation of the cardholder data environment.",
        "Operational technology and industrial networks are separated using the Purdue model with strictly controlled conduits.",
        "SASE and SD-WAN move inspection to a cloud edge for distributed workforces.",
      ],
    },
    diagram: {
      title: 'Layered network zones with a screened subnet',
      caption:
        'Two filtering layers, three trust zones. Nothing from the internet ever reaches the internal network directly.',
      columns: [
        [{ id: 'net', label: 'Internet', sub: 'untrusted', tone: 'danger', icon: 'Globe' }],
        [{ id: 'edge', label: 'Edge Firewall / WAF', sub: 'north-south inspection', tone: 'primary', icon: 'BrickWall' }],
        [
          { id: 'dmz', label: 'Screened Subnet', sub: 'web, mail, reverse proxy', tone: 'warn', icon: 'ServerCog' },
        ],
        [{ id: 'inner', label: 'Internal Firewall', sub: 'zone-to-zone policy', tone: 'primary', icon: 'BrickWall' }],
        [
          { id: 'user', label: 'User VLAN', sub: 'workstations', tone: 'neutral', icon: 'Laptop' },
          { id: 'srv', label: 'Server Zone', sub: 'application and database tiers', tone: 'safe', icon: 'Server' },
          { id: 'mgmt', label: 'Management Zone', sub: 'jump host, out-of-band', tone: 'violet', icon: 'KeySquare' },
          { id: 'ot', label: 'OT / IoT Zone', sub: 'isolated, one-way where possible', tone: 'warn', icon: 'Factory' },
        ],
      ],
      edges: [
        { from: 'net', to: 'edge', tone: 'danger', animated: true },
        { from: 'edge', to: 'dmz', label: '443 only', tone: 'warn', animated: true },
        { from: 'dmz', to: 'inner', label: 'app traffic only', tone: 'primary', animated: true },
        { from: 'inner', to: 'srv', tone: 'safe' },
        { from: 'inner', to: 'user', tone: 'neutral' },
        { from: 'mgmt', to: 'srv', label: 'admin via jump host', tone: 'violet' },
        { from: 'inner', to: 'ot', label: 'tightly restricted', tone: 'warn' },
      ],
      legend: [
        { tone: 'danger', label: 'Untrusted' },
        { tone: 'warn', label: 'Semi-trusted' },
        { tone: 'safe', label: 'Trusted' },
      ],
    },
    visual: 'network',
    realWorld: {
      title: 'Segmentation as scope reduction',
      body:
        "A retailer processing card payments faces an audit across every system that could touch cardholder data. Left flat, that means the entire corporate network — every laptop, every printer, every meeting room display — is in scope, and the assessment becomes enormous and permanently failing. By isolating payment systems into a dedicated segment with a documented, tested boundary, the assessed environment shrinks to a handful of systems. The security benefit and the compliance benefit are the same benefit: a compromise of the corporate network no longer reaches payment data. Auditors will test the boundary, so the segmentation must be real, not just drawn on a diagram.",
      takeaway: 'Segmentation reduces both blast radius and audit scope. It is one of the highest-return architectural decisions available.',
    },
    attack: {
      title: 'Pivoting from a compromised web server',
      intro:
        'Screened subnets exist because internet-facing services will eventually be compromised. The question is what the attacker reaches next.',
      steps: [
        { label: 'Exploit', detail: 'A vulnerable web application in the screened subnet is exploited and a web shell is planted.' },
        { label: 'Enumerate', detail: 'The attacker scans for reachable internal hosts from that foothold.' },
        { label: 'Test the boundary', detail: 'In a flat design, database servers, domain controllers and file shares all answer.' },
        { label: 'Pivot', detail: 'Reused local credentials or an unpatched internal service provide the next hop.' },
        { label: 'Contained instead', detail: 'In a segmented design only the specific application port to one database host is permitted, and the scanning itself triggers an alert.' },
      ],
      mitigations: [
        'Deny by default between zones; permit only named source, destination, port and protocol.',
        'Deploy internal IDS/NDR to see east-west traffic, not only perimeter traffic.',
        'Use separate credentials for screened subnet hosts so reuse gains nothing.',
        'Place administrative interfaces on an isolated management network with out-of-band access.',
      ],
    },
    tools: [
      { name: 'pfSense / OPNsense', what: 'Open source firewall and router platforms.', why: 'Build a real multi-zone lab with rules, NAT and VPN for free.', url: 'https://opnsense.org/', category: 'Firewall' },
      { name: 'Nmap', what: 'Network discovery and firewall rule verification.', why: 'Prove empirically what is reachable between two segments.', url: 'https://nmap.org/', category: 'Validation' },
      { name: 'Zeek', what: 'Network security monitoring framework.', why: 'Rich east-west visibility, producing connection and protocol logs rather than just alerts.', url: 'https://zeek.org/', category: 'Monitoring' },
      { name: 'Cisco Packet Tracer / GNS3', what: 'Network simulation environments.', why: 'Design and test segmentation without physical hardware.', url: 'https://www.gns3.com/', category: 'Lab' },
    ],
    links: [
      { label: 'NIST SP 800-41 — Guidelines on Firewalls and Firewall Policy', url: 'https://csrc.nist.gov/pubs/sp/800/41/r1/final', source: 'NIST' },
      { label: 'CISA — Layering Network Security Through Segmentation', url: 'https://www.cisa.gov/sites/default/files/publications/layering-network-security-segmentation_infographic_508_0.pdf', source: 'CISA' },
      { label: 'NIST SP 800-207 — Zero Trust Architecture', url: 'https://csrc.nist.gov/pubs/sp/800/207/final', source: 'NIST' },
    ],
    quiz: [
      {
        q: 'What is the primary purpose of a screened subnet (DMZ)?',
        options: [
          'To speed up internet access for internal users',
          'To host internet-facing services in an isolated zone so their compromise does not directly expose the internal network',
          'To store backups',
          'To provide wireless access for guests only',
        ],
        answer: 1,
        explain: 'A screened subnet sits between two filtering layers, giving public services a place to live without granting them internal trust.',
      },
      {
        q: 'Which traffic direction is most often under-monitored, and why does that matter?',
        options: [
          'North-south, because it is encrypted',
          'East-west, because lateral movement inside the network goes unseen',
          'Outbound only, because of NAT',
          'Wireless only, because of roaming',
        ],
        answer: 1,
        explain:
          'Most inspection is deployed at the perimeter. Attackers spend the majority of their time moving east-west, which is precisely where visibility is thinnest.',
      },
      {
        q: 'An organisation places administrative interfaces on a dedicated management VLAN reachable only through a hardened jump host. What principle is being applied?',
        options: ['Security through obscurity', 'Defence in depth and least privilege', 'High availability', 'Data minimisation'],
        answer: 1,
        explain: 'Layered independent controls plus restricting administrative reach to the minimum necessary path.',
      },
    ],
    examTip:
      'Expect scenario questions asking where to place a device. Public-facing goes in the screened subnet; sensitive data goes deepest; management is isolated; OT/ICS is isolated and often one-way.',
  },
  {
    slug: 'secure-protocols-ports',
    title: 'Secure Protocols & Ports',
    domain: 3,
    objective: '4.5 Modify enterprise capabilities to enhance security',
    tagline: 'The insecure protocol and its secure replacement — the most reliable marks on the exam.',
    difficulty: 'Beginner',
    minutes: 10,
    keywords: ['ports', 'protocols', 'tls', 'ssh', 'ftps', 'sftp', 'https', 'ldaps', 'snmpv3', 'dnssec', 'ipsec'],
    simple: {
      what:
        "Many foundational internet protocols were designed without encryption or authentication. Each has a secure successor. Knowing the pairs, their port numbers and what each protocol actually protects is core Security+ knowledge and everyday operational knowledge.",
      why:
        "A single legacy protocol left enabled — Telnet on a switch, FTP on a file server, SNMPv1 on a printer — hands an attacker credentials in plaintext. These are among the easiest and highest-value findings in any assessment.",
      how: [
        "Replace Telnet (23) with SSH (22). Replace FTP (20/21) with SFTP over SSH (22) or FTPS (990).",
        "Replace HTTP (80) with HTTPS (443), and enforce it with HSTS. Replace LDAP (389) with LDAPS (636).",
        "Replace SNMPv1 and v2c (161) with SNMPv3, which adds authentication and encryption.",
        "Email: SMTP (25) with STARTTLS or implicit TLS on 465, IMAPS 993, POP3S 995. Protect the domain with SPF, DKIM and DMARC.",
        "IPsec provides network-layer encryption for site-to-site VPN; TLS protects at the transport layer; DNSSEC signs DNS records for integrity while DoH and DoT encrypt DNS queries.",
      ],
      where: [
        "Hardening baselines and CIS Benchmarks disable legacy protocols by default.",
        "Vulnerability scanners flag cleartext protocol exposure as a standard finding.",
        "Compliance frameworks explicitly require encryption of data in transit across untrusted networks.",
      ],
    },
    diagram: {
      title: 'Insecure protocols and their secure replacements',
      caption:
        'Each pair does the same job. The difference is whether credentials and content are readable by anyone on the path.',
      columns: [
        [
          { id: 'telnet', label: 'Telnet :23', sub: 'plaintext shell', tone: 'danger', icon: 'TerminalSquare' },
          { id: 'ftp', label: 'FTP :21', sub: 'plaintext transfer', tone: 'danger', icon: 'FolderUp' },
          { id: 'http', label: 'HTTP :80', sub: 'plaintext web', tone: 'danger', icon: 'Globe' },
          { id: 'ldap', label: 'LDAP :389', sub: 'plaintext directory', tone: 'danger', icon: 'Users' },
          { id: 'snmp', label: 'SNMPv1/2c :161', sub: 'community string in clear', tone: 'danger', icon: 'Activity' },
        ],
        [{ id: 'sniff', label: 'Anyone On Path', sub: 'reads credentials and content', tone: 'danger', icon: 'Eye' }],
        [
          { id: 'ssh', label: 'SSH :22', sub: 'encrypted shell and SFTP', tone: 'safe', icon: 'TerminalSquare' },
          { id: 'ftps', label: 'FTPS :990 / SFTP :22', sub: 'encrypted transfer', tone: 'safe', icon: 'FolderUp' },
          { id: 'https', label: 'HTTPS :443', sub: 'TLS + HSTS', tone: 'safe', icon: 'Lock' },
          { id: 'ldaps', label: 'LDAPS :636', sub: 'TLS-protected directory', tone: 'safe', icon: 'Users' },
          { id: 'snmp3', label: 'SNMPv3 :161', sub: 'auth + privacy', tone: 'safe', icon: 'Activity' },
        ],
      ],
      edges: [
        { from: 'telnet', to: 'sniff', tone: 'danger', animated: true },
        { from: 'ftp', to: 'sniff', tone: 'danger', animated: true },
        { from: 'http', to: 'sniff', tone: 'danger' },
        { from: 'ldap', to: 'sniff', tone: 'danger' },
        { from: 'snmp', to: 'sniff', tone: 'danger' },
        { from: 'sniff', to: 'ssh', label: 'replace with', tone: 'safe' },
        { from: 'sniff', to: 'https', label: 'replace with', tone: 'safe', animated: true },
        { from: 'sniff', to: 'ldaps', label: 'replace with', tone: 'safe' },
      ],
      legend: [
        { tone: 'danger', label: 'Cleartext' },
        { tone: 'safe', label: 'Encrypted equivalent' },
      ],
    },
    realWorld: {
      title: 'The printer that gave up the domain',
      body:
        "Multifunction printers are configured to scan documents to a network share, which requires stored credentials. Many are configured with a domain account that has far more access than scanning requires, and many still expose SNMP with the default community string of public, plus an unauthenticated web interface. A tester queries SNMP, reads the configuration, extracts or replays the stored credential, and now holds a domain account. This is such a reliable path that it is a standard early move in internal assessments. The fixes are unglamorous: change community strings or disable SNMP, use a dedicated least-privilege scan account, put printers on their own VLAN, and change default administrative passwords.",
      takeaway: 'Legacy protocols on forgotten devices are where real intrusions start, not in exotic exploits.',
    },
    attack: {
      title: 'Harvesting credentials from cleartext protocols',
      intro:
        'Once an attacker has any position on the local network, unencrypted protocols do the rest of the work for them.',
      steps: [
        { label: 'Position', detail: 'The attacker gains access to a switch port, a Wi-Fi network, or a compromised host on the segment.' },
        { label: 'Capture', detail: 'Traffic is captured passively, or actively redirected via ARP spoofing.' },
        { label: 'Extract', detail: 'Telnet, FTP, HTTP basic auth and SNMP community strings yield credentials directly from the packet bytes.' },
        { label: 'Poison', detail: 'Broadcast name resolution protocols such as LLMNR and NBT-NS are answered falsely to capture authentication hashes.' },
        { label: 'Relay', detail: 'Captured hashes are relayed to services that do not require signing, granting access without cracking anything.' },
      ],
      mitigations: [
        'Disable Telnet, FTP, SNMPv1/2c, LLMNR and NBT-NS estate-wide.',
        'Require SMB signing and channel binding to defeat relay attacks.',
        'Enforce 802.1X port authentication so unauthorised devices cannot join the segment.',
        'Encrypt everything internally too — internal networks are not trustworthy.',
      ],
    },
    tools: [
      { name: 'Wireshark / tcpdump', what: 'Packet capture and analysis.', why: 'See plaintext credentials with your own eyes — the lesson sticks.', url: 'https://www.wireshark.org/', category: 'Analysis' },
      { name: 'Nmap with NSE scripts', what: 'Service and cipher enumeration.', why: 'ssl-enum-ciphers reveals weak TLS configuration across an estate.', url: 'https://nmap.org/nsedoc/', category: 'Assessment' },
      { name: 'Responder', what: 'LLMNR/NBT-NS poisoning tool.', why: 'Demonstrates in authorised tests how quickly hashes are captured on a default Windows network.', url: 'https://github.com/lgandx/Responder', category: 'Offensive testing' },
      { name: 'CIS Benchmarks', what: 'Consensus hardening baselines per platform.', why: 'Tells you exactly which protocols and services to disable.', url: 'https://www.cisecurity.org/cis-benchmarks', category: 'Hardening' },
    ],
    links: [
      { label: 'NIST SP 800-52 Rev.2 — TLS Implementation Guidelines', url: 'https://csrc.nist.gov/pubs/sp/800/52/r2/final', source: 'NIST' },
      { label: 'NIST SP 800-77 — Guide to IPsec VPNs', url: 'https://csrc.nist.gov/pubs/sp/800/77/r1/final', source: 'NIST' },
      { label: 'IANA Service Name and Port Number Registry', url: 'https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml', source: 'IANA' },
    ],
    quiz: [
      {
        q: 'Which pairing correctly replaces an insecure protocol with its secure equivalent?',
        options: ['Telnet 23 replaced by SSH 22', 'HTTPS 443 replaced by HTTP 80', 'LDAPS 636 replaced by LDAP 389', 'SNMPv3 replaced by SNMPv2c'],
        answer: 0,
        explain: 'SSH on port 22 provides an encrypted, authenticated shell replacing plaintext Telnet on port 23. The other options move in the wrong direction.',
      },
      {
        q: 'What does DNSSEC provide?',
        options: [
          'Encryption of DNS queries so they cannot be read',
          'Cryptographic authentication and integrity of DNS records so forged responses are rejected',
          'Faster DNS resolution',
          'Blocking of malicious domains',
        ],
        answer: 1,
        explain:
          'DNSSEC signs records to prove authenticity and integrity. It does not encrypt queries — that is what DNS over HTTPS and DNS over TLS do.',
      },
      {
        q: 'A network administrator must transfer files securely to a partner and can only open one port. Which option best meets the requirement?',
        options: ['FTP on 21', 'SFTP over SSH on 22', 'TFTP on 69', 'HTTP on 80'],
        answer: 1,
        explain: 'SFTP runs inside an SSH session on a single port, providing encryption and authentication without the multiple-port complexity of FTPS.',
      },
    ],
    examTip:
      'Commit the common ports to memory: 20/21 FTP, 22 SSH/SFTP, 23 Telnet, 25 SMTP, 53 DNS, 67/68 DHCP, 69 TFTP, 80 HTTP, 88 Kerberos, 110 POP3, 137-139 NetBIOS, 143 IMAP, 161/162 SNMP, 389 LDAP, 443 HTTPS, 445 SMB, 465/587 SMTP submission, 636 LDAPS, 993 IMAPS, 995 POP3S, 1433 MSSQL, 3306 MySQL, 3389 RDP.',
  },
  {
    slug: 'cloud-security',
    title: 'Cloud Security & Shared Responsibility',
    domain: 3,
    objective: '3.1 Compare and contrast security implications of different architecture models',
    tagline: 'The provider secures the cloud; you secure what you put in it.',
    difficulty: 'Intermediate',
    minutes: 12,
    keywords: ['cloud', 'iaas', 'paas', 'saas', 'shared responsibility', 'misconfiguration', 'cspm', 'casb', 'iam', 'multi-tenancy'],
    simple: {
      what:
        "In cloud computing, security duties are divided between the provider and the customer. The shared responsibility model defines the line, and the line moves depending on the service model. With IaaS you manage the operating system upward. With PaaS you manage the application and data. With SaaS you manage only identity, configuration and data.",
      why:
        "The overwhelming majority of cloud security incidents are customer misconfigurations, not provider failures. Public storage buckets, over-permissive IAM roles and disabled logging are the recurring themes — all firmly on the customer side of the line.",
      how: [
        "The provider is always responsible for the physical facilities, the hypervisor and the underlying service infrastructure.",
        "The customer is always responsible for their data, their identities and access management, and their configuration choices.",
        "Cloud security posture management continuously checks configuration against benchmarks; CASB governs SaaS usage and data movement.",
        "Cloud-native controls matter: security groups, network ACLs, private endpoints, key management services and organisation-wide guardrails.",
      ],
      where: [
        "Multi-cloud and hybrid estates need a consistent identity and logging strategy or visibility fragments.",
        "Serverless shifts more to the provider but concentrates risk in function permissions and event sources.",
        "Regulated data may face residency requirements that dictate region selection.",
      ],
    },
    diagram: {
      title: 'Shared responsibility across service models',
      caption:
        'Move right and the provider takes on more. Data and identity never leave your column.',
      columns: [
        [
          { id: 'onprem', label: 'On-Premises', sub: 'you own everything', tone: 'neutral', icon: 'Server' },
          { id: 'iaas', label: 'IaaS', sub: 'you own OS and up', tone: 'primary', icon: 'HardDrive' },
          { id: 'paas', label: 'PaaS', sub: 'you own app and data', tone: 'violet', icon: 'Layers' },
          { id: 'saas', label: 'SaaS', sub: 'you own data and access', tone: 'safe', icon: 'Cloud' },
        ],
        [
          { id: 'cust', label: 'Always Yours', sub: 'data, identity, configuration', tone: 'warn', icon: 'UserCog' },
          { id: 'prov', label: 'Always Theirs', sub: 'facilities, hardware, hypervisor', tone: 'neutral', icon: 'Building2' },
        ],
        [
          { id: 'misc', label: 'Misconfiguration', sub: 'public bucket, open group, no MFA', tone: 'danger', icon: 'TriangleAlert' },
          { id: 'cspm', label: 'CSPM / Guardrails', sub: 'continuous config assurance', tone: 'safe', icon: 'ShieldCheck' },
        ],
      ],
      edges: [
        { from: 'iaas', to: 'cust', tone: 'warn', animated: true },
        { from: 'paas', to: 'cust', tone: 'warn' },
        { from: 'saas', to: 'cust', tone: 'warn' },
        { from: 'onprem', to: 'prov', label: 'no provider', tone: 'neutral' },
        { from: 'cust', to: 'misc', label: 'when unmanaged', tone: 'danger', animated: true },
        { from: 'cspm', to: 'misc', label: 'detects and blocks', tone: 'safe', animated: true },
      ],
      legend: [
        { tone: 'warn', label: 'Customer responsibility' },
        { tone: 'danger', label: 'Common failure' },
      ],
    },
    visual: 'cloud',
    realWorld: {
      title: 'The public bucket problem that never goes away',
      body:
        "Storage buckets left readable to the world have exposed voter records, medical images, customer databases and internal source code. The cause is almost never a provider flaw. It is a developer needing to share a file quickly, changing a permission, and never changing it back — or an infrastructure template copied from a tutorial. Providers have responded by making public access blocked by default at the account level, but the pattern persists in older accounts and in permissive templates. The durable defence is organisational guardrails: policies that make public exposure impossible rather than merely discouraged, plus continuous posture scanning that raises an alert within minutes.",
      takeaway: 'Prevent misconfiguration structurally with policy guardrails. Detection alone always arrives after the exposure.',
    },
    attack: {
      title: 'From leaked key to cloud account compromise',
      intro:
        'Cloud attacks follow identity, not network paths. A single static credential is often the whole intrusion.',
      steps: [
        { label: 'Exposure', detail: 'A long-lived access key is committed to a public code repository or embedded in a mobile app.' },
        { label: 'Automated discovery', detail: 'Bots scanning public repositories find and test the key within minutes of the commit.' },
        { label: 'Enumeration', detail: 'The attacker lists permissions, storage, databases and any roles the identity can assume.' },
        { label: 'Escalation', detail: 'An over-permissive policy allows the identity to grant itself more, or to assume a more privileged role.' },
        { label: 'Impact', detail: 'Data is copied to an external account, cryptomining instances are launched, and logging is disabled in some regions.' },
      ],
      mitigations: [
        'Eliminate long-lived static keys; use short-lived credentials from workload identity federation.',
        'Enable secret scanning and push protection on all repositories, and rotate anything exposed immediately.',
        'Apply service control policies and permission boundaries so no workload identity can escalate.',
        'Enable multi-region logging with delivery to a separate, restricted security account.',
        'Alert on anomalous API usage, new region activity and logging configuration changes.',
      ],
    },
    tools: [
      { name: 'Prowler / ScoutSuite', what: 'Open source multi-cloud security assessment.', why: 'Benchmarks an account against CIS controls and lists concrete misconfigurations.', url: 'https://github.com/prowler-cloud/prowler', category: 'CSPM' },
      { name: 'AWS Security Hub / Microsoft Defender for Cloud', what: 'Native cloud posture and findings aggregation.', why: 'Continuous compliance scoring built into the platform.', url: 'https://learn.microsoft.com/azure/defender-for-cloud/', category: 'CSPM' },
      { name: 'Checkov / tfsec', what: 'Infrastructure-as-code security scanning.', why: 'Catches an open security group in the pull request instead of in production.', url: 'https://www.checkov.io/', category: 'DevSecOps' },
      { name: 'gitleaks / trufflehog', what: 'Secret scanning for repositories.', why: 'Finds committed credentials before an attacker does.', url: 'https://github.com/gitleaks/gitleaks', category: 'DevSecOps' },
    ],
    links: [
      { label: 'AWS Shared Responsibility Model', url: 'https://aws.amazon.com/compliance/shared-responsibility-model/', source: 'AWS' },
      { label: 'Microsoft — Shared responsibility in the cloud', url: 'https://learn.microsoft.com/azure/security/fundamentals/shared-responsibility', source: 'Microsoft' },
      { label: 'NIST SP 800-144 — Guidelines on Security and Privacy in Public Cloud', url: 'https://csrc.nist.gov/pubs/sp/800/144/final', source: 'NIST' },
      { label: 'Cloud Security Alliance — Top Threats', url: 'https://cloudsecurityalliance.org/research/topics/top-threats', source: 'CSA' },
    ],
    quiz: [
      {
        q: 'Under the shared responsibility model for IaaS, who is responsible for patching the guest operating system?',
        options: ['The cloud provider', 'The customer', 'Neither — it is automatic', 'The hardware vendor'],
        answer: 1,
        explain: 'In IaaS the provider secures the infrastructure and hypervisor; everything from the guest OS upward belongs to the customer.',
      },
      {
        q: 'Which is the most common root cause of cloud data exposure incidents?',
        options: ['Hypervisor escape by other tenants', 'Customer misconfiguration such as public storage or over-permissive IAM', 'Provider insider threat', 'Physical theft from the data centre'],
        answer: 1,
        explain:
          'Provider-side failures are rare. Publicly readable storage, wide-open security groups and excessive IAM permissions dominate real incidents.',
      },
      {
        q: 'An organisation wants to discover and control unsanctioned SaaS applications used by employees. Which technology fits best?',
        options: ['CASB (cloud access security broker)', 'IPS', 'HSM', 'SIEM'],
        answer: 0,
        explain: 'A CASB provides visibility into SaaS usage, discovers shadow IT and applies data and access policy to cloud applications.',
      },
    ],
    examTip:
      'Learn the models by what you manage: IaaS = OS upward, PaaS = application and data, SaaS = data and access only. Data and identity are always the customer responsibility in every model.',
  },
{
    slug: 'virtualization-containers',
    title: 'Virtualization & Container Security',
    domain: 3,
    objective: '3.1 Compare and contrast security implications of different architecture models',
    tagline: 'Shared kernels, VM escape, image supply chain and orchestration risk.',
    difficulty: 'Intermediate',
    minutes: 11,
    keywords: ['virtualization', 'hypervisor', 'vm escape', 'container', 'docker', 'kubernetes', 'image scanning', 'sprawl', 'namespace', 'sandbox'],
    simple: {
      what:
        "Virtual machines run a full guest operating system on a hypervisor, giving strong isolation. Containers share the host kernel and isolate using namespaces and control groups, giving much lighter weight but weaker isolation. Both introduce security concerns that do not exist on dedicated hardware.",
      why:
        "Consolidation means a single host failure or escape now affects many workloads. Containers additionally shift much of the risk into the image supply chain and the orchestrator.",
      how: [
        "Type 1 (bare metal) hypervisors are preferred for production; type 2 run on top of a desktop operating system.",
        "VM escape — breaking out of the guest into the hypervisor — is rare and severe. Patching the hypervisor is critical.",
        "VM sprawl creates unmanaged, unpatched machines nobody owns; lifecycle governance is a security control.",
        "Containers: never run as root, drop capabilities, use read-only filesystems, apply seccomp and AppArmor profiles, and scan images for vulnerable packages.",
        "Kubernetes: enforce RBAC, network policies, admission control and secrets management; the API server is the crown jewel.",
      ],
      where: [
        "Nearly all modern infrastructure — cloud instances, CI runners, developer laptops.",
        "Multi-tenant platforms rely on isolation being genuinely robust.",
        "Sandboxing for malware analysis relies on the same technology, in reverse.",
      ],
    },
    diagram: {
      title: 'Isolation boundaries — virtual machines versus containers',
      caption:
        'A container escape reaches the shared host kernel. A VM escape must defeat the hypervisor. Different blast radius, different controls.',
      columns: [
        [{ id: 'hw', label: 'Physical Hardware', tone: 'neutral', icon: 'Cpu' }],
        [
          { id: 'hyp', label: 'Hypervisor', sub: 'strong isolation boundary', tone: 'violet', icon: 'Layers' },
          { id: 'host', label: 'Host OS Kernel', sub: 'shared by all containers', tone: 'warn', icon: 'Server' },
        ],
        [
          { id: 'vm1', label: 'VM: Guest OS', sub: 'own kernel', tone: 'safe', icon: 'MonitorCog' },
          { id: 'vm2', label: 'VM: Guest OS', sub: 'own kernel', tone: 'safe', icon: 'MonitorCog' },
          { id: 'c1', label: 'Container A', sub: 'namespace + cgroup', tone: 'primary', icon: 'Box' },
          { id: 'c2', label: 'Container B', sub: 'namespace + cgroup', tone: 'primary', icon: 'Box' },
        ],
        [
          { id: 'esc1', label: 'VM Escape', sub: 'rare, critical severity', tone: 'danger', icon: 'ShieldOff' },
          { id: 'esc2', label: 'Container Escape', sub: 'privileged mode, kernel flaw', tone: 'danger', icon: 'ShieldOff' },
        ],
      ],
      edges: [
        { from: 'hw', to: 'hyp', tone: 'violet' },
        { from: 'hw', to: 'host', tone: 'warn' },
        { from: 'hyp', to: 'vm1', tone: 'safe', animated: true },
        { from: 'hyp', to: 'vm2', tone: 'safe' },
        { from: 'host', to: 'c1', tone: 'primary', animated: true },
        { from: 'host', to: 'c2', tone: 'primary' },
        { from: 'vm1', to: 'esc1', label: 'defeat hypervisor', tone: 'danger' },
        { from: 'c1', to: 'esc2', label: 'defeat kernel isolation', tone: 'danger' },
      ],
      legend: [
        { tone: 'safe', label: 'Strong isolation' },
        { tone: 'primary', label: 'Kernel-level isolation' },
        { tone: 'danger', label: 'Escape scenario' },
      ],
    },
    realWorld: {
      title: 'The base image nobody rebuilt',
      body:
        "A team builds a container image from a popular base, ships it, and moves on. Eighteen months later that image is still running in production, still containing whatever library versions were current on build day — including several with published critical vulnerabilities. Containers are immutable by design, which is a security strength, but it means patching is a rebuild-and-redeploy process rather than an in-place update. Organisations that treat images as long-lived pets accumulate exactly the same debt they had with unpatched servers, plus a false sense of modernity. Continuous rebuilding on a schedule, image scanning in CI, and an SBOM per image are the practical answers.",
      takeaway: 'Container immutability only helps if you actually rebuild. Otherwise it just freezes your vulnerabilities in place.',
    },
    attack: {
      title: 'Compromising a Kubernetes cluster from one pod',
      intro:
        'Orchestrators are powerful and complex, and default configurations historically favoured usability over least privilege.',
      steps: [
        { label: 'Foothold', detail: 'An application vulnerability provides code execution inside a running pod.' },
        { label: 'Token discovery', detail: 'The mounted service account token is found, granting API access under that account rights.' },
        { label: 'Enumerate', detail: 'The Kubernetes API is queried for secrets, config maps and other namespaces.' },
        { label: 'Escalate', detail: 'An over-permissive role permits creating a privileged pod that mounts the host filesystem.' },
        { label: 'Own the node', detail: 'Host access yields kubelet credentials, then wider cluster control and access to every workload.' },
      ],
      mitigations: [
        'Disable automatic service account token mounting where it is not required.',
        'Enforce least-privilege RBAC and use admission control to forbid privileged pods and host mounts.',
        'Apply network policies so pods cannot freely reach each other or the API server.',
        'Scan images, sign them, and require signature verification at admission.',
        'Run workloads as non-root with read-only root filesystems and dropped capabilities.',
      ],
    },
    tools: [
      { name: 'Trivy', what: 'Vulnerability and misconfiguration scanner for images, filesystems and IaC.', why: 'Fast, free, and easy to wire into any pipeline.', url: 'https://github.com/aquasecurity/trivy', category: 'Scanning' },
      { name: 'Falco', what: 'Runtime security monitoring for containers and Kubernetes.', why: 'Detects unexpected process execution and file access inside running containers.', url: 'https://falco.org/', category: 'Runtime' },
      { name: 'kube-bench / kube-hunter', what: 'CIS benchmark checks and cluster attack surface discovery.', why: 'Baseline your cluster configuration against consensus hardening guidance.', url: 'https://github.com/aquasecurity/kube-bench', category: 'Hardening' },
      { name: 'Docker Bench for Security', what: 'Host and daemon configuration checks.', why: 'Quick assessment of container host hardening.', url: 'https://github.com/docker/docker-bench-security', category: 'Hardening' },
    ],
    links: [
      { label: 'NIST SP 800-190 — Application Container Security Guide', url: 'https://csrc.nist.gov/pubs/sp/800/190/final', source: 'NIST' },
      { label: 'NIST SP 800-125 — Guide to Security for Full Virtualization Technologies', url: 'https://csrc.nist.gov/pubs/sp/800/125/final', source: 'NIST' },
      { label: 'Kubernetes — Security overview', url: 'https://kubernetes.io/docs/concepts/security/', source: 'Kubernetes' },
      { label: 'CISA/NSA — Kubernetes Hardening Guidance', url: 'https://www.cisa.gov/news-events/alerts/2022/03/15/updated-kubernetes-hardening-guide', source: 'CISA' },
    ],
    quiz: [
      {
        q: 'What is the key security difference between containers and virtual machines?',
        options: [
          'Containers are always more secure',
          'Containers share the host kernel, so isolation is weaker than the hypervisor boundary between VMs',
          'VMs cannot be patched',
          'Containers cannot run untrusted code',
        ],
        answer: 1,
        explain:
          'Namespace and cgroup isolation is enforced by the shared kernel. A kernel vulnerability or a privileged container can therefore break out more readily than a VM can escape a hypervisor.',
      },
      {
        q: 'An organisation has hundreds of virtual machines, many created for temporary projects and never decommissioned or patched. What is this called?',
        options: ['VM escape', 'VM sprawl', 'Hypervisor drift', 'Overprovisioning'],
        answer: 1,
        explain: 'VM sprawl is uncontrolled proliferation of virtual machines, producing unmanaged and unpatched systems that no one owns.',
      },
      {
        q: 'Which practice most reduces container supply chain risk?',
        options: [
          'Running containers as root for compatibility',
          'Scanning and signing images in CI and verifying signatures at deployment',
          'Using the latest tag for all images',
          'Disabling network policies',
        ],
        answer: 1,
        explain:
          'Scanning finds vulnerable components, signing plus admission verification ensures only approved images run. Using latest makes deployments unreproducible.',
      },
    ],
    examTip:
      'Know the vocabulary: type 1 vs type 2 hypervisor, VM escape, VM sprawl, resource reuse, containerisation, sandboxing and orchestration. Containers are lighter and faster; VMs isolate more strongly.',
  },
  {
    slug: 'iot-ics-ot',
    title: 'IoT, ICS/SCADA and Embedded Systems',
    domain: 3,
    objective: '3.1 Compare and contrast security implications of different architecture models',
    tagline: 'When safety and uptime outrank confidentiality, and patching is not an option.',
    difficulty: 'Intermediate',
    minutes: 11,
    keywords: ['iot', 'ics', 'scada', 'ot', 'plc', 'purdue model', 'embedded', 'rtos', 'safety', 'air gap'],
    simple: {
      what:
        "Operational technology controls physical processes: valves, motors, turbines, production lines. Industrial control systems and SCADA supervise them. IoT covers the vast population of network-connected consumer and building devices. Embedded systems and real-time operating systems run inside all of it.",
      why:
        "In IT, the priority order is confidentiality, integrity, availability. In OT it inverts: safety first, then availability and integrity, with confidentiality last. A control that reboots a server is routine in IT and potentially lethal in OT.",
      how: [
        "Devices often run for 15 to 25 years, cannot be patched, have hard-coded credentials and speak protocols with no authentication such as Modbus and DNP3.",
        "The Purdue model layers OT from level 0 (physical process) to level 4/5 (enterprise IT), with a demilitarised zone between OT and IT.",
        "Because patching is frequently impossible, compensating controls dominate: segmentation, unidirectional gateways, strict allow-lists and passive monitoring.",
        "IoT introduces scale and default credentials; segmentation onto isolated networks and disabling universal plug and play are baseline measures.",
      ],
      where: [
        "Manufacturing, energy, water, transport and healthcare — all critical national infrastructure sectors.",
        "Building management: HVAC, lifts, access control and cameras, which have repeatedly been the entry point into corporate networks.",
        "Medical devices, where regulatory approval constrains what may be changed.",
      ],
    },
    diagram: {
      title: 'Purdue model — IT/OT segmentation',
      caption:
        'Traffic flows upward through a controlled demilitarised zone. Direct enterprise-to-controller access is the failure mode that causes incidents.',
      columns: [
        [{ id: 'l45', label: 'Level 4/5 — Enterprise IT', sub: 'ERP, email, internet', tone: 'neutral', icon: 'Building2' }],
        [{ id: 'dmz', label: 'IT/OT DMZ', sub: 'data diode, jump host, historian replica', tone: 'primary', icon: 'BrickWall' }],
        [{ id: 'l3', label: 'Level 3 — Site Operations', sub: 'historian, MES', tone: 'violet', icon: 'Database' }],
        [{ id: 'l2', label: 'Level 2 — Supervisory', sub: 'SCADA, HMI', tone: 'warn', icon: 'MonitorCog' }],
        [{ id: 'l1', label: 'Level 1 — Control', sub: 'PLC, RTU, DCS', tone: 'danger', icon: 'CircuitBoard' }],
        [{ id: 'l0', label: 'Level 0 — Process', sub: 'sensors and actuators', tone: 'danger', icon: 'Factory' }],
      ],
      edges: [
        { from: 'l45', to: 'dmz', label: 'only via DMZ', tone: 'primary', animated: true },
        { from: 'dmz', to: 'l3', tone: 'violet', animated: true },
        { from: 'l3', to: 'l2', tone: 'warn' },
        { from: 'l2', to: 'l1', label: 'control commands', tone: 'danger', animated: true },
        { from: 'l1', to: 'l0', label: 'physical action', tone: 'danger', animated: true },
      ],
      legend: [
        { tone: 'primary', label: 'Controlled boundary' },
        { tone: 'danger', label: 'Safety-critical' },
      ],
    },
    realWorld: {
      title: 'The HVAC vendor route into the corporate network',
      body:
        "Third-party maintenance access is a recurring initial access path into large organisations. A building services contractor holds remote access for heating and ventilation monitoring, connecting through a route that was never segmented from the corporate network because the integration predates anyone currently employed. Compromise the contractor — typically a much smaller company with a much smaller security budget — and you inherit that path. The lesson is not that HVAC is dangerous; it is that every third-party connection needs the same scrutiny as an employee, with segmentation, MFA, time-bounded access and monitoring.",
      takeaway: 'Vendor connectivity into OT and building systems must be segmented, brokered and time-limited.',
    },
    attack: {
      title: 'Ransomware crossing from IT into OT',
      intro:
        'Most OT incidents are not precision sabotage. They are ordinary IT ransomware that spreads because the boundary was weak, and operators halt production as a precaution.',
      steps: [
        { label: 'IT compromise', detail: 'Standard phishing gives access to the corporate network.' },
        { label: 'Flat boundary', detail: 'A shared domain, a dual-homed engineering workstation or a forgotten route bridges IT and OT.' },
        { label: 'Spread', detail: 'The encryptor reaches the historian and the human-machine interface systems, which run ordinary Windows.' },
        { label: 'Loss of view', detail: 'Operators can no longer see or control the process safely.' },
        { label: 'Precautionary shutdown', detail: 'Production stops — the real business impact — even though the controllers themselves were never touched.' },
      ],
      mitigations: [
        'Enforce a genuine IT/OT boundary with a DMZ, and no shared authentication domain.',
        'Use unidirectional gateways or data diodes where only telemetry needs to flow outward.',
        'Deploy passive OT monitoring that fingerprints protocols without injecting traffic.',
        'Maintain offline backups of controller logic and tested manual operating procedures.',
        'Apply strict allow-listing on engineering workstations and remove internet and email access.',
      ],
    },
    tools: [
      { name: 'Shodan', what: 'Search engine for internet-exposed devices.', why: 'Reveals control systems and cameras that should never have been reachable.', url: 'https://www.shodan.io/', category: 'Exposure' },
      { name: 'Nozomi / Claroty / Dragos', what: 'OT-specific passive monitoring platforms.', why: 'Understand industrial protocols without disrupting sensitive equipment.', category: 'OT monitoring' },
      { name: 'Zeek with ICS protocol parsers', what: 'Open source network monitoring for Modbus, DNP3 and similar.', why: 'Free way to gain visibility into industrial protocol traffic.', url: 'https://zeek.org/', category: 'Monitoring' },
      { name: 'CISA ICS advisories', what: 'Vulnerability advisories specific to control systems.', why: 'The authoritative feed for OT patching and mitigation guidance.', url: 'https://www.cisa.gov/news-events/cybersecurity-advisories?f%5B0%5D=advisory_type%3A95', category: 'Intelligence' },
    ],
    links: [
      { label: 'NIST SP 800-82 Rev.3 — Guide to Operational Technology Security', url: 'https://csrc.nist.gov/pubs/sp/800/82/r3/final', source: 'NIST' },
      { label: 'CISA — Industrial Control Systems', url: 'https://www.cisa.gov/topics/industrial-control-systems', source: 'CISA' },
      { label: 'NIST — IoT Cybersecurity program (NISTIR 8259)', url: 'https://csrc.nist.gov/projects/nist-cybersecurity-for-iot-program', source: 'NIST' },
      { label: 'MITRE ATT&CK for ICS', url: 'https://attack.mitre.org/matrices/ics/', source: 'MITRE' },
    ],
    quiz: [
      {
        q: 'How does the priority order of security goals typically differ in operational technology compared with IT?',
        options: [
          'It is identical',
          'Safety and availability come first, with confidentiality last',
          'Confidentiality is always first',
          'Only integrity matters',
        ],
        answer: 1,
        explain:
          'OT controls physical processes where downtime or unsafe states can injure people. Availability and safety therefore outrank confidentiality.',
      },
      {
        q: 'A legacy PLC cannot be patched and uses a protocol with no authentication. What is the most appropriate approach?',
        options: [
          'Accept the risk and take no action',
          'Apply compensating controls: strict segmentation, allow-listed communication and passive monitoring',
          'Expose it to the internet for remote support',
          'Install antivirus on the PLC',
        ],
        answer: 1,
        explain:
          'When the primary control (patching) is unavailable, compensating controls that limit reachability and provide detection are the correct answer.',
      },
      {
        q: 'What does a data diode provide in an OT architecture?',
        options: [
          'Two-way encrypted tunnelling',
          'Physically enforced one-way data flow, typically outward from OT to IT',
          'Automatic patching of controllers',
          'Load balancing between HMIs',
        ],
        answer: 1,
        explain: 'A unidirectional gateway physically permits data to travel in only one direction, so telemetry can leave without any inbound path existing.',
      },
    ],
    examTip:
      'Remember the constraints that define embedded and OT security: inability to patch, long lifecycle, weak or absent authentication in legacy protocols, safety implications, and heavy reliance on segmentation as a compensating control.',
  },
  {
    slug: 'data-protection',
    title: 'Data Classification & Protection',
    domain: 3,
    objective: '3.3 Compare and contrast concepts and strategies to protect data',
    tagline: 'Know what you hold, where it lives, and what state it is in.',
    difficulty: 'Intermediate',
    minutes: 11,
    keywords: ['data classification', 'dlp', 'tokenization', 'masking', 'data at rest', 'data in transit', 'data in use', 'sovereignty', 'retention', 'pii'],
    simple: {
      what:
        "Data protection starts with classification — labelling data by sensitivity so controls can be applied proportionally. Data exists in three states: at rest (stored), in transit (moving) and in use (in memory, being processed). Each state needs different protection.",
      why:
        "You cannot protect everything equally, and trying to bankrupts you. Classification lets you spend heavily on the small percentage that would be catastrophic to lose and lightly on the rest.",
      how: [
        "Typical labels: public, internal, confidential, restricted. Regulated categories include personally identifiable information, protected health information, cardholder data and intellectual property.",
        "At rest: full disk encryption, database and file-level encryption, key management in an HSM or KMS.",
        "In transit: TLS, IPsec, SSH. In use: confidential computing and trusted execution environments, still an emerging area.",
        "Alternatives to encryption: tokenisation replaces a value with a meaningless token mapped in a secure vault; masking obscures part of a value for display; anonymisation and pseudonymisation reduce identifiability.",
        "Data loss prevention inspects endpoints, email, web and cloud for classified data leaving through unapproved channels.",
      ],
      where: [
        "Privacy regulation drives classification: GDPR, HIPAA and PCI DSS each define categories and mandatory protections.",
        "Data sovereignty rules require certain data to remain within a jurisdiction, dictating cloud region choices.",
        "Retention schedules and secure disposal close the lifecycle — data you no longer hold cannot be breached.",
      ],
    },
    diagram: {
      title: 'Data states, protections and the DLP control point',
      caption:
        'Classification drives everything downstream. Without labels, DLP has nothing to enforce.',
      columns: [
        [{ id: 'disc', label: 'Discover & Classify', sub: 'labels: public to restricted', tone: 'primary', icon: 'Tags' }],
        [
          { id: 'rest', label: 'At Rest', sub: 'disks, databases, backups', tone: 'neutral', icon: 'HardDrive' },
          { id: 'transit', label: 'In Transit', sub: 'networks, APIs, email', tone: 'neutral', icon: 'Send' },
          { id: 'use', label: 'In Use', sub: 'memory, processing', tone: 'neutral', icon: 'Cpu' },
        ],
        [
          { id: 'enc', label: 'Encryption / KMS', sub: 'AES, TLS, enclaves', tone: 'safe', icon: 'Lock' },
          { id: 'token', label: 'Tokenisation / Masking', sub: 'reduce sensitivity of the value', tone: 'safe', icon: 'Replace' },
        ],
        [{ id: 'dlp', label: 'DLP Enforcement', sub: 'endpoint, email, cloud, web', tone: 'violet', icon: 'ShieldAlert' }],
        [
          { id: 'allow', label: 'Approved Flow', tone: 'safe', icon: 'CircleCheck' },
          { id: 'block', label: 'Blocked / Quarantined', sub: 'alert raised', tone: 'danger', icon: 'CircleX' },
        ],
      ],
      edges: [
        { from: 'disc', to: 'rest', tone: 'primary', animated: true },
        { from: 'disc', to: 'transit', tone: 'primary' },
        { from: 'disc', to: 'use', tone: 'primary' },
        { from: 'rest', to: 'enc', tone: 'safe' },
        { from: 'transit', to: 'enc', tone: 'safe', animated: true },
        { from: 'use', to: 'token', tone: 'safe' },
        { from: 'enc', to: 'dlp', tone: 'violet' },
        { from: 'dlp', to: 'allow', tone: 'safe' },
        { from: 'dlp', to: 'block', tone: 'danger', animated: true },
      ],
      legend: [
        { tone: 'safe', label: 'Protective control' },
        { tone: 'danger', label: 'Policy violation' },
      ],
    },
    realWorld: {
      title: 'Tokenisation and shrinking the compliance blast radius',
      body:
        "A merchant that stores card numbers must protect and audit every system holding them. By replacing the card number with a token at the point of capture — a meaningless reference that only a hardened vault can map back — the merchant systems downstream no longer contain cardholder data at all. Order history, analytics and support tooling can use the token freely. If those systems are breached, the tokens are worthless outside the vault. This is data protection through elimination rather than defence: the safest data is the data you do not hold.",
      takeaway: 'Ask whether you need the sensitive value at all before asking how to protect it.',
    },
    attack: {
      title: 'Slow exfiltration under the DLP threshold',
      intro:
        'A well-tuned DLP catches bulk movement. Attackers respond by moving slowly and using channels the policy does not cover.',
      steps: [
        { label: 'Locate', detail: 'The attacker finds unclassified copies — a test database, an old export on a share, a personal cloud sync folder.' },
        { label: 'Split', detail: 'Data is chunked into small pieces to stay below volume-based alerting thresholds.' },
        { label: 'Blend', detail: 'Exfiltration uses an approved SaaS platform or DNS tunnelling, both of which look like normal traffic.' },
        { label: 'Encrypt first', detail: 'Payloads are encrypted or encoded before leaving, so content inspection sees nothing recognisable.' },
        { label: 'Persist', detail: 'The transfer runs over weeks, never triggering a single threshold.' },
      ],
      mitigations: [
        'Classify and label data at creation so shadow copies are still recognisable.',
        'Combine DLP with behavioural analytics that baseline normal data access per user.',
        'Restrict and monitor unapproved cloud storage and personal email at the proxy.',
        'Monitor DNS for tunnelling patterns — high query volume and unusually long subdomains.',
        'Apply retention and disposal policy so stale copies of sensitive data stop existing.',
      ],
    },
    tools: [
      { name: 'Microsoft Purview Information Protection', what: 'Classification, labelling and DLP across Microsoft 365.', why: 'Reference implementation of label-driven protection that follows the file.', url: 'https://learn.microsoft.com/purview/', category: 'DLP' },
      { name: 'Amazon Macie / Google DLP API', what: 'Automated sensitive data discovery in cloud storage.', why: 'Finds the personal data you did not know you were storing.', url: 'https://aws.amazon.com/macie/', category: 'Discovery' },
      { name: 'HashiCorp Vault', what: 'Secrets management, encryption as a service and tokenisation.', why: 'Centralises key handling so applications never hold raw keys.', url: 'https://www.vaultproject.io/', category: 'Key management' },
      { name: 'OpenSSL / LUKS / BitLocker', what: 'Encryption at rest for volumes and files.', why: 'Baseline protection for lost or stolen media.', category: 'Encryption' },
    ],
    links: [
      { label: 'NIST SP 800-88 — Guidelines for Media Sanitization', url: 'https://csrc.nist.gov/pubs/sp/800/88/r1/final', source: 'NIST' },
      { label: 'NIST Privacy Framework', url: 'https://www.nist.gov/privacy-framework', source: 'NIST' },
      { label: 'PCI Security Standards Council', url: 'https://www.pcisecuritystandards.org/', source: 'PCI SSC' },
      { label: 'GDPR full text', url: 'https://gdpr-info.eu/', source: 'EU' },
    ],
    quiz: [
      {
        q: 'Which technique replaces a sensitive value with a non-sensitive substitute that has no mathematical relationship to the original?',
        options: ['Encryption', 'Tokenisation', 'Hashing', 'Compression'],
        answer: 1,
        explain:
          'Tokenisation swaps the value for a reference held in a secure vault. Unlike encryption there is no key that can reverse it — only the vault mapping can.',
      },
      {
        q: 'Which data state is protected by TLS?',
        options: ['Data at rest', 'Data in transit', 'Data in use', 'Archived data'],
        answer: 1,
        explain: 'TLS protects data moving across a network. Disk and database encryption protect data at rest; confidential computing addresses data in use.',
      },
      {
        q: 'An organisation must ensure customer records never leave a specific country. What concept applies?',
        options: ['Data sovereignty', 'Data masking', 'Data minimisation', 'Data deduplication'],
        answer: 0,
        explain: 'Data sovereignty means data is subject to the laws of the jurisdiction it resides in, often driving region-specific storage requirements.',
      },
    ],
    examTip:
      'Know the three states (at rest, in transit, in use), the protection methods (encryption, tokenisation, masking, obfuscation, hashing, segmentation, permission restrictions) and the classification vocabulary (sensitive, confidential, public, restricted, critical, regulated, intellectual property, legal, financial, human-readable and non-human-readable).',
  },
  {
    slug: 'resilience-high-availability',
    title: 'Resilience, High Availability & Recovery Architecture',
    domain: 3,
    objective: '3.4 Explain the importance of resilience and recovery in security architecture',
    tagline: 'Designing for failure — redundancy, sites, backups and the numbers that define recovery.',
    difficulty: 'Intermediate',
    minutes: 12,
    keywords: ['high availability', 'redundancy', 'rto', 'rpo', 'mtbf', 'mttr', 'hot site', 'cold site', 'load balancing', 'backup', '3-2-1'],
    simple: {
      what:
        "Resilience is the ability of a system to keep operating through failure and to recover afterwards. It combines redundancy (no single point of failure), replication (data exists in more than one place), failover (something takes over automatically) and tested recovery procedures.",
      why:
        "Availability is a security property. Ransomware, hardware failure, fire, flood and human error all produce the same symptom — the service is gone — and preparation is what determines whether that lasts hours or months.",
      how: [
        "Key metrics: RTO is how quickly you must be back, RPO is how much data you can afford to lose, MTBF measures reliability and MTTR measures repair speed.",
        "Site strategies: a hot site is fully equipped and running, warm has infrastructure but needs data and configuration, cold is space and power only. Cost rises with speed.",
        "The 3-2-1 backup rule: three copies, on two different media, with one off-site. Modern practice adds one immutable or offline copy and zero errors on restore testing.",
        "High availability techniques: clustering, load balancing, multi-zone and multi-region deployment, RAID for disk redundancy, generators and UPS for power.",
      ],
      where: [
        "Business impact analysis determines RTO and RPO per process, and those numbers drive the architecture and the budget.",
        "Cloud availability zones and regions provide ready-made geographic separation.",
        "Regulated industries require documented, tested continuity plans and periodic exercises.",
      ],
    },
    diagram: {
      title: 'Resilience layers from disk to region',
      caption:
        'Each layer covers a different failure mode. A cluster does not protect you from a regional outage, and RAID is not a backup.',
      columns: [
        [{ id: 'disk', label: 'Disk Redundancy', sub: 'RAID', tone: 'neutral', icon: 'HardDrive' }],
        [{ id: 'host', label: 'Host Redundancy', sub: 'clustering, live migration', tone: 'primary', icon: 'Server' }],
        [{ id: 'zone', label: 'Zone Redundancy', sub: 'load balancer across AZs', tone: 'violet', icon: 'Network' }],
        [{ id: 'region', label: 'Geographic Redundancy', sub: 'second region or site', tone: 'safe', icon: 'Globe' }],
        [
          { id: 'backup', label: 'Backups', sub: '3-2-1, one immutable', tone: 'safe', icon: 'Archive' },
          { id: 'test', label: 'Tested Restore', sub: 'proves RTO and RPO', tone: 'safe', icon: 'CircleCheck' },
        ],
      ],
      edges: [
        { from: 'disk', to: 'host', label: 'survives a disk failure', tone: 'neutral', animated: true },
        { from: 'host', to: 'zone', label: 'survives a host failure', tone: 'primary', animated: true },
        { from: 'zone', to: 'region', label: 'survives a site failure', tone: 'violet', animated: true },
        { from: 'region', to: 'backup', label: 'survives corruption and ransomware', tone: 'safe', animated: true },
        { from: 'backup', to: 'test', tone: 'safe', animated: true },
      ],
      legend: [
        { tone: 'safe', label: 'Recovery capability' },
      ],
    },
    realWorld: {
      title: 'Replication is not backup',
      body:
        "A team runs synchronous replication between two data centres and considers itself protected. Then a bad deployment deletes a critical table — and the deletion replicates to the second site in milliseconds, exactly as designed. Replication protects against infrastructure failure. It does not protect against logical corruption, malicious deletion or ransomware, because those are valid writes that get faithfully copied. Point-in-time backups with retention are the only protection against a mistake that propagates. Every architecture needs both, and the restore path must be tested, because an untested backup is a hypothesis, not a control.",
      takeaway: 'Redundancy handles infrastructure failure. Backups handle logical failure. They are not substitutes.',
    },
    attack: {
      title: 'Targeting the recovery capability first',
      intro:
        'Attackers understand that recovery is your leverage in a negotiation, so removing it is a deliberate early objective.',
      steps: [
        { label: 'Find the backups', detail: 'The backup server is located through directory enumeration and network shares.' },
        { label: 'Same-domain weakness', detail: 'Backup infrastructure joined to the same domain is accessible with the credentials already stolen.' },
        { label: 'Destroy recovery points', detail: 'Repositories are deleted, retention is shortened, and volume shadow copies are removed across hosts.' },
        { label: 'Verify', detail: 'The attacker confirms no reachable restore point remains before deploying the payload.' },
        { label: 'Encrypt', detail: 'Only then is the ransomware executed estate-wide.' },
      ],
      mitigations: [
        'Keep backup infrastructure off the production domain with separate, unique credentials and MFA.',
        'Use immutability or object lock so recovery points cannot be deleted before retention expires.',
        'Maintain at least one offline or logically air-gapped copy.',
        'Alert on backup job deletion, retention changes and shadow copy removal.',
        'Run full restore exercises, including a bare-metal rebuild, at least annually.',
      ],
    },
    tools: [
      { name: 'Veeam / Duplicati / restic', what: 'Backup platforms from enterprise to open source.', why: 'Implement 3-2-1 with encryption and immutable targets.', url: 'https://restic.net/', category: 'Backup' },
      { name: 'Object lock on S3-compatible storage', what: 'Write-once-read-many retention.', why: 'Makes deletion impossible until the retention period expires, even for administrators.', url: 'https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lock.html', category: 'Immutability' },
      { name: 'Chaos engineering tools', what: 'Deliberate fault injection into production-like systems.', why: 'Proves failover actually works rather than assuming it does.', url: 'https://principlesofchaos.org/', category: 'Validation' },
      { name: 'Keepalived / HAProxy', what: 'Failover and load balancing.', why: 'Practical high availability building blocks you can lab at home.', url: 'https://www.haproxy.org/', category: 'HA' },
    ],
    links: [
      { label: 'NIST SP 800-34 — Contingency Planning Guide', url: 'https://csrc.nist.gov/pubs/sp/800/34/r1/upd1/final', source: 'NIST' },
      { label: 'CISA — Data Backup Options', url: 'https://www.cisa.gov/sites/default/files/publications/data_backup_options.pdf', source: 'CISA' },
      { label: 'AWS Well-Architected — Reliability Pillar', url: 'https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/welcome.html', source: 'AWS' },
    ],
    quiz: [
      {
        q: 'A business states it can tolerate losing at most 15 minutes of data. Which metric does this define?',
        options: ['RTO', 'RPO', 'MTBF', 'MTTR'],
        answer: 1,
        explain: 'Recovery point objective is the maximum acceptable data loss, which dictates backup and replication frequency. RTO is how long recovery may take.',
      },
      {
        q: 'Which site type provides the fastest recovery at the highest cost?',
        options: ['Cold site', 'Warm site', 'Hot site', 'Mobile site'],
        answer: 2,
        explain: 'A hot site is fully provisioned with current data and can take over almost immediately, which is why it is the most expensive option.',
      },
      {
        q: 'Why is RAID not a substitute for backups?',
        options: [
          'RAID is slower than backup',
          'RAID protects against disk failure but faithfully replicates deletions, corruption and ransomware encryption',
          'RAID cannot be used with SSDs',
          'RAID requires cloud storage',
        ],
        answer: 1,
        explain: 'RAID provides availability against hardware failure only. Logical damage is written to every disk in the array immediately.',
      },
    ],
    examTip:
      'Learn the metrics cold: RTO (time to restore service), RPO (acceptable data loss), MTBF (average time between failures), MTTR (average time to repair). Also know hot, warm and cold sites, and that a tabletop exercise is a discussion while a simulation actually executes the plan.',
  },
  {
    slug: 'identity-federation-sso',
    title: 'Identity Federation, SSO & Directory Services',
    domain: 3,
    objective: '4.6 Implement and maintain identity and access management',
    tagline: 'SAML, OAuth, OIDC and Kerberos — how one login unlocks many services.',
    difficulty: 'Intermediate',
    minutes: 12,
    keywords: ['sso', 'saml', 'oauth', 'oidc', 'kerberos', 'federation', 'idp', 'sp', 'scim', 'jwt', 'ldap'],
    simple: {
      what:
        "Single sign-on lets a user authenticate once and access many applications. Federation extends that trust across organisational boundaries. SAML is an XML-based standard widely used for enterprise web SSO. OAuth 2.0 is an authorisation framework for delegated access. OpenID Connect adds an identity layer on top of OAuth. Kerberos provides ticket-based authentication inside a domain.",
      why:
        "Every additional password is another chance for reuse, phishing and help desk cost. Centralising authentication also centralises your ability to enforce MFA, conditional access and instant revocation.",
      how: [
        "SAML: the identity provider issues a signed assertion which the service provider validates. Trust is established by exchanging metadata and certificates.",
        "OAuth 2.0 is about authorisation — granting an application scoped access to a resource without sharing the password. It is not an authentication protocol on its own.",
        "OIDC adds an ID token (a signed JWT) so the client learns who the user is. This is what powers sign in with a provider.",
        "Kerberos uses a key distribution centre issuing ticket-granting tickets and service tickets, avoiding password transmission on the network.",
        "SCIM automates provisioning and deprovisioning so leavers actually lose access everywhere.",
      ],
      where: [
        "Enterprise SaaS is almost universally integrated through SAML or OIDC.",
        "Active Directory uses Kerberos internally with LDAP as the directory protocol.",
        "Business-to-consumer identity uses OIDC with social or passwordless login.",
      ],
    },
    diagram: {
      title: 'SAML web single sign-on flow',
      caption:
        'The service provider never sees the password. It trusts a signed assertion from the identity provider.',
      columns: [
        [{ id: 'user', label: 'User', sub: 'browser', tone: 'primary', icon: 'User' }],
        [{ id: 'sp', label: 'Service Provider', sub: 'the application', tone: 'neutral', icon: 'AppWindow' }],
        [{ id: 'idp', label: 'Identity Provider', sub: 'authenticates + MFA', tone: 'violet', icon: 'Fingerprint' }],
        [{ id: 'assert', label: 'Signed SAML Assertion', sub: 'identity + attributes', tone: 'safe', icon: 'FileBadge' }],
        [
          { id: 'ok', label: 'Session Granted', sub: 'scoped by attributes', tone: 'safe', icon: 'CircleCheck' },
          { id: 'deny', label: 'Denied', sub: 'conditional access failed', tone: 'danger', icon: 'CircleX' },
        ],
      ],
      edges: [
        { from: 'user', to: 'sp', label: 'requests app', tone: 'primary', animated: true },
        { from: 'sp', to: 'idp', label: 'redirect with AuthnRequest', tone: 'neutral', animated: true },
        { from: 'idp', to: 'assert', label: 'signs assertion', tone: 'violet', animated: true },
        { from: 'assert', to: 'ok', label: 'signature valid', tone: 'safe', animated: true },
        { from: 'idp', to: 'deny', label: 'policy failure', tone: 'danger' },
      ],
      legend: [
        { tone: 'safe', label: 'Trusted assertion' },
        { tone: 'danger', label: 'Access refused' },
      ],
    },
    realWorld: {
      title: 'The identity provider is now the crown jewel',
      body:
        "Centralising authentication concentrates risk. Compromise the identity provider and you do not need to attack any individual application — you can mint assertions for all of them. This is why attacks have shifted toward stealing token-signing keys, registering rogue federation trusts, and adding attacker-controlled authentication methods to privileged accounts. Defending the identity provider therefore means hardware-backed MFA for administrators, alerting on any federation trust or signing certificate change, strict conditional access on the admin portal, and treating identity infrastructure with the same tier-zero care historically reserved for domain controllers.",
      takeaway: 'When SSO is your front door, the identity provider deserves your strongest controls.',
    },
    attack: {
      title: 'Malicious OAuth consent (illicit grant)',
      intro:
        'This attack never touches the password or the MFA. It asks the user politely for access — and they say yes.',
      steps: [
        { label: 'Register an app', detail: 'The attacker registers an OAuth application with an innocuous name such as a document viewer.' },
        { label: 'Craft the consent link', detail: 'Requested scopes include reading mail, files and offline access via refresh tokens.' },
        { label: 'Deliver', detail: 'The user receives the link and is taken to a genuine, correctly branded consent page on the real provider domain.' },
        { label: 'Consent', detail: 'The user approves. A refresh token is issued to the attacker application.' },
        { label: 'Persist', detail: 'Access continues even after a password reset, because the grant is independent of the password. Only revoking the grant stops it.' },
      ],
      mitigations: [
        'Restrict user consent to verified publishers and low-impact scopes; require admin approval otherwise.',
        'Audit existing OAuth grants and revoke unused or over-scoped applications.',
        'Alert on new application registrations and high-privilege consent events.',
        'Include token and grant revocation explicitly in incident response playbooks.',
      ],
    },
    tools: [
      { name: 'Keycloak', what: 'Open source identity and access management server.', why: 'Build a working SAML and OIDC lab end to end for free.', url: 'https://www.keycloak.org/', category: 'IdP' },
      { name: 'SAML-tracer / jwt.io', what: 'Browser and token inspection utilities.', why: 'Decode assertions and JWTs to understand exactly what is being asserted.', url: 'https://jwt.io/', category: 'Analysis' },
      { name: 'Microsoft Entra ID', what: 'Enterprise identity provider with conditional access.', why: 'The dominant enterprise IdP, and the reference for policy-based access.', url: 'https://learn.microsoft.com/entra/', category: 'IdP' },
      { name: 'SCIM-compliant provisioning', what: 'Automated user lifecycle across applications.', why: 'Ensures deprovisioning actually happens everywhere on the day someone leaves.', url: 'https://scim.cloud/', category: 'Lifecycle' },
    ],
    links: [
      { label: 'OASIS SAML 2.0 specification', url: 'https://docs.oasis-open.org/security/saml/v2.0/', source: 'OASIS' },
      { label: 'RFC 6749 — The OAuth 2.0 Authorization Framework', url: 'https://www.rfc-editor.org/rfc/rfc6749', source: 'IETF' },
      { label: 'OpenID Connect specifications', url: 'https://openid.net/developers/specs/', source: 'OpenID Foundation' },
      { label: 'NIST SP 800-63C — Federation and Assertions', url: 'https://pages.nist.gov/800-63-3/sp800-63c.html', source: 'NIST' },
    ],
    quiz: [
      {
        q: 'Which statement about OAuth 2.0 is correct?',
        options: [
          'It is an authentication protocol that verifies user identity',
          'It is an authorisation framework for delegating scoped access; OpenID Connect adds the identity layer',
          'It replaces TLS for transport security',
          'It is only used inside Active Directory',
        ],
        answer: 1,
        explain:
          'OAuth grants an application limited access to a resource. Using it alone for login is a common design error — OIDC exists precisely to add authentication.',
      },
      {
        q: 'In a SAML flow, what does the identity provider send to the service provider?',
        options: ['The user password', 'A digitally signed assertion containing identity and attributes', 'A Kerberos ticket', 'An X.509 certificate signing request'],
        answer: 1,
        explain: 'The signed assertion is the whole point — the service provider trusts the signature and never handles the credential.',
      },
      {
        q: 'A user resets their password after a phishing incident, but the attacker retains access to their mailbox. What is the most likely explanation?',
        options: [
          'The password reset failed',
          'The attacker holds an OAuth refresh token from a consented application, which survives password changes',
          'The mailbox was not encrypted',
          'MFA was disabled',
        ],
        answer: 1,
        explain:
          'OAuth grants are independent of the password. Incident response must explicitly revoke tokens, sessions and application consents.',
      },
    ],
    examTip:
      'Match the protocol to the job: SAML = enterprise web SSO with XML assertions, OAuth = delegated authorisation, OIDC = authentication on top of OAuth using JWTs, Kerberos = domain authentication with tickets, LDAP = directory queries, SCIM = provisioning.',
  },
  {
    slug: 'secure-development-lifecycle',
    title: 'Secure Development & Application Architecture',
    domain: 3,
    objective: '3.1 Compare and contrast security implications of different architecture models',
    tagline: 'Shift left — threat modelling, secure coding, SAST/DAST and supply chain integrity.',
    difficulty: 'Intermediate',
    minutes: 11,
    keywords: ['sdlc', 'devsecops', 'sast', 'dast', 'sca', 'threat modelling', 'sbom', 'code review', 'secrets management', 'ci/cd'],
    simple: {
      what:
        "A secure development lifecycle builds security into every phase of software delivery rather than testing for it at the end. Requirements include security criteria, design includes threat modelling, coding follows secure standards, and the pipeline enforces automated testing before anything ships.",
      why:
        "Fixing a design flaw after release costs vastly more than catching it during design, and some flaws — an architecture with no authorisation boundary — cannot be patched at all without a rewrite.",
      how: [
        "Threat modelling asks: what are we building, what can go wrong, what will we do about it, and did we do a good job. STRIDE is a common enumeration aid.",
        "SAST reads source code for unsafe patterns. DAST attacks the running application. SCA inspects third-party dependencies. IAST and fuzzing add further coverage.",
        "Secrets belong in a vault, never in source code, and repositories should have push protection enabled.",
        "Supply chain integrity: generate an SBOM, pin and verify dependencies, sign artefacts, and protect the build system itself — it is a production system.",
      ],
      where: [
        "CI/CD pipelines gate merges on security checks and fail builds on critical findings.",
        "Regulated software must evidence secure development practices to auditors and customers.",
        "Open source consumption makes SCA and SBOM management essential for practically every organisation.",
      ],
    },
    diagram: {
      title: 'Security gates across the development pipeline',
      caption:
        'Each gate catches a different class of defect. None of them alone is sufficient.',
      columns: [
        [{ id: 'req', label: 'Requirements', sub: 'security acceptance criteria', tone: 'neutral', icon: 'ClipboardList' }],
        [{ id: 'design', label: 'Design', sub: 'threat model, STRIDE', tone: 'violet', icon: 'PenTool' }],
        [{ id: 'code', label: 'Code', sub: 'secure standards, peer review', tone: 'primary', icon: 'Code2' }],
        [
          { id: 'sast', label: 'SAST', sub: 'source analysis', tone: 'primary', icon: 'FileSearch' },
          { id: 'sca', label: 'SCA + SBOM', sub: 'dependency risk', tone: 'warn', icon: 'Package' },
          { id: 'secret', label: 'Secret Scanning', sub: 'block credentials in commits', tone: 'warn', icon: 'KeyRound' },
        ],
        [{ id: 'dast', label: 'DAST / Pen Test', sub: 'running application', tone: 'danger', icon: 'Crosshair' }],
        [{ id: 'prod', label: 'Signed Release', sub: 'provenance + monitoring', tone: 'safe', icon: 'BadgeCheck' }],
      ],
      edges: [
        { from: 'req', to: 'design', tone: 'neutral', animated: true },
        { from: 'design', to: 'code', tone: 'violet', animated: true },
        { from: 'code', to: 'sast', tone: 'primary', animated: true },
        { from: 'code', to: 'sca', tone: 'warn' },
        { from: 'code', to: 'secret', tone: 'warn' },
        { from: 'sast', to: 'dast', tone: 'danger', animated: true },
        { from: 'dast', to: 'prod', tone: 'safe', animated: true },
      ],
      legend: [
        { tone: 'primary', label: 'Static analysis' },
        { tone: 'danger', label: 'Dynamic testing' },
        { tone: 'safe', label: 'Release integrity' },
      ],
    },
    realWorld: {
      title: 'Why one vulnerable library becomes everyone problem',
      body:
        "A widely used open source logging component turned out to allow remote code execution through a crafted log message. Because it was a transitive dependency — a dependency of a dependency — most organisations could not immediately answer the only question that mattered: do we use it, and where? Teams with an accurate software bill of materials answered within an hour and patched within a day. Teams without one spent weeks manually searching build files. The event permanently changed how the industry treats dependency inventory, and it is the clearest possible argument for SBOM generation as routine practice.",
      takeaway: 'You cannot patch what you cannot inventory. SBOM is the dependency equivalent of an asset register.',
    },
    attack: {
      title: 'Compromising the build pipeline',
      intro:
        'Attacking the pipeline is efficient: one compromise distributes malicious code to every downstream consumer, signed and trusted.',
      steps: [
        { label: 'Access the pipeline', detail: 'A stolen personal access token or a compromised maintainer account grants write access to the repository or CI system.' },
        { label: 'Poison the build', detail: 'A malicious step is added to the build configuration, or a dependency is substituted with a lookalike package.' },
        { label: 'Inherit trust', detail: 'The artefact is signed with legitimate keys by the legitimate pipeline, so it passes every downstream check.' },
        { label: 'Distribute', detail: 'Customers install the update through normal channels, trusting the vendor.' },
        { label: 'Activate', detail: 'The implant beacons out selectively, avoiding sandbox and research environments.' },
      ],
      mitigations: [
        'Enforce MFA and short-lived credentials for all repository and CI access.',
        'Require signed commits, protected branches and mandatory peer review.',
        'Pin dependencies with integrity hashes and use an internal proxy registry to prevent dependency confusion.',
        'Generate provenance attestations (SLSA) and verify them before deployment.',
        'Treat build infrastructure as production: hardened, monitored and isolated.',
      ],
    },
    tools: [
      { name: 'Semgrep / CodeQL', what: 'Static analysis with customisable rules.', why: 'Catch injection and unsafe patterns during code review.', url: 'https://semgrep.dev/', category: 'SAST' },
      { name: 'OWASP ZAP / Burp Suite', what: 'Dynamic application security testing.', why: 'Attack the running application the way an adversary would.', url: 'https://www.zaproxy.org/', category: 'DAST' },
      { name: 'Dependabot / Renovate', what: 'Automated dependency update pull requests.', why: 'Keeps third-party risk from silently accumulating.', url: 'https://docs.github.com/code-security/dependabot', category: 'SCA' },
      { name: 'Syft / CycloneDX', what: 'SBOM generation and format standards.', why: 'Produces the inventory you need when the next critical library flaw lands.', url: 'https://cyclonedx.org/', category: 'Supply chain' },
    ],
    links: [
      { label: 'NIST SP 800-218 — Secure Software Development Framework', url: 'https://csrc.nist.gov/pubs/sp/800/218/final', source: 'NIST' },
      { label: 'OWASP Software Assurance Maturity Model', url: 'https://owaspsamm.org/', source: 'OWASP' },
      { label: 'SLSA — Supply-chain Levels for Software Artifacts', url: 'https://slsa.dev/', source: 'OpenSSF' },
      { label: 'CISA — Secure by Design principles', url: 'https://www.cisa.gov/securebydesign', source: 'CISA' },
    ],
    quiz: [
      {
        q: 'Which testing method analyses source code without executing it?',
        options: ['DAST', 'SAST', 'Fuzzing', 'Penetration testing'],
        answer: 1,
        explain: 'Static application security testing inspects code or bytecode directly. DAST and fuzzing require a running application.',
      },
      {
        q: 'What is the primary purpose of a software bill of materials?',
        options: [
          'To license the software',
          'To provide an inventory of components and dependencies so vulnerable ones can be located quickly',
          'To encrypt the source code',
          'To measure code quality',
        ],
        answer: 1,
        explain: 'An SBOM answers the question do we use this component and where, which is the first question asked whenever a critical library vulnerability is announced.',
      },
      {
        q: 'When is a design flaw most economically fixed?',
        options: ['After release, based on customer reports', 'During design, through threat modelling', 'During penetration testing', 'During incident response'],
        answer: 1,
        explain: 'Cost to remediate rises sharply through the lifecycle. Threat modelling during design catches structural flaws that later testing cannot cheaply fix.',
      },
    ],
    examTip:
      'Know the acronyms and what they test: SAST (code, static), DAST (running app, dynamic), IAST (instrumented, hybrid), SCA (dependencies), plus threat modelling, code signing, SBOM and secure baselines.',
  },
]

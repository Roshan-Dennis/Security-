import type { Topic } from '../../types'

export const DOMAIN5: Topic[] = [
  {
    slug: 'risk-management',
    title: 'Risk Management',
    domain: 5,
    objective: '5.2 Explain elements of the risk management process',
    tagline: 'Identify, analyse, treat, monitor — turning uncertainty into decisions.',
    difficulty: 'Intermediate',
    minutes: 12,
    keywords: ['risk', 'likelihood', 'impact', 'sle', 'ale', 'aro', 'risk register', 'appetite', 'mitigate', 'transfer', 'accept', 'avoid'],
    simple: {
      what:
        "Risk is the combination of how likely something bad is and how much it would hurt. Risk management is the process of identifying risks, analysing them, choosing a treatment, and monitoring the result. Treatments are: mitigate (reduce it), transfer (insure or contract it away), avoid (stop doing the activity) and accept (acknowledge and live with it).",
      why:
        "Security budgets are finite. Risk management is how you justify spending on one thing rather than another, and how you demonstrate to a board that the decisions were deliberate rather than reactive.",
      how: [
        "Qualitative analysis uses categories — high, medium, low — and is fast, subjective and good for prioritisation.",
        "Quantitative analysis uses numbers: SLE = asset value x exposure factor; ALE = SLE x ARO. It supports cost-benefit arguments but requires data you often do not have.",
        "The risk register records each risk, its owner, inherent and residual scores, treatment, and review date.",
        "Risk appetite is how much risk the organisation is willing to accept in pursuit of objectives; risk tolerance is acceptable variation around that.",
        "Key risk indicators give early warning that a risk is increasing before it materialises.",
      ],
      where: [
        "Board and audit committee reporting; enterprise risk management alongside financial and operational risk.",
        "Third-party and project risk assessments, and formal risk acceptance for unpatched systems.",
        "Regulatory frameworks require documented, repeatable risk assessment.",
      ],
    },
    diagram: {
      title: 'The risk management cycle and treatment options',
      caption:
        'Residual risk is what remains after treatment. Someone senior must knowingly own it.',
      columns: [
        [{ id: 'id', label: 'Identify', sub: 'threats, vulnerabilities, assets', tone: 'neutral', icon: 'Search' }],
        [{ id: 'assess', label: 'Analyse', sub: 'likelihood x impact', tone: 'primary', icon: 'Gauge' }],
        [
          { id: 'mit', label: 'Mitigate', sub: 'apply controls', tone: 'safe', icon: 'ShieldCheck' },
          { id: 'tra', label: 'Transfer', sub: 'insurance, contracts', tone: 'violet', icon: 'ArrowLeftRight' },
          { id: 'avo', label: 'Avoid', sub: 'stop the activity', tone: 'warn', icon: 'Ban' },
          { id: 'acc', label: 'Accept', sub: 'documented and owned', tone: 'neutral', icon: 'FileSignature' },
        ],
        [{ id: 'res', label: 'Residual Risk', sub: 'what remains after treatment', tone: 'warn', icon: 'TrendingDown' }],
        [{ id: 'mon', label: 'Monitor & Review', sub: 'KRIs, reassessment, reporting', tone: 'safe', icon: 'Activity' }],
      ],
      edges: [
        { from: 'id', to: 'assess', tone: 'primary', animated: true },
        { from: 'assess', to: 'mit', tone: 'safe', animated: true },
        { from: 'assess', to: 'tra', tone: 'violet' },
        { from: 'assess', to: 'avo', tone: 'warn' },
        { from: 'assess', to: 'acc', tone: 'neutral' },
        { from: 'mit', to: 'res', tone: 'warn', animated: true },
        { from: 'res', to: 'mon', tone: 'safe', animated: true },
        { from: 'mon', to: 'id', label: 'continuous', tone: 'safe' },
      ],
      legend: [
        { tone: 'safe', label: 'Risk reduced' },
        { tone: 'warn', label: 'Risk remaining' },
      ],
    },
    realWorld: {
      title: 'The risk that was accepted by someone with no authority to accept it',
      body:
        "An engineer needs to ship a project. A control is inconvenient, so it is skipped, and the decision is recorded — if at all — in a chat message. Eighteen months later that gap is the root cause of a breach, and nobody senior ever knew the risk existed. Formal risk acceptance exists precisely to prevent this: the risk is written down in business terms, the residual exposure is quantified as well as it can be, an executive with the authority to accept that level of exposure signs it, and a review date is set. The point is not bureaucracy. It is ensuring risk decisions are made by people who own the consequences.",
      takeaway: 'Risk acceptance is a business decision made by a named, accountable owner — never an engineering shortcut.',
    },
    attack: {
      title: 'How attackers exploit misaligned risk assessment',
      intro:
        'Adversaries target exactly what your risk process undervalues.',
      steps: [
        { label: 'Underrated assets', detail: 'A development or test environment holds a copy of production data but is assessed as low criticality.' },
        { label: 'Weaker controls', detail: 'Because of its rating, it has no MFA, no monitoring and irregular patching.' },
        { label: 'Entry', detail: 'The attacker compromises it easily and finds real customer data plus credentials that also work in production.' },
        { label: 'Cross over', detail: 'Shared accounts or network trust provide a path into the production environment.' },
        { label: 'Impact', detail: 'The realised loss reflects production value, not the low rating the environment was given.' },
      ],
      mitigations: [
        'Rate environments by the sensitivity of the data they hold, not by their label.',
        'Never place production data in lower-assurance environments; mask or synthesise instead.',
        'Separate credentials and network paths between environments.',
        'Reassess risk when data or dependencies change, not only on an annual cycle.',
      ],
    },
    tools: [
      { name: 'NIST SP 800-30', what: 'Guide for conducting risk assessments.', why: 'The canonical methodology for structured risk analysis.', url: 'https://csrc.nist.gov/pubs/sp/800/30/r1/final', category: 'Framework' },
      { name: 'FAIR model', what: 'Quantitative risk analysis methodology.', why: 'Expresses cyber risk in financial terms that boards understand.', url: 'https://www.fairinstitute.org/', category: 'Quantitative' },
      { name: 'Risk register (spreadsheet or GRC platform)', what: 'Central record of risks, owners and treatments.', why: 'The single most useful artefact in any risk programme.', category: 'Process' },
      { name: 'OpenFAIR / SimpleRisk', what: 'Open tooling for risk assessment and tracking.', why: 'Practise the process without enterprise GRC licensing.', url: 'https://www.simplerisk.com/', category: 'Tooling' },
    ],
    links: [
      { label: 'NIST SP 800-30 Rev.1 — Guide for Conducting Risk Assessments', url: 'https://csrc.nist.gov/pubs/sp/800/30/r1/final', source: 'NIST' },
      { label: 'NIST SP 800-37 — Risk Management Framework', url: 'https://csrc.nist.gov/pubs/sp/800/37/r2/final', source: 'NIST' },
      { label: 'ISO 31000 — Risk management', url: 'https://www.iso.org/iso-31000-risk-management.html', source: 'ISO' },
    ],
    quiz: [
      {
        q: 'An asset is worth 200,000. A fire would destroy 25 percent of it, and fires occur once every 10 years. What is the annualised loss expectancy?',
        options: ['50,000', '5,000', '20,000', '500,000'],
        answer: 1,
        explain:
          'SLE = 200,000 x 0.25 = 50,000. ARO = 0.1 (once per ten years). ALE = SLE x ARO = 50,000 x 0.1 = 5,000.',
      },
      {
        q: 'An organisation buys cyber insurance to cover breach response costs. Which risk treatment is this?',
        options: ['Mitigate', 'Transfer', 'Avoid', 'Accept'],
        answer: 1,
        explain: 'Insurance transfers the financial consequence to another party. It does not reduce the likelihood of the event occurring.',
      },
      {
        q: 'What is residual risk?',
        options: [
          'Risk before any controls are applied',
          'The risk that remains after controls have been implemented',
          'Risk transferred to a third party',
          'Risk that has been fully eliminated',
        ],
        answer: 1,
        explain: 'Inherent risk is before controls; residual risk is what remains afterwards and must be formally accepted by an owner.',
      },
    ],
    examTip:
      'Memorise the formulas: SLE = asset value x exposure factor, ARO = occurrences per year, ALE = SLE x ARO. Know the four treatments (mitigate, transfer, avoid, accept) and the difference between inherent and residual risk.',
  },
  {
    slug: 'governance-policies',
    title: 'Governance, Policies, Standards & Procedures',
    domain: 5,
    objective: '5.1 Summarize elements of effective security governance',
    tagline: 'The documented hierarchy that turns intent into consistent behaviour.',
    difficulty: 'Beginner',
    minutes: 10,
    keywords: ['governance', 'policy', 'standard', 'procedure', 'guideline', 'aup', 'board', 'committee', 'ciso', 'accountability'],
    simple: {
      what:
        "Governance is the structure of decision rights, accountability and oversight for security. It produces a documented hierarchy: policy states the intent and is mandatory, standards specify measurable requirements, procedures give step-by-step instructions, and guidelines offer recommended good practice.",
      why:
        "Without documented governance, security depends on whoever happens to be in the room. Documentation makes expectations consistent, auditable and enforceable, and gives people the authority to say no.",
      how: [
        "Policy: short, principle-based, approved at executive level, rarely changed. Example — all remote access must use multifactor authentication.",
        "Standard: specific and measurable. Example — MFA must be phishing-resistant FIDO2 for administrative accounts.",
        "Procedure: exact steps. Example — how to enrol a security key, screen by screen.",
        "Guideline: advisory. Example — recommended approaches for securing home working environments.",
        "Common policies: acceptable use, information security, business continuity, disaster recovery, incident response, change management, software development lifecycle.",
      ],
      where: [
        "Governance structures: board oversight, a security steering committee, and defined roles — owner, controller, processor, custodian, steward.",
        "Regulated sectors require board-level accountability for cyber risk.",
        "Policy exceptions must be requested, approved, time-bounded and reviewed.",
      ],
    },
    diagram: {
      title: 'The governance document hierarchy',
      caption:
        'Each layer is more specific and changes more often than the one above it. Confusing the layers is the most common documentation failure.',
      columns: [
        [{ id: 'board', label: 'Board / Executive', sub: 'accountability and appetite', tone: 'violet', icon: 'Landmark' }],
        [{ id: 'policy', label: 'Policy', sub: 'mandatory, principle-based', tone: 'primary', icon: 'ScrollText' }],
        [{ id: 'std', label: 'Standards', sub: 'mandatory, specific, measurable', tone: 'primary', icon: 'Ruler' }],
        [
          { id: 'proc', label: 'Procedures', sub: 'mandatory, step by step', tone: 'safe', icon: 'ListOrdered' },
          { id: 'guide', label: 'Guidelines', sub: 'advisory good practice', tone: 'neutral', icon: 'BookOpen' },
        ],
        [{ id: 'people', label: 'Consistent Behaviour', sub: 'and auditable evidence', tone: 'safe', icon: 'Users' }],
      ],
      edges: [
        { from: 'board', to: 'policy', label: 'approves', tone: 'violet', animated: true },
        { from: 'policy', to: 'std', label: 'made specific by', tone: 'primary', animated: true },
        { from: 'std', to: 'proc', label: 'implemented by', tone: 'safe', animated: true },
        { from: 'std', to: 'guide', tone: 'neutral' },
        { from: 'proc', to: 'people', tone: 'safe', animated: true },
      ],
      legend: [
        { tone: 'primary', label: 'Mandatory' },
        { tone: 'neutral', label: 'Advisory' },
      ],
    },
    realWorld: {
      title: 'The policy nobody could follow',
      body:
        "A policy states that all data must be encrypted at rest. It is approved, published and audited against. Three years later an assessment finds a dozen systems in breach — not through negligence, but because the policy never became a standard specifying which algorithms and key lengths, never became a procedure explaining how to do it on each platform, and was never accompanied by an exception process for systems that genuinely could not comply. Everyone knew the rule and nobody could operationalise it. Policy without the supporting layers is a statement of aspiration that produces audit findings rather than security.",
      takeaway: 'A policy is only real when the standards, procedures and exception process beneath it exist.',
    },
    attack: {
      title: 'Governance gaps as an attack enabler',
      intro:
        'Attackers benefit from ambiguity about who owns what.',
      steps: [
        { label: 'Ownerless system', detail: 'A legacy application has no documented business owner after a reorganisation.' },
        { label: 'No patching', detail: 'Because nobody owns it, nobody approves downtime, so it is never patched.' },
        { label: 'No monitoring', detail: 'It was never onboarded to logging because no owner requested it.' },
        { label: 'Exploited', detail: 'A known vulnerability is exploited from the internet with no alert generated.' },
        { label: 'Delayed response', detail: 'When finally detected, the response is slowed because nobody can authorise taking it offline.' },
      ],
      mitigations: [
        'Maintain an asset register in which every system has a named business owner and technical custodian.',
        'Review ownership after every reorganisation, acquisition or departure.',
        'Make onboarding to logging and vulnerability management a mandatory gate for going live.',
        'Report ownerless assets to the steering committee as a standing risk item.',
      ],
    },
    tools: [
      { name: 'ISO/IEC 27001 and 27002', what: 'Information security management system standard and control guidance.', why: 'The most widely recognised certifiable governance framework.', url: 'https://www.iso.org/standard/27001', category: 'Framework' },
      { name: 'NIST Cybersecurity Framework 2.0', what: 'Govern, Identify, Protect, Detect, Respond, Recover.', why: 'The Govern function was added specifically to elevate accountability.', url: 'https://www.nist.gov/cyberframework', category: 'Framework' },
      { name: 'SANS policy templates', what: 'Free, editable security policy templates.', why: 'A credible starting point rather than a blank page.', url: 'https://www.sans.org/information-security-policy/', category: 'Templates' },
      { name: 'GRC platforms', what: 'Policy lifecycle, control mapping and evidence management.', why: 'Keeps policy review dates, attestations and exceptions from being forgotten.', category: 'Tooling' },
    ],
    links: [
      { label: 'NIST Cybersecurity Framework 2.0', url: 'https://www.nist.gov/cyberframework', source: 'NIST' },
      { label: 'ISO/IEC 27001', url: 'https://www.iso.org/standard/27001', source: 'ISO' },
      { label: 'CIS Controls Implementation Groups', url: 'https://www.cisecurity.org/controls/implementation-groups', source: 'CIS' },
    ],
    quiz: [
      {
        q: 'Which document type is mandatory and specifies exact, measurable requirements such as minimum key length?',
        options: ['Policy', 'Standard', 'Procedure', 'Guideline'],
        answer: 1,
        explain: 'Standards translate policy intent into specific mandatory requirements. Procedures describe how to carry them out; guidelines are advisory.',
      },
      {
        q: 'Which role decides how and why personal data is processed under data protection regulation?',
        options: ['Data custodian', 'Data controller', 'Data processor', 'Data subject'],
        answer: 1,
        explain:
          'The controller determines purposes and means of processing. The processor acts on the controller instructions; the custodian handles day-to-day technical care; the subject is the individual.',
      },
      {
        q: 'What is the purpose of an acceptable use policy?',
        options: [
          'To define encryption algorithms',
          'To set out how organisational systems and data may and may not be used by staff',
          'To document incident response steps',
          'To specify backup retention',
        ],
        answer: 1,
        explain: 'The AUP defines acceptable behaviour on organisational systems and is usually acknowledged by every employee.',
      },
    ],
    examTip:
      'Know the hierarchy (policy, standard, procedure, guideline), the governance structures (boards, committees, government entities, centralised vs decentralised) and the data roles (owner, controller, processor, custodian, steward).',
  },
  {
    slug: 'third-party-risk',
    title: 'Third-Party & Supply Chain Risk',
    domain: 5,
    objective: '5.3 Explain the processes associated with third-party risk assessment',
    tagline: 'You can outsource the work. You cannot outsource the accountability.',
    difficulty: 'Intermediate',
    minutes: 11,
    keywords: ['vendor risk', 'supply chain', 'due diligence', 'sla', 'mou', 'msa', 'sow', 'nda', 'bpa', 'right to audit', 'soc 2'],
    simple: {
      what:
        "Third-party risk management assesses and controls the risk introduced by suppliers, service providers, managed service providers and software vendors. It covers due diligence before contracting, contractual controls, ongoing monitoring, and a planned exit.",
      why:
        "Your suppliers hold your data, connect to your network and ship code into your environment. A breach at a supplier is your breach in the eyes of your customers and your regulator.",
      how: [
        "Due diligence: security questionnaires, independent assurance reports such as SOC 2 Type II or ISO 27001 certification, penetration test summaries and financial stability checks.",
        "Contract vehicles to know: SLA (service levels), MSA (master terms), SOW (specific work), NDA (confidentiality), MOU/MOA (intent, often non-binding), BPA (business partnership).",
        "Essential clauses: right to audit, breach notification timelines, subcontractor disclosure, data location and return, security requirements and termination assistance.",
        "Ongoing monitoring rather than a one-off assessment — tier vendors by criticality and review the important ones regularly.",
        "Supply chain also means software: SBOM, provenance, dependency integrity and signed artefacts.",
      ],
      where: [
        "Cloud providers, payroll, marketing platforms, MSPs and any supplier with network connectivity or data access.",
        "Hardware supply chain integrity for high-assurance environments.",
        "Regulated sectors impose explicit outsourcing and concentration risk requirements.",
      ],
    },
    diagram: {
      title: 'Third-party risk lifecycle',
      caption:
        'Most programmes do due diligence well and monitoring poorly. Risk changes after the contract is signed.',
      columns: [
        [{ id: 'need', label: 'Identify Need', sub: 'what data and access is required', tone: 'neutral', icon: 'ClipboardList' }],
        [{ id: 'dd', label: 'Due Diligence', sub: 'questionnaire, SOC 2, pen test', tone: 'primary', icon: 'SearchCheck' }],
        [{ id: 'contract', label: 'Contract Controls', sub: 'SLA, right to audit, notification', tone: 'violet', icon: 'FileSignature' }],
        [{ id: 'onboard', label: 'Onboard', sub: 'least-privilege access, segmentation', tone: 'safe', icon: 'DoorClosed' }],
        [{ id: 'monitor', label: 'Ongoing Monitoring', sub: 'attestations, incidents, posture', tone: 'warn', icon: 'Activity' }],
        [{ id: 'exit', label: 'Exit / Offboard', sub: 'data return and access revocation', tone: 'danger', icon: 'LogOut' }],
      ],
      edges: [
        { from: 'need', to: 'dd', tone: 'primary', animated: true },
        { from: 'dd', to: 'contract', tone: 'violet', animated: true },
        { from: 'contract', to: 'onboard', tone: 'safe', animated: true },
        { from: 'onboard', to: 'monitor', tone: 'warn', animated: true },
        { from: 'monitor', to: 'exit', tone: 'danger', animated: true },
        { from: 'monitor', to: 'dd', label: 'periodic reassessment', tone: 'primary' },
      ],
      legend: [
        { tone: 'safe', label: 'Controlled access' },
        { tone: 'danger', label: 'Termination risk' },
      ],
    },
    realWorld: {
      title: 'One provider, many victims',
      body:
        "Attacking a managed service provider or a widely used software vendor is enormously efficient: one compromise yields access to hundreds of downstream organisations, often through legitimate remote management tooling that every customer trusts by design. Several of the most damaging incidents of recent years followed exactly this pattern. The defensive implications are uncomfortable but clear — assume your provider can be compromised, and design accordingly. Limit what their tooling can reach, require MFA on their access, monitor their activity as you would any privileged user, and ensure you could operate without them. Concentration risk is a board-level topic, not a procurement footnote.",
      takeaway: 'Design for supplier compromise. Least privilege and monitoring apply to vendors exactly as they do to employees.',
    },
    attack: {
      title: 'Island hopping through a trusted supplier',
      intro:
        'When the target is hardened, attackers move to the softer organisation that already has legitimate access to it.',
      steps: [
        { label: 'Select the weak link', detail: 'A smaller supplier with network connectivity and a smaller security budget is identified.' },
        { label: 'Compromise', detail: 'The supplier is breached through ordinary phishing.' },
        { label: 'Use legitimate access', detail: 'The existing VPN, API integration or remote management connection into the target is used.' },
        { label: 'Blend in', detail: 'Activity appears as normal supplier work, from an expected source, at expected times.' },
        { label: 'Achieve objective', detail: 'Data is accessed or ransomware is deployed inside the target environment.' },
      ],
      mitigations: [
        'Segment and strictly scope all third-party connectivity; no flat access.',
        'Require MFA and named individual accounts for supplier personnel — never shared credentials.',
        'Time-bound access with just-in-time approval rather than permanent connections.',
        'Monitor supplier account activity distinctly, and require breach notification within a defined short window.',
      ],
    },
    tools: [
      { name: 'SOC 2 Type II reports', what: 'Independent assurance over a service provider controls.', why: 'The standard evidence artefact requested in due diligence.', url: 'https://www.aicpa-cima.com/', category: 'Assurance' },
      { name: 'Standardised questionnaires (SIG, CAIQ)', what: 'Common vendor assessment question sets.', why: 'Avoids every customer inventing their own questionnaire.', url: 'https://cloudsecurityalliance.org/star/', category: 'Due diligence' },
      { name: 'Security ratings services', what: 'External posture scoring from observable data.', why: 'Continuous signal between formal assessments.', category: 'Monitoring' },
      { name: 'SBOM tooling (Syft, CycloneDX)', what: 'Software component inventory.', why: 'Extends supply chain visibility into the code you consume.', url: 'https://cyclonedx.org/', category: 'Software supply chain' },
    ],
    links: [
      { label: 'NIST SP 800-161 — Cybersecurity Supply Chain Risk Management', url: 'https://csrc.nist.gov/pubs/sp/800/161/r1/final', source: 'NIST' },
      { label: 'CISA — ICT Supply Chain Risk Management', url: 'https://www.cisa.gov/topics/risk-management/ict-supply-chain-risk-management', source: 'CISA' },
      { label: 'Cloud Security Alliance STAR Registry', url: 'https://cloudsecurityalliance.org/star/', source: 'CSA' },
    ],
    quiz: [
      {
        q: 'Which contractual element gives an organisation the ability to independently verify a supplier security controls?',
        options: ['Service level agreement', 'Right-to-audit clause', 'Non-disclosure agreement', 'Memorandum of understanding'],
        answer: 1,
        explain: 'The right-to-audit clause permits inspection or independent assessment. An SLA defines service levels; an NDA covers confidentiality.',
      },
      {
        q: 'What is the primary limitation of assessing a vendor only at onboarding?',
        options: [
          'It is too expensive',
          'Vendor risk changes over time — through breaches, acquisitions, staff changes and new subcontractors',
          'Questionnaires are always accurate',
          'It duplicates internal audit',
        ],
        answer: 1,
        explain: 'A point-in-time assessment reflects one moment. Continuous or periodic monitoring is required because the risk is dynamic.',
      },
      {
        q: 'Which agreement type is typically non-binding and expresses mutual intent between parties?',
        options: ['MSA', 'SOW', 'MOU', 'SLA'],
        answer: 2,
        explain: 'A memorandum of understanding records intent and is generally not legally binding. MSA sets master terms, SOW defines specific work, SLA defines service levels.',
      },
    ],
    examTip:
      'Learn the agreement acronyms: SLA, MOU, MOA, MSA, SOW, NDA, BPA. Also know vendor assessment methods (penetration testing, right-to-audit, independent assessments, supply chain analysis) and monitoring and questionnaires as ongoing activities.',
  },
  {
    slug: 'compliance-privacy',
    title: 'Compliance & Privacy',
    domain: 5,
    objective: '5.4 Summarize elements of effective security compliance',
    tagline: 'Legal obligation as a floor, not a ceiling.',
    difficulty: 'Intermediate',
    minutes: 11,
    keywords: ['compliance', 'gdpr', 'hipaa', 'pci dss', 'sox', 'privacy', 'consent', 'data subject', 'breach notification', 'attestation', 'sanctions'],
    simple: {
      what:
        "Compliance is demonstrating that the organisation meets its legal, regulatory and contractual obligations. Privacy is the specific set of obligations around personal data — how it is collected, used, shared, retained and deleted, and what rights individuals have over it.",
      why:
        "Non-compliance carries fines, contract loss, sanctions and personal liability for directors. But the deeper point is that compliance is a minimum standard: passing an audit does not mean you are secure, and many breached organisations were fully compliant.",
      how: [
        "Know the major regimes: GDPR (EU personal data, up to 4 percent of global turnover, 72-hour breach notification), HIPAA (US health information), PCI DSS (payment cards, contractual), SOX (financial reporting controls), GLBA (financial privacy).",
        "Privacy principles: lawful basis, purpose limitation, data minimisation, accuracy, storage limitation, integrity and confidentiality, and accountability.",
        "Data subject rights include access, rectification, erasure, portability and objection — and you must be able to fulfil them operationally.",
        "Compliance monitoring: internal reporting, attestation and acknowledgement, automated evidence collection, and due diligence over suppliers.",
        "Consequences of non-compliance: fines, sanctions, loss of licence, contractual breach and reputational damage.",
      ],
      where: [
        "Privacy impact assessments before launching processing of personal data.",
        "Records of processing activities, data flow mapping and retention schedules.",
        "Breach notification decision-making during incident response — the clock starts at awareness.",
      ],
    },
    diagram: {
      title: 'Personal data lifecycle and privacy obligations',
      caption:
        'Obligations attach at every stage. Deletion is a control, not an afterthought — data you no longer hold cannot be breached.',
      columns: [
        [{ id: 'collect', label: 'Collect', sub: 'lawful basis, notice, consent', tone: 'primary', icon: 'Download' }],
        [{ id: 'use', label: 'Use', sub: 'purpose limitation, minimisation', tone: 'violet', icon: 'Settings2' }],
        [{ id: 'store', label: 'Store', sub: 'encryption, access control, location', tone: 'safe', icon: 'Database' }],
        [{ id: 'share', label: 'Share', sub: 'processors, transfers, contracts', tone: 'warn', icon: 'Share2' }],
        [{ id: 'retain', label: 'Retain', sub: 'schedule and justification', tone: 'warn', icon: 'Timer' }],
        [
          { id: 'delete', label: 'Delete', sub: 'secure disposal, certificate', tone: 'safe', icon: 'Trash2' },
          { id: 'rights', label: 'Subject Rights', sub: 'access, erasure, portability', tone: 'primary', icon: 'UserCheck' },
        ],
      ],
      edges: [
        { from: 'collect', to: 'use', tone: 'primary', animated: true },
        { from: 'use', to: 'store', tone: 'safe', animated: true },
        { from: 'store', to: 'share', tone: 'warn' },
        { from: 'store', to: 'retain', tone: 'warn', animated: true },
        { from: 'retain', to: 'delete', tone: 'safe', animated: true },
        { from: 'rights', to: 'store', label: 'must be actionable', tone: 'primary' },
      ],
      legend: [
        { tone: 'safe', label: 'Protective obligation' },
        { tone: 'warn', label: 'Elevated risk stage' },
      ],
    },
    realWorld: {
      title: 'Compliant and breached',
      body:
        "Organisations have passed their compliance assessment and suffered a major breach within months, sometimes weeks. This is not evidence that compliance is useless — it is evidence of what compliance actually is: a point-in-time check against a minimum baseline, often scoped narrowly, and frequently satisfied by documentation rather than by demonstrated effectiveness. A control can be present, evidenced and completely ineffective. Mature organisations use compliance as a floor and measure themselves on outcomes instead: mean time to detect, percentage of assets covered by monitoring, and results of adversary simulation.",
      takeaway: 'Compliance proves the minimum was documented. It does not prove the control works.',
    },
    attack: {
      title: 'Extortion using regulatory exposure',
      intro:
        'Attackers have learned to weaponise your compliance obligations against you.',
      steps: [
        { label: 'Steal regulated data', detail: 'Personal, health or payment data is exfiltrated specifically because it carries statutory consequences.' },
        { label: 'Quantify the threat', detail: 'The ransom demand is explicitly compared to the potential regulatory fine.' },
        { label: 'Threaten disclosure', detail: 'Attackers threaten to report the breach to the regulator themselves if payment is refused.' },
        { label: 'Contact data subjects', detail: 'Affected individuals are notified directly to maximise reputational pressure.' },
        { label: 'Deadline pressure', detail: 'Timelines are set to collide with the notification window, forcing rushed decisions.' },
      ],
      mitigations: [
        'Minimise and delete regulated data you do not need — it is the only complete defence.',
        'Encrypt and tokenise so exfiltrated data is less useful and notification obligations may be reduced.',
        'Prepare breach notification templates and legal contacts in advance so the clock is not lost to drafting.',
        'Engage legal counsel and the regulator early; transparency generally produces better outcomes than concealment.',
      ],
    },
    tools: [
      { name: 'Data mapping and RoPA tooling', what: 'Records of processing activities and data flow mapping.', why: 'You cannot comply for data you cannot locate.', category: 'Privacy' },
      { name: 'Amazon Macie / Microsoft Purview', what: 'Automated sensitive data discovery and classification.', why: 'Finds regulated data in places it should not be.', url: 'https://learn.microsoft.com/purview/', category: 'Discovery' },
      { name: 'OpenSCAP / Chef InSpec', what: 'Automated compliance and control testing.', why: 'Continuous evidence rather than an annual scramble.', url: 'https://www.open-scap.org/', category: 'Automation' },
      { name: 'NIST Privacy Framework', what: 'Structured approach to privacy risk management.', why: 'Complements the Cybersecurity Framework for privacy outcomes.', url: 'https://www.nist.gov/privacy-framework', category: 'Framework' },
    ],
    links: [
      { label: 'GDPR full text', url: 'https://gdpr-info.eu/', source: 'EU' },
      { label: 'HHS — HIPAA Security Rule', url: 'https://www.hhs.gov/hipaa/for-professionals/security/index.html', source: 'HHS' },
      { label: 'PCI Security Standards Council', url: 'https://www.pcisecuritystandards.org/', source: 'PCI SSC' },
      { label: 'NIST Privacy Framework', url: 'https://www.nist.gov/privacy-framework', source: 'NIST' },
    ],
    quiz: [
      {
        q: 'Under GDPR, within what period must a controller notify the supervisory authority of a personal data breach?',
        options: ['24 hours', '72 hours of becoming aware', '30 days', 'Only if individuals are harmed'],
        answer: 1,
        explain: 'Notification is required without undue delay and, where feasible, within 72 hours of becoming aware — which is why response plans must include legal escalation.',
      },
      {
        q: 'Which principle states that you should collect only the personal data necessary for the stated purpose?',
        options: ['Purpose limitation', 'Data minimisation', 'Storage limitation', 'Accountability'],
        answer: 1,
        explain: 'Data minimisation limits what is collected. Purpose limitation restricts how it may be used; storage limitation restricts how long it is kept.',
      },
      {
        q: 'Why is passing a compliance audit not equivalent to being secure?',
        options: [
          'Audits are always incorrect',
          'Compliance assesses a minimum baseline at a point in time and often accepts documentation as evidence of effectiveness',
          'Compliance frameworks are illegal',
          'Auditors do not examine controls',
        ],
        answer: 1,
        explain:
          'Compliance is necessary but not sufficient. Effectiveness must be measured through testing, simulation and operational metrics.',
      },
    ],
    examTip:
      'Know consequences (fines, sanctions, reputational damage, contractual impacts, loss of licence), monitoring methods (due diligence, attestation and acknowledgement, internal and external, automation) and privacy terms (data inventory, right to be forgotten, controller vs processor, ownership).',
  },
  {
    slug: 'audits-assessments',
    title: 'Audits, Assessments & Attestation',
    domain: 5,
    objective: '5.5 Explain types and purposes of audits and assessments',
    tagline: 'Independent verification that the controls you claim actually exist and work.',
    difficulty: 'Beginner',
    minutes: 9,
    keywords: ['audit', 'internal audit', 'external audit', 'attestation', 'assessment', 'evidence', 'sampling', 'finding', 'remediation', 'independence'],
    simple: {
      what:
        "An audit is a formal, independent examination of whether controls exist and operate as described, producing evidence-based findings. An assessment is broader and more advisory. Attestation is a formal statement, often by management or an independent party, that something is true.",
      why:
        "Self-reported security is optimistic by nature. Independent examination catches the gap between what people believe is in place and what is actually running, and gives the board a credible view.",
      how: [
        "Internal audit reports to the audit committee, not to IT, so it can report uncomfortable findings independently.",
        "External audit is conducted by a third party, often for certification or regulatory purposes.",
        "Auditors sample: they select a subset of changes, accounts or tickets and test them. Consistent process matters more than heroic effort on the sampled items.",
        "Findings are risk-rated and tracked to closure with owners and dates; repeat findings are treated seriously because they indicate systemic failure.",
        "Assessment types include self-assessments, third-party assessments, penetration tests and regulatory examinations.",
      ],
      where: [
        "ISO 27001 certification, SOC 2 examination, PCI DSS assessment and sector-specific regulatory examinations.",
        "Customer-driven security reviews as part of procurement.",
        "Post-incident reviews commissioned to establish root cause independently.",
      ],
    },
    diagram: {
      title: 'The audit cycle',
      caption:
        'Evidence is the currency. A control that works but cannot be evidenced will be recorded as a finding.',
      columns: [
        [{ id: 'scope', label: 'Scope & Plan', sub: 'systems, period, criteria', tone: 'neutral', icon: 'ClipboardList' }],
        [{ id: 'evidence', label: 'Evidence Collection', sub: 'configs, tickets, logs, interviews', tone: 'primary', icon: 'FolderSearch' }],
        [{ id: 'test', label: 'Control Testing', sub: 'design and operating effectiveness', tone: 'violet', icon: 'FlaskConical' }],
        [
          { id: 'pass', label: 'Effective', sub: 'no exception', tone: 'safe', icon: 'CircleCheck' },
          { id: 'find', label: 'Finding', sub: 'risk-rated exception', tone: 'danger', icon: 'TriangleAlert' },
        ],
        [{ id: 'remed', label: 'Remediation Plan', sub: 'owner, action, date', tone: 'warn', icon: 'Wrench' }],
        [{ id: 'follow', label: 'Follow-Up', sub: 'verify closure', tone: 'safe', icon: 'CheckCheck' }],
      ],
      edges: [
        { from: 'scope', to: 'evidence', tone: 'primary', animated: true },
        { from: 'evidence', to: 'test', tone: 'violet', animated: true },
        { from: 'test', to: 'pass', tone: 'safe' },
        { from: 'test', to: 'find', tone: 'danger', animated: true },
        { from: 'find', to: 'remed', tone: 'warn', animated: true },
        { from: 'remed', to: 'follow', tone: 'safe', animated: true },
      ],
      legend: [
        { tone: 'safe', label: 'Control effective' },
        { tone: 'danger', label: 'Exception raised' },
      ],
    },
    realWorld: {
      title: 'Design effectiveness versus operating effectiveness',
      body:
        "Auditors test two distinct things and candidates frequently confuse them. Design effectiveness asks whether the control, as described, would prevent or detect the risk if it operated properly. Operating effectiveness asks whether it actually did operate that way throughout the period. A quarterly access review that is beautifully documented but was skipped in two of four quarters is well designed and not operating effectively. This distinction is exactly why SOC 2 Type I (design at a point in time) and Type II (operation over a period, typically six to twelve months) exist, and why Type II is what customers actually ask for.",
      takeaway: 'A control that is not evidenced as operating consistently is, for audit purposes, not operating.',
    },
    attack: {
      title: 'The gap between the audited scope and reality',
      intro:
        'Attackers do not respect your audit boundary — and everything outside it typically has weaker controls.',
      steps: [
        { label: 'Narrow scope', detail: 'The audit covers only the systems within a defined compliance boundary.' },
        { label: 'Out-of-scope weakness', detail: 'Adjacent development, marketing or legacy systems receive far less scrutiny.' },
        { label: 'Compromise the edge', detail: 'The attacker enters through an out-of-scope system that was never assessed.' },
        { label: 'Cross the boundary', detail: 'Shared credentials, shared directory or network trust bridges into the audited environment.' },
        { label: 'Result', detail: 'A fully compliant environment is breached through something the assessment never looked at.' },
      ],
      mitigations: [
        'Validate that segmentation between in-scope and out-of-scope environments is real and tested.',
        'Apply baseline controls everywhere, not only inside the compliance boundary.',
        'Test the boundary explicitly during penetration testing.',
        'Report to leadership on total estate coverage, not just audited scope.',
      ],
    },
    tools: [
      { name: 'Chef InSpec / OpenSCAP', what: 'Compliance as code and automated control testing.', why: 'Generates continuous evidence instead of an annual manual collection exercise.', url: 'https://www.open-scap.org/', category: 'Automation' },
      { name: 'GRC platforms', what: 'Control mapping, evidence and finding tracking.', why: 'Maps one control to many frameworks, avoiding duplicated work.', category: 'Tooling' },
      { name: 'CIS-CAT', what: 'Benchmark assessment tool.', why: 'Machine-readable evidence of configuration compliance.', url: 'https://www.cisecurity.org/cybersecurity-tools/cis-cat-pro', category: 'Assessment' },
      { name: 'Penetration testing', what: 'Independent adversarial assessment.', why: 'Tests effectiveness rather than documentation.', category: 'Assessment' },
    ],
    links: [
      { label: 'NIST SP 800-53A — Assessing Security and Privacy Controls', url: 'https://csrc.nist.gov/pubs/sp/800/53/a/r5/final', source: 'NIST' },
      { label: 'ISO/IEC 27001 certification process', url: 'https://www.iso.org/standard/27001', source: 'ISO' },
      { label: 'AICPA — SOC for Service Organizations', url: 'https://www.aicpa-cima.com/topic/audit-assurance/audit-and-assurance-greater-than-soc-2', source: 'AICPA' },
    ],
    quiz: [
      {
        q: 'What is the difference between a SOC 2 Type I and Type II report?',
        options: [
          'Type I covers more systems',
          'Type I assesses control design at a point in time; Type II assesses operating effectiveness over a period',
          'Type II is self-assessed',
          'There is no difference',
        ],
        answer: 1,
        explain: 'Type II requires evidence that controls operated consistently across a defined period, which is why customers prefer it.',
      },
      {
        q: 'Why does internal audit typically report to the audit committee rather than to IT management?',
        options: [
          'To reduce cost',
          'To preserve independence so findings about IT can be reported without conflict of interest',
          'Because IT lacks the expertise',
          'To speed up remediation',
        ],
        answer: 1,
        explain: 'Independence is the foundation of audit credibility. Reporting into the function being audited would compromise it.',
      },
      {
        q: 'An auditor samples 25 change tickets and finds 3 without documented approval. What is the most likely outcome?',
        options: [
          'No finding, since most were compliant',
          'A finding on change management control operating effectiveness, with remediation required',
          'Immediate certification',
          'The scope is reduced',
        ],
        answer: 1,
        explain: 'Sampling exceptions indicate the control did not operate consistently. Auditors typically extrapolate from the sample to the population.',
      },
    ],
    examTip:
      'Know the categories: internal vs external, audit vs assessment vs attestation, self-assessment, third-party, regulatory examination and penetration testing. Understand that evidence and independence are what make an audit meaningful.',
  },
  {
    slug: 'security-awareness',
    title: 'Security Awareness & Human Risk',
    domain: 5,
    objective: '5.6 Implement security awareness practices',
    tagline: 'Turning the largest attack surface into the largest sensor network.',
    difficulty: 'Beginner',
    minutes: 9,
    keywords: ['awareness', 'training', 'phishing simulation', 'culture', 'insider', 'reporting', 'onboarding', 'policy acknowledgement', 'metrics'],
    simple: {
      what:
        "Security awareness is the programme that gives people the knowledge, motivation and mechanisms to behave securely. It includes onboarding training, recurring education, phishing simulation, role-specific training and a clear, easy way to report something suspicious.",
      why:
        "People are involved in the majority of breaches — through phishing, error, misuse or stolen credentials. But framing users as the weakest link is a strategic mistake: a trained workforce that reports quickly is the fastest detection capability most organisations have.",
      how: [
        "Cover: recognising phishing and social engineering, password and MFA hygiene, safe handling of data, removable media, physical security and reporting procedures.",
        "Role-based training: developers get secure coding, finance gets payment fraud and BEC, executives get targeted attack awareness, help desk gets pretexting.",
        "Phishing simulation should measure the report rate as the primary metric, not the click rate — reporting is the behaviour you actually want.",
        "Never punish reporting, including reporting a mistake. Punishment produces silence, and silence produces dwell time.",
        "Measure and report: participation, report rate, time to first report, and repeat susceptibility.",
      ],
      where: [
        "Onboarding, annual refresh, and just-in-time reinforcement at the moment of risk.",
        "Regulatory frameworks mandate awareness training and record-keeping.",
        "Anomalous behaviour recognition and insider risk awareness for managers.",
      ],
    },
    diagram: {
      title: 'Awareness programme feedback loop',
      caption:
        'The goal is a short, reliable path from suspicion to report to action — and back into the training content.',
      columns: [
        [{ id: 'train', label: 'Training', sub: 'onboarding, recurring, role-based', tone: 'primary', icon: 'GraduationCap' }],
        [{ id: 'sim', label: 'Simulation', sub: 'phishing and vishing exercises', tone: 'warn', icon: 'FlaskConical' }],
        [{ id: 'behave', label: 'Behaviour', sub: 'recognise, pause, verify', tone: 'safe', icon: 'UserCheck' }],
        [{ id: 'report', label: 'Report', sub: 'one-click, no blame', tone: 'safe', icon: 'Megaphone' }],
        [{ id: 'soc', label: 'SOC Action', sub: 'triage, purge, block', tone: 'violet', icon: 'ShieldCheck' }],
        [{ id: 'metrics', label: 'Metrics & Content Update', sub: 'target the real gaps', tone: 'primary', icon: 'BarChart3' }],
      ],
      edges: [
        { from: 'train', to: 'sim', tone: 'warn', animated: true },
        { from: 'sim', to: 'behave', tone: 'safe', animated: true },
        { from: 'behave', to: 'report', tone: 'safe', animated: true },
        { from: 'report', to: 'soc', tone: 'violet', animated: true },
        { from: 'soc', to: 'metrics', tone: 'primary', animated: true },
        { from: 'metrics', to: 'train', label: 'refine', tone: 'primary' },
      ],
      legend: [
        { tone: 'safe', label: 'Desired behaviour' },
        { tone: 'violet', label: 'Security response' },
      ],
    },
    realWorld: {
      title: 'The report rate is the metric that matters',
      body:
        "Organisations obsess over click rate in phishing simulations, but click rate never reaches zero — some percentage of humans will always click, especially under time pressure. The far more actionable metric is report rate and time to first report. If a real campaign lands in five hundred inboxes and the first report arrives in ninety seconds, the security team can purge every copy before most people have opened it. That single number turns the workforce into a distributed detection network. Programmes that punish clicking drive reporting down and dwell time up, which is precisely the wrong outcome. Praise the report, coach the click.",
      takeaway: 'Optimise for fast reporting, not for zero clicking. One is achievable and useful; the other is neither.',
    },
    attack: {
      title: 'Exploiting the moment of maximum pressure',
      intro:
        'Social engineering targets context as much as people. The same person makes different decisions under different conditions.',
      steps: [
        { label: 'Timing', detail: 'The lure arrives at quarter end, during an acquisition, or on the Friday before a holiday.' },
        { label: 'Authority and urgency', detail: 'The message appears to come from a senior figure and demands immediate action.' },
        { label: 'Plausible context', detail: 'It references a real project, a real supplier or a real internal process gathered from public sources.' },
        { label: 'Isolation', detail: 'The victim is told the matter is confidential, discouraging them from verifying with a colleague.' },
        { label: 'Escalation', detail: 'If they hesitate, pressure increases with consequences for delay.' },
      ],
      mitigations: [
        'Train specifically on the influence principles — authority, urgency, scarcity, social proof — so people recognise the pattern rather than the wording.',
        'Establish a cultural norm that verifying an unusual request is always acceptable and never causes offence.',
        'Mandate out-of-band verification for payments and credential changes regardless of who asks.',
        'Make reporting effortless: a single button, instant acknowledgement, visible follow-up.',
      ],
    },
    tools: [
      { name: 'GoPhish', what: 'Open source phishing simulation.', why: 'Run authorised campaigns and measure click and report rates for free.', url: 'https://getgophish.com/', category: 'Simulation' },
      { name: 'Report phishing button', what: 'One-click reporting integrated into the mail client.', why: 'Reduces friction — the single biggest driver of report rate.', category: 'Reporting' },
      { name: 'CISA Cybersecurity Awareness Program', what: 'Free public awareness materials.', why: 'Credible, ready-made content to adapt.', url: 'https://www.cisa.gov/cybersecurity-awareness-program', category: 'Content' },
      { name: 'NIST NICE Framework', what: 'Cybersecurity workforce role and skill taxonomy.', why: 'Structures role-based training and career development.', url: 'https://niccs.cisa.gov/workforce-development/nice-framework', category: 'Framework' },
    ],
    links: [
      { label: 'NIST SP 800-50 — Building an IT Security Awareness Program', url: 'https://csrc.nist.gov/pubs/sp/800/50/final', source: 'NIST' },
      { label: 'CISA — Cybersecurity Awareness Program', url: 'https://www.cisa.gov/cybersecurity-awareness-program', source: 'CISA' },
      { label: 'SANS Security Awareness Report', url: 'https://www.sans.org/security-awareness-training/', source: 'SANS' },
    ],
    quiz: [
      {
        q: 'Which metric best indicates that a security awareness programme is improving organisational detection capability?',
        options: ['Number of training hours completed', 'Phishing report rate and time to first report', 'Number of policies published', 'Antivirus definition currency'],
        answer: 1,
        explain: 'Fast, frequent reporting lets the security team contain a live campaign. Training hours measure activity, not outcome.',
      },
      {
        q: 'Why should organisations avoid punitive responses to employees who click simulated phishing links?',
        options: [
          'Punishment is illegal',
          'It discourages reporting, which increases the time real incidents go undetected',
          'It costs too much to administer',
          'Simulations are always unfair',
        ],
        answer: 1,
        explain: 'Fear of consequences suppresses reporting. The organisational goal is early disclosure, which requires psychological safety.',
      },
      {
        q: 'Which group most needs role-specific training on business email compromise and payment fraud?',
        options: ['Software developers', 'Finance and accounts payable staff', 'Warehouse operatives', 'Facilities management'],
        answer: 1,
        explain: 'Finance teams are the direct target of invoice redirection and wire fraud, so their training must cover verification procedures specifically.',
      },
    ],
    examTip:
      'Awareness topics the exam expects: phishing recognition and reporting, anomalous behaviour recognition (risky, unexpected, unintentional), user guidance and training, policy handbooks, situational awareness, insider threat, password management, removable media, social engineering, operational security, hybrid and remote work, plus reporting, monitoring and development of the programme.',
  },
  {
    slug: 'business-continuity-dr',
    title: 'Business Continuity & Disaster Recovery Planning',
    domain: 5,
    objective: '3.4 Explain the importance of resilience and recovery',
    tagline: 'Keeping the business running, and getting it back when it stops.',
    difficulty: 'Intermediate',
    minutes: 11,
    keywords: ['bcp', 'drp', 'bia', 'rto', 'rpo', 'mtd', 'tabletop', 'failover test', 'succession', 'crisis communication'],
    simple: {
      what:
        "Business continuity planning keeps critical business functions operating during a disruption, including manual workarounds. Disaster recovery planning restores the technology those functions depend on. A business impact analysis determines which functions are critical and how quickly each must be restored.",
      why:
        "Disruption is inevitable — ransomware, fire, flood, supplier failure, loss of key staff. Whether it becomes an inconvenience or an existential event is determined almost entirely by preparation.",
      how: [
        "The BIA identifies critical processes, their dependencies and the financial and operational impact of downtime over time, producing RTO, RPO and maximum tolerable downtime for each.",
        "Continuity plans include manual workarounds, alternate sites, succession planning for key roles and crisis communication procedures.",
        "Disaster recovery plans cover backup and restore procedures, failover, recovery sequence and dependency ordering.",
        "Test types escalate in realism: tabletop discussion, walkthrough, simulation, parallel processing, and full interruption test.",
        "Plans must be stored where they remain accessible when systems are down — an incident response plan on the encrypted file server is not a plan.",
      ],
      where: [
        "Regulated sectors require documented and tested continuity arrangements with evidence of exercises.",
        "Customer contracts frequently require continuity commitments and evidence of testing.",
        "Pandemic and remote-working scenarios have made continuity planning a mainstream board concern.",
      ],
    },
    diagram: {
      title: 'From business impact analysis to tested plans',
      caption:
        'The BIA sets the requirements. Everything downstream is engineering to meet numbers the business chose.',
      columns: [
        [{ id: 'bia', label: 'Business Impact Analysis', sub: 'critical functions and dependencies', tone: 'violet', icon: 'ChartNoAxesCombined' }],
        [
          { id: 'rto', label: 'RTO', sub: 'how fast to restore', tone: 'primary', icon: 'Timer' },
          { id: 'rpo', label: 'RPO', sub: 'acceptable data loss', tone: 'primary', icon: 'Database' },
          { id: 'mtd', label: 'MTD', sub: 'maximum tolerable downtime', tone: 'warn', icon: 'AlarmClock' },
        ],
        [
          { id: 'bcp', label: 'Continuity Plan', sub: 'workarounds, alternate site, comms', tone: 'safe', icon: 'Users' },
          { id: 'drp', label: 'Disaster Recovery Plan', sub: 'restore sequence, failover', tone: 'safe', icon: 'RefreshCw' },
        ],
        [
          { id: 'tabletop', label: 'Tabletop', sub: 'discussion based', tone: 'neutral', icon: 'MessagesSquare' },
          { id: 'sim', label: 'Simulation', sub: 'plan actually executed', tone: 'warn', icon: 'PlayCircle' },
          { id: 'full', label: 'Full Interruption', sub: 'highest realism and risk', tone: 'danger', icon: 'PowerOff' },
        ],
        [{ id: 'improve', label: 'Update Plans', sub: 'lessons feed back', tone: 'safe', icon: 'CircleCheck' }],
      ],
      edges: [
        { from: 'bia', to: 'rto', tone: 'primary', animated: true },
        { from: 'bia', to: 'rpo', tone: 'primary' },
        { from: 'bia', to: 'mtd', tone: 'warn' },
        { from: 'rto', to: 'drp', tone: 'safe', animated: true },
        { from: 'mtd', to: 'bcp', tone: 'safe' },
        { from: 'bcp', to: 'tabletop', tone: 'neutral' },
        { from: 'drp', to: 'sim', tone: 'warn', animated: true },
        { from: 'sim', to: 'full', tone: 'danger' },
        { from: 'sim', to: 'improve', tone: 'safe', animated: true },
      ],
      legend: [
        { tone: 'safe', label: 'Plan and improvement' },
        { tone: 'danger', label: 'Highest-fidelity test' },
      ],
    },
    realWorld: {
      title: 'The recovery plan that assumed the network worked',
      body:
        "A well-written disaster recovery plan describes restoring servers from backup. During a real ransomware event, the team discovers the plan assumed Active Directory was available for authentication, that DNS resolved, and that the backup catalogue database — which itself lived on an encrypted server — could be read. None of those held. Recovery sequencing is the part organisations most often get wrong: identity, DNS, certificate services and the backup infrastructure itself must be restorable first, from clean, isolated copies, before anything else can follow. This is only ever discovered by testing a full rebuild rather than a single-server restore.",
      takeaway: 'Test recovery of the recovery infrastructure first. Order of restoration is part of the plan.',
    },
    attack: {
      title: 'Attacking continuity capability directly',
      intro:
        'Removing your ability to recover is what converts an incident into a crisis.',
      steps: [
        { label: 'Reconnaissance', detail: 'The attacker maps backup infrastructure, replication targets and the disaster recovery site.' },
        { label: 'Shared trust', detail: 'The DR environment shares the same domain and credentials as production, so it is reachable with what is already stolen.' },
        { label: 'Poison the copy', detail: 'Replication faithfully copies the encryption to the DR site.' },
        { label: 'Destroy catalogues', detail: 'Backup indexes and configuration are destroyed so even surviving media cannot be located or restored.' },
        { label: 'Target documentation', detail: 'The recovery plan itself, stored only on the encrypted file share, becomes unreadable.' },
      ],
      mitigations: [
        'Keep at least one backup copy offline, immutable and outside the production identity domain.',
        'Break credential and trust reuse between production and disaster recovery environments.',
        'Store plans, contact lists and credentials for recovery in an offline, accessible form.',
        'Run a full recovery exercise annually, including identity and backup infrastructure rebuild.',
      ],
    },
    tools: [
      { name: 'Tabletop exercise packs', what: 'Structured scenario discussions for leadership and technical teams.', why: 'Cheapest and fastest way to find gaps in a plan.', url: 'https://www.cisa.gov/resources-tools/services/cisa-tabletop-exercise-packages', category: 'Exercise' },
      { name: 'Backup platforms with immutability', what: 'Object lock, air-gapped copies and verified restores.', why: 'Ensures a clean recovery point survives an estate-wide compromise.', category: 'Recovery' },
      { name: 'Runbook and documentation platforms', what: 'Offline-accessible recovery documentation.', why: 'The plan must be readable when the network is down.', category: 'Documentation' },
      { name: 'Chaos engineering', what: 'Controlled failure injection.', why: 'Validates that failover behaves as designed rather than as assumed.', url: 'https://principlesofchaos.org/', category: 'Validation' },
    ],
    links: [
      { label: 'NIST SP 800-34 Rev.1 — Contingency Planning Guide for Federal Information Systems', url: 'https://csrc.nist.gov/pubs/sp/800/34/r1/upd1/final', source: 'NIST' },
      { label: 'CISA — Tabletop Exercise Packages', url: 'https://www.cisa.gov/resources-tools/services/cisa-tabletop-exercise-packages', source: 'CISA' },
      { label: 'ISO 22301 — Business continuity management', url: 'https://www.iso.org/standard/75106.html', source: 'ISO' },
    ],
    quiz: [
      {
        q: 'Which activity determines which business processes are critical and how quickly each must be restored?',
        options: ['Penetration test', 'Business impact analysis', 'Vulnerability scan', 'Risk transfer'],
        answer: 1,
        explain: 'The BIA identifies critical functions, dependencies and impact over time, producing the RTO, RPO and MTD values that drive the architecture.',
      },
      {
        q: 'Which exercise type involves discussing a scenario without actually executing the recovery steps?',
        options: ['Full interruption test', 'Parallel processing test', 'Tabletop exercise', 'Simulation'],
        answer: 2,
        explain: 'A tabletop is a facilitated discussion. It is low cost and low risk, and is usually where the most obvious gaps are found first.',
      },
      {
        q: 'Why should disaster recovery documentation be available offline?',
        options: [
          'To reduce storage costs',
          'Because the systems hosting it may be unavailable or encrypted during the very event the plan addresses',
          'To satisfy printing requirements',
          'To improve search performance',
        ],
        answer: 1,
        explain: 'A plan that can only be read on the systems that are down is not a plan. Offline copies and out-of-band communications are essential.',
      },
    ],
    examTip:
      'Know the distinction: BCP keeps the business functioning (including manually), DRP restores technology. Learn the testing ladder — tabletop, walkthrough, simulation, parallel, full interruption — in increasing order of realism, cost and risk.',
  },
]

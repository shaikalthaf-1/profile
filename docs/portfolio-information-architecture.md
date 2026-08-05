# Portfolio Information Architecture

This is the target structure for the next portfolio redesign. It treats the website as the public front door for MacroCloud and the founder's engineering evidence, not as a resume page.

## Primary Goals

1. Make MacroCloud the first-viewport signal.
2. Establish Shaik Althaf as a technical founder and cloud automation engineer.
3. Replace skill badges and unsupported metrics with engineering evidence.
4. Align the website, GitHub, LinkedIn, README, and future case studies around one consistent story.
5. Preserve SEO, accessibility, performance, and security from the start.

## Audience

| Audience | What They Need to Understand Quickly |
| --- | --- |
| Enterprise buyers | MacroCloud is serious, security-aware, and focused on real cloud operations problems. |
| Hiring managers | The founder has hands-on platform, cloud, DevOps, networking, and automation experience. |
| Engineering peers | The work is technically credible and backed by diagrams, repos, and implementation notes. |
| Students/community | PROSKILL IT Technologies and mentoring are part of the broader ecosystem, not the primary enterprise pitch. |

## Site Map

```text
Home
|-- MacroCloud
|   |-- Platform
|   |-- AI Agents
|   |-- Automation
|   |-- Governance
|   `-- Roadmap
|-- Engineering
|   |-- Case Studies
|   |-- Architecture Notes
|   |-- Cloud Patterns
|   `-- Security Notes
|-- Founder
|   |-- Experience
|   |-- Certifications
|   |-- Technology Policy Interest
|   `-- Contact
|-- PROSKILL IT Technologies
|   |-- Academy
|   |-- Mentorship
|   `-- Student Projects
`-- GitHub
    |-- Featured Repositories
    |-- Labs
    `-- Open Source Roadmap
```

## Home Page Flow

### 1. Hero

Purpose: make the brand and role clear immediately.

Recommended content:

- Primary headline: `MacroCloud`
- Supporting line: `AI-first cloud automation for infrastructure, DevOps, networking, and governance.`
- Founder context: `Built by Shaik Althaf, an AI cloud and platform engineering leader.`
- Primary CTA: `Explore MacroCloud`
- Secondary CTA: `View Engineering Evidence`

Avoid:

- Resume-style multi-title headline.
- Unsupported numbers.
- Decorative skill badge clouds.
- Split card hero layouts.

### 2. Control-Plane Overview

Purpose: communicate the product concept visually.

Modules:

- Multi-cloud deployment
- AI infrastructure agents
- Network automation
- Governance and RBAC
- Migration workflows
- Activity center

Evidence needed:

- Product screenshot, wireframe, or architecture diagram.
- Clear labels for planned versus shipped capabilities.

### 3. Engineering Evidence

Purpose: prove capability through artifacts.

Cards:

- MacroCloud product architecture, labeled `In development`
- AI Automation Framework, labeled `Prototype`
- Enterprise Cloud Migration Pattern, anonymized
- Palo Alto Automation Pattern, anonymized and lab-based
- AI Monitoring Platform, labeled `Prototype`
- GitOps Pipeline, using public implementation evidence only
- PROSKILL IT Technologies Programs, without student personal information
- Eligible open-source and lab repositories after repository-quality review

Each card should link to a case study page or section.

### 4. Founder Credibility

Purpose: show relevant experience without turning the page into a CV.

Content:

- Consolidated timeline.
- Cloud/networking/platform engineering themes.
- Enterprise environments phrased carefully.
- Certifications only if verified.

### 5. MacroCloud Ecosystem

Purpose: show this is more than one static page.

Sections:

- Platform
- AI
- Academy
- Products
- Case Studies
- Research
- Labs

### 6. Writing and Thought Leadership

Purpose: build authority through technical thinking.

Initial topics:

- Azure landing zones for small teams
- DNS automation patterns
- Cloud governance basics
- AI agents for infrastructure operations
- Secure CI/CD for cloud automation
- Multi-cloud migration tradeoffs

### 7. Contact

Purpose: route real inquiries.

Requirements:

- Hyderabad office: MacroCloud and PROSKILL IT Technologies.
- Dubai presence: MacroCloud.
- Professional links: LinkedIn as the main `Connect` action and GitHub as engineering evidence.
- Business email: `contact@macrocloud.in` and `contact@proskillit.com`.
- Business phone: `+971 545 646 260` and `+91 9010213122`.
- Do not publish personal email addresses, additional personal phone numbers, or inferred personal location.
- No fake success state. Enable a form only when a working service, error handling, privacy notice, and delivery confirmation exist.

## MacroCloud Page Flow

### 1. Product Hero

State MacroCloud's category and current maturity.

Verified baseline:

`MacroCloud delivers cloud engineering and consulting services while building an AI-first infrastructure automation platform.`

The platform must be labeled `In development`. Individual capabilities must use their verified labels from `macrocloud-maturity.md`.

### 2. Problem

Explain:

- Fragmented cloud consoles.
- Manual deployment workflows.
- Inconsistent governance.
- Difficult migration planning.
- Lack of unified activity visibility.

### 3. Platform Architecture

Show:

- Frontend
- API layer
- Identity and RBAC
- Cloud provider SDK adapters
- Workflow engine
- Policy engine
- Activity center
- Audit logging

### 4. Capabilities

Separate shipped, prototype, and roadmap:

| Capability | Verified Status | Evidence Still Required |
| --- | --- | --- |
| Cloud engineering services | Shipped | Approved service scope and sanitized engagement evidence. |
| Consulting services | Shipped | Approved service scope and engagement process. |
| MacroCloud platform | In development | Architecture, working product flow, and approved screenshots. |
| AI infrastructure agents | Prototype | Agent workflow, safety boundaries, and demonstration evidence. |
| Azure integration | Prototype | Working adapter or documented automation demonstration. |
| AWS integration | Roadmap | Do not imply current implementation. |
| GCP integration | Roadmap | Do not imply current implementation. |
| Authentication and SSO | In development | Identity architecture and functional evidence. |
| Multi-tenant workspaces | In development | Tenant-isolation architecture and tests. |
| RBAC | In development | Authorization model and tests. |
| Governance and policy engine | Research preview | Policy model and research evidence. |
| Migration workflows | Prototype | Sanitized workflow and demonstration evidence. |
| Activity Center | Roadmap | Do not imply current implementation. |
| Customer engagements | Shipped consulting engagements | Approved anonymized evidence; never label them platform customers. |
| Free trial | Not offered | Remove all trial language and CTAs during implementation. |

### 5. Security and Governance

Cover principles:

- Least privilege.
- Secret isolation.
- Provider-native identity.
- Audit logging.
- Approval workflows.
- Workspace boundaries.

Do not claim compliance certifications unless verified.

### 6. Roadmap

Show near-term and long-term direction using the verified maturity labels:

- In development: MacroCloud platform, authentication and SSO, multi-tenant workspaces, and RBAC.
- Prototype: AI infrastructure agents, Azure integration, and migration workflows.
- Research preview: governance and policy engine.
- Roadmap: AWS integration, GCP integration, and Activity Center.

## Case Study Template

Every case study should use this structure:

```text
Title
One-line summary
Problem
Context
Architecture
Implementation
Security considerations
Operational workflow
Evidence
Result
Lessons learned
Next improvements
```

Only user-owned or explicitly permitted evidence may be used. Enterprise examples default to anonymous, sanitized patterns. Client identities, employer-owned code, internal diagrams, production configurations, and proprietary metrics are prohibited without explicit written permission.

## Navigation

Recommended top-level navigation:

- MacroCloud
- Engineering
- Case Studies
- Founder
- GitHub
- Contact

Avoid:

- `About`, `Skills`, `Portfolio`, `Testimonials` as the dominant structure.
- Large dropdowns unless there is enough real content behind them.

## Content Rewrites Required

| Existing Area | Required Change |
| --- | --- |
| Hero | Replace personal resume headline with MacroCloud-led product/founder positioning. |
| About | Rewrite as founder and engineering narrative. |
| Experience | Consolidate timeline and verify dates. |
| Projects | Convert to case studies with architecture and evidence. |
| Skills | Replace badge grid with capability map and proof. |
| Testimonials | Remove unless approved and verifiable. |
| Contact | Replace fake form with real integration or fallback-only contact. |
| MacroCloud | Separate shipped product, prototype, and roadmap. |
| PROSKILL IT Technologies | Present as a supporting technology and education company; publish programs or outcomes only after evidence review. |

## GitHub Alignment Plan

Do not archive repositories yet.

First:

- Rewrite portfolio repo README as a real project README.
- Create a pinned-repo strategy.
- Identify repos that can become case studies.
- Mark forks and tutorial repos clearly.
- Improve selected READMEs before changing visibility.

Suggested GitHub profile sections:

- MacroCloud Engineering
- Cloud Automation
- Azure Networking and DNS
- DevOps Pipelines
- Labs and Learning

## LinkedIn Alignment Plan

Recommended headline:

`Founder at MacroCloud | AI Cloud Automation | Platform Engineering | Azure, DevOps, Multi-Cloud Infrastructure`

Recommended about-section structure:

1. MacroCloud mission.
2. Engineering focus.
3. Enterprise cloud experience.
4. Evidence-based project themes.
5. Mentoring and technology governance interest.
6. Contact CTA.

## SEO Requirements

- One clear canonical domain.
- Unique title and meta description per page.
- JSON-LD updated to match verified identity.
- Open Graph image owned by the brand.
- No outdated Wix URL as primary portfolio link.
- Use descriptive internal links between MacroCloud, case studies, GitHub, and contact.

## Accessibility Requirements

- Semantic headings in order.
- Keyboard-accessible navigation and dropdowns.
- Visible focus states.
- Sufficient color contrast.
- Meaningful image alt text.
- No motion that blocks content access.
- Form labels and validation if a contact form is enabled.

## Implementation Gate

Phase 1 planning and governance were approved on 2026-07-18. Phase 2 may implement only verified content, approved maturity labels, approved case-study concepts, and approved or newly documented media. Pending facts and assets must be omitted rather than inferred.

| Gate Item | Current Status |
| --- | --- |
| Brand source of truth | Approved as the authoritative publishing policy; only fields marked verified may be used. |
| Information architecture | Approved for Phase 2 implementation. |
| Design system | Approved as the Phase 2 visual and accessibility baseline. |
| Repository classification | Completed as a read-only inventory in `repository-classification.md`; no GitHub actions taken. |
| Career timeline | Founder records are verified. Pending DHAKIUM, Uniper, UrHous, and education details must be omitted until verified and do not authorize inferred copy. |
| Public contact information | Business contacts, LinkedIn, and GitHub are approved; exact LinkedIn URL must be validated before launch. Personal contact channels are prohibited. |
| MacroCloud maturity | Capability baseline verified in `macrocloud-maturity.md`; exact public copy must preserve the approved distinctions. |
| Metrics | Classification verified in `metrics-registry.md`; two factual metrics are approved, while all 22 legacy impact and marketing claims are held or prohibited. |
| Public case-study list | Disclosure and case-study concepts verified in `project-registry.md`; each publication still requires admissible evidence. |
| Owned media | Publication policy approved in `media-rights-register.md`; unverified current assets must be omitted or replaced. |
| Final release gate | `publication-checklist.md` is mandatory before deployment. |

Phase 2 implementation constraints:

- Do not include pending employment or education details.
- Do not include held or prohibited metrics.
- Do not present prototypes, research previews, or roadmap capabilities as shipped.
- Do not use assets without an approved rights record.
- Do not expose client, employer, customer, or internal information.
- Do not feature `azure-ddns` while its security hold remains open.
- Do not deploy until the publication checklist is complete.

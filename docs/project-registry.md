# Project Registry

Status: Project disclosure policy and seven case-study groups verified by owner on 2026-07-17. Evidence and publication-readiness gates remain open.

This registry controls which work may appear on the portfolio, GitHub profile, LinkedIn, resume, MacroCloud pages, and future case studies. It prevents product-roadmap inflation and accidental disclosure of client or private-repository information.

## Decision Vocabulary

- `Public`: approved for public identification after evidence and security review.
- `Anonymous`: may be described only as a sanitized pattern without naming the organization.
- `Restricted`: must not be disclosed.
- `Pending`: owner, confidentiality, maturity, or evidence review is incomplete.
- `Shipped`, `Prototype`, `In development`, `Research preview`, `Roadmap`, and `Completed`: permitted maturity labels, but only after verification.

`Case study approved` authorizes development of a sanitized case study. It does not authorize publication until the evidence, security, media, metrics, and repository gates pass.

## Current Website Project Claims

| ID | Project | Current Source | Verified Public Decision | Case Study Decision | Confidentiality Rule | Maturity / Positioning | Admissible Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `PROJ-001` | MacroCloud Platform | `index.html`, `macrocloud.html`, private repository evidence | Public as `In development` only | Approved for development; publication gate open | User-owned platform evidence only; private code remains restricted | In development | Current architecture, working screenshots, deployment state, repository boundary, capability matrix |
| `PROJ-002` | AI Automation Framework | `index.html`, `script.js` | Yes, labeled `Prototype` | Approved; flagship candidate | Architecture only; no client data | Prototype | User-owned architecture diagrams, workflow screenshots, and code samples |
| `PROJ-003` | Enterprise Cloud Migration Pattern | `index.html`, `script.js` | Yes, anonymous | Approved | Anonymous client; no identifying implementation details | Prototype | Generic architecture, migration methodology, and sanitized before/after process |
| `PROJ-004` | Palo Alto Automation Pattern | `index.html` | Yes, anonymous | Approved | Anonymous; no production rules or customer configurations | Publish only as a lab or reusable pattern | User-owned lab environment, automation scripts, and sanitized diagrams |
| `PROJ-005` | AI Monitoring Platform | `index.html` | Yes, labeled `Prototype` | Approved | Internal/prototype; no internal operational data | Prototype | User-owned UI mockups, architecture, and feature roadmap |
| `PROJ-006` | GitOps Pipeline | `index.html` | Yes, public implementation only | Approved; primary technical showcase | No employer-owned or private implementation | Reusable implementation pattern; not a customer product | User-owned CI/CD diagrams, GitOps workflow, and repository examples |
| `PROJ-007` | PROSKILL IT Technologies Programs | `index.html`, `skillithub.html` | Yes | Approved | Public program information; no student personal information | Company verified; individual programs and outcomes require current evidence | Course outlines, mentoring approach, and non-personal learning outcomes |

## Original Public Repository Projects

| ID | Project / Repository | Proposed Public Decision | Proposed Case Study | Confidentiality | Maturity Status | Required Action |
| --- | --- | --- | --- | --- | --- | --- |
| `PROJ-008` | `profile` | Public | Portfolio implementation record | Low | Active redesign | Complete the verification gate before UI implementation |
| `PROJ-009` | `macrocloud.github.io` | Pending | Possible product-surface case study | Pending | Unknown | Establish canonical-site role and reconcile with current MacroCloud product state |
| `PROJ-010` | `Website-Builder-Pro` | Public as Labs, after review | Optional Labs case study | Pending | Unknown | Security, architecture, licensing, setup, and screenshot review |
| `PROJ-011` | `crrequest` | Anonymous or Public, pending review | CI/CD workflow candidate | High review risk | Unknown | Remove enterprise identifiers, document provenance and workflow |
| `PROJ-012` | `JobMela` | Public as Labs, after review | Not currently recommended | Pending | Unknown | Clarify purpose, authentication behavior, data handling, and status |
| `PROJ-013` | `infra_Automation` | Pending | No | Pending | Artifact-only | Locate source code or retain as an archive candidate |
| `PROJ-014` | `myproject-1` | Pending | No | Unknown | Empty | Determine ownership and intended purpose |

The complete fork, tutorial, and learning-repository inventory remains governed by [GitHub repository classification](repository-classification.md). Forks are not original project evidence unless meaningful contributions are documented.

Public GitHub repository evidence is approved in principle, subject to the repository classification. Only repositories that pass documentation, security, provenance, licensing, and repository-quality gates may be featured or used as case-study evidence.

Capability maturity does not automatically approve a case study. The verified statuses in [MacroCloud maturity statement](macrocloud-maturity.md) control availability language, while each project must still pass confidentiality, evidence, security, metrics, and media review.

## Disclosure Policy

### Safe to Publish After Evidence Review

- User-owned architecture diagrams.
- Generic infrastructure diagrams.
- Personal projects and user-owned code.
- Open-source work with accurate attribution.
- Reusable automation patterns.
- Clearly labeled platform concepts and prototypes.
- Learning content, blog posts, conference presentations, and lab demonstrations.

### Publish Only Anonymously

- Enterprise implementations.
- Client migrations and cloud transformations.
- Security and networking automation.
- AI deployments performed for an organization.

Use a non-identifying description such as `European Energy Company`, `Global Financial Services Organization`, `International Manufacturing Enterprise`, or `Healthcare Provider` only when the description itself cannot identify the customer.

### Never Publish Without Explicit Written Permission

- Client names or identifying details.
- Employer-owned or customer-owned source code.
- Internal or proprietary architecture diagrams.
- Production firewall rules, IP addresses, routes, credentials, secrets, or configurations.
- Internal dashboards, logs, customer datasets, or non-public documents.
- Proprietary metrics or outcomes.

## Private and Client Work

Seven private repositories were observed during the authenticated repository inventory. Their names and details remain excluded from this public registry. Each requires an explicit owner disclosure decision before it can be added here.

Use a restricted offline record for private or client work with these fields:

| Required Field | Allowed Values |
| --- | --- |
| Public identity | Named / Anonymous / Restricted |
| Confidentiality basis | Contract / NDA / Client policy / Internal policy / None |
| Case-study permission | Written approval / Sanitized approval / Not approved |
| Evidence location | Private reference only; never embed secrets or confidential records here |
| Maturity | Shipped / Prototype / In development / Research preview / Roadmap / Completed |
| Outcome | Verified metric reference or non-numeric description |

## Case-Study Promotion Gate

A project becomes a public case study only when:

1. Ownership and confidentiality are resolved.
2. Product or project maturity is verified.
3. Architecture and implementation evidence exist.
4. Security-sensitive details are removed or sanitized.
5. Metrics have an approved entry in `metrics-registry.md`.
6. All media has an approved entry in `media-rights-register.md`.
7. Client, employer, partner, and testimonial naming has explicit permission.
8. Lessons and limitations are stated honestly.

Until then, an approved case-study concept remains `Publication gate open` and must not be represented as shipped, customer-proven, or ready for release.

## Portfolio Priority

Use this narrative order when evidence is ready:

1. MacroCloud.
2. Enterprise cloud engineering.
3. AI and automation.
4. DevOps and platform engineering.
5. Networking and security.
6. PROSKILL IT Technologies.
7. Open source and labs.

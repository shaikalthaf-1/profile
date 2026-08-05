# GitHub Repository Classification

Status: Read-only planning inventory. No repository was archived, deleted, hidden, pinned, renamed, or modified.

Snapshot date: 2026-07-17

This classification supports the public MacroCloud and founder narrative. It is a presentation decision, not a judgment about whether past learning work has value. Categories can change after repository-level technical and security review.

## Classification Model

| Category | Definition | Public Presentation |
| --- | --- | --- |
| Showcase | Strong, owned evidence aligned with MacroCloud or the founder's engineering narrative. | Eligible for pinning after quality and security gates pass. |
| Supporting | Relevant evidence that needs clearer documentation, provenance, or maintenance before promotion. | Link contextually; improve selectively. |
| Learning | Fork, tutorial, course, or practice work whose educational origin should remain explicit. | Keep public if useful; do not pin as original engineering evidence. |
| Labs | Original experiment or adjacent product that is credible but not central to the MacroCloud story. | Present only in a clearly labeled labs area. |
| Archive candidate | Empty, artifact-only, obsolete, duplicated, or too weak to support the public narrative. | Keep unchanged for now; review after the narrative is approved. |

## Public Repository Inventory

| Repository | Ownership Signal | Classification | Current Evidence | Recommended Next Action |
| --- | --- | --- | --- | --- |
| `profile` | Original | Showcase | Current public portfolio source and active redesign workspace. | Complete the planning gate, then implement and validate incrementally. |
| `macrocloud.github.io` | Original | Supporting | Public MacroCloud static site with a custom-domain file and standard web assets; last pushed in 2024. | Audit content, ownership, deployment role, and duplication before deciding whether it becomes the canonical product site. |
| `Website-Builder-Pro` | Original | Labs | Recent TypeScript/Vite project with client and server structure, but it is outside the core cloud-automation narrative. | Add an evidence-led README, security review, screenshots, architecture, and a clear labs label before linking. |
| `crrequest` | Original | Supporting | Small ServiceNow change-request pipeline repository with a README. | Sanitize enterprise details, explain the workflow, add provenance and usage limits, then consider a CI/CD case-study link. |
| `JobMela` | Original | Labs | Original static web project with login and landing-page files; description and product story are unclear. | Clarify purpose, maturity, data handling, and current status; keep outside primary pins. |
| `infra_Automation` | Original | Archive candidate | Root contains only a video artifact and no explanatory README or inspectable implementation. | Preserve unchanged; determine whether source code exists elsewhere before any visibility decision. |
| `myproject-1` | Original | Archive candidate | Empty repository. | Preserve unchanged; identify intended purpose and ownership before later archive review. |
| `azure-ddns` | Fork | Supporting | Technically relevant Azure DNS automation fork, but provenance and a possible credential-shaped sample require review. | Security hold: verify and rotate any real credential, remove sensitive material, document upstream attribution, and do not pin. |
| `azure-public-dns` | Fork | Supporting | Relevant Terraform/Azure DNS module fork. | Make fork provenance explicit, document any original changes, and promote only if there is meaningful maintained contribution. |
| `azure-networks-and-dns` | Fork | Learning | Azure networking and DNS learning material with no current description. | Keep clearly labeled as learning; do not use as original project evidence. |
| `mslearn-host-domain-azure-dns` | Fork | Learning | Microsoft Learn sample for Azure DNS. | Retain attribution and keep unpinned. |
| `docker-cicd` | Fork | Learning | Docker/CI-CD practice repository. | Document tutorial provenance if retained publicly; keep unpinned. |
| `nodejs-todo-cicd` | Fork | Learning | AWS, Docker, Jenkins, and Node.js CI/CD tutorial-style project. | Preserve as learning evidence with explicit attribution; keep unpinned. |
| `react_django_app` | Fork | Learning | React and Django deployment demo. | Preserve as learning evidence with explicit attribution; keep unpinned. |
| `mavenproject` | Fork | Learning | Java/Maven practice fork. | Keep unpinned and label as learning if referenced. |
| `build-my-own-website` | Fork | Learning | PHP website-learning fork. | Keep unpinned and outside the MacroCloud narrative. |

## Private Repositories

Seven private repositories were visible to the authenticated owner during the inventory. Their names, implementation details, and maturity are intentionally excluded from this public planning artifact.

Private repositories are not eligible for public classification until the owner explicitly approves disclosure and each repository passes:

1. Secret and sensitive-data review.
2. License and dependency review.
3. Client-confidentiality review.
4. Architecture and maintainability review.
5. Product-maturity verification.
6. Public documentation and evidence review.

## Pinning Strategy

Do not change pins yet. The eventual six-pin set should be selected only after quality gates pass and should represent distinct evidence:

1. MacroCloud public product surface or sanitized platform repository.
2. Portfolio and founder engineering hub.
3. Owned Azure automation project.
4. Infrastructure-as-code or platform automation project.
5. CI/CD or operational workflow project.
6. One clearly labeled lab demonstrating current full-stack engineering.

At present, the public inventory does not provide six verified showcase repositories. Empty slots are preferable to promoting forks or weak evidence as original work.

## Promotion Gate

A repository moves to `Showcase` only when all applicable items are complete:

- Original ownership or meaningful, clearly documented contribution.
- No exposed credentials, sensitive identifiers, or client-confidential material.
- Clear purpose, architecture, setup, usage, limitations, and maturity in the README.
- Reproducible installation or demonstration path.
- License and third-party attribution are explicit.
- Basic automated validation appropriate to the stack.
- Current screenshots, diagrams, or sample output where useful.
- Public claims match the brand source of truth.
- Repository description, topics, and homepage are accurate.
- Maintenance state and known limitations are honest.

## Deferred Actions

The following remain deliberately deferred until the portfolio, GitHub, and LinkedIn narrative is approved:

- Archiving or deleting repositories.
- Changing repository visibility.
- Changing GitHub pins.
- Renaming repositories or default branches.
- Rewriting repository descriptions or READMEs.
- Publishing private product repositories.
- Rewriting Git history, except if confirmed credential exposure requires immediate security response.

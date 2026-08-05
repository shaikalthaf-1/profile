# MacroCloud Portfolio Design System

Status: Approved Phase 2 visual, interaction, accessibility, and performance baseline as of 2026-07-18.

This document defines the visual and interaction language for the MacroCloud portfolio. It governs all future changes to `index.html`, `macrocloud.html`, `skillithub.html`, `styles.css`, `script.js`, images, diagrams, and related public assets. The [brand source of truth](brand-source-of-truth.md) remains authoritative for public claims, identity, product maturity, and content.

## Design Principles

1. **Product before portfolio.** The experience should resemble an enterprise cloud control plane supported by founder evidence, not a decorative resume.
2. **Evidence before claims.** Architecture, workflows, repositories, and verified outcomes carry more weight than badges or marketing numbers.
3. **Clarity before spectacle.** Visual effects must explain hierarchy, status, or interaction. They must not compete with content.
4. **Trust by default.** Product maturity, security boundaries, and roadmap status must be visible and unambiguous.
5. **Accessible at every size.** Keyboard, screen-reader, contrast, motion, zoom, and touch requirements are part of the component contract.

## Visual Direction

The visual language is a restrained dark control-plane interface with high-contrast content, cool cloud accents, and limited translucent layering. It should feel technical, calm, and operational.

Avoid:

- Generic blue-purple gradients across entire pages.
- Neon glows, animated particle backgrounds, and decorative terminal noise.
- Resume-template timelines as the dominant visual motif.
- Glass effects on body copy or dense data.
- Color-only capability or maturity indicators.

## Color System

### Core Tokens

| Token | Value | Intended Use |
| --- | --- | --- |
| `--color-bg` | `#07111F` | Page background. |
| `--color-bg-subtle` | `#0A1726` | Alternating section background. |
| `--color-surface` | `#0D1B2A` | Cards, navigation, and panels. |
| `--color-surface-raised` | `#12263A` | Menus, active panels, and elevated content. |
| `--color-border` | `#294158` | Standard boundaries and dividers. |
| `--color-border-strong` | `#3B5A74` | Focus-adjacent and emphasized boundaries. |
| `--color-text` | `#F3F7FA` | Primary text. |
| `--color-text-muted` | `#AFC0CE` | Secondary text. |
| `--color-text-subtle` | `#8398AA` | Metadata; never for tiny text. |
| `--color-primary` | `#4CC9F0` | Primary actions, active states, and links. |
| `--color-primary-strong` | `#1597C4` | Pressed states and decorative depth. |
| `--color-accent` | `#7AE0C3` | AI, automation, and positive technical accents. |
| `--color-success` | `#55D6A7` | Verified or operational state. |
| `--color-warning` | `#F5C451` | Prototype, pending, or caution state. |
| `--color-danger` | `#FF7A90` | Errors, blockers, and security warnings. |
| `--color-on-accent` | `#041018` | Text on primary, accent, success, or warning fills. |

### Status Semantics

| Status | Color | Required Text Label |
| --- | --- | --- |
| Shipped / verified | Success | `Verified` or `Available` |
| Prototype / in development | Warning | `Prototype` or `In development` |
| Roadmap | Muted neutral | `Roadmap` |
| Security or validation blocker | Danger | Clear error or action text |
| Selected / interactive | Primary | Accessible name and state |

Status must never be communicated by color alone. Every badge needs text, and icons should be treated as reinforcement.

### Contrast Baseline

Validated palette pairs:

| Pair | Contrast |
| --- | --- |
| Primary text on page background | `17.58:1` |
| Muted text on page background | `10.15:1` |
| Subtle text on page background | `6.35:1` |
| Primary text on surface | `16.15:1` |
| Muted text on surface | `9.32:1` |
| Dark text on primary | `10.00:1` |

All implementation combinations still require automated and visual contrast validation. Do not assume a token is safe on every surface.

## Typography

### Families

- UI and editorial: `Inter`, with `Segoe UI`, `Roboto`, `Helvetica Neue`, and `Arial` fallbacks.
- Code and technical labels: `IBM Plex Mono`, with `Cascadia Code`, `SFMono-Regular`, `Consolas`, and monospace fallbacks.
- Delivery preference: self-host approved WOFF2 files. Until approved assets exist, use the system fallbacks and avoid blocking third-party font requests.

### Type Scale

| Token | Desktop Size / Line Height | Mobile Size / Line Height | Use |
| --- | --- | --- | --- |
| `display` | `clamp(3rem, 6vw, 5.5rem) / 0.98` | Same fluid token | Hero brand only. |
| `h1` | `clamp(2.5rem, 5vw, 4.5rem) / 1.05` | Same fluid token | Page title. |
| `h2` | `clamp(2rem, 3.5vw, 3rem) / 1.12` | Same fluid token | Major section. |
| `h3` | `1.5rem / 1.25` | `1.375rem / 1.25` | Card group or subsection. |
| `h4` | `1.125rem / 1.35` | `1.0625rem / 1.35` | Component heading. |
| `body-lg` | `1.125rem / 1.65` | `1.0625rem / 1.6` | Introductory copy. |
| `body` | `1rem / 1.6` | `1rem / 1.6` | Default content. |
| `body-sm` | `0.875rem / 1.55` | `0.875rem / 1.55` | Supporting content. |
| `label` | `0.75rem / 1.4` | `0.75rem / 1.4` | Uppercase UI labels and metadata. |
| `code` | `0.875rem / 1.6` | `0.8125rem / 1.55` | Code and terminal evidence. |

Rules:

- Body copy should not exceed `68ch`; technical documentation may extend to `76ch`.
- Use no more than three font weights: 400, 500, and 700.
- Uppercase is limited to short labels with at least `0.08em` letter spacing.
- Do not justify body text or use text smaller than `12px` equivalent.

## Layout and Grid

### Container

- Maximum content width: `1200px`.
- Wide evidence canvas: `1360px` only for architecture diagrams or product screenshots.
- Inline page padding: `24px` desktop, `20px` tablet, `16px` mobile.
- Text columns remain constrained even inside wide sections.

### Grid

| Viewport | Columns | Gutter | Typical Use |
| --- | --- | --- | --- |
| `>= 1280px` | 12 | `24px` | Full control-plane and evidence layouts. |
| `1024px-1279px` | 12 | `20px` | Compact desktop and landscape tablet. |
| `768px-1023px` | 8 | `20px` | Tablet layouts. |
| `< 768px` | 4 | `16px` | Mobile layouts. |

Use CSS Grid for page and evidence layouts and Flexbox for one-dimensional component alignment. Avoid absolute positioning for primary content.

## Spacing Scale

Use a `4px` base with a deliberately limited scale.

| Token | Value | Typical Use |
| --- | --- | --- |
| `--space-0` | `0` | Reset. |
| `--space-1` | `4px` | Tight icon or inline offset. |
| `--space-2` | `8px` | Badge and compact control gap. |
| `--space-3` | `12px` | Dense component padding. |
| `--space-4` | `16px` | Default component gap. |
| `--space-5` | `20px` | Mobile card padding. |
| `--space-6` | `24px` | Standard card padding and grid gutter. |
| `--space-8` | `32px` | Component-group separation. |
| `--space-10` | `40px` | Dense section separation. |
| `--space-12` | `48px` | Standard section sub-group. |
| `--space-16` | `64px` | Mobile section block. |
| `--space-20` | `80px` | Tablet section block. |
| `--space-24` | `96px` | Desktop section block. |
| `--space-32` | `128px` | Hero-to-content separation only. |

## Shape, Borders, and Elevation

### Radius

| Token | Value | Use |
| --- | --- | --- |
| `--radius-sm` | `6px` | Badges, small controls, code labels. |
| `--radius-md` | `10px` | Buttons, inputs, compact cards. |
| `--radius-lg` | `16px` | Standard cards and panels. |
| `--radius-xl` | `24px` | Hero or product preview container only. |
| `--radius-pill` | `999px` | Status chips only. |

### Borders and Shadows

- Default border: `1px solid var(--color-border)`.
- Strong border: `1px solid var(--color-border-strong)`.
- Prefer borders and surface changes over shadows.
- Standard elevation: `0 16px 40px rgb(0 0 0 / 0.22)`.
- Interactive elevation: `0 20px 48px rgb(0 0 0 / 0.28)`; use only on hover-capable devices.
- Never stack multiple heavy shadows or apply glow to body text.

## Component Language

### Buttons

- Minimum target: `44px` high and `44px` wide.
- Primary: primary fill, dark text, medium radius.
- Secondary: surface fill, strong border, primary text.
- Tertiary: text action with an underline or directional icon.
- Disabled state must use both visual treatment and the native `disabled` attribute where applicable.
- Loading state must preserve the button width and expose accessible status text.

### Links

- Inline links use primary color and a visible underline.
- Navigation links may omit underlines but require a distinct hover, active, and focus state.
- External links must have meaningful accessible names; an icon alone is insufficient.

### Cards

Standard card anatomy:

1. Optional category or maturity label.
2. Concise heading.
3. Evidence-oriented description.
4. Optional metadata or technology list.
5. One clear action.

Rules:

- Use surface background, standard border, large radius, and `24px` padding (`20px` on mobile).
- Equal-height rows may align actions to the bottom, but copy must not be truncated.
- Interactive cards require a semantic link or button, visible focus state, and no nested interactive controls.
- Project cards must identify evidence status; roadmap cards must not look shipped.

### Navigation

- Desktop navigation is compact, persistent, and limited to the approved top-level information architecture.
- Mobile navigation uses an explicit menu button with `aria-expanded`, `aria-controls`, focus management, Escape-to-close, and focus return.
- Sticky navigation must not obscure anchor targets or consume excessive mobile height.

### Status Badges

- Use pill radius, `12px` label text, an optional icon, and explicit status wording.
- Do not use pulsing dots for static status.
- Product maturity labels must come from the brand source of truth.

### Forms

- Labels remain visible; placeholders are examples, not labels.
- Inputs are at least `44px` high and use text, border, and icon feedback for validation.
- Errors appear beside the relevant field and in an accessible summary when submission fails.
- No success state is permitted until a real backend or approved form provider confirms receipt.

### Code, Terminal, and Architecture Evidence

- Evidence panels use monospace only for code, commands, identifiers, and log fragments.
- Provide a text explanation before or after complex diagrams.
- Never use fake command output as proof.
- Code blocks must scroll horizontally without forcing the page viewport to overflow.

## Glass and Transparency

Glass is an accent treatment, not the default surface.

- Allowed: navigation overlay, hero status panel, or a single product-preview layer.
- Not allowed: body-copy cards, form inputs, tables, or dense case-study content.
- Approved baseline: `background: rgb(13 27 42 / 0.82)`, `backdrop-filter: blur(16px)`, and a solid border.
- Always provide an opaque fallback for unsupported browsers, reduced transparency preferences, and high-contrast modes.
- Text contrast must be measured against the composited result, not the source color alone.

## Icons and Imagery

### Icons

- Use one consistent outline icon family with a `1.5px-2px` stroke and rounded joins.
- Default sizes: `16px`, `20px`, and `24px`; `32px` only for feature markers.
- Preferred concepts: cloud, agent, workflow, shield, network, deployment, policy, activity, and migration.
- Use inline SVG or an approved sprite with `currentColor`; do not use emoji as interface icons.
- Decorative icons use `aria-hidden="true"`; meaningful icons require an accessible name or adjacent label.
- Do not add a large icon dependency when the required set is small.

### Images and Diagrams

- Prefer owned product screenshots, sanitized architecture diagrams, and real workflow captures.
- Raster images should use AVIF or WebP where supported, explicit dimensions, responsive `srcset`, and lazy loading below the fold.
- Diagrams should remain legible at `200%` zoom and include a textual summary.
- Decorative background imagery must not contain critical information.

## Motion and Interaction

Motion should communicate state, hierarchy, or spatial continuity.

| Token | Duration | Use |
| --- | --- | --- |
| `--motion-fast` | `120ms` | Pressed, focus-adjacent, and small hover state. |
| `--motion-base` | `180ms` | Button, card, menu, and disclosure transition. |
| `--motion-slow` | `280ms` | Section reveal or panel change. |

Rules:

- Use `cubic-bezier(0.2, 0.8, 0.2, 1)` for entrance and movement; use `ease-out` for simple state changes.
- Animate `opacity` and `transform` when possible; avoid layout-triggering properties.
- Scroll reveals run once, remain subtle, and never hide content when JavaScript fails.
- No autoplaying carousels, cursor trails, infinite decorative loops, or parallax on essential content.
- Under `prefers-reduced-motion: reduce`, remove non-essential transforms and use instant or near-instant state changes.

## Responsive Behavior

Breakpoints are content-driven implementation thresholds:

| Name | Query | Behavior |
| --- | --- | --- |
| Mobile | `< 640px` | Single-column content, mobile navigation, compact section spacing. |
| Large mobile | `>= 640px` | Optional two-column compact card groups. |
| Tablet | `>= 768px` | Eight-column grid and expanded evidence layouts. |
| Desktop | `>= 1024px` | Desktop navigation and multi-column content. |
| Wide | `>= 1280px` | Twelve-column layout at full container width. |

Requirements:

- Design mobile-first and add complexity only when content space permits.
- No horizontal page overflow at `320px` CSS width.
- Touch targets remain at least `44px` and separated enough to prevent accidental activation.
- Tables become scrollable regions or semantic stacked comparisons; do not shrink text below the type scale.
- Hero copy, CTAs, and maturity status remain visible without relying on viewport height.
- Navigation and anchored headings account for safe areas and sticky-header offset.

## Accessibility Contract

The implementation target is WCAG 2.2 AA.

- Maintain at least `4.5:1` contrast for normal text and `3:1` for large text and meaningful UI boundaries.
- Preserve semantic landmarks and a logical heading hierarchy.
- Include a visible skip link as the first focusable control.
- Provide a visible `:focus-visible` treatment with at least a `2px` outline and sufficient contrast.
- Ensure all functionality is keyboard accessible with a predictable focus order.
- Use native HTML controls before ARIA; ARIA must not repair avoidable semantic problems.
- Announce dynamic status and errors without stealing focus unexpectedly.
- Support browser zoom to `200%` and text spacing overrides without loss of content or function.
- Respect `prefers-reduced-motion`, `prefers-contrast`, and forced-colors behavior where applicable.
- Give informative images meaningful alt text; decorative images use empty alt text.
- Captions or transcripts are required for meaningful video or audio.

## Performance Budget

- No UI framework is required for the current static architecture.
- Avoid adding a runtime dependency for effects that CSS can provide.
- Initial page assets should target less than `500 KB` transferred, excluding a justified hero/product image.
- JavaScript should target less than `100 KB` compressed for the portfolio shell.
- Self-hosted font delivery should use only necessary weights and subsets.
- Reserve image space to prevent layout shift and defer non-critical media.
- Phase 2 validation should target Core Web Vitals in the `good` range under representative mobile conditions.

## Implementation Governance

Before a component or token reaches the public pages:

1. Confirm its content against `brand-source-of-truth.md`.
2. Reuse an existing token or component pattern before defining a new one.
3. Validate default, hover, focus, active, disabled, loading, error, empty, and reduced-motion states as applicable.
4. Test at `320px`, `768px`, `1024px`, and `1440px` widths.
5. Run semantic, keyboard, contrast, performance, and broken-link checks.
6. Document intentional exceptions in the implementation change.

Phase 2 implementation may proceed under this baseline using only verified content and approved media. Pending facts and assets must be omitted, not inferred.
